const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Products pagination">
      <ul className="pagination justify-content-center mt-4">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            上一頁
          </button>
        </li>

        {pages.map((p) => (
          <li
            key={p}
            className={`page-item ${p === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(p)}>
              {p}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          >
            下一頁
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
