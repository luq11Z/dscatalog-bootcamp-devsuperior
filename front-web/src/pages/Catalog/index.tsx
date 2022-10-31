import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import { makeRequest } from 'core/utils/request';
import { ProductResponse } from 'core/types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import ProductCard from './components/ProductCard';

const Catalog = () => {

    const [productsResponse, setProductsResponse] = useState<ProductResponse>();
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 12
        }

        setIsloading(true);
        makeRequest({url: '/products', params})
        .then(response => setProductsResponse(response.data))
        .finally(() => {
            setIsloading(false);
        }) 
    }, []);

    return (
        <div className="catalog-container">
        <h1 className="catalog-title">
            Catálogo de produtos
            </h1>
        <div className="catolog-products">
            {isLoading ? <ProductCardLoader /> : (
                productsResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product={product}/>
                    </Link>
                ))
            )}     
        </div>
    </div>
    );
}

export default Catalog;