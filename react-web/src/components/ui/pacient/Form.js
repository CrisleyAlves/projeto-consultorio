import React from 'react';
var axios = require("axios");
var AppUtils = require("../../../utils/AppUtils");

export default class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone: '',
            cpf: '',
            password: '',
            email: '',
            photo: '',
            selectedFile: '',
            validCpf: false
        }
    }

    onNameChange = (e) =>{
        const name = e.target.value;
        this.setState({
            name: name
        });
    }

    onCpfChange = (e) =>{
        const cpf = e.target.value;
        if(cpf.match(/^[0-9]*$/)){
            this.setState({
                cpf: cpf
            });
        }

        if(cpf.length === 11){
            this.setState({
                validCpf: AppUtils.cpfValidator(e.target.value)
            })
        }else{
            this.setState({
                validCpf: AppUtils.cpfValidator(e.target.value)
            })
        }
    }

    onPasswordChange = (e) =>{
        const password = e.target.value;
        this.setState({
            password: password
        });
    }

    onPhoneChange = (e) =>{
        const phone = e.target.value;
        if(phone.match(/^[0-9]*$/)){
            this.setState({
                phone: phone
            });
        }
        
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
            photo: e.target.files[0].name
        });
    }

    handleSubmitForm = (e)=>{
        e.preventDefault();

        const fd = new FormData();
        fd.append('photo', this.state.selectedFile, this.state.selectedFile.name);

        axios.post('http://localhost:3000/pacients/uploadFile/', fd).then((res)=>{
            if(res.status === 200){
                this.props.insert(this.state);
            }
        }).catch((error)=>{
             
        });
    }
    
    render(){
        return(
            <div>
                <div className="card">
                    <div className="card-header">
                        <strong>Doctors</strong>
                    </div>
                    <div className="card-body">
                        <form className="form-horizontal" id="formSubmit" onSubmit={this.handleSubmitForm}>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">ID</label>
                                <div className="col-md-9">
                                    <input className="form-control" disabled type="text"/>
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
                                <label className="col-md-3 col-form-label">Phone</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="text" placeholder="Phone"
                                    value={this.state.phone}
                                    onChange={this.onPhoneChange} maxLength={11}  />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">CPF</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="text" placeholder="CPF" 
                                    value={this.state.cpf}
                                    onChange={this.onCpfChange}  maxLength={11} />
                                    {this.state.validCpf && this.state.cpf.length === 11 && <small className="text-success">valid cpf</small> }
                                    {!this.state.validCpf && this.state.cpf.length === 11 && <small className="text-danger">invalid cpf</small> }
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