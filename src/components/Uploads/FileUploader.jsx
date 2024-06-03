import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Container, Row, Col, Card, Toast } from 'react-bootstrap';

const FileUploader = ({ token, refreshFunc }) => {
  const [showToast, setShowToast] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setShowToast(true);
      return;
    }

    const uploadPromises = acceptedFiles.map((file) => {
      const formData = new FormData();
      const fileType = file.type;
      const fileSize = file.size;
      const fileName = file.name;

      formData.append('contentFile', file);
      formData.append('fileName', fileName);
      formData.append('fileType', fileType);
      formData.append('fileSize', fileSize);

      const url = `${process.env.REACT_APP_BACKEND_URL}/api/company-files`;
      return axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    });

    Promise.all(uploadPromises)
      .then(() => {
        console.log("All files uploaded successfully");
        refreshFunc();
      })
      .catch(err => {
        console.error(err);
      });
  }, [token, refreshFunc]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  });

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="text-center" style={{ marginTop: '2rem', backgroundColor: '#f8f9fa' }}>
            <Card.Body {...getRootProps()} style={{ cursor: 'pointer' }}>
              <input {...getInputProps()} />
              <Card.Title>File Upload</Card.Title>
              <Card.Text>
                Drag & drop some files here, or click to select files.
              </Card.Text>
            </Card.Body>
          </Card>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
            <Toast.Header>
              <strong className="mr-auto">Upload Error</strong>
            </Toast.Header>
            <Toast.Body>Only .pdf, .docx, and .txt files are allowed!</Toast.Body>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
}

FileUploader.propTypes = {
  token: PropTypes.string.isRequired,
  refreshFunc: PropTypes.func.isRequired,
};

export default FileUploader;
