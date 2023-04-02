import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContractOwnerDashboard from "./Pages/ContractOwner/ContractOwnerDashboard";
import LandingPage from "./Pages/LandingPage/LandingPage";
import LandInspectorDashboard from "./Pages/LandInspector/LandInspectorDashboard";
import UserDashboard from "./Pages/User/UserDashboard";

function App() {
  return (
   
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/user" exact={true} element={<UserDashboard/>}/>
        <Route path="/land_inspector" exact={true} element={<LandInspectorDashboard/>}/>
        <Route path="/contract_owner" exact={true} element={<ContractOwnerDashboard/>}/>
      </Routes>

    </BrowserRouter>
   
  );
}

export default App;
