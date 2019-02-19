import React, { Component } from 'react';

var store = require("store");

export default class Header extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
			this.props.user != undefined && 
			<header className="app-header navbar">
				<button className="navbar-toggler sidebar-toggler d-lg-none mr-auto"
					type="button" data-toggle="sidebar-show">
					<span className="navbar-toggler-icon"></span>
				</button>
				<a className="navbar-brand" href="#"> 
					<img className="navbar-brand-full" src="img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo" />
					<img className="navbar-brand-minimized" src="img/brand/sygnet.svg" width="30" height="30" alt="CoreUI Logo" />
				</a>
				{/* <button className="navbar-toggler sidebar-toggler d-md-down-none"
					type="button" data-toggle="sidebar-lg-show">
					<span className="navbar-toggler-icon"></span>
				</button> */}
				<ul className="nav navbar-nav ml-auto">
					<li className="nav-item dropdown"><a className="nav-link"
						data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
						aria-expanded="false"> <img className="img-avatar" src={this.props.user.photo} alt={this.props.user.email} />
					</a>
						<div className="dropdown-menu dropdown-menu-right">
							<div className="dropdown-header text-center">
								<strong>Account</strong>
							</div>
							<span className="dropdown-item"> <i className="fa fa-user"></i> {this.props.user.name} </span> 
							<span className="dropdown-item"> <i className="fa fa-envelope-o"></i> {this.props.user.email} </span> 
							<span className="dropdown-item" onClick={this.props.handleLogout} > <i className="fa fa-lock"></i> Logout </span> 
						</div>
					</li>
				</ul>
			</header>
		)
	}
}