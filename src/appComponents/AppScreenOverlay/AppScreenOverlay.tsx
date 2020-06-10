import React from 'react';
import { Button } from '@material-ui/core';
import { motion } from 'framer-motion';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import './AppScreenOverlay.scss';

export interface IAppScreenOverlayProps {
  children?: React.ReactNode;
  open: boolean;
  title: string;
  scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
  onClose: () => void;
}

const AppScreenOverlay: React.FC<IAppScreenOverlayProps> = function ({open, title, children, scrollRef, onClose}) {

  const sidebarContainer = {
    open: {
      translateY: '0%',
      transition: {
        ease: 'anticipate',
        duration:  0.75
      }
    },
    closed: {
      translateY: '100%',
      transition: {
        ease: 'easeInOut',
        duration: 0.4
      }
    }
  };

  return (
    <div className="screen-overlay">
      <motion.div className="screen-overlay-content"
        initial={"closed"}
        animate={open ? "open" : "closed"}
        variants={sidebarContainer}
        ref={scrollRef}
      >
        <div className="screen-overlay-content-inner">
          <div className="screen-overlay-content-inner-title">
              <h2>
                <Button variant="contained" color="primary" onClick={onClose} className="screen-overlay-content-inner-title-button">
                  <HighlightOffIcon className="button-icon-left" />
                  Close
                </Button>
                {title}
              </h2>
          </div>
          { children }
        </div>
      </motion.div>
    </div>
  );
};

export default AppScreenOverlay;

