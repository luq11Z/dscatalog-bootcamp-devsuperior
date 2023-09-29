import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import './styles.scss';

const ButtonIcon = () => {
  return (
    <div className="btn-container">
      <button className="btn btn-primary">
        <h6>inicie agora sua busca</h6>
      </button>

      <div className="btn-icon-container">
        <ArrowIcon />
      </div>
    </div>
  );
};

export default ButtonIcon;
