import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, ButtonGroup, Table } from 'reactstrap';
import { DataContext } from './../context/DataContext';

const ValidationAM = () => {

    const { demandesAM } = useContext(DataContext)

    const renderDemandesDSI = demandesAM.data
        .filter((demande) => !demande.demandeur.dsi && demande.etatDemande !== 1 && !demande.refuser)
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
                        <ButtonGroup>
                            <Button color="primary" size='sm'><i class="fa fa-check"></i></Button>
                            <Button color="danger" size='sm'><i class="fa fa-remove"></i></Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })

    const renderDemandes = demandesAM.data
        .filter((demande) => demande.demandeur.dsi && !demande.refuser)
        .filter((demande) => (demande.demandeur.manager.username === localStorage.getItem('username') && demande.etatDemande === -1)
            || (demande.demandeur.dsi.username === localStorage.getItem('username') && demande.etatDemande === 0)
        )
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
                        <ButtonGroup>
                            <Button color="primary" size='sm'><i class="fa fa-check"></i></Button>
                            <Button color="danger" size='sm'><i class="fa fa-remove"></i></Button>
                        </ButtonGroup>
                    </td>
                </tr>
            )
        })


    return (
        <div className='container'>
            <Table bordered style={{ marginTop: '3em' }}>
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
                        <th>Gestion</th>
                    </tr>
                </thead>
                <tbody>
                    {localStorage.getItem('roles').includes("DSI") ? renderDemandesDSI : renderDemandes}
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



export default ValidationAM