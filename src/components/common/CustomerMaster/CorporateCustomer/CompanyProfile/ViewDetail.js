/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Space, Collapse, Typography, Descriptions, Card, Divider } from 'antd';
import { FiDownload } from 'react-icons/fi';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { getCodeValue } from 'utils/getCodeValue';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, handleOnClick, isLoading, appCategoryData, viewDocument } = props;
    const [activeKey, setactiveKey] = useState([1]);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Space style={{ display: 'flex' }} direction="vertical" size="middle">
                <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                    <Panel header="Company Information" key="1">
                        <Divider />
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="PAN">{checkAndSetDefaultValue(formData?.panNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData?.gstinNumber, isLoading)}</Descriptions.Item>
                        </Descriptions>

                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Usage/Application Categorization">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_CAT, formData?.applicationCategorization), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Usage/Application Sub-Category">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_SUB_CAT, formData?.applicationSubCategory), isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Customer Category">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.CUS_CAT, formData?.customerCategory), isLoading)}</Descriptions.Item>
                        </Descriptions>
                        {formData?.customerCategory === 'CUS_CAT_2' && (
                            <>
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label="Business Details">{checkAndSetDefaultValue(formData?.businessDetails, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Vehicle Deployment Detail">{checkAndSetDefaultValue(formData?.vechileDeploymentDetails, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Key Role Details">{checkAndSetDefaultValue(formData?.keyRouteDetails, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="Major Route Details">{checkAndSetDefaultValue(formData?.majorRouteDetails, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </>
                        )}
                    </Panel>
                </Collapse>

                {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                    <Panel header="Social Profiles" key="2">
                        <Divider />
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="M1-MMFSL">{checkAndSetDefaultValue(formData?.m1mmfsl, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookLink, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterLink, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Panel>
                </Collapse> */}

                <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                    <Panel header="Key Account Details" key="3">
                        <Divider />
                        {formData?.keyAccountDetails && (
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Account Code">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountCode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Account Name">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Account Segment">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountSegment, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Account Client Name">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountClientName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Account Mapping Date">{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountMappingDate, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        )}
                    </Panel>
                </Collapse>

                {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(4)} expandIconPosition="end">
                    <Panel header="Authority Details(Who Knows Whom)" key="4">
                        <Divider />
                        {formData?.authorityDetails && (
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Name Of Person">{checkAndSetDefaultValue(formData?.authorityDetails.personName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Position">{checkAndSetDefaultValue(formData?.authorityDetails.postion, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Company Name">{checkAndSetDefaultValue(formData?.authorityDetails.companyName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.authorityDetails.remarks, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        )}
                    </Panel>
                </Collapse> */}
                {/* DON"T REMOVE COMMENTED CODE
                <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(5)} expandIconPosition="end">
                    <Panel header="Upload Customer Form" key="5">
                        <Divider />
                        {viewDocument?.fileName && <Card className={styles.viewDocumentStrip} key={viewDocument?.fileName} title={viewDocument?.fileName} extra={<FiDownload />} onClick={handleOnClick}></Card>}
                    </Panel>
                </Collapse> */}
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
