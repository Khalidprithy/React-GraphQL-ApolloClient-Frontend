import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { PRODUCTS } from '../GraphQL/Products';
import Loading from '../Shared/Loading';
import Product from './Product';

const Products = () => {
    const { error, loading, data } = useQuery(PRODUCTS);
    const [products, setProducts] = useState([]);
    console.log(products)
    useEffect(() => {
        if (data) {
            setProducts(data.products)
        }
    }, [data])

    if (loading) {
        return <Loading />
    }
    return (
        <div className=''>
            <h5 class="mb-4 text-3xl font-semibold text-gray-700 dark:text-white text-center">All Products</h5>
            {
                products.map(product => <Product
                    key={product.id}
                    product={product}
                />)
            }
        </div>
    );
};

export default Products;