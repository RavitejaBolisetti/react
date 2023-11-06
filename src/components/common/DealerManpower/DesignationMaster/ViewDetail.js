/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = ({ formData, styles, typeData }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('designationMaster.label.divisionName')}>{formData?.divisionName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.departmentName')}>{formData?.departmentName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.roleName')}>{formData?.roleDescription}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.designationType')}>{checkAndSetDefaultValue(getCodeValue(typeData?.DESG_TYP_ASGN_TO, formData?.designationType))}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.designationName')}>{formData?.designationName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.mileSkill')}>{formData?.mileSkillId}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.status')}>{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.manPowerRequired')}>{formData?.isManpowerIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.accountsData')}>{formData?.isAccountsDataIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.capability')}>{formData?.isCapabilityIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('designationMaster.label.createUserId')}>{formData?.isCreateUserIdRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    {/* <Descriptions.Item label="Designation Code">{formData?.designationCode}</Descriptions.Item> */}
                    {/* <Descriptions.Item label="Designation Type">{formData?.designationDescription}</Descriptions.Item> */}
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
