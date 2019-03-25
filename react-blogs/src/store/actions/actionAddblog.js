

const checkSimilar = (simposts) => {
    // console.log('From Middleware', posts)
    // let similarposts = posts.filter((item) => item.header.toLowerCase().indexOf('fe') !== -1)
    // if(similarposts.length) {
        return {
            type : 'findSimPosts',
            simposts : simposts
        }
    // }
    // else {
    //     return {
    //         type : 'addnblog'
    //     }
    // }
}

export const addblog = (obj) => {
    return dispatch => {
        console.log(obj)
        // setTimeout(() => {
            dispatch(checkSimilar(obj))
        // }, 3000)
        
    }
}

export const findSimilar = (posts, bloghdr) => {
    
    return dispatch => {
        const words = bloghdr.split(' ');
        console.log(words)
        let similarposts = [];
        let simposts;
        words.map((itm) => {
            simposts = posts.filter((item) => item.header.toLowerCase().indexOf(itm.toLowerCase()) !== -1)
            similarposts.push(simposts)
        })
        debugger;
        if (similarposts.length) {
                dispatch(checkSimilar(similarposts))
        }
        else {
            return {
                type : 'showsugg'
            }
        }
       
    }
}