import React, { useContext, useState } from 'react';
import { Button, FormGroup ,Form , Label , Input, Alert, Card, CardBody, CardTitle, CardText } from 'reactstrap'
import { LoginContext } from '../context/LoginContext';

const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {login,errMsg,logout} = useContext(LoginContext)


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
      <CardText>
      <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Label htmlFor="username">Login</Label>
                        <Input type="text" id='username'
                                name='username' required
                                value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input type="password" id='password'
                            name='password' required
                            value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </FormGroup>
                <Button type='submit' color='primary' size='sm' style={{marginBottom:'10px'}}>Se connecter</Button>
            </Form>
            {
            errMsg.length>0 ? 
                <Alert color="danger">
                    {errMsg} 
                    <hr/>
                    <Button size='sm' color='danger' onClick={logout}>Fix problems</Button>
                </Alert> 
                : 
                <></>
            }
      </CardText>
    </CardBody>
  </Card>
            
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