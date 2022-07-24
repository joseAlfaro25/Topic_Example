import React from 'react'
import images from '../../image/back.jpg'

const Header = () => {
  return (
    <div style={{width:'100%', backgroundColor:'#000000', height:50, borderRadius:8, marginBottom:10}}>
        <img style={{width:'100%', height:'100%', borderRadius:8}} src={images} alt="Backgruap"/>
    </div>
  )
}

export default Header