/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
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

        return () => {
            setFileData(null);
        };
    }, [url]);

    return { fileData, loading, error };
};

export default useFileDownload;
