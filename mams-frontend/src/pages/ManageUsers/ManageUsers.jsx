import React, {useEffect} from 'react';
import './ManagerUser.css'
import UserForm from "../../components/UserForm/UserForm.jsx";
import UserList from "../../components/UserList/UserList.jsx";
import toast from "react-hot-toast";
import {fetchUsers} from "../../Service/UsersService.js";

const ManageUsers = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        async function loadUsers() {
            try{
                setLoading(true);
                const response = await fetchUsers();
                setUsers(response.data);
            }catch(err){
                console.log(err);
                toast.error("Unable to fetch users");
            }finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);
    return (
        <div className="users-container text-light">
            <div className="left-column">
                <UserForm setUsers={setUsers} />
            </div>
            <div className="right-column">
                <UserList users={users} setUsers={setUsers}/>
            </div>
        </div>
    );
};

export default ManageUsers;