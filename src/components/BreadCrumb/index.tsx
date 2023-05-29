import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './breadCrumb.scss';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
interface IProps {
  id?: number
}
export default function BreadCrumbComponent({ id }: IProps) {
  const { watch } = useAppSelector(state => state.productNow);
  const navigate = useNavigate();
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    navigate('/');
    window.scrollTo(0, 0);
  }
  const breadcrumbs = [
    <Link underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Trang chủ
    </Link>,
    <Typography key="2" color="text.primary" sx={{
      fontSize: '14px'
    }}>
      {watch.name}
    </Typography>
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
