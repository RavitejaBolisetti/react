import React from 'react';
import { Descriptions } from 'antd';

export const ViewDealerDetailsMain = ({ viewTitle, buttonData, attributeData, selectedTreeData, handleEditBtn, handleRootChildBtn, handleChildBtn, handleSiblingBtn, setClosePanels, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={styles.viewContainer}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Attribute Level">{selectedTreeData?.hierarchyAttribueName}</Descriptions.Item>
                <Descriptions.Item label="Parent">{selectedTreeData?.parentName}</Descriptions.Item>
                <Descriptions.Item label="Code">{selectedTreeData?.code}</Descriptions.Item>
                <Descriptions.Item label="Short Description">{selectedTreeData?.shortDescription}</Descriptions.Item>
                <Descriptions.Item label="Long Description">{selectedTreeData?.longDescription}</Descriptions.Item>
                {(selectedTreeData?.type === 'PARNT' || selectedTreeData?.type === 'parentGroup') && (
                    <>
                        <Descriptions.Item label="Contact Number">{selectedTreeData?.contactNumber}</Descriptions.Item>
                        <Descriptions.Item label="Email ID">{selectedTreeData?.emailId}</Descriptions.Item>
                        <Descriptions.Item label="Status">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
                    </>
                )}

                {(selectedTreeData?.type === 'COMP' || selectedTreeData?.type === 'companyGroup') && (
                    <>
                        <Descriptions.Item label="Registered Address of the Company">{selectedTreeData?.registeredAddressOfCompany}</Descriptions.Item>
                        <Descriptions.Item label="TIN Number">{selectedTreeData?.tinNumber}</Descriptions.Item>
                        <Descriptions.Item label="TAN Number">{selectedTreeData?.tanNumber}</Descriptions.Item>
                        <Descriptions.Item label="PAN Number">{selectedTreeData?.panNumber}</Descriptions.Item>
                        <Descriptions.Item label="Status">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
                    </>
                )}

                {(selectedTreeData?.type === 'GSTIN' || selectedTreeData?.type === 'gstinGroup') && (
                    <>
                        <Descriptions.Item label="GSTIN Number">{selectedTreeData?.gstinNumber}</Descriptions.Item>
                        <Descriptions.Item label="Centre Jurisdiction">{selectedTreeData?.centerJurisdiction}</Descriptions.Item>
                        <Descriptions.Item label="State Jurisdiction">{selectedTreeData?.stateJurisdiction}</Descriptions.Item>
                        <Descriptions.Item label="Date of Registration">{selectedTreeData?.dateOfRegistertion}</Descriptions.Item>
                        <Descriptions.Item label="Constitution of Business">{selectedTreeData?.consitutionOfBusiness}</Descriptions.Item>
                        <Descriptions.Item label="Taxpayer Type">{selectedTreeData?.taxPayerType}</Descriptions.Item>
                        <Descriptions.Item label="Status">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
                    </>
                )}

                {(selectedTreeData?.type === 'LOCTN' || selectedTreeData?.type === 'branchGroup') && (
                    <>
                        <Descriptions.Item label="Branch Address">{selectedTreeData?.branchAddress}</Descriptions.Item>
                        <Descriptions.Item label="Locality">{selectedTreeData?.locality}</Descriptions.Item>
                        <Descriptions.Item label="City/District">{selectedTreeData?.city}</Descriptions.Item>
                        <Descriptions.Item label="State">{selectedTreeData?.state}</Descriptions.Item>
                        <Descriptions.Item label="City Classification">{selectedTreeData?.cityClassification}</Descriptions.Item>
                        <Descriptions.Item label="Status">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
                    </>
                )}
            </Descriptions>
        </div>
    );
};

export const ViewDealerDetails = ViewDealerDetailsMain;
