import { useEffect, useState } from 'react';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from "../../BaseForm";
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import './styles.scss';
import { Category } from 'core/types/Category';

type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[]
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'Editar Produto' : 'Cadastrar um produto';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);
                    setValue('categories', response.data.categories);
                })
        }
    }, [productId, isEditing, setValue]);
    
    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: '/categories'})
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));
    }, []);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? 'PUT' : 'POST',
            data
        })
            .then(() => {
                toast.info('Produto salvo com sucesso!');
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Erro ao salvar produto!');
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm 
                title={formTitle}
            >
                <div className="row">
                    <div className="col-6 teste">
                        <div className="margin-bottom-30">
                            <input
                                {...register('name', {
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres' },
                                    maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres' }
                                })}
                                type="text"
                                className={`form-control input-base ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Nome do produto"
                            />

                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <Controller
                                name='categories'
                                rules={{ required: true }}
                                control={control}
                                render={({ field })  => (
                                    <Select
                                        {...field}
                                        isLoading={isLoadingCategories} 
                                        options={categories}
                                        getOptionLabel={(option: Category) => option.name}
                                        getOptionValue={(option: Category) => String(option.id)}
                                        classNamePrefix="categories-select"
                                        placeholder="Categorias"
                                        isMulti
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
                                {...register('price', { required: "Campo obrigatório" })}
                                type="number"
                                className={`form-control input-base ${errors.price ? 'is-invalid' : ''}`}
                                placeholder="Preço"
                            />

                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>

                        <div className="margin-bottom-30">
                            <input
                                {...register('imgUrl', { required: "Campo obrigatório" })}
                                type="text"
                                className={`form-control input-base ${errors.imgUrl ? 'is-invalid' : ''}`}
                                placeholder="Imagem do produto"
                            />

                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="col-6">
                        <textarea
                            {...register('description', { required: "Campo obrigatório" })}
                            className={`form-control input-base ${errors.description ? 'is-invalid' : ''}`}
                            placeholder='Descrição'
                            cols={30}
                            rows={10}
                        />

                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;