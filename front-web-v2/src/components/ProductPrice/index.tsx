import { formatPrice } from 'utils/formatters';
import './styles.scss';

type Props = {
    price: number;
}

const ProductPrice = ({ price }: Props) => {
    return (
        <div className="pruduct-price-container">
            <span>R$</span>
            <h3>{formatPrice(price)}</h3>
        </div>
    )
}

export default ProductPrice;