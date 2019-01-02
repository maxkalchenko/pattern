import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { add, get } from '../store/reducers/posts/actions';
import { openPostsContextMenu } from '../store/reducers/contextmenu/actions';

class Posts extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            text: 'Hello, this is test #' + Date.now() + '.' 
        };
    }

    componentDidMount() {
        this.props.get();
    }
        
    changeValue(val, event) {
        let state = {};
        state[val] = event.target.value;

        this.setState(state);
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.add({ username: this.props.username, text: this.state.text });
    }

    render() {
        let { posts, username, openPostsContextMenu } = this.props;

        return (
            <div className='row justify-content-md-center' style={{ paddingTop: '30px' }}>
                <div className='col col-lg-8'>
                    <ul className='list-group'>
                        {posts.map(post => <li key={post.id} className='list-group-item list-group-item-dark' onContextMenu={event => openPostsContextMenu(event, post)}>
                                <div className='col-md-12'>{post.text}</div>
                                <div className='blockquote-footer'>{post.username}</div>
                        </li>)}
                    </ul>
                </div>              
                {username && <form name='signupForm' onSubmit={this.onSubmit.bind(this)} className='col col-lg-6'>
                    <div className='form-group'>
                        <label className=''>Comment: </label>
                        <input autoComplete='on' className='form-control' type='text' onChange={this.changeValue.bind(this, 'text')} value={this.state.text}/>
                    </div>
                    <button className='btn btn-dark pull-right' disabled={this.state.text.length === 0} type='submit'>Add</button>
                </form>}
            </div>
        );
    }
}

const putStateToProps = state => ({ ...state.authReducer, ...state.postsReducer });

const putActionsToProps = (dispatch) => {
    return {
        add: bindActionCreators(add, dispatch),
        get: bindActionCreators(get, dispatch),
        openPostsContextMenu: bindActionCreators(openPostsContextMenu, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(Posts);
