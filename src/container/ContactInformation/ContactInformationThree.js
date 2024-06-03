import React, { useEffect, useRef } from "react";
import contactDataTwo from '../../data/contactInfo/contactInfoThree.json';
import ContactInfoItem from '../../components/ContactInfo/ContactInfoItemTwo.jsx';
import SectionTitle from '../../components/SectionTitles/SectionTitle';
import SectionTitleTwo from '../../components/SectionTitles/SectionTitleTwo.jsx';
import ContactForm from '../../components/ContactForm/ContactForm';
import Parallax from 'parallax-js';
// import ProjectForm from '../../components/ProjectForm/ProjectForm';

const ContactInformationThree = () => {
    const sceneEl = useRef(null);
    useEffect(() => {
        const parallaxInstance = new Parallax(sceneEl.current, {
        relativeInput: true,
        })
        
        parallaxInstance.enable();

        return () => parallaxInstance.disable();

    }, [])
    return (
        <div className="section section-padding contact-section overlay-two" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg/contact-bg-2.jpg)`}}>

            <div className="container">
                <div className="row row-cols-lg-2 row-cols-1 align-items-center">
                    <div className="col" data-aos="fade-up">
                        <div className="contact-Information me-xl-7">
                            <SectionTitleTwo 
                                classOption="color-light"
                                subTitle="Grow your business"
                                title="Proven and practical AI Solutions"
                            />

                            {contactDataTwo && contactDataTwo.map((single, key) => {
                                return(
                                    <React.Fragment key={key}>
                                        <ContactInfoItem classOption="info-light" data={single} key={key} />
                                    </React.Fragment>
                                ); 
                            })}
                        </div>
                    </div>
                    <div className="col mt-lg-0 mt-md-10 mt-8" data-aos="fade-up" data-aos-delay="300">
                        <div className="contact-form-area">
                            <SectionTitle
                                titleOption="section-title text-center mb-7"
                                headingOption="title fz-28"
                                title="Let’s talk."
                                subTitle="If you have any questions, feel free to ask."
                                />

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>

            <div className="shape shape-1" id="scene" ref={sceneEl}>
                <span data-depth="1">
                    <img src={process.env.PUBLIC_URL + "images/shape-animation/newsletter-shape.png"} alt="" />
                </span>
            </div>

        </div>
    )
}

export default ContactInformationThree;
