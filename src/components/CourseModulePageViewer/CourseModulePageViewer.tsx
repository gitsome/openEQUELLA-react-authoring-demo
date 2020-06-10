import React, { Fragment, useState, useEffect } from 'react';
import { ButtonBase, Box, Grid, Button } from '@material-ui/core';
import { motion } from 'framer-motion';
import parser from 'fast-xml-parser';

import AttachFileIcon from '@material-ui/icons/AttachFile';

import LinkIcon from '@material-ui/icons/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import useCourseModulePage from '../../hooks/useCourseModulePage';

import Page from '../../classes/Page';

import NoResults from '../NoResults/NoResults';
import ContentLoader from '../ContentLoader/ContentLoader';
import MarkdownViewer from '../MarkdownViewer/MarkdownViewer';

import './CourseModulePageViewer.scss';

const attachmentTypeMap: {[key: string]: any} = {
  'url': LinkIcon,
  'file': InsertDriveFileIcon
};

export interface ICourseModulePageViewerProps {
  children?: React.ReactNode;
  moduleId: string;
  page: Page;
}

const CourseModulePageViewer: React.FC<ICourseModulePageViewerProps> = ({moduleId, page: pageRef}) => {

  const [ pageContents, setPageContents ] = useState<null | string>(null);
  const [ { page, isPageLoading, isPageLoadingError } ] = useCourseModulePage(pageRef.itemUuid);

  useEffect(() => {

    if (!isPageLoading && page !== null && page.metadata !== undefined) {
      const parsedMetaData:{xml: {metadata: {layout: string}}} = parser.parse(page.metadata, {});
      setPageContents(parsedMetaData.xml.metadata.layout);
    }

  }, [isPageLoading, page]);

  const getAttachmentIcon = (type: string) => {

    let Component = attachmentTypeMap[type];

    if (Component === undefined) {
      Component = InsertDriveFileIcon;
    }

    return (
      <Component className="page-attachment-list-item-type-icon" />
    );
  };

  const fadeUpVariants = {
    hidden: {
      y: 15,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="course-module-page-viewer">

      <Grid container spacing={5} className="course-viewer">

        <Grid item xs={12} md={12} lg={8} xl={8}>
          <h1 className="course-module-viewer-title">{pageRef.description}</h1>

          { isPageLoading && (
            <ContentLoader size={40} />
          )}

          { !isPageLoading && page !== null && (
            <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
              <MarkdownViewer contents={pageContents || ''} />
            </motion.div>
          )}
        </Grid>

        <Grid item xs={12} md={12} lg={4} xl={4}>

          <h1 className="course-module-viewer-title"> Attachments</h1>

          { isPageLoading && (
            <ContentLoader size={40} />
          )}

          { !isPageLoading && page !== null && (
            <motion.div initial="hidden" animate="visible" variants={fadeUpVariants}>
              { page.attachments !== undefined && (
                <ul className="page-attachment-list">
                  {
                    page.attachments.map((attachment) => {
                      return (
                        <li className="page-attachment-list-item" key={attachment.uuid}>
                          { getAttachmentIcon(attachment.type) }
                          <div className="page-attachment-list-item-description">{attachment.description}</div>
                          <div className="page-attachment-list-item-filename">{attachment.filename || attachment.url}</div>
                        </li>
                      );
                    })
                  }
                </ul>
              )}
              { page.attachments !== undefined && page.attachments.length === 0 && (
                <NoResults>
                  No Attachements
                </NoResults>
              )}

              <Box mt={2}>
                <Button className="button-full-width" variant="outlined" color="primary">
                  <AttachFileIcon className="button-icon-left"/> Add Attachment
                </Button>
              </Box>

            </motion.div>
          )}
        </Grid>
      </Grid>

    </div>
  );
};

export default CourseModulePageViewer;
