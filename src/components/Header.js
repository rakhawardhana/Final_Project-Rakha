import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logoutUser } from '../actions'






import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    // NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
        //   productcart: []
        };
      }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

  

    onButtonClick = () => {
        // menghapus username dari redux state
        this.props.logoutUser()
    }

    

    render () {

         if(this.props.user.name === ''){
        // Render ketika belum login
            return (
                <div>
                    <Navbar color="black" light expand="md">
                    <NavbarBrand href="/">COFFEE EX MACHINE</NavbarBrand>
					<NavbarBrand href="./Aboutus">SIAPA KITA?</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar >
                        <NavItem>
                            <Link to='./item' >All Products</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/register'>
                                <Button color="primary" className="mx-3">Register</Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login' >
                                <Button color="success">Login</Button>
                            </Link>
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        } 

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">COFFEE EX MACHINE</NavbarBrand>
					<NavbarBrand href="./Aboutus">SIAPA KITA?</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem className='mt-2'>
                        <Link to='./item' >All Products</Link>
                    </NavItem>
                    {/* <NavItem className='mt-2 ml-auto'>
                        <Link to='/checkout' >
                            <button className = 'btn btn-primary ml-4 mt-auto'>{this.jumlahCart()}
                            <img id='cart' className='ml-2 mr-2' src='https://image.flaticon.com/icons/svg/34/34568.svg'></img>Shopping Cart 
                            </button>
                        </Link>
                    </NavItem> */}
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    Hallo, {this.props.user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                        <Link to='/cart' >Cart</Link>
                        </DropdownItem>
                        <DropdownItem>
                        <Link to='/profile' >Profile</Link>
                        </DropdownItem>
                        <DropdownItem>
                        <Link to='/editprofile' >Edit Profile</Link>
                        </DropdownItem>
                        <DropdownItem divider />
                        <Link to='/login' >
                        <Button className='dropdown-item' onClick={this.onButtonClick}>
                            Logout
                        </Button>
                        </Link>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
            
          );
        }
    
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps, {logoutUser})(Header)
