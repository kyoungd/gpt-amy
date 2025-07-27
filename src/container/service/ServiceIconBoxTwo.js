import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import IconBoxData from '../../data/iconBox/icon-box-two.json';
import IconBox from '../../components/IconBox/IconBox.jsx';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import Parallax from 'parallax-js';
import { useUserState } from '../../components/UserContext.jsx';

const ServiceIconBoxTwo = ({ classOption }) => {
    const { isAuthenticated } = useUserState();
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
                    title="Available Services"
                    subTitle="We produce beautifully crafted AI that helps your startups launch"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 -mb-6 space-y-6 icon-box-shape-animation">

                    {IconBoxData && IconBoxData.map((single, key) => {
                        return(
                            <div key={key} className="mb-6" data-aos="fade-up" data-aos-delay="300">
                                <IconBox classOption="box-border" data={single} isAuth={isAuthenticated} />
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

ServiceIconBoxTwo.propTypes = {
    classOption: PropTypes.string
};
ServiceIconBoxTwo.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default ServiceIconBoxTwo
