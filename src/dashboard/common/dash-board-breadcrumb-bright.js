import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@mui/material'

const DashBoardBreadcrumbBright = ({ breadcrumb }) => {
  return <Typography variant="h3">{breadcrumb}</Typography>
}

DashBoardBreadcrumbBright.propTypes = {
  breadcrumb: PropTypes.node.isRequired
}

export default DashBoardBreadcrumbBright
