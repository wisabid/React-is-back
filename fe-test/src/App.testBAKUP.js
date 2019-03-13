import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Blogs from './components/Blogs'
import blogWrapper from './HOC/blogWrapper';

import { shallow, mount } from 'enzyme';

describe("<App />", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  // it('adds two numbers', () => {
  //   expect(1).toEqual(1);
  //   expect(4).toEqual(4);
  // })

  it('renders App without crashing', () => {
    shallow(<App />)
  })  
})

describe('<Blogs />', () => {

  const clickFn = jest.fn();

  it('renders Blogs component without crashing', () => {
    shallow(<Blogs />)
  })

  

  it('Add new blog should render correctly', () => {
    const wrapper = shallow(<Blogs/>);
    expect(wrapper).toMatchSnapshot();
  })

  // it('Add new blog click should work on click', () => {
  //   const wrapper = shallow(<Blogs addblog={true}/>);
  //   wrapper
  //     .find('.action-new')
  //     .simulate('click');
  //   expect(clickFn).toHaveBeenCalled();
  // })
  
  it('Add New link should display a container div for adding up a new blog', () => {
    const wrapper = shallow(<Blogs addblog={true}/>);
    expect(wrapper.find('.blog-item')).toHaveLength(1);    
  })


  it('HOC blogWrapper passes all props through translator', () => {
    const comp1 = (props) => {
      return (props.name === 'Abid' && props.age ===35 && props.experience === 12);
    }
    const result = (blogWrapper(comp1))({name : 'Abid', age : 35, experience : 12});
    expect(result).toBe(true);
  })

  it('HOC blogWrapper adds up inline style (geen colored text) when message prop is present', () => {
    const comp1 = (props) => {
      return (props.styles.color === 'green');
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
