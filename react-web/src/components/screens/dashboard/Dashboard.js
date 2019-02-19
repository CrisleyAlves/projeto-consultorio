import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header';

var store = require('store');

export default class Dashboard extends Component {
	
	constructor(){
		super();
		this.state ={
			user: ''
		}
	}
	
	componentWillMount = () => {
		if(store.get('user') === undefined){
			this.props.router.push('/login');
		}else{
			this.setState({
				user: store.get('user')
			})
		}
	}
	

	componentDidMount = () => {

	}

	handleLogout = () => {
		store.remove('user');
		console.log(this.props.router.push('/login'));
	}

	render() {
		return (
			<div className="home-page">
				<Header user={this.state.user} handleLogout={this.handleLogout} />
				<div className="app-body">
					<div className="sidebar">
						<nav className="sidebar-nav">
							<ul className="nav">
								<li className="nav-item">
									<Link to={"/"} className="nav-link" >
										<i className="fa fa-home"></i> Inicio
                                	</Link>
								</li>
								<li className="nav-item">
									<Link to={"pacients"} className="nav-link" >
										<i className="fa fa-user-plus"></i>  Pacients
                                	</Link>
								</li>
								{this.state.user.admin && 
									<li className="nav-item">
										<Link to={"exams"} className="nav-link" >
											<i className="fa fa-sticky-note-o"></i>  Exams
										</Link>
									</li>
								}
								
								<li className="nav-item">
									<Link to={"doctors"} className="nav-link" >
										<i className="fa fa-sticky-note-o"></i>  Doctors
									</Link>
								</li>
								
								{this.state.user.admin && 
									<li className="nav-item">
										<Link to={"users"} className="nav-link" >
											<i className="fa fa-users"></i>  Users
										</Link>
									</li>
								}
								<li className="nav-item">
									<Link to={"appointments"} className="nav-link" >
										<i className="fa fa-hospital-o"></i> Appointments
                                	</Link>
								</li>
							</ul>
						</nav>
					</div>

					{store.get('user') != undefined &&
						<div className="main col-12" id="conteudo">
							{this.props.children}
						</div>
					}

				</div>

			</div>
		)
	}

}