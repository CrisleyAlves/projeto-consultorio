import React from 'react';
var axios = require("axios");
var crud = require("../../../services/crud");

export default class Update extends React.Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            _id: '',
            name: '',
            email: '',
        }
    }

     componentWillMount = () => {
      crud.getById(this.props.module, this.props.id).then((response)=>{
          console.log(response);
          this.setState({
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email
          })
      })
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

    handleSubmitForm = (e)=>{
        e.preventDefault();
        this.props.update(this.state);
    }
    
    render(){
        return(
            <div>
                <div className="card">
                    <div className="card-header">
                        <strong>Médicos</strong>
                    </div>
                    <div className="card-body">
                        <form className="form-horizontal" id="formSubmit" onSubmit={this.handleSubmitForm}>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">ID</label>
                                <div className="col-md-9">
                                    <input className="form-control" disabled type="text" value={this.state._id}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">Nome</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="text" placeholder="Nome" 
                                    value={this.state.name}
                                    onChange={this.onNameChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">email</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="email" placeholder="Email" 
                                    value={this.state.email}
                                    onChange={this.onEmailChange}  />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-md-12">
                                    <button className="btn text-success pull-right btn-action">
                                        <i className="icon-check"></i>  Salvar                                        
                                    </button>
                                    <button className="btn text-danger pull-right btn-action" onClick={this.props.back}>
                                            <i className="icon-arrow-left"></i> Voltar
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