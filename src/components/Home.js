import axios from 'axios';
import React, { Component } from 'react';
import Error from './Error';
import Footer from './Footer';
import Header from './Header';

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {
            isAllowed:true,
            isLoading:false
        }
    }

    handleClick(){
        var config = {
            responseType:'blob',
            headers: {"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDSEVGIERTSSAxIiwicm9sZXMiOlsiRFBJIiwiTUFOQUdFUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvbG9naW4iLCJleHAiOjE2NTcxOTUzMzh9.120BlKsowLKaHGDUhmfU0fqkymBNk7uOqim0kcHwAdw"}
        }
        axios.get("http://localhost:8000/file/16eafcf9-af81-4077-bab3-b6ca78ae9264DsiValidation.pdf", config)
        .then((response) => {
            this.setState({
                isLoading:true
            })
            console.log(response)
            let url = window.URL.createObjectURL(response.data);
            let a = document.createElement('a');
            a.href = url;
            a.download = '16eafcf9-af81-4077-bab3-b6ca78ae9264DsiValidation.pdf';
            a.click();
            // window.location.href = response.url;
        })
        // .catch((error)=>{
        //     if(error.response.status === 403){
        //         this.setState({
        //             isAllowed:false
        //         })
        //     }
        // })
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
                 {this.state.isLoading ? <span>LOADING</span> : <span/>}
                <Footer/>
            </div>
        );
    }
}

export default Home;