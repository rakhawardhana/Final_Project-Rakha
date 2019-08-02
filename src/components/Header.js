import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {
//     Button,
//     Collapse,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem,
//     NavbarBrand,
//     Navbar,
//     NavbarToggler, 
//     Nav,
//     NavItem,
//     UncontrolledDropdown
//     } from 'reactstrap';


class Header extends Component {
	render() {
		return (
			<header>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
					<div className="container">
						<Link className="navbar-brand" to="/">
							COFFEE EX MACHINE
						</Link>

						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link"  to="./Aboutus">
									SIAPA KITA?
									<span className="sr-only" />
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
}

export default Header;