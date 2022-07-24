import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Badge, Table } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import Loading from './Loading';
import LoginForm from './LoginForm';

const RefusAM = () => {

    const { demandesAM } = useContext(DataContext)

    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    if (demandesAM.isLoading) {
        return <Loading />
    }

    const renderDemandes = demandesAM.data
    .filter((demande)=>demande.refuser && demande.demandeur.username===localStorage.getItem('username'))
    .map((demande) => {
        return (
            <tr key={demande.idDemandeAccesMessagerie}>
                <th>{demande.idDemandeAccesMessagerie}</th>
                <td>{demande.matricule}</td>
                <td>{demande.dateDemande}</td>
                <td>
                    { demande.etatDemande === -1 && !demande.refuser ? <Badge color='warning'>en attente</Badge> 
                    : demande.etatDemande === 0 ? <Badge color='info'>en attente</Badge> 
                    : demande.etatDemande === 1 ? <Badge color='success'>validé</Badge> 
                    : demande.refuser ? <Badge color='danger'>refusé</Badge> : <></>
                    }
                </td>
                <td><Link to={`/demandesAM/details/${demande.idDemandeAccesMessagerie}`}><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></Link></td>
            </tr>
        )
    })

    return (
        <div className='container'>
            <Table bordered style={{marginTop:'3em'}}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Matricule</th>
                        <th>Date</th>
                        <th>Etat</th>
                        <th>Details</th>
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
    );
};

export default RefusAM;