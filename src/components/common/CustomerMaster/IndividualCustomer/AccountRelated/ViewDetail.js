/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Card } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = (props) => {
    const { styles, formData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    // const renderCheckbox = (value) => {
    //     if (value) {
    //         return (
    //             <>
    //                 <Descriptions.Item>
    //                     <Checkbox valuePropName="checked" checked={formData?.vipDealerInd} defaultChecked={formData?.vipDealerInd} disabled>
    //                         VIP Dealer
    //                     </Checkbox>
    //                 </Descriptions.Item>
    //             </>
    //         );
    //     } else {
    //         return;
    //     }
    // };
    return (
        <div className={styles.viewDrawerContainer}>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('customerMaster.label.creditLimit')}>{checkAndSetDefaultValue(formData?.creditAmount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.limitDays')}>{checkAndSetDefaultValue(formData?.creditDays, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.amount')}>{checkAndSetDefaultValue(formData?.outstandingAmount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.parts')}>{checkAndSetDefaultValue(formData?.partsDiscount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.labour')}>{checkAndSetDefaultValue(formData?.labourDiscount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.remarks')}>{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
