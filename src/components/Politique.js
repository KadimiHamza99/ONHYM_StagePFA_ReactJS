import React from 'react';
import { Card, CardFooter, CardText, CardTitle, Col } from 'reactstrap';

const Politique = () => {
    return (
        <div className='container'>
            <Col sm="12">
                <Card body style={{marginTop:'3em'}}>
                    <CardTitle tag="h5">
                        La Politique de Sécurité du Système d’Information (PSSI) et de la charte informatique de l’ONHYM
                    </CardTitle>
                    <CardText>
                        L’activation de l’accès à la messagerie ONHYM sur le mobile, permet au serveur ONHYM, dans les limites des fonctionnalités techniques, d’administrer la sécurité des données de la messagerie :
                        <br />•	Définir les règles du mot de passe de l’appareil mobile (choisir le nombre et le type de caractères).
                        <br />•	Gérer les tentatives de déverrouillage de l’écran.
                        <br />•	Verrouiller l’écran à distance.
                        <br />•	Contrôler la fréquence de modification du mot de passe de verrouillage de l’écran.
                        <br />•	Définir le chiffrement des données stockées.
                        <br />•	Effacer toutes les données du téléphone en rétablissant la configuration de l’usine après demande de l’utilisateur en cas d’un vol ou une perte de l’appareil mobile.<hr />
                    </CardText>
                    <CardFooter>
                        Ces fonctionnalités n’affectent en aucun cas la confidentialité des données disponibles sur le mobile.
                        En cas de remplacement du mobile, le demandeur est dans l’obligation de supprimer la configuration de la messagerie de l’appareil mobile.
                    </CardFooter>
                </Card>
            </Col>
        </div>
    );
};

export default Politique;