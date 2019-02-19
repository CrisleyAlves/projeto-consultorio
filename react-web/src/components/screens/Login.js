import React, { Component } from 'react';

var user = require('../../services/user');
var store = require('store');

export default class Login extends Component{

    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            errorMessage: false
        }

    }

    handleOnEmailChange = (e) => {
        const email = e.target.value;
        this.setState({
            email: email
        });
    }

    handleOnPasswordChange = (e) => {
        const password = e.target.value;
        this.setState({
            password: password
        });
    }

    handleSubmitForm = (e) => {
        user.loginEmailAndPassword(this.state).then((response) => {
            console.log(response);
            if(response.status === 200){
                store.set("user", {
                    _id: response.data.user._id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    photo: 'http://localhost:3000'+response.data.user.photo,
                    admin: response.data.user.admin,
                    token: response.data.token
                });

                //manda para o Dashboard
                this.props.router.push('/');
                
            }
        }).catch((error) => {
            this.setState({
                errorMessage: true
            })
        })

        e.preventDefault();
    }


    render(){
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <form className="col-md-5 login-form" onSubmit={this.handleSubmitForm}>
                        <div className="card-group">
                            <div className="card p-4">
                                <div className="card-body">
                                    <h1>Login</h1>
                                    <p className="text-muted">Sign In to your account</p>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="icon-user"></i>
                                            </span>
                                        </div>
                                        <input  className="form-control" type="email" placeholder="Email"
                                                onChange={this.handleOnEmailChange} />
                                    </div>
                                    <div className="input-group mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"> <i className="icon-lock"></i></span>
                                        </div>
                                        <input  className="form-control" type="password" placeholder="Password"
                                                onChange={this.handleOnPasswordChange}  />
                                    </div>

                                    {this.state.errorMessage && 
                                        <div className="row">
                                            <div className="col-12">
                                                <p className="list-group-item list-group-item-danger"> Authentication failed </p>
                                            </div>
                                        </div>
                                    }

                                    <br />
                                    <div className="row">
                                        <div className="col-6">
                                            <button className="btn btn-primary px-4" type="submit">Login</button>
                                        </div>
                                        <div className="col-6 text-right">
                                            <button className="btn btn-link px-0" type="button">Forgot
                                                password?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }

}