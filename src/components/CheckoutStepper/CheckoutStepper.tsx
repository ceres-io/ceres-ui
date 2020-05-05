import React, { FunctionComponent, useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useRoute } from 'react-router5';
import { RouteNames } from '../../routes/routes';


interface CheckoutStep {
  completed: boolean
  label: string
  route: string
}

const allSteps: CheckoutStep[] = [
  {
    completed: false,
    label: 'Payment Information',
    route: RouteNames.Checkout
  },
  {
    completed: false,
    label: 'Delivery Details',
    route: RouteNames.Delivery
  },
  {
    completed: false,
    label: 'Track Your Order',
    route: RouteNames.Track
  }
]

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
  },
  stepper: {
    width: '80%',
    margin: '0 auto'
  }
}))

export const CheckoutStepper: FunctionComponent = () => {
  const classes = useStyles();
  const route = useRoute();

  const [steps, setSteps] = useState<CheckoutStep[]>(allSteps);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Update whenever route changes
  useEffect(() => {
    calculateSteps();
  }, [route.route])

  const calculateSteps = () => {
    if (!route.route) {
      return
    }

    let activeStep = allSteps.map(s => s.route).indexOf(route.route.name)
    setActiveStepIndex(activeStep);

    let completedSteps = allSteps.slice(0, activeStep).map(s => ({ ...s, completed: true }))
    let todoSteps = allSteps.slice(activeStep, allSteps.length)

    setSteps([...completedSteps, ...todoSteps]);
  }

  return (
    <div className={classes.root}>
      <Stepper className={classes.stepper} activeStep={activeStepIndex}>
        {steps.map(s =>
          <Step key={s.label} completed={s.completed}>
            <StepLabel>{s.label}</StepLabel>
          </Step>
        )}
      </Stepper>
    </div>
  )
}