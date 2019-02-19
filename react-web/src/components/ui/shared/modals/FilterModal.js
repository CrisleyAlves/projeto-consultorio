import React from 'react';
import { Link } from 'react-router';

const DangerModal = (props) => {

    return (
        <div className="modal fade show show-modal" id="infoModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog modal-info" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{props.module}</h4>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close" onClick={props.hideModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <p>#Filtros</p>
                        
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-info text-white" type="button" onClick={props.delete}>Filtrar</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default DangerModal;