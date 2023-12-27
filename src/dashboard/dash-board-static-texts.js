import React from 'react'
import DashBoardTitleBright from './dash-board-title-bright'
import DashBoardBreadcrumbBright from './dash-board-breadcrumb-bright'
import { Link } from 'react-router-dom'

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
                  paddingTop: '11px'
                }}
              >
                Return
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ paddingTop: '15px' }}>
        <DashBoardBreadcrumbBright breadcrumb={breadcrumb} />
      </div>
    </>
  )
}

export default DashBoardStaticTexts
