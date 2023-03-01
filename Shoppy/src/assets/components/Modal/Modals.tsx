import React from 'react'
import {Button, Dialog,DialogContent,Typography,DialogTitle } from '@mui/material/';
import ModalCSS from './ModalCSS.module.css';


export default function Modals({open,setOpen,title, children}:any) {
  return (
    <Dialog 
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={ModalCSS.modal}
      >

        <DialogTitle>{title}</DialogTitle>

        <DialogContent className={ModalCSS.box}>
            {children}
        </DialogContent>
        
      </Dialog>
  )
}
