import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import Loading from './Loading';
import LoginForm from './LoginForm';

const UserDemandesSI = () => {

    const { demandesSI } = useContext(DataContext)

    const [state, setState] = useState("")

    const [demande, setDemande] = useState({
        isLoading: false,
        isError: false,
        isSuccess: false
    })

    const [data, setData] = useState({
        nom: "",
        prenom: "",
        societe: "",
        cadrePartenariat: "",
        serviceDemande: "",
        precisionServiceDemande: "",
        engagement: true
    })

    const [flag, setFlag] = useState(false)

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    const ajouterDemande = (e) => {
        e.preventDefault()
        if (window.confirm("Vous allez ajouter une demande , etes-vous sur ?")) {
            setDemande({
                isSuccess: false, isError: false, isLoading: true
            })
            var config = {
                headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") },
            }
            axios.post("http://localhost:8000/demande/si?username=" + localStorage.getItem('username'), data, config)
                .then((response) => {
                    setDemande({
                        isSuccess: true, isError: false, isLoading: false
                    })
                })
                .catch((error) => {
                    setDemande({
                        isSuccess: false, isError: true, isLoading: false
                    })
                })
            if (!demande.isLoading) {
                toggleModal()
            }
        }
    }

    const download = (id, etat) => {
        var filename = etat === -1 ? id + ".pdf" : etat === 0 ? id + "ManagerValidation.pdf" : id + "DsiValidation.pdf"
        var config = {
            responseType: 'blob',
            headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") }
        }
        axios.get("http://localhost:8000/file/" + filename, config)
            .then((response) => {
                let url = window.URL.createObjectURL(response.data)
                let a = document.createElement('a')
                a.href = url
                a.download = filename
                a.click()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    if (demandesSI.isLoading || demande.isLoading) {
        return <Loading />
    }
    if (demandesSI.isError) {
        return (<Alert color="danger">
            {demandesSI.ErrMsg}
        </Alert>)
    }

    const renderDemandes = demandesSI.data
        .filter((demande) => demande.demandeur.username === localStorage.getItem('username'))
        .filter((demande) => state.length > 0 ? demande.idDemandeServiceSi.startsWith(state)
            || demande.demandeur.username.toLowerCase().startsWith(state.toLowerCase())
            || demande.dateDemande.startsWith(state) : demande)
        .map((demande) => {
            return (
                <tr key={demande.idDemandeServiceSi}>
                    <th>{demande.idDemandeServiceSi}</th>
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
                        <Button color='primary'
                            size='sm' disabled={demande.refuser ? true : false}
                            onClick={() => download(demande.idDemandeServiceSi, demande.etatDemande)}>
                            <i class="fa fa-download" aria-hidden="true"></i>
                        </Button>
                    </td>
                </tr>
            )
        })

    return (
        <div className='container'>
            <span>
                <Input style={{ width: '43%', float: 'left', marginTop: '10px' }} type="search" name="search" id='search'
                    value={state} onChange={(e) => setState(e.target.value)}
                    placeholder='chercher une demande par date/nom/id ...' bsSize='sm' />
                <Button color='primary'
                    style={{ float: 'right', width: "11.2%", marginTop: '10px' }}
                    size='sm' onClick={toggleModal} >
                    Ajouter <i class="fa fa-plus" aria-hidden="true"></i>
                </Button>
            </span>

            <Table bordered>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Société</th>
                        <th>Service SI demandé</th>
                        <th>Date</th>
                        <th>Etat</th>
                        <th>Chef Hierarchique</th>
                        <th>DPI</th>
                        <th>Details</th>
                        <th>Téléchargement</th>
                    </tr>
                </thead>
                <tbody>
                    {renderDemandes}
                </tbody>
            </Table>

            {
                demande.isError ? <Alert color='danger'>Erreur lors de l'ajout de la demande !</Alert> :
                    demande.isSuccess ? <Alert color='success'>Demande Ajoutée</Alert> : <></>
            }
            <Modal isOpen={modal} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal}>Ajouter une demande d'un Service SI</ModalHeader>
                <ModalBody>
                    <Form onSubmit={ajouterDemande}>
                        <FormGroup>
                            <div class="input-group mb-2">
                                <Input
                                    value={data.nom} onChange={(e) => setData((prevState) => ({ ...prevState, nom: e.target.value }))}
                                    type="text" class="form-control" placeholder="Nom"
                                    aria-label="nom" bsSize='sm' name='nom' required />
                                <Input
                                    value={data.prenom} onChange={(e) => setData((prevState) => ({ ...prevState, prenom: e.target.value }))}
                                    type="text" class="form-control" placeholder="Prenom" aria-label="prenom"
                                    bsSize='sm' name='prenom' required />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div class="input-group mb-2">
                                <Input type="text" class="form-control" name='societe' required
                                    value={data.societe} onChange={(e) => setData((prevState) => ({ ...prevState, societe: e.target.value }))}
                                    placeholder="Société" aria-label="societe" bsSize='sm' />
                                <Input type="text" class="form-control" placeholder="Cadre Partenariat"
                                    value={data.cadrePartenariat} onChange={(e) => setData((prevState) => ({ ...prevState, cadrePartenariat: e.target.value }))}
                                    aria-label="cadrePartenariat" bsSize='sm' />
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="serviceDemande" sm={4} >Service Demandé</Label>
                            <Col sm={8}>
                                <Input
                                    value={data.serviceDemande} onChange={(e) => setData((prevState) => ({ ...prevState, serviceDemande: e.target.value }))}
                                    type="select" name="serviceDemande" required
                                    id="serviceDemande" bsSize='sm'>
                                    <option value="Compte de domaine">Compte de domaine</option>
                                    <option value="Boite de messagerie">Boite de messagerie</option>
                                    <option value="Connexion internet (adsl)">Connexion internet (adsl)</option>
                                    <option value="Acces au reseau local">Acces au reseau local</option>
                                    <option value="Materiel informatique">Materiel informatique</option>
                                    <option value="Telephonie interne">Telephonie interne</option>
                                    <option value="Acces a la messagerie via mobile">Acces a la messagerie via mobile</option>
                                    <option value="Application de gestion">Application de gestion</option>
                                    <option value="Application metier">Application metier</option>
                                    <option value="Autres">Autres</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            {data.serviceDemande === "Application de gestion" ||
                                data.serviceDemande === "Application metier" ||
                                data.serviceDemande === "Autres" ?
                                <Input
                                    value={data.precisionServiceDemande} onChange={(e) => setData((prevState) => ({ ...prevState, precisionServiceDemande: e.target.value }))}
                                    type='text' name='precisionServiceDemande' placeholder='Precision du service demandé' required
                                    bsSize='sm' id='precision' /> : <></>
                            }
                        </FormGroup>
                        « J’atteste avoir lu, compris et accepté les termes de <a href='politique' target='blank'>la Politique de Sécurité du Système d’Information (PSSI)</a> et de la charte informatique de l’ONHYM »
                        <Input style={{ marginLeft: '15px' }}
                            value={flag} onChange={() => setFlag(!flag)}
                            required name='engagement' type="checkbox" id="engagement" />{' '}
                        <Button
                            disabled={flag ? false : true}
                            type='submit' color='primary' style={{ marginTop: '10px' }}>
                            Ajouter
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default UserDemandesSI;