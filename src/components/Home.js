import React from 'react'
import { Card, CardFooter, CardSubtitle, CardText, CardTitle, Col } from 'reactstrap';
import LoginForm from './LoginForm';

const Home = () => {

    if (!localStorage.getItem("isAuth")) {
        return <LoginForm />
    }
    return (
        <div className='container'>

            <Col sm="12">
                <Card body style={{ marginTop: '3em' }}>
                    <CardTitle tag="h3">
                        Espace des demandes
                    </CardTitle>
                    <CardSubtitle tag="h5">
                        Les demandes acces à la messagerie via le mobile et les demandes des services SI
                    </CardSubtitle>
                    <CardText>
                        <p>
                            Bonjour Mr./Mme. {localStorage.getItem('username')} ,Cet espace est confidentiel et reservé aux employés de l'ONHYM .
                        </p>
                    </CardText>
                </Card>
            </Col>

        </div>
    );
};

export default React.memo(Home)
