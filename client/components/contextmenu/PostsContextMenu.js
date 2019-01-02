import React from 'react';

export default function(props) {
    let date = new Date(props.data.created_at);

    return (
        <>
            <li style={{ width: 'max-content'}}>
                <a style={{ display: 'block', padding: '3px 20px', color: '#333' }} href='javascript:void(0)'>
                    <i className='fa fa-info-circle'></i> Id is {props.data.id}
                </a>
            </li>
            <li style={{ width: 'max-content'}}>
                <a style={{ display: 'block', padding: '3px 20px', color: '#333' }} href='javascript:void(0)'>
                    <i className='fa fa-user'></i> By {props.data.username}
                </a>
            </li>
            <li className='dropdown-header' style={{ width: 'max-content'}}>
                {/* <a style={{ display: 'block', padding: '3px 20px', color: '#333' }} href='javascript:void(0)'> */}
                <i className='fa fa-question-circle'></i> Created at {date.getFullYear()}/{date.getMonth()}/{date.getDay()} - {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                {/* </a> */}
            </li>
        </>
    );
}
