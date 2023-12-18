/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Col, Row, Descriptions } from 'antd';

import { translateContent } from 'utils/translateContent';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';

const ViewDetailMain = (props) => {
    const {  isLoading = false, revisedModelInformation,revisedProductAttributeData } = props;
    console.log("🚀 ~ file: ViewDetail.js:19 ~ ViewDetailMain ~ revisedProductAttributeData:", revisedProductAttributeData)

    const singleViewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
    };

    return (
        <div className={styles.cardInnerBox}>
            <Row gutter={20}>
                <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                    <Descriptions {...singleViewProps}>
                        <Descriptions.Item label={translateContent('bookingManagement.modelVariant.label.model')}>
                            <div className={styles?.tooltipAlign}>
                                {checkAndSetDefaultValue(revisedProductAttributeData?.prodctShrtName, isLoading)}
                                {revisedModelInformation && <div className={styles.modelTooltip}>{addToolTip(revisedModelInformation, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}</div>}
                            </div>
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                    <Descriptions {...singleViewProps}>
                        <Descriptions.Item label={translateContent('bookingManagement.modelVariant.label.modelCode')}>{checkAndSetDefaultValue(revisedProductAttributeData?.prodctCode, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
