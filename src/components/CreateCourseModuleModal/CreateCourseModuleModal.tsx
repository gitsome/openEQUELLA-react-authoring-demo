import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, CircularProgress } from '@material-ui/core';
import './CreateCourseModuleModal.scss';
import CoursesApi from '../../api/CoursesApi';


export interface ICreateCourseModuleModalProps {
  children?: React.ReactNode;
  courseId: string;
  onClose: () => void;
  onCreated: () => void;
}

const CreateCourseModuleModal: React.FC<ICreateCourseModuleModalProps> = ({onClose, courseId, onCreated}) => {

  const [ moduleName, setModuleName ] = useState('');
  const [ moduleDescription, setModuleDescription ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const onNameChange = (event: any) => {
    setModuleName(event.target.value);
  };
  const onDescriptoinChange = (event: any) => {
    setModuleDescription(event.target.value);
  };

  const onCloseAttempt = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const onSubmit = () => {

    setIsLoading(true);

    CoursesApi.createCourseModule(courseId, moduleName, moduleDescription).then(() => {
      setIsLoading(false);
      onCreated();
      onClose();
    });
  };

  return (
    <Dialog
      onClose={onCloseAttempt}
      aria-labelledby="customized-dialog-title"
      open={true}
      scroll="paper"
      fullWidth={true}
      maxWidth="sm"
    >

      <DialogTitle id="customized-dialog-title">
        Add a Module
      </DialogTitle>

      <DialogContent dividers>

        <form noValidate autoComplete="off">

          <Box mb={2}>
            <TextField
              disabled={isLoading}
              id="outlined-adornment-amount"
              label="Module Title"
              variant="outlined"
              fullWidth={true}
              value={moduleName}
              onChange={onNameChange}
            />
          </Box>

          <TextField
            disabled={isLoading}
            id="moduleDescription"
            label="Module Description"
            multiline
            rows={4}
            fullWidth={true}
            value={moduleDescription}
            onChange={onDescriptoinChange}
            variant="outlined"
          />

          <button type="submit" disabled style={{display: 'none'}} aria-hidden="true"></button>
        </form>
      </DialogContent>

      <DialogActions>

        <Button autoFocus onClick={onCloseAttempt} color="default" disabled={isLoading}>Cancel</Button>
        <Button autoFocus onClick={onSubmit} color="primary" disabled={isLoading}>
          { isLoading && (<CircularProgress size={16} className="button-icon-left"/>) }
          Add
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseModuleModal;

