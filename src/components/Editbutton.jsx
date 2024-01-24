import React from 'react'

function Editbutton({children,...props}) {
  return (
    <button {...props} className='w-10 h-10 bg-slate-300 rounded-md text-white text-xl button'>{children}</button>
  )
}

export default Editbutton