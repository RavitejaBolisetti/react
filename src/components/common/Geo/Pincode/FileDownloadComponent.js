import React from 'react';
import useFileDownload from 'utils/useFileDownload';

const FileDownloadComponent = () => {
    const fileUrl = 'https://example.com/file.pdf'; // Replace with your API endpoint

    const { fileData, loading, error } = useFileDownload(fileUrl);

    const handleDownload = () => {
        if (fileData) {
            // Create a temporary URL for the file data
            const fileUrl = URL.createObjectURL(fileData);

            // Create an anchor element and simulate a click to trigger the file download
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = 'file.pdf'; // Specify the desired file name
            link.click();

            // Release the temporary URL
            URL.revokeObjectURL(fileUrl);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return <div>{fileData ? <button onClick={handleDownload}>Download File</button> : <p>No file available for download</p>}</div>;
};

export default FileDownloadComponent;
