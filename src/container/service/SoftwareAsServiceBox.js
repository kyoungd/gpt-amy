import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import Parallax from 'parallax-js';

const SoftwareAsServiceBox = ({ classOption }) => {
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

SOFTWARE AS A SERVICE AGREEMENT (V.1013) 
 
PLEASE READ THIS AGREEMENT FOR OYATE’S SERVICES.  BY ACCESSING OR USING OYATE’S AI  CALL INTAKE SOFTWARE OR SERVICES OFFERING, YOU (“the Customer”) SIGNIFY ACCEPTANCE OF AND AGREE TO THE TERMS AND CONDITIONS OF THIS AGREEMENT.  IF YOU DO NOT AGREE TO THE TERMS AND CONDITIONS OF THIS AGREEMENT, DO NOT ACCESS OR USE THE SERVICES.  IF THE PARTIES HAVE A FULLY EXECUTED AGREEMENT THAT EXPRESSLY GOVERNS ORDERS FOR OYATE’S SOFTWARE AS A SERVICE AGREEMENT, SUCH AGREEMENT SHALL SUPERSEDE THIS AGREEMENT. 
 
This Software as a Service Agreement (“Agreement”) is entered into between Customer and OYATE, LLC. a Nevada Corporation (“OYATE”), with its principal place of business at 1489 W Warm Springs Rd, Ste 110, Henderson, NV 89014.  OYATE and Customer agree that the following terms and conditions will apply to the services provided under this Agreement and Orders placed thereunder. 
 
1. DEFINITIONS 

“Administrator User” means each Customer employee designated by Customer to serve as technical administrator of the SaaS Services on Customer’s behalf.  Each Administrator User must complete training and qualification requirements reasonably required by OYATE.  “Customer Content” means all data and materials provided by Customer to OYATE for use in connection with the SaaS Services, including, without limitation, customer applications, data files, and graphics. “Documentation” means the user guides, online help, release notes, training materials and other documentation provided or made available by OYATE to Customer regarding the use or operation of the SaaS Services. “Host” means the computer equipment on which the Software is installed, which is owned and operated by OYATE or its subcontractors.   
“Identity Cube” means a unique collection of identity data for an individual that will be granted access to and/or managed by the SaaS Services for the purposes of providing single sign-on, managing passwords or certifying user access.  Identity data may be physically or logically maintained in a single repository or in separate physical or logical repositories. Although Identity Cubes for user accounts that have been deactivated may remain in the identity management system, those inactive Identity Cubes will not be included in the number of Identity Cube licenses in use by Customer. 
“Maintenance Services” means the support and maintenance services provided by OYATE to Customer pursuant to this SaaS Agreement and Exhibit B. 
“Other Services” means all technical and non-technical services performed or delivered by OYATE under this SaaS Agreement, including, without limitation, implementation services and other professional services, training and education services but excluding the SaaS Services and the Maintenance Services.  Other Services will be provided on a time and material basis at such times or during such periods, as may be specified in a Schedule and mutually agreed to by the parties.  All Other Services will be provided on a non-work for hire basis.  
“Schedule" is a written document attached to this SaaS Agreement under Exhibit A or executed separately by OYATE and Customer for the purpose of purchasing SaaS Services under the terms and conditions of this SaaS Agreement 
“Software” means the object code version of any software to which Customer is provided access as part of the Service, including any updates or new versions. 
“SaaS Services” refer to the specific OYATE’s internet-accessible service identified in a Schedule that provides use of OYATE’s identity/access management Software that is hosted by OYATE or its services provider and made available to Customer over a network on a term-use basis. 
“Subscription Term” shall mean that period specified in a Schedule during which Customer will have on-line access and use of the Software through OYATE’s SaaS Services.  The Subscription Term shall renew for successive 12 month periods unless either party delivers written notice of non-renewal to the other party at least 30 days prior to the expiration of the then-current Subscription Term.   

2. SAAS SERVICES 

2.1 During the Subscription Term, Customer will receive a nonexclusive, non-assignable, royalty free, worldwide right to access and use the SaaS Services solely for your internal business operations subject to the terms of this Agreement and up to the number of Identity Cubes documented in the Schedule.  
2.2 Customer acknowledges that this Agreement is a services agreement and OYATE will not be delivering copies of the Software to Customer as part of the SaaS Services.   
 
3. RESTRICTIONS  

Customer shall not, and shall not permit anyone to: (i) copy or republish the SaaS Services or Software, (ii) make the SaaS Services available to any person other than authorized Identity Cube users, (iii) use or access the SaaS Services to provide service bureau, time-sharing or other computer hosting services to third parties, (iv) modify or create derivative works based upon the SaaS Services or Documentation, (v) remove, modify or obscure any copyright, trademark or other proprietary notices contained in the software used to provide the SaaS Services or in the Documentation, (vi) reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Software used to provide the SaaS Services, except and only to the extent such activity is expressly permitted by applicable law, or (vii) access the SaaS Services or use the Documentation in order to build a similar product or competitive product.  Subject to the limited licenses granted herein, OYATE shall own all right, title and interest in and to the Software, services, Documentation, and other deliverables provided under this SaaS Agreement, including all modifications, improvements, upgrades, derivative works and feedback related thereto and intellectual property rights therein.  Customer agrees to assign all right, title and interest it may have in the foregoing to OYATE. 
4. CUSTOMER RESPONSIBILITIES 
4.1  Assistance.  Customer shall provide commercially reasonable information and assistance to OYATE to enable OYATE to deliver the SaaS Services.  Upon request from OYATE, Customer shall promptly deliver Customer Content to OYATE in an electronic file format specified and accessible by OYATE.  Customer acknowledges that OYATE’s ability to deliver the SaaS Services in the manner provided in this SaaS Agreement may depend upon the accuracy and timeliness of such information and assistance.  
4.2   Compliance with Laws.  Customer shall comply with all applicable local, state, national and foreign laws in connection with its use of the SaaS Services, including those laws related to data privacy, international communications, and the transmission of technical or personal data.  Customer acknowledges that OYATE exercises no control over the content of the information transmitted by Customer or the Identity Cube users through the SaaS Services.  Customer shall not upload, post, reproduce or distribute any information, software or other material protected by copyright, privacy rights, or any other intellectual property right without first obtaining the permission of the owner of such rights. 
4.3   Unauthorized Use; False Information.  Customer shall: (a) notify OYATE immediately of any unauthorized use of any password or user id or any other known or suspected breach of security, (b) report to OYATE immediately and use reasonable efforts to stop any unauthorized use of the SaaS Services that is known or suspected by Customer or any Identity Cube user, and (c) not provide false identity information to gain access to or use the SaaS Services. 
4.4   Administrator Access.  Customer shall be solely responsible for the acts and omissions of its Administrator Users.  OYATE shall not be liable for any loss of data or functionality caused directly or indirectly by the Administrator Users. 
4.5   Customer Input.  Customer is solely responsible for collecting, inputting and updating all Customer Content stored on the Host, and for ensuring that the Customer Content does not (i) include anything that actually or potentially infringes or misappropriates the copyright, trade secret, trademark or other intellectual property right of any third party, or (ii) contain anything that is obscene, defamatory, harassing, offensive or malicious.  Customer shall: (i) notify OYATE immediately of any unauthorized use of any password or user id or any other known or suspected breach of security, (ii) report to OYATE immediately and use reasonable efforts to stop any unauthorized use of the Service that is known or suspected by Customer or any Identity Cube user, and (iii) not provide false identity information to gain access to or use the Service. 
4.6   License from Customer.  Subject to the terms and conditions of this SaaS Agreement, Customer shall grant to OYATE a limited, non-exclusive and non-transferable license, to copy, store, configure, perform, display and transmit Customer Content solely as necessary to provide the SaaS Services to Customer.   
4.7 Ownership and Restrictions.  Customer retains ownership and intellectual property rights in and to its Customer Content. OYATE or its licensors retain all ownership and intellectual property rights to the services, Software programs, and anything developed and delivered under the Agreement.  Third party technology that may be appropriate or necessary for use with some OYATE programs is specified in the program Documentation or ordering document as applicable. Customer’s right to use such third party technology is governed by the terms of the third party technology license agreement specified by OYATE and not under the Agreement.  
4.8   Suggestions.  OYATE shall have a royalty-free, worldwide, irrevocable, perpetual license to use and incorporate into the SaaS Services any suggestions, enhancement requests, recommendation or other feedback provided by Customer, including Users, relating to the operation of the SaaS Services.   
 
5. ORDERS AND PAYMENT 

5.1 Orders.  Customer shall order SaaS Services pursuant to a Schedule.  All services acquired by Customer shall be governed exclusively by this SaaS Agreement and the applicable Schedule.  In the event of a conflict between the terms of a Schedule and this SaaS Agreement, the terms of the Schedule shall take precedence.   
5.2 Invoicing and Payment.  Unless otherwise provided in the Schedule, OYATE shall invoice Customer for all fees on the Schedule effective date.  Customer shall pay all undisputed invoices within 30 days after Customer receives the invoice.  Except as expressly provided otherwise, fees are non-refundable.  All fees are stated in United States Dollars, and must be paid by Customer to OYATE in United States Dollars. 
5.3 Expenses.  Customer will reimburse OYATE for its reasonable, out-of-pocket travel and related expenses incurred in performing the Other Services.  OYATE shall notify Customer prior to incurring any such expense.  OYATE shall comply with Customer’s travel and expense policy if made available to OYATE prior to the required travel.   
5.4 Taxes.  OYATE shall bill Customer for applicable taxes as a separate line item on each invoice.  Customer shall be responsible for payment of all sales and use taxes, value added taxes (VAT), or similar charges relating to Customer’s purchase and use of the services.  Customer shall not be liable for taxes based on OYATE’s net income, capital or corporate franchise. 

6. TERM AND TERMINATION 

6.1 Term of SaaS Agreement.  The term of this SaaS Agreement shall begin on the Effective Date and shall continue until terminated by either party as outlined in this Section.   
6.2 Termination.  Either party may terminate this SaaS Agreement immediately upon a material breach by the other party that has not been cured within thirty (30) days after receipt of notice of such breach.   
6.3 Suspension for Non-Payment.  OYATE reserves the right to suspend delivery of the SaaS Services if Customer fails to timely pay any undisputed amounts due to OYATE under this SaaS Agreement, but only after OYATE notifies Customer of such failure and such failure continues for fifteen (15) days.  Suspension of the SaaS Services shall not release Customer of its payment obligations under this SaaS Agreement.  Customer agrees that OYATE shall not be liable to Customer or to any third party for any liabilities, claims or expenses arising from or relating to suspension of the SaaS Services resulting from Customer’s nonpayment. 
6.4 Suspension for Ongoing Harm.  OYATE reserves the right to suspend delivery of the SaaS Services if OYATE reasonably concludes that Customer or an Identity Cube user’s use of the SaaS Services is causing immediate and ongoing harm to OYATE or others.  In the extraordinary case that OYATE must suspend delivery of the SaaS Services, OYATE shall immediately notify Customer of the suspension and the parties shall diligently attempt to resolve the issue.  OYATE shall not be liable to Customer or to any third party for any liabilities, claims or expenses arising from or relating to any suspension of the SaaS Services in accordance with this Section 6.4. Nothing in this Section 6.4 will limit OYATE’s rights under Section 6.5 below. 

6.5 Effect of Termination. 

1. Upon termination of this SaaS Agreement or expiration of the Subscription Term, OYATE shall immediately cease providing the SaaS Services and all usage rights granted under this SaaS Agreement shall terminate. 
2. If OYATE terminates this SaaS Agreement due to a breach by Customer, then Customer shall immediately pay to OYATE all amounts then due under this SaaS Agreement and to become due during the remaining term of this SaaS Agreement, but for such termination.  If Customer terminates this SaaS Agreement due to a breach by OYATE, then OYATE shall immediately repay to Customer all pre-paid amounts for any unperformed SaaS Services scheduled to be delivered after the termination date. 
3. Upon termination of this SaaS Agreement and upon subsequent written request by the disclosing party, the receiving party of tangible Confidential Information shall immediately return such information or destroy such information and provide written certification of such destruction, provided that the receiving party may permit its legal counsel to retain one archival copy of such information in the event of a subsequent dispute between the parties. 

7. SERVICE LEVEL AGREEMENT 

The Service Level SaaS Agreement (“SLA”) for the SaaS Services is set forth in Exhibit C hereto.  The SLA sets forth Customer’s sole remedies for availability or quality of the SaaS Services including any failure to meet any guarantee set forth in the SLA.  

8. WARRANTIES 

8.1 Warranty.  OYATE represents and warrants that it will provide the SaaS Services in a professional manner consistent with general industry standards and that the SaaS Services will perform substantially in accordance with the Documentation.  For any beach of a warranty, Customer’s exclusive remedy shall be as provided in Section 6, Term and Termination.   
8.2 OYATE WARRANTS THAT THE SAAS SERVICES WILL PERFORM IN ALL MATERIAL RESPECTS IN ACCORDANCE WITH THE DOCUMENTATION.  OYATE DOES NOT GUARANTEE THAT THE SAAS SERVICES WILL BE PERFORMED ERROR-FREE OR UNINTERRUPTED, OR THAT OYATE WILL CORRECT ALL SAAS SERVICES ERRORS. CUSTOMER ACKNOWLEDGES THAT OYATE DOES NOT CONTROL THE TRANSFER OF DATA OVER COMMUNICATIONS FACILITIES, INCLUDING THE INTERNET, AND THAT THE SAAS SERVICE MAY BE SUBJECT TO LIMITATIONS, DELAYS, AND OTHER PROBLEMS INHERENT IN THE USE OF SUCH COMMUNICATIONS FACILITIES.THIS SECTION SETS FORTH THE SOLE AND EXCLUSIVE WARRANTY GIVEN BY OYATE (EXPRESS OR IMPLIED) WITH RESPECT TO THE SUBJECT MATTER OF THIS AGREEMENT. NEITHER OYATE NOR ANY OF ITS LICENSORS OR OTHER SUPPLIERS WARRANT OR GUARANTEE THAT THE OPERATION OF THE SUBSCRIPTION SERVICE WILL BE UNINTERRUPTED, VIRUS-FREE OR ERROR-FREE, NOR SHALL OYATE OR ANY OF ITS SERVICE PROVIDERS BE LIABLE FOR UNAUTHORIZED ALTERATION, THEFT OR DESTRUCTION OF CUSTOMER’S OR ANY USER’S DATA, FILES, OR PROGRAMS. 

9. LIMITATIONS OF LIABILITY 

NEITHER PARTY (NOR ANY LICENSOR OR OTHER SUPPLIER OF OYATE) SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOST BUSINESS, PROFITS, DATA OR USE OF ANY SERVICE, INCURRED BY EITHER PARTY OR ANY THIRD PARTY IN CONNECTION WITH THIS SAAS AGREEMENT, REGARDLESS OF THE NATURE OF THE CLAIM (INCLUDING NEGLIGENCE), EVEN IF FORESEEABLE OR THE OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.  NEITHER PARTY’S AGGREGATE LIABILITY FOR DAMAGES UNDER THIS SAAS AGREEMENT, REGARDLESS OF THE NATURE OF THE CLAIM (INCLUDING NEGLIGENCE), SHALL EXCEED THE FEES PAID OR PAYABLE BY CUSTOMER UNDER THIS SAAS AGREEMENT DURING THE 12 MONTHS PRECEDING THE DATE THE CLAIM AROSE.  The foregoing limitations shall not apply to the parties’ obligations (or any breach thereof) under Sections entitled “Restriction”, “Indemnification”, or “Confidentiality”. 

10. INDEMNIFICATION 

10.1 Indemnification by OYATE.  If a third party makes a claim against Customer that the SaaS Services infringes any patent, copyright or trademark, or misappropriates any trade secret, or that OYATE’s negligence or willful misconduct has caused bodily injury or death, OYATE shall defend Customer and its directors, officers and employees against the claim at OYATE’s expense and OYATE shall pay all losses, damages and expenses (including reasonable attorneys’ fees) finally awarded against such parties or agreed to in a written settlement agreement signed by OYATE, to the extent arising from the claim.  OYATE shall have no liability for any claim based on (a) the Customer Content, (b) modification of the SaaS Services not authorized by OYATE, or (c) use of the SaaS Services other than in accordance with the Documentation and this SaaS Agreement.  OYATE may, at its sole option and expense, procure for Customer the right to continue use of the SaaS Services, modify the SaaS Services in a manner that does not materially impair the functionality, or terminate the Subscription Term and repay to Customer any amount paid by Customer with respect to the Subscription Term following the termination date. 
10.2 Indemnification by Customer.  If a third party makes a claim against OYATE that the Customer Content infringes any patent, copyright or trademark, or misappropriates any trade secret, Customer shall defend OYATE and its directors, officers and employees against the claim at Customer’s expense and Customer shall pay all losses, damages and expenses (including reasonable attorneys’ fees) finally awarded against such parties or agreed to in a written settlement agreement signed by Customer, to the extent arising from the claim. 
10.3 Conditions for Indemnification.  A party seeking indemnification under this section shall (a) promptly notify the other party of the claim, (b) give the other party sole control of the defense and settlement of the claim, and (c) provide, at the other party’s expense for out-of-pocket expenses, the assistance, information and authority reasonably requested by the other party in the defense and settlement of the claim.   

11. CONFIDENTIALITY 

11.1 Definition.  “Confidential Information” means any information disclosed by a party to the other party, directly or indirectly, which, (a) if in written, graphic, machine-readable or other tangible form, is marked as “confidential” or “proprietary,” (b) if disclosed orally or by demonstration, is identified at the time of initial disclosure as confidential and is confirmed in writing to the receiving party to be “confidential” or “proprietary” within 30 days of such disclosure, (c) is specifically deemed to be confidential by the terms of this SaaS Agreement, or (d) reasonably appears to be confidential or proprietary because of the circumstances of disclosure and the nature of the information itself.  Confidential Information will also include information disclosed by third parties to a disclosing party under an obligation of confidentiality.  Subject to the display of Customer Content as contemplated by this SaaS Agreement, Customer Content is deemed Confidential Information of Customer.  OYATE software and Documentation are deemed Confidential Information of OYATE. 
11.2 Confidentiality.  During the term of this SaaS Agreement and for 5 years thereafter (perpetually in the case of software), each party shall treat as confidential all Confidential Information of the other party, shall not use such Confidential Information except to exercise its rights and perform its obligations under this SaaS Agreement, and shall not disclose such Confidential Information to any third party.  Without limiting the foregoing, each party 
shall use at least the same degree of care, but not less than a reasonable degree of care, it uses to prevent the disclosure of its own confidential information to prevent the disclosure of Confidential Information of the other party.  Each party shall promptly notify the other party of any actual or suspected misuse or unauthorized disclosure of the other party’s Confidential Information.  Neither party shall reverse engineer, disassemble or decompile any prototypes, software or other tangible objects which embody the other party's Confidential Information and which are provided to the party hereunder.  Each party may disclose Confidential Information of the other party on a need-to-know basis to its contractors who are subject to confidentiality agreements requiring them to maintain such information in confidence and use it only to facilitate the performance of their services on behalf of the receiving party. 
11.3 Exceptions.  Confidential Information excludes information that: (a) is known publicly at the time of the disclosure or becomes known publicly after disclosure through no fault of the receiving party, (b) is known to the receiving party, without restriction, at the time of disclosure or becomes known to the receiving party, without restriction, from a source other than the disclosing party not bound by confidentiality obligations to the disclosing party, or (c) is independently developed by the receiving party without use of the Confidential Information as demonstrated by the written records of the receiving party.  The receiving party may disclose Confidential Information of the other party to the extent such disclosure is required by law or order of a court or other governmental authority, provided that the receiving party shall use reasonable efforts to promptly notify the other party prior to such disclosure to enable the disclosing party to seek a protective order or otherwise prevent or restrict such disclosure.  Each party may disclose the existence of this SaaS Agreement and the relationship of the parties, but agrees that the specific terms of this SaaS Agreement will be treated as Confidential Information; provided, however, that each party may disclose the terms of this SaaS Agreement to those with a need to know and under a duty of confidentiality such as accountants, lawyers, bankers and investors. 

12. GENERAL PROVISIONS 

12.1 Non-Exclusive Service.  Customer acknowledges that SaaS Services is provided on a non-exclusive basis.  Nothing shall be deemed to prevent or restrict OYATE’s ability to provide the SaaS Services or other technology, including any features or functionality first developed for Customer, to other parties.   
12.2 Personal Data.  Customer hereby acknowledges and agrees that OYATE’s performance of this SaaS Agreement may require OYATE to process, transmit and/or store Customer personal data or the personal data of Customer employees and Affiliates. By submitting personal data to OYATE, Customer agrees that OYATE and its Affiliates may process, transmit and/or store personal data only to the extent necessary for, and for the sole purpose of, enabling OYATE to perform its obligations to under this SaaS Agreement.  In relation to all Personal Data provided by or through Customer to OYATE, Customer will be responsible as sole Data Controller for complying with all applicable data protection or similar laws such as EU Directive 95/46/EC and laws implementing that Directive that regulate the processing of Personal Data and special categories of data as such terms are defined in that Directive. Customer agrees to obtain all necessary consents and make all necessary disclosures before including Personal Data in Content and using the Enabling Software and OYATE SaaS. Customer confirms that Customer is solely responsible for any Personal Data that may be contained in Content, including any information which any OYATE SaaS User shares with third parties on Customer’s behalf. Customer is solely responsible for determining the purposes and means of processing Customer Personal Data by OYATE under this Agreement, including that such processing according to Customer’s instructions will not place OYATE in breach of applicable data protection laws. Prior to processing, Customer will inform OYATE about any special categories of data contained within Customer Personal Data and any restrictions or special requirements in the processing of such special categories of data, including any cross border transfer restrictions. Customer is responsible for ensuring that the OYATE SaaS meets such restrictions or special requirements. OYATE to process any Personal Data that meets the requirements set forth in this Section according to these Terms of Use. 
12.3 OYATE Personal Data Obligations.  In performing the SaaS Services, OYATE will comply with the OYATE Services Privacy Policy, which is available at http://www.oyate.iai/privacy-policy and incorporated herein by reference. The OYATE Services Privacy Policy is subject to change at OYATE’s discretion; however, OYATE policy changes will not result in a material reduction in the level of protection provided for Customer data during the period for which fees for the services have been paid. The services policies referenced in this SaaS Agreement specify our respective responsibilities for maintaining the security of Customer data in connection with the SaaS Services. OYATE reserves the right to provide the SaaS Services from Host locations, and/or through use of subcontractors, worldwide. OYATE subscribes to the United States/European Union Safe Harbor Principles, and as a result, appears on the U.S. Department of Commerce Safe Harbor list (available at http://www.export.gov/safeharbor) as of the effective date of this SaaS Agreement. OYATE’s Safe Harbor certification specifically includes OYATE’s performance of services for customer provided personal information.  OYATE will only process Customer Personal Data in a manner that is reasonably necessary to provide SaaS Services and only for that purpose. OYATE will only process Customer Personal Data in delivering OYATE SaaS.  Customer agrees to provide any notices and obtain any consent related to OYATE’s use of the data for provisioning the SaaS Services, including those related to the collection, use, processing, transfer and disclosure of personal information.  Customer shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness and retains ownership of all of Customer data. 
12.4 Assignment.  Neither party may assign this SaaS Agreement or any right under this SaaS Agreement, without the consent of the other party, which consent shall not be unreasonably withheld or delayed; provided however, that either party may assign this SaaS Agreement to an acquirer of all or substantially all of the business of such party to which this SaaS Agreement relates, whether by merger, asset sale or otherwise.  This SaaS Agreement shall be binding upon and inure to the benefit of the parties’ successors and permitted assigns.  Either party may employ subcontractors in performing its duties under this SaaS Agreement, provided, however, that such party shall not be relieved of any obligation under this SaaS Agreement. 
12.5 Notices.  Except as otherwise permitted in this SaaS Agreement, notices under this SaaS Agreement shall be in writing and shall be deemed to have been given (a) five (5) business days after mailing if sent by registered or certified U.S. mail, (b) when transmitted if sent by facsimile, provided that a copy of the notice is promptly sent by another means specified in this section, or (c) when delivered if delivered personally or sent by express courier service.  All notices shall be sent to the other party at the address set forth on the cover page of this SaaS Agreement. 
12.6 Force Majeure.  Each party will be excused from performance for any period during which, and to the extent that, such party or any subcontractor is prevented from performing any obligation or Service, in whole or in part, as a result of causes beyond its reasonable control, and without its fault or negligence, including without limitation, acts of God, strikes, lockouts, riots, acts of terrorism or war, epidemics, communication line failures, and power failures. 
12.7 Waiver.  No waiver shall be effective unless it is in writing and signed by the waiving party.  The waiver by either party of any breach of this SaaS Agreement shall not constitute a waiver of any other or subsequent breach. 
12.8 Severability.  If any term of this SaaS Agreement is held to be invalid or unenforceable, that term shall be reformed to achieve as nearly as possible the same effect as the original term, and the remainder of this SaaS Agreement shall remain in full force. 
12.9 Entire SaaS Agreement.  This SaaS Agreement (including all Schedules and exhibits) contains the entire agreement of the parties and supersedes all previous oral and written communications by the parties, concerning the subject matter of this SaaS Agreement.  This SaaS Agreement may be amended solely in a writing signed by both parties.  Standard or printed terms contained in any purchase order or sales confirmation are deemed rejected and shall be void unless specifically accepted in writing by the party against whom their enforcement is sought; mere commencement of work or payment against such forms shall not be deemed acceptance of the terms. 
12.10 Survival.  Sections 3, 6, and 8 through 12 of this SaaS Agreement shall survive the expiration or termination of this SaaS Agreement for any reason. 
12.11 Publicity.  OYATE may include Customer’s name and logo in its customer lists and on its website.  Upon signing, OYATE may issue a high-level press release announcing the relationship and the manner in which Customer will use the OYATE solution.  OYATE shall coordinate its efforts with appropriate communications personnel in Customer’s organization to secure approval of the press release if necessary. 
12.12 Export Regulations.  Export laws and regulations of the United States and any other relevant local export laws and regulations apply to the SaaS Services.  Customer agrees that such export control laws govern its use of the SaaS Services (including technical data) and any services deliverables provided under this Agreement, and Customer agrees to comply with all such export laws and regulations. Customer agrees that no data, information, software programs and/or materials resulting from services (or direct product thereof) will be exported, directly or indirectly, in violation of these laws.   
12.13 No Third Party Beneficiaries.  This SaaS Agreement is an agreement between the parties, and confers no rights upon either party’s employees, agents, contractors, partners of customers or upon any other person or entity. 
12.14 Independent Contractor. The parties have the status of independent contractors, and nothing in this SaaS Agreement nor the conduct of the parties will be deemed to place the parties in any other relationship.  Except as provided in this SaaS Agreement, neither party shall be responsible for the acts or omissions of the other party or the other party’s personnel.   
12.15 Statistical Information.   OYATE may anonymously compile statistical information related to the performance of the Services for purposes of improving the SaaS service, provided that such information does not identify Customer’s data or include Customer’s name. 
12.16 Governing Law.  This SaaS Agreement shall be governed by the laws of the State of Nevada, excluding its conflict of law principles.  The United Nations Convention on Contracts for the International Sale of Goods shall not apply.   
12.17 Compliance with Laws.  OYATE shall comply with all applicable local, state, national and foreign laws in connection with its delivery of the SaaS Services, including those laws related to data privacy, international communications, and the transmission of technical or personal data 
12.18 Dispute Resolution.  Customer’s satisfaction is an important objective to OYATE in performing its obligations under this SaaS Agreement.  Except with respect to intellectual property rights, if a dispute arises between the parties relating to the interpretation or performance of this SaaS Agreement or the grounds for the termination hereof, the parties agree to hold a meeting within fifteen (15) days of written request by either party, attended by individuals with decision-making authority, regarding the dispute, to attempt in good faith to negotiate a resolution of the dispute prior to pursuing other available remedies.  If, within 15 days after such meeting, the parties have not succeeded in resolving the dispute, either party may protect its interests by any lawful means available to it. 
12.19 Signatures.  This SaaS Agreement may be executed in multiple counterparts, each of which when executed will be an original, and all of which, when taken together, will constitute one agreement.  Delivery of an executed counterpart of a signature page of this SaaS Agreement by facsimile or other electronic transmission (including via pdf) will be effective as delivery of a manually executed counterpart. 

 
SOFTWARE & PRICE SCHEDULE 

This Schedule No. A-101 ("Schedule"), effective upon the Agreement Effective Date, documents the SaaS Services (defined below) being purchased by Customer under the terms and conditions of the SaaS Agreement, between OYATE LLC. (“OYATE”) and you (“Customer”).   
 
1. SaaS Services:   
The SaaS Service includes one or more of the following service offerings: 
 
   * Sign-On
   * Password Management 
   * Access Certification 
   * AI Service
 
2. Identity Cubes:   
 
OYATE’s hosted, internet-accessible, on-demand identity and access management services for OYATE’s SaaS Services for up to _______ Identity Cubes.
 
3. Subscription Term:   
  
The term begins upon the Schedule Effective Date and ends 99 year thereafter initial (“Subscription Term”).  
 
4. Schedule Value:  (all fees are in U.S. dollars and exclude applicable taxes) 
 
The total value of this Schedule is listed on the product page.  This fee includes access and usage of the SaaS Services during the Subscription Term for the defined number of Identity Cubes.  Upon execution of this Schedule, OYATE shall issue an invoice in accordance with the SaaS Agreement.   
 
If at any time during the Subscription Term or Renewal Term the Customer exceeds the number of Identity Cubes, Customer and OYATE agree to execute a follow-on schedule for the purchase of additional Identity Cubes.  Additional Identity Cubes access will be purchased in blocks of users and in accordance with the following fee.  The user fee will prorated for the remaining Subscription Term or Renewal Term. 
 
SaaS Offering 
	Number of Additional SaaS Identity Cubes  
	Additional Subscription Fee 
	Sign-On
	Password Management 
	Access Certification 
    AI Services

4. Customer Billing Information 
    Membership Site.
	 
5. Support and Maintenance Services 
 
Standard Support & Maintenance is included in the Subscription Fee.   
 
***End of Schedule***
 

EXHIBIT B 
 
Support and Maintenance Services  
 
1. Support and Maintenance Services. 

Support and Maintenance Services are included in the SaaS Service subscription in Exhibit A and entitles Customer to the following: 

1. Telephone or electronic support in order to help Customer locate and correct problems with the Software.  
2. Bug fixes and code corrections to correct Software malfunctions in order to bring such Software into substantial conformity with the operating specifications. 
3. All extensions, enhancements and other changes that OYATE, at its sole discretion, makes or adds to the Software and which OYATE furnishes, without charge, to all other Subscribers of the SaaS Service. 
4. Up to five (5) dedicated contacts designated by Customer in writing that will have access to support services. 
 
2. Response and Resolution Goals 

* “business hours” 8am-6pm CST,  Monday thru Friday, except holidays.   
* “Fix” means the repair or replacement of Software component to remedy Problem. 
* “Problem” means a defect in Software as defined in OYATE’s standard Software specification that significantly degrades such Software. 
* “Respond” means acknowledgement of Problem received containing assigned support engineer name, date and time assigned, and severity assignment. 
* “Workaround” means a change in the procedures followed or data supplied by Customer to avoid a Problem without substantially impairing Customer’s use of the Software.  
 
Problem Severity 
	Response Goals 
	Resolution Goals 
	1. The production system is creating a significant impact to the Customer’s business function preventing that function from being executed. OYATE will Respond within 2 business hours. Upon confirmation of receipt, a OYATE support personnel begins continuous work on the Problem, and a customer resource must be available at any time to assist with problem determination.  Customer Support will provide reasonable effort for Workaround or Fix within 24 hours, once the Problem is reproducible or once we have identified the Software defect. OYATE may incorporate Fix in future release of software. 
	2. The production system or application is moderately affected. There is no workaround currently available or the workaround is cumbersome to use. OYATE will Respond within 4 business hours. Customer Support will provide reasonable effort for Workaround or Fix within 7 business days, once the Problem is reproducible. OYATE may incorporate fix in future release of software. 
	3. The production system or application issue is not critical: no data has been lost, and the system has not failed.  The issue has been identified and does not hinder normal operation, or the situation may be temporarily circumvented using an available workaround. OYATE will Respond within 8 business hours. Customer Support will provide reasonable effort for Workaround or Fix within 10 business days, once the Problem is reproducible. OYATE may incorporate Fix in future release of software. 
	4. Non-critical issues, general questions, enhancement requests, or the functionality does not match documented specifications. OYATE will Respond within 24 business hours. Resolution of Problem may appear in future release of software. 
 
3. Accessing Support

Customer Support offers several ways to resolve any technical difficulties.  In addition to online help in the Software, which can be accessed by clicking the “Help” tab when logged into the Software, function-specific help information can also be accessed throughout the Software using the ‘?’ option. The online support center (www.OYATE.ai/support) is available 24x7 for self-service technical assistance including:  
* Downloading software updates and patches  
* Logging tickets and viewing status of previously submitted tickets  
* Viewing updates to supported platforms and hardware  
* Accessing product documentation, technical articles, and FAQs 
 
The support email address is support@OYATE.ai. The support phone number is 800/201-0601. 


EXHIBIT C 
 
SERVICE LEVEL AGREEMENT 

The SaaS Services will achieve System Availability (as defined below) of at least 99.9% during each calendar year of the Subscription Term.  All other SaaS Services will achieve System Availability (as defined below) of at least 99% during each calendar year of the Subscription Term.  “System Availability” means the number of minutes in a year that the key components of the SaaS Services are operational as a percentage of the total number of minutes in such year, excluding downtime resulting from (a) scheduled maintenance, (b) events of Force Majeure in the SaaS Agreement), 
(c) malicious attacks on the system, (d) issues associated with the Customer’s computing devices, local area networks or internet service provider connections, or (e) inability to deliver services because of acts or omissions of Customer or any Identity Cube user.  OYATE reserves the right to take the Service offline for scheduled maintenance for which Customer has been provided reasonable notice and OYATE reserves the right to change its maintenance window upon prior notice to Customer. 
 
If OYATE fails to meet System Availability in the year, upon written request by Customer within 30 days after the end of the year, OYATE will issue a credit in Customer’s next invoice in an amount equal to 1% of the yearly fee for the affected SaaS Services for each 1% loss of System Availability below stated SLA per SaaS Service, up to a maximum of the Customer’s fee for the affected SaaS Services.  If the yearly fee has been paid in advance, then at Customer’s election OYATE shall provide a credit to Customer to be used for additional Identity Cubes or term extension.  The remedy stated in this paragraph is Customer’s sole and exclusive remedy for interruption of SaaS Services and OYATE’s failure to meet System Availability. 
 
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

SoftwareAsServiceBox.propTypes = {
    classOption: PropTypes.string
};
SoftwareAsServiceBox.defaultProps = {
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default SoftwareAsServiceBox
