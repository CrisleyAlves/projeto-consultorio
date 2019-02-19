import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

var crud = require("../../../services/crud");
var pacient = require("../../../services/pacient");
var doctor = require("../../../services/doctor");
var store = require("store");

export default class Form extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            beforeAppointment: '',
            afterAppointment: '',
            date: '',
            doctor: {
                _id: ''
            },
            pacient: {
                _id: ''
            },
            user: {
                _id: ''
            },
            totalPrice: 0,
            exams: [],
            allExams: [],
            selectedExamObject: {
                _id: '',
                description: '',
                price: ''
            },
            pesquisaCpf: '', 
            pesquisaCrm: '',
        }
    }

    componentWillMount = () => {
        crud.listAll('exams').then((response)=>{
            this.setState(()=>{
                return{
                    allExams: response.data.exams,
                    user: store.get('user')
                }
            })
        });
    }

    handleDateChange = (date) =>{
        this.setState({
            date: date
        });
    }

    handlGetPacientByCpf = (e)=>{
        const pesquisaCpf = e.target.value;

        if(this.state.pacient._id.length != 0 && pesquisaCpf.length != 11){
            const emptyObject = {
                _id: '',
                name: '',
                cpf: ''
            }
            this.setState(()=>{ return{ pacient: emptyObject } });
        }

        if(pesquisaCpf.match(/^[0-9]*$/)){
            this.setState({
                pesquisaCpf: pesquisaCpf
            });
        }
    }

    searchByCpf = (e) => {
        e.preventDefault();

        pacient.getPacientByCpf(this.state.pesquisaCpf).then((response) => {
            if(response.status === 200){
                this.setState(()=>{
                    return{
                        pacient: response.data.pacient
                    }
                })
            }
        }).catch(() => {            
            this.setState(()=>{
                return{
                    pacient: {
                        _id: '',
                        name: '',
                        cpf: ''
                    }
                }
            })
        })
    }

     searchByCrm = (e) => {
        e.preventDefault();

        doctor.getDoctorByCrm(this.state.pesquisaCrm).then((response) => {
            if(response.status === 200){
                this.setState(()=>{
                    return{
                        doctor: response.data.doctor
                    }
                })
            }
        }).catch(() => {
            
            this.setState(()=>{
                return{
                    doctor: {
                        _id: '',
                        name: '',
                        crm: ''
                    }
                }
            })
        })
    }

    onBeforeAppointmentChange = (e) => {
        const before = e.target.value;
        this.setState(()=>{ return { beforeAppointment: before } });
    }

    onAfterAppointmentChange = (e) => {
        const after = e.target.value;
        this.setState(()=>{ return { afterAppointment: after } });
    }

    handlGetMedicoByCrm = (e)=>{
        const pesquisaCrm = e.target.value;

        if(this.state.doctor._id.length != 0 && pesquisaCrm.length != 5){
            const emptyObject = {
                _id: '',
                name: '',
                crm: ''
            }
            this.setState(()=>{ return { doctor: emptyObject } });
        }

        if(pesquisaCrm.match(/^[0-9]*$/)){
            this.setState({
                pesquisaCrm: pesquisaCrm
            });
        }
    }

    handlGetExameById = (e) =>{
                    
    }    

    onSelectExam = (val, obj) =>{
        this.setState({ 
            selectedExamObject: obj
        })
    }

    onGetItemValue = (item) =>{
        return item.description
    }

    handleAddExame = (e) =>{
        
        const exam = {
            _id: this.state.selectedExamObject._id,
            description: this.state.selectedExamObject.description,
            price: this.state.selectedExamObject.price
        }

        const newExams = this.state.exams;
        newExams[this.state.exams.length] = exam;

        this.setState(()=> {
            return{
                exams: newExams,
                totalPrice: (Math.round(this.state.totalPrice * 100) / 100) + (Math.round(exam.price * 100) / 100)
            }
        });

    	e.preventDefault();
    }

    removeExam = (e) =>{
        const index = e.target.id;
        const exam = this.state.exams[index];
        const newExams = this.state.exams;
        newExams.splice(index, 1);
        this.setState({
            exams: newExams,
            totalPrice: (Math.round(this.state.totalPrice * 100) / 100) - (Math.round(exam.price * 100) / 100)
        });
    }

    handleSubmitForm = (e)=>{
        e.preventDefault();

        const oficial = {
            _id: this.state._id,
            beforeAppointment: this.state.beforeAppointment,
            afterAppointment: this.state.afterAppointment,
            date: this.state.date,
            doctor: {
                _id: this.state.doctor._id
            },
            pacient: {
                _id: this.state.pacient._id
            },
            totalPrice: this.state.totalPrice,
            exams: this.state.exams,
            user: {
                _id: this.state.user._id
            }
        }

        this.props.insert(this.state);
    }

    render(){
        return (
        <div>

            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">home</li>
                    <li className="breadcrumb-item">appointments</li>
                    <li className="breadcrumb-item active">new</li>
                </ol>
            </div>


            <div className="card">
                <div className="card-header">
                    <strong>Appointment</strong>
                </div>
                <div className="card-body">
                    <form className="form-horizontal" id="formSubmit" onSubmit={this.handleSubmitForm}>

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

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label">Code</label>
                            <div className="col-md-9">
                                <input className="form-control" type="text" disabled value={this.state._id}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-3 col-form-label">Before</label>
                            <div className="col-md-3">
                                <input  className="form-control" type="text" placeholder="Before" 
                                        value={this.state.beforeAppointment}
                                        onChange={this.onBeforeAppointmentChange} />
                            </div>
                            <label className="col-md-2 col-form-label">After</label>
                            <div className="col-md-3">
                                <input  className="form-control" type="text" placeholder="After" 
                                        value={this.state.afterAppointment}
                                        onChange={this.onAfterAppointmentChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label" htmlFor="text-input">Date</label>
                            <div className="col-md-9">
                                <div className="input-group">
                                    <span className="input-group-prepend"> <span
                                        className="input-group-text"> <i className="fa fa-calendar"></i>
                                    </span>
                                    </span>
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.handleDateChange}
                                        showTimeSelect
                                        locale="en-us"
                                        minTime={moment().hours(8).minutes(0)}
                                        maxTime={moment().hours(18).minutes(0)}
                                        dateFormat="MMM-DD-YYYY HH:mm:ss"
                                        placeholderText="Date and hour"
                                        isClearable={true}
                                        shouldCloseOnSelect={false}
                                    />

                                </div>
                            </div>

                        </div>

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label" htmlFor="text-input">Pacient</label>
                            <div className="col-md-2">
                                <input className="form-control" value={this.state.pesquisaCpf} type="text" maxLength={11} placeholder="CPF" onChange={this.handlGetPacientByCpf} />
                                {this.state.pacient._id.length != 0 && <small className="text-success">valid information</small> }
                                {this.state.pacient._id.length === 0 && <small className="text-danger">invalid information</small> }
                                
                            </div>
                            <div className="col-md-1">
                                <button className="btn text-success" disabled={this.state.pesquisaCpf.length != 11} onClick={this.searchByCpf}>search</button>
                            </div>
                            <div className="col-md-3">
                                <input className="form-control" disabled type="text" placeholder="Name" value={this.state.pacient.name} />
                            </div>
                            <div className="col-md-3">
                                <input className="form-control" disabled type="text" placeholder="Cpf" value={this.state.pacient.cpf}/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label" htmlFor="text-input">Doctor</label>
                            <div className="col-md-2">
                                <input className="form-control" type="text" maxLength={5} placeholder="CRM" value={this.state.pesquisaCrm} onChange={this.handlGetMedicoByCrm} />
                                {this.state.doctor._id.length != 0 && <small className="text-success">valid information</small> }
                                {this.state.doctor._id.length === 0 && <small className="text-danger">invalid information</small> }
                            </div>
                            <div className="col-md-1">
                                <button className="btn text-success" disabled={this.state.pesquisaCrm.length != 5} onClick={this.searchByCrm} >search</button>
                            </div>
                            <div className="col-md-3">
                                <input className="form-control" disabled type="text" placeholder="Name" value={this.state.doctor.name} />
                            </div>
                            <div className="col-md-3">
                                <input className="form-control" disabled type="text" placeholder="CRM" value={this.state.doctor.crm} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label" htmlFor="text-input">Exams</label>

                            <div className="col-md-3 acima">
                                <Autocomplete
                                    getItemValue={this.onGetItemValue}
                                    items={this.state.allExams}
                                    renderItem={(item, isHighlighted) =>
                                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                         {item.description}
                                        </div>
                                    }
                                    value={this.state.selectedExamObject.description}
                                    onSelect={this.onSelectExam}
                                    />
                            </div>
                            <div className="col-md-2">
                                <input className="form-control" type="text" disabled defaultValue={this.state.selectedExamObject.price} placeholder="Price" />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-md btn-success" id="adicionaExame" onClick={this.handleAddExame}>add</button>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-3 col-form-label" htmlFor="text-input">Price
                                Total</label>
                            <div className="col-md-2">
                                <input className="form-control" type="text" disabled value={this.state.totalPrice} />
                            </div>
                        </div>

                        <table
                            className="table table-responsive-sm table-bordered table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="examesSelecionados">
                                    {this.state.exams.map((exam, index)=>{
                                        return(
                                            <tr key={exam._id}>
                                                <td>{exam.description}</td>
                                                <td>{exam.price}</td>
                                                <td>
                                                    <i className="fa fa-trash text-danger" id={index} onClick={this.removeExam} ></i>
                                                </td>
                                            </tr>
                                        )
                                        
                                    })}
                            </tbody>
                        </table>


                        


                    </form>
                </div>
            </div>
        </div>
    )
    }

}