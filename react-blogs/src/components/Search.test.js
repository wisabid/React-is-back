import React from 'react';
import Search from './Search';
import { shallow } from 'enzyme';
describe('<Blogs />', () => {
    const changeFn = jest.fn(() => {

    });

    it('<Search /> should render correctly', () => {
       const wrapper = shallow(<Search/>);
       expect(wrapper).toMatchSnapshot();
     })    
     
     it('A function should be called when you start typing in Search text box', () => {
        const wrapper = shallow(<Search searchval="abcd" searchchange={changeFn} />);
        wrapper.find('input#search-bar').simulate('change');
        expect(changeFn).toHaveBeenCalled();
      })   
   
      
   })