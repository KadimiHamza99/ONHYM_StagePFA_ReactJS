import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Badge, Table } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import Loading from './Loading';
import LoginForm from './LoginForm';

const RefusSI = () => {

    const { demandesSI } = useContext(DataContext)

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
        .filter((demande) => demande.refuser && demande.demandeur.username===localStorage.getItem('username'))
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
                    <td><Link to={`/demandesSI/details/${demande.idDemandeServiceSi}`}><i class="fa fa-info-circle fa-2x" aria-hidden="true"></i></Link></td>
                </tr>
            )
        })

    return (
        <div className='container'>
            <Table bordered style={{ marginTop: '3em' }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Société</th>
                        <th>Service SI demandé</th>
                        <th>Date</th>
                        <th>Etat</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {renderDemandes}
                </tbody>
            </Table>
        </div>
    );
};

export default RefusSI;