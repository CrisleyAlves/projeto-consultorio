import React, { Component } from 'react';
import { Link } from 'react-router';

var crud = require("../../../services/crud");

export default class Update extends Component{

    constructor(props){
        super(props);
        this.state = {
            _id: '',
            description: '',
            price: ''
        }
    }

    componentWillMount = () => {
      crud.getById("exams", this.props.id).then((response)=>{
          this.setState({
            _id: response.data._id,
            description: response.data.description,
            price: response.data.price
          })
      })
    }

    handleDescriptionChange = (e) =>{
        const description = e.target.value;        
        this.setState({
             description: description
        });
    }

    handlePriceChange = (e) =>{
        const price = e.target.value;
        
        this.setState({
             price: price
        });
    }

    handleSubmitForm = (e)=>{
        e.preventDefault();
        this.props.update(this.state);
    }

    render(){
        return(
            <div>

            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">home</li>
                    <li className="breadcrumb-item">exams</li>
                    <li className="breadcrumb-item active">new</li>
                </ol>
            </div>

            <div className="card">
                <div className="card-header">
                    <strong>Exam</strong>
                </div>
                <div className="card-body">
                    <form className="form-horizontal" id="formSubmit" onSubmit={this.handleSubmitForm}>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label">Code</label>
                            <div className="col-md-9">
                                <input className="form-control" disabled type="text" value={this.state._id} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label">Description</label>
                            <div className="col-md-9">
                                <input className="form-control" type="text" placeholder="Description"
                                       onChange={this.handleDescriptionChange}
                                       defaultValue={this.state.description}
                                 />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label">Price</label>
                            <div className="col-md-9">
                                <input className="form-control" type="text" placeholder="Price"
                                       onChange={this.handlePriceChange}
                                       defaultValue={this.state.price}
                                 />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-12">

                                <button className="btn text-success pull-right btn-action">
                                    <i className="icon-check"></i>  Save                                        
                                </button>

                                <button className="btn text-danger pull-right btn-action" onClick={this.props.back}>
                                        <i className="icon-arrow-left"></i> Back
                                </button>

                            </div>
                            
                            

                        </div>


                    </form>
                </div>
            </div>
        </div>
        )
    }
}