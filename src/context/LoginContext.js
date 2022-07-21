import axios from "axios";
import { createContext, useState } from "react";
import jwtDecode from "jwt-decode"

export const LoginContext = createContext(null)

export const LoginContextProvider = ({children}) => {

    const [errMsg,setErrMsg] = useState("")

    const login = (username, password) => {
        axios.post("http://localhost:8000/login?username="+username+"&password="+password)
            .then((response) => {
                const token = response.data.access_token
                const decoded = jwtDecode(token)
                if(decoded.roles.find(element => element === "ADMIN")){
                    localStorage.setItem("grade","ADMIN")
                }else if(decoded.roles.find(element => element === "DSI")){
                    localStorage.setItem("grade","DSI")
                }else if(decoded.roles.find(element => element === "DEMANDEUR")){
                    if(decoded.roles.find(element => element === "MANAGER")){
                        localStorage.setItem("grade","MANAGER")
                    }else if(decoded.roles.find(element => element === "DPI")){
                        localStorage.setItem("grade","DPI")
                    }else{
                        localStorage.setItem("grade","DEMANDEUR")
                    }
                }
                
                localStorage.setItem("username",decoded.sub)
                localStorage.setItem("access_token",response.data.access_token)
                localStorage.setItem("refresh_token",response.data.refresh_token)
                localStorage.setItem("isAuth",true)
                window.location.reload()
            }).catch(error=>{
                setErrMsg("BAD CREDENTIALS")
                console.log(error)
            })
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const value = {
        login,logout,errMsg,setErrMsg
    }

    return(
        <LoginContext.Provider value={value}> {children} </LoginContext.Provider>
    )

}