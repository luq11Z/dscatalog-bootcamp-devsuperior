import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import ProductPrice from "..";

it('Should render ProductPrice', () => {
    const price = 10.1;

    render(
        <ProductPrice price={price}/>
    );

    expect(screen.getByText("R$")).toBeInTheDocument();
    expect(screen.getByText("10,10")).toBeInTheDocument();
});