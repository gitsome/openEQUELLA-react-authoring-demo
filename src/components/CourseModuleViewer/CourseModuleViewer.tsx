import React, { Fragment, useState, useEffect } from 'react';
import { ButtonBase, Box, Grid, Button } from '@material-ui/core';
import { motion } from 'framer-motion';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import useCourseModulePages from '../../hooks/useCourseModulePages';

import Module from '../../classes/Module';
import Page from '../../classes/Page';

import NoResults from '../NoResults/NoResults';
import ContentLoader from '../ContentLoader/ContentLoader';
import CourseModulePageViewer from '../CourseModulePageViewer/CourseModulePageViewer';
import CreateModulePageModal from '../CreateModulePageModal/CreateModulePageModal';

import './CourseModuleViewer.scss';

export interface ICourseModuleViewerProps {
  children?: React.ReactNode;
  courseId: string;
  module: Module;
}

const CourseModuleViewer: React.FC<ICourseModuleViewerProps> = ({courseId, module}) => {

  const [ showCreateModulePageModal, setShowCreateModulePageModal ] = useState(false);
  const [ pagesLastUpdated, setPagesLastUpdated ] = useState(new Date().getTime());

  const [ currentPage, setCurrentPage ] = useState<Page | null>(null);
  const [ { pages, isPagesLoading } ] = useCourseModulePages(module.itemUuid, pagesLastUpdated);

  useEffect(() => {
    setCurrentPage(null);
  }, [courseId, module])

  const pageContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const pageVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        ease: 'easeOut',
        duration: 0.2
      }
    }
  };

  const selectPage = (page: Page) => {
    setCurrentPage(page);
  };

  const onPagesUpdated = () => {
    setPagesLastUpdated(new Date().getTime());
  };

  return (
    <div className="course-module-viewer">

      { showCreateModulePageModal && (
        <CreateModulePageModal onClose={() => { setShowCreateModulePageModal(false); }} onCreated={onPagesUpdated} moduleId={module.itemUuid} />
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={3} xl={3}>
          <h2 className="course-module-viewer-title">Pages</h2>

          { isPagesLoading && (
            <ContentLoader size={30} />
          )}

          { !isPagesLoading && pages !== null && (
            <Fragment>
              <motion.ul className="course-module-page-list" variants={pageContainerVariants} initial="hidden" animate="visible">
                { pages.map((page) => {

                  const isPageSelected = currentPage?.itemUuid === page.itemUuid;

                  return (
                    <motion.li key={page.itemUuid} className={`course-module-page-list-item ${ isPageSelected ? 'course-module-page-list-item-selected' : '' }`} variants={pageVariants}>
                      <Box>
                        <ButtonBase className="course-module-page-list-item-button" onClick={() => { selectPage(page) }}>
                          <div className="course-module-page-list-item-description">
                            {page.description}
                          </div>
                        </ButtonBase>
                      </Box>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </Fragment>
          )}

          { !isPagesLoading && (pages === null || pages.length === 0) && (
            <NoResults>No Pages</NoResults>
          )}

          <Box mt={2}>
            <Button className="button-full-width" variant="outlined" color="primary" disabled={isPagesLoading} onClick={() => { setShowCreateModulePageModal(true); }}>
              <AddCircleOutlineIcon className="button-icon-left"/> Add Page
            </Button>
          </Box>

        </Grid>

        <Grid item xs={12} md={12} lg={9} xl={9}>
          { !isPagesLoading && currentPage === null && (
            <div className="empty-message">Select a Page</div>
          )}
          { currentPage !== null && (
            <CourseModulePageViewer page={currentPage} moduleId={module.itemUuid} />
          )}
        </Grid>
      </Grid>

    </div>
  );
};

export default CourseModuleViewer;
