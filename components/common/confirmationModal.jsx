import React from 'react';

const ConfirmationModal = ({ name, state }) => {
    return (
        <div>
            {/* The button to open modal */}
            {/* <label htmlFor='confirmation-modal' className='btn'>
                open modal
            </label> */}

            {/* Put this part before </body> tag */}
            {/* <input type='checkbox' id='confirmation-modal' className='modal-toggle' /> */}
            <input type='checkbox' id='confirmation-modal' className='modal-toggle' />
            <div className='modal modal-bottom sm:modal-middle'>
                <div className='modal-box'>
                    <label
                        onClick={() => state(false)}
                        htmlFor='confirmation-modal'
                        className='btn text-white btn-error btn-sm btn-circle absolute right-2 top-2'
                    >
                        ✕
                    </label>
                    <h3 className='font-bold text-lg'>Are you sure you want to delete this?</h3>
                    <p className='py-4'>
                        <span className='text-primary font-bold capitalize'>{name}</span> will be
                        deleted from the database. Deleting this item can not be undone
                    </p>
                    <div className='modal-action'>
                        <label
                            onClick={() => state(true)}
                            htmlFor='confirmation-modal'
                            className='btn btn-success text-white'
                        >
                            Yes
                        </label>
                        <label
                            onClick={() => state(false)}
                            htmlFor='confirmation-modal'
                            className='btn btn-error text-white'
                        >
                            No
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
