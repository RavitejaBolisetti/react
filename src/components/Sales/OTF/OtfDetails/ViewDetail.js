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
    const { formData } = props;

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
                <Descriptions.Item label="Initial Promise Delivery Date">{checkAndSetDefaultValue(promiseDeliveryDate)}</Descriptions.Item>
                <Descriptions.Item label="Cust. Expected Delivery Date">{checkAndSetDefaultValue(expectedDeliveryDate)}</Descriptions.Item>
                <Descriptions.Item label="Sale Type">{checkAndSetDefaultValue(formData?.saleType)}</Descriptions.Item>
                <Descriptions.Item label="Price Type">{checkAndSetDefaultValue(formData?.priceType === 'INDV' ? 'Individual' : 'Corporate')}</Descriptions.Item>
                <Descriptions.Item label="Booking Amount">{checkAndSetDefaultValue(formData?.bookingAmount)}</Descriptions.Item>
                <Descriptions.Item label="Sales Consultant">{checkAndSetDefaultValue(formData?.saleConsultant)}</Descriptions.Item>
                <Descriptions.Item label="Special Request">{checkAndSetDefaultValue(formData?.specialRequest)}</Descriptions.Item>
                <Descriptions.Item label="Place Of Registration">{checkAndSetDefaultValue(formData?.placeOfRegistration)}</Descriptions.Item>
                <Descriptions.Item label="Delivery At">{checkAndSetDefaultValue(formData?.deliveryAt === 'OFC' ? 'Office' : formData?.deliveryAt === 'HOM' ? 'Home' : 'Showroom')}</Descriptions.Item>
                <Descriptions.Item label="Referral">{checkAndSetDefaultValue(formData?.referral === 'Y' ? 'Yes' : 'No')}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Type">{checkAndSetDefaultValue(formData?.mitraType)}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Name">{checkAndSetDefaultValue(formData?.mitraName)}</Descriptions.Item>
                <Descriptions.Item label="Mode Of Payment">{checkAndSetDefaultValue(formData?.modeOfPAyment)}</Descriptions.Item>
                <Descriptions.Item label="Finance Agreed">{checkAndSetDefaultValue(formData?.financeArrangedBy)}</Descriptions.Item>
                <Descriptions.Item label="Exchange">{formData?.exchange === 1 ? <span className={styles.activeText}>Yes</span> : 'No'}</Descriptions.Item>
                <Descriptions.Item label="Loyality Scheme">{formData?.loyalityScheme === 1 ? <span className={styles.activeText}>Yes</span> : 'No'}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
