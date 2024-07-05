import React from 'react'
import Img1 from './Assets/Scroll1.png'
import Img2 from './Assets/Scroll2.png'
import Img3 from './Assets/Scroll3.png'

const Carosels = ({Value}) => {
  return (
   <>
 
<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
 {!Value&&<>
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
 </>}
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src={Img2} class="d-block w-100" alt="..." style={{height:'100%', objectFit: 'cover'}}/>
      
    </div>
    <div class="carousel-item">
    <img src={Img1} class="d-block w-100" alt="..." style={{height:'100%', objectFit: 'cover'}}/>
     
    </div>
    <div class="carousel-item">
    <img src={Img3} class="d-block w-100" alt="..." style={{height:'100%', objectFit: 'cover'}}/>
      
    </div>
  </div>
</div>


   </>
  )
}

export default Carosels