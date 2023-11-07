/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Collapse, Descriptions, Divider } from 'antd';

import { expandIcon } from 'utils/accordianExpandIcon';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;
const ViewDetailMain = (props) => {
    const { activeKey, styles, schemeData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles?.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {schemeData && schemeData?.schemes?.length > 0 ? (
                        schemeData?.schemes?.map((schemeForm, index) => (
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} expandIconPosition="end" collapsible="icon">
                                <Panel header={`${translateContent('bookingManagement.label.scheme')} ${index + 1}`} key={schemeForm?.id}>
                                    <Divider />
                                    <Descriptions {...viewProps}>
                                        <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.schemeType')}>{checkAndSetDefaultValue(schemeForm?.schemeType, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.schemeCategory')}>{checkAndSetDefaultValue(schemeForm?.schemeCategory, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.Amount')}>{checkAndSetDefaultValue(schemeForm?.amount, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.validFrom')}>{checkAndSetDefaultValue(schemeForm?.validFrom, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                        <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.validTo')}>{checkAndSetDefaultValue(schemeForm?.validTo, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                                        <Descriptions.Item label="" />
                                        <Descriptions.Item label={translateContent('commonModules.label.schemeAndOfferDetails.description')}>{checkAndSetDefaultValue(schemeForm?.description, isLoading)}</Descriptions.Item>
                                    </Descriptions>
                                </Panel>
                            </Collapse>
                        ))
                    ) : (
                        <Card>
                            <div className={styles.marB20}>{translateContent('commonModules.label.schemeAndOfferDetails.noScheme')}</div>
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
