import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "core/utils/request";
import { ProductResponse } from "core/types/Product";
import Card from "../Card";
import Pagination from "core/components/Pagination";

const List = () => {
    const [productsResponse, setProductsResponse] = useState<ProductResponse>();
    const [isLoading, setIsloading] = useState(false);
    const [activePage, setActivePage] = useState(0);

    const history = useHistory();

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 4
        }

        setIsloading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductsResponse(response.data))
            .finally(() => {
                setIsloading(false);
            })
    }, [activePage]);

    const handleCreate = () => {
        history.push('/admin/products/create')
    }

    return (
        <div className="admin-products-list">
            <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                ADICIONAR
            </button>

            <div className="admin-list-container">
                {productsResponse?.content.map(product => (
                    <Card product={product} key={product.id} />
                ))}
                
                {productsResponse &&
                    <Pagination
                        totalPages={productsResponse.totalPages}
                        activePage={activePage}
                        onChange={page => setActivePage(page)}
                    />
                }
            </div>
        </div>
    );
}

export default List;