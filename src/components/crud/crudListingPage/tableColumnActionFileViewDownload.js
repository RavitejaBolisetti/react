/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { URL_DOWNLOAD_PREFIX } from 'constants/config';
import { message } from 'antd';

export const handleView = (props) => (record) => () => {
    const { token } = props;
    const uploadedPdfFileURL = record && record.fileNameHash && URL_DOWNLOAD_PREFIX + record.fileNameHash + '?download=false&originalFilename=true&token=' + token;
    window.open(uploadedPdfFileURL, '_blank');
};

export const handleDownload = (downloadUrl) => (props) => (record) => () => {
    const { token } = props;
    const uploadedPdfFileURL = record && record.fileNameHash && downloadUrl + record.fileNameHash + '?download=true&originalFilename=true&token=' + token;
    message.info('File successfully downloaded');
    var downloadLink = document.createElement('a');
    downloadLink.href = uploadedPdfFileURL;
    downloadLink.setAttribute('download', record.fileName);
    downloadLink.click();
};
