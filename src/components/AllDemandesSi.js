import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Alert } from 'reactstrap';
import Loading from './Loading';
import LoginForm from './LoginForm';


const AllDemandesSi = () => {

    const {demandesSI} = useContext(DataContext)

    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    if (demandesSI.isLoading) {
        return <Loading />
    }
    if (demandesSI.isError) {
        <Alert color="danger">
            {demandesSI.ErrMsg}
        </Alert>
    } 
    return (
        <div>
            {JSON.stringify(demandesSI)}
        </div>
    );
};

export default AllDemandesSi;