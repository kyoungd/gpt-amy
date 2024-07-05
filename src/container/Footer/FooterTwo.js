import React from 'react';
import FooterData from '../../data/Footer/footerItem.json';
import FooterLinkItem from '../../components/Footer/FooterLinkItem';

//
// <Logo 
//     image={`${process.env.PUBLIC_URL}/images/logo/footer-logo.png`}
// />
//

const FooterTwo = () => {
    return (
        <div className="footer-section section footer-bg-color">
            <div className="container">
                <div className="row mb-lg-14 mb-md-10 mb-6">
                    {/* <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 col-12 mb-6">
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <LogoStyle>OYATE</LogoStyle>
                            </div>
                            <div className="footer-widget-content">
                                <div className="content">
                                    <p><Link to={process.env.PUBLIC_URL + "/"}>(+1) 747-224-7144</Link></p>
                                    <p><Link to={process.env.PUBLIC_URL + "/"}>info@oyate.ai</Link> </p>
                                </div>
                                <div className="footer-social-inline">
                                    <a href="#"><i className="fab fa-twitter-square"></i></a>
                                    <a href="#"><i className="fab fa-facebook-square"></i></a>
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {FooterData && FooterData.map((single, key) => {
                        return(
                            <div key={key} className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 mb-6">
                                <FooterLinkItem data={single} key={key} />
                            </div>
                        ); 
                    })}
                </div>
                <div className="row">
                    <div className="col">
                        <p className="copyright">&copy; {new Date().getFullYear()} <strong>Oyate</strong></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterTwo
