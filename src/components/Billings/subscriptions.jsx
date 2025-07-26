import React, {useState} from 'react';
import { Button } from '../ui/button';
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
        <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
                <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Renewal Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                </tr>
            </thead>
            <tbody> {
                subscriptionsData.map((subscription) => (<tr key={
                    subscription.attributes.id
                } className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2"> {
                        subscription.attributes.name
                    }</td>
                    <td className="border border-gray-300 px-4 py-2"> {
                        subscription.attributes.description
                    }</td>
                    <td className="border border-gray-300 px-4 py-2"> {
                        subscription.attributes.price
                    }</td>
                    <td className="border border-gray-300 px-4 py-2"> {
                        new Date(subscription.attributes.renewal_date).toLocaleDateString()
                    }</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <Button variant="destructive"
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
        </table>

        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Cancel Subscription</h2>
                        <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>×</Button>
                    </div>
                    <div className="mb-6">
                        Are you sure you want to cancel the {
                        selectedSubscription.attributes.name
                    }
                        subscription?
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="secondary"
                            onClick={
                                () => setShowModal(false)
                        }>
                            Close
                        </Button>
                        <Button variant="destructive"
                            onClick={ cancelSubscription }>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        )}
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
