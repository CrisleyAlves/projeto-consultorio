import React from 'react';
import { Link } from 'react-router';

const List = (props) => {
    
    return (
        <div>

            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">home</li>
                    <li className="breadcrumb-item active">doctors</li>
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
                                <th>Name</th>
                                <th>Crm</th>
                                <th>Phone</th>
                            </tr>
                        </thead>

                        <tbody>
                             {props.data.doctors.map((val, index) => {
                                return (
                                    <tr key={index} className="table-item" onClick={props.selectItem}>
                                        <td>{val._id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.crm}</td>
                                        <td>{val.phone}</td>
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