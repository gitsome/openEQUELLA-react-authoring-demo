import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

import './ContentLoader.scss';

export interface IContentLoaderProps {
  children?: React.ReactNode;
  size?: number;
}

const ContentLoader: React.FC<IContentLoaderProps> = ({size = 60}) => {

  const marginLevel = Math.min(5, Math.ceil(size / 12));

  return (
    <Box textAlign="center" className="content-loader" mt={marginLevel} mb={marginLevel}>
      <CircularProgress size={size} color="inherit"/>
    </Box>
  );
};

export default ContentLoader;
