import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import _ from 'lodash';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import ThreeDotWave from '../components/Work/ThreeDotWave';
import Button from 'react-bootstrap/Button';
import NewQuestionAnswer from '../components/DataEntryForm/AddNewEntryStartupForm';
import { useNavigate } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import Form from 'react-bootstrap/Form';

StartupRoot.propTypes = {
    jwt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    pageTypes: PropTypes.arrayOf(PropTypes.string.isRequired),
    apipath: PropTypes.string.isRequired,
    classOption: PropTypes.string,
    EditComponent: PropTypes.func.isRequired,
    FilterDataFunc: PropTypes.func
};

StartupRoot.defaultProps = {
    FilterDataFunc: null,
    subtitle: "",
    classOption: "section section-padding-t90 section-padding-bottom"
};

function StartupRoot ({jwt, title, subtitle, apipath, pageTypes, EditComponent, FilterDataFunc, classOption}) {
    const [rows, setRows] = useState([]);
    const [mode, setMode] = useState('edit'); // ['list', 'edit', 'create']
    const [showNewQuestionAnswer, setShowNewQuestionAnswer] = useState(false);
    // UNANSWERED QUESTIONS ? true : false
    const [showUnansweredQA, setShowUnansweredQA] = useState(pageTypes.length > 1 ? true : false);

    const navigate = useNavigate(); // Add this line to instantiate useNavigate
    const queryClient = useQueryClient(); // Use useQueryClient to get the queryClient instance

    const sanitizeString = (str) => {
        // Replace any non-alphanumeric character with a hyphen
        let sanitized = str.replace(/[^a-zA-Z0-9]/g, '-');
        // Replace multiple consecutive hyphens with a single hyphen
        sanitized = sanitized.replace(/-+/g, '-');
        return sanitized;
    }

    const useQueryName = `query-${sanitizeString(title)}`;

    const { isSuccess, isLoading, isError, error } = useQuery(useQueryName, async () => {
        console.log('refreshing StartupRoot: startup_root_form');
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
    
            // print current date and time
            // console.log(new Date().toString());
            // console.log('response1:', JSON.stringify(response1.data, null, 4));
            // console.log('response2:', JSON.stringify(response2.data, null, 4));
    

            if (response1 instanceof Error) {
                console.error('Error with subscription check:', response1);
                throw new Error('Subscription check failed');
            }
    
            // Check the subscription status from the first call
            if (response1.status !== 200 || !response1.data.data.attributes.is_subscription) {
                navigate('/service'); // Ensure `navigate` is available
                return; // Prevent further execution
            }
    
            if (response2 instanceof Error) {
                console.error('Error fetching startup_root_form:', response2);
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
        // enabled: !!forceApiCall, // Coerce forceApiCall to boolean to ensure the query runs only if true
        onSuccess: (data) => {
            if (!data?.data || data.data.length <= 0) {
                setRows([]);
                setMode('edit');
                setShowNewQuestionAnswer(false);
                return; // Exit the function early if there's no data
            }
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
            setRows(rowData);
        },
        onError: (error) => {
            console.error('StartupRoot: Failed to fetch report samples:', error);
            // Optionally, update state to reflect the error condition, e.g., showError(true);
        }
    });

    const getMenuSubMenu = (title) => {
        switch(title) {
            case 'UNANSWERED QUESTIONS':
                return (['Train AI', 'Unanswered Questions']);
            case 'INVESTOR QUESTIONS':
                return ['Train AI', 'Investor Questions'];
            case 'CUSTOMER QUESTIONS':
                return ['Train AI', 'Customer Questions'];
            case 'CUSTOMIZED QUESTIONS':
                return ['Train AI', 'Customized Questions'];
            default:
                return ['Home', ''];
        }
    }

    const makeValidJsonString = (stringData) => {
        const placeholderPrefix = "PLACEHOLDER_";
        let counter = 0;
        const placeholders = {};
    
        // Function to replace URLs and emails with placeholders
        const replaceWithPlaceholder = (match) => {
            const placeholder = `${placeholderPrefix}${counter++}`;
            placeholders[placeholder] = match;
            return placeholder;
        };
    
        // Identify and replace URLs and emails with placeholders
        stringData = stringData.replace(/(https?:\/\/[^\s]+)/g, replaceWithPlaceholder)
                               .replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g, replaceWithPlaceholder);
    
        // Sanitize the string, preserving specified characters
        let sanitizedString = stringData.replace(/[^a-zA-Z0-9 _\-.,'?!]/g, '');
    
        // Restore URLs and emails from placeholders
        sanitizedString = sanitizedString.replace(new RegExp(`${placeholderPrefix}(\\d+)`, 'g'), (match, p1) => {
            return placeholders[match];
        });
    
        // Escape backslashes, double quotes, and control characters for JSON
        let escapedString = sanitizedString
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    
        return escapedString;
    };
                  
    const asyncSaveUpdate = async (id, question, answer, page_type, is_reload, is_delete) => {
        try {
            const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';
            const url = `${baseUrl}/api/${apipath}/${id}`;
            const q = question ? { "question": makeValidJsonString(question) } : {};
            const a = answer ? { "answer": makeValidJsonString(answer) } : {};
            const flag_for_delete = is_delete ? { "is_mark_for_deletion": true } : { };
            const question_answer = { ...q, ...a, ...flag_for_delete };
            const json_data = { 
                ...question_answer,
                type: page_type,
                'is_answered': true,
                'is_answer_approved': false,
                'is_sync_with_pinecone': false,
                'is_pushed_to_pinecone': false,
            };
            console.log(`asyncSaveUpdate.json_data = ${JSON.stringify(json_data, null, 4)}`)
            const response = await axios.put(url, json_data, {
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status == 200 && is_reload) {
                queryClient.invalidateQueries(useQueryName);
            }
        } catch (error) {
            Sentry.captureException(error);
            // Handle or throw the error depending on your application's needs
            console.error('Error saving changes:', error);
            throw error;
        }
    };

    const asyncDebounceSaveUpdate = _.debounce(async (id, question, answer, page_type, is_reload=false, is_delete=false) => {
        asyncSaveUpdate(id, question, answer, page_type, is_reload, is_delete);        
    }, 3000); // Wait for 1 second of inactivity before saving

    const toggleToCreateMode = () => {
        setMode('create');
    }

    const handleCheckboxChange = () => {
        setShowUnansweredQA(!showUnansweredQA);
    };

    const filterRows = (data, is_unanswered_only) => {
        if (!is_unanswered_only) {
            console.log(`filteredRows 1 ${data.length}`);
            return data;
        }
        const filtered_rows = data.filter(row => !row.is_answered);
        console.log(`filteredRows 2 ${filtered_rows.length}`);
        return filtered_rows;
    };

    const [menuName, subMenuName] = getMenuSubMenu(title);
    return (
        <React.Fragment>
            <SEO title="Saracoti || Settings" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-five.jpg"
                title="AI Training"
                content={menuName}
                contentTwo={subMenuName}
            />
            <div id="bot-container" className={`${classOption}`} >
                <div className="container">
                    <div className={`section section-padding-t90 section-padding-bottom ${classOption}`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h1 style={{ textAlign: 'center', flexGrow: 1 }}>{title}</h1>
                            { 
                                pageTypes.includes('customized') &&
                                <Button variant="secondary" 
                                    onClick={ () => setShowNewQuestionAnswer(true) }
                                    title="Add new question/answer to train AI."
                                >
                                    +
                                </Button>
                            }
                            { 
                                !pageTypes.includes('customized') &&
                                <Form.Check 
                                    type="checkbox"
                                    id="toggle-unanswered-qa"
                                    label="Unanswered Questions Only"
                                    checked={showUnansweredQA}
                                    onChange={handleCheckboxChange}
                            />
                            }
                        </div>
                        {
                            subtitle && subtitle.length > 0 && 
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6 style={{ textAlign: 'center', flexGrow: 1 }}>{subtitle}</h6>
                                </div>
                        }
                        <NewQuestionAnswer
                            asyncSaveUpdate={asyncSaveUpdate}
                            showDialog={showNewQuestionAnswer}
                            setShowDialog={setShowNewQuestionAnswer}
                        />
                        <div className="container">
                        { isLoading && <ThreeDotWave /> }
                        { isError && <div>Error: { error.message } </div> }
                        { isSuccess 
                            && mode == 'edit' 
                            && (<EditComponent 
                                    data={filterRows(rows, showUnansweredQA)} 
                                    pageTypes={pageTypes}
                                    asyncSaveUpdate={asyncSaveUpdate}
                                    asyncDebounceSaveUpdate={asyncDebounceSaveUpdate} 
                                /> ) }
                        </div>
                    </div>
                    { isSuccess 
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

export default StartupRoot;
