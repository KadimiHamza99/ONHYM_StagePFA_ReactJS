import axios from 'axios'
import React, { Component } from 'react'
import Home from './Home'

class LoginForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            access_token:"",
            refresh_token:"",
            isAuth: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/login?username="+this.username.value+"&password="+this.password.value)
          .then((response) => {
            this.setState({
                access_token:response.data.access_token,
                refresh_token:response.data.refresh_token,
                isAuth:true
            })
            localStorage.setItem("access_token",response.data.access_token)
            localStorage.setItem("refresh_token",response.data.refresh_token)
          })
    }


    render(){
        return(
 
        <div className="form">
            {
                localStorage.getItem('access_token') && localStorage.getItem('refresh_token')
            ? 
                <Home/> 
            : 
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="username" ref={(i)=>this.username=i} required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" ref={(i)=>this.password=i} required />
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                </form>
            }
        </div>

        )
    }
}


export default LoginForm