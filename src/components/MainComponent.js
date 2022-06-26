import React,{ Component } from "react";
import { Routes,Route } from "react-router-dom";
import Error from "./Error";
// import Home from "./Home";
import LoginForm from "./LoginForm";

class Main extends Component{
    
    render(){
        return(
            <Routes>
                <Route exact path="/" element={<LoginForm/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        )
    }
}

export default Main