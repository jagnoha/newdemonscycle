import React from 'react'
import HeaderMenu from '../HeaderMenu/HeaderMenu'

export default function Header(props) {
  return (
    <div>     
      <HeaderMenu user = {props.user} title = {props.title} />
    </div>  
  );
  
}