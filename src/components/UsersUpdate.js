import axios from 'axios';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Card, CardBody, CardText, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import { DataContext } from '../context/DataContext';

const UsersUpdate = () => {

    const { userId } = useParams()

    const { users } = useContext(DataContext)

    const [current, setCurrent] = useState({
        username: "bla",
        email: "",
        roles: [],
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
                console.log(response.data.username);
                setCurrent({
                    username: response.data.username,
                    email: response.data.email,
                    roles: null,
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

    const getUsers = users.data.map((user) => {
        return (
            <option key={user.userId} value={user.username}>Mme./Mr {user.username}</option>
        )
    })

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
                        <Form>
                            <FormGroup>
                                <Label for="username">Nom Complet</Label>
                                <Input type="text" name="username" id="username"
                                    value={current.username}
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, username: e.target.value }))}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Adresse Email</Label>
                                <Input type="email" name="email" id="email"
                                    value={current.email}
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, email: e.target.value }))}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="manager">Chef Hiérarchique</Label>
                                <Input type="select" name="manager" id="manager"
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, manager: e.target.value }))}
                                    value={current.manager}>
                                    {getUsers}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="dsi">DPI</Label>
                                <Input type="select" name="dsi" id="dsi"
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, dsi: e.target.value }))}
                                    value={current.dsi}>
                                    {getUsers}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="roles">Roles</Label>
                                
                                {/* <Input type="select" 
                                onChange={(e)=>console.log(e.target.value)}
                                value={current.roles}
                                multiple name="roles" id="roles" >
                                    <option value={"DSI"}>DSI</option>
                                    <option value={"DPI"}>DPI</option>
                                    <option value={"MANAGER"}>MANAGER</option>
                                    <option value={"DEMANDEUR"}>DEMANDEUR</option>
                                </Input> */}
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="state" 
                                    onChange={(e) => setCurrent((prevState) => ({ ...prevState, state: parseInt(e.target.value) }))}
                                    value={1}/>{' '}
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
                        </Form>
                    </CardText>
                </CardBody>
            </Card>
            {JSON.stringify(current)}
        </div>
    );
};

export default UsersUpdate;