/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Collapse, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DataTable } from 'utils/dataTable';
import { InputSkeleton } from 'components/common/Skeleton';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { tableColumn } from './tableCoulmn';

import { expandIcon } from 'utils/accordianExpandIcon';
import { LANGUAGE_EN } from 'language/en';
import { NoDataFound } from 'utils/noDataFound';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { styles, bindCodeValue, bindStatus, formData, collapseProps, tooltTipText, isLoading, optionsServiceModified, formActionType, modelData, variantData, modelFamilyData } = props;
    const [openAccordian, setOpenAccordian] = useState([]);
    const [InnerCollapse, setInnerCollapse] = useState([]);

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const handleInnerCollapse = (key) => {
        setInnerCollapse((prev) => (prev === key ? '' : key));
    };
    const { productAttributeDetail, connectedVehicle } = formData;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles?.viewDrawerContainer}>
            <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(1)} expandIconPosition="end" collapsible="icon" {...collapseProps}>
                <Panel header="Product Attribute Details" key="1">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Product Division">{checkAndSetDefaultValue(productAttributeDetail?.productDivision, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Model Family">{checkAndSetDefaultValue(modelFamilyData?.length > 0 && modelFamilyData[0]?.familyDescription, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(modelData?.length > 0 && modelData[0]?.modelGroupDescription, isLoading)}</Descriptions.Item>

                        <Descriptions.Item label="Model">
                            {isLoading ? (
                                <InputSkeleton width={'100px'} height={20} theme={'card'} />
                            ) : (
                                <div className={styles?.tooltipAlign}>
                                    <div title={productAttributeDetail?.model} className={`${styles.contentData} ${styles.txtEllipsis}`}>
                                        {productAttributeDetail?.model}
                                    </div>
                                    {!productAttributeDetail?.model ? 'NA' : addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles?.toolTip)(<AiOutlineInfoCircle className={styles?.infoIconColor} size={13} />)}
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Model Variant">{checkAndSetDefaultValue(variantData?.length > 0 && variantData[0]?.variantDescription, isLoading)}</Descriptions.Item>
                        {/* <Descriptions.Item label="Manufacturer Invoice Date">{!isLoading ? productAttributeDetail?.manufacturerInvoiceDate?.slice(0, 10) ?? '-' : <InputSkeleton width={'100px'} height={20} theme={'card'} />}</Descriptions.Item>
                        <Descriptions.Item label="Manufacturer Warrenty Start Date">{!isLoading ? productAttributeDetail?.manufacturerWarrantyStartDate?.slice(0, 10) ?? '-' : <InputSkeleton width={'100px'} height={20} theme={'card'} />}</Descriptions.Item> */}
                    </Descriptions>
                </Panel>
            </Collapse>

            {/* <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(2)} expandIconPosition="end" collapsible="icon" style={{ paddinBottom: '20px' }} {...collapseProps}>
                <Panel header="Connected Vehicle" key="2">
                    <Divider />
                    <div>
                        {formData?.connectedVehicle?.map((element, index) => {
                            return (
                                <Collapse expandIcon={expandIcon} activeKey={InnerCollapse} onChange={() => handleInnerCollapse(index)} expandIconPosition="end" collapsible="icon" {...collapseProps}>
                                    <Panel header={`${element?.tcuId} | ${element?.esimNo}`} key={index}>
                                        <Divider />
                                        <Descriptions {...viewProps}>
                                            <Descriptions.Item label="TCU ID">{checkAndSetDefaultValue(connectedVehicle && element?.tcuId, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label="E-SIM No">{checkAndSetDefaultValue(connectedVehicle && element?.esimNo, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label="E-SIM Status">{checkAndSetDefaultValue(bindStatus(element, 'esimStatus', { active: 'Active', inactive: 'Inctive' }), isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label="Prefered Mobile No 1">{checkAndSetDefaultValue(connectedVehicle && element?.preferredMobileNo1, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label="Prefered Mobile No 2">{checkAndSetDefaultValue(connectedVehicle && element?.preferredMobileNo2, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label="KYC Status">{checkAndSetDefaultValue(bindStatus(element, 'kycStatus', { active: 'Recieved', inactive: 'Not Recieved' }), isLoading)}</Descriptions.Item>
                                        </Descriptions>
                                    </Panel>
                                </Collapse>
                            );
                        })}
                        {!formData?.connectedVehicle?.length && <NoDataFound informtion={noDataTitle} />}
                    </div>
                </Panel>
            </Collapse> */}
            <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(3)} expandIconPosition="end" collapsible="icon" {...collapseProps}>
                <Panel header="Aggregates" key="3">
                    <Divider />
                    <DataTable tableColumn={tableColumn({ formActionType, bindCodeValue })} tableData={optionsServiceModified} pagination={false} />
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
