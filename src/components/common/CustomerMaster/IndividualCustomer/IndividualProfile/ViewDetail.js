/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Descriptions, Card, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { FiDownload } from 'react-icons/fi';
import { getCodeValue } from 'utils/getCodeValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DATA_TYPE } from 'constants/dataType';

import styles from 'components/common/Common.module.css';

const { Panel } = Collapse;
const ViewDetailMain = (props) => {
    const { downloadFileFromButton, setActiveKey, activeKey, formData, viewDocument, isLoading, appCategoryData } = props;

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setActiveKey(newActivekeys);
        } else {
            setActiveKey([...activeKey, values]);
        }
    };
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                <Panel header="Individual Information" key="1">
                    <Divider />
                    <div>
                        <img alt="uploaded suppoting document" width="120" height="100" src={`data:image/png;base64,${viewDocument?.base64}`} />
                    </div>
                    <br />
                    <br />
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Date of Birth">{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                        <Descriptions.Item label="Gender">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.GENDER_CD, formData?.gender), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Maritial Status">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.MARITAL_STATUS, formData?.martialStatus), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Wedding Anniversary Date">{checkAndSetDefaultValue(formData?.weddingAnniversary, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Occupation">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.OCC_TYPE, formData?.occuption), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Annual Income">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.Annual_Income, formData?.annualIncome), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Driving License No.">{checkAndSetDefaultValue(formData?.drivingLicenseNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Aadhar No.">{checkAndSetDefaultValue(formData?.adharNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Voter ID">{checkAndSetDefaultValue(formData?.voterId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Vehicle Used">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.Vehicle_Used, formData?.vehicleUsed), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Mother Tongue">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.MOTHER_TOUNGE, formData?.motherTongue), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Religion">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.RELGION, formData?.religion), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="PAN">{checkAndSetDefaultValue(formData?.panNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="GSTIN">{checkAndSetDefaultValue(formData?.gstin, isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Usage/Application Categorization">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_CAT, formData?.applicationCategorization), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Usage/Application Sub-Category">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_SUB_CAT, formData?.applicationSubCategory), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Customer Category">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.CUS_CAT, formData?.customerCategory), isLoading)}</Descriptions.Item>
                    </Descriptions>
                    {formData?.customerCategory === 'CUS_CAT_2' ? (
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="Business Details">{checkAndSetDefaultValue(formData?.businessDetails, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Vehicle Deployment Detail">{checkAndSetDefaultValue(formData?.vehicleDeploymentDetails, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Key Role Details">{checkAndSetDefaultValue(formData?.keyRolesDetails, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Major Route Details">{checkAndSetDefaultValue(formData?.majorRouteDetails, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    ) : null}
                </Panel>
            </Collapse>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(5)} expandIconPosition="end">
                <Panel header="Social Profile" key="5">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="M1-MMFSL">{checkAndSetDefaultValue(formData?.mmfsl, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookLink, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterLink, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagramLink, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youtubeChannelLink, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhpLink, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
            {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                     <Panel header="Key Account Details" key="2">
                         <Descriptions {...viewProps}>
                             <Descriptions.Item label="Account Code">{checkAndSetDefaultValue(formData?.accountCode, isLoading)}</Descriptions.Item>
                             <Descriptions.Item label="Account Name">{checkAndSetDefaultValue(formData?.accountName, isLoading)}</Descriptions.Item>
                             <Descriptions.Item label="Account Segement">{checkAndSetDefaultValue(formData?.accountSegement, isLoading)}</Descriptions.Item>
                             <Descriptions.Item label="Account Client Name">{checkAndSetDefaultValue(formData?.accountClientName, isLoading)}</Descriptions.Item>
                             <Descriptions.Item label="Account Mapping Date">{checkAndSetDefaultValue(formData?.accountMappingDate, isLoading)}</Descriptions.Item>
                         </Descriptions>
	                     </Panel>
                 </Collapse> */}
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                <Panel header="Authority Details (Who Knows Whom)" key="2">
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Name Of Person">{checkAndSetDefaultValue(formData?.authorityDetails?.personName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Position">{checkAndSetDefaultValue(formData?.authorityDetails?.postion, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Company Name">{checkAndSetDefaultValue(formData?.authorityDetails?.companyName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.authorityDetails?.remarks, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                <Panel header="Upload Customer Form" key="3">
                    <Divider />
                    <Card className={styles.viewDocumentStrip} key={viewDocument?.fileName} title={viewDocument?.fileName} extra={<FiDownload />} onClick={downloadFileFromButton}></Card>
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
