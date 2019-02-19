import React from 'react';
import { Link } from 'react-router';

const DangerModal = (props) => {

    return (
        <div className="modal fade show show-modal" id="dangerModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-danger" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title"></h4>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close" onClick={props.hideModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p> The data which has the following code is going to be deleted: </p>
                        <p>Code: {props.id}</p>
                        <p></p>
                        <p>Continue?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" type="button" onClick={props.delete}>Delete</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default DangerModal;