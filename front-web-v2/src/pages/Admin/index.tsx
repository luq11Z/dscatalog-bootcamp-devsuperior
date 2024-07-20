import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import './styles.scss';
import Users from "./User";

const Admin = () => {
    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <Routes>
                    <Route path="products" element={<h1>Product CRUD</h1>}/>
                    <Route path="categories" element={<h1>Category CRUD</h1>}/>
                    <Route path="users" element={<Users />}/>
                </Routes>
            </div>
        </div>
    );
} 

export default Admin;