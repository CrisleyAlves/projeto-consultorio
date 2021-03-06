import React, { Component } from 'react';
import List from "../ui/exam/List";
import Form from "../ui/exam/Form";
import Update from "../ui/exam/Update";
import AlertSuccess from '../ui/shared/alerts/AlertSuccess';
import AlertError from '../ui/shared/alerts/AlertError';
import DangerModal from '../ui/shared/modals/DangerModal';

var crud = require("./../../services/crud");

export default class Exam extends Component{

    constructor(props){
        super(props);
        this.state = {
            module: 'exams',
            exames: [],
            show: 'list',
            successAlert: false,
            errorAlert: false,
            errorAlertMessage: 'An error occurred',
            dangerModal: false,
            selectedId: null
        }
    }

    selectedItemFromTable = (e)=>{
        var tableItem = e.target.parentElement;
        var tableItems = tableItem.parentNode.childNodes;
        for(var i = 0; i< tableItems.length; i++){
            tableItems[i].classList.remove('table-selected');
        }
        tableItem.classList.add("table-selected");
        this.getSelectedId();
    }

    backToList = () =>{
        this.setState({
            show: 'list',
            selectedId: null
        });
    }

    newItemNav = () => {
        this.setState({
            show: 'form'
        });
    }
    
    updateItemNav = () => {

        if(this.state.selectedId === null){
            this.setState({
                errorAlert: true,
                errorAlertMessage: 'you must one select on item'
            });
        }else{
            this.setState({
                show: 'update'
            });
        }
        
    }

    insertNewInfo = (exam) => {
        crud.insert(this.state.module, exam).then((response)=>{
            if(response.status === 201){
                this.getAll();
                this.showSuccessAlert();
                this.backToList();
            }
        });
    }

    updateInfo = (exam) => {
        crud.update(this.state.module, exam).then((response)=>{
            if(response.status === 200){
                this.getAll();
                this.showSuccessAlert();
            }
        })
    }

    getSelectedId = () =>{
        var $info = document.querySelector('.table-selected');
        var $id = $info.children[0].childNodes[0].textContent;
        this.setState({
            selectedId: $id
        });
    }

    deleteInfo = () =>{        
        crud.delete(this.state.module, this.state.selectedId).then((response)=>{
            if(response.status === 200){
                this.hideDangerModal();
                this.getAll();
                this.showSuccessAlert();
            }
        });
    }

    showSuccessAlert = ()=>{
        this.setState({
            successAlert: true,
            show: 'list'
        });
    }

    hideSuccessModal = ()=>{
        this.setState({
            successAlert: false
        });
    }

    showErrorModal = ()=>{
        this.setState({
            errorAlert: true,
            show: 'list'
        });
    }

    hideErrorModal = ()=>{
        this.setState({
            errorAlert: false
        });
    }

    showDangerModal = ()=>{
        
        if(this.state.selectedId === null){
            this.setState({
                errorAlert: true,
                errorAlertMessage: 'you must one select on item'
            });
        }else{
            this.setState({
                dangerModal: true
            });
        }
        
    }

    hideDangerModal = ()=>{
        this.setState({
            dangerModal: false
        });
    }

    getAll = () =>{
        crud.listAll(this.state.module).then((response)=>{
            console.log(response);
            this.setState(()=>{
                return{
                    exames: response.data
                }
            })
        });
    }

    componentWillMount = () =>{
        this.getAll();
    }

    componentDidMount = ()=>{
        
    }
    
    render(){
        return(
            <div>

                {this.state.dangerModal && 
                        <DangerModal hideModal={this.hideDangerModal}
                                     module={this.state.module} 
                                     id={this.state.selectedId}
                                     delete={this.deleteInfo} />}

                {this.state.show === 'list' && 
                this.state.exames.length != 0 && 
                    <List   
                            dangerModalShow={this.showDangerModal}
                            module={this.state.module}
                            new={this.newItemNav}
                            update={this.updateItemNav}
                            data={this.state.exames}
                            selectItem={this.selectedItemFromTable} /> }

                {this.state.show === 'form' &&  
                    <Form   module={this.state.module}
                            back={this.backToList}
                            insert={this.insertNewInfo}
                             /> }

                {this.state.show === 'update' && 
                    <Update module={this.state.module}
                            back={this.backToList}
                            update={this.updateInfo}
                            id={this.state.selectedId}
                             />}


                {this.state.successAlert && <AlertSuccess hideModal={this.hideSuccessModal} /> }
                {this.state.errorAlert && 
                    <AlertError hideModal={this.hideErrorModal}
                                errorMessage={this.state.errorAlertMessage}
                     /> }

            </div>
        )
    }

}