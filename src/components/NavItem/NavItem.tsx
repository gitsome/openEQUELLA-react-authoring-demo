import * as React from "react";
import { motion } from "framer-motion";
import { Card, ButtonBase, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

const variants = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export interface INavItemProps {
  navItem: any;
}

const NavItem: React.FC<INavItemProps> = ({ navItem }) => {

  return (
    <motion.li
      variants={variants}
    >
      <Card className="home-option">
        <ButtonBase className="home-option-button-base" component={Link} to={navItem.to}>
          <CardContent className="home-option-card-content">
            <h3 className="home-option-name">
              {navItem.icon()}
              {navItem.name}
            </h3>
            <p>{navItem.description}</p>
          </CardContent>
        </ButtonBase>
      </Card>
    </motion.li>
  );
};

export default NavItem;
