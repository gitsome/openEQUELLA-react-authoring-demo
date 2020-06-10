import { useState, useEffect } from 'react';
import Page from '../classes/Page';
import CoursesApi from '../api/CoursesApi';

const useCourseModulesPages = (moduleId: string, lastUpdated: number) => {

  const [ pages, setPages ] = useState<Page[] | null>(null);
  const [ isPagesLoading, setIsModulesLoading ] = useState(true);
  const [ isPagesLoadingError, setIsModulesLoadingError ] = useState<null | Error>(null);

  useEffect(() => {

    if (moduleId !== null && moduleId !== undefined) {

      setIsModulesLoading(true);
      setPages([]);
      setIsModulesLoadingError(null);

      CoursesApi.getCourseModulePages(moduleId).then((courseModulePageData) => {
        setPages(courseModulePageData);
      }).catch((err: Error) => {
        setIsModulesLoadingError(err);
      }).then(() => {
        setIsModulesLoading(false);
      });
    }

  }, [moduleId, lastUpdated]);


  return [ {pages, isPagesLoading, isPagesLoadingError} ];
};

export default useCourseModulesPages;