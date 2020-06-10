import { useState, useEffect } from 'react';
import Module from '../classes/Module';
import CoursesApi from '../api/CoursesApi';

const useCourseModules = (courseId: string, lastUpdated: number = 0) => {

  const [ modules, setModules ] = useState<Module[] | null>(null);
  const [ isModulesLoading, setIsModulesLoading ] = useState(true);
  const [ isModulesLoadingError, setIsModulesLoadingError ] = useState<null | Error>(null);

  useEffect(() => {

    if (courseId !== null && courseId !== undefined) {

      setIsModulesLoading(true);
      setModules([]);
      setIsModulesLoadingError(null);

      CoursesApi.getCourseModules(courseId).then((courseModuleData) => {
        setModules(courseModuleData);
      }).catch((err: Error) => {
        setIsModulesLoadingError(err);
      }).then(() => {
        setIsModulesLoading(false);
      });
    }

  }, [courseId, lastUpdated]);


  return [ {modules, isModulesLoading, isModulesLoadingError} ];
};

export default useCourseModules;