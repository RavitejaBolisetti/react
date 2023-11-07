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
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData, salesConsultantLov } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
        title: (
            <>
                <div className={styles.caption}>{translateContent('bookingManagement.label.salesDetails')}</div>
                <Divider />
            </>
        ),
    };

    return (
        <Card>
        <Descriptions {...viewProps} title={prepareCaption(translateContent('bookingManagement.label.orderDetails'))}>
            <Descriptions.Item label={translateContent('bookingManagement.label.bookingAmount')}>{checkAndSetDefaultValue(formData?.bookingAmount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('bookingManagement.label.placeOfRegistration')}>{checkAndSetDefaultValue(formData?.placeOfRegistration, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('bookingManagement.label.specialRequest')}>{checkAndSetDefaultValue(formData?.specialRequest, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('bookingManagement.label.modeOfPAyment')}>{checkAndSetDefaultValue(formData?.modeOfPAyment, isLoading)}</Descriptions.Item>
        </Descriptions>

        <Descriptions {...viewProps} title={prepareCaption(translateContent('bookingManagement.label.deliveryDetails'))}>
            <Descriptions.Item label={translateContent('bookingManagement.label.initialPromiseDeliveryDate')}>{checkAndSetDefaultValue(formData?.initialPromiseDeliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('bookingManagement.label.customerExpectedDeliveryDate')}>{checkAndSetDefaultValue(formData?.custExpectedDeliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('bookingManagement.label.deliveryAt')}>{checkAndSetDefaultValue(getCodeValue(typeData?.DELIVERYAT_IND, formData?.deliveryAt), isLoading)}</Descriptions.Item>
        </Descriptions>

        <Descriptions {...viewProps} title={prepareCaption(translateContent('bookingManagement.label.salesDetails'))}>
            <Descriptions.Item label={translateContent('bookingManagement.label.saleConsultant')}>{checkAndSetDefaultValue(getCodeValue(salesConsultantLov, formData?.saleConsultant), isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('bookingManagement.label.mitraType')}>{checkAndSetDefaultValue(formData?.mitraType, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('bookingManagement.label.mitraName')}>{checkAndSetDefaultValue(formData?.mitraName, isLoading)}</Descriptions.Item>
        </Descriptions>

        <Descriptions {...viewProps} title={prepareCaption(translateContent('bookingManagement.label.otherDetails'))}>
            <Descriptions.Item label={translateContent('bookingManagement.label.referralScheme')}>{checkAndSetDefaultValue(formData?.referral === 'Y' ? <span className={styles.activeText}>{translateContent('global.yesNo.yes')}</span> : translateContent('global.yesNo.no'), isLoading)}</Descriptions.Item>
            <Descriptions.Item label={translateContent('bookingManagement.label.loyaltyScheme')}>{checkAndSetDefaultValue(formData?.loyaltyScheme ? <span className={styles.activeText}>{translateContent('global.yesNo.yes')}</span> : translateContent('global.yesNo.no'), isLoading)}</Descriptions.Item>
        </Descriptions>
    </Card>
    );
};

export const ViewDetail = ViewDetailMain;
