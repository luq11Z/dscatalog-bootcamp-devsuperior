import { render, screen, waitFor } from "@testing-library/react";
import Catalog from "..";
import '@testing-library/jest-dom';
import { Router } from "react-router-dom";
import history from "util/history";
import { server } from './fixtures';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('should render catalog with products', async () => {
    render(
        <Router history={history}>
            <Catalog />
        </Router>
    );

    await waitFor(() => {
        expect(screen.getByText("Cátalogo de Produtos")).toBeInTheDocument();
    });
});