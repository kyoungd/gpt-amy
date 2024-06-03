import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import IconBox from '../../components/IconBox/IconBox.jsx';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import Parallax from 'parallax-js';

import boxData0 from '../../data/iconBox/icon-box.json';
import boxData1 from '../../data/popup/get_started_1.json';
import boxData2 from '../../data/popup/get_started_2.json';
import boxData3 from '../../data/popup/get_started_3.json';


const IconBoxData = (id) => {
    switch (id) {
        case 1:
            return boxData1;
        case 2:
            return boxData2;
        case 3:
            return boxData3;
        default:
            return boxData0;
    }
}

const GetStartedIconBoxTwo = ({ id, classOption }) => {
    const sceneEl = useRef(null);
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])
    return (
        <div className={`section section-padding-t90 section-padding-bottom ${classOption}`}>
            <div className="container">

                <SectionTitle
                    headingOption="fz-32"
                    title="Get Started"
                    subTitle="Get started with our services"
                />

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6 icon-box-shape-animation">

                    {IconBoxData(id) && IconBoxData(id).map((single, key) => {
                        return(
                            <div key={key} className="col mb-6" data-aos="fade-up" data-aos-delay="300">
                                <IconBox classOption="box-border" data={single} key={key} />
                            </div>
                        ); 
                    })}

                    <div className="shape shape-1" id="scene" ref={sceneEl}>
                        <span data-depth="1"><img src={process.env.PUBLIC_URL + "/images/shape-animation/video-shape-1.png"} alt="" /></span>
                    </div>

                </div>

            </div>
        </div>
    )
}

GetStartedIconBoxTwo.propTypes = {
    id: PropTypes.number.isRequired,
    classOption: PropTypes.string
};
GetStartedIconBoxTwo.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default GetStartedIconBoxTwo
