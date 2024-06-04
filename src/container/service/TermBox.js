import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import Parallax from 'parallax-js';

const TermBox = ({ classOption }) => {
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
                        <pre>
                            {`
                                TERMS OF SERVICE:
                                Last revision March 1, 2023
                                PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY. BY USING THIS WEB SITE OR
                                SUBMITTING YOUR PERSONAL INFORMATION, YOU AGREE TO BE BOUND BY ALL OF THE TERMS AND
                                CONDITIONS OF THIS AGREEMENT.

                                This Terms of Service Agreement (the &quot;Agreement&quot;) governs the provision of the Service (as defined
                                below) by us to you. We reserve the right to change or revise the terms and conditions of this
                                Agreement at any time, by posting any changes or a revised Agreement on this site (www.saracoti.com)
                                (&quot;saracoti Site&quot;). We will alert you that changes or revisions have been made by indicating on the top of
                                this Agreement the date it was last revised. The changed or revised Agreement will be effective
                                immediately after it is posted on this web site. Your use of the Service following the posting of any such
                                changes or of a revised Agreement will constitute your acceptance of any such changes or revisions. We
                                encourage you to review this Agreement whenever you visit www.saracoti.com to make sure that you
                                understand the terms of the Service provided to you. If you do not agree to this Agreement (including
                                any referenced policies or guidelines), please immediately terminate your use of the Service. If you
                                would like to print this Agreement, please click the print button on your browser toolbar.
                                I. THE SERVICE

                                (a) Age Requirements for Use of Services. All services offered by www.saracoti.com are for the sole use of
                                licensed businesses and individuals over the age of 18.
                                (b) saracoti Projects. Advertised services are provided either on a “set cost” for basic services that do
                                not require additional programming beyond the options provided and Consulting services for more
                                complex or individualized projects such as Lead Generation, Client intake, Customer Service… which
                                must be developed based on the needs and desires of each individual request as saracoti™ has virtually
                                unlimited capability.
                                (c) Scope of service. &quot;saracoti™ Site&quot; and www.saracoti.com are to be used to provide legal contract
                                services only. Violent, indecent, obscene and/or sexually explicit projects and/or language will not be
                                tolerated and will not be programmed on this service.
                                (d) Cost of services: Saracoti will run ads, specials, promotions… from time to time and reserves the
                                right to control pricing based on, among other things, market value, internal and external costs, client
                                volume, complexity and network requirements.
                                Programming costs are set at $200.00 per hour for all special projects requiring script development,
                                coding or consulting and are done on a remote basis to avoid travel and per diem expenses. Should
                                client request such onsite services, costs and expenses will be discussed, invoiced and paid in advance.
                                (e) Payment.
                                (i) Payment Method: You will be charged for services through your saracoti account and the bank
                                information you provide in your profile. Standard bank rates and other applicable fees may apply
                                depending on your financial institution.
                                (ii) Right to Change Prices and Availability of Content. Prices and availability of any Content are subject
                                to change at any time.
                                (iii) Electronic Signatures and Contracts. Your use of the Service requires your ability to enter into
                                agreements and/or to make purchases electronically. YOU ACKNOWLEDGE THAT YOUR ELECTRONIC
                                SUBMISSIONS CONSTITUTE YOUR AGREEMENT AND INTENT TO BE BOUND BY AND TO PAY FOR SUCH
                                AGREEMENTS AND PURCHASES. YOUR AGREEMENT AND INTENT TO BE BOUND BY ELECTRONIC
                                SUBMISSIONS APPLIES TO ALL RECORDS RELATING TO ALL TRANSACTIONS YOU ENTER INTO ON THIS
                                SITE, INCLUDING NOTICES OF CANCELLATION, POLICIES, CONTRACTS, AND APPLICATIONS.
                                (iv) If, at any time thereafter, you fail to pay any amount under this Agreement when due or are
                                otherwise in breach or default under this Agreement, we may, in our sole discretion, and without
                                prejudice to its other rights, immediately terminate your use of the Service and revoke your license to
                                the Content.
                                (d) System Requirements. Use of the Service requires a compatible computer, compatible Device,
                                Internet access (fees may apply), and certain software (separate fees may apply), and may require
                                obtaining updates or upgrades from time to time. Because use of the Service and Content involves
                                hardware, software, and Internet access, your ability to use the Service and Content may be affected by
                                the performance of these factors. High speed Internet access is strongly recommended. You
                                acknowledge and agree that such system requirements, which may be changed from time to time, are
                                your responsibility. In light of the foregoing, you acknowledge and agree that you will not be entitled to
                                any refund for any Fees you pay for the Content if the Content is incompatible with your Device.

                                (h) Customer Service. For customer service, please contact info@saracoti.com or call (800) 201-0601.
                                II. TERM AND TERMINATION
                                (a) Term. The term of this Agreement (the &quot;Term&quot;) will begin on the date on which you first use
                                saracoti™ Site and shall continue until you request removal from the service via email to
                                support@saracoti.com to be removed from our system. We may terminate this Agreement at any time,
                                for any reason; provided that we provide you with twenty‐four (24) hour written (or e‐mail) notice.
                                Further, we may terminate this Agreement or any part of the Service immediately, without notice, in the
                                event you breach any obligation hereunder.
                                (b) Effect of Termination. Any licenses granted to you hereunder shall immediately terminate upon the
                                termination of this Agreement. You will not receive any refund for payments already made by you as of
                                the date of termination. If termination of this Agreement is due to your breach hereunder, you will bear
                                all costs of such termination, including any reasonable costs we incur in closing your account. You will
                                pay any and all costs incurred by us in enforcing your compliance with this Agreement. Upon
                                termination, you shall destroy any copy of the Content licensed to you hereunder and referenced
                                herein.
                                III. YOUR REGISTRATION AND ACCOUNT
                                (a) Registration. If you submit personal information to us in order to sign up for certain services, you
                                agree that the registration data you provide:
                                (i) is true, accurate, current and complete, and
                                (ii) will be maintained and updated by you to keep it true, accurate, current and complete. We reserve
                                the right to terminate your use of the Service and refuse to provide you with any and all current or
                                future use of the Service if we, in our sole discretion, determines that any of your registration data is
                                untrue, inaccurate, not current or incomplete.
                                (b) Registry Information Download. Once you have provided the information specified in (a) above, our
                                software automatically collects certain information from your computer (including your Internet
                                address, browser type, operating software, computer language and email type and other computer
                                registry information). You will allow our software to obtain this information and not to manipulate or
                                falsify such information.
                                IV. YOUR RESPONSIBILITIES AND ACKNOWLEDGMENTS
                                (a) Compliance with Laws, Regulations and Requirements. You will not use the Service or Content for
                                illegal purposes but will abide by and comply with:
                                (i) all applicable local, state, national, and international laws and regulations in your use of the Service or
                                Content (including laws regarding the transmission of technical data exported from the United States ),
                                and
                                (ii) all requirements, procedures, policies and regulations of networks connected to the Service.
                                (b) Non‐Interference. You will not interfere with or disrupt:
                                (i) the use and enjoyment of the Service by other users; or

                                (ii) the Service or servers or networks connected to the Service (including, without limitation, any
                                attempt to gain unauthorized access to other computer systems or networks connected to the Service).
                                (c) Resale of the Content. You will not resell the Content or the use of or access to the Service.
                                (d) Report of Abuse. You will report any violations of the terms of this Agreement by other users of the
                                Service of which you become aware by contacting us at support@saracoti.com.
                                V. CONTENT USAGE RULES
                                You acknowledge that the Content may contain security technology that limits your usage of the
                                Content to some or all of the following usage rules, and you agree to use the Content in compliance with
                                such usage rules.
                                (a) Your use of the Content is conditioned upon your prior acceptance of the terms of this Agreement.
                                (b) You may only use the Content for personal, noncommercial use.
                                (c) You may only use the content on a single Device.
                                (d) You may not export, burn or copy the Content unless expressly permitted by this Agreement.
                                (e) You agree that you will not attempt to, or encourage or assist any other person to, circumvent or
                                modify any security technology or software that is part of the Service or the Content.
                                (f) The delivery of Content to you does not transfer to you any commercial or promotional use rights in
                                the Content.
                                VI. PROPRIETARY RIGHTS
                                All Content, including but not limited to text, software, music, sound, photographs, graphics, video,
                                presented and/or licensed to you via the Service, is protected by intellectual property or other
                                proprietary rights and laws.
                                You are permitted to use this material and information only as expressly authorized by us, and may not
                                copy, reproduce, transmit, distribute, or create derivative works of such Content or information without
                                express written authorization from us in each instance.
                                The images appearing on this web site are for entertainment purposes only.
                                VII. YOUR ACCESS TO VENDORS; THIRD PARTY LINKS; ACCOUNT ACCESS
                                (a) Third Party Links. We are not responsible in any way for, and do not guaranty the availability of, any
                                email from or links to third party Web sites and resources which may be accessed through saracoti™
                                Site. In addition, we do not endorse and are not responsible or liable for any content, advertising, goods
                                or services, or other materials available on or from such Web sites or resources. We will not be
                                responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or
                                in connection with use of or reliance on any such content, advertising, goods or services, or other
                                materials on or available from such Web sites or resources.
                                (b) Infringer Policy. If you believe that any material available through saracoti™ Site infringes upon any
                                copyright you own or control, or that any link on the saracoti™ Site directs users to another Web site

                                that contains material that you own or control, you may file a notification of such infringement with our
                                Designated Agent. Please refer to the &quot;Copyright Policy&quot; and &quot;Notice and Procedure for Notifying
                                Designated Agent of Claims of Copyright Infringement&quot; set forth on The saracoti™ Site at
                                www.saracoti.com.
                                VIII. YOUR PRIVACY
                                We believe strongly in protecting user privacy and providing you with notice of our use of data, including
                                personal identifying information, collected on The saracoti™ Site. Unless required to provide the Service
                                to you, we will not disclose your personal identifiable information to third parties without your express
                                permission. Additionally, we will not disclose your email address, or the email addresses of individuals
                                sending you emails, to direct marketers.
                                IX. INDEMNITY
                                You will release, indemnify, defend and hold harmless us, and any of our contractors, agents,
                                employees, officers, directors, shareholders, affiliates and assigns from all liabilities, claims, damages,
                                costs and expenses, including reasonable attorneys&#39; fees and expenses, of third parties relating to or
                                arising out of:
                                (a) this Agreement or the breach of your warranties, representations and obligations under this
                                Agreement,
                                (b) the Service/Content or your use of such Service/Content,
                                (c) any intellectual property or other proprietary right of any person or entity,
                                (d) your violation of any of the provisions of this Agreement, or
                                (e) any information or data you supplied to us, including, without limitation, any misrepresentation in
                                your registration data, if applicable.
                                If we are threatened with suit or sued by a third party, we may seek written assurances from you
                                concerning your promise to indemnify us; your failure to provide those assurances may be considered
                                by us to be a material breach of this Agreement. We will have the right to participate in any defense by
                                you of a third‐party claim related to your use of any of the Service, with counsel of our choice at our
                                expense. We will reasonably cooperate in any defense by you of a third‐party claim at your request and
                                expense. You will have sole responsibility to defend us against any claim, but you must receive our prior
                                written consent regarding any related settlement. The terms of this Article will survive any termination
                                or cancellation of this Agreement.
                                X. DISCLAIMER OF WARRANTIES
                                (a) YOUR USE OF THE SERVICE AND THE CONTENT IS AT YOUR SOLE RISK. THE SERVICE AND CONTENT
                                ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES
                                OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
                                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON‐INFRINGEMENT
                                WITH RESPECT TO THE SERVICE AND CONTENT.
                                (b) WITHOUT LIMITING THE GENERALITY OF THE FOREGOING, WE MAKE NO WARRANTY:

                                (i) THAT THE CONTENT WILL WORK WITH YOUR DEVICE;
                                (ii) THAT THE SERVICE WILL MEET YOUR REQUIREMENTS, BE UNINTERRUPTED, TIMELY, SECURE, OR
                                ERROR FREE;
                                (iii) REGARDING ANY CONTENT PURCHASED OR OBTAINED THROUGH OR FROM THE SERVICE OR ANY
                                TRANSACTIONS ENTERED INTO THROUGH THE SERVICE; OR
                                (iv) REGARDING ANY CONTENT DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE USE OF OR
                                FROM THE SERVICE (DOWNLOADING OR ACCESS IS DONE AT YOUR OWN DISCRETION AND RISK AND
                                YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR DEVICE OR LOSS
                                OF DATA THAT RESULTS FROM THE DOWNLOAD OF SUCH CONTENT).
                                (c) NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM US OR
                                THROUGH OR FROM THE SERVICE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED HEREIN.
                                (d) SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, SO SOME OF THE
                                ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
                                XI. LIMITATION OF LIABILITY
                                (a) OUR ENTIRE LIABILITY, AND YOUR EXCLUSIVE REMEDY, IN LAW, IN EQUITY, OR OTHERWISE, WITH
                                RESPECT TO ANY SERVICE PROVIDED UNDER THIS AGREEMENT AND/OR FOR ANY BREACH OF THIS
                                AGREEMENT IS SOLELY LIMITED TO THE AMOUNT YOU PAID DURING THE TERM.
                                (b) WE WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL
                                DAMAGES IN CONNECTION WITH THIS AGREEMENT OR THE SERVICE IN ANY MANNER, INCLUDING
                                LIABILITIES RESULTING FROM:
                                (i) THE USE OR THE INABILITY TO USE THE SERVICE OR CONTENT;
                                (ii) THE COST OF PROCURING SUBSTITUTE CONTENT AND SERVICE;
                                (iii) ANY CONTENT OR SERVICE PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS
                                ENTERED INTO THROUGH OR FROM THE SERVICE; OR
                                (iv) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA THROUGH THE
                                SERVICE, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF DEPOSITS, SERVICE PAYMENTS,
                                PROFITS, USE, DATA OR OTHER INTANGIBLE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF
                                SUCH DAMAGES.
                                (c) WE WILL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM INTERRUPTION, SUSPENSION OR
                                TERMINATION OF THE SERVICE, INCLUDING, BUT NOT LIMITED TO, DIRECT, INDIRECT, INCIDENTAL,
                                SPECIAL CONSEQUENTIAL OR EXEMPLARY DAMAGES, WHETHER SUCH INTERRUPTION, SUSPENSION OR
                                TERMINATION WAS JUSTIFIED OR NOT, NEGLIGENT OR INTENTIONAL, INADVERTENT OR ADVERTENT.
                                (d) WE WILL NOT BE LIABLE FOR ANY DAMAGE TO YOUR DEVICE OR PERSONAL COMPUTER CAUSED BY
                                THE CONTENT.
                                (e) SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL
                                OR CONSEQUENTIAL DAMAGES SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.

                                XII. NOTICES AND ANNOUNCEMENTS
                                You authorize us to notify you of information that we deem to be of potential interest to you. Notices
                                and announcements may include commercial emails and other notices describing changes, upgrades,
                                new products and services or other information pertaining to Internet security or to enhance your
                                identity on the Internet and/or other relevant matters. All notices must be sent either in writing
                                (including email, but only to the extent expressly provided herein). All written notices to us shall be
                                delivered to 1489 W Warm Springs Rd, #110, Henderson, NV 89014, tel. (800) 201-0601. All notices to
                                you will be delivered to via your mobile device or contact information as provided by you. We may also
                                provide notices of changes to this Agreement or any other matter by displaying notices to you generally
                                on The saracoti Site. Notices to us must be sent by either overnight courier or certified mail, return
                                receipt requested.
                                XIII. TRADEMARKS
                                saracoti™, its logo, and other saracoti.com trademarks, service marks, graphics, and logos used in
                                connection with the Service and Content are trademarks or registered trademarks owned by us in the
                                U.S. and/or other countries. Other trademarks, service marks, graphics, and logos used in connection
                                with the Service and Content may be the trademarks of their respective owners. You are granted no
                                right or license with respect to any of the aforesaid trademarks and any use of such trademarks.
                                XIV. SMS ALERTS
                                If you gave us your e‐mail address when you registered, we may use it to send you www.saracoti.com
                                newsletters, product updates, service‐related information, and other offers and information from us or
                                our business partners, and you hereby consent to such e‐mails. We may also contact you by e‐mail to
                                respond to any customer service inquiries you submit. We do not disclose your e‐mail address to
                                business partners or to anyone other than employees and agents working for or on behalf of us, except
                                as required by subpoenas, court orders, or legal requirements. We do not use your e‐mail address to
                                correlate your identity to your Internet usage paths. If you do not want to receive www.saracoti.com
                                newsletters, offers, and product and service information, simply click the unsubscribe link at the bottom
                                of the e-mail address where such information is being sent.
                                XV. GENERAL
                                (a) En��re Agreement. This Agreement comprises the entire agreement among you and u
                                (www.saracoti.com ) and supersedes any prior agreements pertaining to the subject matter contained
                                herein.
                                (b) Effect of Waiver. Failure by us to exercise or enforce any right or provision of this Agreement will not
                                constitute a waiver of such right or provision. If any provision of this Agreement is found by a court of
                                competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to
                                give effect to the parties&#39; intentions as reflected in the provision, and the other provisions of this
                                Agreement remain in full force and effect.
                                (c) Governing Law and Jurisdiction. This Agreement will be governed by the laws of the State of
                                California without regard to its conflict of law principles to the contrary. Neither party will commence or
                                prosecute any suit, proceeding or claim to enforce the provisions of this Agreement, to recover damages
                                for breach of or default under this Agreement, or otherwise arising under or by reason of this

                                Agreement, other than in the state or federal courts located in Los Angeles, State of California. Each
                                party hereby irrevocably consents to the jurisdiction and venue of such courts in connection with any
                                action, suit, proceeding or claim arising under or by reason of this Agreement. Each party hereby waives
                                any rights to trial by jury claim arising out of this Agreement and any related documents.
                                (d) Headings. The section headings and titles in this Agreement are for convenience only and have no
                                legal or contractual effect.
                                (e) Force Majeure. Neither party will be deemed in default hereunder, nor will it hold the other party
                                responsible for, any cessation, interruption or delay in the performance of its obligations hereunder due
                                to earthquake, flood, fire, storm, natural disaster, act of God, war, terrorism, armed conflict, labor
                                strike, lockout, or boycott, provided that the party relying upon this section
                                (i) will give the other party written notice thereof promptly and, in any event, within five (5) days of
                                discovery thereof; and
                                (ii) will take all steps reasonably necessary under the circumstances to mitigate the effects of the force
                                majeure event upon which such notice is based; provided further, that in the event a force majeure
                                event described in this paragraph extends for a period in excess of thirty (30) days in the aggregate, we
                                may immediately terminate this Agreement.
                                (f) Survival. Any provision in this Agreement that by its nature should survive the termination of this
                                agreement shall continue to remain in full force and effect after the termination or expiration of this
                                Agreement (e.g., indemnification, limitation of liability, disclaimer of warranties). I HAVE READ AND
                                UNDERSTAND THE FOREGOING AGREEMENT AND AGREE TO BE BOUND BY ALL OF ITS TERMS AND
                                CONDITIONS
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

TermBox.propTypes = {
    classOption: PropTypes.string
};
TermBox.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default TermBox
