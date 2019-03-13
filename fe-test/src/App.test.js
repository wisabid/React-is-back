import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import blogWrapper from './HOC/blogWrapper';

import { shallow, mount } from 'enzyme';

describe("<App />", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
 
})

describe('<Blogs />', () => {

 it('<Blogs /> should render correctly', () => {
    const wrapper = shallow(<Blogs/>);
    expect(wrapper).toMatchSnapshot();
  })  

  it('<Blogs /> should have an Add button for adding up new blog', () => {
    const wrapper = shallow(<Blogs/>);
    expect(wrapper.find('span.action-new')).toHaveLength(1);    
  })  

  it('No results message should be shown when there is no blog listing', () => {
    const wrapper = shallow(<Blogs />);
    expect(wrapper.find('.message-container')).toHaveLength(1);    
  })

   
})


describe('<Blog />', () => {
  const clickFn = jest.fn();

  it('renders Blog component without crashing', () => {
    const component = shallow(<Blog addblog={true}/>);
    expect(component).toMatchSnapshot();
  })

  it('Add New link should display an input element for adding up a new blog', () => {
    const wrapper = shallow(<Blog addblog={true}/>);
    expect(wrapper.find('input[name="blogheader"]')).toHaveLength(1);    
  })

  it('Add New link should display an textarea element for adding up a new blog', () => {
    const wrapper = shallow(<Blog addblog={true}/>);
    expect(wrapper.find('textarea[name="blogbody"]')).toHaveLength(1);    
  })

  it('Add blog should have a Submit button for adding up', () => {
    const wrapper = shallow(<Blog addblog={true}/>);
    expect(wrapper.find('span#submitbtn')).toHaveLength(1);    
  })

  it('Submit click should call a function to submit', () => {
    const wrapper = shallow(<Blog addblog={true} submitblog={clickFn} />);
    wrapper.find('span#submitbtn').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  })

  it('Cancel click should call a function to cancel', () => {
    const wrapper = shallow(<Blog addblog={true} cancelAdd={clickFn} />);
    wrapper.find('span#cancelBtn').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  })

  // it('Edit link should have been called with an id', () => {
  //   const wrapper = shallow(<Blog edit={true} editBlog={() => clickFn('abcd_efgh')} header="Blog header" body="Blog body"/>);
  //   wrapper.find('span#editBtn').simulate('click');
  //   expect(clickFn).toHaveBeenCalledWith('abcd_efgh');    
  // })

  it('Edit link should edit a listed blog', () => {
    const wrapper = shallow(<Blog edit={true}/>);
    expect(wrapper.find('.blog-item.edit-item')).toHaveLength(1);    
  })

  it('Edit blog should display a textbox element for editing a new blog', () => {
    const wrapper = shallow(<Blog edit={true}/>);
    expect(wrapper.find('textarea[name="blogbody"]')).toHaveLength(1);    
  })

  it('Edit blog should display a textarea element for editing a new blog', () => {
    const wrapper = shallow(<Blog edit={true}/>);
    expect(wrapper.find('input[name="blogheader"]')).toHaveLength(1);    
  })

  it('Edit blog should have an Update button for updating', () => {
    const wrapper = shallow(<Blog edit={true}/>);
    expect(wrapper.find('span#updateBtn')).toHaveLength(1);    
  })

  it('Update click should call a function to update', () => {
    const wrapper = shallow(<Blog edit={true} editBlog={clickFn} />);
    wrapper.find('span#updateBtn').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  })
  
  it('Cancel click while editing should call a function to cancel', () => {
    const wrapper = shallow(<Blog edit={true} cancelEdit={clickFn} />);
    wrapper.find('span#cancelBtn').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  })

  it('Listing page should display a blog when header and body are passed', () => {
    const wrapper = shallow(<Blog header="Blog header" body="Blog body"/>);
    expect(wrapper.find('.blog-item')).toHaveLength(1);    
  })

  it('A blog listing should have a delete button', () => {
    const wrapper = shallow(<Blog header="Blog header" body="Blog body"/>);
    expect(wrapper.find('span.deleteBtn')).toHaveLength(1);    
  })

  it('A blog listing should have an edit button', () => {
    const wrapper = shallow(<Blog header="Blog header" body="Blog body"/>);
    expect(wrapper.find('span.editBtn')).toHaveLength(1);    
  })

  it('A blog body should limit to 80 characters display in listing page in addition to REad more link', () => {
    const wrapper = shallow(<Blog header="Blog header" body="Iam a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Blog body"/>);
    expect(wrapper.find('.blog-item p').html()).toContain('<p>Iam a looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo<span class="tiny-font"><i>...Read More</i></span>');    
  })

  it('A click on Read more link should call a function', () => {
    const wrapper = shallow(<Blog showfull={clickFn} header="Blog header" body="Iam a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Blog body"/>);
    wrapper.find('.blog-item .tiny-font').at(0).simulate('click');
    expect(clickFn).toHaveBeenCalled();
  })

})


describe('blogWrapper HOC', () => {

  it('HOC blogWrapper passes all props through translator', () => {
    const comp1 = (props) => {
      return (props.name === 'Abid' && props.age ===35 && props.experience === 12);
    }
    const result = (blogWrapper(comp1))({name : 'Abid', age : 35, experience : 12});
    expect(result).toBe(true);
  })

  it('HOC blogWrapper adds up inline style (geen colored text) when message prop is present', () => {
    const comp1 = (props) => {
      return (props.styles.color === 'lightgreen');
    }
    const result = (blogWrapper(comp1))({name : 'Abid', age : 35, experience : 12, message : 'A dummy message'});
    expect(result).toBe(true);
  })

  it('HOC blogWrapper adds up error message when error prop is present', () => {
    const comp1 = (props) => {
      return (props.msgdisplay === props.error);
    }
    const result = (blogWrapper(comp1))({name : 'Abid', age : 35, experience : 12, error : 'An error message'});
    expect(result).toBe(true);
  })

})
