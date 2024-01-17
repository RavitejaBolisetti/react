/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useState } from 'react';
import { Row, Col, Descriptions, Collapse, Button, Typography, Tag, Divider } from 'antd';

import { translateContent } from 'utils/translateContent';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';
import { TbRefresh } from 'react-icons/tb';
import { STATUS } from 'constants/modelVariant';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewRevisedModelDetailMain = (props) => {
    const { revisedModelInformation, revisedProductAttributeData, formData, refreshData, setRefreshData } = props;
    const isProductLoading = !revisedProductAttributeData?.prodctShrtName;

    const [modelStatus, setModelStatus] = useState(false);
    const singleViewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
    };
    
    useEffect(() => {
        setModelStatus(formData?.sapStatusResponseCode);
    }, [formData]);

    const isReviedModelPending = modelStatus && [STATUS?.PENDING?.key]?.includes(modelStatus);
    const isReviedModelPendingFailed = modelStatus && [STATUS?.PENDING?.key, STATUS?.REJECTED?.key]?.includes(modelStatus);

    return (
        <Collapse key={1} expandIcon={expandIcon} activeKey={1} expandIconPosition="end" collapsible="icon">
            <Panel
                header={
                    <Row justify="space-between" className={styles.fullWidth}>
                        <div className={styles.marB10}>
                            <Text strong>Change Model</Text>
                        </div>
                        {isReviedModelPendingFailed && (
                            <div className={styles.verticallyCentered}>
                                {modelStatus === STATUS?.PENDING?.key ? <Tag color="warning">{STATUS?.PENDING?.title}</Tag> : modelStatus === STATUS?.SUCCESS?.key ? <Tag color="success">{STATUS?.SUCCESS?.title}</Tag> : <Tag color="error">{STATUS?.REJECTED?.title}</Tag>}
                                {isReviedModelPending && (
                                    <Button
                                        onClick={setRefreshData(!refreshData)}
                                        type="link"
                                        icon={
                                            <div className={`${styles.marL10} ${styles.verticallyCentered}`}>
                                                <TbRefresh size={18} />
                                            </div>
                                        }
                                    ></Button>
                                )}
                            </div>
                        )}
                    </Row>
                }
                key={1}
            >
                <Divider />
                <div className={styles.cardInnerBox}>
                    <Row gutter={20}>
                        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
                            <Descriptions {...singleViewProps}>
                                <Descriptions.Item label={translateContent('bookingManagement.modelVariant.label.model')}>
                                    <div className={styles?.tooltipAlign}>
                                        {checkAndSetDefaultValue(revisedProductAttributeData?.prodctShrtName, isProductLoading)}
                                        {revisedModelInformation && addToolTip(revisedModelInformation, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle size={13} />)}
                                    </div>
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                            <Descriptions {...singleViewProps}>
                                <Descriptions.Item label={translateContent('bookingManagement.modelVariant.label.modelCode')}>{checkAndSetDefaultValue(revisedProductAttributeData?.prodctCode, isProductLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </div>
            </Panel>
        </Collapse>
    );
};

export const ViewRevisedModelDetail = ViewRevisedModelDetailMain;
