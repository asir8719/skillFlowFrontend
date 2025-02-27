import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaHome, FaRegListAlt, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

const Admin = () => {

    const {data} = useAuth()
    if(data.isAdmin === false) {
        return <h1>sorry</h1>
    } else return (
        <div className="admndv1">
            <div className="admndv2">
                <ul className="admnul">
                    <li><NavLink to='/admin'><FaUser/>   User</NavLink></li>
                    <li><NavLink to='/admin/services'><FaRegListAlt/>   Services</NavLink></li>
                    <li><NavLink to='/admin/contact'><FaMessage/>   Contacts</NavLink></li>
                    <li><NavLink to='/'><FaHome/>   Home</NavLink></li>
                </ul>
            </div>
            <div className="admndv3">
                <Outlet/>
            </div>
        </div>    
    )
}

export default Admin