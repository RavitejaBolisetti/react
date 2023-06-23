/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import styles from 'components/common/Common.module.css';
import dayjs from 'dayjs';

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
                <Descriptions.Item label="Initial Promise Delivery Date">{promiseDeliveryDate}</Descriptions.Item>
                <Descriptions.Item label="Cust. Expected Delivery Date">{expectedDeliveryDate}</Descriptions.Item>
                <Descriptions.Item label="Sale Type">{formData?.saleType}</Descriptions.Item>
                <Descriptions.Item label="Price Type">{formData?.priceType === 'INDV' ? 'Individual' : 'Corporate'}</Descriptions.Item>
                <Descriptions.Item label="Booking Amount">{formData?.bookingAmount}</Descriptions.Item>
                <Descriptions.Item label="Sales Consultant">{formData?.saleConsultant}</Descriptions.Item>
                <Descriptions.Item label="Special Request">{formData?.specialRequest}</Descriptions.Item>
                <Descriptions.Item label="Place Of Registration">{formData?.placeOfRegistration}</Descriptions.Item>
                <Descriptions.Item label="Delivery At">{formData?.deliveryAt === 'OFC' ? 'Office' : formData?.deliveryAt === 'HOM' ? 'Home' : 'Showroom'}</Descriptions.Item>
                <Descriptions.Item label="Referral">{formData?.referral === 'Y' ? 'Yes' : 'No'}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Type">{formData?.mitraType}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Name">{formData?.mitraName}</Descriptions.Item>
                <Descriptions.Item label="Mode Of Payment">{formData?.modeOfPAyment}</Descriptions.Item>
                <Descriptions.Item label="Finance Agreed">{formData?.financeArrangedBy}</Descriptions.Item>
                <Descriptions.Item label="Exchange">{formData?.exchange === 1 ? <span className={styles.activeText}>Yes</span> : 'No'}</Descriptions.Item>
                <Descriptions.Item label="Loyality Scheme">{formData?.loyalityScheme === 1 ? <span className={styles.activeText}>Yes</span> : 'No'}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
