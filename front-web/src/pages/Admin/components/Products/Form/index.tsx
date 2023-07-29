import { makePrivateRequest } from 'core/utils/request';
import { useState } from 'react';
import BaseForm from "../../BaseForm";
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '1',
        description: ''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(data => ({...data, [name]: value}));
    }
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://static.fnac-static.com/multimedia/Images/PT/NR/32/25/62/6432050/1540-1.jpg',
            categories: [{id: formData.category}]
        };
        
        makePrivateRequest({url : '/products', method: 'POST', data: payload})
         .then(() => {
            setFormData({name: '', category: '', price: '', description: ''});
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input 
                            type="text" 
                            className="form-control mb-5" 
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />
                        <select
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            name="category"
                            value={formData.category}
                        >
                            <option value="1">Livros</option>
                            <option value="2">Eletrônicos</option>
                            <option value="3">Computadores</option>
                        </select>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="price"
                            value={formData.price}
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                    <div className="col-6">
                        <textarea 
                            name="description" 
                            value={formData.description}
                            onChange={handleOnChange}
                            className="form-control"
                            cols={30} 
                            rows={10} 
                        />
                    </div>
                </div> 
            </BaseForm>
        </form>
    );
}

export default Form;