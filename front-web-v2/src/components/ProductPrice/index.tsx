import { type } from 'os';
import './styles.scss';

type Props = {
    price: number;
}

const ProductPrice = ({ price }: Props) => {
    return (
        <div className="pruduct-price-container">
            <span>R$</span>
            <h3>{price}</h3>
        </div>
    )
}

export default ProductPrice;