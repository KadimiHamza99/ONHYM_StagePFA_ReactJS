import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Error from "./components/Error";
import AllDemandesAm from "./components/AllDemandesAm";
import Header from "./components/Header";
import Home from "./components/Home";
import { LoginContextProvider } from "./context/LoginContext";
import AllDemandesSi from "./components/AllDemandesSi";
import { DataContextProvider } from "./context/DataContext";

import ChangePassword from "./components/ChangePassword";
import Users from "./components/Users";
import UsersUpdate from "./components/UsersUpdate";
import DemandeAMDetails from "./components/DemandeAMDetails";
import DemandeSIDetails from "./components/DemandeSIDetails";
import ValidationAM from "./components/ValidationAM";
import ValidationSI from "./components/ValidationSI";
import RefusAM from "./components/RefusAM";
import RefusSI from "./components/RefusSI";
import UserDemandesAM from "./components/UserDemandesAM";
import UserDemandesSI from "./components/UserDemandesSI";
import Politique from "./components/Politique";

class Main extends Component {

    render() {
        return (
            <LoginContextProvider>
                <DataContextProvider>
                    <BrowserRouter>
                        <Header />
                        <Routes>
                            <Route exact path="/" element={<Home />} />

                            <Route exact path="/dsi/demandesAM" element={<AllDemandesAm />} />
                            <Route exact path="/dsi/demandesSI" element={<AllDemandesSi />} />
                            <Route exact path='/demandesAM/details/:demandeId' element={<DemandeAMDetails />} />
                            <Route exact path='/demandesSI/details/:demandeId' element={<DemandeSIDetails />} />
                            
                            <Route exact path="/validation/am" element={<ValidationAM />}/>
                            <Route exact path="/validation/si" element={<ValidationSI />}/>

                            <Route exact path="/refus/am" element={<RefusAM/>}/>
                            <Route exact path="/refus/si" element={<RefusSI/>}/>

                            <Route exact path="/demandesAM" element={<UserDemandesAM />}/>
                            <Route exact path="/demandesSI" element={<UserDemandesSI />}/>

                            <Route exact path="/politique" element={<Politique />}/>

                            {/* <Route exact path="/dsi/attente/demandesAM" element={<DsiAttenteAM />} />
                            <Route exact path="/dsi/attente/demandesSI" element={<DsiAttenteSI />} />
                            <Route exact path="/manager/attente/demandesAM" element={<ManagerAttenteAM />} />
                            <Route exact path="/manager/attente/demandesSI" element={<ManagerAttenteSI />} />
                            <Route exact path="/demandes-Refuses/am" element={<DemandesRefusesAm />} />
                            <Route exact path="/demandes-Refuses/si" element={<DemandesRefusesSi />} /> */}

                            <Route exact path="/configuration" element={<ChangePassword />} />
                            <Route exact path="/admin/users" element={<Users />} />
                            <Route path='/admin/users/:userId' element={<UsersUpdate />}></Route>

                            <Route path="/*" element={<Error />} />
                        </Routes>
                        {/* <Footer /> */}
                    </BrowserRouter>
                </DataContextProvider>
            </LoginContextProvider>
        )
    }
}

export default Main