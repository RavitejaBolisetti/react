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
import { translateContent } from 'utils/translateContent';

import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { styles, bindCodeValue, formData, collapseProps, tooltTipText, isLoading, optionalServices, formActionType, modelData, variantData, modelFamilyData, ITEM_TYPE } = props;
    const [openAccordian, setOpenAccordian] = useState([]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const { productAttributeDetail } = formData;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles?.viewDrawerContainer}>
            <Collapse expandIcon={expandIcon} activeKey={openAccordian} onChange={() => handleCollapse(1)} expandIconPosition="end" collapsible="icon" {...collapseProps}>
                <Panel header={translateContent('vehicleDetail.productDetails.heading.attributeTitle')} key="1">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('vehicleDetail.productDetails.label.productDivision')}>{checkAndSetDefaultValue(productAttributeDetail?.productDivision, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('vehicleDetail.productDetails.label.modelFamily')}>{checkAndSetDefaultValue(modelFamilyData?.length > 0 && modelFamilyData[0]?.familyDescription, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('vehicleDetail.productDetails.label.modelGroup')}>{checkAndSetDefaultValue(modelData?.length > 0 && modelData[0]?.modelGroupDescription, isLoading)}</Descriptions.Item>

                        <Descriptions.Item label={translateContent('vehicleDetail.productDetails.label.model')}>
                            {isLoading ? (
                                <InputSkeleton width={'100px'} height={20} theme={'card'} />
                            ) : (
                                <div className={styles?.tooltipAlign}>
                                    <div title={productAttributeDetail?.model} className={`${styles?.fieldcontentData} ${styles?.txtEllipsis}`}>
                                        {productAttributeDetail?.model}
                                    </div>
                                    {!productAttributeDetail?.model ? 'NA' : addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles?.toolTip)(<AiOutlineInfoCircle className={styles?.infoIconColor} size={13} />)}
                                </div>
                            )}
                        </Descriptions.Item>
                        <Descriptions.Item label={translateContent('vehicleDetail.productDetails.label.modelVariant')}>{checkAndSetDefaultValue(variantData?.length > 0 && variantData[0]?.variantDescription, isLoading)}</Descriptions.Item>
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
                <Panel header={translateContent('vehicleDetail.productDetails.heading.aggregateTitle')} key="3">
                    <Divider />
                    <DataTable tableColumn={tableColumn({ formActionType, bindCodeValue, ITEM_TYPE })} tableData={optionalServices} pagination={false} />
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
