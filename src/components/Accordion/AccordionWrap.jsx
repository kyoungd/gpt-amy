import React from 'react';
import Accordion, { AccordionItem, AccordionTitle, AccordionContent } from "../Accordion";
import { Link } from 'react-router-dom';

const AccordionWrap = () => {
    return (
        <div className="agency-accordion max-mb-n30">
            <Accordion>
                <AccordionItem id="one">
                    <AccordionTitle id="one">How do I launch my AI?</AccordionTitle>
                    <AccordionContent id="one">
                        <p>Our AI system is trained using a set of Question/Answer pairs. We have compiled a list of questions frequently asked by investors and early customers for this purpose. </p>
                        <ul>
                            <li>To facilitate training, please upload your business documents to our website. This can include your business plan or the URL of your website. Our AI will extract the necessary information from these documents.</li>
                            <li><Link to="/setup/qa" className="text-decoration-underline">Click here</Link> to review any questions not covered by the documents. You can provide answers manually; otherwise, the AI will inform the caller that it cannot answer their question.</li>
                            <li>Integrate our chatbot into your website by <Link to="/setup/chatbot" className="text-decoration-underline">clicking here</Link>.</li>
                            <li>Select a phone number for your company at <Link to="/setup/phone" className="text-decoration-underline">here</Link>.</li>
                            <li>If you want help from our engineering team, please make a request <Link to="/contact" className="text-decoration-underline">here</Link>.  We will set up a 30-minute appointment to help you set up.</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="two">
                    <AccordionTitle id="two">Need Live Support?</AccordionTitle>
                    <AccordionContent id="two">
                        If you prefer, you can make an appointment with our engineer through email at support@oyate.ai.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="three">
                    <AccordionTitle id="three">How Long Does AI Training Take?</AccordionTitle>
                    <AccordionContent id="one">
                        It usually takes about 10 minutes to teach the AI. You just need to give it some questions and answers, and it will learn all about what you need. It is like giving it a quick lesson that is just for you.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default AccordionWrap;
