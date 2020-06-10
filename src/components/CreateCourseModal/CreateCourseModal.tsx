import React, { useState } from 'react';
import Course from '../../classes/Course';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, CircularProgress } from '@material-ui/core';
import './CreateCourseModal.scss';
import CoursesApi from '../../api/CoursesApi';


export interface ICreateCourseModalProps {
  children?: React.ReactNode;
  onClose: () => void;
  onCourseCreated: () => void;
}

const CreateCourseModal: React.FC<ICreateCourseModalProps> = ({onClose, onCourseCreated}) => {

  const [ courseName, setCourseName ] = useState('');
  const [ courseDescription, setCourseDescription ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const onNameChange = (event: any) => {
    setCourseName(event.target.value);
  };
  const onDescriptoinChange = (event: any) => {
    setCourseDescription(event.target.value);
  };

  const onCloseAttempt = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const onSubmit = () => {

    setIsLoading(true);

    CoursesApi.createCourse(courseName, courseDescription).then(() => {
      setIsLoading(false);
      onCourseCreated();
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
        Create New Course
      </DialogTitle>

      <DialogContent dividers>

        <form noValidate autoComplete="off">

          <Box mb={2}>
            <TextField
              disabled={isLoading}
              id="outlined-adornment-amount"
              label="Course Title"
              variant="outlined"
              fullWidth={true}
              value={courseName}
              onChange={onNameChange}
            />
          </Box>

          <TextField
            disabled={isLoading}
            id="courseDescription"
            label="Course Description"
            multiline
            rows={4}
            fullWidth={true}
            value={courseDescription}
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
          Create
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseModal;

