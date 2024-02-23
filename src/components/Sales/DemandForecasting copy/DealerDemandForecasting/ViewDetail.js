/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = (props) => {
    const { formData, styles, isLoading, addData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('partMaster.label.store')}>{'Store name1'||checkAndSetDefaultValue(getCodeValue(addData, formData?.storename), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partMaster.label.binLocation')}>{'Bin Location1'||checkAndSetDefaultValue(formData?.binlocation, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partMaster.label.stockinhand')}>{'200'||checkAndSetDefaultValue(formData?.stockinhand, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partMaster.label.allocatedstock')}>{'100'||checkAndSetDefaultValue(formData?.addressLine3, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partMaster.label.remarks')}>{'Remark in details'||checkAndSetDefaultValue(formData?.pinCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partMaster.placeholder.active')}>{'Active'||checkAndSetDefaultValue(formData?.tehsilName, isLoading)}</Descriptions.Item>
                     <Descriptions.Item>{formData?.deafultAddressIndicator}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
