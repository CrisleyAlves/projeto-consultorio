import React from 'react';

export default class Form extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            crm: '',
            password: '',
            phone: '',
            email: ''
        }
    }

    onNameChange = (e) =>{
        const name = e.target.value;
        this.setState({
            name: name
        });
    }

    onCrmChange = (e) =>{
        const crm = e.target.value;
        if(crm.match(/^[0-9]*$/)){
            this.setState({
                crm: crm
            });
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

    handleSubmitForm = (e)=>{
        e.preventDefault();
        this.props.insert(this.state);
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
                                <label className="col-md-3 col-form-label">Code</label>
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
                                <label className="col-md-3 col-form-label">CRM</label>
                                <div className="col-md-9">
                                    <input className="form-control input-mask" type="text" placeholder="CRM"
                                    value={this.state.crm}
                                    onChange={this.onCrmChange} maxLength={5}  />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Phone</label>
                                <div className="col-md-9">
                                    <input className="form-control input-mask" type="text" placeholder="Phone" 
                                    value={this.state.phone}
                                    onChange={this.onPhoneChange}  maxLength={11} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Email</label>
                                <div className="col-md-9">
                                    <input className="form-control input-mask" type="email" placeholder="Email" 
                                    value={this.state.email}
                                    onChange={this.onEmailChange}  />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Password</label>
                                <div className="col-md-9">
                                    <input className="form-control input-mask" type="password" placeholder="Password" 
                                    value={this.state.password}
                                    onChange={this.onPasswordChange}  />
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