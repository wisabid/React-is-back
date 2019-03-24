import React, { Component, lazy, Suspense } from 'react';
import uuid from 'uuid';
import Search from './Search';
import { connect } from 'react-redux';
import * as actionCreator from '../store/actions/actionAddblog';
const Blog = lazy(() => import('./Blog'));



const loadingComp = () => {
    return (
        <h1>Loading...</h1>
    )
}

export class Blogs extends Component {
    constructor() {
        super();
        this.state = {
            editblog : false,
            addblog : false,
            blogheader: null,
            blogbody: null,
            search: '',
            entirebody : '',
            error: '',
            message: '',
            messageid : ''
        };
      }

    makeApiCall = (url, config) => {
        return fetch(url, config)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error('Some Problem Occured !')
                }
            })        
            .catch(err => {
                console.error(err);
                return false;
            })
    }

    componentDidMount() {
        this.makeApiCall('api/posts?_sort=timestamp&_order=desc', {})
            .then(blogposts => {
                let posts = blogposts.map(blog => {
                    return blog;                    
                });

                this.props.loadposts(posts);
                // this.setState({
                //     posts
                // })
            })
    }

    componentDidUpdate() {
        // console.log('UPDATED!!!!!!!!!!!!!!!')
    }

    setBlogsNewState = (newState) => {
        this.setState(newState);
    }

   
    handleEdit = (id, e) => {
        let editblog = id;
        console.log(editblog)

        let blog = this.props.posts.filter((item) => item.id === id);
        this.setBlogsNewState({
            editblog,
            blogheader : blog[0].header,
            blogbody : blog[0].body,
            messageid : ''
        })
    }

    handleDelete = (id, e) => {
        let config = {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json"
        }};
        let that = this;
        this.makeApiCall(`api/posts/${id}`, config)
            .then((resp) => {
                if (resp) {
                    let delindex = this.props.posts.findIndex(x => x.id == id)
                    let posts = this.props.posts.filter(blogitem => blogitem.id !== id) 
                    let messageId = '';
                    if (posts.length) {
                        messageId = posts[0].id;
                        //newState = {...posts, messageid : newState[0].id}
                    }
                    this.props.loadposts(posts);
                    that.setBlogsNewState({
                        editblog : false,
                        message : 'Succesfully Deleted !',
                        messageid : messageId
                    })
                }
                else {
                    that.setBlogsNewState({
                        message : 'Unable to Delete !',
                        messageid : id
                    })
                }
        })
    }

    handleCancel = (id, e) => {
        let newState = { 
            editblog : false,
            addblog : false,
            error: ''
        }
        this.setBlogsNewState(newState);
    }


    handleUpdate =(id) => {
        if (this.state.blogbody && this.state.blogheader) {
            let blog = this.props.posts.reduce((all, blog, index) => {
                if (blog.id === id) {
                    delete blog.edit;
                    blog.header = this.state.blogheader;
                    blog.body = this.state.blogbody;
                    blog.timestamp = new Date().toISOString();
                    all = blog;
                }
                return all;
            }, {})
            let config =  {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json",
                },            
                body: JSON.stringify(blog)
            };
            let that = this;
            this.makeApiCall(`api/posts/${id}`, config)
                .then((resp) => {
                    if (resp) {
                        let posts = this.props.posts.map((blogitem) => {
                            if (blogitem.id == id) {
                                blogitem = blog;
                            }
                            return blogitem;
                        });
                        this.props.loadposts(posts);
                        that.setBlogsNewState({
                            editblog : false,
                            blogheader: null,
                            blogbody : null,
                            error: '',
                            message : 'Succesfully Updated !',
                            messageid : id
                        })
                    }
                    else {
                        this.setBlogsNewState({
                            error : 'Unable to Update !',
                            message : '',
                            messageid : ''
                        })
                    }
                })
        }
        else {
            this.setBlogsNewState({
                error : 'Required Validation Failure !',
                message : '',
                messageid : ''
            })
        }
    }

    handleAddnew = () => {
        let newState = { 
            addblog : true,
            message : '',
            messageid: '',
            error: ''
        }
        this.setBlogsNewState(newState);
    }


    handleSubmit = () => {
        let newid = uuid.v4();
       
        
        if (this.state.blogbody && this.state.blogheader) {
            let newblog =  {
                "id" : newid,
                "body": this.state.blogbody,
                "header": this.state.blogheader,
                "timestamp": new Date().toISOString()
            };
            let config = {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },            
                body: JSON.stringify(newblog)
            };
            let that = this;
            this.makeApiCall(`api/posts/`, config)
                .then((resp) => {
                    if (resp) {
                        let posts = this.props.posts;
                        posts.unshift(newblog);
                        this.props.loadposts(posts);
                        that.setBlogsNewState({
                            posts,
                            editblog : false,
                            addblog: false,
                            blogheader: null,
                            blogbody : null,
                            error: '',
                            message : 'Succesfully Added !',
                            messageid : posts[0].id,
                            search: ''
                            });
                    }
                    else {
                        this.setBlogsNewState({
                            error : 'Unable to Add New Blog !',
                            message : '',
                            messageid : ''
                        });
                    }
                })
        }
        else {
            this.setBlogsNewState({
                error : 'Required Validation Failure !',
                message : '',
                messageid : ''
            });
        }
    }

    handleInput = (id, ev) => {
        this.setBlogsNewState({
            editblog : id,
            [ev.target.name] : ev.target.value
        })
    }

    handleSearch = (ev) => {
        this.setBlogsNewState({
            search : ev.target.value,
            message: '',
            messageid: ''
        })
    }

    displayEntireBody = (id) => {
        this.setBlogsNewState({
            entirebody : id
        })
    }

    mapDispatchToStore = (dispatch) => {
        return {
            callcalfie : dispatch({type : 'callalf'})
        }
    }

    mapStateToProps = (state) => {
        return {
            alfie : state.alfie   
        }
    }

    render() {
        let filteredPosts = [];
        if (this.props.posts.length) {
            filteredPosts = this.props.posts.filter((item) => {
                return item.header.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || item.body.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            })
        }
        if (this.state.addblog) {
            return (
                <>
                    <header>
                            <h2>Add New Blog</h2>
                    </header>
                    <Suspense fallback={loadingComp()}>
                    <Blog 
                        addblog={this.state.addblog}
                        cancelAdd={this.handleCancel.bind(this, null)}
                        submitblog={this.handleSubmit.bind(this)}
                        bloghdr={this.handleInput.bind(this, null)}
                        blogbdy={this.handleInput.bind(this, null)}
                        error={this.state.error}
                        similar={this.props.findSimilar}
                    />  
                    </Suspense>                  
                </>
            )
        }
        else {
            return (
                <>
                    <header>
                        <h2>B L O G S (<span className="action-new" title="Add New" onClick={this.handleAddnew.bind(this)}>+</span>)</h2>
                        <h3 onClick={() => this.props.addnblog(this.props.posts)}>{this.props.alfie}</h3>
                        <Search 
                            searchval={this.state.search}
                            searchchange={this.handleSearch.bind(this)}
                        />
                    </header>
                    
                    { filteredPosts.length == 0
                        ? <div className="blog-item message-container" style={{color:"lightgreen"}}>No Search Results to display !</div>
                        : null
                    }
                    <Suspense fallback={loadingComp()}>
                    {
                        filteredPosts.map(blog => {
                            return (  
                                <Blog 
                                    header={(this.state.editblog === blog.id) ? this.state.blogheader : blog.header} 
                                    body={(this.state.editblog === blog.id) ? this.state.blogbody : blog.body} 
                                    key={blog.id} 
                                    editBlog={this.handleEdit.bind(this, blog.id)} 
                                    deleteBlog={this.handleDelete.bind(this, blog.id)}  
                                    edit={ (this.state.editblog === blog.id) ?true:false} 
                                    cancelEdit={this.handleCancel.bind(this, blog.id)}
                                    updateBlog={this.handleUpdate.bind(this, blog.id)}
                                    postdate={blog.timestamp}
                                    bloghdr={this.handleInput.bind(this, blog.id)}
                                    blogbdy={this.handleInput.bind(this, blog.id)}
                                    entirebody={this.displayEntireBody.bind(this, blog.id)}
                                    showfull={(this.state.entirebody === blog.id) ?this.state.entirebody:false}
                                    error={(this.state.editblog === blog.id && this.state.error) ?this.state.error: ''}
                                    message={(this.state.messageid === blog.id && this.state.message) ?this.state.message: ''}
                                />
                            )
                        })
                    }
                    </Suspense>       
                </>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        callalfie : () => dispatch({type: 'callalf'}),
        loadposts : (posts) => dispatch({type : 'loadposts', posts:posts}),
        addnblog : (that) => dispatch(actionCreator.addblog(that)),
        findSimilar : () => dispatch(actionCreator.findSimilar())
    }
}


const mapStateToProps = (state) => {
    return {
        alfie : state.rBlogs.alfie,
        posts : state.rBlogs.posts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);