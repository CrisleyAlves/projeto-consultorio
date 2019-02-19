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
            phone: '',
            cpf: '',
            email: '',
        }
    }

     componentWillMount = () => {
      crud.getById("pacients", this.props.id).then((response)=>{
          this.setState({
            _id: response.data._id,
            name: response.data.name,
            phone: response.data.phone,
            cpf: response.data.cpf,
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

    onCpfChange = (e) =>{
        const cpf = e.target.value;
        if(cpf.match(/^[0-9]*$/)){
            this.setState({
                cpf: cpf
            });
        }
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
                                <label className="col-md-3 col-form-label">Telefone</label>
                                <div className="col-md-9">
                                    <input className="form-control" type="text" placeholder="Telefone"
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