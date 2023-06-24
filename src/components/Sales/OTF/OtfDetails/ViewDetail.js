/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import styles from 'components/common/Common.module.css';
import dayjs from 'dayjs';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const promiseDeliveryDate = dayjs(formData?.initialPromiseDeliveryDate).format('DD/MM/YYYY');
    const expectedDeliveryDate = dayjs(formData?.custExpectedDeliveryDate).format('DD/MM/YYYY');

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Initial Promise Delivery Date">{checkAndSetDefaultValue(promiseDeliveryDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Cust. Expected Delivery Date">{checkAndSetDefaultValue(expectedDeliveryDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Sale Type">{checkAndSetDefaultValue(formData?.saleType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Price Type">{checkAndSetDefaultValue(formData?.priceType === 'INDV' ? 'Individual' : 'Corporate', isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Booking Amount">{checkAndSetDefaultValue(formData?.bookingAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Sales Consultant">{checkAndSetDefaultValue(formData?.saleConsultant, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Special Request">{checkAndSetDefaultValue(formData?.specialRequest, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Place Of Registration">{checkAndSetDefaultValue(formData?.placeOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Delivery At">{checkAndSetDefaultValue(formData?.deliveryAt === 'OFC' ? 'Office' : formData?.deliveryAt === 'HOM' ? 'Home' : 'Showroom', isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Referral">{checkAndSetDefaultValue(formData?.referral === 'Y' ? 'Yes' : 'No', isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Type">{checkAndSetDefaultValue(formData?.mitraType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Name">{checkAndSetDefaultValue(formData?.mitraName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Mode Of Payment">{checkAndSetDefaultValue(formData?.modeOfPAyment, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Finance Agreed">{checkAndSetDefaultValue(formData?.financeArrangedBy, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Exchange">{checkAndSetDefaultValue(formData?.exchange === 1 ? <span className={styles.activeText}>Yes</span> : 'No', isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Loyality Scheme">{checkAndSetDefaultValue(formData?.loyalityScheme === 1 ? <span className={styles.activeText}>Yes</span> : 'No', isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
