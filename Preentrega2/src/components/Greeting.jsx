import React from 'react'
import '../styles/greeting.css'

export const Greeting = ({message}) => {
    
  return (
    <>
    <h1>Bienvenidos a PiterPhone</h1>
    <h2>{message}</h2>
    </>
  )
}

export  default Greeting