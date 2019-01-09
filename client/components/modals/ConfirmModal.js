import React from 'react';

export default function(props) {
    return (
        <>
            <div className='modal-body'>
                <div className='text-center'>
                    {props.message || <p>Are you sure?</p>}
                </div>
            </div>
            <div className='modal-footer'>
                <button type='button' onClick={props.onResolve} className='btn btn-dark'>Yes</button>
                <button type='button' onClick={props.onClose} className='btn btn-danger'>No</button>
            </div>
        </>
    );
}
