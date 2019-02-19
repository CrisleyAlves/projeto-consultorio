import React from 'react';
import { Link } from 'react-router';

const BreadcrumbUpdate = (props) => {

    console.log('update');
    console.log(props);

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">início</li>
                <li className="breadcrumb-item">{props.module}</li>
                <li className="breadcrumb-item active">atualizar</li>
	            <li className="breadcrumb-menu d-md-down-none">
                    <div className="btn-group" role="group" aria-label="Button group">
                        
                        <Link className="btn text-danger" onClick={props.back}>
                            <i className="icon-arrow-left"></i>  Voltar
                        </Link>

                        <Link className="btn text-success" onClick={props.update}>
                            <i className="icon-check"></i> Atualizar
                        </Link>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default BreadcrumbUpdate;