import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Product } from "types/product";
import ProductCard from "..";


it('Should render ProductCard', () => {
    const product : Product = {
        name: "Computador",
        price: 2345.67,
        imgUrl: "https://google.com",
    } as Product;

    render(
        <ProductCard product={product}/>
    );

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText("R$")).toBeInTheDocument();
    expect(screen.getByText("2.345,67")).toBeInTheDocument();
});