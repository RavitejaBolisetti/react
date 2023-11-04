/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const ViewDetailMain = (props) => {
    const { setActiveKey, activeKey, formData, isLoading, appCategoryData } = props;

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
            <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                <Panel header={translateContent('customerMaster.heading.individualTitle')} key="1">
                    <Divider />
                    {/* <div>
                        <Image alt="Uploaded profile picture" width="120" height="100" src={`data:image/png;base64,${viewDocument?.base64}`} />
                    </div>
                    <Divider className={styles.marT20} /> */}
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('customerMaster.label.dateOfBirth')}>{checkAndSetDefaultValue(formData?.dateOfBirth, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.gender')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.GENDER_CD, formData?.gender), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.maritalStatus')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.MARITAL_STATUS, formData?.martialStatus), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.WeddingDate')}>{checkAndSetDefaultValue(formData?.weddingAnniversary, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.Occupation')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.OCCUPATION, formData?.occuption), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.annualIncome')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.Annual_Income, formData?.annualIncome), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.drivingLicenseNo')}>{checkAndSetDefaultValue(formData?.drivingLicenseNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.aadharNo')}>{checkAndSetDefaultValue(formData?.adharNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.voterID')}>{checkAndSetDefaultValue(formData?.voterId, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.vehicleUsed')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.Vehicle_Used, formData?.vehicleUsed), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.motherTongue')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.MOTHER_TOUNGE, formData?.motherTongue), isLoading)}</Descriptions.Item>
                        {/* <Descriptions.Item label="Religion">{checkAndSetDefaultValue(getCodeValue(appCategoryData?.RELGION, formData?.religion), isLoading)}</Descriptions.Item> */}
                        <Descriptions.Item label={translateContent('customerMaster.label.pan')}>{checkAndSetDefaultValue(formData?.panNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.gstin')}>{checkAndSetDefaultValue(formData?.gstin, isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('customerMaster.label.Categorization')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_CAT, formData?.applicationCategorization), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.SubCategory')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.APP_SUB_CAT, formData?.applicationSubCategory), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('customerMaster.label.customerCategory')}>{checkAndSetDefaultValue(getCodeValue(appCategoryData?.CUS_CAT, formData?.customerCategory), isLoading)}</Descriptions.Item>
                    </Descriptions>
                    {formData?.customerCategory === 'CUS_CAT_2' ? (
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label={translateContent('customerMaster.label.businessDetails')}>{checkAndSetDefaultValue(formData?.businessDetails, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('customerMaster.label.vehicleDeployment')}>{checkAndSetDefaultValue(formData?.vehicleDeploymentDetails, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('customerMaster.label.keyRoleDetails')}>{checkAndSetDefaultValue(formData?.keyRolesDetails, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('customerMaster.label.majorRouteDetails')}>{checkAndSetDefaultValue(formData?.majorRouteDetails, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    ) : null}
                </Panel>
            </Collapse>
            {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(5)} expandIconPosition="end">
                <Panel header="Social Profile" key="5">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="M1-MMFSL">{checkAndSetDefaultValue(formData?.mmfsl, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Facebook Link">{checkAndSetDefaultValue(formData?.facebookLink, isLoading, '-', true, formData?.facebookLink)}</Descriptions.Item>
                        <Descriptions.Item label="Twitter Link">{checkAndSetDefaultValue(formData?.twitterLink, isLoading, '-', true, formData?.twitterLink)}</Descriptions.Item>
                        <Descriptions.Item label="Instagram Link">{checkAndSetDefaultValue(formData?.instagramLink, isLoading, '-', true, formData?.instagramLink)}</Descriptions.Item>
                        <Descriptions.Item label="Youtube Channel">{checkAndSetDefaultValue(formData?.youtubeChannelLink, isLoading, '-', true, formData?.youtubeChannelLink)}</Descriptions.Item>
                        <Descriptions.Item label="Team BHP Link">{checkAndSetDefaultValue(formData?.teamBhpLink, isLoading, '-', true, formData?.teamBhpLink)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse> */}
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
            {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                <Panel header="Authority Details (Who Knows Whom)" key="2">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Name Of Person">{checkAndSetDefaultValue(formData?.authorityDetails?.personName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Position">{checkAndSetDefaultValue(formData?.authorityDetails?.postion, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Company Name">{checkAndSetDefaultValue(formData?.authorityDetails?.companyName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.authorityDetails?.remarks, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse> */}
            {/* <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                <Panel header="Upload Customer Form" key="3">
                    <Divider />
                    <Card className={styles.viewDocumentStrip} key={viewDocument?.fileName} title={viewDocument?.fileName} extra={<FiDownload />} onClick={downloadFileFromButton}></Card>
                </Panel>
            </Collapse> */}
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
