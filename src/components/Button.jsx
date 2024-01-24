import React from 'react'

function Button({children,...props}) {
  return (
   <button {...props} className='w-28 h-10 bg-indigo-400 rounded-md text-white text-xl button'>{children}</button>
)
  }


export default Button