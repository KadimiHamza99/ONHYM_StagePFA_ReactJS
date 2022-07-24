import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader, Table } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import Loading from './Loading';
import LoginForm from './LoginForm';

const UserDemandesAM = () => {

    const [state, setState] = useState("")

    const { demandesAM } = useContext(DataContext)

    const [demande, setDemande] = useState({
        isLoading: false,
        isError: false,
        isSuccess: false
    })

    const [data, setData] = useState({
        nom: "",
        prenom: "",
        matricule: "",
        affectation: "",
        referenceMobile: "",
        numeroSerieMobile: "",
        imei: "",
        engagement: true
    })

    const [flag, setFlag] = useState(false)

    const [modal, setModal] = useState(false)

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

    const ajouterDemande = (e) => {
        e.preventDefault()
        if (window.confirm("Vous allez ajouter une demande , etes-vous sur ?")) {
            setDemande({
                isSuccess: false, isError: false, isLoading: true
            })
            var config = {
                headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") },
            }
            axios.post("http://localhost:8000/demande/am?username=" + localStorage.getItem('username'), data, config)
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

    const toggleModal = () => {
        setModal(!modal)
    }

    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    if (demandesAM.isLoading || demande.isLoading) {
        return <Loading />
    }

    const renderDemandes = demandesAM.data
        .filter((demande) => demande.demandeur.username === localStorage.getItem('username'))
        .filter((demande) => state.length > 0 ?
            demande.idDemandeAccesMessagerie.startsWith(state)
            || demande.demandeur.username.toLowerCase().startsWith(state.toLowerCase())
            || demande.dateDemande.startsWith(state) : demande)
        .map((demande) => {
            return (
                <tr key={demande.idDemandeAccesMessagerie}>
                    <th>{demande.idDemandeAccesMessagerie}</th>
                    <td>{demande.matricule}</td>
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
                    <td><Link to={`/demandesAM/details/${demande.idDemandeAccesMessagerie}`}><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></Link></td>
                    <td>
                        <Button color='primary'
                            size='sm' disabled={demande.refuser ? true : false}
                            onClick={() => download(demande.idDemandeAccesMessagerie, demande.etatDemande)}>
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
            <Table bordered >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Matricule</th>
                        <th>Date</th>
                        <th>Etat</th>
                        <th>Chef Hierarchique</th>
                        <th>DPI</th>
                        <th>Details</th>
                        <th>Télécharger</th>
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
                <ModalHeader toggle={toggleModal}>Ajouter une demande d'Acces Messagerie via mobile</ModalHeader>
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
                                <Input type="text" class="form-control" name='matricule' required
                                    value={data.matricule} onChange={(e) => setData((prevState) => ({ ...prevState, matricule: e.target.value }))}
                                    placeholder="Matricule" aria-label="societe" bsSize='sm' />
                                <Input type="text" class="form-control" placeholder="Affectation" name='affectation'
                                    value={data.affectation} onChange={(e) => setData((prevState) => ({ ...prevState, affectation: e.target.value }))}
                                    aria-label="cadrePartenariat" bsSize='sm' />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div class="input-group mb-2">
                                <Input type="text" class="form-control" name='referenceMobile' required
                                    value={data.referenceMobile} onChange={(e) => setData((prevState) => ({ ...prevState, referenceMobile: e.target.value }))}
                                    placeholder="Référence du mobile" bsSize='sm' />
                                <Input type="text" class="form-control" placeholder="Numéro de série du mobile" name='numeroSerieMobile'
                                    value={data.numeroSerieMobile} onChange={(e) => setData((prevState) => ({ ...prevState, numeroSerieMobile: e.target.value }))}
                                    bsSize='sm' />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" class="form-control" name='imei' required
                                value={data.imei} onChange={(e) => setData((prevState) => ({ ...prevState, imei: e.target.value }))}
                                placeholder="N°IMEI" bsSize='sm' />
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


            {
                demandesAM.isError ?
                    <Alert color="danger">
                        {demandesAM.ErrMsg}
                    </Alert> : <></>
            }
        </div>
    );
};

export default UserDemandesAM;