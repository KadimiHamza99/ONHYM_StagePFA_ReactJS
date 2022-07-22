import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Badge, Card, CardBody, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import Loading from './Loading';
import LoginForm from './LoginForm';

const DemandeAMDetails = () => {

    const { demandeId } = useParams()

    const [demandeDetails, setDemandeDetails] = useState({
        isLoading: true,
        isError: false,
        data: {}
    })

    useLayoutEffect(() => {
        var config = {
            headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") }
        }
        axios.get('http://localhost:8000/public/get-demande/am/' + demandeId, config)
            .then((response) => {
                setDemandeDetails({
                    isLoading: false,
                    isError: false,
                    data: response.data
                })
            })
            .catch((error) => {
                setDemandeDetails({
                    isLoading: false,
                    isError: true,
                    data: { error }
                })
            })
    }, [])

    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    if (demandeDetails.isLoading) {
        return <Loading />
    }
    if (demandeDetails.isError) {
        return <Alert color='danger'>Erreur !</Alert>
    }

    return (
        <div className='container'>
            <Card
                style={{width:"80%",margin:'auto',marginTop:"5em"}}
            >
                <CardBody>
                    <CardTitle tag="h5">
                        Plus d'informations sur la demande
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Demande Acces à la messagerie via le mobile
                    </CardSubtitle>
                    <CardText>
                        <ListGroup
                            horizontal
                        >
                            <ListGroupItem>
                                ID de la demande : <br /><b>{demandeDetails.data.idDemandeAccesMessagerie}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                Nom et Prenom : <br /><b>{demandeDetails.data.nom} {demandeDetails.data.prenom}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                Matricule : <br /><b>{demandeDetails.data.matricule}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                Affectation : <br /><b>{demandeDetails.data.affectation}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                Réference Mobile : <br /><b>{demandeDetails.data.referenceMobile}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                IMEI : <br /><b>{demandeDetails.data.imei}</b>
                            </ListGroupItem>
                        </ListGroup>
                        <ListGroup
                            horizontal
                        >
                            <ListGroupItem>
                                Etat de la demande : <br />
                                {demandeDetails.data.etatDemande === -1 && !demandeDetails.data.refuser ? <Badge color='warning'>en attente</Badge>
                                    : demandeDetails.data.etatDemande === 0 ? <Badge color='info'>en attente</Badge>
                                        : demandeDetails.data.etatDemande === 1 ? <Badge color='success'>validé</Badge>
                                            : <>-</>
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                Chef hiérarchique : <br /><b>{demandeDetails.data.manager ? demandeDetails.data.manager.username : <>-</>}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                premiére validation : <br /><b>{demandeDetails.data.dateValidationManager ? demandeDetails.data.dateValidationManager : <>-</>}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                DPI : <br /><b>{demandeDetails.data.dsi ? demandeDetails.data.dsi.username : <>-</>}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                deuxiéme validation : <br /><b>{demandeDetails.data.dateValidationDsi ? demandeDetails.data.dateValidationDsi : <>-</>}</b>
                            </ListGroupItem>
                            <ListGroupItem>
                                Refuser : <br />
                                {
                                    demandeDetails.data.refuser ? <Badge color='danger'>Oui</Badge> : <Badge color='success'>Non</Badge>
                                }
                            </ListGroupItem>
                            <ListGroupItem>
                                refuseur :  <br /><b>{demandeDetails.data.refuseur ? demandeDetails.data.refuseur : <>-</>}</b>
                            </ListGroupItem>
                        </ListGroup>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
};

export default DemandeAMDetails