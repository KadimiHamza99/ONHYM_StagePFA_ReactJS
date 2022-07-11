import React, { useContext } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, DropdownItem, DropdownMenu, DropdownToggle, NavbarText, UncontrolledDropdown } from 'reactstrap';
import { LoginContext } from '../context/LoginContext';

const Header = () => {
    const { logout } = useContext(LoginContext)

    return (
        <div>
            <Navbar
                color="light"
                expand="md"
                light
            >
                <NavbarBrand href="/">
                    <img src="onhym-logo.png" height="70" width="100" alt="logo" />
                </NavbarBrand>

                <Nav
                    className="me-auto"
                    navbar
                    style={{marginLeft:'15em'}}
                >
                    {
                        localStorage.getItem("grade") === "DPI" &&
                            localStorage.getItem("isAuth") ?
                            <>
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        caret
                                        nav
                                    >
                                        Demandes Acces Messagerie
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <DropdownItem href="dpi/demandes_am">
                                                <span className='fa fa-home fa-lg'></span>En Attente
                                            </DropdownItem>
                                        </NavItem>

                                        <NavItem>
                                            <DropdownItem href="demandes_am">
                                                <span className='fa fa-home fa-lg'></span> Toutes les demandes
                                            </DropdownItem>
                                        </NavItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        caret
                                        nav
                                    >
                                        Demandes Service SI
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <DropdownItem href="dpi/demandes_si">
                                                <span className='fa fa-home fa-lg'></span>En Attente
                                            </DropdownItem>
                                        </NavItem>
                                        <NavItem>
                                            <DropdownItem href="demandes_si">
                                                <span className='fa fa-home fa-lg'></span> Toutes les demandes
                                            </DropdownItem>
                                        </NavItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </> : <></>
                    }
                    {
                        (localStorage.getItem("grade") === "MANAGER" ||
                            localStorage.getItem("grade") === "DEMANDEUR") &&
                            localStorage.getItem("isAuth") ?
                            <>

                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        caret
                                        nav
                                    >
                                        Faire une Demande
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href="/demande/am">
                                            <span className='fa fa-home fa-lg'></span> Demande Acces Messagerie
                                        </DropdownItem>

                                        <DropdownItem href="/demande/si">
                                            <span className='fa fa-home fa-lg'></span> Demande Service SI
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </> : <></>
                    }
                    {
                        localStorage.getItem("grade") === "MANAGER" &&
                            localStorage.getItem("isAuth") ?
                            <>
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        caret
                                        nav
                                    >
                                        Demandes en Attentes
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <NavItem>
                                            <DropdownItem href="manager/demandes_am">
                                                <span className='fa fa-home fa-lg'></span>Acces Messagerie 
                                            </DropdownItem>
                                        </NavItem>

                                        <NavItem>
                                            <DropdownItem href="manager/demandes_si">
                                                <span className='fa fa-home fa-lg'></span>Services SI 
                                            </DropdownItem>
                                        </NavItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </> : <></>
                    }
                </Nav>

                <NavbarText>
                    {localStorage.getItem("isAuth") ?
                        <a href='/' onClick={logout}>
                            <span className='fa fa-logout fa-lg' style={{color:'#E22525'}}>Deconnexion</span>
                        </a>
                        : <></>}
                </NavbarText>
            </Navbar>
        </div>
    );
};

export default Header;