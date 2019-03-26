const initialState = {
    alfie : 'Who is Alfie?',
    posts : [],
    simposts : []
}
const reducerBlog = (state = initialState, action) => {
    debugger;
    let newState = {...state};
    switch(action.type) {
        case 'callalf': 
            newState = {...state, alfie : 'Alfie my son!'}
            break;
        case 'loadposts':
            newState = {...newState, posts : action.posts};
            break;
        case 'addnblog':
            newState = {...newState, alfie : 'He is my life!'};
            break;
        case 'showsugg':
            newState = {...newState, alfie : 'Suggestions are....'};
            break;
        case 'findSimPosts':
            debugger;
            newState = {...newState, simposts : action.simposts};
            break;
        default:            
    }
    return newState;
}

export default reducerBlog;