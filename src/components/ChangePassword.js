import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Card, CardBody, CardText, CardTitle, Form, FormGroup, Input, Label, Alert, Button, FormFeedback } from 'reactstrap';

const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [succesMsg, setSuccesMsg] = useState("")
    const [identiques,setIdentiques] = useState({
        isIdentiques:true,
        message:""
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        setIdentiques({
            isIdentiques:true,
            message:""
        })
        if (window.confirm("Votre mot de passe sera modifier aprés cette confirmation?")) {
            if (newPassword === confirmNewPassword) {
                var config = {
                    headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") }
                }
                axios.get('http://localhost:8000/configuration/password?username=' + localStorage.getItem('username') + '&newPassword=' + newPassword, config)
                    .then((response) => {
                        setSuccesMsg(response.data)
                        setConfirmNewPassword("")
                        setNewPassword("")
                    })
                    .catch((error) => {
                        setErrMsg("La modification est echouée !")
                        setConfirmNewPassword("")
                        setNewPassword("")
                    })
            }else{
                setIdentiques({
                    isIdentiques:false,
                    message:"Le mot de passe et sa confirmation ne sont pas identiques"
                })
                console.log(identiques.message);
            }
        }
    }

    return (
        <div>
            <Card
                style={{ width: '50rem', margin: 'auto', marginTop: '5em' }}
            >
                <CardBody>
                    <CardTitle tag="h5">
                        Changer Votre Mot de Passe
                    </CardTitle>
                    <CardText>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="newpassword">Nouveau mot de passe</Label>
                                <Input type='password' required id='newPassword' name='newPassword'
                                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="confirmnewpassword">Confirmation du nouveau mot de passe</Label>
                                <Input type='password' required id='confirmNewPassword' name='confirmNewPassword'
                                    value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </FormGroup>
                            <Button type='submit' color='primary'>Changer votre mot de passe</Button>
                            
                        </Form>
                        {
                            identiques.isIdentiques ? <></> : <Alert color='danger'>{identiques.message}</Alert>
                        }
                        {
                            errMsg.length > 0 ?
                                <Alert color="danger">
                                    {errMsg}
                                </Alert>
                                :
                                <>
                                    {succesMsg.length > 0 ?
                                        <Alert color='success'>
                                            {succesMsg}
                                        </Alert>
                                        : <></>}
                                </>
                        }
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default ChangePassword;