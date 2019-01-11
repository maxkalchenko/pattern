import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddPost extends Component {
    constructor (props, context) {
        super (props, context);
        
        this.state = {
            text: 'Hello, this is test #' + Date.now() + '.'
        };
    }

    add(event) {
        event.preventDefault();

        this.props.add({ text: this.state.text })
            .then(() => this.setState({ text: '' }));
    }

    render() {
        return (
            <form name='addPostForm' onSubmit={this.add.bind(this)} className='col col-lg-6'>
                <div className='form-group'>
                    <label className=''>Post: </label>
                    <input autoComplete='on' disabled={this.props.editMode} className='form-control' type='text' onChange={event => this.setState({ text: event.target.value })} value={this.state.text}/>
                </div>
                <button className='btn btn-dark pull-right' disabled={this.state.text.length === 0 || this.props.editMode} type='submit'>Add</button>
            </form>
        );
    }
}

AddPost.propTypes = {
    editMode: PropTypes.bool,
    add: PropTypes.func
};
  
export default AddPost;
