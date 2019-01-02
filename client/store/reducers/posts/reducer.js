import { GET_POSTS, ADD_POST } from '../../actions/action-types';

const initialState = {
    posts: []
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                posts: action.payload
            };    
        case ADD_POST:
            return {
                posts: state.posts.concat({
                    id: state.posts.length,
                    ...action.payload
                })
            };
        default: 
            return state;
    }
};
