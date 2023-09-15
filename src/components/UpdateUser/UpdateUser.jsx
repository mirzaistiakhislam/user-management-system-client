import React from 'react';
import { FaBackward } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateUser = () => {

    const user = useLoaderData();
    console.log(user.gender);

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;

        const updateUser = {
            name,
            email,
            gender,
            status
        }

        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    Swal.fire({
                        // position: 'top-end',
                        icon: 'success',
                        title: 'User Updated Successfully',
                        showConfirmButton: false,
                        timer: 2500
                    })
                }
            })
    }

    return (
        <div>
            <div className='w-3/4 mx-auto my-12'>
                <Link to="/">
                    <button className="btn btn-outline"><FaBackward size={20} /> All Users </button>
                </Link>
            </div>
            <div className="hero min-h-screen bg-base-100 -mt-10">
                <div className="hero-content flex-col w-3/4">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center">Update User</h1>
                        <p className="py-2">Use the below form to update an account!!</p>
                    </div>
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-200">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" defaultValue={user?.name} className="input input-bordered" name="name" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" defaultValue={user?.email} className="input input-bordered" name="email" />
                            </div>

                            <div className="form-control flex flex-row items-center">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                {
                                    user?.gender === 'Male' ?
                                        <>
                                            <input type="radio" name="gender" className="radio mx-4" value="Male" checked readOnly /> Male
                                        </>
                                        :
                                        <>
                                            <input type="radio" name="gender" className="radio mx-4" value="Male" readOnly /> Male
                                        </>
                                }
                                {
                                    user?.gender === 'Female' ?
                                        <>
                                            <input type="radio" name="gender" className="radio mx-4" value="Female" checked readOnly /> Female
                                        </>
                                        :
                                        <>
                                            <input type="radio" name="gender" className="radio mx-4" value="Female" readOnly /> Female
                                        </>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-neutral">Update User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;