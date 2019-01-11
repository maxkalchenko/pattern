import React from 'react';
import PropTypes from 'prop-types';

const ShowPost = ({ editMode, username, post, onRemove }) => (
    <>
        <div className='row'>
            {username === post.username ? <>
                <div className='col-md-11'>{post.text}</div>
                {!editMode && <div className='col-md-1' onClick={() => onRemove(post)}>
                    <i className='fa fa-times'></i>
                </div>}
            </> : <div className='col-md-12'>{post.text}</div>}
        </div>
        <div className='blockquote-footer'>{post.username}</div>
    </>
);

ShowPost.propTypes = {
    editMode: PropTypes.bool,
    username: PropTypes.string,
    onRemove: PropTypes.func,
    post: PropTypes.object
};

export default ShowPost;
