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
                            <Descriptions.Item label="Model">{checkAndSetDefaultValue(vehiclePrice?.model, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="State Code">{checkAndSetDefaultValue(vehiclePrice?.stateCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="City Code">{checkAndSetDefaultValue(vehiclePrice?.pricingCityCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Current EX Showroom Price">{checkAndSetDefaultValue(vehiclePrice?.currentExShowroomPrice, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Current EX Showroom Date">{checkAndSetDefaultValue(vehiclePrice?.currentExShowroomDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                            <Descriptions.Item label="TCS with GST">{checkAndSetDefaultValue(vehiclePrice?.tcsWithGst, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="EPC">{checkAndSetDefaultValue(vehiclePrice?.epc, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Registration Charges">{checkAndSetDefaultValue(vehiclePrice?.registrationCharges, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Fast Tag">{checkAndSetDefaultValue(vehiclePrice?.fastTag, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Insurance Premium(1+3Yr TP)">{checkAndSetDefaultValue(vehiclePrice?.insurancePremiunm, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Add on Zero Dep with Tax">{checkAndSetDefaultValue(vehiclePrice?.addOnZeroDepWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Comprehensive Insurance">{checkAndSetDefaultValue(vehiclePrice?.comprehensiveInsurance, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Basic on Road Price">{checkAndSetDefaultValue(vehiclePrice?.basicOnRoadPrice, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Consumer Scheme with Tax">{checkAndSetDefaultValue(vehiclePrice?.consumerSchemaWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="RSA with Tax">{checkAndSetDefaultValue(vehiclePrice?.rsaWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Shield with Tax">{checkAndSetDefaultValue(vehiclePrice?.shieldWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="AMC with Tax">{checkAndSetDefaultValue(vehiclePrice?.amcWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="OD discount%">{checkAndSetDefaultValue(vehiclePrice?.odDiscount, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Dealer discount with Tax">{checkAndSetDefaultValue(vehiclePrice?.dealerDiscountWithTax, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Other Charges">{checkAndSetDefaultValue(vehiclePrice?.otherCharges, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Essential Kit with Tax">{checkAndSetDefaultValue(vehiclePrice?.essentialKitWithTax, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Col>
            </Row>
            <OnRoadPriceFormButton {...props} />
        </>
    );
};

export const ViewDetail = withDrawer(ViewDetailMain, { width: '90%' });
