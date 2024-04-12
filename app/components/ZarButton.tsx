import React from 'react'
interface Props{
    toggle:()=>void;
}
const ZarButton = ({toggle}:Props) => {
  return (
    <button type="button" className="btn btn-secondary" onClick={toggle}>USD/ZAR</button>

  )
}

export default ZarButton