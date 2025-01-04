import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import 'dashboard/votings/votingform/CandidateItems';

const DashBoardBreadcrumbBright = ({ breadcrumb }) => {
  return (
    <h3 className="breadcrumb" variant="h3">
      {breadcrumb}
    </h3>
  );
};

DashBoardBreadcrumbBright.propTypes = {
  breadcrumb: PropTypes.node.isRequired,
};

export default DashBoardBreadcrumbBright;
