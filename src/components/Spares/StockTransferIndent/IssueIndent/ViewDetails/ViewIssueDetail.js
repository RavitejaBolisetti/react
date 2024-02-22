/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Button, Row, Col } from 'antd';

import { PARAM_MASTER } from 'constants/paramMaster';
import { BUTTON_NAME_CONSTANTS, ISSUE_ACTION_LIST } from '../../constants';

import { handleBtnVisibility } from '../../utils';
import { converDateDayjs } from 'utils/formatDateTime';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { RxCross1 } from 'react-icons/rx';

export const ViewIssueDetail = ({ formData, isLoading = false, typeData, handleRequest, toggleButton, issueData, setIssueData, parentKey, childKey }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 4, xl: 4, xxl: 4 },
    };

    const viewData = {
        ...formData,
    };

    const buttonVisibility = handleBtnVisibility({ toggleButton, checkKey: formData?.issueStatus });
    return (
        <Card>
            <Row>
                <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={translateContent('Store' || 'stockTransferIndent.issueIndent.viewDetails.label.stIssueNo')}>{checkAndSetDefaultValue(viewData?.store, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('Bin Location' || 'stockTransferIndent.issueIndent.viewDetails.label.stIssueNoteDate')}>{checkAndSetDefaultValue(viewData?.binLocation, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('Current Stock' || 'stockTransferIndent.issueIndent.viewDetails.label.stIssueNoteStatus')}>{checkAndSetDefaultValue(viewData?.currentStock, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={translateContent('Issued Qty' || 'stockTransferIndent.issueIndent.viewDetails.label.stIssueNoteStatus')}>{checkAndSetDefaultValue(viewData?.issuedQty, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col className={styles.fullyCentered} xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Button
                        icon={<RxCross1 />}
                        type="link"
                        onClick={() =>
                            setIssueData((prev) => {
                                const newArr = prev.map((item, idx) => {
                                    if (idx === parentKey && item?.issueDetails) {
                                        return { issueDetails: item?.issueDetails.filter((i, idx2) => childKey !== idx2) };
                                    }
                                    return item;
                                });
                                return newArr;
                            })
                        }
                    />
                </Col>
            </Row>

            {/* <Row gutter={20} className={styles.marB20}>
                <Button danger onClick={() => handleRequest(formData, ISSUE_ACTION_LIST?.RETURNED)}>
                    {BUTTON_NAME_CONSTANTS?.RETURN?.name}
                </Button>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={`${styles.buttonsGroup} ${styles.marB20}`}>
                    {buttonVisibility?.canReceive && (
                        <Button type="primary" onClick={() => handleRequest(formData, ISSUE_ACTION_LIST?.RECEIVED)}>
                            {BUTTON_NAME_CONSTANTS?.RECEIEVED?.name}
                        </Button>
                    )}
                    {buttonVisibility?.canReturn && (
                        <Button danger onClick={() => handleRequest(formData, ISSUE_ACTION_LIST?.RETURNED)}>
                            {BUTTON_NAME_CONSTANTS?.RETURN?.name}
                        </Button>
                    )}
                </Col>
            </Row> */}
        </Card>
    );
};
