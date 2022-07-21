import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table, Badge, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { DataContext } from '../context/DataContext';

const Users = () => {

    const {users,setUsers} = useContext(DataContext)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [add,setAdd] = useState({
        isError:false,
        isSuccess:false
    })

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    useLayoutEffect(() => {
        var config = {
            headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") }
        }
        axios.get('http://localhost:8000/configuration/admin/getUsers', config)
            .then((response) => {
                setUsers((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    data: response.data
                }))
            })
            .catch((error) => {
                setUsers((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isError: true,
                    ErrMsg: error.message
                }))
            })
    }, [])


    const handleAdd = (e) => {
        e.preventDefault()
        if (window.confirm("Vous allez ajouter un utilisateur , etes-vous sur ?")) {
            var config = {
                headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") },
            }
            var body = {
                username: username,
                email:email,
                password:password
            }
            axios.post("http://localhost:8000/configuration/admin/createUser", body,config)
                .then((response)=>{
                    setAdd((prevState) => ({
                        ...prevState,
                        isSuccess:true
                    }))
                })
                .catch((error)=>{
                    setAdd((prevState) => ({
                        ...prevState,
                        isError:true
                    }))
                })
                window.location.reload()
        }
    }


    const renderUsers = users.data.map((user) => {
        return (
            <tr key={user.userId}>
                <th scope="row">{user.userId}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.createdDate}</td>
                <td>{user.roles.map((role) => <Badge style={{ margin: '1px' }}>{role.name}</Badge>)}</td>
                <td>{user.manager ? user.manager.username : <>-</>}</td>
                <td>{user.dsi ? user.dsi.username : <>-</>}</td>
                <td>{user.state === 1 ? <Badge color='success'>en service</Badge> : <Badge color='danger'>pas en service</Badge>}</td>
                <td>{user.stateDate}</td>
                { user.username === "ADMIN" ? <td></td> :
                <td><Link to={`/admin/users/${user.userId}`}>Modifier</Link></td>
                }
            </tr>
        )
    })

    return (
        <div className='container'>
            <Button color='primary' size='sm' onClick={toggle}>Ajouter</Button>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Date de creation</th>
                        <th>Roles</th>
                        <th>Chef de Division</th>
                        <th>DPI</th>
                        <th>Etat</th>
                        <th>Date de modification</th>
                        <th>Gestion</th>
                    </tr>
                </thead>
                <tbody>
                    {renderUsers}
                </tbody>
            </Table>

            {add.isSuccess ? <Alert color='success'>Utilisateur ajouté</Alert> : <>{add.isError ? <Alert color='danger'>Utilisateur non ajouté</Alert> : <></>}</>}

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Ajouter un utilisateur</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleAdd}>
                        <FormGroup>
                            <Label htmlFor="username">Nom Complet</Label>
                            <Input type='text' required id='username' name='username'
                                value={username} onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input type='email' required id='email' name='email'
                                value={email} onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input type='password' required id='password' name='password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button type='submit' color='primary'>Changer votre mot de passe</Button>
                    </Form>
                </ModalBody>
            </Modal>


        </div>
    );
};

export default Users