/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import dayjs from 'dayjs';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { getCodeValue } from 'utils/getCodeValue';
import { disableFieldsOnFutureDate } from 'utils/disableDate';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { formData, isLoading, soldByDealer, typeData, relationshipManagerData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.deliveryNoteFor')}>{checkAndSetDefaultValue(soldByDealer ? 'Vehicle Sold By Dealer' : 'Directly Billed Vehicle', isLoading)}</Descriptions.Item>
                {soldByDealer && (
                    <>
                        <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.invoiceNumber')}>{checkAndSetDefaultValue(formData?.invoiceNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    </>
                )}
                {!soldByDealer && <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.vin')}>{checkAndSetDefaultValue(soldByDealer ? formData?.vinNumber : formData?.chassisNumber, isLoading)}</Descriptions.Item>}
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.engineNumber')}>{checkAndSetDefaultValue(formData?.engineNumber, isLoading)}</Descriptions.Item>
                {soldByDealer && (
                    <>
                        <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.chassisNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.relationShipManager')}>{checkAndSetDefaultValue(getCodeValue(relationshipManagerData, formData?.relationShipManagerCode), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.customerPromiseDate')}>{checkAndSetDefaultValue(formData?.customerPromiseDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                        {formData?.customerPromiseDate && disableFieldsOnFutureDate(dayjs(formData?.customerPromiseDate)) && (
                            <>
                                <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.reasonForDelay')}>{checkAndSetDefaultValue(getCodeValue(typeData['DLVR_DLY_RSN'], formData?.reasonForDelay), isLoading)}</Descriptions.Item>
                                <br />
                                <Descriptions.Item label={translateContent('vehicleDeliveryNote.invoiceDetails.label.reasonForDelayRemarks')}>{checkAndSetDefaultValue(formData?.reasonForDelayRemarks, isLoading)}</Descriptions.Item>
                            </>
                        )}
                    </>
                )}
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
