/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { Row, Col, Card } from 'antd';
import { FiDownload, FiTrash } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';

export const ViewDetail = (props) => {
    const {
        formActionType: { viewMode },
        setSupportingDataView,
        supportingDataView,
        supportingData,
        handlePreview,
        viewDocument,
        showGlobalNotification,
        formActionType,
        listShowLoading,
        saveData,
        userId,
    } = props;

    const downloadFile = (uploadData) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your donload will start soon' });

        handlePreview(uploadData);
        let a = document.createElement('a');
        a.href = `data:image/png;base64,${viewDocument?.base64}`;
        a.download = viewDocument?.fileName;
        a.click();
    };

    const deleteFile = (uploadData) => {
        console.log(uploadData, 'uploadData');
        const data = { customerId: uploadData?.customerId, status: false, docId: uploadData?.docId, documentTypeId: uploadData?.documentType, id: uploadData?.id, documentName: uploadData?.documentName };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'File deleted Successfully' });
            handlePreview(uploadData);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    return (
        <div className={styles.viewDrawerContainer}>
            {supportingData.length > 0 ? (
                <Card>
                    {supportingData.map((uploadData) => {
                        return (
                            <Card
                                className={styles.viewDocumentStrip}
                                key={uploadData.id}
                                title={uploadData?.documentName}
                                extra={
                                    <>
                                        <FiDownload onClick={() => downloadFile(uploadData)} />
                                    </>
                                }
                            ></Card>
                        );
                    })}
                </Card>
            ) : (
                viewMode && <div className={styles.viewNoDataFound}>No Supporting Document Available</div>
            )}
        </div>
    );
};
