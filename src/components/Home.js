import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardSubtitle, CardText, Button, CardTitle, ListGroup, ListGroupItem, Badge, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { DataContext } from '../context/DataContext';
import LoginForm from './LoginForm';
const Home = () => {
    if (!localStorage.getItem("isAuth")) {
      return <LoginForm />
    }
    return ( 
        <div className='container'>
            Cet espace est confidentiel et reservé aux employés de l'ONHYM
              {/* {JSON.stringify(demandesAM)} */}
  {/* <Card
  >
    <CardBody>
      <CardTitle tag="h5">
        Plus d'informations sur la demande
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Demande Acces à la messagerie via le mobile
      </CardSubtitle>
      <CardText>


      <ListGroup
  horizontal
>
  <ListGroupItem>
    ID de la demande : <br/><b>dzud-azdiaz6da</b>
  </ListGroupItem>
  <ListGroupItem>
    Nom et Prenom : <br/><b>KADIMI Hamza</b>
  </ListGroupItem>
  <ListGroupItem>
    Matricule : <br/><b>X162D930</b>
  </ListGroupItem>
  <ListGroupItem>
    Affectation : <br/><b>AFF83891</b>
  </ListGroupItem>
  <ListGroupItem>
    Réference Mobile : <br/><b>SUA99310</b>
  </ListGroupItem>
  <ListGroupItem>
    IMEI : <br/><b>AO09232</b>
  </ListGroupItem>
  <ListGroupItem>
    Etat de la demande : <br/><Badge color='warning' >En attente</Badge>
  </ListGroupItem>
  </ListGroup>
  <ListGroup
  horizontal
>
  <ListGroupItem>
    Nom du premier chef hiérarchique : <br/><b>Chef division SI</b>
  </ListGroupItem>
  <ListGroupItem>
    Date de la premiére validation : <br/><b>12/02/2020</b>
  </ListGroupItem>
  <ListGroupItem>
    Date de la deuxiéme validation : <br/><b>-</b>
  </ListGroupItem>
  <ListGroupItem>
    Refuser : <br/><Badge color='success' >Non</Badge>
  </ListGroupItem>
  <ListGroupItem>
    Date de refus :  <br/><b>-</b>
  </ListGroupItem>
</ListGroup> */}


      {/* Id de la demande
nom et prenom
matricule
affectation
referenceMobile
numeroSerieMobile
imei
engagement

Nom d’utilisateur du demandeur
etat de la Demande
Nom du manager
date de la validation du manager
date de la validation du DSI;
refuser
Nom du refuseur */}
      {/* </CardText>
    </CardBody>
  </Card> */}



        </div>
    );
};

export default React.memo(Home)








//     handleClick(){
        
//         // var config = {
//         //     responseType:'blob',
//         //     headers: {"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDSEVGIERTSSAxIiwicm9sZXMiOlsiRFBJIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiIsImV4cCI6MTY1NzU0NjU5OX0.rxT0gfc9OLioiuTFAyeVZDpXDwn5eXUqFA7fu0l995M"}
//         // }
//         // axios.get("http://localhost:8000/file/3dae3d6a-ce39-4c30-a0d5-d45242ed8bfcDsiValidation.pdf", config)
//         // .then((response) => {
//             // let url = window.URL.createObjectURL(response.data);
//             // let a = document.createElement('a');
//             // a.href = url;
//             // a.download = '3dae3d6a-ce39-4c30-a0d5-d45242ed8bfcDsiValidation.pdf';
//             // a.click();
//             // this.setState({
//             //   isLoading:false
//             // })
//             // window.location.href = response.url;
//             // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDSEVGIERTSSAxIiwicm9sZXMiOlsiRFBJIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiIsImV4cCI6MTY1NzU0ODk0OX0.ohdq_7P9gJZX215ACP1m8pdO9MMHTDOAY9qm4xEWAWk";
//             // const decoded = jwtDecode(token);
//         // })
//         // .catch((error)=>{
//         //     if(error.response.status === 403){
//         //         this.setState({
//         //             isAllowed:false
//         //         })
//         //     }
//         // })
//     }