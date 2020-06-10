import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, CircularProgress } from '@material-ui/core';
import './CreateModulePageModal.scss';
import CoursesApi from '../../api/CoursesApi';

const placeholderMarkup = "# New Page\n\nWelcome to your new page. It is authored in markdown. \n\nYou can create lists:\n\n- Item 1\n- Item 2\n- Item 3\n\nAnd do **COOL** stuff like embed links. Here is a link that talks about markdown syntax:\n\n[Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)";

export interface ICreateModulePageModalProps {
  children?: React.ReactNode;
  moduleId: string;
  onClose: () => void;
  onCreated: () => void;
}

const CreateModulePageModal: React.FC<ICreateModulePageModalProps> = ({onClose, moduleId, onCreated}) => {

  const [ pageName, setPageName ] = useState('');
  const [ pageDescription, setPageDescription ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const onNameChange = (event: any) => {
    setPageName(event.target.value);
  };
  const onDescriptoinChange = (event: any) => {
    setPageDescription(event.target.value);
  };

  const onCloseAttempt = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const onSubmit = () => {

    setIsLoading(true);

    CoursesApi.createModulePage(moduleId, pageName, pageDescription, {layout: placeholderMarkup}).then(() => {
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
        Add a Page
      </DialogTitle>

      <DialogContent dividers>

        <form noValidate autoComplete="off">

          <Box mb={2}>
            <TextField
              disabled={isLoading}
              id="outlined-adornment-amount"
              label="Page Title"
              variant="outlined"
              fullWidth={true}
              value={pageName}
              onChange={onNameChange}
            />
          </Box>

          <TextField
            disabled={isLoading}
            id="pageDescription"
            label="Page Description"
            multiline
            rows={4}
            fullWidth={true}
            value={pageDescription}
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
          Add Page
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default CreateModulePageModal;

