import { Alert } from '@patternfly/react-core';

export interface ErrorAlertProps {
  error: Error;
}

export function ErrorAlert(props: ErrorAlertProps) {
  return <Alert title="Error">{props.error}</Alert>;
}
