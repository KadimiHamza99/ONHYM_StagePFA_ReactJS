import React from 'react';

const Error = () => {
    return (
        <div className='container'>
            <div className="d-flex align-items-center justify-content-center" style={{marginTop:'7em'}} >
            <div className="text-center">
                <h1 className="display-1 fw-bold">404 | 403</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Vous ne pouvez pas accéder à cette page .</p>
                <p className="lead">
                    Cette page n'existe pas ou vous n'etes pas autoriser d'y accéder
                  </p>
                <a href="/" className="btn btn-link btn-sm">Retourner à la page d'acceuil</a>
            </div>
        </div>
        </div>
    );
};

export default React.memo(Error)