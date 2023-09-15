import React, { useEffect, useState } from 'react';
import { FaPencil, FaUserPen } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const UsersInfo = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            // console.log(result);
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            const restUsers = users.filter(user => user._id !== id);
                            setUsers(restUsers);
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className='my-32'>
            <div className='w-3/4 mx-auto mb-6'>
                <Link to="/new-user">
                    <button className="btn btn-outline">New User <FaUserPen size={20} /></button>
                </Link>
            </div>
            <div className="overflow-x-auto w-3/4 mx-auto rounded-lg bg-base-200">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.status}</td>
                                    <td className='flex items-center'>
                                        <Link to={`/update-user/${user._id}`}><span className='btn btn-outline px-4 py-2'><FaPencil /></span></Link>
                                        <span onClick={() => handleDelete(user._id)} className='text-xl btn btn-outline px-4 py-2 ml-2'>X</span>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersInfo;