import React from 'react';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';

const SocialLogin = () => {
    return (
        <div className='border-t border-green-700 p-4 mx-10'>
            <div className='flex items-center justify-center gap-5'>
                <FaFacebook className='text-3xl text-gray-800 hover:text-green-500 transition ease-in-out delay-150 duration-300 hover:scale-110' />
                <FaGoogle className='text-3xl text-gray-800 hover:text-green-500 transition ease-in-out delay-150 duration-300 hover:scale-110' />
                <FaGithub className='text-3xl text-gray-800 hover:text-green-500 transition ease-in-out delay-150 duration-300 hover:scale-110' />
            </div>
        </div>
    );
};

export default SocialLogin;