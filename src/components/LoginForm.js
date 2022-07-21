import React, { useContext, useState } from 'react';
import { Button, FormGroup ,Form , Label , Input, Alert, Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { LoginContext } from '../context/LoginContext';

const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {login,errMsg} = useContext(LoginContext)


    const handleLogin = (e) => {
        e.preventDefault()
        login(username,password)
    }

    return (
        <div className="container grid">
          
        <Card
    body
    
    style={{ width: '30rem', margin: '3em ' }}
  >
    <CardBody>
      <CardTitle tag="h5">
        S'Authentifier
      </CardTitle>
      <CardText>
      <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                        <Input type="text" id='username'
                                name='username' required
                                value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id='password'
                            name='password' required
                            value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </FormGroup>
                <Button type='submit' color='primary' sm>Se connecter</Button>
            </Form>
            {
            errMsg.length>0 ? 
                <Alert color="danger">
                    {errMsg}
                </Alert> 
                : 
                <></>
            }
      </CardText>
    </CardBody>
  </Card>
  <picture className="logo">
        <img width="200" src="onhym-logo.png" alt="" />
      </picture>
            
        </div>
    );
};

export default React.memo(LoginForm)














// import axios from 'axios'
// import React, { Component } from 'react'
// import Home from '../pages/Home'

// class LoginForm extends Component{

//     constructor(props){
//         super(props)
//         this.state = {
//             access_token:"",
//             refresh_token:"",
//             isAuth: false
//         }
//     }

//     handleSubmit = (e) => {
//         e.preventDefault()
//         axios.post("http://localhost:8000/login?username="+this.username.value+"&password="+this.password.value)
//           .then((response) => {
//             this.setState({
//                 access_token:response.data.access_token,
//                 refresh_token:response.data.refresh_token,
//                 isAuth:true
//             })
//             // localStorage.setItem("access_token",response.data.access_token)
//             // localStorage.setItem("refresh_token",response.data.refresh_token)

//             localStorage.setItem('access_token', JSON.stringify({
//                 time: new Date(),
//                 data: response.data.access_token
//             }))
//             localStorage.setItem('refresh_token', JSON.stringify({
//                 time: new Date(),
//                 data: response.data.refresh_token
//             }))
//             console.log(response.data.access_token)
//             setTimeout(function() {
//                 localStorage.clear()
//                 window.location.reload()
//             }, 1000*60*60)
//         })
//     }


//     render(){
//         return(
 
//         <div className="form">
   
//             {
//                 localStorage.getItem('access_token') && localStorage.getItem('refresh_token')
//             ? 
//                 <Home/> 
//             : 
//                 <form onSubmit={(e)=>this.handleSubmit(e)}>
//                     <div className="input-container">
//                         <label>Username </label>
//                         <input type="text" name="username" ref={(i)=>this.username=i} required />
//                     </div>
//                     <div className="input-container">
//                         <label>Password </label>
//                         <input type="password" name="pass" ref={(i)=>this.password=i} required />
//                     </div>
//                     <div className="button-container">
//                         <input type="submit" />
//                     </div>
//                 </form>
//             }
//         </div>

//         )
//     }
// }


// export default LoginForm