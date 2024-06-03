import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

    return (
        <React.Fragment>
            <Modal show={showDialog} onHide={handleCancel}>
                <Modal.Header>
                    <Modal.Title>Add New Question/Answer</Modal.Title>
                    <Button variant="secondary" onClick={handleCancel}>X</Button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="question">
                            <Form.Label>Question</Form.Label>
                            <Form.Control type="text" value={question} onChange={e => setQuestion(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="answer">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control type="text" value={answer} onChange={e => setAnswer(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

NewQuestionAnswer.propTypes = {
    asyncSaveUpdate: PropTypes.func.isRequired,
    showDialog: PropTypes.bool.isRequired,
    setShowDialog: PropTypes.func.isRequired,
};

export default NewQuestionAnswer;
