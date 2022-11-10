import React from 'react';
import Container from '../../../components/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableDescribe from './TableDescribe';

function Describe() {
  return (
    <Container >
      <div className="describe__wrapper">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Thông tin chi tiết</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="table-info">
                <TableDescribe  />
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}

export default Describe;
