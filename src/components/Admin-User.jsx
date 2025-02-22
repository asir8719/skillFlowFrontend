import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import { toast, ToastContainer } from "react-toastify"
import {Link} from 'react-router-dom'

const AdminUser = () => {

        const [userData, setUserData] = useState([])
        const {token} = useAuth()
    
        const deleteUser = async (id) => {
            console.log(id)
            try {
                const response = await fetch(`http://localhost:3000/admin/user/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const result = await response.json()
                if(response.ok) {
                    toast.success(result.msg)
                    fetchUserData()
                } else {
                    toast.error(result.error)
                }
            } catch (error) {
                toast.error(error)
            }
        }
        
        const fetchUserData = async() =>{
            try {
                const response = await fetch('http://localhost:3000/admin/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if(response.ok){
                    const result = await response.json()
                    const {msg: data} = result
                    setUserData(data)
                } else{
                    setUserData([])
                }
            } 
            catch (error) {
                toast.error(error)          
            }
        }
    
        useEffect(() => {
            fetchUserData()
        }, [token])

    return ( <>
        <div className="admndv3">
            <h1>Admin User Panel</h1>
            <table>
                <thead>
                    <tr className="userHead">
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map(user => (
                    <tr className="userBody" key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td><Link to={`/admin/${user._id}/edit`} state={{user}} ><button className="edit">Edit</button></Link></td>
                        <td><button className="delete" onClick={ () => deleteUser(user._id)}>Delete</button></td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    </>)
}

export default AdminUser;