import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import Parallax from 'parallax-js';

const PrivacyBox = ({ classOption }) => {
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

                <div className="privacy-policy">
                    <div className="content">
                        <pre className="preformatted-text">
                            {`
PRIVACY POLICY

saracoti ™ has established this Privacy Policy to explain how it protects and manages the information that it collects from you (the customer) online.

1. Consent for Collection, Use and Disclosure

a. Your use of “saracoti™ site and/or your registration for “The saracoti™ products and services constitute your consent to the terms of this Privacy Policy. If you do not agree to the terms of this Privacy Policy, please do not use “the saracoti™ site.
b. The saracoti™ may occasionally update this Privacy Policy. When it does, saracoti™ will also revise the “last update” date at the top of this Privacy Policy. In addition, saracoti™ will seek a customers prior consent, by email, for any new uses or proposed disclosure of information collected from the customer prior to the change. saracoti™ will notify customers by email of changes to this policy that will affect information collected from the customer prior to the change. saracoti™ will notify customers by email of changes to this policy that will affect information collected from them in the future. In certain circumstances, however saracoti™ will not inform and obtain the consent of the customer, such as in connection with an investigation of a breach of an agreement, contravention of laws, an emergency where the life, health or security of an individual is threatened, the collection of a debt or in accordance with the request of a law enforcement agency or a court order.
c. A customer may withdraw his or her consent for collection, use and disclosure at any time by sending an email to unsubscribe@saracoti.com. Please note that, if you do, saracoti™ may suspend its provision of products and services to you. When you unsubscribe, if you fall within the guarantee period for any saracoti™ product and you request a refund, the guarantee will be honored.

2. Accountability:

saracoti™ collects, at the time of your registration and your sign-on to its website, certain “personal information” (information that personally identifies you) including, but not limited to your name, email address, home or work address, telephone number and information about your computer hardware and software (eg..IP address, operating system, browser type, domain name, URL, access times and referring web site addresses.) saracoti™ has implemented this Privacy Policy to protect personal information received from its customers and to respond to any inquiries. The Privacy Policy also provides that saracoti™ will use appropriate contractual means to establish a comparable level of protection for personal information which is sent for processing by third parties of saracoti™’ behalf. saracoti™ has designated responsibility for your personal information to its Privacy Officer, who ensures compliance with the principles in this Privacy Policy. Other “saracoti™” individuals may be delegated to act on behalf of the Privacy Officer.

3. Purposes for Collecting Personal Information:

a. saracoti™ collects and uses personal information for the following identified purposes:
i. To understand customer needs regarding saracoti™ services;
ii. To develop and provide our web site and our products and services for our customers;
iii. To fulfill your requests for products, services or information;
iv. To communicate with customers and site visitors, when necessary, and to inform customers of upgrades, as well as of other products and services available from saracoti™ to its affiliates and third parties;
v. To allow customers to access limited-entry areas of saracoti™ site;
vi. To personalize some of our services and products for you and to deliver targeted advertisements and offers from saracoti™ and third parties;
vii. To bill accounts and maintain payment records;
viii. To comply with any applicable law, regulation, legal process or government request;
ix. To respond to a legitimate claim, or to address our reasonable belief, that you are violating the rights of any third party or any of the agreements or policies that govern your use of saracoti™ site or any The saracoti™ product or service.
x. To protect the services, products or rights of saracoti™, including, but not limited to the security or integrity of saracoti™ site; and
xi. To identify and resolve technical problems concerning saracoti™ site, products and services;
xii. saracoti™ also uses personal information in an aggregate form (i.e., not individually attributable to you) for its business analysis, operational, marketing and other promotional purposes.
xiii. If we hire other companies to provide some products or services on our behalf, then we will provide those companies the personal information they need for the identified Purposes, and we will limit their rights to use and further disclose your personal information as appropriate in the course of their work for us.

4. Limiting the collection of Personal Information:

saracoti™ limits its collection of personal information to only that information which is necessary for the identified purposes. saracoti™ does not direct its site to, nor does it knowingly collect any personal information from children under the age of thirteen. When you visit the saracoti™ web site, a cookie may be placed on your computer or the cookie may be read if you have visited saracoti™ site previously. saracoti™ uses cookies to allow saracoti™ to determine which products and services you have already purchased so that saracoti™ does not provide redundant information to you, and, if you are a saracoti™ affiliate, to track saracoti™ sales made to customers referred by you so that you can receive compensation under our affiliate program. If you choose to not have your browser accept cookies from the saracoti™ web site, you may not be able to view the text on the screens, or to experience a personalized visit, or to subscribe certain service and product offerings on the saracoti™ site.

5. saracoti™ does not sell, rent or disclose your personal information to anyone else, except:

a. To someone you have designated to act as your agent, for one of more of the identified purposes (listed in Section 2, above);
b. To saracoti™ employees, independent contractors, subsidiaries, affiliates, consultants, business associates, service providers, suppliers and agents, acting on saracoti™’s behalf for any of the Identified Purposes.
c. As necessary if saracoti™ has reason to believe that disclosure is necessary to identify, contact or bring legal action against someone who may be causing injury to or interference (either intentionally or unintentionally) with saracoti™ rights or property, other users of saracoti™ website, products or services, or anyone else that could be harmed by such activities; and
d. To respond to judicial process and provide information to law enforcement agencies or in connection with an investigation on matters related to public safety, as permitted by law, or otherwise as required by law.
i. In addition, as we continue to develop our business, we, or our affiliates may sell or buy other businesses or entities, or we may merge with another company. In such transactions, personal information may be one of the transferred business assets.
ii. Also, in the event that saracoti™ or substantially all of its assets are acquired, your personal information may be one of the transferred assets. Your information may be stored and processed in the United States, or in any other country in which saracoti™ or its affiliates, subsidiaries or its agents may maintain facilities.
iii. By using this web site, you consent to any such transfer of information outside of your country.
iv. After your account becomes inactive, (that is, if you request to be removed from our database). saracoti™ will keep your personal information in
its archives. Your information will then be used only as necessary for tax reasons or to prove saracoti™’ compliance with any applicable law.

6. Accuracy of Personal Information:

a. saracoti™ will use reasonable efforts to keep customer personal information accurate for the identified purposes, and for minimizing the possibility of making inappropriate customer decisions based on such information. Customers are responsible for informing saracoti™ about changes to their personal information. You can do this by sending an email to unsubscribe@securecallinternational.com . saracoti™ will use new or updated personal information it receives from customers to update its own records.

7. Security Safeguards:

a. saracoti™ will use its reasonable efforts to protect customer’s personal information.
                            `}
                        </pre>
                    </div>
                </div>
                <div className="shape shape-1" id="scene" ref={sceneEl}>
                    <span data-depth="1"><img src={process.env.PUBLIC_URL + "/images/shape-animation/video-shape-1.png"} alt="" /></span>
                </div>

            </div>
        </div>
    )
}

PrivacyBox.propTypes = {
    classOption: PropTypes.string
};
PrivacyBox.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default PrivacyBox
