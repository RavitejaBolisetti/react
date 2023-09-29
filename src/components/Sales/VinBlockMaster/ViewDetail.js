/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Descriptions } from 'antd';
import { withDrawer } from 'components/withDrawer';
import styles from 'assets/sass/app.module.scss';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { VinBlockFormButton } from './VinBlockFormButton';

const ViewDetailMain = (props) => {
    const { vinInfo, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.viewContainer}>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="VIN">{checkAndSetDefaultValue(vinInfo?.vinNumber, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Dealer Code">{checkAndSetDefaultValue(vinInfo?.dealerCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Group Code">{checkAndSetDefaultValue(vinInfo?.modelGroupCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(vinInfo?.modelCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Varient Code">{checkAndSetDefaultValue(vinInfo?.variantCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Color">{checkAndSetDefaultValue(vinInfo?.color, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </Col>
            </Row>
            <VinBlockFormButton {...props} />
        </>
    );
};

// export const ViewDetail = withDrawer((ViewDetailMain), {width:'90%'});
export const ViewDetail = withDrawer(ViewDetailMain, {});
