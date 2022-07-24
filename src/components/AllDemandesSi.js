import React, { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Alert, Badge, Button, Input, Table } from 'reactstrap';
import Loading from './Loading';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import axios from 'axios';


const AllDemandesSi = () => {

    const { demandesSI } = useContext(DataContext)

    const [state, setState] = useState("")

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
    if (demandesSI.data.length === 0) {
        return <div className='container'>Pas de demandes pour services SI pour le moment</div>
    }
    if (demandesSI.isLoading) {
        return <Loading />
    }
    if (demandesSI.isError) {
        return (<Alert color="danger">
            {demandesSI.ErrMsg}
        </Alert>)
    }
    const renderDemandes = demandesSI.data
        .filter((demande) => state.length > 0 ?
            demande.idDemandeServiceSi.toLowerCase().startsWith(state.toLowerCase())
            || demande.demandeur.username.toLowerCase().startsWith(state.toLowerCase())
            || demande.societe.toLowerCase().startsWith(state.toLowerCase())
            || demande.dateDemande.startsWith(state) : demande)
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
            <Input style={{ width: '36.5%', marginTop: '5px' }} type="search" name="search" id='search'
                value={state} onChange={(e) => setState(e.target.value)}
                placeholder='chercher une demande par date/nom/id/societe ...' />
            <Table bordered>
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
                        <th>Téléchargement</th>
                    </tr>
                </thead>
                <tbody>
                    {renderDemandes}
                </tbody>
            </Table>
        </div>
    )
}

export default AllDemandesSi