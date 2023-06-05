import { useState, useEffect } from 'react';

const useFileDownload = (url) => {
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const downloadFile = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('File download failed');
                }
                const data = await response.blob();
                setFileData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            downloadFile();
        }

        // Cleanup the file data when the component unmounts or when the URL changes
        return () => {
            setFileData(null);
        };
    }, [url]);

    return { fileData, loading, error };
};

export default useFileDownload;
