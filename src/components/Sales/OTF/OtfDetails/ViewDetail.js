import React from 'react';
import { Card, Descriptions } from 'antd';
import styles from 'components/common/Common.module.css';

const ViewDetailMain = (props) => {
    const { formData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Initial Promise Delivery Date">{formData?.initialPromiseDeliveryDate}</Descriptions.Item>
                <Descriptions.Item label="Cust. Expected Delivery Date">{formData?.custExpectedDeliveryDate}</Descriptions.Item>
                <Descriptions.Item label="Sale Type">{formData?.saleType}</Descriptions.Item>
                <Descriptions.Item label="Price Type">{formData?.priceType}</Descriptions.Item>
                <Descriptions.Item label="Booking Amount">{formData?.bookingAmount}</Descriptions.Item>
                <Descriptions.Item label="Sales Consultant">{formData?.saleConsultant}</Descriptions.Item>
                <Descriptions.Item label="Special Request">{formData?.specialRequest}</Descriptions.Item>
                <Descriptions.Item label="Place Of Registration">{formData?.placeOfRegistration}</Descriptions.Item>
                <Descriptions.Item label="Delivery At">{formData?.deliveryAt}</Descriptions.Item>
                <Descriptions.Item label="Referral">{formData?.referral}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Type">{formData?.mitraType}</Descriptions.Item>
                <Descriptions.Item label="Influencer/Mitra Name">{formData?.mitraName}</Descriptions.Item>
                <Descriptions.Item label="Mode Of Payment">{formData?.modeOfPAyment}</Descriptions.Item>
                <Descriptions.Item label="Finance Agreed">{formData?.financeArrangedBy}</Descriptions.Item>
                <Descriptions.Item label="Exchange">{formData?.exchange}</Descriptions.Item>
                <Descriptions.Item label="Loyality Scheme">{formData?.loyalityScheme}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
