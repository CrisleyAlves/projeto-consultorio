import React from 'react';
import { Link } from 'react-router';

const AlertError = (props) => {

    return (
        <div className="col-md-12">
            <div className="col-md-4 modal-position pull-right">
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{props.errorMessage}</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={props.hideModal}>
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertError;

