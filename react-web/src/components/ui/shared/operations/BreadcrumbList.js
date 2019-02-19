import React from 'react';
import { Link } from 'react-router';

const BreadcrumbList = (props) => {

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">Início</li>
                <li className="breadcrumb-item active">exames</li>
	            <li className="breadcrumb-menu d-md-down-none">
                    <div className="btn-group" role="group" aria-label="Button group">

                        <Link className="btn text-danger" onClick={props.dangerModalShow}>
                            <i className="icon-trash"></i>  Excluir
                        </Link>

                        <Link className="btn text-warning" onClick={props.update}>
                            <i className="icon-pencil"></i>  Editar
                        </Link>

                        <Link className="btn text-success" onClick={props.new}>
                            <i className="icon-plus"></i>  Novo
                        </Link>
                    </div>
                </li>
            </ol>
        </div>
    )
}

export default BreadcrumbList;