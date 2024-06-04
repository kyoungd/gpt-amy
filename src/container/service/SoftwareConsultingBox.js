import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import Parallax from 'parallax-js';

const SoftwareConsultingBox = ({ classOption }) => {
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
SOFTWARE CONSULTING AGREEMENT

This Agreement (“Agreement”) is made and between you, the Client. (“Company or Party”) and SARACOTI, LLC (SARACOTI, saracoti or Party).  Company desires to retain saracoti as an independent contractor to perform certain services for Company and  2HUMAN2human is willing to perform such services, on terms set forth more fully below.  In consideration of the mutual promises contained herein, the parties agree as follows:

1. SERVICES AND COMPENSATION
saracoti agrees to perform for Company the services described in Exhibit A (“Services”), attached hereto. Company agrees to pay saracoti the compensation set forth in Exhibit A for the performance of the Services. As saracoti has an ongoing business providing technology solutions to its clients that include saracoti’s proprietary Intellectual Property, it is anticipated that saracoti may at times see value in contracting Client for its projects on like terms as provided herein, and It is further contemplated that opportunities may occur where the companies named herein will profit by combining their thoughts, skills and expertise to create new technology that can be patented and protected as proprietary. Compensation on all such projects will be dealt with outside this Agreement as “Joint Technology”.

2. CONFIDENTIALITY
Definition. “Confidential Information” means any proprietary information, technical data, trade secrets or know-how, including, but not limited to, research, product plans, products, services, customers, customer lists, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, finances or other business information disclosed by either Party either directly or indirectly in writing, orally or by drawings or inspection of parts or equipment. Non-Use and Non-Disclosure.  The Parties agree that neither Party will not, during or subsequent to the term of this Agreement, use the other Party's Confidential Information for any purpose whatsoever other than the performance of the Services on in fulfillment of projects herein or disclose the other Party’s Confidential Information to any third party.  It is understood that said Confidential Information shall remain the sole property of the producing Party.  The Party’s further agree to take all reasonable precautions to prevent any unauthorized disclosure of such Confidential Information including, but not limited to, executing a nondisclosure agreement containing provisions in the other Party's favor identical to Sections 2, 3 and 4 of this Agreement.  Confidential Information does not include information which can be established by competent proof that such Confidential Information (i) is known at the time of disclosure to a Party as evidenced by written records the Party has of , (ii) has become publicly known and made generally available through no wrongful act of either Party, or (iii) has been rightfully received by either Party from a third party who is authorized to make such disclosure. Third Party Confidential Information.  The Party’s recognize that each Party has received and, in the future, will receive from third parties their confidential or proprietary information subject to a duty to maintain the confidentiality of such information and to use it only for certain limited purposes.  Each Party agrees that each owes each other and such third parties, during the term of this Agreement and thereafter, a duty to hold all such confidential or proprietary information in the strictest confidence and not to disclose it to any person, firm or corporation or to use it except as necessary in carrying out the Services consistent with the Party’s agreement with such third party. Return of Materials.  Upon the termination of this Agreement, or upon either Party's earlier request, the other Party will deliver all opposing Party’s property or Confidential Information that Party may have in their possession or control.

3. OWNERSHIP
Assignment. Both Parties agree that all copyrightable material, notes, records, drawings, designs, inventions, improvements, developments, discoveries and trade secrets (collectively, “Inventions”) conceived, made or discovered by each Party, solely or in collaboration with others, during the period of this Agreement which relate in any manner to the business of the other Party that the Party may be directed to undertake, investigate or experiment with, or which the Party may become associated with in work, investigation or experimentation in the line of business of the other Party in performing the Services hereunder, are the sole property of the other Party. Further Assurances.  Each Party agrees to assist the other Party, or its designee, at that Party's expense, in every proper way to secure that Party's rights in the Inventions and any copyrights, patents, mask work rights or other intellectual property rights relating thereto in any and all countries, including the disclosure to the other of all pertinent information and data with respect thereto, the execution of all applications, specifications, oaths, assignments and all other instruments which Party shall deem necessary in order to apply for and obtain such rights and in order to assign and convey to the other Party, its successors, assigns and nominees the sole and exclusive right, title and interest in and to such Inventions, and any copyrights, patents, mask work rights or other intellectual property rights relating thereto. Pre-Existing Materials.  The Party’s agree that if in the course of performing the Services, or the Party’s employees incorporate into any Invention developed hereunder any invention, improvement, development, concept, discovery or other proprietary information owned by either Party or in which the Party has an interest, (i) Each Party shall seek the other Party's approval, in writing before incorporating such  invention, improvement, development, concept, discovery or other proprietary information into any Invention; and (ii) if the other Party agrees to such incorporation, the Party is hereby granted and shall have, (as between the Party’s) an exclusive, royalty-free, perpetual, irrevocable, worldwide license to make, have made, modify, use, distribute and sell such item as part of or in connection with such Invention.  The Party’s shall not incorporate any invention, improvement, development, concept, discovery or other proprietary information owned by any third party into any Invention without the other Party’s prior written permission. Attorney in Fact.  Each Party agrees that if the other Party is unable because of that Party’s unavailability, dissolution, or for any other reason, to secure the Party's signature to apply for or to pursue any application for any United States or foreign patents or mask work or copyright registrations covering the Inventions assigned to the Party above, then each Party hereby irrevocably designates and appoints the Party and its duly authorized officers and agents as Party's agent and attorney in fact, to act for and in Party's behalf and stead to execute and file any such applications and to do all other lawfully permitted acts to further the prosecution and issuance of patents, copyright and mask work registrations thereon with the same legal force and effect as if executed by remaining Party.

4. WARRANTY
Each Party warrants that: (i) the Services will be performed in a professional and workmanlike manner and that none of such Services or any part of this Agreement is or will be inconsistent with any obligation either Party may have to others; (ii) all work under this Agreement shall be each Party’s original work and none of the Services or Inventions or any development, use, production, distribution or exploitation thereof will infringe, misappropriate or violate any intellectual property or other right of any person or entity (including, without limitation, Each Party); (iii)  has the full right to allow it to provide the other Party with the assignments and rights provided for herein; (iv) each Party has full right and power to enter into this Agreement and the Party's performance of the Services will not violate any other agreement or applicable law; (v) the personnel performing the Services are the Party’s employees and have executed nondisclosure agreements and employee invention assignment agreements containing provisions as protective of the other Party and the Party's Confidential Information as set forth herein and the obligations of each Party’s employees under such nondisclosure agreements and employee invention assignment agreements are enforceable under the laws of the United States of America; (vi)  employees are adequately trained and has the appropriate expertise to provide the Services set forth herein; (vii) any Inventions developed by each Party shall be free from any defect or viruses; (viii)  shall comply with and is in compliance with the Foreign Corrupt Practices Act; (ix) neither Party’s employees shall decompile, disassemble, or reverse engineer any software provided to them by the other Party, in whole or in part and (x) no consent, approval or authorization, or designation, declaration or filing with any governmental authority in any country is required in connection with the valid execution, delivery and performance of this Agreement.

5. INDEMNIFICATION
Each Party shall indemnify and hold harmless the other Party and its directors, officers, and employees from and against all taxes, losses, damages, liabilities, costs and expenses, including attorney's fees and other legal expenses, arising directly or indirectly from (i) any breach of the warranties contained herein; (ii) any negligent, reckless or intentionally wrongful act of the Party or that Party 's assistants, employees or agents, (ii) a determination by a court or agency that the Party is not an independent contractor, (iii) any obligation imposed on the Party to pay any withholding taxes, social security, employee benefits and taxes, unemployment or disability insurance or similar items, including the interest and penalties thereon, in connection with any payments made to either Party hereunder, or (iv) any breach by the Party or its assistants, employees or agents of any of the covenants contained in this Agreement.

6. TERM AND TERMINATION
Term.  This Agreement will commence on the date first written above and will continue for an initial period of 1 year, after which it will automatically renew for additional 1 year periods, unless either party provides written notice of non-renewal to the other party at least 90 days prior to the end of the term.  This Agreement may, however, be earlier terminated in accordance with Section 6(b) herein.  
Termination.   Either Party may terminate this Agreement at any time for any reason upon 30 days notice to the other Party.  Either party may terminate this Agreement if the other party materially breached this Agreement and has not cured such breach within 30 days after receiving written notice of such breach from the non-breaching party. 
Survival.  Upon such termination all rights and duties of the parties toward each other shall cease except that Sections 2 (Confidentiality), 3 (Ownership), 4 (Warranty), 5 (Indemnification), 6(c) (Survival), 7 (Limitation of Liability), 9 (Independent Contractor) and 10 (Audit) shall survive termination of this Agreement.

7. LIMITATION OF LIABILITY
IN NO EVENT SHALL EITHER PARTY BE LIABLE TO ANY OTHER PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, OR DAMAGES FOR LOSS PROFITS OR BUSINESS OPPORTUNITIES OR LOST DATA INCURRED BY EITHER PARTY OR ANY THIRD PARTY, HOWEVER CAUSED AND UNDER ANY THEORY OF LIABILITY, WHETHER BASED IN CONTRACT, TORT OR OTHER THEORY OF LIABILITY, REGARDLESS OF WHETHER EITHER PARTY WAS ADVISED OF THE POSSIBILITY OF SUCH DAMAGE AND NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.  IN NO EVENT SHALL EITHER PARTY'S LIABILITY ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT EXCEED THE AMOUNTS PAID BY THE OTHER PARTY  UNDER THIS AGREEMENT IN THE MONTH PRIOR TO THE DATE OF THE CLAIM. 

8. ASSIGNMENT
Neither this Agreement nor any right hereunder or interest herein may be assigned or transferred by either Party without the express written consent of the Other Party.  
INDEPENDENT CONTRACTOR
It is the express intention of the parties that both Party’s act as “independent contractor”.  Nothing in this Agreement shall in any way be construed to constitute the other Party as an agent, employee or representative of the other Party, but shall perform the Services hereunder as an independent contractor.  Both Party’s acknowledge and agree that the other Party is obligated to report as income all compensation received by the Party pursuant to this Agreement, and each Party agrees to and acknowledges the obligation to pay all self-employment and other taxes thereon.  The Party’s acknowledge agrees and it is the intent of the parties hereto that each Party's employees and/or employees receive no Company-sponsored benefits from the other Party.  Such benefits include, but are not limited to, paid vacation, sick leave, medical insurance, and 401(k) participation.  Each Party shall pay all taxes and other compensation of its personnel whether located in the US or outside of the US.  

9. AUDIT
The Party’s shall keep all records and documents related to the performance of the Services hereunder.  During the term of this Agreement and for a period of 1 year thereafter, upon advance written notice, Either Party has the right to conduct an audit of the other Party's records and/or inspect its facilities for the purpose of evaluating and verifying compliance with the terms of this Agreement, provided such audit is conducted during normal business hours.

10. PRESS RELEASES 
In no event shall either Party make any press releases or publicize any information relating to this Agreement or the relationship of the parties without the other Party's prior written approval. 
Either Party shall reserve the right to publish all reports, writing, work produced/authored by, derivatives, etc. and its relationship with the other Party.

11. GOVERNING LAW
This Agreement and all acts and transactions pursuant hereto and the rights and obligations of the parties hereto shall be governed, construed and interpreted in accordance with the laws of the State of California, without reference to rules of conflicts or choice of laws.  The federal and state courts located within Orance County, California shall have exclusive jurisdiction to adjudicate any dispute arising out of this Agreement. 

12. ENTIRE AGREEMENT
This Agreement including any exhibits represent the entire agreement of the parties and supersedes any prior agreements between them, whether written or oral, with respect to the subject matter hereof.  No waiver, alteration, or modification of any of the provisions of this Agreement shall be binding unless in writing and signed by duly authorized representatives of the parties hereto.  

13. ATTORNEY'S FEES
In any court action at law or equity which is brought by one of the parties to enforce or interpret the provisions of this Agreement, the prevailing party will be entitled to reasonable attorney's fees, in addition to any other relief to which that party may be entitled.

14. SEVERABILITY
The invalidity or unenforceability of any provision of this Agreement, or any terms thereof, shall not affect the validity of this Agreement as a whole, which shall at all times remain in full force and effect. 

15. FOREIGN CORRUPT PRACTICES ACT  
In conformity with the United States Foreign Corrupt Practices Act regarding foreign business practices, each Party and its employees and agents shall not directly or indirectly make any offer, payment, or promise to pay; authorize payment; or offer a gift, promise to give, or authorize the giving of anything of value for the purpose of influencing any act or decision (including a decision not to act) of an official of any government of any country or the United States Government or inducing such a person to use his or her influence to affect any such governmental act or decision in order to assist the other Party in obtaining, retaining or directing any business.

16. UNITED STATES EXPORT CONTROLS  
Each Party understands and acknowledges that Company is subject to regulation by agencies of the United States Government, including, but not limited to, the United States Department of Commerce, which prohibit export, reexport or diversion of certain products and technology to certain countries.  Any and all obligations of each Party to provide software, documentation, or any media in which any of the foregoing is contained, as well as any other technical assistance, shall be subject in all respects to such United States laws and regulations as shall from time to time govern the license and delivery of technology and products abroad by persons subject to the jurisdiction of the United States, including the Export Administration Act of 1979, as amended, any successor legislation, and the Export Administration Regulations issued by the Department of Commerce, Bureau of Export Administration.   Both Party’s agree to cooperate with the other, including, without limitation, providing required documentation, in order to obtain export licenses or exemptions therefrom.  Each Party warrants that it will comply with the Export Administration Regulations and other United States laws and regulations governing exports and reexports in effect from time to time.  Further; each Party agrees that unless prior written authorization is obtained from the Bureau of Export Administration, or the Export Administration Regulations explicitly permit reexport without such written authorization, it will not export, reexport, or transship, directly or indirectly, any software or any technical data disclosed or provided to, or the direct product of such technical data, to country groups Q, S, W, Y or Z (as defined in the Export Administration Regulations), or to any other country as to which the United States Government has placed an embargo against the shipment of products, which embargo is in effect during the terms of this Agreement.

17. COMPLIANCE WITH APPLICABLE LAWS  
The Party’s shall (i) comply with all legislation, rules, regulations or other laws governing this Agreement, and (ii) advise the other Party of any legislation, rule, regulation or other law (including but not limited to any customs, tax, trade, intellectual property or tariff law) which is in effect or which may come into effect in any country where either Party conducts its business which will affect the use and protection of the other Party's intellectual property or proprietary rights therein or which has a material effect on any provision of this Agreement.

18. NO SOLICITATION
No Solicitation. During the term of this Agreement and for six (6) months thereafter, neither party will solicit for employment, independent contract service, or hire any of the other party’s individual personnel. This Section 19 will not restrict a party from generally advertising available positions. 
Liquidated Damages. In the event of breach of this Section 19, the breaching party agrees to pay the other party, as liquidated damages, twenty percent (20%) of the annual salary of the employee or independent contractor, not to exceed three thousand US Dollars ($3,000) per employee or independent contractor.
IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the day and year first above written.

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

SoftwareConsultingBox.propTypes = {
    classOption: PropTypes.string
};
SoftwareConsultingBox.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default SoftwareConsultingBox
