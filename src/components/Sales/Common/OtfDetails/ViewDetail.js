/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Divider } from 'antd';
import styles from 'assets/sass/app.module.scss';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';
import { prepareCaption } from 'utils/prepareCaption';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, salesConsultantLov } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
        title: (
            <>
                <div className={styles.caption}>Sales Details</div>
                <Divider />
            </>
        ),
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps} title={prepareCaption('Order Details')}>
                <Descriptions.Item label="Booking Amount">{checkAndSetDefaultValue(formData?.bookingAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Place Of Registration">{checkAndSetDefaultValue(formData?.placeOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Special Request">{checkAndSetDefaultValue(formData?.specialRequest, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Mode Of Payment">{checkAndSetDefaultValue(formData?.modeOfPAyment, isLoading)}</Descriptions.Item>
            </Descriptions>

            <Descriptions {...viewProps} title={prepareCaption('Delivery Details')}>
                <Descriptions.Item label="Initial Promise Delivery Date">{checkAndSetDefaultValue(formData?.initialPromiseDeliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Cust. Expected Delivery Date">{checkAndSetDefaultValue(formData?.custExpectedDeliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Delivery At">{checkAndSetDefaultValue(getCodeValue(typeData?.DELIVERYAT_IND, formData?.deliveryAt), isLoading)}</Descriptions.Item>
            </Descriptions>

            <Descriptions {...viewProps} title={prepareCaption('Sales Details')}>
                <Descriptions.Item label="Sales Consultant">{checkAndSetDefaultValue(getCodeValue(salesConsultantLov, formData?.saleConsultant), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Type">{checkAndSetDefaultValue(formData?.mitraType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Name">{checkAndSetDefaultValue(formData?.mitraName, isLoading)}</Descriptions.Item>
            </Descriptions>

            <Descriptions {...viewProps} title={prepareCaption('Other Details')}>
                <Descriptions.Item label="Referral">{checkAndSetDefaultValue(formData?.referral === 'Y' ? <span className={styles.activeText}>Yes</span> : 'No', isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Loyality Scheme">{checkAndSetDefaultValue(formData?.loyaltyScheme ? <span className={styles.activeText}>Yes</span> : 'No', isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
