/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card } from 'antd';
import { FiDownload, FiTrash } from 'react-icons/fi';

import styles from 'assets/sass/app.module.scss';

export const ViewDetail = (props) => {
    const {
        formActionType: { viewMode },
        supportingData,
        deleteFile,
        downloadFileFromButton,
    } = props;

    return (
        <div className={styles.viewDrawerContainer}>
            {supportingData?.length > 0 ? (
                <>
                    {supportingData?.map((uploadData) => {
                        return (
                            <Card
                                className={styles.viewDocumentStrip}
                                key={uploadData?.id}
                                title={uploadData?.fileName}
                                extra={
                                    <>
                                        <FiDownload onClick={() => downloadFileFromButton(uploadData)} />
                                        {!viewMode && <FiTrash onClick={() => deleteFile(uploadData)} />}
                                    </>
                                }
                            ></Card>
                        );
                    })}
                </>
            ) : (
                viewMode && <div className={styles.marB20}>No Supporting Document Available</div>
            )}
        </div>
    );
};
