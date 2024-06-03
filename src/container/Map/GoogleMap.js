import React from 'react'

const GoogleMap = () => {
    return (
        <div className="google-map-area section text-center section-padding-bottom">
            <div className="container">
                <div className="contact-map-area" data-aos="fade-up">
                    {/* <iframe className="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2136.986005919501!2d-73.9685579655238!3d40.75862446708152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258e4a1c884e5%3A0x24fe1071086b36d5!2sThe%20Atrium!5e0!3m2!1sen!2sbd!4v1585132512970!5m2!1sen!2sbd" aria-hidden="false"></iframe> */}
                    <iframe className="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3225.5927785093063!2d-115.05235578357895!3d36.05464308010904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8d0568bfa2ae7%3A0xdd34def9b0cef353!2s1489%20W%20Warm%20Springs%20Rd%2C%20Henderson%2C%20NV%2089014!5e0!3m2!1sen!2sus!4v1681247227323!5m2!1sen!2sus" aria-hidden="false"></iframe>                    
                </div>
            </div>
        </div>
    )
}

export default GoogleMap;
