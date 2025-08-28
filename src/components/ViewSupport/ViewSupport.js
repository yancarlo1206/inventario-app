import React from "react"
import { Button, Modal } from "reactstrap"

const ViewSupport = ({ isOpenModalSupport, setIsOpenModalSupport, handleModal, titleViewSupport, urlViewSupport, urlManualPdf }) => {

    return (
        <Modal isOpen={isOpenModalSupport} size="xl" toggle={() => { handleModal() }} backdrop={"static"}>
            <div className="modal-header bg-gradient-hensall">
                <h6 className="modal-title text-white" id="modal-title-default">
                    Help Video | {titleViewSupport}
                </h6>
                <Button
                  className="btn"
                  color="secondary"
                  href={urlManualPdf}
                  size="sm"
                  target="_blank"
                >
                  <span className="btn-inner--icon mr-1">
                    <i className="ni ni-bag-17" />
                  </span>
                  <span className="btn-inner--text">PDF Manual</span>
                </Button>
            </div>
            <div className="modal-body">
                {
                    urlViewSupport && titleViewSupport &&
                        <iframe
                            width="100%"
                            height="550"
                            frameBorder="0"
                            allowFullScreen
                            src={urlViewSupport}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                }
                
            </div>
            <div className="modal-footer">
                <Button
                    type="button"
                    color="light"
                    className="btn-label btn-hensall-cancel"
                    onClick={() => { setIsOpenModalSupport(false)}}
                >
                    <i className="bx bx-x label-icon"></i> Close
                </Button>
            </div>
        </Modal>
    )
}

export default ViewSupport;