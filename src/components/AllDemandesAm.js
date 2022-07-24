import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, Input, Table } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import Loading from './Loading';
import LoginForm from './LoginForm';


const AllDemandesAm = () => {

    const [state, setState] = useState("")

    const { demandesAM } = useContext(DataContext)

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

    if (demandesAM.data.length === 0) {
        return <div className='container'>Pas de demandes acces messagerie pour le moment</div>
    }
    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    if (demandesAM.isLoading) {
        return <Loading />
    }

    const renderDemandes = demandesAM.data
        .filter((demande) => state.length > 0 ? 
        demande.idDemandeAccesMessagerie.startsWith(state) 
        || demande.demandeur.username.startsWith(state) || demande.dateDemande.startsWith(state) : demande)
        .map((demande) => {
            return (
                <tr key={demande.idDemandeAccesMessagerie}>
                    <th>{demande.idDemandeAccesMessagerie}</th>
                    <td>{demande.demandeur.username}</td>
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

            <Input style={{width:'43%',marginTop:'5px'}} type="search" name="search" id='search'
                value={state} onChange={(e) => setState(e.target.value)}
                placeholder='chercher une demande par date/nom/id ...' />
            <Table bordered >
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom du demandeur</th>
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
                demandesAM.isError ?
                    <Alert color="danger">
                        {demandesAM.ErrMsg}
                    </Alert> : <></>
            }
        </div>
    )
}

export default AllDemandesAm;