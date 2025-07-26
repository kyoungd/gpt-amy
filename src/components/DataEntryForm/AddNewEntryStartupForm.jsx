import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';

function NewQuestionAnswer({ asyncSaveUpdate, showDialog, setShowDialog }) {
    // other state variables...

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSave = () => {
        asyncSaveUpdate(0, question, answer, 'customized', true);
        setShowDialog(false);
    }

    const handleCancel = () => {
        setShowDialog(false);
    }

    if (!showDialog) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add New Question/Answer</h2>
                    <Button variant="ghost" size="sm" onClick={handleCancel}>×</Button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="question" className="block text-sm font-medium mb-1">Question</label>
                        <input 
                            id="question"
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={question} 
                            onChange={e => setQuestion(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="answer" className="block text-sm font-medium mb-1">Answer</label>
                        <input 
                            id="answer"
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={answer} 
                            onChange={e => setAnswer(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="default" onClick={handleSave}>Save</Button>
                </div>
            </div>
        </div>
    );
}

NewQuestionAnswer.propTypes = {
    asyncSaveUpdate: PropTypes.func.isRequired,
    showDialog: PropTypes.bool.isRequired,
    setShowDialog: PropTypes.func.isRequired,
};

export default NewQuestionAnswer;
