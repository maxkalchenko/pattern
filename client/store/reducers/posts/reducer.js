import { GET_POSTS, CREATE_POST, DELETE_POST, UPDATE_POST } from '../../actions/action-types';

const initialState = {
    posts: []
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                posts: action.payload.sort((a, b) => a.id - b.id)
            };    
        case CREATE_POST:
            return {
                posts: state.posts.concat(action.payload)
            };
        case DELETE_POST:
            return {
                posts: state.posts.filter(post => post.id !== action.payload.id)
            };
        case UPDATE_POST:
            return {
                posts: state.posts.map(post => post.id === action.payload.id ? action.payload : post)
            };
        default: 
            return state;
    }
};
