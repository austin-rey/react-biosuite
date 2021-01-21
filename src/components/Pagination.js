import React from 'react'

import Pagination from '@material-ui/lab/Pagination';

const PaginationControlled = ({totalPages,currentPage,onChange}) => {
    return (
        <Pagination count={totalPages} page={currentPage} variant="outlined" color="primary"  shape="rounded" onChange={onChange}  />
    )
}

export default PaginationControlled
