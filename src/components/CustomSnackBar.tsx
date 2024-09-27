import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
export type snackbarType = { success: boolean, message?: string, variant?: AlertColor }
export default function CustomSnackBar({ onSuccess, setOnSuccess }: { onSuccess: snackbarType, setOnSuccess: (success: snackbarType) => void }) {

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOnSuccess({ success: false, message: onSuccess.message, variant: onSuccess.variant });
    };

    return (
        <div >

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={onSuccess.success} autoHideDuration={4000} onClose={handleClose}>

                <Alert
                    onClose={handleClose}
                    severity={onSuccess.variant}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {onSuccess.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
