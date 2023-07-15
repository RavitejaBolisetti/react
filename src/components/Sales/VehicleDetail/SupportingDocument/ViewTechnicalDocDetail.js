/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { Card } from 'antd';
import { FiDownload, FiTrash } from 'react-icons/fi';

import styles from 'components/common/Common.module.css';

export const ViewTechnicalDocDetail = (props) => {
    const {
        downloadFileFromButton,
        // formActionType: { viewMode },
        supportingData,
        deleteFile,
    } = props;

    return (
        <div className={styles.viewDrawerContainer}>
            {/* {supportingData?.length > 0 ? ( */}
            <Card>
                Coming Soon
                {/* {supportingData?.map((uploadData) => {
                    return (
                        <Card
                            className={styles.viewDocumentStrip}
                            key={uploadData.id}
                            title={uploadData?.documentName}
                            extra={
                                <>
                                    <FiDownload onClick={() => downloadFileFromButton(uploadData)} />
                                </>
                            }
                        ></Card>
                    );
                })} */}
            </Card>
            {/* // ) : ( // <div className={styles.viewNoDataFound}>No Technical Document Available</div>
            // )} */}
        </div>
    );
};
