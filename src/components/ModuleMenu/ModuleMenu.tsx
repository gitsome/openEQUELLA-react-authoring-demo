import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Module from '../../classes/Module';

import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './ModuleMenu.scss';

import DeleteModuleModal from '../DeleteModuleModal/DeleteModuleModal';

export interface IModuleMenuProps {
  children?: React.ReactNode;
  module: Module;
  courseId: string;
  onModuleDeleted: (module: Module) => void;
  onModuleUpdated: (module: Module) => void;
}

const ModuleMenu: React.FC<IModuleMenuProps> = ({module, courseId, onModuleUpdated, onModuleDeleted}) => {

  const [ menuAnchor, setMenuAnchor ] = useState<null | HTMLElement>(null);
  const [ showDeleteModuleModal, setShowDeleteModuleModal ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const closeMenu = (event?: any) => {
    setMenuAnchor(null);
    if (event) {
      event.stopPropagation();
    }
  };

  const toggleMenu = (event: any) => {
    event.stopPropagation();
    if (menuAnchor !== null) {
      return closeMenu(event);
    }
    setMenuAnchor(event.currentTarget);
    return false;
  };

  const onMouseDown = (event: any) => {
    event.stopPropagation();
  };
  const onMouseUp = (event: any) => {
    event.stopPropagation();
  };

  const deleteLoading = (isDeleteLoading: boolean) => {
    setIsLoading(isDeleteLoading);
  };
  const moduleDeleted = () => {
    onModuleDeleted(module);
    closeMenu();
  };

  const deleteModule = (event:any) => {
    closeMenu(event);
    setShowDeleteModuleModal(true);
  };

  return (

    <span className="module-menu">

      { showDeleteModuleModal && (
        <DeleteModuleModal onClose={() => { setShowDeleteModuleModal(false); }} onLoading={deleteLoading} onDeleted={moduleDeleted} module={module} courseId={courseId}/>
      )}

      <IconButton aria-label="delete" disabled={isLoading} onClick={toggleMenu} aria-controls={`module-menu-${module.uuid}`} aria-haspopup="true" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <MenuIcon />
      </IconButton>
      <Menu
        id={`module-menu-${module.uuid}`}
        anchorEl={menuAnchor}
        getContentAnchorEl={null}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        onBackdropClick={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={closeMenu} onMouseDown={onMouseDown}><EditIcon className="button-icon-left"/> Edit</MenuItem>
        <MenuItem onClick={deleteModule} onMouseDown={onMouseDown}><HighlightOffIcon className="button-icon-left" /> Delete</MenuItem>
      </Menu>
    </span>
  );
};

export default ModuleMenu;
