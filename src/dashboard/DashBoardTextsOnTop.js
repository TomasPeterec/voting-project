import React from "react";
import DashBoardTitleBright from "./DashBoardTitleBright";
import DashBoardBreadcrumbBright from "./DashBoardBreadcrumbBright";

const DashBoardTextsOnTop = ({title, breadcrumb}) => {
    return(
        <>  
            {/* the pair row Title Return button */}
            <div style={{paddingTop: "20px", display: "flex", width: "100%"}}>
                <div style={{width: "80%"}}>
                    <DashBoardTitleBright title={title}/>
                </div>
                <div style={{textAlign: "right", margin: "auto", width: "20%"}}>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', paddingTop: "11px" }}>
                        Return
                    </button>
                </div>
            </div>

            {/* Breadcrumb */}
            <div style={{paddingTop: "15px"}}>
                <DashBoardBreadcrumbBright breadcrumb={breadcrumb} />
            </div>
        </>
    )
}

export default DashBoardTextsOnTop