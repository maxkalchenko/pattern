import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { get } from '../store/reducers/news/actions';
import { openContextMenu } from '../store/reducers/contextmenu/actions';

class News extends Component {
    componentDidMount() {
        this.props.get();
    }

    openContextMenuFor(item, event) {
        this.props.openContextMenu(event, [{
            label: item.body,
            icon: 'fa-info',
            check: true
        }]);
    }

    render() {
        let { news } = this.props;

        const content = news.map(item => (
            <div key={item.id} style={{ padding: '15px', }} onContextMenu={event => this.openContextMenuFor(item, event)}>
                <img src={item.url} className='img-thumbnail' alt={item.title} width='200' height='200'/>
                <div className='caption' style={{ maxWidth: '200px' }}>
                    <b>{item.title}</b>
                </div>
            </div>
        )); 

        return (
            <div className='d-flex flex-wrap justify-content-between'>
                {content}
            </div>
        );
    }
}

News.propTypes = {
    news: PropTypes.array
};

const putStateToProps = state => state.newsReducer;

const putActionsToProps = (dispatch) => {
    return {
        get: bindActionCreators(get, dispatch),
        openContextMenu: bindActionCreators(openContextMenu, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(News);
