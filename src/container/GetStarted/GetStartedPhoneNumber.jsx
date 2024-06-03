import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReportRoot from '../../pages/ReportRoot';
import NoEditForm from '../../components/DataEntryForm/NoEditForm';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';
import PopupConfirmation from './PopupConfirmation';
import * as Sentry from "@sentry/react";

const fetchAvailablePhoneNumbers = async (jwt, url, setSelectedPhoneNumber) => {
    try {
        // Perform the GET request with axios
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${jwt}`, // Assuming JWT token is used for authentication
            },
        });

        // Parse the response
        if (response.data && response.data.data && response.data.data.length === 1) {
            // Assuming the response is an array and checking the first item's availability
            const firstItem = response.data.data[0].attributes;
            if (!firstItem.is_available) {
                // If the phone number is available, update the state
                setSelectedPhoneNumber('phone number in use: ' + firstItem.phoneNumber);
            }
        }
    } catch (error) {
        Sentry.captureException(error);
        // Handle potential errors
        console.error('Error fetching phone numbers:', error);
        // Optionally update the state to indicate an error or notify the user
    }
}


const purchasePhoneNumber = async (jwt, url, phone_number) => {
    try {
        const jsonBody = {
            "phoneNumber": phone_number,
            "voiceUrl": "https://talkee.ngrok.io"
        };
        const response = await axios.post(url, jsonBody, {
            headers: {
                Authorization: `Bearer ${jwt}`, // Assuming JWT token is used for authentication
            },
        });
        return response.data;
    } catch (error) {
        Sentry.captureException(error);
        console.error('Error purchasing phone numbers:', error);
        throw error; // Or handle it more gracefully
    }
}

const GetStartedPhoneNumber = ({jwt}) => {
    const [areaCode, setAreaCode] = useState('');
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
    const [hasSelectedPhone, setHasSelectedPhone] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [buyPhoneNumber, setBuyPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Added for error message handling

    const baseApiPath = 'subscriptions/available-phone-number';
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetch available phone numbers...' + hasSelectedPhone);
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/${baseApiPath}`;
            await fetchAvailablePhoneNumbers(jwt, url, setSelectedPhoneNumber);
        };
    
        fetchData();
    }, [hasSelectedPhone]); 

    useEffect(() => {
        let timer;
        if (errorMessage) {
            timer = setTimeout(() => {
                setErrorMessage(''); // Reset the error message after 5 seconds
            }, 5000);
        }
        return () => clearTimeout(timer); // Cleanup the timer
    }, [errorMessage]);

    const handleChange = (e) => {
        setAreaCode(e.target.value);
    }
    
    const IsThreeDigitString = (str) => {
        return /^[0-9]{3}$/.test(str);
    }

    const filterFunc = (rows, columns) => {
        try {
            const filtered_columns = [
                { key: 'id', name: 'id' }, 
                { key: 'phone_number', name: 'phone number' }, 
                { key: 'friendly_name', name: 'friendly name' }, 
                { key: 'is_buy_it', name: 'buy it' },
            ];
            const filtered_rows = rows.map((row, index) => {
                return { id: index, phone_number: row.phoneNumber, friendly_name: row.friendlyName, is_buy_it: false };
            });
            return { filteredRows: filtered_rows, filteredColumns: filtered_columns };
        }
        catch (error) {
            Sentry.captureException(error);
            console.log(error);
            return { rows, columns };
        }
    }
    
    const onCheckBoxChange = async (row) => {
        setBuyPhoneNumber(row.phone_number);
        setShowConfirmation(true);
    };

    return (
        <>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {selectedPhoneNumber.length > 0 && 
                <FormControl
                    type="text"
                    placeholder="Search Area Code"
                    defaultValue={selectedPhoneNumber}
                    readOnly
                />
            }
            {selectedPhoneNumber.length === 0 && 
                <>
                    <FormControl
                        type="text"
                        placeholder="Search Area Code"
                        value={areaCode}
                        onChange={handleChange}
                    />
                    {IsThreeDigitString(areaCode) && 
                        <>
                            <PopupConfirmation
                                show={showConfirmation}
                                onHide={() => setShowConfirmation(false)}
                                displayString={"Do you want to use the number " + buyPhoneNumber + "?"}
                                onConfirm={() => {
                                    console.log('confirmed');
                                    setShowConfirmation(false);
                                    const url = `${process.env.REACT_APP_BACKEND_URL}/api/${baseApiPath}`;
                                    purchasePhoneNumber(jwt, url, buyPhoneNumber)
                                        .then(result => {
                                            console.log('phone number purchased');
                                            console.log(result);
                                            setHasSelectedPhone(true);
                                        })
                                        .catch(e => {
                                            console.log('phone number purchase failed.');
                                            console.error(e);
                                            setErrorMessage('Failed to purchase phone number. Please try again.'); // Show error message on failure
                                        });                                
                                }}
                            />

                            <ReportRoot
                                jwt={jwt}
                                title=""
                                apipath={`${baseApiPath}?areaCode=${areaCode}`}
                                EditComponent={NoEditForm}
                                FilterDataFunc={filterFunc}
                                classOption="section section-padding-t10 section-padding-bottom"
                                CheckBoxChangeFunc={onCheckBoxChange}
                            /> 
                        </>
                    }
                </>
            }
        </>
    );
}

GetStartedPhoneNumber.propTypes = {
    jwt : PropTypes.string.isRequired
};
  
export default GetStartedPhoneNumber;
