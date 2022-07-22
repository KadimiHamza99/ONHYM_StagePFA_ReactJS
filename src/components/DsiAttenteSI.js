// import React from 'react';
// import { useContext } from 'react';
// import { Alert } from 'reactstrap';
// import { DataContext } from '../context/DataContext';
// import Loading from './Loading';
// import LoginForm from './LoginForm';

// const DsiAttenteSI = () => {
//     const {demandesSI} = useContext(DataContext)

//     if (!localStorage.getItem("isAuth")) {
//         return <LoginForm />
//     }
//     if (demandesSI.isLoading) {
//         return <Loading />
//     }
//     if (demandesSI.isError) {
//         <Alert color="danger">
//             {demandesSI.ErrMsg}
//         </Alert>
//     } 
//     return (
//         <div>
//             {JSON.stringify(demandesSI.data.filter((d)=>d.etatDemande===0))}
//         </div>
//     );
// };

// export default DsiAttenteSI;