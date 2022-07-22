// import React from 'react';
// import { useContext } from 'react';
// import { DataContext } from '../context/DataContext';
// import Loading from './Loading';
// import LoginForm from './LoginForm';

// const ManagerAttenteSI = () => {

//     const {demandesSI} = useContext(DataContext)

//     if (!localStorage.getItem("isAuth")) {
//         return <LoginForm />
//     }
//     if (demandesSI.isLoading) {
//         return <Loading />
//     }

//     return (
//         <div>
//             {JSON.stringify(demandesSI.data.filter((d)=>d.etatDemande===-1))}
//         </div>
//     );
// };

// export default ManagerAttenteSI;