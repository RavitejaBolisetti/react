/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Descriptions, Divider } from 'antd';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, appCategoryData } = props;
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
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('customerMaster.drawerSubHeading.companyTitle')} key="1">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('customerMaster.label.pan')}>{checkAndSetDefaultValue(formData?.panNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.gstin')}>{checkAndSetDefaultValue(formData?.gstinNumber, isLoading)}</Descriptions.Item>
                    </Descriptions>

                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('customerMaster.label.Categorization')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_CAT, formData?.applicationCategorization), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.SubCategory')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_SUB_CAT, formData?.applicationSubCategory), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.customerCategory')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.CUS_CAT, formData?.customerCategory), isLoading)}</Descriptions.Item>
                    </Descriptions>
                    {formData?.customerCategory === 'CUS_CAT_2' && (
                        <>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('customerMaster.label.businessDetails')}>{checkAndSetDefaultValue(formData?.businessDetails, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('customerMaster.label.vehicleDeployment')}>{checkAndSetDefaultValue(formData?.vechileDeploymentDetails, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('customerMaster.label.keyRoleDetails')}>{checkAndSetDefaultValue(formData?.keyRouteDetails, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('customerMaster.label.majorRouteDetails')}>{checkAndSetDefaultValue(formData?.majorRouteDetails, isLoading)}</Descriptions.Item>
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

            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end" collapsible="icon">
                <Panel header={translateContent('customerMaster.drawerSubHeading.accountTitle')} key="3">
                    <Divider />
                    {formData?.keyAccountDetails && (
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label={translateContent('customerMaster.label.accCode')}>{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('customerMaster.label.accName')}>{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('customerMaster.label.accSegment')}>{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountSegment, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('customerMaster.label.accClient')}>{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountClientName, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('customerMaster.label.accDate')}>{checkAndSetDefaultValue(formData?.keyAccountDetails?.accountMappingDate, isLoading)}</Descriptions.Item>
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
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
