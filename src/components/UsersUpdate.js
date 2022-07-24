import axios from 'axios';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Alert, Button, Card, CardBody, CardFooter, CardText, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import { MultiSelect } from "react-multi-select-component";

var LocalDate = require("@js-joda/core").LocalDate;

const options = [
    { label: "DSI", value: "DSI" },
    { label: "DPI", value: "DPI" },
    { label: "MANAGER", value: "MANAGER" },
    { label: "DEMANDEUR", value: "DEMANDEUR" },
    { label: "ADMIN", value: "ADMIN", disabled: true }
]
const roles = []
const UsersUpdate = () => {

    const { userId } = useParams()

    const { users } = useContext(DataContext)

    const [selected, setSelected] = useState([]);

    const [update, setUpdate] = useState({
        isSuccess: false,
        isError: false
    })

    const [current, setCurrent] = useState({
        username: "",
        email: "",
        manager: "",
        dsi: "",
        state: 0,
        stateDate: null
    })

    useLayoutEffect(() => {
        var config = {
            headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") }
        }
        axios.get('http://localhost:8000/configuration/admin/getUser?id=' + parseInt(userId), config)
            .then((response) => {
                setCurrent({
                    username: response.data.username,
                    email: response.data.email,
                    state: parseInt(response.data.state),
                    stateDate: response.data.stateDate
                })
                if (response.data.manager !== null) {
                    setCurrent((prevState) => ({
                        ...prevState,
                        manager: response.data.manager
                    }))
                }
                if (response.data.dsi !== null) {
                    setCurrent((prevState) => ({
                        ...prevState,
                        dsi: response.data.manager
                    }))
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const getUsers = users.data
    .filter((user) => user.username!==current.username )
    .map((user) => {
        return (
            <option key={user.userId} value={user.username}>Mme./Mr {user.username}</option>
        )
    })

    const handleUpdate = (e) => {
        e.preventDefault()
        if (window.confirm("Vous allez modifier cet utilisateur , etes-vous sur ?")) {
            roles.length = 0
            selected.map((r) => {
                roles.push(r.value)
            })
            setCurrent((prevState) => ({
                ...prevState, roles: roles
            }))
            var config = {
                headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") },
            }
            var body={}
            if(current.dsi==="null" && current.manager==="null"){
                body = {
                    "username": current.username,
                    "email": current.email,
                    "roles": roles,
                    "state": current.state,
                    "stateDate": LocalDate.now().toString()
                }
                console.log(body);
            }else if(current.dsi==="null"){
                body = {
                    "username": current.username,
                    "email": current.email,
                    "roles": roles,
                    "manager":current.manager,
                    "state": current.state,
                    "stateDate": LocalDate.now().toString()
                }
                console.log(body);
            }else if(current.manager==="null"){
                body = {
                    "username": current.username,
                    "email": current.email,
                    "roles": roles,
                    "dsi":current.dsi,
                    "state": current.state,
                    "stateDate": LocalDate.now().toString()
                }
                console.log(body);
            }else{
                body = {
                    "username": current.username,
                    "email": current.email,
                    "roles": roles,
                    "dsi":current.dsi,
                    "manager":current.manager,
                    "state": current.state,
                    "stateDate": LocalDate.now().toString()
                }
                console.log(body);
            }
            axios.post("http://localhost:8000/configuration/admin/updateUser", body, config)
                .then((response) => {
                    setUpdate({
                        isSuccess: true,
                        isError: false
                    })
                })
                .catch((error) => {
                    setUpdate({
                        isSuccess: false,
                        isError: true
                    })
                })
        }
    }

    return (
        <div className='container'>
            <Card
                style={{ width: '50rem', margin: 'auto', marginTop: '1em' }}
            >
                <CardBody>
                    <CardTitle tag="h5">
                        Modifier l'utilisateur {current.username}
                    </CardTitle>
                    <CardText>
                        <Form onSubmit={handleUpdate}>
                            <FormGroup>
                                <Label for="username">Nom Complet</Label>
                                <Input type="text" name="username" id="username"
                                    value={current.username} disabled
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, username: e.target.value }))}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Adresse Email</Label>
                                <Input type="email" name="email" id="email"
                                    value={current.email} required
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, email: e.target.value }))}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="manager">Chef Hiérarchique</Label>
                                <Input type="select" name="manager" id="manager" required
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, manager: e.target.value }))}
                                    value={current.manager}>
                                    <option value={"null"}>-</option>
                                    {getUsers}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="dsi">DPI</Label>
                                <Input type="select" name="dsi" id="dsi" required
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, dsi: e.target.value }))}
                                    value={current.dsi}>
                                    <option value={"null"}>-</option>
                                    {getUsers}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="roles">Roles</Label>
                                <MultiSelect
                                    required
                                    hasSelectAll={false}
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="state"
                                        onChange={(e) => setCurrent((prevState) => ({ ...prevState, state: parseInt(e.target.value) }))}
                                        value={1} />{' '}
                                    En service
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="state"
                                        onChange={(e) => setCurrent((prevState) => ({ ...prevState, state: parseInt(e.target.value) }))}
                                        value={0} />{' '}
                                    N'est plus en service
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label for="dsi">Date de la derniére modification</Label>
                                <Input type="date" name="stateDate" id="stateDate"
                                    disabled value={current.stateDate} />
                            </FormGroup>
                            <Button color='primary' size='sm' type='submit'>Modifier</Button>
                        </Form>
                    </CardText>
                    {update.isSuccess ? <Alert color='success'>Modifié</Alert> : <>{update.isError ? <Alert color='danger'>Erreur !</Alert> : <></>}</>}
                </CardBody>
            </Card>
        </div>
    );
};

export default UsersUpdate;