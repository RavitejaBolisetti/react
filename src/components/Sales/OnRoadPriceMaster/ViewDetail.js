/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Descriptions } from 'antd';
import { withDrawer } from 'components/withDrawer';
import styles from 'assets/sass/app.module.scss';
import { OnRoadPriceFormButton } from './OnRoadPriceFormButton';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { vehiclePrice, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 4, xl: 4, lg: 4, md: 4, sm: 4, xs: 4 },
    };
    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.viewContainer}>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.model')}>{checkAndSetDefaultValue(vehiclePrice?.model, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.stateCode')}>{checkAndSetDefaultValue(vehiclePrice?.stateCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.cityCode')}>{checkAndSetDefaultValue(vehiclePrice?.pricingCityCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.currentEXShowroomPrice')}>{checkAndSetDefaultValue(vehiclePrice?.currentExShowroomPrice, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.currentEXShowroomDate')}>{checkAndSetDefaultValue(vehiclePrice?.currentExShowroomDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.TCSwithGST')}>{checkAndSetDefaultValue(vehiclePrice?.tcsWithGst, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.EPC')}>{checkAndSetDefaultValue(vehiclePrice?.epc, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.registrationCharges')}>{checkAndSetDefaultValue(vehiclePrice?.registrationCharges, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.fastTag')}>{checkAndSetDefaultValue(vehiclePrice?.fastTag, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.insurancePremium')}>{checkAndSetDefaultValue(vehiclePrice?.insurancePremiunm, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.addonZeroDepwithTax')}>{checkAndSetDefaultValue(vehiclePrice?.addOnZeroDepWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.comprehensiveInsurance')}>{checkAndSetDefaultValue(vehiclePrice?.comprehensiveInsurance, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.basicOnRoadPrice')}>{checkAndSetDefaultValue(vehiclePrice?.basicOnRoadPrice, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.consumerSchemeWithTax')}>{checkAndSetDefaultValue(vehiclePrice?.consumerSchemaWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.RSAwithTax')}>{checkAndSetDefaultValue(vehiclePrice?.rsaWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.shieldWithTax')}>{checkAndSetDefaultValue(vehiclePrice?.shieldWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.AMCwithTax')}>{checkAndSetDefaultValue(vehiclePrice?.amcWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.ODdiscount')}>{checkAndSetDefaultValue(vehiclePrice?.odDiscount, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.dealerDiscountWithTax')}>{checkAndSetDefaultValue(vehiclePrice?.dealerDiscountWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.otherCharges')}>{checkAndSetDefaultValue(vehiclePrice?.otherCharges, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label={translateContent('onRoadPriceMaster.label.essentialKitWithTax')}>{checkAndSetDefaultValue(vehiclePrice?.essentialKitWithTax, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Col>
            </Row>
            <OnRoadPriceFormButton {...props} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, { width: '90%' });
