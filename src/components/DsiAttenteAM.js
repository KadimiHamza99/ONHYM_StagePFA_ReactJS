import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Alert } from 'reactstrap';
import Loading from './Loading';
import LoginForm from './LoginForm';

const DsiAttenteAM = () => {
    const {demandesAM} = useContext(DataContext)

    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    if (demandesAM.isLoading) {
        return <Loading />
    }
    if (demandesAM.isError) {
        <Alert color="danger">
            {demandesAM.ErrMsg}
        </Alert>
    } 
    return (
        <div>
            {JSON.stringify(demandesAM.data.filter((d)=>d.etatDemande===0))}
        </div>
    );
};

export default DsiAttenteAM;