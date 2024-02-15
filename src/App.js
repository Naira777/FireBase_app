import './App.css';
import SignIn from '../src/components/SignIn/SignIn'
import SignUp from "./components/SignUp/SignUp";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";


function App() {

    return (
        <div className="App">
            <Router>

                <Routes>
                    <Route path="/" element={<SignIn/>}/>
                    <Route path="/createAccount" element={<SignUp/>}/>
                    <Route path="/dashboard" element={<DashboardPage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                </Routes>
            </Router>


        </div>
    );
}

export default App;
