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

export const ViewIssueDetail = ({ formData, isLoading = false, typeData, handleRequest, toggleButton }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const viewData = {
        ...formData,
        issueDate: converDateDayjs(formData?.issueDate),
        oemInvoiceDate: converDateDayjs(formData?.oemInvoiceDate),
        grnDate: converDateDayjs(formData?.grnDate),
        issueStatus: typeData[PARAM_MASTER?.ISS_STS?.id]?.find((i) => i?.key === formData?.issueStatus)?.value,
    };

    const buttonVisibility = handleBtnVisibility({ toggleButton, checkKey: formData?.issueStatus });
    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.stIssueNo')}>{checkAndSetDefaultValue(viewData?.issueNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.stIssueNoteDate')}>{checkAndSetDefaultValue(viewData?.issueDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.stIssueNoteStatus')}>{checkAndSetDefaultValue(viewData?.issueStatus, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.modelDescription')}>{checkAndSetDefaultValue(viewData?.modelDescription, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.vin')}>{checkAndSetDefaultValue(viewData?.vin, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.engineNumber')}>{checkAndSetDefaultValue(viewData?.engineNumber, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.oemInvoiceNumber')}>{checkAndSetDefaultValue(viewData?.oemInvoiceNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.oemInvoiceDate')}>{checkAndSetDefaultValue(viewData?.oemInvoiceDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.grnNo')}>{checkAndSetDefaultValue(viewData?.grnNumber, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.grnDate')}>{checkAndSetDefaultValue(viewData?.grnDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.issueCharge')}>{checkAndSetDefaultValue(viewData?.issueCharges, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.isueIndent.viewDetails.label.netDealerPrice')}>{checkAndSetDefaultValue(viewData?.netDealerPrice, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Row gutter={20} className={styles.marB20}>
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
            </Row>
        </Card>
    );
};
