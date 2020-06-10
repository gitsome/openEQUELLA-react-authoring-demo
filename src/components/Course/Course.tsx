import React from 'react';
import { useHistory } from 'react-router-dom';
import CourseClass from '../../classes/Course';
import { Card, CardContent } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import './Course.scss';

export interface ICourseProps {
  children?: React.ReactNode;
  course: CourseClass;
}

const Course: React.FC<ICourseProps> = ({course}) => {

  const history = useHistory();

  const goToCourse = () => {
    history.push(`/courses/${course.uuid}`);
  };

  return (
    <Card className="course">
      <ButtonBase className="course-button-base" onClick={goToCourse}>
        <CardContent className="course-card-content">
          <h3 className="course-name">{ course.name }</h3>
          { course.description && (
            <p className="course-description">{course.description}</p>
          )}
          { !course.description && (
            <p className="course-description">-- no description --</p>
          )}
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default Course;
