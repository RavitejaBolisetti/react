/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Descriptions, Row, Col } from 'antd';
import { expandIcon } from 'utils/accordianExpandIcon';
import { DataTable } from 'utils/dataTable';
import { tableColumnAddEdit } from './tableColumnAddEdit';
import styles from 'assets/sass/app.module.scss';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, handleButtonClick, typeData, formActionType, tableData } = props;

    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
            <>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('digitalSignature.label.dealerName')}>{checkAndSetDefaultValue(formData?.dealerName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('digitalSignature.label.employeeName')}>{checkAndSetDefaultValue(formData?.employeeName, isLoading)}</Descriptions.Item>
                </Descriptions>
                <div className={styles.innerCollapse}>
                    <Collapse defaultActiveKey={['1']} expandIcon={expandIcon} expandIconPosition="end">
                        <Panel key="1" header={translateContent('digitalSignature.heading.branchesAccessible')}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <DataTable tableColumn={tableColumnAddEdit({ handleButtonClick, typeData, formActionType })} tableData={tableData} pagination={false} />
                                </Col>
                            </Row>
                        </Panel>
                    </Collapse>
                </div>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
