/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card } from 'antd';
import { FiDownload } from 'react-icons/fi';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const ViewSupportingDocDetail = (props) => {
    const { downloadFileFromButton, documentData } = props;

    return (
        <div className={styles.viewDrawerContainer}>
            {documentData?.supportingDocuments?.length > 0 ? (
                <div className={styles.marT20}>
                    {documentData?.supportingDocuments?.map((uploadData) => {
                        return <Card className={styles.viewDocumentStrip} key={uploadData.documentId} title={uploadData?.documentTitle} extra={<FiDownload onClick={() => downloadFileFromButton(uploadData)} />}></Card>;
                    })}
                </div>
            ) : (
                <Card>{translateContent('commonModules.label.supportingDocument.noData.supportingDocument')}</Card>
            )}
        </div>
    );
};
