import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AdminServiceUpdate = () => {

    const {token} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = useParams()
    const [service, setService] = useState({
        name: '',
        price: '',
        description: '',
        provider: ''
    })

    useEffect(() => {
        if(location.state?.service) {
            setService(location.state.service)
        }
    }, [location.status])

    const handleInput = (e) => {
        setService({
            ...service,
            [e.target.name]: e.target.value,
        })
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/admin/services/${id}/edit`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(service)
            })
            if(response.ok) {
                toast.success('Service Updated Successfully')
                navigate("/admin/services")
            } else {
                toast.error('Failed to update service')
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return (<>
    <div className="lgndv3">
        <h1>Update Service Data</h1>
        <br />
        <form onSubmit={handleFormSubmit}>
            <div>
            <label htmlFor="name">Service Name</label>
            <input type="text" name="name" id="name" value={service.name} onChange={handleInput} required/>
            </div>
            <br />
            <div>
            <label htmlFor="price">Service Price</label>
            <input type="text" name="price" id="price" value={service.price} onChange={handleInput} required/>
            </div>
            <br />
            <div>
            <label htmlFor="description">Service Description</label>
            <input type="text" name="description" id="description" value={service.description} onChange={handleInput} required/>
            </div>
            <br />
            <div>
            <label htmlFor="provider">Service Provider</label>
            <input type="text" name="provider" id="provider" value={service.provider} onChange={handleInput} required/>
            </div>
            <br />
            <div>
            <button type="submit">Update</button>
            </div>
        </form>
    </div>
    </>)
}

export default AdminServiceUpdate;