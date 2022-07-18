import React, { useContext } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, DropdownItem, DropdownMenu, DropdownToggle, NavbarText, UncontrolledDropdown, NavLink } from 'reactstrap';
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
                    <img src="/images/logo.png" height="70" width="100" alt="ONHYM LOGO" />
                </NavbarBrand>

                <Nav
                    className="me-auto"
                    navbar
                    style={{ marginLeft: '10em' }}
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
                                        <span className=''></span>
                                        Demandes Acces Messagerie
                                    </DropdownToggle>
                                    <DropdownMenu end
                                    >
                                        <NavItem>
                                            <DropdownItem href="/dsi/attente/demandesAM">
                                                <span className=''></span>En Attente
                                            </DropdownItem>
                                        </NavItem>

                                        <NavItem>
                                            <DropdownItem href="/dsi/demandesAM">
                                                <span className=''></span> Toutes les demandes
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
                                    <DropdownMenu end>
                                        <NavItem>
                                            <DropdownItem href="/dsi/attente/demandesSI">
                                                <span className=''></span>En Attente
                                            </DropdownItem>
                                        </NavItem>
                                        <NavItem>
                                            <DropdownItem href="/dsi/demandesSI">
                                                <span className=''></span> Toutes les demandes
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
                                <NavItem>
                                    <NavLink href=''>
                                        <span className=''></span> Demande Acces Messagerie
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href=''>
                                        <span className=''></span> Demande Service SI
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        caret
                                        nav
                                    >
                                        Demandes Refusés
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <NavItem>
                                            <DropdownItem href='/demandes-Refuses/am'>
                                                <span className=''></span> Acces Messagerie 
                                            </DropdownItem>
                                        </NavItem>
                                        <NavItem>
                                            <DropdownItem href='/demandes-Refuses/si'>
                                                <span className=''></span> Services SI
                                            </DropdownItem>
                                        </NavItem>
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
                                    <DropdownMenu end>
                                        <NavItem>
                                            <DropdownItem href="/manager/attente/demandesAM">
                                                <span className=''></span>Acces Messagerie
                                            </DropdownItem>
                                        </NavItem>

                                        <NavItem>
                                            <DropdownItem href="/manager/attente/demandesSI">
                                                <span className=''></span>Services SI
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
                            <span className='fa fa-logout fa-lg' style={{ color: '#E22525', fontSize: '14px' }}>Deconnexion</span>
                        </a>
                        : <></>
                    }
                </NavbarText>
            </Navbar>
        </div>
    );
};

export default React.memo(Header)