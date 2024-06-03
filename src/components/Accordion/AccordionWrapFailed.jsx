import React from 'react';
import Accordion, { AccordionItem, AccordionTitle, AccordionContent } from ".";

const AccordionWrapFailed = () => {
    return (
        <div className="agency-accordion max-mb-n30">
            <Accordion>
                <AccordionItem id="one">
                    <AccordionTitle id="one">Why did transaction failed?</AccordionTitle>
                    <AccordionContent id="one">The banks are bound by strict security measures, and as a result, they are unable to disclose the reason for the transaction failure. We recommend that you check with your issuer to determine the cause of the issue.</AccordionContent>
                </AccordionItem>
                <AccordionItem id="two">
                    <AccordionTitle id="two">Can I try it again?</AccordionTitle>
                    <AccordionContent id="two">Certainly. We encourage you to attempt the purchase again. There is no harm in trying, and we hope the transaction is successful this time.</AccordionContent>
                </AccordionItem>
                <AccordionItem id="three">
                    <AccordionTitle id="three">How do I see the installation status?</AccordionTitle>
                    <AccordionContent id="one">Checkout the <strong>Account</strong> menu. Here, you will find a newly added sub-menu item called <strong>Installation,</strong> which will display your new AI Service. To check the current status of your AI integration, simply click on it. </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default AccordionWrapFailed;
