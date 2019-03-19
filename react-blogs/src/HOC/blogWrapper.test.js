import React from 'react';
import blogWrapper from './blogWrapper';

describe('blogWrapper HOC', () => {

    it('HOC blogWrapper passes all props through translator', () => {
      const comp1 = jest.fn(props => {
        return (props.name === 'Abid' && props.age ===35 && props.experience === 12);
      });
      const result = (blogWrapper(comp1))({name : 'Abid', age : 35, experience : 12});
      expect(result).toBe(true);
    })
  
    it('HOC blogWrapper adds up inline style (geen colored text) when message prop is present', () => {
      const comp1 = jest.fn(props => {
        return (props.styles.color === 'lightgreen');
      });
      const result = (blogWrapper(comp1))({name : 'Abid', age : 35, experience : 12, message : 'A dummy message'});
      expect(result).toBe(true);
    })
  
    it('HOC blogWrapper adds up error message when error prop is present', () => {
      const comp1 = jest.fn(props => {
        return (props.msgdisplay === props.error);
      });
      const result = (blogWrapper(comp1))({name : 'Abid', age : 35, experience : 12, error : 'An error message'});
      expect(result).toBe(true);
    })
  
  })