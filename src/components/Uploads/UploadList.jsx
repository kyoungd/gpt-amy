import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Table, Container, Button, Modal, Toast } from 'react-bootstrap';
import FileUploader from './FileUploader';

const UploadList = ({ token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const fetchData = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/company-files`, 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => {
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        throw new Error('Error fetching data');
      }
    }).catch(err => {
      console.error(err);
      setToast({ show: true, message: 'Error fetching data', type: 'danger' });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = () => {
    setShowUploader(!showUploader);
    if (!showUploader) {  // Only show message when opening the uploader
      setToast({
        show: true,
        message: 'Files are uploading, please wait 15 minutes for processing to complete.',
        type: 'info'
      });
      setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 15000);  // Message stays for 15 minutes
    }
  };

  const handleConfirmPushToKB = () => {
    setShowModal(false);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_BACKEND_URL}/api/company-files`, 
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(res => {
      if (res.status === 200) {
        setToast({ show: true, message: 'Successfully pushed to Knowledge Base', type: 'success' });
        setTimeout(() => {
          setToast({ show: false, message: '', type: '' });
        }, 5000);
      } else {
        throw new Error('Error pushing data');
      }
    }).catch(err => {
      setToast({ show: true, message: 'Error pushing data', type: 'danger' });
      console.error(err);
    });
  };

  const handleDelete = (id, file_name) => {
    const confirmation = window.confirm("Are you sure you want to delete this file?");
    if (confirmation) {
      setIsLoading(true);
      axios({
        method: 'delete',
        url: `${process.env.REACT_APP_BACKEND_URL}/api/company-files/${id}`, 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(res => {
        if (res.status !== 200)
            throw new Error('Error deleting file');
        fetchData(); 
        setToast({ show: true, message: `File ${file_name} was deleted successfully.`, type: 'success' });
        setTimeout(() => {
          setToast({ show: false, message: '', type: '' });
        }, 10000); 
      }).catch(err => {
        setToast({ show: true, message: 'Error deleting file', type: 'danger' });
        console.error(err);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  const text_block = (text) => {
    const max_length = 100;
    if (text.length > max_length) {
      return text.substring(0, max_length) + '...';
    }
    return text;
  };

  return (
    <Container style={{ marginTop: '2rem', backgroundColor: '#f8f9fa', padding: '2rem', width:'100%' }}>
      <Toast onClose={() => setToast({ show: false, message: '', type: '' })} show={toast.show} delay={3000} autohide style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
        <Toast.Header>
          <strong className="mr-auto">Upload List</strong>
        </Toast.Header>
        <Toast.Body className={`text-${toast.type}`}>{toast.message}</Toast.Body>
      </Toast>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          size="sm"
          variant={showUploader ? "dark" : "light"} 
          onClick={handleFileUpload}
        >
          {showUploader ? 'Close Uploader' : 'File Uploader'}
        </Button>
      </div>
      {showUploader && <FileUploader token={token} refreshFunc={fetchData} />}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you really want to push data to the Knowledge Base?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmPushToKB}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>File Content</th>
            <th>Action</th>
            <th>Trained</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.attributes.file_name}</td>
              <td>{text_block(item.attributes.file_text)}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm"
                  disabled={isLoading} 
                  onClick={() => handleDelete(item.id, item.attributes.file_name)}
                >
                  Delete
                </Button>
              </td>
              <td>{!item.attributes.is_do_preprocess && !item.attributes.is_do_chunking && !item.attributes.is_do_question_filtering ? "OK" : "..."}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

UploadList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default UploadList;
