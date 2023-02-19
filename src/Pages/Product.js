import React from 'react';
import { AiFillDelete } from 'react-icons/ai';

const Product = ({ product }) => {
    return (
        <div class="w-9/12 p-6 bg-white border border-gray-200 rounded shadow dark:bg-gray-800 dark:border-gray-700 mx-auto mb-4 relative">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{product?.title}</h5>
            <p class="mb-3 font-medium text-sm text-gray-500 dark:text-gray-400">Categories: {product?.category}</p>
            <p class="mb-3 font-medium text-sm text-gray-500 dark:text-gray-400">Price: ${product?.price}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{product?.description}</p>
            <p class="mb-3 font-medium text-sm text-gray-500 dark:text-gray-400">Date posted: {product?.date}</p>
            <button className='absolute right-4 top-4'>
                <AiFillDelete className='text-2xl text-gray-700 hover:text-orange-600' />

            </button>
        </div>
    );
};

export default Product;