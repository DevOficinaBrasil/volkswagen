import React from 'react';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';

const DownloadButton = ({ url, filename, ...props }) => {
  const handleDownload = () => {
    saveAs(url, filename);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleDownload}>
        {props.children}
    </Button>
  );
};

export default DownloadButton;
