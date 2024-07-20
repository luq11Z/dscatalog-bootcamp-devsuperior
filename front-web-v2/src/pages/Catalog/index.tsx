import ProductCard from 'components/ProductCard';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from 'util/requests';
import CardLoader from './CardLoader';
import './styles.scss';

const Catalog = () => {
  
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: "/products",
      baseURL: BASE_URL,
      method: 'GET',
      params: {
        page: 0,
        size: 12,
      }
    };

    setIsLoading(true);
    
    axios(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Cátalogo de Produtos</h1>
      </div>
      <div className="row">
        {isLoading ? <CardLoader /> : (
          page?.content.map((product) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </div>
        )))}
      </div>

      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};

export default Catalog;
