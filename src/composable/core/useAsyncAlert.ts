export const confirmAlertState = reactive({
  severity: 'warn',
  strictMsg: undefined as OrUndefine<string | boolean>,
  content: '' as string | string[],
  onClose: undefined as any,
  isOpen: false,
});

export const showAsyncAlert = (props: CoreAsyncAlert): Promise<boolean> => {
  return new Promise((resolve: (value: boolean) => void) => {
    confirmAlertState.severity = props.severity ?? 'warn';
    confirmAlertState.content = props.content ?? '';
    confirmAlertState.strictMsg = props.strictMsg;
    confirmAlertState.isOpen = true;
    confirmAlertState.onClose = resolve ?? '';
  });
};

export const closeAlert = (isConfirm: boolean) => {
  if (confirmAlertState.isOpen) {
    confirmAlertState.severity = 'warn';
    confirmAlertState.content = '';
    confirmAlertState.strictMsg = '';
  }

  confirmAlertState.isOpen = false;
  confirmAlertState.onClose(isConfirm);
};
