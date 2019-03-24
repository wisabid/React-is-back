

const checkSimilar = (posts) => {
    console.log('From Middleware', posts)
    let similarposts = posts.filter((item) => item.header.toLowerCase().indexOf('fe') !== -1)
    if(similarposts.length) {
        return {
            type : 'showsugg'
        }
    }
    else {
        return {
            type : 'addnblog'
        }
    }
}

export const addblog = (obj) => {
    return dispatch => {
        console.log(obj)
        // setTimeout(() => {
            dispatch(checkSimilar(obj))
        // }, 3000)
        
    }
}

export const findSimilar = () => {
    return dispatch => {
        dispatch({type : 'findSimPosts'})
    }
}