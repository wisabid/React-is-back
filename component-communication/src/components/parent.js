import React from 'react';
import Child from './child'

const parent = (props) => {
    return (
        <>
            <Child {...props} dothis={props.dothis}></Child>
            <Child {...props} dothis={props.dothat}></Child>
        </>
    )
}

export default parent;