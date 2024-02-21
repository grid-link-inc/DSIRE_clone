import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const BreadcrumbNav = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathnames = pathname.split('/').filter((x) => x);
  const theme = useTheme();

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, ml: 1 }}>
      <Link color={theme.palette.text.secondary} component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
        <HomeIcon fontSize="inherit" />
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <Link key={name} component={RouterLink} to={routeTo} color={theme.palette.text.secondary}>
            {capitalize(name)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
