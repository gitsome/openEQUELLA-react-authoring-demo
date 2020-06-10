import { useState, useEffect } from 'react';
import StateStore from '../classes/StateStore';
import Breadcrumb from '../classes/Breadcrumb';

export interface IAppState {
  IS_DEV: boolean;
  coursesCollectionId: string;
  moduleCollectionId: string;
  pageCollectionId: string;
  breadcrumbs: Breadcrumb[];
};

const appStateStore = new StateStore<IAppState>({
  IS_DEV: process.env.NODE_ENV !== 'production',
  coursesCollectionId: process.env.REACT_APP_OEQ_COURSES_COLLECTION_ID || '',
  moduleCollectionId: process.env.REACT_APP_OEQ_MODULES_COLLECTION_ID || '',
  pageCollectionId: process.env.REACT_APP_OEQ_PAGES_COLLECTION_ID || '',
  breadcrumbs: []
});

const useAppState = (): [IAppState, StateStore<IAppState>] => {

  const [globalState, setGlobalState] = useState(appStateStore.get());

  const onStateStoreUpdated = () => {
    setGlobalState(appStateStore.get());
  };

  useEffect(() => {
    appStateStore.on('update', onStateStoreUpdated);
    return () => {
      appStateStore.off('update', onStateStoreUpdated);
    };
  }, []);

  return [ globalState, appStateStore ];
};

export default useAppState;
export { appStateStore };
