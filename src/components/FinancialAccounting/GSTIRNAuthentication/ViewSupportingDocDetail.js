/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card } from 'antd';

import { FiTrash, FiEye } from 'react-icons/fi';
import styles from 'assets/sass/app.module.scss';

export const ViewSupportingDocDetail = (props) => {
    const { onDownload, onRemove, docData,  } = props;
    return (
        <div className={styles.viewDrawerContainer}>
            {docData !== undefined ? (
                <div className={styles.marT20}>
                    <Card
                        className={styles.viewDocumentStrip}
                        key={docData?.documentId}
                        title={docData?.pemFile}
                        extra={
                            <>
                                <FiEye onClick={() => onDownload(docData.documentId)} />
                                <FiTrash onClick={() => onRemove(docData.documentId)} />
                            </>
                        }
                    ></Card>
                 </div>
            ) : (
            <>           
                {/* <Card>
                    <div className={styles.marB20}>No File Available</div>
                </Card> */}
                </>
 
            )}
        </div>
    );
};
