const initialState = {
    alfie : 'Who is Alfie?',
    posts : [],
    editblog : false,
    addblog : false,
    blogheader: null,
    blogbody: null,
    search: '',
    entirebody : '',
    error: '',
    message: '',
    messageid : ''
}
const reducerBlog = (state = initialState, action) => {
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
        default:            
    }
    return newState;
}

export default reducerBlog;