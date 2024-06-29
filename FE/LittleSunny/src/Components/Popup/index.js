import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

function Popup(props) {
    const { title, children, openPopup1, setOpenPopup1, openPopup2, setOpenPopup2 } = props;

    return (
        <>
            <Dialog open={openPopup1} maxWidth="lg">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent dividers>{children}</DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={() => setOpenPopup1(false)}>
                        Hủy
                    </Button>
                    <Button color="success" variant="outlined">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPopup2} maxWidth="lg">
                <DialogTitle>{title}</DialogTitle>
                <DialogContent dividers>{children}</DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={() => setOpenPopup2(false)}>
                        Hủy
                    </Button>
                    <Button color="success" variant="outlined">
                        Lưu
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Popup;
