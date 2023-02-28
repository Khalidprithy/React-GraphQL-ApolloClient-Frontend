import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import NavLink from '../Components/NavLink';
import { AiFillEyeInvisible, AiFillEye, AiFillHome } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../GraphQL/RegisterMutation';
import SocialLogin from './SocialLogin';

const SignUp = () => {
    const [signup, { loading, error }] = useMutation(REGISTER_MUTATION, {
        onCompleted: (data) => {
            // Save the token to a cookie
            console.log(data)
        },
    });
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const navigate = useNavigate();
    const { register, watch, formState: { errors }, handleSubmit } = useForm({
        mode: 'onTouched'
    });
    let errorMessage;

    // Check Confirm Password
    const password = watch("password");

    const onSubmit = (data, e) => {
        console.log(data)
        e.preventDefault();
        signup({
            variables: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                number: parseInt(data.number),
                address: data.address,
            },
        }).catch((error) => {
            // Handle login error
            console.error(error);
        });

    }


    return (
        <div className='h-screen flex justify-center items-center'>
            <div class="w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 p-6 mx-auto mb-4 relative mt-10">
                <h5 className='capitalize text-3xl font-medium text-gray-600 dark:text-gray-300 text-center mb-10'>Sign Up</h5>
                <Link to='/'
                    className='absolute left-5 top-5 border border-green-400 text-green-500 hover:text-white hover:bg-green-500 rounded-full p-2 transition ease-in-out delay-150 duration-300'
                ><AiFillHome className='text-2xl' /></Link>

                {/* Social login */}
                <SocialLogin />

                <form className='p-2 md:p-10 lg:px-10' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-2'>
                        <div className="form-control w-full">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input input-bordered border-primary w-full bg-white rounded"
                                {...register("firstName", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Your First Name'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.firstName && <span className="label-text text-base font-semibold text-orange-600">{errors.firstName.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="input input-bordered border-primary w-full bg-white rounded"
                                {...register("lastName", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Your Last Name'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.lastName && <span className="label-text text-base font-semibold text-orange-600">{errors.lastName.message}</span>}
                            </label>
                        </div>
                    </div>

                    <div className="form-control w-full">
                        <input
                            type="text"
                            placeholder="Address"
                            className="input input-bordered border-primary w-full bg-white rounded"
                            {...register("address", {
                                required: {
                                    value: true,
                                    message: 'Please Enter Your Address'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.address && <span className="label-text text-base font-semibold text-orange-600">{errors.address.message}</span>}
                        </label>
                    </div>
                    <div className='flex gap-2'>
                        <div className="form-control w-full">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className={`input input-bordered border-primary w-full bg-white rounded ${errors.email && 'focus:border-red-600 focus:ring-red-600 border-2 border-red-600'}`}
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Your Email'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Enter a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text text-base font-semibold text-orange-600">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text text-base font-semibold text-orange-600">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <input
                                type="number"
                                placeholder="Phone Number"
                                className="input input-bordered border-primary w-full bg-white rounded"
                                {...register("number", {
                                    required: {
                                        value: true,
                                        message: 'Please Enter Your Phone Number'
                                    },
                                    minLength: {
                                        value: 9,
                                        message: 'Must be greater then 9 digits'
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Must be smaller then 20 digits'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.number && <span className="label-text text-base font-semibold text-orange-600">{errors.number.message}</span>}
                            </label>
                        </div>

                    </div>
                    <div className="form-control w-full relative">
                        <input
                            type={passwordShow ? 'text' : 'password'}
                            placeholder="Your Password"
                            className={`input input-bordered border-primary w-full bg-white rounded ${errors.password && 'focus:border-red-600 focus:ring-red-600 border-2 border-red-600'}`}
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Please Enter You Password'
                                },
                                // pattern: {
                                //     value: /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/,
                                //     message: 'Password must contain minimum eight characters, at least one uppercase letter and one number'
                                // }
                            })}
                        />
                        <div className='text-2xl absolute top-3 right-2'>
                            {
                                (passwordShow === false) ? <AiFillEyeInvisible onClick={() => setPasswordShow(!passwordShow)}></AiFillEyeInvisible> : <AiFillEye onClick={() => setPasswordShow(!passwordShow)}></AiFillEye>
                            }
                        </div>
                        <label className="label">
                            {errors.password && <span className="label-text text-base font-semibold text-orange-600">{errors.password.message}</span>}
                        </label>
                    </div>
                    <div className="form-control w-full relative">
                        <input
                            onPaste={(e) => {
                                e.preventDefault()
                                return false
                            }}
                            placeholder="Confirm Password"
                            type={confirmPasswordShow ? 'text' : 'password'}
                            className={`input input-bordered border-primary w-full bg-white rounded ${errors.confirmPassword && 'focus:border-red-600 focus:ring-red-600 border-2 border-red-600'}`}
                            {...register("confirmPassword", {
                                required: 'Confirm your Password',
                                validate: (value) =>
                                    value === password || "The passwords do not match"
                            })}
                        />
                        <div className='text-2xl absolute top-3 right-2'>
                            {
                                (confirmPasswordShow === false) ? <AiFillEyeInvisible onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}></AiFillEyeInvisible> : <AiFillEye onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}></AiFillEye>
                            }
                        </div>
                        <label className="label">
                            {errors.confirmPassword && <span className="label-text text-base font-semibold text-orange-600">{errors.confirmPassword.message}</span>}
                        </label>
                    </div>
                    {errorMessage}
                    <div className='flex items-center justify-center'>
                        <button type="submit" class="w-32 text-white bg-success focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-success dark:focus:ring-blue-800 mb-4">Register</button>
                    </div>
                </form>
                <div class="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already have an account?<Link className='text-green-500 dark:text-green-700' to='/login'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;