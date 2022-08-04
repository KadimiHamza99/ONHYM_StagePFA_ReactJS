import React, { useContext } from 'react';
import { Nav, Navbar, NavbarBrand, NavItem, DropdownItem, DropdownMenu, DropdownToggle, NavbarText, UncontrolledDropdown, NavLink } from 'reactstrap';
import { LoginContext } from '../context/LoginContext';

const Header = () => {
    const { logout } = useContext(LoginContext)

    return (
        <div>
            <Navbar color="light" expand="md" light style={{opacity:'90%'}}>
                <NavbarBrand href="/">
                    <img src="/images/logo.png" height="70" width="200" alt="ONHYM LOGO" />
                </NavbarBrand>

                <Nav className="me-auto" navbar style={{ marginLeft: '10em' }}>
                    {
                        localStorage.getItem("roles").includes("DEMANDEUR") ?
                            <>
                                <NavItem>
                                    <NavLink href='/demandesAM'>
                                        <span className=''></span> Demande Acces Messagerie
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href='/demandesSI'>
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
                                            <DropdownItem href='/refus/am'>
                                                <span className=''></span> Acces Messagerie
                                            </DropdownItem>
                                        </NavItem>
                                        <NavItem>
                                            <DropdownItem href='/refus/si'>
                                                <span className=''></span> Services SI
                                            </DropdownItem>
                                        </NavItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                            : <></>
                    }

                    {
                        (localStorage.getItem("roles").includes("DPI")
                            || localStorage.getItem("roles").includes("MANAGER"))
                            && localStorage.getItem("isAuth") ?
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
                                            <DropdownItem href="/validation/am">
                                                <span className=''></span>Acces Messagerie
                                            </DropdownItem>
                                        </NavItem>

                                        <NavItem>
                                            <DropdownItem href="/validation/si">
                                                <span className=''></span>Services SI
                                            </DropdownItem>
                                        </NavItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                            : <></>
                    }

                    {
                        localStorage.getItem("roles").includes("DSI") && localStorage.getItem("isAuth") ?
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
                                            <DropdownItem href="/validation/am">
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
                                            <DropdownItem href="/validation/si">
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
                            </>
                            : <></>
                    }

                    {
                        localStorage.getItem("roles").includes("ADMIN") && localStorage.getItem("isAuth") ?
                            <>
                                <NavItem>
                                    <NavLink href='/admin/users'>
                                        <span></span> Gestion des utilisateurs
                                    </NavLink>
                                </NavItem>
                            </>
                            : <></>
                    }

                </Nav>

                <NavbarText>
                    {
                        localStorage.getItem("isAuth") ?
                            <>
                                <a href='/configuration'>
                                    <span style={{ color: '#265fd3', fontSize: '14px', marginRight: '10px'}}>Mot de passe</span>
                                </a>
                                <a href='/' onClick={logout}>
                                    <span style={{ color: '#E22525', fontSize: '14px' }}>Deconnexion</span>
                                </a>
                            </>
                            : <></>
                    }
                </NavbarText>
            </Navbar>
        </div>
    );
};

export default React.memo(Header)