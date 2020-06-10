import React, { Fragment, useEffect, useState } from 'react';
import { Grid, Box, Button } from '@material-ui/core';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Module from '../../classes/Module';

import useCourse from '../../hooks/useCourse';
import useCourseRouteState from '../../globalState/useCourseRouteState';

import CreateCourseModuleModal from '../CreateCourseModuleModal/CreateCourseModuleModal';
import CourseModuleList from '../CourseModuleList/CourseModuleList';
import CourseModuleViewer from '../CourseModuleViewer/CourseModuleViewer';

import './CourseViewer.scss';

export interface ICourseViewerProps {
  children?: React.ReactNode;
  courseId: string;
}

const CourseViewer: React.FC<ICourseViewerProps> = ({courseId}) => {

  const [ modulesLastUpdated, setModulesLastUpdated ] = useState(new Date().getTime());
  const [ showCreateCourseModuleModal, setShowCreateCourseModuleModal ] = useState(false);

  const [ { course, isCourseLoading, isCourseLoadingError } ] = useCourse(courseId);
  const [ { currentModule }, courseRouteStateStore ] = useCourseRouteState();

  useEffect(() => {
    if (!isCourseLoading && !isCourseLoadingError) {
      courseRouteStateStore.update({currentCourse: course});
    }
  }, [
    courseRouteStateStore,
    course, isCourseLoading, isCourseLoadingError
  ]);

  const onModuleSelected = (module: Module | null) => {
    courseRouteStateStore.update({currentModule: module});
  };
  const onModuleDeleted = (module: Module) => {
    console.log('onModuleDeleted:', module);
    setModulesLastUpdated(new Date().getTime());
  };
  const onModuleUpdated = (module: Module) => {
    setModulesLastUpdated(new Date().getTime());
  };

  const onModulesUpdated = () => {
    setModulesLastUpdated(new Date().getTime());
  };

  return (
    <Fragment>

      { showCreateCourseModuleModal && (
        <CreateCourseModuleModal onClose={() => { setShowCreateCourseModuleModal(false); }} onCreated={onModulesUpdated} courseId={courseId} />
      )}

      <Grid container spacing={3} className="course-viewer">

        <Grid item xs={12} md={3} lg={2} xl={2}>
          { (courseId !== undefined) && (
            <Fragment>

              <CourseModuleList
                courseId={courseId}
                onModuleSelected={onModuleSelected}
                onModuleDeleted={onModuleDeleted}
                onModuleUpdated={onModuleUpdated}
                selectedModuleId={ currentModule ? currentModule.uuid : null }
                lastUpdated={modulesLastUpdated}
              />

              <Box mt={2}>
                <Button className="button-full-width" variant="outlined" color="primary" onClick={() => { setShowCreateCourseModuleModal(true); }}>
                  <AddCircleOutlineIcon className="button-icon-left"/> Add Module
                </Button>
              </Box>
            </Fragment>
          )}
        </Grid>

        <Grid item xs={12} md={9} lg={10} xl={10}>
          <div className="page-container">
            { !isCourseLoading && course && !currentModule && (
              <div className="empty-message">Select a Module</div>
            )}

            { !isCourseLoading && course && currentModule && (
              <CourseModuleViewer courseId={courseId} module={currentModule} />
            )}
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CourseViewer;
