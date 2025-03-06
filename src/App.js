import './App.css';
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './source/Home';
import AdminHomepage from './source/AdminHomepage';
import Customerhomepage from './source/Customerhomepage';
import Customerdetails from './source/Customerdetails';
import Expenseupload from './source/Expenseupload';
import Expensedetailscustomer from './source/Expensedetailscustomer';
import AdminAnnouncement from './source/AdminAnnouncement';
import Customerannouncement from './source/Customerannouncement';
import Adminexpensedetails from './source/Adminexpensedetails';
import Organizehomepage from './source/Organizehomepage';
import Organizationcustomerdetails from './source/Organizationcustomerdetails';
import Organizationexpensedetails from './source/Organizationexpensedetails';
import Organizeannouncement from './source/Organizeannouncement';
function App() {
  return (
  <div>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="adminhomepage" element={<AdminHomepage/>} />
        <Route path="customerhomepage" element={<Customerhomepage/>} />
        <Route path="customerdetails" element={<Customerdetails/>} />
        <Route path="expenseupload" element={<Expenseupload/>} />
        <Route path="expensedetailscustomer" element={<Expensedetailscustomer/>} />
        <Route path="adminannouncement" element={<AdminAnnouncement/>} />
        <Route path="customerannouncement" element={<Customerannouncement/>} />
        <Route path="adminexpensedetails" element={<Adminexpensedetails/>} />
        <Route path="organizationhomepage" element={<Organizehomepage/>} />
        <Route path="organizationcustomerdetails" element={<Organizationcustomerdetails/>} />
        <Route path="organizationexpensedetails" element={<Organizationexpensedetails/>} />
        <Route path="organizeannouncement" element={<Organizeannouncement/>} />
        </Routes>
  </div>
  );
}

export default App;
