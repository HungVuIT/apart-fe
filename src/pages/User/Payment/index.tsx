import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from './payment.module.scss';
import InforBox from './components/InforBox';
import ShipBox from './components/ShipBox';
import PaymentBox from './components/PaymentBox';
import { initPaymentDetail } from '../../../interface/payment/interface';
const steps = ['Thông tin', 'Vận chuyển', 'Thanh toán'];

export default function Payment () {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [paymentDetails, setPaymentDetails] = React.useState(initPaymentDetail);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(skipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  console.log(paymentDetails);
  return (
    <div className={classes.wrapper} >
      <Box sx={{ width: '100%' }} className={classes['box-input']}>
        <div className={classes.logo}>D&H</div>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode
            } = {};
            console.log(stepProps);
            console.log(label);
            return (
              <Step key={label} {...stepProps} >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length
          ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
            )
          : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }} component={'span'} variant={'body2'}>
                  {
                    activeStep === 0
                      ? <InforBox handleNext={handleNext} setPaymentDetails={setPaymentDetails} paymentDetails={paymentDetails}/>
                      : activeStep === 1
                        ? <ShipBox />
                        : <PaymentBox />
                  }
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    {activeStep === 0 ? 'Quay lại giỏ hàng' : 'Quay lại'}
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Thanh toán' : 'Tiếp tục'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
      </Box>
      <div className={classes['box-price']}>a</div>
    </div>
  );
}
