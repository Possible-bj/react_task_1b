import React from 'react'

const Paginate = ({ pages, setPage }) => {
  const handlePage = (page) => {
    console.log(page)
    setPage(page)
  }
  return pages > 1 ? (
    <>
      {[...Array(pages).keys()].map((x) => (
        <button key={x + 1} onClick={(e) => handlePage(+e.target.textContent)}>
          {x + 1}
        </button>
      ))}
    </>
  ) : null
  // <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
}

export default Paginate
