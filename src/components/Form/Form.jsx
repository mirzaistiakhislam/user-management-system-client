import React from 'react';
import { FaBackward, FaUserPen } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Form = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const gender = form.gender.value;
        const status = form.status.value;

        const user = {
            name,
            email,
            gender,
            status
        }

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    Swal.fire({
                        icon: 'success',
                        title: 'User Added Successfully',
                        showConfirmButton: false,
                        timer: 2500
                    })
                }
                form.reset();
            })
    }

    return (
        <div className=''>
            <div className='w-3/4 mx-auto my-12'>
                <Link to="/">
                    <button className="btn btn-outline"><FaBackward size={20} /> All Users </button>
                </Link>
            </div>
            <div className="hero min-h-screen bg-base-100 -mt-8">
                <div className="hero-content flex-col w-3/4">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-center">New User</h1>
                        <p className="py-2">Use the below form to create a new account!!</p>
                    </div>
                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-200">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" name="name" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" />
                            </div>

                            <div className="form-control flex flex-row items-center">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <input type="radio" name="gender" className="radio mx-4" value="Male" /> Male
                                <input type="radio" name="gender" className="radio mx-4" value="Female" /> Female
                            </div>

                            <div className="form-control flex flex-row items-center">
                                <label className="label">
                                    <span className="label-text">Status</span>
                                </label>
                                <input type="radio" name="status" className="radio mx-4" value="Active" /> Active
                                <input type="radio" name="status" className="radio mx-4" value="Inactive" /> Inactive
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-neutral">Add User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;