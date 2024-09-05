import React from 'react'
import "./Testinomials.css";

const Testinomials = () => {
  return (
    <>
  <div className="slider-container">
  <div className="slider">
    
    <input type="radio" name="slider" id="slide1" title="slide1" defaultChecked className="slider__nav" />
    <input type="radio" name="slider" id="slide2" title="slide2" className="slider__nav" />
    <input type="radio" name="slider" id="slide3" title="slide3" className="slider__nav" />
    <input type="radio" name="slider" id="slide4" title="slide4" className="slider__nav" />
    
    <div className="slider__inner">
      <div className="slider__contents">
        <i className="slider__image fa fa-codepen"></i>
        <h2 className="slider__caption">codepen</h2>
        <p className="slider__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate omnis possimus illo quos, corporis minima!</p>
      </div>
      <div className="slider__contents">
        <i className="slider__image fa fa-newspaper-o"></i>
        <h2 className="slider__caption">newspaper-o</h2>
        <p className="slider__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate omnis possimus illo quos, corporis minima!</p>
      </div>
      <div className="slider__contents">
        <i className="slider__image fa fa-television"></i>
        <h2 className="slider__caption">television</h2>
        <p className="slider__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate omnis possimus illo quos, corporis minima!</p>
      </div>
      <div className="slider__contents">
        <i className="slider__image fa fa-diamond"></i>
        <h2 className="slider__caption">diamond</h2>
        <p className="slider__txt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate omnis possimus illo quos, corporis minima!</p>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Testinomials