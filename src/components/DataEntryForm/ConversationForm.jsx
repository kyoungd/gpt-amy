import React from 'react';
import PropTypes from 'prop-types';
import { TableContainer, Table, TableRow, TableCell, TableHeader } from '../Table/TableComponents';

ConversationForm.propTypes = {
    data: PropTypes.object.isRequired,
    toggleToViewModeFunc: PropTypes.func.isRequired,
    asyncSaveChangeFunc: PropTypes.func
};

function ConversationForm({ data, toggleToViewModeFunc, asyncSaveChangeFunc }) {
    const conversation = data.transcript;
    return (
        <React.Fragment>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h1>ConversationForm</h1>
                <TableContainer>
                    <Table>
                        <thead>
                            <TableRow>
                                <TableHeader key="role">Role</TableHeader>
                                <TableHeader key="content">Content</TableHeader>
                            </TableRow>
                        </thead>
                        <tbody>
                            {conversation.filter(msg => msg.role !== 'system').map((msg, index) => (
                                <TableRow key={index}>
                                    <TableCell key={`role-${index}`}>{msg.role}</TableCell>
                                    <TableCell key={`content-${index}`}>{msg.content}</TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>
                <button  
                  className="btn btn-secondary btn-hover-secondary"
                  onClick={toggleToViewModeFunc} 
                  style={{ margin: '10px' }} >
                  Cancel
                </button>
            </div>
        </React.Fragment>    
    );
}

export default ConversationForm;

// test_data = [
//     {
//         "role": "system",
//         "content": "Keep your reply professional and short. Just reply to the question if asked. Remove any questions from reply."
//     },
//     {
//         "role": "assistant",
//         "content": "Hi. You reached saracoti AI, and I am Amy.  How can I help you today?"
//     },
//     {
//         "role": "user",
//         "content": "Hi Amy.  How are you doing?"
//     },
//     {
//         "role": "system",
//         "content": "As an AI receptionist for a startup, your role involves interacting with potential investors and customers. Your responses should be derived exclusively from the provided conversation. Ensure that your answers are both truthful and factual, as you are representing the company and false information could be detrimental. If a question pertains to the company but the answer is not available in the conversation, respond with, 'I do not have that information, but if you like, I can have someone call you back.' For questions unrelated to the company, continue the conversation in an engaging manner. Remember to keep your answers concise, under 50 words."
//     },
//     {
//         "role": "assistant",
//         "content": "Hello! As an AI, I don't have feelings, but I'm here and ready to assist you. Feel free to ask me any question about Saracoti AI"
//     },
//     {
//         "role": "user",
//         "content": "How do you plan to grow the company?"
//     },
//     {
//         "role": "assistant",
//         "content": "Our growth strategy includes continuous innovation, targeted marketing campaigns, customer satisfaction, and strategic partnerships. We aim to maintain and grow market share by staying technologically ahead, engaging in digital advertising, and fostering customer advocacy."
//     }
// ];
