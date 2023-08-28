import globalStyle from "../../style.module.css";
import style from "./style.module.css";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { ModalOptions } from "../../models/ModalOption";

export function ModalComponent({
  show,
  onCloseModal,
  onAcceptAndCloseModal,
  options,
  component,
}: {
  show: boolean;
  onCloseModal: any;
  onAcceptAndCloseModal: any;
  options: ModalOptions;
  component: any;
}) {
  const onCloseModal_ = (flag: boolean) => {
    onCloseModal(flag);
  };
  const onAcceptAndClose_ = (flag: boolean) => {
    onAcceptAndCloseModal(flag);
  };
  return (
    <div>
      <Modal
        size={options.size}
        aria-labelledby="contained-modal-title-vcenter"
        centered={options.centered}
        show={show}
        onHide={() => onCloseModal_(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title className={style.title}>{options.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-12">{component}</div>
        </Modal.Body>
        <Modal.Footer className={style.footer}>
          <div className="col-5">
            <Button
              variant="outlined"
              size="small"
              startIcon={<CloseIcon />}
              className={globalStyle.btnSecondary}
              onClick={() => onCloseModal_(false)}
            >
              Close
            </Button>
          </div>
          <div className="col-5">
            <Button
              variant="contained"
              size="small"
              endIcon={<DoneIcon />}
              className={`${globalStyle.btnPrimary} ${style.align}`}
              onClick={() => onAcceptAndClose_(false)}
            >
              Save Changes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
