import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPost extends Component {
    constructor (props, context) {
        super (props, context);
        
        this.state = {
            text: props.post.text
        };
    }

    save(event) {
        event.preventDefault();

        this.props.update({ ...this.props.post, text: this.state.text })
            .then(this.props.finishEdit);
    }

    render() {
        let { post, finishEdit } = this.props;

        return (
            <form name='editPostForm' onSubmit={this.save.bind(this)} className='col col-md-12'>
                <div className='form-group'>
                    <input autoFocus autoComplete='on' className='form-control' type='text' onChange={event => this.setState({ text: event.target.value })} value={this.state.text}/>
                </div>
                <button className='btn btn-dark pull-right' disabled={this.state.text.length === 0 || this.state.text === post.text} type='submit'>Save</button>
                <button className='btn pull-right' onClick={finishEdit} type='button'>Cancel</button>
            </form>
        );
    }
}

EditPost.propTypes = {
    finishEdit: PropTypes.func,
    update: PropTypes.func,
    post: PropTypes.object
};

export default EditPost;
