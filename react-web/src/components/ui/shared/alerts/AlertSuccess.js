import React from 'react';
import { Link } from 'react-router';

const AlertSuccess = (props) => {

    return (
        <div className="col-md-12">
            <div className="col-md-4 modal-position pull-right">
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    The data was saved
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={props.hideModal}>
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertSuccess;

