import React from 'react';

const translateProps = (props) => {
    let _style = {
        color: 'lightgreen'
    }
    let newProps = {...props};
    // console.log(props)
    if (newProps.message) {
        newProps = {...props,  styles: _style, msgdisplay : props.message}
    }
    else if (newProps.error) {
        newProps = {...props,  msgdisplay : props.error}
    }
    // console.log('THIS IS A HOC', newProps);
    return newProps;
}

export default (WrappedBlogComponent) => {
    return function wrappedRender(propArgs) {
        return WrappedBlogComponent(translateProps(propArgs))
    }
}