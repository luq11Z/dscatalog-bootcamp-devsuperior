import { useForm, Controller } from 'react-hook-form';
import { Product } from 'types/product';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Category } from 'types/category';

import './styles.scss';

type UrlParams = {
  productId: string;
};

const path = '/admin/products';

const Form = () => {
  const { productId } = useParams<UrlParams>();
  const history = useHistory();
  const isEditing = productId !== 'create';
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then((response) => {
        const product = response.data as Product;

        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]);

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  const onSubmit = (formData: Product) => {
    const config: AxiosRequestConfig = {
      url: isEditing ? `/products/${productId}` : '/products',
      method: isEditing ? 'PUT' : 'POST',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      history.push(path);
    });
  };

  const handleCancel = () => {
    history.push(path);
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inpunts-container">
            <div className="col-lg-6 product-crud-inpunts-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input form-custom-bg ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <Controller
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      classNamePrefix="product-crud-select"
                      isMulti
                      getOptionLabel={(category: Category) => category.name}
                      getOptionValue={(category: Category) =>
                        String(category.id)
                      }
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input form-custom-bg ${
                    errors.price ? 'is-invalid' : ''
                  }`}
                  placeholder="Preço"
                  name="price"
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('imgUrl', {
                    required: 'Campo obrigatório',
                    pattern: {
                        value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                        message: 'Deve ser uma url válida'
                    }
                })}
                  type="text"
                  className={`form-control base-input form-custom-bg ${
                    errors.imgUrl ? 'is-invalid' : ''
                  }`}
                  placeholder="URL da imagem do produto"
                  name="imgUrl"
                />
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  className={`form-control base-input form-custom-bg ${
                    errors.description ? 'is-invalid' : ''
                  }`}
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  placeholder="Descrição"
                  name="description"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-form-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-form-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary text-white product-crud-form-button">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
