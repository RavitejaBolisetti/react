/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Card, Collapse, Divider } from 'antd';
import { translateContent } from 'utils/translateContent';
import { expandIcon } from 'utils/accordianExpandIcon';
import { formatDate } from 'utils/formatDateTime';
const { Panel } = Collapse;

const ViewDetailBase = ({ formData, styles, documentNameViewdata, finalFormdata }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 2 },
    };
   // console.log(formData, `documentNameViewdata`);

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('LoyaltySchemeMaster.label.schemeId')}>{formData?.schemeId}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('LoyaltySchemeMaster.label.SchemeName')}>{formData?.SchemeName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('LoyaltyDocumentMaster.label.status')}>{formData?.status ? translateContent('LoyaltyDocumentMaster.label.active') : translateContent('LoyaltyDocumentMaster.label.inactive')}</Descriptions.Item>
                </Descriptions>

                <Collapse expandIcon={expandIcon} expandIconPosition="end">
                    <Panel key={2} header={'Document Details'}>
                        <Divider />
                        {formData?.finalFormdata?.map((item) => (
                            <Card>
                                <Descriptions {...viewOneColProps}>
                                    <Descriptions.Item label={translateContent('LoyaltySchemeMaster.label.documentName')}>{item?.documentName}</Descriptions.Item>

                                    <Descriptions.Item label={'Document Id'}>{item?.documentId}</Descriptions.Item>

                                    <Descriptions.Item label={'Valid From'}>{formatDate(item?.validFrom)}</Descriptions.Item>

                                    <Descriptions.Item label={'Valid To'}>{formatDate(item?.validTo)}</Descriptions.Item>

                                   <Descriptions.Item label={'Is Document Active?'}>{item?.documentstatus ? 'Active' : 'Inactive'}</Descriptions.Item>

                                   <Descriptions.Item label={'Is Document Mandatory?'}>{item?.documentmandatory ? 'Yes' : 'No'}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                        ))}
                    </Panel>
                </Collapse>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
