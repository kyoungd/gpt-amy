import React, {useState} from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteSubscription } from '../../utils/stripe-subscriptions';

const Subscriptions = ({ jwt, subscriptionsData}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState({id: '0', 'attributes': {name: '0', description: '0', price: '0', renewal_date: '0'}});

    const cancelSubscription = async () => {
        try {
            await deleteSubscription(jwt, selectedSubscription.id);

            setShowModal(false);
            window.location.reload(); // Refresh the page to show the updated list of subscriptions
        } catch (error) {
          console.error('Error cancelling subscription:', error);
        }
      };
    
    return (<>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Renewal Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody> {
                subscriptionsData.map((subscription) => (<tr key={
                    subscription.attributes.id
                }>
                    <td> {
                        subscription.attributes.name
                    }</td>
                    <td> {
                        subscription.attributes.description
                    }</td>
                    <td> {
                        subscription.attributes.price
                    }</td>
                    <td> {
                        new Date(subscription.attributes.renewal_date).toLocaleDateString()
                    }</td>
                    <td>
                        <Button variant="danger"
                            onClick={
                                () => {
                                    setSelectedSubscription(subscription);
                                    setShowModal(true);
                                }
                        }>
                            Cancel
                        </Button>
                    </td>
                </tr>))
            } </tbody>
        </Table>

        <Modal show={showModal}
            onHide={
                () => setShowModal(false)
        }>
            <Modal.Header closeButton>
                <Modal.Title>Cancel Subscription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to cancel the {
                selectedSubscription.attributes.name
            }
                subscription?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary"
                    onClick={
                        () => setShowModal(false)
                }>
                    Close
                </Button>
                <Button variant="danger"
                    onClick={ cancelSubscription }>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
};

Subscriptions.propTypes = {
    jwt: PropTypes.string.isRequired,
    subscriptionsData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        attributes: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            renewal_date: PropTypes.string.isRequired
        }).isRequired
    })).isRequired
};

export default Subscriptions;
