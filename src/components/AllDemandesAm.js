import React, { useContext } from 'react';
import { Alert } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import Loading from './Loading';
import LoginForm from './LoginForm';


const AllDemandesAm = () => {

    const { demandesAM} = useContext(DataContext)

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
        {JSON.stringify(demandesAM)}
    </div>
);
};

export default AllDemandesAm;