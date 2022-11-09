import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './breadCrumb.scss';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BreadCrumbComponent() {
  const breadcrumbs = [
    <Link underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Trang chủ
    </Link>,
    // <Link
    //   underline="hover"
    //   key="2"
    //   color="inherit"
    //   href="/material-ui/getting-started/installation/"
    //   onClick={handleClick}
    // >
    //   Core
    // </Link>,
    <Typography key="2" color="text.primary" sx={{
      fontSize: '14px'
    }}>
      Sản phẩm
    </Typography>,
  ];

  return (
    <div className='breadCrumb__wrapper'>
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{
            color: 'blue'
          }}
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </div>
  );
}
