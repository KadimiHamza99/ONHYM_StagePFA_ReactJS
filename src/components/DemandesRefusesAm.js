// import axios from 'axios';
// import React, { useLayoutEffect, useState } from 'react';
// import { Alert } from 'reactstrap';
// import Loading from './Loading';
// import LoginForm from './LoginForm';

// const DemandesRefusesAm = () => {

//     const [demandes, setDemandes] = useState({
//         data: [],
//         isLoading: true,
//         isError: false,
//         ErrMsg: ""
//     })

//     useLayoutEffect(() => {
//         var config = {
//             headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") },
//             params: { username : localStorage.getItem("username") }
//         }
//         axios.get('http://localhost:8000/public/get-all-demandes/am', config)
//             .then((response) => {
//                 setDemandes((prevState) => ({
//                     ...prevState,
//                     isLoading: false,
//                     data: response.data
//                 }))
//             })
//             .catch((error) => {
//                 setDemandes((prevState) => ({
//                     ...prevState,
//                     isLoading: false,
//                     isError: true,
//                     ErrMsg: error.message
//                 }))
//             })
//     }, [])

//     if (!localStorage.getItem("isAuth")) {
//         return <LoginForm />
//     }
//     if (demandes.isLoading) {
//         return <Loading />
//     }
//     if (demandes.isError) {
//         <Alert color="danger">
//             {demandes.ErrMsg}
//         </Alert>
//     }

//     return (
//         <div>
//             {JSON.stringify(demandes.data.filter((d)=>d.refuser))}
//         </div>
//     );
// };

// export default DemandesRefusesAm;