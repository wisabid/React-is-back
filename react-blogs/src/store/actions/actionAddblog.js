

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
    
    if (bloghdr) {
        return dispatch => {
            const words = bloghdr.split(' ');
            console.log(words)
            let similarposts = [];
            let simposts;
            let prm = new Promise((resolve, reject) => {
                words.forEach((itm) => {
                    simposts = posts.filter((item) => item.header.toLowerCase().indexOf(itm.toLowerCase()) !== -1)
                    console.log(simposts);
                    similarposts.push(simposts)
                    console.log(similarposts);
                });
                if (similarposts.length) {
                    resolve(similarposts[0]);                
                }
                else {
                    reject('err');
                }

            }).then((simposts) => {
                dispatch(checkSimilar(simposts))
            }).catch((err) => {
                console.error(err);
            })
            
            
            // else {
            //     return {
            //         type : 'showsugg'
            //     }
            // }
        
        }
    }
    else {
        
    }
}