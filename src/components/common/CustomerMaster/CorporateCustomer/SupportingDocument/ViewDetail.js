/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
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
                <Card>No Data Found</Card>
            )}
        </div>
    );
};
