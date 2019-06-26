import React from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import { connect } from 'react-redux';

import { onLogoutUser } from '../actions/index'


class Header extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    onButtonClick = () => {
        // Log out -> menghapus username dari redux state
        // onLogoutUser = action creator
        this.props.onLogoutUser();

    }


    render() {
        // Kalo BELOM LOGIN
        if (this.props.STATEUSER.username == '') {
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce.com</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink to="/">All products</NavLink>
                            </NavItem>
    
                            <NavItem>
                                <Link to="/register">
                                    <Button color="primary" className="mx-3"> Register </Button>
                                </Link>
                                
                            </NavItem>
    
                            <NavItem>
                                <Link to="/login">
                                    <Button color="success"> Login </Button>
                                </Link>
                                
                            </NavItem>
                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
            // Kalo UDAH LOGIN
        } else {
            return (
                <div>
                  <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                        <NavItem>
                          <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                          <DropdownToggle nav caret>
                             <b> Hello, {this.props.STATEUSER.username} </b>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem>
                              Option 1
                            </DropdownItem>
                            <DropdownItem>
                              Option 2
                            </DropdownItem>
                            <DropdownItem divider />

                            <Button className="dropdown-item" onClick={ () => {this.onButtonClick()} }>
                              Logout
                            </Button>

                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    </Collapse>
                  </Navbar>
                </div>
              );
        }

        
    }
}

const mapStateToProps = (state) => {
    return {
        STATEUSER : state.auth    //  {id, username}
    }
}

export default connect(mapStateToProps, { onLogoutUser })(Header);