import { useState, useEffect } from 'react';
import Course from '../classes/Course';
import CoursesApi from '../api/CoursesApi';

const useCourse = (courseId: string) => {

  const [ course, setCourse ] = useState<Course | null>(null);
  const [ isCourseLoading, setIsCourseLoading ] = useState(true);
  const [ isCourseLoadingError, setIsCourseLoadingError ] = useState<null | Error>(null);

  useEffect(() => {

    if (courseId !== null && courseId !== undefined) {

      setIsCourseLoading(true);

      CoursesApi.getCourse(courseId).then((coursesData) => {
        setCourse(coursesData);
      }).catch((err: Error) => {
        setIsCourseLoadingError(err);
      }).then(() => {
        setIsCourseLoading(false);
      });
    }

  }, [courseId]);


  return [ {course, isCourseLoading, isCourseLoadingError} ];
};

export default useCourse;