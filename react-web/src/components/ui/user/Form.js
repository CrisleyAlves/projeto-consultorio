import React from 'react';
var axios = require("axios");
var AppUtils = require("../../../utils/AppUtils");

export default class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            _id: '',
            name: '',
            password: '',
            email: '',
            photo: '/uploads/users/',
            admin: false,
            selectedFile: ''
        }
    }

    onNameChange = (e) =>{
        const name = e.target.value;
        this.setState({
            name: name
        });
    }

    onPasswordChange = (e) =>{
        const password = e.target.value;
        this.setState({
            password: password
        });
    }

    onEmailChange = (e) =>{
        const email = e.target.value;
        this.setState({
            email: email
        });
    }

    onPhotoChange = (e) =>{
        const photoName = e.target.files[0];
        this.setState({
            selectedFile: photoName,
            photo: this.state.photo + e.target.files[0].name
        });
    }

    handleSubmitForm = (e)=>{
        e.preventDefault();

        const fd = new FormData();
        fd.append('photo', this.state.selectedFile, this.state.selectedFile.name);

        axios.post('http://localhost:3000/users/uploadFile/', fd).then((res)=>{
            if(res.status === 200){
                this.props.insert(this.state);
            }
        }).catch((error)=>{
             
        });
    }

    onAdminChange = (e) => {
        const admin = e.target.value;
        
        this.setState({
            admin: this.state.admin === true ? false: true
        })
    }
    
    render(){
        return(
            <div>
                <div className="card">
                    <div className="card-header">
                        <strong>Users</strong>
                    </div>
                    <div className="card-body">
                        <form className="form-horizontal" id="formSubmit" onSubmit={this.handleSubmitForm}>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">ID</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="text" disabled value={this.state._id}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Name</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="text" placeholder="Name" 
                                    value={this.state.name}
                                    onChange={this.onNameChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Email</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="email" placeholder="Email" 
                                    value={this.state.email}
                                    onChange={this.onEmailChange}  />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Password</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="password" placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.onPasswordChange}  />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Photo</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="file" onChange={this.onPhotoChange}  />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Admin</label>
                                <div className="col-md-9">
                                    <select className="form-control" onChange={this.onAdminChange}>
                                        <option value="false">No</option>
                                        <option vaule="true">Yes</option>
                                    </select>
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