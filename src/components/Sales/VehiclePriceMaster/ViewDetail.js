/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Descriptions } from 'antd';
import { withDrawer } from 'components/withDrawer';
import styles from 'components/common/Common.module.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DrawerFormButton } from 'components/common/Button';
import { vehiclePriceMasterDataAction } from 'store/actions/data/vehiclePriceMaster';
import { showGlobalNotification } from 'store/actions/notification';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehiclePriceMaster: { detailData },
        },
    } = state;

    let returnValue = {
        userId,
        detailData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchVehiclePriceDetail: vehiclePriceMasterDataAction.fetchDetail,
            listVehiclePriceShowLoading: vehiclePriceMasterDataAction.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});
const ViewDetailMain = (props) => {
    const { userId, formData, fetchVehiclePriceDetail, buttonProps } = props;
    const [vehiclePrice, setVehiclePrice] = useState();
    const [isLoading, showLoading] = useState(true);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
    };

    useEffect(() => {
        if (formData?.id) {
            fetchVehiclePriceDetail({
                setIsLoading: () => {},
                userId,
                extraParams: [
                    {
                        key: 'id',
                        value: formData?.id,
                    },
                ],
                onSuccessAction: (res) => {
                    setVehiclePrice(res.data);
                    showLoading(false);
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <>
            <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Effective From">{checkAndSetDefaultValue(vehiclePrice?.effectiveFrom, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Effective To">{checkAndSetDefaultValue(vehiclePrice?.effectiveTo, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Plant">{checkAndSetDefaultValue(vehiclePrice?.plant, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="State">{checkAndSetDefaultValue(vehiclePrice?.state, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="City">{checkAndSetDefaultValue(vehiclePrice?.city, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="City Code">{checkAndSetDefaultValue(vehiclePrice?.cityCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(vehiclePrice?.modelCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(vehiclePrice?.modelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(vehiclePrice?.modelDescription, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Distribution Channel">{checkAndSetDefaultValue(vehiclePrice?.distributionChannel, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Price Type">{checkAndSetDefaultValue(vehiclePrice?.priceType, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="GST">{checkAndSetDefaultValue(vehiclePrice?.gst, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Cess">{checkAndSetDefaultValue(vehiclePrice?.cess, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="GST Amount">{checkAndSetDefaultValue(vehiclePrice?.gstAmount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="MM Invoice Amount">{checkAndSetDefaultValue(vehiclePrice?.mmInvoiceAmount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Margin">{checkAndSetDefaultValue(vehiclePrice?.dealerMargin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="GST Amount on Dealer Margin">{checkAndSetDefaultValue(vehiclePrice?.gstAmountOndealerMargin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Net Dealer Price">{checkAndSetDefaultValue(vehiclePrice?.netDealerPrice, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Selling Price">{checkAndSetDefaultValue(vehiclePrice?.sellingPrice, isLoading)}</Descriptions.Item>
                </Descriptions>
            </div>

            <DrawerFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain), {});
