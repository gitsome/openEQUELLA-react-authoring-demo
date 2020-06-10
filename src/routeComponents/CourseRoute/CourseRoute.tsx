import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Hidden, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import useAppState from '../../globalState/useAppState';
import useCourseRouteState from '../../globalState/useCourseRouteState';

import Breadcrumb from '../../classes/Breadcrumb';

import AppScreenOverlay from '../../appComponents/AppScreenOverlay/AppScreenOverlay';
import CourseList from '../../components/CourseList/CourseList';
import CourseViewer from '../../components/CourseViewer/CourseViewer';

import './CourseRoute.scss';
import CreateCourseModal from '../../components/CreateCourseModal/CreateCourseModal';

export interface ICourseProps {
  children?: React.ReactNode;
}

const CourseRoute: React.FC<ICourseProps> = () => {

  const [ , appStateStore ] = useAppState();
  const [ { currentCourse, currentModule }, courseRouteState ] = useCourseRouteState();
  const { courseId } = useParams();
  const history = useHistory();

  const [ lastCourseUpdate, setLastCourseUpdate ] = useState(new Date().getTime());
  const [ showCreateCourseModal, setShowCreateCourseModal ] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentCourse && courseId !== currentCourse.uuid) {
      courseRouteState.update({
        currentCourse: null,
        currentModule: null
      });
    }
  }, [currentCourse, courseId, courseRouteState]);

  useEffect(() => {

    const breadcrumbs: Breadcrumb[] = [];

    const coursesBreadcrumb = new Breadcrumb();
    coursesBreadcrumb.title = 'Courses';
    coursesBreadcrumb.to = `/courses`;
    breadcrumbs.push(coursesBreadcrumb);

    if (courseId) {
     const courseBreadcrumb = new Breadcrumb();
     courseBreadcrumb.title = '...';
     courseBreadcrumb.to = `/courses/${courseId}`;
     if (currentCourse && currentCourse.uuid === courseId) {
      courseBreadcrumb.title = currentCourse.name;
     }
     breadcrumbs.push(courseBreadcrumb);
    }

    appStateStore.update({breadcrumbs});

  }, [
    appStateStore,
    courseId,
    currentCourse, currentModule
  ]);

  useEffect(() => {
    return () => {
      courseRouteState.update({
        currentCourse: null,
        currentModule: null
      });
    };
  }, [courseRouteState]);

  useEffect(() => {
    if (overlayRef.current !== null) {
      overlayRef.current.scrollTop = 0;
    }
  }, [courseId, overlayRef]);

  const onCourseClose = () => {
    history.push('/courses');
  };

  const onCourseCreated = () => {
    setLastCourseUpdate(new Date().getTime());
  };

  return (
    <Fragment>

      { showCreateCourseModal && (
        <CreateCourseModal onClose={() => { setShowCreateCourseModal(false); }} onCourseCreated={onCourseCreated} />
      )}

      <Grid container spacing={3} className="course-route">

        <Hidden xsDown>
          <Grid item sm={1} md={1} lg={2} xl={3}></Grid>
        </Hidden>

        <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>

          <div className="section-header">
            <h2 className="section-title">Courses</h2>
            <div className="section-toolbar">
              <Button size="small" variant="contained" color="primary" onClick={() => { setShowCreateCourseModal(true); }}><AddCircleOutlineIcon className="button-icon-left"/> Create Course</Button>
            </div>
          </div>

          <CourseList lastUpdated={lastCourseUpdate} />

          <AppScreenOverlay open={courseId !== undefined} title={currentCourse ? currentCourse.name : 'Loading...'} onClose={onCourseClose} scrollRef={overlayRef}>
            <CourseViewer courseId={courseId} />
          </AppScreenOverlay>

        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CourseRoute;


