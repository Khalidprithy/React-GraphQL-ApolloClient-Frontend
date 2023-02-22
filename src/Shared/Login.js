import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NavLink from '../Components/NavLink';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../GraphQL/LoginMutation';
import Loading from './Loading';
import Cookies from 'js-cookie';

const Login = () => {
    const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            // Save the token to a cookie
            console.log(data)
            Cookies.set('accessToken', data.login.accessToken, { expires: 7 });
        },
    });
    const [passwordShow, setPasswordShow] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm({
        mode: 'onTouched'
    });

    let errorMessage;

    const onSubmit = (data, e) => {
        e.preventDefault();
        login({
            variables: {
                email: data.email,
                password: data.password,
            },
        }).catch((error) => {
            // Handle login error
            console.error(error);
        });

    }

    if (loading) {
        return <Loading />
    }

    return (
        <div class="w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 max-w-[500px] p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mb-4 relative mt-10">
            <h5 className='capitalize text-3xl font-medium text-gray-600 dark:text-gray-300 text-center mb-4'>Login</h5>
            <form className='p-2 md:p-10 lg:px-10' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full ">
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
                <div className='flex items-center justify-center'>
                    <button type="submit" class="w-32 text-white bg-success focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-success dark:focus:ring-blue-800 mb-4">Login</button>
                </div>
                <div class="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?  <NavLink path={'/signup'} name={'Create account'} />
                </div>
            </form>
        </div>

    );
};

export default Login;