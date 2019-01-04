import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { add, get, remove, update } from '../store/reducers/posts/actions';
import { openContextMenu } from '../store/reducers/contextmenu/actions';

class Posts extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            text: 'Hello, this is test #' + Date.now() + '.', 
            editMode: false,
            editId: 0,
            editText: ''
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

    add(event) {
        event.preventDefault();

        this.props.add({ text: this.state.text })
            .then(() => this.setState({ ...this.state, text: '' }));
    }

    onEdit(post) {
        this.setState({
            ...this.state,
            editMode: true,
            editId: post.id,
            editText: post.text
        });
    }

    finishEdit() {
        this.setState({
            ...this.state,
            editMode: false,
            editId: 0,
            editText: ''
        });
    }

    save(event, post) {
        event.preventDefault();

        this.props.update(post)
            .then(this.finishEdit.bind(this));
    }

    render() {
        let { posts, username, openContextMenu, remove } = this.props;

        return (
            <div className='row justify-content-md-center' style={{ paddingTop: '30px' }}>
                <div className='col col-lg-8'>
                    <ul className='list-group'>
                        {posts.map(post => <li key={post.id} className='list-group-item list-group-item-dark' onContextMenu={event => !this.state.editMode && openContextMenu(event, [{
                                action: () => this.onEdit(post),
                                label: 'Edit',
                                icon: 'fa-edit',
                                check: username === post.username
                            }, {
                                action: () => remove(post),
                                label: 'Delete',
                                icon: 'fa-trash',
                                check: username === post.username
                            }])}>
                            {username && this.state.editId === post.id ? 
                                <>
                                    <form name='editForm' onSubmit={event => this.save(event, { ...post, text: this.state.editText })} className='col col-md-12'>
                                        <div className='form-group'>
                                            <input autoFocus autoComplete='on' className='form-control' type='text' onChange={this.changeValue.bind(this, 'editText')} value={this.state.editText}/>
                                        </div>
                                        <button className='btn btn-dark pull-right' disabled={this.state.editText.length === 0 || this.state.editText === post.text} type='submit'>Save</button>
                                        <button className='btn pull-right' onClick={() => this.finishEdit()} type='button'>Cancel</button>
                                    </form>
                                </> :
                                <>
                                    <div className='row'>
                                        {username === post.username ? <>
                                            <div className='col-md-11'>{post.text}</div>
                                            <div className='col-md-1' onClick={() => remove(post)}>
                                                <i className='fa fa-times'></i>
                                            </div>
                                        </> : <div className='col-md-12'>{post.text}</div>}
                                    </div>
                                    <div className='blockquote-footer'>{post.username}</div>
                                </>}
                        </li>)}
                    </ul>
                </div>              
                {username && <form name='signupForm' onSubmit={this.add.bind(this)} className='col col-lg-6'>
                    <div className='form-group'>
                        <label className=''>Comment: </label>
                        <input autoComplete='on' disabled={this.state.editMode} className='form-control' type='text' onChange={this.changeValue.bind(this, 'text')} value={this.state.text}/>
                    </div>
                    <button className='btn btn-dark pull-right' disabled={this.state.text.length === 0 || this.state.editMode} type='submit'>Add</button>
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
        remove: bindActionCreators(remove, dispatch),
        update: bindActionCreators(update, dispatch),
        openContextMenu: bindActionCreators(openContextMenu, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(Posts);
