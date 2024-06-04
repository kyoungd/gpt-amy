import PropTypes from "prop-types";
import SectionTitle from '../../components/SectionTitles/SectionTitle.jsx';
import GetStartedPhoneNumber from './GetStartedPhoneNumber';
import GetStartedChatbot from "./GetStartedChatbot";
import GetStartedQuestionsAnswers from "./GetStartedQuestionsAnswers";
import GetStartedBlock from "./GetStartedBlock";

const GetStartedStartup = ({ jwt, showBlockName, classOption }) => {
    return (
        <div className={`${classOption}`}>
            <div className="container">

                <SectionTitle
                    headingOption="fz-32"
                    title="Get Started"
                    subTitle="For more details, ask AMY at the top right."
                />

                <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb-n6 icon-box-shape-animation">
                    {
                        ['all', 'chatbot'].includes(showBlockName) && <GetStartedBlock 
                            jwt={jwt} 
                            name="CHATBOT - add this script to your website" 
                            Service={GetStartedChatbot} 
                            description="If you prefer, request an appointment to speak with our engineer at support@saracoti.com."
                            classOption="section section-padding-bottom" 
                        />
                    }
                    {
                        ['all', 'phone'].includes(showBlockName) && <GetStartedBlock 
                            jwt={jwt} 
                            name="PHONE - select a phone number" 
                            Service={GetStartedPhoneNumber} 
                            description="If you prefer, request an appointment to speak with our engineer at support@saracoti.com."
                            classOption="section section-padding-bottom" 
                        />
                    }
                    {
                        ['all', 'qa'].includes(showBlockName) && <GetStartedBlock 
                            jwt={jwt} 
                            name="UNANSWERED - unanswered questions" 
                            Service={GetStartedQuestionsAnswers} 
                            classOption="section section-padding-bottom" 
                        />
                    }
                </div>

            </div>
        </div>
    )
}

GetStartedStartup.propTypes = {
    jwt: PropTypes.string.isRequired,
    showBlockName: PropTypes.string,
    classOption: PropTypes.string
};
GetStartedStartup.defaultProps = {
    showBlockName: "all",
    classOption: "section section-padding-t90 section-padding-bottom"
};

export default GetStartedStartup
