import React from 'react';
import Container from '../../../../components/Container';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../../../../hooks/hooks';
interface IProps {
  id: number | undefined
}
function DescribeDetail({ id }: IProps) {
  const { watch } = useAppSelector(state => state.productNow);
  return (
    <Container >
      <div className="describe__wrapper">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Mô tả chi tiết</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component={'span'} variant={'body2'}>
              <div className="infor-details">
                {watch.description}
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}

export default DescribeDetail;
