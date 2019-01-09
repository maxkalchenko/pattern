import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { add, get, remove, update } from '../store/reducers/posts/actions';
import { openConfirmModal } from '../store/reducers/modal/actions';
import { openContextMenu } from '../store/reducers/contextmenu/actions';

import AddComment from '../components/posts/AddComment';
import ShowComment from '../components/posts/ShowComment';
import EditComment from '../components/posts/EditComment';

class Posts extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            editMode: false,
            editId: 0
        };
    }

    componentDidMount() {
        this.props.get();
    }
        
    onRemove(post) {
        this.props.openConfirmModal({
            message: 'Are you sure you want to delete "' + post.text + '"?',
            onResolve: () => this.props.remove(post)
        });
    }

    onEdit(post) {
        this.setState({
            editMode: true,
            editId: post.id
        });
    }

    finishEdit() {
        this.setState({
            editMode: false,
            editId: 0
        });
    }

    openContextMenuFor(post, event) {
        this.props.openContextMenu(event, [{
            action: this.onEdit.bind(this, post),
            label: 'Edit',
            icon: 'fa-edit',
            check: this.props.username === post.username
        }, {
            action: () => this.onRemove(post),
            label: 'Delete',
            icon: 'fa-trash',
            check: this.props.username === post.username
        }]
    )}

    render() {
        let { posts, update, username } = this.props;

        return (
            <div className='row justify-content-md-center' style={{ paddingTop: '30px' }}>
                <div className='col col-lg-8'>
                    <ul className='list-group'>
                        {posts.map(post => 
                            <li key={post.id} className='list-group-item list-group-item-dark' 
                                onContextMenu={event => !this.state.editMode && this.openContextMenuFor(post, event)}>
                                {username && this.state.editId === post.id ?
                                    <EditComment finishEdit={this.finishEdit.bind(this)} update={update.bind(this)} post={post}/> :
                                    <ShowComment editMode={this.state.editMode} username={username} post={post} onRemove={this.onRemove.bind(this, post)}/>}
                            </li>)}
                    </ul>
                </div>              
                {username && <AddComment add={this.props.add.bind(this)} editMode={this.state.editMode}/>}
            </div>
        );
    }
}

Posts.propTypes = {
    posts: PropTypes.array,
    update: PropTypes.func,
    username: PropTypes.string
};

const putStateToProps = state => ({ ...state.authReducer, ...state.postsReducer });

const putActionsToProps = (dispatch) => {
    return {
        add: bindActionCreators(add, dispatch),
        get: bindActionCreators(get, dispatch),
        remove: bindActionCreators(remove, dispatch),
        update: bindActionCreators(update, dispatch),
        openConfirmModal: bindActionCreators(openConfirmModal, dispatch),
        openContextMenu: bindActionCreators(openContextMenu, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(Posts);
