import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const DashBoardBreadcrumbBright = ({ breadcrumb }) => {
  return <Typography variant="h3">{breadcrumb}</Typography>;
};

DashBoardBreadcrumbBright.propTypes = {
  breadcrumb: PropTypes.node.isRequired,
};

export default DashBoardBreadcrumbBright;
