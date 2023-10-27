interface Alert {
  severityLevel?: 'danger' | 'warn' | 'info'
  strictMsg?: string | boolean
  title?: string
  content: string | string[]
}

export const confirmAlertState = reactive({
  severityLevel: undefined as string | undefined,
  strictMsg: undefined as undefined | string | boolean,
  title: '',
  content: [''] as string | string[],
  onClose: undefined as any,
  isOpen: false,
});

export const showAsyncAlert = (props: Alert): Promise<boolean> => {
  return new Promise((resolve: (value: boolean) => void) => {
    confirmAlertState.severityLevel = props.severityLevel ?? 'warn';
    confirmAlertState.content = props.content ?? '';
    confirmAlertState.title = props.title ?? '';
    confirmAlertState.strictMsg = props.strictMsg;
    confirmAlertState.isOpen = true;
    confirmAlertState.onClose = resolve ?? '';
  });
};

export const closeAlert = (isConfirm: boolean) => {
  if (confirmAlertState.isOpen) {
    confirmAlertState.severityLevel = undefined;
    confirmAlertState.content = '';
    confirmAlertState.title = '';
    confirmAlertState.strictMsg = '';
  }

  confirmAlertState.isOpen = false;
  confirmAlertState.onClose(isConfirm);
};
