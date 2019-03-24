import React from 'react';
import PropTypes from 'prop-types';
import blogWrapper from './../HOC/blogWrapper'

const displayDate = (dt) => {
    return new Date(dt).toString();
}

const ReadMore = (props) => {
    if (props.desc.length > 80) {
        return (
            <>{props.desc.substr(0,80)}<span className="tiny-font" onClick={props.readmore}><i>...Read More</i></span></>
        )
    }
    else {
        return (
            props.desc
        )
    }
   
}


const Blog = (props) => {
    let blogheader,
        blogbody;

    function handleBodyFocus(ev) {
        if (ev.keyCode === 13) {
            blogbody.focus();
        }
    }

    if (props.edit) {
        return (
            <>
                { props.msgdisplay
                    ? <div className="blog-item error-container" style={props.styles}>{props.msgdisplay}</div>
                    : null
                } 
                <div className="blog-item highight edit-item active">
                    <div className="float-right tiny-font">
                        <span id="cancelBtn" onClick={props.cancelEdit}>Cancel</span> | <span id="updateBtn" onClick={props.updateBlog}>Update</span>
                    </div>
                    <input name="blogheader" type="text" value={props.header} size="115" onChange={props.bloghdr}
                    ref={(input) => blogheader = input} onKeyUp={handleBodyFocus} maxLength="200"/>
                    <br />
                    <textarea name="blogbody" cols="104" rows="10" value={props.body} onChange={props.blogbdy} 
                    ref={(input) => blogbody = input}></textarea>
                </div>
            </>
        )
    }
    else if (props.addblog) {
        return (
            <>
                { props.msgdisplay
                    ? <div className="blog-item error-container" style={props.styles}>{props.msgdisplay}</div>
                    : null
                }             
                <div className="blog-item">
                    <div className="float-right tiny-font">
                        <span id="cancelBtn" onClick={props.cancelAdd}>Cancel</span> | <span id="submitbtn" onClick={props.submitblog}>Submit</span>
                    </div>
                    <input ref={(input) => blogheader = input} placeholder="Header goes here" name="blogheader" type="text" size="104" onChange={props.bloghdr} 
                    onKeyUp={handleBodyFocus} maxLength="200" onBlur={props.similar}/>
                    <br />
                    <textarea ref={(input) => blogbody = input} placeholder="Body goes here" name="blogbody" cols="95" rows="10" onChange={props.blogbdy}></textarea>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                { props.msgdisplay
                    ? <div className="blog-item error-container" style={props.styles}>{props.msgdisplay}</div>
                    : null
                }                 
                <div className="blog-item" >
                    <div className="float-right tiny-font">
                        <span className="editBtn" onClick={props.editBlog}>Edit</span> | <span className="deleteBtn" onClick={props.deleteBlog}>Delete</span>
                    </div>
                    <h3>{props.header}</h3>
                    <span className="tiny-font" style={{color:'darkseagreen', cursor: 'crosshair'}}>({displayDate(props.postdate)})</span>
                    <p><pre>{ (props.body.length > 80 && !props.showfull)? <ReadMore desc={props.body} readmore={props.entirebody}/>:props.body}</pre></p>
                </div>
            </>
        )
    }
}

Blog.propTypes = {
    header : PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
};

export default React.memo(blogWrapper(Blog));