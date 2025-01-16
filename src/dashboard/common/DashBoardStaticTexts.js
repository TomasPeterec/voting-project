import React from 'react';
import { Link } from 'react-router-dom';
import DashBoardBreadcrumbBright from './DashBoardBreadcrumbBright';
import DashBoardTitleBright from './DashBoardTitleBright';
import { fontColorPrime } from '../../css-and-material/generalVariables';

const DashBoardStaticTexts = ({ title, breadcrumb, urlBack }) => {
  return (
    <>
      {/* the pair row Title Return button */}
      <div style={{ paddingTop: '20px', display: 'flex', width: '100%' }}>
        <div style={{ width: '80%' }}>
          <DashBoardTitleBright title={title} />
        </div>
        <div style={{ textAlign: 'right', margin: 'auto', width: '20%' }}>
          {urlBack === '' ? (
            <></>
          ) : (
            <Link to={urlBack}>
              <button
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  paddingTop: '11px',
                  color: fontColorPrime,
                }}
              >
                Return
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ paddingTop: '3px' }}>
        <DashBoardBreadcrumbBright breadcrumb={breadcrumb} />
      </div>
    </>
  );
};

export default DashBoardStaticTexts;
