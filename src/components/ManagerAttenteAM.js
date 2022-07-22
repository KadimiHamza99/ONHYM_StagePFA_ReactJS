// import React from 'react';
// import { useContext } from 'react';
// import { DataContext } from '../context/DataContext';
// import Loading from './Loading';
// import LoginForm from './LoginForm';

// const ManagerAttenteAM = () => {
//     const {demandesAM} = useContext(DataContext)

//     if (!localStorage.getItem("isAuth")) {
//         return <LoginForm />
//     }
//     if (demandesAM.isLoading) {
//         return <Loading />
//     }
//     return (
//         <div>
//             {JSON.stringify(demandesAM.data.filter((d)=>d.etatDemande===-1))}
//         </div>
//     );
// };

// export default ManagerAttenteAM;