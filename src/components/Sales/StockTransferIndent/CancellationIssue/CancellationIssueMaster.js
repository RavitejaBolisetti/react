/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Collapse, Typography, Divider, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { ViewDetail, ViewIssueCard } from './ViewDetails';
import { BUTTON_NAME_CONSTANTS, DRAWER_TITLE_CONSTANT } from './Constants';
import { expandIcon } from 'utils/accordianExpandIcon';
// import { IssueVehicleDetailsModal, CancelConfirmModal } from './Modals';
import { CancelConfirmModal, IssueVehicleDetailsModal } from './Modals';

import styles from 'assets/sass/app.module.scss';
const { Panel } = Collapse;
const { Text } = Typography;

const CancellationIssueMain = (props) => {
    const { formData } = props;

    const [issueForm] = Form.useForm();
    const [issueModalOpen, setIssueModal] = useState(false);
    const [isConfirmationModal, setIsConfirmationModal] = useState(false);
    const [issueData, setIssueData] = useState([{}]);
    const [myActiveKey, setmyActiveKey] = useState([]);

    const handleCollapses = (values) => {
        myActiveKey?.includes(values) ? setmyActiveKey('') : setmyActiveKey([values]);
    };

    const onCloseAction = (key) => {
        setIssueModal(false);
        issueForm.resetFields();
    };
    const handleCloseConfirmation = (key) => {
        setIsConfirmationModal(false);
    };
    const ViewDetailProps = {
        formData,
    };
    const handleIssueAdd = () => {
        setIssueModal(true);
    };

    const handleCancellationRequest = () => {
        setIsConfirmationModal(true);
    };
    const handlePrintDownload = () => {};

    const onFinish = (values) => {
        console.log(values);
    };
    const IssueVehicleDetailsProps = { onCloseAction, isVisible: issueModalOpen, titleOverride: DRAWER_TITLE_CONSTANT?.ISSUE?.name, issueForm, onFinish };
    const cancellationIssueProps = { onCloseAction: handleCloseConfirmation, isVisible: isConfirmationModal, titleOverride: DRAWER_TITLE_CONSTANT?.CONFIRMATION?.name };
    return (
        <>
            <div className={styles.drawerBodyNew}>
                <ViewDetail {...ViewDetailProps} />
                <Row className={styles.marB20} gutter={20} justify="start">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Button type="primary" onClick={handleIssueAdd}>
                            {BUTTON_NAME_CONSTANTS?.ADD?.name}
                        </Button>
                    </Col>
                </Row>
                <div className={styles.viewDrawerContainer}>
                    {issueData?.map((element, i) => {
                        return (
                            <Collapse expandIcon={expandIcon} activeKey={myActiveKey} onChange={() => handleCollapses(i)} expandIconPosition="end" collapsible="icon">
                                <Panel
                                    header={
                                        <Row justify="space-between">
                                            <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                                <Space size="middle" style={{ display: 'flex' }}>
                                                    <Text className={styles.headText}> {`${element?.partDescription ? element?.partDescription : 'NA'} `}</Text>
                                                    <Text className={styles.headText}> {`|`}</Text>
                                                    <Text className={styles.headText}> {`${element?.partNumber ? element?.partNumber : 'NA'} `}</Text>
                                                    <Button danger onClick={() => handlePrintDownload(element)}>
                                                        {BUTTON_NAME_CONSTANTS?.PRINT?.name}
                                                    </Button>
                                                    <Button type="primary" onClick={() => handleCancellationRequest(element)}>
                                                        {BUTTON_NAME_CONSTANTS?.CANCEL?.name}
                                                    </Button>
                                                </Space>
                                                <Row>
                                                    <Text className={styles.subSection}> {`Status: ${'Issued'} `}</Text>
                                                </Row>
                                            </Col>
                                        </Row>
                                    }
                                    key={i}
                                >
                                    <Divider />
                                    <ViewIssueCard formData={element} />
                                </Panel>
                            </Collapse>
                        );
                    })}
                </div>
            </div>
            <CancelConfirmModal {...cancellationIssueProps} />
            <IssueVehicleDetailsModal {...IssueVehicleDetailsProps} />
        </>
    );
};

export const CancellationIssue = withDrawer(CancellationIssueMain, { width: '90%', footer: null });
