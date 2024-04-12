// 'use client';
import React from 'react'

interface Props{
    toggle:()=>void;
}

const EurButton = ({toggle}: Props) => {
  return (
    <button type="button" className="btn btn-primary" onClick={toggle}>USD/EUR</button>
  )
}

export default EurButton