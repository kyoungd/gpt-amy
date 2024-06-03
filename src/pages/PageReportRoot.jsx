import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import axios from 'axios';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import ThreeDotWave from '../components/Work/ThreeDotWave';
import TablePagination from '../components/Table/TablePagination';
import { useNavigate } from 'react-router-dom';
import * as Sentry from "@sentry/react";

PageReportRoot.propTypes = {
    jwt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    apipath: PropTypes.string.isRequired,
    classOption: PropTypes.string,
    EditComponent: PropTypes.func,
    FilterDataFunc: PropTypes.func
};

PageReportRoot.defaultProps = {
    EditComponent: null,
    FilterDataFunc: null,
    subtitle: "",
    classOption: "section section-padding-t90 section-padding-bottom"
};

function PageReportRoot ({jwt, title, subtitle, apipath, EditComponent, FilterDataFunc, classOption}) {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [mode, setMode] = useState('list'); // ['list', 'edit', 'create']
    const [selectedRow, setSelectedRow] = useState('view'); // [id
    const [forceApiCall, setForceApiCall] = useState(true); // [id

    // Other useState hooks
    const navigate = useNavigate();
    
    const { isSuccess, isLoading, isError, error } = useQuery('report-samples', async () => {
        const baseUrl = process.env.REACT_APP_BACKEND_URL;
        const subscriptionUrl = process.env.REACT_APP_IS_SUBSCRIPTION_ACTIVE_URL;
        const url1 = `${baseUrl}/api/${subscriptionUrl}`;
        const url2 = `${baseUrl}/api/${apipath}`; // Make sure `apipath` is defined
    
        try {
            // Use Promise.all to run both requests in parallel
            const responses = await Promise.all([
                axios.get(url1, { headers: { 'Authorization': `Bearer ${jwt}` } }), // Ensure `jwt` is defined
                axios.get(url2, { headers: { 'Authorization': `Bearer ${jwt}` } })
            ].map(p => p.catch(e => e))); // Catch errors individually to prevent Promise.all from short-circuiting
    
            const response1 = responses[0];
            const response2 = responses[1];
    
            if (response1 instanceof Error) {
                console.error('Error with subscription check:', response1);
                throw new Error('Subscription check failed');
            }
    
            console.log('response1:', response1.data);
    
            // Check the subscription status from the first call
            if (response1.status !== 200 || !response1.data.data.attributes.is_subscription) {
                navigate('/service'); // Ensure `navigate` is available
                return; // Prevent further execution
            }
    
            if (response2 instanceof Error) {
                console.error('Error fetching report samples:', response2);
                throw response2; // Or handle it as needed
            }
    
            // Process and return `response2.data` assuming the subscription check passed and no errors
            return response2.data;
        } catch (error) {
            Sentry.captureException(error);
            // Handle any errors that occur during the API calls or processing
            console.error('An error occurred:', error);
            throw error; // Re-throw to let useQuery handle the error state
        }
    }, {
        enabled: !!forceApiCall, // Coerce forceApiCall to boolean to ensure the query runs only if true
        onSuccess: (data) => {
            // Assuming `data` is in the expected format, process it
            let rowData = data.data.map(item => ({ id: item.id, ...item.attributes }));
            let colData = Object.keys(rowData[0] || {}).map(key => ({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                key: key
            }));
    
            // Apply any filters if FilterDataFunc is defined
            if (FilterDataFunc) {
                const { filteredColumns, filteredRows } = FilterDataFunc(rowData, colData);
                colData = filteredColumns;
                rowData = filteredRows;
            }
    
            // Update state with the processed data
            setColumns(colData);
            setRows(rowData);
            setForceApiCall(false); // Reset to prevent re-fetching unless explicitly required
        },
        onError: (error) => {
            console.error('PageReportRoot: Failed to fetch report samples:', error);
            // Optionally, update state to reflect the error condition, e.g., showError(true);
        }
    });
    
    const asyncSaveNew = async (values) => {
        try {
            const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
            const url = `${baseUrl}/api/${apipath}`;
            const response = await axios.post(url, values, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            setForceApiCall(true);
            return response.data;
        } catch (error) {
            Sentry.captureException(error);
            // Handle or throw the error depending on your application's needs
            console.error('Error saving changes:', error);
            throw error;
        }
    };

    const asyncSaveUpdate = async (values) => {
        try {
            const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
            const url = `${baseUrl}/api/${apipath}/${values.id}`;
            const response = await axios.put(url, values, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            setForceApiCall(true);
            return response.data;
        } catch (error) {
            Sentry.captureException(error);
            // Handle or throw the error depending on your application's needs
            console.error('Error saving changes:', error);
            throw error;
        }
    };

    const toggleToEditMode = (id) => {
        setSelectedRow(id);
        setMode('edit');
    }

    const toggleToViewMode = () => {
        setSelectedRow(null);
        setMode('list');
    }

    const toggleToCreateMode = () => {
        setSelectedRow(null);
        setMode('create');
    }

    const formData = selectedRow && selectedRow >= 0 ? rows.find(item => item.id == selectedRow) : null;

    const blankValues = {
        id: null,
        phone_number: '',
        address: '',
        description: '',
        is_active: true,
        passcode: ''
    };

    return (
        <React.Fragment>
            <SEO title="2Human || Settings" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-five.jpg"
                title="Conversation History"
                content="Analytics"
                contentTwo="Conversation"
            />
            <div id="bot-container" className={`${classOption}`} >
                <div className="container">
                    <div className={`section section-padding-t90 section-padding-bottom ${classOption}`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1 style={{ textAlign: 'center', flexGrow: 1 }}>{title}</h1>
                        </div>
                        {
                            subtitle && subtitle.length > 0 && 
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6 style={{ textAlign: 'center', flexGrow: 1 }}>{subtitle}</h6>
                                </div>
                        }
                        <div className="container">
                        { isLoading && <ThreeDotWave /> }
                        { isError && <div>Error: { error.message } </div> }
                        { isSuccess 
                            && mode == 'list' 
                            && (<TablePagination 
                                    columns={columns} 
                                    rows={rows} 
                                    toggleToEditModeFunc={toggleToEditMode} /> ) }
                        { EditComponent && isSuccess 
                            && mode == 'edit' 
                            && (<EditComponent 
                                    data={formData} 
                                    toggleToViewModeFunc={toggleToViewMode}
                                    asyncSaveChangeFunc={asyncSaveUpdate} /> ) }
                        { EditComponent && isSuccess
                            && mode == 'create'
                            && (<EditComponent 
                                    data={blankValues} 
                                    toggleToViewModeFunc={toggleToViewMode}
                                    asyncSaveChangeFunc={asyncSaveNew} /> )
                        }
                        </div>
                    </div>
                    { !apipath.includes('messages') &&
                        isSuccess 
                        && mode == 'list' 
                        && (<div className="col-12 mb-6">
                                <button 
                                    onClick={() => toggleToCreateMode()}
                                    className="btn btn-primary btn-hover-secondary">New</button>
                            </div>) }
                </div>
            </div>
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default PageReportRoot;
