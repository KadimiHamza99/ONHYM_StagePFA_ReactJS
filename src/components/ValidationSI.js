import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, ButtonGroup, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import Loading from './Loading';
import LoginForm from './LoginForm';

const ValidationSI = () => {

    const { demandesSI } = useContext(DataContext)

    const [validation, setValidation] = useState({
        isSuccess: false,
        isError: false,
        isLoading: false
    })

    const [modal, setModal] = useState(false)

    const [refus, setRefus] = useState({
        id: "",
        username: "",
        etat: null,
        messageRefus: "",
        isSuccess: false,
        isError: false,
        isLoading: false
    })

    if (demandesSI.isLoading || validation.isLoading || refus.isLoading) {
        return <Loading />
    }

    const toggleModal = (id, username, etat) => {
        setModal(!modal)
        setRefus((prevState) => ({
            ...prevState,
            id: id,
            username: username,
            etat: etat
        }))
    }

    const validate = (id, username, etat) => {
        if (window.confirm("Vous allez valider cette demande , etes-vous sur ?")) {
            setValidation((prevState) => ({ ...prevState, isLoading: true }))
            var config = {
                headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") }
            }
            if (etat === -1) {
                axios.get("http://localhost:8000/validation/manager/si?idDemande=" + id + "&managerUsername=" + username, config)
                    .then((response) => {
                        setValidation((prevState) => ({ ...prevState, isLoading: false, isSuccess: true }))
                    })
                    .catch((err) => setValidation({ isLoading: false, isError: true, isSuccess: false }))
            } else if (etat === 0) {
                axios.get("http://localhost:8000/validation/dpi/si?idDemande=" + id + "&dsiUsername=" + username, config)
                    .then((response) => {
                        setValidation((prevState) => ({ ...prevState, isLoading: false, isSuccess: true }))
                    })
                    .catch((err) => setValidation({ isLoading: false, isError: true, isSuccess: false }))
            }
        }
    }

    const refuser = () => {

        if (window.confirm("Vous allez refuser cette demande , etes-vous sur ?")) {
            setRefus((prevState) => ({ ...prevState, isLoading: true }))
            var config = {
                headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") }
            }
            if (refus.etat === -1) {
                axios.get("http://localhost:8000/refus/manager/si?idDemande=" + refus.id + "&messageRefus=" + refus.messageRefus + "&managerUsername=" + refus.username, config)
                    .then((response) => {
                        setRefus((prevState) => ({ ...prevState, isLoading: false, isSuccess: true, id: "", username: "", etat: null }))
                    })
                    .catch((err) => setRefus({ messageRefus: "", isLoading: false, isError: true, isSuccess: false, id: "", username: "", etat: null }))
            } else if (refus.etat === 0) {
                axios.get("http://localhost:8000/refus/dpi/si?idDemande=" + refus.id + "&messageRefus=" + refus.messageRefus + "&dsiUsername=" + refus.username, config)
                    .then((response) => {
                        setRefus((prevState) => ({
                            ...prevState,
                            isLoading: false, isSuccess: true
                            , id: "", username: "", etat: null
                        }))
                    })
                    .catch((err) => setRefus({ messageRefus: "", isLoading: false, isError: true, isSuccess: false, id: "", username: "", etat: null }))
            }
        }
        toggleModal()
    }

    const renderDemandesDSI = demandesSI.data
        .filter((demande) => !demande.demandeur.dsi
            && demande.etatDemande !== 1
            && demande.etatDemande !== 0
            && !demande.refuser
            && demande.demandeur.manager.username === localStorage.getItem('username'))
        .map((demande) => {
            return (
                <tr key={demande.idDemandeServiceSi}>
                    <th>{demande.idDemandeServiceSi}</th>
                    <td>{demande.demandeur.username}</td>
                    <td>{demande.societe}</td>
                    <td>{demande.serviceDemande}</td>
                    <td>{demande.dateDemande}</td>
                    <td>
                        {demande.etatDemande === -1 && !demande.refuser ? <Badge color='warning'>en attente</Badge>
                            : demande.etatDemande === 0 ? <Badge color='info'>en attente</Badge>
                                : demande.etatDemande === 1 ? <Badge color='success'>validé</Badge>
                                    : demande.refuser ? <Badge color='danger'>refusé</Badge> : <></>
                        }
                    </td>
                    <td>{demande.manager ? demande.manager.username : <>-</>}</td>
                    <td>{demande.dsi ? demande.dsi.username : <>-</>}</td>
                    <td><Link to={`/demandesSI/details/${demande.idDemandeServiceSi}`}><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></Link></td>
                    <td>
                        {
                            validation.isLoading || refus.isLoading ? <Loading /> :
                                <ButtonGroup>
                                    <Button color="success" size='sm'
                                        onClick={() => validate(demande.idDemandeServiceSi,
                                            localStorage.getItem('username'),
                                            demande.etatDemande)}>
                                        <i class="fa fa-check"></i>
                                    </Button>
                                    <Button color="danger" size='sm'
                                        onClick={() => toggleModal(demande.idDemandeServiceSi, localStorage.getItem('username'), demande.etatDemande)}
                                    ><i class="fa fa-remove"></i>
                                    </Button>
                                </ButtonGroup>
                        }
                    </td>
                </tr>
            )
        })

    const renderDemandes = demandesSI.data
        .filter((demande) => demande.demandeur.dsi && !demande.refuser)
        .filter((demande) => (demande.demandeur.manager.username === localStorage.getItem('username') && demande.etatDemande === -1)
            || (demande.demandeur.dsi.username === localStorage.getItem('username') && demande.etatDemande === 0)
        )
        .map((demande) => {
            return (
                <tr key={demande.idDemandeServiceSi}>
                    <th>{demande.idDemandeServiceSi}</th>
                    <td>{demande.demandeur.username}</td>
                    <td>{demande.societe}</td>
                    <td>{demande.serviceDemande}</td>
                    <td>{demande.dateDemande}</td>
                    <td>
                        {demande.etatDemande === -1 && !demande.refuser ? <Badge color='warning'>en attente</Badge>
                            : demande.etatDemande === 0 ? <Badge color='info'>en attente</Badge>
                                : demande.etatDemande === 1 ? <Badge color='success'>validé</Badge>
                                    : demande.refuser ? <Badge color='danger'>refusé</Badge> : <></>
                        }
                    </td>
                    <td>{demande.manager ? demande.manager.username : <>-</>}</td>
                    <td>{demande.dsi ? demande.dsi.username : <>-</>}</td>
                    <td><Link to={`/demandesSI/details/${demande.idDemandeServiceSi}`}><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></Link></td>
                    <td>
                        {
                            validation.isLoading || refus.isLoading ? <Loading /> :
                                <ButtonGroup>
                                    <Button color="success" size='sm'
                                        onClick={() => validate(demande.idDemandeServiceSi,
                                            localStorage.getItem('username'),
                                            demande.etatDemande)}>
                                        <i class="fa fa-check"></i>
                                    </Button>
                                    <Button color="danger" size='sm'
                                        onClick={() => toggleModal(demande.idDemandeServiceSi, localStorage.getItem('username'), demande.etatDemande)}
                                    ><i class="fa fa-remove"></i>
                                    </Button>
                                </ButtonGroup>
                        }
                    </td>
                </tr>
            )
        })

    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    if (demandesSI.isLoading) {
        return <Loading />
    }
    if (demandesSI.isError) {
        return (<Alert color="danger">
            {demandesSI.ErrMsg}
        </Alert>)
    }

    return (
        <div className='container'>
            <div className='container'>
                <Table bordered style={{ marginTop: '3em' }}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom du demandeur</th>
                            <th>Société</th>
                            <th>Service SI demandé</th>
                            <th>Date</th>
                            <th>Etat</th>
                            <th>Chef Hierarchique</th>
                            <th>DPI</th>
                            <th>Details</th>
                            <th>Gestion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localStorage.getItem('roles').includes("DSI") ? renderDemandesDSI : renderDemandes}
                    </tbody>
                </Table>
                <Modal isOpen={modal} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Ecrire un message de refus</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="username">Message au demandeur :</Label>
                            <Input type='textarea' required id='messageRefus' name='messageRefus'
                                value={refus.messageRefus} onChange={(e) => setRefus((state) => ({ ...state, messageRefus: e.target.value }))}
                                rows="4" placeholder='Message ...'
                            />
                        </FormGroup>
                        <Button color='danger' onClick={refuser}>refuser</Button>
                    </ModalBody>
                </Modal>
                {
                    validation.isSuccess || refus.isSuccess ? <Alert color='success'>Opération effectué</Alert> :
                        validation.isError || refus.isError ? <Alert color='danger'>Erreur !</Alert> : <></>
                }
            </div>
        </div>
    );
};

export default ValidationSI