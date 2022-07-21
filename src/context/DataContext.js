import axios from "axios";
import { createContext, useLayoutEffect, useState } from "react";

export const DataContext = createContext(null)

export const DataContextProvider = ({ children }) => {

    const [demandesAM, setDemandesAM] = useState({
        data: [],
        isLoading: true,
        isError: false,
        ErrMsg: ""
    })

    const [demandesSI, setDemandesSI] = useState({
        data: [],
        isLoading: true,
        isError: false,
        ErrMsg: ""
    })

    const [users, setUsers] = useState({
        data: [],
        isLoading: true,
        isError: false,
        ErrMsg: ""
    })

    useLayoutEffect(() => {
        var config = {
            headers: { "Authorization": "Bearer " + localStorage.getItem("access_token") }
        }
        axios.get('http://localhost:8000/private/get-all-demandes/am', config)
            .then((response) => {
                setDemandesAM((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    data: response.data
                }))
            })
            .catch((error) => {
                setDemandesAM((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isError: true,
                    ErrMsg: error.message
                }))
            })
        axios.get('http://localhost:8000/private/get-all-demandes/si', config)
            .then((response) => {
                setDemandesSI((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    data: response.data
                }))
            })
            .catch((error) => {
                setDemandesSI((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isError: true,
                    ErrMsg: error.message
                }))
            })
        axios.get('http://localhost:8000/configuration/admin/getUsers', config)
            .then((response) => {
                setUsers((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    data: response.data
                }))
            })
            .catch((error) => {
                setUsers((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isError: true,
                    ErrMsg: error.message
                }))
            })
    }, [])


    const value = {
        demandesAM, setDemandesAM,
        demandesSI, setDemandesSI,
        users, setUsers
    }

    return (
        <DataContext.Provider value={value}> {children} </DataContext.Provider>
    )
}