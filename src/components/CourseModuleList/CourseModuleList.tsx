import React, {Fragment} from 'react';
import { ButtonBase, Box } from '@material-ui/core';
import { motion } from 'framer-motion';

import Module from '../../classes/Module';
import useCourseModules from '../../hooks/useCourseModules';

import NoResults from '../NoResults/NoResults';
import ContentLoader from '../ContentLoader/ContentLoader';
import ModuleMenu from '../ModuleMenu/ModuleMenu';

import './CourseModuleList.scss';

export interface ICourseModuleListProps {
  children?: React.ReactNode;
  courseId: string;
  selectedModuleId: string | null;
  onModuleSelected: (module: Module | null) => void;
  onModuleDeleted: (module: Module) => void;
  onModuleUpdated: (module: Module) => void;
  lastUpdated?: number;
}

const CourseModuleList: React.FC<ICourseModuleListProps> = ({
  courseId,
  onModuleSelected,
  onModuleDeleted,
  onModuleUpdated,
  selectedModuleId,
  lastUpdated = 0
}) => {

  const [{ modules, isModulesLoading, isModulesLoadingError }] = useCourseModules(courseId, lastUpdated);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const selectModule = (module: Module) => {
    onModuleSelected(module);
  };

  const moduleDeleted = (module: Module) => {
    if (selectedModuleId === module.uuid) {
      onModuleSelected(null);
    }
    onModuleDeleted(module);
  };

  const moduleUpdated = (module: Module) => {
    onModuleUpdated(module);
  };

  return (
    <Fragment>
      { isModulesLoading && (
        <ContentLoader size={30} />
      )}
      { !isModulesLoading && !isModulesLoadingError && modules && (
        <motion.ul className="course-module-list" variants={containerVariants} initial="hidden" animate="visible">
          { modules.map((module) => {

            const isModuleSelected = selectedModuleId === module.uuid;

            return (
              <motion.li key={module.uuid} className={`course-module-list-item ${ isModuleSelected ? 'course-module-list-item-selected' : '' }`} variants={itemVariants}>
                <Box boxShadow={1}>
                  <ButtonBase className="course-module-list-item-button" onClick={() => { selectModule(module) }}>
                    <span className="course-module-list-item-indicator"></span>

                    <span className="course-module-list-item-menu">
                      <ModuleMenu module={module} courseId={courseId} onModuleDeleted={moduleDeleted} onModuleUpdated={moduleUpdated} />
                    </span>

                    <div className="course-module-list-item-module">
                      {module.description}
                    </div>
                  </ButtonBase>
                </Box>
              </motion.li>
            )
          })}
        </motion.ul>
      )}
      { !isModulesLoading && !isModulesLoadingError && (!modules || modules.length === 0) && (
        <NoResults>This course has no modules</NoResults>
      )}
    </Fragment>
  );
};

export default CourseModuleList;
