import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from 'react-query';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import Parallax from 'parallax-js';
import { getTechniques } from "../api/techniques";
import { useUserState } from '../UserContext';
import ExpertCard from './ExpertCard';

const ExpertList = ({ classOption }) => {
    const sceneEl = useRef(null);
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])
    const { jwt } = useUserState();
    const { data, isSuccess, isError, error, isLoading } = useQuery('technqiues', () =>
        getTechniques(jwt)
    );

    return (
        <div className={`section section-padding-t90 section-padding-bottom ${classOption}`}>
            <div className="container">

                <SectionTitle
                    headingOption="fz-32"
                    title="Find high quality trades with less effort."
                    subTitle="Here are expert traders who are ready to help you reach a higher level.
                    Choose a style that fits you best."
                />

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6 icon-box-shape-animation">
                    {isLoading && <CircularProgress />}
                    {isError && <div>Error: {error.message}</div>}
                    {isSuccess && data.map((product) => {
                        return(
                            <div key={product.id} className="col mb-6" data-aos="fade-up" data-aos-delay="300">
                                <ExpertCard product={product} />
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

ExpertList.propTypes = {
    classOption: PropTypes.string
};
ExpertList.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default ExpertList
