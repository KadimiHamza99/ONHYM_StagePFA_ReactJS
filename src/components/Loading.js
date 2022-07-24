import React from 'react';
import loader from '../Assets/loading.gif' 

const Loading = () => {
    return (
        <img src={loader} alt='loader' style={{display: 'block',marginLeft: 'auto',marginRight: 'auto',width:'50%'}}/>
    );
};

export default Loading;