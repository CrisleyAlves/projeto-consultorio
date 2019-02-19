import React from 'react';
import BreadcrumbList from '../shared/operations/BreadcrumbList';
import { Link } from 'react-router';

const List = (props) => {
    
    return (
        <div>

            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">home</li>
                    <li className="breadcrumb-item active">exams</li>
                    <li className="breadcrumb-menu d-md-down-none">
                        <div className="btn-group" role="group" aria-label="Button group">

                            <Link className="btn text-danger" onClick={props.dangerModalShow}>
                                <i className="icon-trash"></i> delete
                            </Link>

                            <Link className="btn text-warning" onClick={props.update}>
                                <i className="icon-pencil"></i> edit
                            </Link>

                            <Link className="btn text-success" onClick={props.new}>
                                <i className="icon-plus"></i> new
                            </Link>
                        </div>
                    </li>
                </ol>
            </div>

            <div className="card">
                <div className="card-body">
                    <table id="datatable" className="table table-sm table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.data.exams.map((val, index) => {
                                return (
                                    <tr key={index} className="table-item" onClick={props.selectItem}>

                                        <td>{val._id}</td>
                                        <td>{val.description}</td>
                                        <td>{(Math.round(val.price * 100) / 100).toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )

}

export default List;