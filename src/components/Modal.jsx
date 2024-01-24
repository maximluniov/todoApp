import React, { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
function Modal({ children, open }) {

    const dialog = useRef();
    useEffect(() => { open ? dialog.current.showModal() : dialog.current.close(); }, [open])

    

    return createPortal(
        <dialog className='bg-inherit p-4' ref={dialog} >{children}</dialog>,
        document.getElementById("modal")
    )
}

export default Modal