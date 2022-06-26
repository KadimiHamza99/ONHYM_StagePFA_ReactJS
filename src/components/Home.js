import axios from 'axios';
import React, { Component } from 'react';
import Error from './Error';
import Footer from './Footer';
import Header from './Header';

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            isAllowed:true
        }
    }

    handleClick(){
        var config = {
            headers: {"Authorization": "Bearer "+localStorage.getItem("access_token")}
        }
        axios.get("http://localhost:8000/demande", config)
        .then((response) => {
            console.log(response)
        })
        .catch((error)=>{
            if(error.response.status === 403){
                this.setState({
                    isAllowed:false
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Header/>
                {this.state.isAllowed ?
                    <button className='btn btn-sm btn-primary' onClick={()=>this.handleClick()}>
                        Test Api
                    </button>
                : 
                    <Error/>
                }
                <Footer/>
            </div>
        );
    }
}

export default Home;