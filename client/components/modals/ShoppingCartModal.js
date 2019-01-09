import React from 'react';

export default function(props) {
    return (
        <>
            <div className='modal-body'>
                <div className='text-center'>
                    <i className='fa fa-shopping-cart nav-link'></i>
                    <p>YOUR CART IS EMPTY</p>
                </div>
            </div>
            <div className='modal-footer'>
                {/* <button type='button' onClick={() => {}} className='btn btn-dark'>Buy</button> */}
                <button type='button' onClick={props.onClose} className='btn btn-danger'>Close</button>
            </div>
        </>
    );
}
