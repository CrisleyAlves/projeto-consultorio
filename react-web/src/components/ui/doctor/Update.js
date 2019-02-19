import React, { Component } from 'react';
import { Link } from 'react-router';

var crud = require("../../../services/crud");

export default class Update extends Component{

    constructor(props){
        super(props);
        this.state = {
            _id: '',
            name: '',
            crm: '',
            // password: '',
            phone: '',
            email: ''
        }
    }

    componentWillMount = () => {
      crud.getById("doctors", this.props.id).then((response)=>{
          console.log(response);
          this.setState({
            _id: response.data._id,
            name: response.data.name,
            crm: response.data.crm,
            // password: response.data.password,
            phone: response.data.phone,
            email: response.data.email

          })
      })
    }

    handleNameChange = (e) =>{
        const name = e.target.value;
        this.setState({
             name: name
        });
    }

    handleCrmChange = (e) =>{
        const crm = e.target.value;
        if(crm.match(/^[0-9]*$/)){
            this.setState({
                crm: crm
            });
        }
    }

    handleEmailChange = (e) =>{
        const email = e.target.value;
        this.setState({
             email: email
        });
    }

    handlePasswordChange = (e) =>{
        const password = e.target.value;
        this.setState({
             password: password
        });
    }

    handlePhoneChange = (e) =>{
        const phone = e.target.value;
        if(phone.match(/^[0-9]*$/)){
            this.setState({
                phone: phone
            });
        }
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
                    <li className="breadcrumb-item">doctors</li>
                    <li className="breadcrumb-item active">new</li>
                </ol>
            </div>

                <div className="card">
                    <div className="card-header">
                        <strong>{this.props.module}</strong>
                    </div>
                    <div class="card-body">
                        <form class="form-horizontal" id="formSubmit" onSubmit={this.handleSubmitForm}>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Code</label>
                                <div class="col-md-9">
                                    <input class="form-control" type="text" disabled value={this.state._id}/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Name</label>
                                <div class="col-md-9">
                                    <input class="form-control" type="text" placeholder="Name" 
                                    onChange={this.handleNameChange} defaultValue={this.state.name} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">CRM</label>
                                <div class="col-md-9">
                                    <input class="form-control input-mask" type="text" placeholder="CRM" 
                                    onChange={this.handleCrmChange}  
                                    value={this.state.crm} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Phone</label>
                                <div class="col-md-9">
                                    <input class="form-control input-mask" type="text" placeholder="Phone" 
                                    maxLength={11}
                                    onChange={this.handlePhoneChange}  
                                    value={this.state.phone} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 col-form-label">Email</label>
                                <div class="col-md-9">
                                    <input class="form-control input-mask" type="email" placeholder="CRM" 
                                    onChange={this.handleEmailChange}  defaultValue={this.state.email} />
                                </div>
                            </div>
                            {/* <div class="form-group row">
                                <label class="col-md-3 col-form-label">Senha</label>
                                <div class="col-md-9">
                                    <input class="form-control input-mask" type="password" placeholder="Senha" 
                                    onChange={this.handlePasswordChange}  defaultValue={this.state.password} />
                                </div>
                            </div> */}

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