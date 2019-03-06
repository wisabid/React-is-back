import React from 'react';

const toy = (props) => {
    return (
        <div style={{color:props.color}}>{props.children}</div>
    )
}

export default toy;