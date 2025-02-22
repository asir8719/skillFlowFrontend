import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminServices = () => {

    const [serviceData, setServiceData] = useState([])
    const {token, API} = useAuth()

    const deleteServices = async(id) => {
        try {
            const response = await fetch(`${API}/admin/services/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(response.ok) {
                toast.success('Service Deleted Successfully')
                fetchServiceData()
            } else {
                toast.error('Failed to delete service')
            }
        } catch (error) {
            toast.error('oh no! something went wrong')
        }
    }

    const fetchServiceData = async () => {
        try {
            const response = await fetch(`${API}/admin/services`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(response.ok) {
                const result = await response.json()
                const {msg: data} = result
                setServiceData(data)
            } else{
                setServiceData([])
            }
        } catch (error) {
            toast.error('oh no! something went wrong')
        }
    }

    useEffect(() => {
        fetchServiceData()
    }, [token])
    return (
        <div className="admndv3">
        <h1>Admin Service Panel</h1>
                    <table>
                        <thead>
                            <tr className="serviceHead">
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Provider</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceData.map(service => (
                                <tr className="serviceBody" key={service._id}>
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td>{service.price}</td>
                                <td>{service.provider}</td>
                                <td><Link to={`/admin/services/${service._id}/edit`} state={{service}}><button className="edit">Edit</button></Link></td>
                                <td><button className="delete" onClick={() => deleteServices(service._id)}>Delete</button></td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
    )
}

export default AdminServices;