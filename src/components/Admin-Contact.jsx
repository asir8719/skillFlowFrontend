import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useAuth } from "../store/auth"

const AdminContact = () => {

    const {token} = useAuth()
    const [contactData, setContactData] = useState([])

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/contact/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(response.ok) {
                const result = await response.json()
                toast.success(result.msg)
                fetchContactData()
            } else{
                toast.error('Failed to delete contact')
            }
        } catch (error) {
            toast.error('oh no! something went wrong')
        }
    }

    const fetchContactData = async () => {
        try {
            const response = await fetch('http://localhost:3000/admin/contact', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(response.ok) {
                const result = await response.json()
                const {msg: data} = result
                setContactData(data)
            } else {
                setContactData([])
            }
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        fetchContactData()
    }, [token])

    return (<>
        <div className="admndv3">
        <h1>Admin Contact Panel</h1>             
                    <table>
                        <thead>
                            <tr className="contactHead">
                                <th>Username</th>
                                <th>Email</th>
                                <th>Feedback</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactData.map(contact => (
                                <tr className="contactBody" key={contact._id}>
                                <td>{contact.username}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                                <td><button className="delete" onClick={() => deleteContact(contact._id)}>Delete</button></td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>    
    </>)
}

export default AdminContact;