import './App.css';
import Header from './components/Header';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Company from './components/Company';
import Employee from './components/Employee';
import UserManagement from './components/UserManagement'; // Import UserManagement
import ServiceRegistrationCompany from './components/ServiceRegistrationCompany';
import ServiceRegistrationRegisteredService from './components/ServiceRegistrationRegisteredServices';
import ServiceRegistrationServices from './components/ServiceRegistrationServices';
import Service from './components/Service';
import Salary from './components/Salary';
import BuildingEmployee from './components/BuildingEmployee';
import Floor from './components/Floor';
import RentedArea from './components/RentedArea';
import ContractCompany from './components/Contract_Companies';
import Statistics from './components/Statistics';
import StatisticsRentedAreas from './components/Statistics_RentedAreas';
import MonthlyStatistics from './components/MonthlyStatistics';
import MonthlyStatisticDetails from './components/MonthlyStatisticsDetails';
import MonthlySalary from './components/MonthlySalary';
import Work from './components/Work';
import AdminDashboard from './components/AdminDashboard'; // Import component quản trị
import Register from './components/Register';

// Giả lập trạng thái đăng nhập
const isAdmin = true; // Thay đổi logic này tùy theo cách bạn quản lý đăng nhập

const PrivateRoute = ({ element }) => {
    return isAdmin ? element : <Navigate to="/login" />;
};

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/admin" element={<AdminDashboard />} /> {/* Route cho trang quản trị */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/company/view-employees/:id" element={<Employee />} />
                    <Route path="/employees/:companyId" element={<Employee />} />   
                    
                    <Route path="/company" element={<Company />} />
                    <Route path="/user-management" element={<PrivateRoute element={<UserManagement />} />} />
                    <Route path="/service-management" element={<Service />} />
                    <Route path="/service-registration/companies" element={<ServiceRegistrationCompany />} />
                    <Route path="/service-registration/registered-services" element={<ServiceRegistrationRegisteredService />} />
                    <Route path="/service-registration/services" element={<ServiceRegistrationServices />} />
                    <Route path="/salary" element={<Salary />} />
                    <Route path="/buildingemployee" element={<BuildingEmployee />} />
                    <Route path="/floors" element={<Floor />} />
                    <Route path="/rented-areas" element={<RentedArea />} />
                    <Route path="/contract-registration" element={<ContractCompany />} />
                    <Route path="/monthly-fee-statistics/rented-areas-of-company" element={<StatisticsRentedAreas />} />
                    <Route path="/monthly-fee-statistics" element={<Statistics />} />
                    <Route path="/monthly-statistics" element={<MonthlyStatistics />} />
                    <Route path="/monthly-statistics-details" element={<MonthlyStatisticDetails />} />
                    <Route path="/monthly-salary" element={<MonthlySalary />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
