import React from 'react';
import { Blogs } from './Blogs';
import { shallow } from 'enzyme';
describe('<Blogs />', () => {

    /* 
      Ref : https://redux.js.org/recipes/writing-tests
      if your component uses a connect of react-redux, you should also export the class and while importing, you should use a named export as above
      (import {Blogs} from './Blogs'; INSTEAD OF import Blogs from './Blogs';)
      Without this, if you are using a redux store, your tests will fail because : 
       when you import it, you're actually holding the wrapper component returned by connect(), and not the App component itself. If you want to test its interaction with Redux, this is good news: you can wrap it in a <Provider> with a store created specifically for this unit test. But sometimes you want to test just the rendering of the component, without a Redux store.

In order to be able to test the App component itself without having to deal with the decorator, we recommend you to also export the undecorated component:

    */

    it('<Blogs /> should render correctly', () => {
       const wrapper = shallow(<Blogs posts={[]}/>);
       expect(wrapper).toMatchSnapshot();
     })  
   
     it('<Blogs /> should have an Add button for adding up new blog', () => {
       const wrapper = shallow(<Blogs posts={[]}/>);
       expect(wrapper.find('span.action-new')).toHaveLength(1);    
     })  
   
     it('No results message should be shown when there is no blog listing', () => {
       const wrapper = shallow(<Blogs posts={[]}/>);
       expect(wrapper.find('.message-container')).toHaveLength(1);    
     })

    
   
      
   })