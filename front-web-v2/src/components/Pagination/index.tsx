import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';

import './styles.scss';

type Props = {
  pageCount: number;
  range: number;
  forcePage?: number;
  onChange?: (pageNumber: number) => void;
};

const Pagination = ({ pageCount, range, forcePage, onChange }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousClassName="arrow-previous"
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
      forcePage={forcePage}
      previousLabel={
        <div className="pagination-arrow-container" data-testid="arrow-previous">
          <ArrowIcon />
        </div>
      }
      nextLabel={
        <div className="pagination-arrow-container" data-testid="arrow-next">
          <ArrowIcon />
        </div>
      }
    />
  );
};

export default Pagination;
