import React from 'react'

const Paginate = ({ pages }) => {
  return pages > 1 ? (
    <>
      {[...Array(pages).keys()].map((x) => (
        <button key={x + 1} onClick={setPage(x + 1)}>
          {x + 1}
        </button>
      ))}
    </>
  ) : // <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>

  null
}

export default Paginate
