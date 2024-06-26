import React from 'react';
import PropTypes from "prop-types";
import IntroData from '../../data/intro/intro.json';
import Intro from '../../components/Intro/Intro.jsx';
import SwiperSlider, {SwiperSlide} from "../../components/swiper"

const IntroSlider = ({ refSectionLearnMore }) => {
    const swiperOption = {
        loop: true,
        speed: 750,
        spaceBetween: 0,
        slidesPerView: 1,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        navigation: true,
    }
    return (
        <div className="intro-slider-wrap section">
            <SwiperSlider effect="fade" className="intro-slider" options={swiperOption}>
                {IntroData &&
                    IntroData.map((single, key) => {
                        return(
                            <SwiperSlide key={key}>
                                <Intro data={single} refSectionLearnMore={refSectionLearnMore} />
                            </SwiperSlide>
                        ); 
                    })}
                {/* <div className="home-slider-next main-slider-nav swiper-button-next">
                    <i className="fal fa-angle-right"></i>
                </div>
                <div className="home-slider-prev main-slider-nav swiper-button-prev">
                    <i className="fal fa-angle-left"></i>
                </div> */}
            </SwiperSlider>
        </div>
    )
}

IntroSlider.propTypes = {
    refSectionLearnMore: PropTypes.object
};

export default IntroSlider
