/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { convertDate, converDateDayjs, dateFormatView } from 'utils/formatDateTime';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = ({ formData, styles, isLoading = false }) => {
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
                    <Descriptions.Item label={translateContent('tehsil.label.stateCode')}>{checkAndSetDefaultValue(formData?.stateName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('tehsil.label.districtCode')}>{checkAndSetDefaultValue(formData?.districtName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('tehsil.label.tehsilCode')}>{checkAndSetDefaultValue(formData?.code, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('tehsil.label.tehsilName')}>{checkAndSetDefaultValue(formData?.name, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('tehsil.label.tehsilCategoryCode')}>{checkAndSetDefaultValue(formData?.tehsilCategoryName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('tehsil.label.includedOn')}>{checkAndSetDefaultValue(formData?.includedOn, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('global.label.status')}>
                    <span className={formData?.status ? styles.activeText : styles?.inactiveText}>{checkAndSetDefaultValue(formData?.status ? translateContent('global.label.active') : translateContent('global.label.inActive'), isLoading)}</span>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
