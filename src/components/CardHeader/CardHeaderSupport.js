import React, { useState } from "react";
import { CardHeader, UncontrolledTooltip, Button } from "reactstrap"

import ViewSupport from "components/ViewSupport/ViewSupport";

const CardHeaderSupport = ({ titleHeader, textHeader, titleViewSupport, urlViewSupport, urlManualPdf}) => {

    const [isOpenModalSupport, setIsOpenModalSupport] = useState(false);
    const toggleModalSupport = () => setIsOpenModalSupport(!isOpenModalSupport);

    const handleSupport = (e) => {
      e.preventDefault();
      toggleModalSupport();
    }

    return (
        <>
        <CardHeader>
            <div className="align-items-center row">
              <div className="col-11">
                <h3 className="mb-0">{titleHeader}</h3>
                <p className="text-sm mb-0">
                  {textHeader}
                </p>
              </div>
              <div className="text-center col-1">
                { urlViewSupport &&
                <>
                <Button 
                    color="secondary"
                    onClick={handleSupport}
                    size="sm"
                    data-placement="top"
                    id="tooltip611234743" >
                        <span className="btn-inner--icon">
                            <i className="ni ni-button-play" />
                        </span>
                </Button>
                <UncontrolledTooltip
                    delay={0}
                    placement="top"
                    target="tooltip611234743"
                >
                    Watch help video
                </UncontrolledTooltip>
                </>}
              </div>
            </div>
        </CardHeader>
        <ViewSupport 
            isOpenModalSupport={isOpenModalSupport} 
            setIsOpenModalSupport={setIsOpenModalSupport}
            titleViewSupport={titleViewSupport}
            urlViewSupport={urlViewSupport}
            urlManualPdf={urlManualPdf} />
        </>
    )
}

export default CardHeaderSupport;