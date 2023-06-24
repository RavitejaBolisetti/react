/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';

import { Row, Col, Card } from 'antd';
import { FiDownload } from 'react-icons/fi';
import styles from 'components/common/Common.module.css';

export const ViewDetail = (props) => {
    const { supportingData } = props;
    return (
        <>
            <div className={styles.viewDrawerContainer}>
                <Card>
                    {supportingData.map((uploadData) => {
                        return <Card className={styles.viewDocumentStrip} key={uploadData.id} title={uploadData?.documentTitle} extra={<FiDownload />}></Card>;
                    })}
                </Card>
            </div>
        </>
    );
};
