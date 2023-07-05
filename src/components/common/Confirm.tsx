import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { employeesService } from "../../config/service-config";
type Props = {
   dialogTitle: string,
   dialogContent: string,
   handleClose: (agree:boolean) => void,
   open:boolean
}
const Confirm: React.FC<Props> = ({dialogTitle: dialogTitle, dialogContent, handleClose, open}) => {
        
    return <Box>
        <Dialog
        open={open}
        onClose={()=> handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent
            
            }
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)}>Disagree</Button>
          <Button onClick={()=>handleClose(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
}
export default Confirm;