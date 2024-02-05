import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from '../MainCard';

// ==============================|| BREADCRUMBS ||============================== //

// Limitations
// - the 'navigation' data structure is used to define both the sidebar items AND breadcrumbs here.
// but they're used differently in nav and breadcrumbs which forced the original implementer to use flags like the 'breadcrumb' flag,
// and now me to make a 'showOnNavBar' flag. Need a better way to define routes/nav/breadcrumbs
// - the 'navigation' data structure shadows Routes. So you have to update both when you add a new page
// - this breadcrumb component is only made to do one layer deep of navigation. Not enough

const Breadcrumbs = ({ navigation, title, ...others }) => {
  const location = useLocation();
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  // set active item state
  const findNavItemThatMatchesCurrentLocationURL = (menu) => {
    if (menu.children) {
      menu.children.filter((menuChild) => {
        if (menuChild.type && menuChild.type === 'collapse') {
          findNavItemThatMatchesCurrentLocationURL(menuChild);
        } else if (menuChild.type && menuChild.type === 'item') {
          if (location.pathname === menuChild.url) {
            setMain(menu);
            setItem(menuChild);
          }
        }
        return false;
      });
    }
  };

  useEffect(() => {
    navigation?.items?.map((menu) => {
      if (menu.type && menu.type === 'group') {
        findNavItemThatMatchesCurrentLocationURL(menu);
      }
      return false;
    });
  });

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';

  // collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
        {main.title}
      </Typography>
    );
  }

  // items
  if (item && item.type === 'item') {
    itemTitle = item.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );

    // main
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                  Home
                </Typography>
                {mainContent}
                {itemContent}
              </MuiBreadcrumbs>
            </Grid>
            {/* {title && (
              <Grid item sx={{ mt: 2 }}>
                <Typography variant="h5">{item.title}</Typography>
              </Grid>
            )} */}
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
};

Breadcrumbs.propTypes = {
  navigation: PropTypes.object,
  title: PropTypes.bool
};

export default Breadcrumbs;
