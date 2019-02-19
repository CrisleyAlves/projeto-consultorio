import React from 'react';
import { Link } from 'react-router';

export default class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            description: '',
            price: 0
        }
    }

    handleDescriptionChange = (e) =>{
        const description = e.target.value;        
        this.setState({
             description: description
        });
    }

    handlePriceChange = (e) =>{
        const price = e.target.value;

        if(price.match(/^[0-9]*$/)){
            this.setState({
                price: price
            });
        }
    }

    handleSubmitForm = (e)=>{
        e.preventDefault();
        this.props.insert(this.state);
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
                            <label className="col-md-3 col-form-label">code</label>
                            <div className="col-md-9">
                                <input className="form-control" disabled type="text" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label">Description</label>
                            <div className="col-md-9">
                                <input  className="form-control" type="text" placeholder="Description"
                                        value={this.state.description}
                                        onChange={this.handleDescriptionChange}
                                 />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label">Price</label>
                            <div className="col-md-9">
                                <input  className="form-control" type="text" 
                                        placeholder="Price"
                                        value={this.state.price}
                                        onChange={this.handlePriceChange}
                                 />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-md-12">
                                <button className="btn text-success pull-right btn-action">
                                    <i className="icon-check"></i> Save                                        
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