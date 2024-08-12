import { ReactComponent as SearchIcon } from 'assets/images/Union.svg';
import { Category } from 'types/category';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';

import './styles.scss';

export type ProductFilterData = {
  name: string;
  category: Category | null;
};

type Props = {
  onSubmitFilter: (data: ProductFilterData) => void;
};

const ProductFilter = ({ onSubmitFilter }: Props) => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeCategory = (value: Category) => {
    setValue('category', value);

    const obj: ProductFilterData = {
      name: getValues('name'),
      category: getValues('category'),
    };

    onSubmitFilter(obj);
  };

  const handleFormClear = () => {
    setValue('name', '');
    setValue('category', null);
  };

  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            {...register('name')}
            type="text"
            className="form-control"
            placeholder="Nome do produto"
            name="name"
          />
          <button className="product-filter-button-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectCategories}
                  classNamePrefix="product-filter-select"
                  placeholder="Categoria"
                  isClearable
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                  onChange={(value) => handleChangeCategory(value as Category)}
                />
              )}
            />
          </div>
          <button
            className="btn btn-outline-secondary btn-product-filter-clear"
            onClick={handleFormClear}
          >
            LIMPAR <span className="btn-prodcut-filter-word">FILTRO</span>{' '}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
