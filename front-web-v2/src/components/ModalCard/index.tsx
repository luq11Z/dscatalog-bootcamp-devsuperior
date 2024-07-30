import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './styles.scss';

type Props = {
    id: number;
    prefix?: string;
    name: string;
    onConfirm: Function;
}

const ModalCard = ({ id, prefix = "", name, onConfirm }: Props) => {
    return (
        <div
        className="modal fade"
        id={`exampleModalCenter${id}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby={`exampleModalCenterTitle${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title product-crud-modal-title"
              >
                Deseja deletar {name}?
              </h5>
              <button className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Tem a certeza que deseja deletar {prefix} {name}?
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline-danger product-crud-modal-button"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                data-dismiss="modal"
                onClick={() => {
                    onConfirm();
                }}
                className="btn btn-outline-primary product-crud-modal-button"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ModalCard;