import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

export class DialogComponent extends React.Component<any> {
  public Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    if (this.props.onHandleClickOpen) {
      this.props.onHandleClickOpen.current = this.handleClickOpen;
    }
  }

  public handleClickOpen = () => {
    this.setState({ open: true });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };

  public handleConfirm() {
    this.setState({ open: false });
    this.props.onConfirm();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state["open"]}
          TransitionComponent={this.Transition}
          keepMounted
          onClose={this.handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Confirmation dialog"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>No</Button>
            <Button onClick={this.handleConfirm.bind(this)}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
