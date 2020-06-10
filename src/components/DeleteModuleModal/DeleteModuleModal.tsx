import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText, CircularProgress } from '@material-ui/core';
import './DeleteModuleModal.scss';
import CoursesApi from '../../api/CoursesApi';
import Module from '../../classes/Module';


export interface IDeleteModuleModalProps {
  children?: React.ReactNode;
  courseId: string;
  module: Module;
  onClose: () => void;
  onLoading: (isLoading: boolean) => void;
  onDeleted: () => void;
}

const DeleteModuleModal: React.FC<IDeleteModuleModalProps> = ({
  module,
  courseId,
  onClose,
  onLoading,
  onDeleted
}) => {

  const [ isLoading, setIsLoading ] = useState(false);

  const onCloseAttempt = (event: any) => {
    event.stopPropagation();
    if (!isLoading) {
      onClose();
    }
  };

  const onSubmit = (event: any) => {

    event.stopPropagation();

    setIsLoading(true);
    onLoading(true);

    CoursesApi.deleteModule(module.itemUuid, courseId).then(() => {
      setIsLoading(false);
      onLoading(false);
      onDeleted();
      onClose();
    });
  };

  return (
    <Dialog
      open={true}
      onClose={onCloseAttempt}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete the module "{module.description}"?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will permanently delete this module. Any pages that are not associated to another module will also be deleted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCloseAttempt} color="default" disabled={isLoading}>Cancel</Button>
        <Button autoFocus onClick={onSubmit} color="secondary" disabled={isLoading}>
          { isLoading && (<CircularProgress size={16} className="button-icon-left"/>) }
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModuleModal;

