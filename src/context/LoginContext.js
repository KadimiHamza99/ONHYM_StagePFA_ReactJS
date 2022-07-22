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
                const roles = []
                if(decoded.roles.find(element => element === "ADMIN")){
                    roles.push("ADMIN")
                }
                if(decoded.roles.find(element => element === "DSI")){
                    roles.push("DSI")
                }
                if(decoded.roles.find(element => element === "DPI")){
                    roles.push("DPI")
                }
                if(decoded.roles.find(element => element === "MANAGER")){
                    roles.push("MANAGER")
                }
                if(decoded.roles.find(element => element === "DEMANDEUR")){
                    roles.push("DEMANDEUR")
                }
                localStorage.setItem("roles",JSON.stringify(roles))
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
        localStorage.setItem("roles",JSON.stringify([]))
        window.location.reload()
    }

    const value = {
        login,logout,errMsg,setErrMsg
    }

    return(
        <LoginContext.Provider value={value}> {children} </LoginContext.Provider>
    )

}