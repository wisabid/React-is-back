import React from 'react';
import Blogs from './Blogs';
import { shallow } from 'enzyme';
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