import React from 'react';
import { Box } from '@material-ui/core';
import './NoResults.scss';

export interface ICollectionProps {
  children?: React.ReactNode;
}

const NoResults: React.FC<ICollectionProps> = ({children}) => {

  return (

    <Box className="no-results">
      { children }
    </Box>
  );
};

export default NoResults;
