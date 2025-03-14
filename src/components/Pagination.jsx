import React from "react"
import { Row } from "reactstrap"
import _ from "lodash"

const Pagination = ({ currentPage, totalPages, totalElements, size, onChangePage }) => {
  const generatePagination = () => {
    const maxVisible = 5
    let paginationItems = []
    if (totalPages <= maxVisible || totalPages < 7) {
      paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1)
    } else {
      if (currentPage <= 3) {
        paginationItems = [...Array.from({ length: 5 }, (_, i) => i + 1), "...", totalPages]
      } else if (currentPage >= totalPages - 2) {
        paginationItems = [1, "...", ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i)]
      } else {
        paginationItems = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
      }
    }

    return paginationItems
  }

  const handlePageClick = (page) => {
    if (typeof page !== "string" && page !== currentPage) {
      onChangePage(page)
    }
  }

  return (
    <Row className="g-0 justify-content-between align-items-center">
      <div className="col-sm-auto">
        <div className="text-muted">
          Showing{" "}
          <span className="fw-semibold">
            {_.min([(currentPage - 1) * size + 1, totalElements])} {"- "}
            {_.min([(currentPage - 1) * size + size, totalElements])}
          </span>
          {" of "}
          <span className="fw-semibold">{totalElements}</span> Results
        </div>
      </div>
      <div className="col-sm-auto">
        <ul className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
          {currentPage <= 1 ? (
            <li className="page-item pagination-prev disabled">
              <span className="page-link">Previous</span>
            </li>
          ) : (
            <li className="page-item">
              <span className="page-link" onClick={() => onChangePage(currentPage - 1)}>
                Previous
              </span>
            </li>
          )}
          {generatePagination().map((page, index) => (
            <li key={index} onClick={() => handlePageClick(page)} className="page-item">
              <span className={currentPage === page ? "page-link active" : "page-link"}>{page}</span>
            </li>
          ))}
          {currentPage >= totalPages ? (
            <li className="page-item pagination-next disabled">
              <span className="page-link">Next</span>
            </li>
          ) : (
            <li className="page-item">
              <span className="page-link" onClick={() => onChangePage(currentPage + 1)}>
                Next
              </span>
            </li>
          )}
        </ul>
      </div>
    </Row>
  )
}

export default Pagination
