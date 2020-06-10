import StateStore from '../classes/StateStore';
import { useState, useEffect } from 'react';

import Course from '../classes/Course';
import Module from '../classes/Module';

export interface ICourseRouteStateStore {
  currentCourse: Course | null;
  currentModule: Module | null;
}

const courseRouteStateStore = new StateStore<ICourseRouteStateStore>({
  currentCourse: null,
  currentModule: null,
});

const useCourseRouteState = (): [ICourseRouteStateStore, StateStore<ICourseRouteStateStore>] => {

  const [ currentState, setCurrentState ] = useState(courseRouteStateStore.get());

  const onStateStoreUpdated = () => {
    setCurrentState(courseRouteStateStore.get());
  };

  useEffect(() => {
    courseRouteStateStore.on('update', onStateStoreUpdated);
    return () => {
      courseRouteStateStore.off('update', onStateStoreUpdated);
    };
  }, []);

  return [ currentState, courseRouteStateStore ];
};

export default useCourseRouteState;
export { courseRouteStateStore };
