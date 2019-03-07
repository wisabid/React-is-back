import React, { Fragment } from 'react'

const child = (props) => {
    return (
        <Fragment>
            <button style={{borderRadius:"10px",color:"brown", lineHeight: "40px"}} onClick={props.changeme}>{props.children}</button>
            <button onClick={props.dothis}>Iam another button</button>
        </Fragment>
    )
}

export default child;