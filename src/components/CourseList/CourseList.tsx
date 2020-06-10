import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import './CourseList.scss';

import useCourses from '../../hooks/useCourses';
import Course from '../Course/Course';

import ContentLoader from '../ContentLoader/ContentLoader';
import NoResults from '../NoResults/NoResults';

export interface ICoursesListProps {
  children?: React.ReactNode;
  lastUpdated?: number;
}

const CourseList: React.FC<ICoursesListProps> = ({ lastUpdated = 0 }) => {

  const [ { courses, isCoursesLoading, isCoursesLoadingError } ] = useCourses(lastUpdated);

  return (

    <div className="courses-list">

      { isCoursesLoading && (
        <ContentLoader />
      )}

      { !isCoursesLoading && !isCoursesLoadingError && (
        <Grid container spacing={3} direction="row" alignItems="stretch">
          { courses !== null && courses.map((course, index) => {
            return (
              <Grid item xs={12} sm={12} md={6} key={course.uuid}>
                <Course course={course}></Course>
              </Grid>
            );
          })}

          { ((courses === null) || (courses.length === 0)) && (
            <NoResults>
              No courses were found
            </NoResults>
          )}
        </Grid>
      )}
      { !isCoursesLoading && isCoursesLoadingError && (
        <Fragment>
          <NoResults>
            { JSON.stringify(isCoursesLoadingError) }
          </NoResults>
        </Fragment>
      )}
    </div>
  );
};

export default CourseList;

