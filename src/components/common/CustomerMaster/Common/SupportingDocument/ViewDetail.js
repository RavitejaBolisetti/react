/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { Card } from 'antd';
import { FiDownload, FiTrash } from 'react-icons/fi';

import styles from 'components/common/Common.module.css';

export const ViewDetail = (props) => {
    const {
        showGlobalNotification,
        fetchViewDocument,
        viewListShowLoading,
        userId,
        formActionType: { viewMode },
        supportingData,
        deleteFile,
    } = props;
    const downloadFileFromButton = (uploadData) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: uploadData?.docId,
                name: 'docId',
            },
        ];
        const documentName = uploadData?.documentName;
        console.log('uploadData', uploadData, 'extraParams', extraParams, 'supportingDocument', documentName);
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, documentName });
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
                                        <FiDownload onClick={() => downloadFileFromButton(uploadData)} />
                                        {!viewMode && <FiTrash onClick={() => deleteFile(uploadData)} />}
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
