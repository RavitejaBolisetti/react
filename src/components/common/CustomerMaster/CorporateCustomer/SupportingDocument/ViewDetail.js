/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';

import { Card } from 'antd';
import { FiDownload } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';

export const ViewDetail = (props) => {
    const { supportingData, handlePreview, viewDocument, showGlobalNotification } = props;

    const downloadFile = (uploadData) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your donload will start soon' });

        handlePreview(uploadData);
        let a = document.createElement('a');
        a.href = `data:image/png;base64,${viewDocument?.base64}`;
        a.download = viewDocument?.fileName;
        a.click();
    };
    return (
        <div className={styles.viewDrawerContainer}>
            {supportingData.length > 0 ? (
                <Card>
                    {supportingData.map((uploadData) => {
                        return <Card className={styles.viewDocumentStrip} key={uploadData.id} title={uploadData?.documentName} extra={<FiDownload onClick={() => downloadFile(uploadData)} />}></Card>;
                    })}
                </Card>
            ) : (
                <div>No Data Found</div>
            )}
        </div>
    );
};
