/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';

import { Card } from 'antd';
import { FiDownload, FiTrash } from 'react-icons/fi';
import { LANGUAGE_EN } from 'language/en';
import { NoDataFound } from 'utils/noDataFound';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

export const ViewDetail = (props) => {
    const {
        viewListShowLoading,
        userId,
        formActionType: { viewMode },
        supportingData,
        deleteFile,
        downloadFile,
    } = props;

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

    const downloadFileFromButton = (uploadData) => {
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: uploadData?.docId,
                name: 'docId',
            },
        ];
        downloadFile({ setIsLoading: viewListShowLoading, userId, extraParams });
    };

    return (
        <div className={styles.viewDrawerContainer}>
            {supportingData.length > 0 ? (
                <>
                    {supportingData.map((uploadData) => {
                        return (
                            <Card
                                className={styles.viewDocumentStrip}
                                key={uploadData.id}
                                title={uploadData?.documentName}
                                extra={
                                    <>
                                        <FiDownload onClick={() => downloadFileFromButton(uploadData)} data-testid="downloadBtn" />
                                        {!viewMode && <FiTrash onClick={() => deleteFile(uploadData)} data-testid="deleteFileBtn" />}
                                    </>
                                }
                            ></Card>
                        );
                    })}
                </>
            ) : (
                viewMode && <NoDataFound informtion={noDataTitle} />
            )}
        </div>
    );
};
