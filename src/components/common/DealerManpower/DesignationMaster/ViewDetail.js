import React from 'react';
import { Descriptions } from 'antd';

const ViewDetailBase = ({ formData, styles, parameterType }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Division Name">{formData?.divisionName}</Descriptions.Item>
                    <Descriptions.Item label="Department Name">{formData?.departmentName}</Descriptions.Item>
                    <Descriptions.Item label="Role Name">{formData?.roleDescription}</Descriptions.Item>
                    <Descriptions.Item label="Designation Code">{formData?.designationCode}</Descriptions.Item>
                    <Descriptions.Item label="Designation Name">{formData?.designationDescription}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                    <Descriptions.Item label="Common">{formData?.isCommonIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Manpower Required">{formData?.isManpowerIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Leadership">{formData?.isLeadershipIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Accounts Data">{formData?.isAccountsDataIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Dealer HR">{formData?.isDealerHrIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Certified">{formData?.isCertifiedIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="NEFT Details">{formData?.isNeftDetailsIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Capability (L1/L2/L3)">{formData?.isCapabilityIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="FFT Department Approval">{formData?.isFftDepartmentApprovalIndicatorRequired ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Create User Id">{formData?.isCreateUserIdRequired ? 'Yes' : 'No'}</Descriptions.Item>

                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
