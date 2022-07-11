import React,{ Component } from "react";
import { Routes,Route, BrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import Root from "./pages/Root";

class Main extends Component{
    
    render(){
        return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Root/>}/>
                <Route path="/*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
        )
    }
}

export default Main