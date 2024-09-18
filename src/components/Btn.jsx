import React, { forwardRef } from 'react'
import '../css/Game.css'

const Btn = forwardRef(({id, onClick},ref) => (
    <button id={id} className='button' onClick={onClick} ref={ref}/>
))

export default Btn