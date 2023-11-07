/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Row, Col, Descriptions } from 'antd';
import { withDrawer } from 'components/withDrawer';

import styles from 'assets/sass/app.module.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DrawerFormButton } from 'components/common/Button';
import { vehiclePriceMasterDataAction } from 'store/actions/data/vehiclePriceMaster';
import { showGlobalNotification } from 'store/actions/notification';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

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
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.viewContainer}>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.effectiveFrom')}>{checkAndSetDefaultValue(vehiclePrice?.effectiveFrom, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.effectiveTo')}>{checkAndSetDefaultValue(vehiclePrice?.effectiveTo, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.plant')}>{checkAndSetDefaultValue(vehiclePrice?.plant, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.state')}>{checkAndSetDefaultValue(vehiclePrice?.state, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.city')}>{checkAndSetDefaultValue(vehiclePrice?.city, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.cityCode')}>{checkAndSetDefaultValue(vehiclePrice?.cityCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.modelCode')}>{checkAndSetDefaultValue(vehiclePrice?.modelCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.modelGroup')}>{checkAndSetDefaultValue(vehiclePrice?.modelGroup, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.modelDescription')}>{checkAndSetDefaultValue(vehiclePrice?.modelDescription, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.distributionChannel')}>{checkAndSetDefaultValue(vehiclePrice?.distributionChannel, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.priceType')}>{checkAndSetDefaultValue(vehiclePrice?.priceType, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.gst')}>{checkAndSetDefaultValue(vehiclePrice?.gst, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.cess')}>{checkAndSetDefaultValue(vehiclePrice?.cess, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.gstAmount')}>{checkAndSetDefaultValue(vehiclePrice?.gstAmount, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.mnmInvoiceAmount')}>{checkAndSetDefaultValue(vehiclePrice?.mmInvoiceAmount, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.dealerMargin')}>{checkAndSetDefaultValue(vehiclePrice?.dealerMargin, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.gstAmountDealerMargin')}>{checkAndSetDefaultValue(vehiclePrice?.gstAmountOndealerMargin, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.netDealer')}>{checkAndSetDefaultValue(vehiclePrice?.netDealerPrice, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('vehiclePriceMaster.label.sellingPrice')}>{checkAndSetDefaultValue(vehiclePrice?.sellingPrice, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </>
    );
};

export const ViewDetail = withDrawer(connect(mapStateToProps, mapDispatchToProps)(ViewDetailMain), {});
