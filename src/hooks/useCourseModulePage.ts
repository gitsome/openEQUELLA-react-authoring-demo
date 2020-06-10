import { useState, useEffect } from 'react';
import Page from '../classes/Page';
import CoursesApi from '../api/CoursesApi';

const useCourseModulesPage = (pageId: string) => {

  const [ page, setPage ] = useState<Page | null>(null);
  const [ isPageLoading, setIsModulesLoading ] = useState(true);
  const [ isPageLoadingError, setIsModulesLoadingError ] = useState<null | Error>(null);

  useEffect(() => {

    if (pageId !== null && pageId !== undefined) {

      setIsModulesLoading(true);

      CoursesApi.getCourseModulePage(pageId).then((courseModulePageData) => {
        setPage(courseModulePageData);
      }).catch((err: Error) => {
        setIsModulesLoadingError(err);
      }).then(() => {
        setIsModulesLoading(false);
      });
    }

  }, [pageId]);


  return [ {page, isPageLoading, isPageLoadingError} ];
};

export default useCourseModulesPage;