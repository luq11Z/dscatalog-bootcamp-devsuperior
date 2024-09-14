import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import Form from "../Form";
import { Router, useParams } from "react-router-dom";
import history from "util/history";
import userEvent from "@testing-library/user-event";
import { productResponse, server } from "./fixtures";
import selectEvent from "react-select-event";
import { ToastContainer } from 'react-toastify';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));

describe('Product form create tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: 'create'
        })
    });

    it('Should show toast and redirect when submit form correctly', async () => {
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(descriptionInput, 'teste');
        userEvent.type(nameInput, 'Computador');

        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Produto adicionado com sucesso")).toBeInTheDocument();
        });

        expect(history.location.pathname).toEqual('/admin/products');

    });

    it('Should show validation messages when just clicking subimit', async () => {
        render(
            <Router history={history}>
                <Form />
            </Router>
        );

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText("Campo obrigatório");
            expect(messages).toHaveLength(4);
        });
    });

    it('Should clear validation messages when filling out the form correctly', async () => {
        render(
            <Router history={history}>
                <Form />
            </Router>
        );

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText("Campo obrigatório");
            expect(messages).toHaveLength(4);
        });

        const nameInput = screen.getByTestId("name");
        const priceInput = screen.getByTestId("price");
        const descriptionInput = screen.getByTestId("description");
        const categoriesInput = screen.getByLabelText("Categorias");

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(descriptionInput, 'teste');
        userEvent.type(nameInput, 'Computador');

        await waitFor(() => {
            const messages = screen.queryAllByText("Campo obrigatório");
            expect(messages).toHaveLength(0);
        });
    });
});

describe('Product form update tests', () => {

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({
            productId: '2'
        })
    });

    it('Should show toast and redirect when submit form correctly', async () => {
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );

        await waitFor(() => {
            const nameInput = screen.getByTestId("name");
            const priceInput = screen.getByTestId("price");
            const descriptionInput = screen.getByTestId("description");

            const formElement = screen.getByTestId("form");

            expect(nameInput).toHaveValue(productResponse.name);
            expect(priceInput).toHaveValue(String(productResponse.price));
            expect(descriptionInput).toHaveValue(productResponse.description);

            const ids = productResponse.categories.map(category => String(category.id));
            expect(formElement).toHaveFormValues({categories: ids});
        });

        const submitButton = screen.getByRole('button', { name: /salvar/i });
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText("Produto adicionado com sucesso")).toBeInTheDocument();
        });

        expect(history.location.pathname).toEqual('/admin/products');

    });
});