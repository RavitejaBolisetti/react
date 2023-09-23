/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Collapse, Divider } from 'antd';
import CardProductAttribute from './TaxAndChargesCalculation/CardTaxAndChargeCal';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
const { Panel } = Collapse;

const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);

const ViewDetailBase = ({ formData, styles, parameterType, taxCharges, taxCategory, setDisabledEdit }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={styles.viewContainer}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Code">{taxCategory?.taxCategoryCode}</Descriptions.Item>
                    <Descriptions.Item label="Description">{taxCategory?.taxCategoryDescription}</Descriptions.Item>
                    <Descriptions.Item label="State">{taxCategory?.stateName}</Descriptions.Item>
                    <Descriptions.Item label="Sale Type">{taxCategory?.saleType}</Descriptions.Item>
                    <div>
                        {taxCategory?.taxCategoryDetail?.length > 0 && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" className={styles.fullWidth}>
                                <Panel header="Tax & Charges Calculation" key="2">
                                    <Divider />
                                    {taxCategory?.taxCategoryDetail?.map((item, index) => (
                                        <CardProductAttribute key={'tax' + item?.taxChargeTypeCode} chargeCode={item?.chargeCode} chargeDescription={item?.chargeDescription} chargeType={item?.chargeType} id={item?.id} setDisabledEdit={setDisabledEdit} taxCharges={taxCharges} />
                                    ))}
                                </Panel>
                            </Collapse>
                        )}
                    </div>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
