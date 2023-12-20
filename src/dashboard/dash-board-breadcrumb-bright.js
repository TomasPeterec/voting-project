import React from 'react'
import PropTypes from 'prop-types'

const DashBoardBreadcrumbBright = ({ breadcrumb }) => {
  return <p style={{ margin: '0px' }}>{breadcrumb}</p>
}

DashBoardBreadcrumbBright.propTypes = {
  breadcrumb: PropTypes.node.isRequired
}

export default DashBoardBreadcrumbBright
