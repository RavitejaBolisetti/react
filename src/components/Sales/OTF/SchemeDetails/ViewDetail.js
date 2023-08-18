/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Collapse, Descriptions, Divider } from 'antd';

import { expandIcon } from 'utils/accordianExpandIcon';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

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
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} expandIconPosition="end">
                                <Panel header={`Scheme ${index + 1}`} key={schemeForm?.id}>
                                    <Divider />
                                    <Descriptions {...viewProps}>
                                        <Descriptions.Item label="Scheme Type">{checkAndSetDefaultValue(schemeForm?.schemeType, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Scheme Category">{checkAndSetDefaultValue(schemeForm?.schemeCategory, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Amount">{checkAndSetDefaultValue(schemeForm?.amount, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Valid From">{checkAndSetDefaultValue(schemeForm?.validFrom, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="Valid To">{checkAndSetDefaultValue(schemeForm?.validTo, isLoading)}</Descriptions.Item>
                                        <Descriptions.Item label="" />
                                        <Descriptions.Item label="Description">{checkAndSetDefaultValue(schemeForm?.description, isLoading)}</Descriptions.Item>
                                    </Descriptions>
                                </Panel>
                            </Collapse>
                        ))
                    ) : (
                        <Card>
                            <div className={styles.marB20}>No Scheme and Offer Details Available</div>
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
