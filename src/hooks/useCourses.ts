import { useState, useEffect } from 'react';
import Course from '../classes/Course';
import CoursesApi from '../api/CoursesApi';

const useCourses = (lastUpdated: number) => {

  const [ courses, setCourses ] = useState<Course[] | null>(null);
  const [ isCoursesLoading, setIsCoursesLoading ] = useState(true);
  const [ isCoursesLoadingError, setIsCoursesLoadingError ] = useState<null | Error>(null);

  useEffect(() => {

    setIsCoursesLoading(true);
    setIsCoursesLoadingError(null);

    CoursesApi.getCourses().then((coursesData) => {
      setCourses(coursesData);
    }).catch((err: Error) => {
      setIsCoursesLoadingError(err);
    }).then(() => {
      setIsCoursesLoading(false);
    });

  }, [lastUpdated]);

  return [ { courses, isCoursesLoading, isCoursesLoadingError } ];
};

export default useCourses;