/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Col, Row, Divider, Collapse } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import { DATA_TYPE } from 'constants/dataType';
import { getCodeValue } from 'utils/getCodeValue';
import { DataTable } from 'utils/dataTable';

import styles from 'assets/sass/app.module.scss';
import { productTableColumn } from './productTableColumn';
import { expandIcon } from 'utils/accordianExpandIcon';
import { zoneAreaTableColumn } from './zoneAreaTableColumn';
import { OFFER_TYPE_CONSTANTS } from './constants/offerTypeCodeConstants';
import { translateContent } from 'utils/translateContent';
import { SCHEME_TYPE_CONSTANTS } from './constants/schemeTypeConstants';

const ViewDetailMain = (props) => {
    const { formData, isLoading, schemeTypeData, offerTypeData, encashTypeData, tableDataItem, zoneTableDataItem, activeKey, onChange } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 4, xl: 4, xxl: 4 },
    };
    const { Panel } = Collapse;

    const productTableProps = {
        tableColumn: productTableColumn(),
        tableData: tableDataItem,
    };
    const zoneAreaTableProps = {
        tableColumn: zoneAreaTableColumn(),
        tableDataItem: zoneTableDataItem,
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header={translateContent('vehicleSalesSchemeMaster.label.schemeDetails')} key="1">
                            <Divider />

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Descriptions {...viewProps}>
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.manufacturerOrganisation')}>{checkAndSetDefaultValue(formData?.adminShortName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.schemeType')}>{checkAndSetDefaultValue(getCodeValue(schemeTypeData, formData?.schemeType), isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.schemeDescription')}>{checkAndSetDefaultValue(formData?.schemeDescription)}</Descriptions.Item>
                                    {[SCHEME_TYPE_CONSTANTS?.RSA_FOC?.key,SCHEME_TYPE_CONSTANTS?.AMC_FOC?.key, SCHEME_TYPE_CONSTANTS?.SHIELD_FOC?.key]?.includes(formData?.schemeType) && <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.schemeCategory')}>{checkAndSetDefaultValue(formData?.schemeCategory)}</Descriptions.Item>}
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.offerType')}>{checkAndSetDefaultValue(getCodeValue(offerTypeData, formData?.offerType), isLoading)}</Descriptions.Item>
                                    {formData?.offerType === OFFER_TYPE_CONSTANTS?.DISCOUNT?.key && (
                                        <>
                                            <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.amountWithoutTax')}>{checkAndSetDefaultValue(formData?.amountWithoutTax, isLoading)}</Descriptions.Item>
                                            <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.amountWithTax')}>{checkAndSetDefaultValue(formData?.amountWithTax, isLoading)}</Descriptions.Item>
                                        </>
                                    )}
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.validityFromDate')}>{checkAndSetDefaultValue(formData?.validityFromDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.validityToDate')}>{checkAndSetDefaultValue(formData?.validityToDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.vehicleInvoiceFromDate')}>{checkAndSetDefaultValue(formData?.vehicleInvoiceFromDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.vehicleInvoiceToDate')}>{checkAndSetDefaultValue(formData?.vehicleInvoiceToDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.encash')}>{checkAndSetDefaultValue(getCodeValue(encashTypeData, formData?.encash), isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                        <Panel key={2} header={translateContent('vehicleSalesSchemeMaster.label.zoneDetails')}>
                            <Divider />
                            <DataTable {...zoneAreaTableProps} />
                        </Panel>
                    </Collapse>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(3)} expandIconPosition="end">
                        <Panel key={3} header={translateContent('vehicleSalesSchemeMaster.label.productDetails')}>
                            <Divider />
                            <DataTable {...productTableProps} />
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
