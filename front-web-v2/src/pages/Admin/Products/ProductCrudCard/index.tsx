import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';
import { Link } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import ModalCard from 'components/ModalCard';
import { toast } from 'react-toastify';

import './styles.scss';

type Props = {
  product: Product;
  onDelete: Function;
};

const ProductCrudCard = ({ product, onDelete }: Props) => {
  const hanldeDelete = (productId: number) => {
    const config: AxiosRequestConfig = {
      url: `/products/${productId}`,
      method: 'DELETE',
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Produto apagado com sucesso');
        onDelete();
      })
      .catch(() => {
        toast.error('Erro ao apagar produto');
      });
  };

  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-top-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div className="product-crud-card-description">
        <div className="product-crud-card-bottom-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>
        <div className="product-crud-categories-container">
          {product.categories.map((category) => (
            <CategoryBadge name={category.name} key={category.id} />
          ))}
        </div>
      </div>
      <div className="product-crud-buttons-container">
        <button
          data-toggle="modal"
          data-target={`#exampleModalCenter${product.id}`}
          className="btn btn-outline-danger product-crud-button product-crud-button-first"
        >
          EXCLUIR
        </button>
        <Link to={`/admin/products/${product.id}`}>
          <button className="btn btn-outline-secondary product-crud-button">
            EDITAR
          </button>
        </Link>
      </div>
      <ModalCard
        id={product.id}
        name={product.name}
        onConfirm={() => {
          hanldeDelete(product.id);
        }}
      />
    </div>
  );
};

export default ProductCrudCard;
