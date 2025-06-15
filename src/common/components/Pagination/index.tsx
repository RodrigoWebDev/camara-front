import {
  Pagination as PaginationShad,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type CustomPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  total: number;
};

type PageNumbers = {
  pages: number[];
  front?: boolean;
  back?: boolean;
};

const Pagination = ({ page, setPage, total }: CustomPaginationProps) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total) {
      setPage(newPage);
    }
  };

  const pageNumbers = () => {
    if (page < 3) {
      const params = { pages: [1, 2, 3], front: true };
      return renderPageNumbers(params);
    }
    if (page > total - 2) {
      const params = { pages: [total - 2, total - 1, total], back: true };
      return renderPageNumbers(params);
    }
    const params = {
      pages: [page - 1, page, page + 1],
      front: true,
      back: true,
    };
    return renderPageNumbers(params);
  };

  const renderPageNumbers = ({ pages, back, front }: PageNumbers) => {
    const mappedPages = pages.map((pg, i) => (
      <PaginationItem key={pg}>
        <PaginationLink
          key={i}
          isActive={pg === page}
          onClick={() => handlePageChange(pg)}
          isDisabled={pg > total}
        >
          {pg}
        </PaginationLink>
      </PaginationItem>
    ));

    const ellipsis = (
      <PaginationItem key="ellipsis">
        <PaginationEllipsis className={total < 3 ? 'opacity-50' : ''} />
      </PaginationItem>
    );

    if (back && front) return [ellipsis, ...mappedPages, ellipsis];
    if (back) return [ellipsis, ...mappedPages];
    if (front) return [...mappedPages, ellipsis];
  };

  return (
    <PaginationShad>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isDisabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          />
        </PaginationItem>
        {pageNumbers()}
        <PaginationItem>
          <PaginationNext
            isDisabled={page === total || total < 3}
            onClick={() => handlePageChange(page + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShad>
  );
};

export default Pagination;
