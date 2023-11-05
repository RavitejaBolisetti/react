/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { NoDataFound } from 'utils/noDataFound';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const ViewTechnicalDocDetail = () => {
    return (
        <div className={styles.viewDrawerContainer}>
            {/* {supportingData?.length > 0 ? ( */}
            <NoDataFound informtion={translateContent('vehicleDetail.documents.label.noTechnicalDocumentsFound')} />
            {/* <Card> */}
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
            {/* </Card> */}
            {/* // ) : ( // <Card>No Technical Document Available</Card>
            // )} */}
        </div>
    );
};
