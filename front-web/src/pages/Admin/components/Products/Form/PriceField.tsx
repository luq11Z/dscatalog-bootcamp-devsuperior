import { Control, Controller, useFormState } from "react-hook-form";
import { FormState } from './';
import CurrencyInput from 'react-currency-input-field';

type Props = {
    control: Control<FormState>
}

const PriceField = ({ control }: Props) => {
    const { errors } = useFormState({ control });

    return (
        <Controller
            name="price"
            control={control}
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
                <CurrencyInput
                    placeholder="Preço"
                    className={`form-control input-base ${errors.price ? 'is-invalid' : ''}`}
                    intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                    value={field.value}
                    onValueChange={field.onChange}
                />
            )}
        />
    );

};

export default PriceField;