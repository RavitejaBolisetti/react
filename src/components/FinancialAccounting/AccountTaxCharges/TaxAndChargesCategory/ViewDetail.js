/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Collapse, Divider } from 'antd';
import CardProductAttribute from './TaxAndChargesCalculation/CardTaxAndChargeCal';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const expandIcon = ({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);

const ViewDetailBase = ({ styles, taxCharges, taxCategory, setDisabledEdit, stateData, saleData }) => {
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
                    <Descriptions.Item label={translateContent('taxChargeCatagory.label.code')}>{taxCategory?.taxCategoryCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('taxChargeCatagory.label.description')}>{taxCategory?.taxCategoryDescription}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('taxChargeCatagory.label.status')}>{taxCategory?.status === true ? 'Active' : taxCategory?.status === false ? 'Inactive' : null}</Descriptions.Item>
                    <div>
                        {taxCategory?.taxCategoryDetail?.length > 0 && (
                            <Collapse expandIcon={expandIcon} collapsible="icon" className={styles.fullWidth}>
                                <Panel header={translateContent('taxChargeCatagory.heading.panelHeader')} key="2">
                                    <Divider />
                                    {taxCategory?.taxCategoryDetail?.map((item) => (
                                        <CardProductAttribute key={'tax' + item?.taxChargeTypeCode} chargeCode={item?.chargeCode} chargeDescription={item?.chargeDescription} chargeType={item?.chargeType} id={item?.id} setDisabledEdit={setDisabledEdit} taxCharges={taxCharges} gstStateCode={item?.gstStateCode} saleType={item?.saleType} stateData={stateData} saleData={saleData} />
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
