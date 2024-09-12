import ProductCard from 'components/ProductCard';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import CardLoader from './CardLoader';

import './styles.scss';

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = (pageNumber: number) => {
    setIsLoading(true);

    const params: AxiosRequestConfig = {
      url: '/products',
      method: 'GET',
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data);
        
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getProducts(0);
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Catálogo de Produtos</h1>
      </div>
      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="row justify-content-center">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={getProducts}
        />
      </div>
    </div>
  );
};

export default Catalog;
