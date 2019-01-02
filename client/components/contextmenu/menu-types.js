import React from 'react';

import PostsContextMenu from './PostsContextMenu';

export const POSTS_CONTEXT_MENU = 'POSTS_CONTEXT_MENU';

export default {
    POSTS_CONTEXT_MENU: (data) => <PostsContextMenu data={data}/>
}
