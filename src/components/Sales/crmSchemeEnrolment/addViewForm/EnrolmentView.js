/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const EnrolmentMain = (props) => {
    const { isLoading, detailData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.enrolmentNumber')}>{checkAndSetDefaultValue(detailData?.enrolmentDetailsDto?.enrollmentNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.enrolmentDate')}>{checkAndSetDefaultValue(detailData?.enrolmentDetailsDto?.enrollmentDate, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.enrolmentStatus')}>{checkAndSetDefaultValue(detailData?.enrolmentDetailsDto?.enrollmentStatus === true ? 'Active' : 'Inactive', isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.schemeType')}>{checkAndSetDefaultValue(detailData?.enrolmentDetailsDto?.schemeType, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.vin')}>{checkAndSetDefaultValue(detailData?.enrolmentDetailsDto?.vin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.bookletNumber')}>{checkAndSetDefaultValue(detailData?.enrolmentDetailsDto?.bookletNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('crmSchemeEnrolment.label.enrolledBy')}>{checkAndSetDefaultValue(detailData?.enrolmentDetailsDto?.enrolledBy, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export const EnrolmentView = EnrolmentMain;
