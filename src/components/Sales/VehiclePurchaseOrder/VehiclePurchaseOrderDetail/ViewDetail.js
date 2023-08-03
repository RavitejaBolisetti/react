/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Space, Collapse, Descriptions, Card } from 'antd';

import styles from 'components/common/Common.module.css';
import dayjs from 'dayjs';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { USER_TYPE } from 'constants/userType';
import { withDrawer } from 'components/withDrawer';
import { VehiclePurchaseOrderFormButton } from '../VehiclePurchaseOrderFormButton';

import { expandIcon } from 'utils/accordianExpandIcon';
const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, activeKey, onChange, userType } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 2, xl: 2, xxl: 2 },
    };

    const deliveryDate = dayjs(formData?.deliveryDate).format('DD/MM/YYYY');

    return (
        <>
            <Card className={styles.ExchangeCard}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Order Type">{'Against Stock'}</Descriptions.Item>
                    <Descriptions.Item label="Purchase Order Number">{'PO10001'}</Descriptions.Item>
                    <Descriptions.Item label="Purchase Order Date">
                        {/* {checkAndSetDefaultValue(deliveryDate, isLoading)} */}
                        {checkAndSetDefaultValue(formData?.deliveryDate, isLoading, DATA_TYPE?.DATE?.key)}
                        </Descriptions.Item>
                    <Descriptions.Item label="Purchase Order Status">{'Open'}</Descriptions.Item>
                    <Descriptions.Item label="Purchase Cancel Date">
                        {checkAndSetDefaultValue(formData?.deliveryDate, isLoading)}
                        {/* {checkAndSetDefaultValue(formData?.deliveryDate, isLoading, DATA_TYPE?.DATE?.key)} */}
                        </Descriptions.Item>
                    {/* <Descriptions.Item label="SO Number">{'SO10237'}</Descriptions.Item>
                                    <Descriptions.Item label="SO Date">{checkAndSetDefaultValue(deliveryDate, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label="SO Status">{'Cancel'}</Descriptions.Item> */}
                </Descriptions>

                <h4> Product Details</h4>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Model">{'XUV300'}</Descriptions.Item>
                    <Descriptions.Item label="Quantity">{2}</Descriptions.Item>
                </Descriptions>
                <h4> Cancel Remarks</h4>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="">{'Cancel Reason for vehicle purchase order'}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
