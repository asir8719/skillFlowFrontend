import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const AdminUpdate = () => {
    
    const { id } = useParams()
    const {token, API} = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        isAdmin: true
    })
    
    useEffect(() => {
        if (location.state?.user) {
            setUser(location.state.user);
        }
    }, [location.state])

    const handleInput = (e) => {
        const {name, value, type} = e.target
        setUser({
            ...user,
            [name]: type === 'radio' ? (value === 'true') : value,
        })
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API}/admin/user/${id}/update`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user)
            })
            if(response.ok) {
                toast.success('Updated Successfully')
                navigate("/admin")
            } else {
                const result = await response.json()
                toast.error('sorry')
            }
        } catch (error) {
            toast.error(error)
        }
    }
    
    return (<>
    <div className="lgndv3">
        <h1>Update User Data</h1>
        <br />
        <form onSubmit={handleFormSubmit}>
            <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={user.username} onChange={handleInput} required/>
            </div>
            <br />
            <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={user.email} onChange={handleInput} required/>
            </div>
            <br />
            <div>                
            <label htmlFor="phone">Phone:</label>
            <input type="phone" id="phone" name="phone" value={user.phone} onChange={handleInput} required/>
            </div>
            <br />
            <div>Is Admin:</div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <label htmlFor="isAdminYes">Yes</label>
                <input type="radio" id="isAdminYes" name="isAdmin" value={true} checked={user.isAdmin === true} onChange={handleInput}/>
                <label htmlFor="isAdminNo">No</label>
                <input type="radio" id="isAdminNo" name="isAdmin" value={false} checked={user.isAdmin === false} onChange={handleInput}/>
            </div>
            <br />
            <div>
            <button type="submit">Update</button>
            </div>
        </form>
    </div>
    </>)
}

export default AdminUpdate;