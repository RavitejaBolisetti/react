/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Collapse, Typography, Divider, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { ViewDetail, ViewIssueCard } from './ViewDetails';
import { BUTTON_NAME_CONSTANTS, DRAWER_TITLE_CONSTANT, ISSUE_CONSTANT } from './Constants';
import { expandIcon } from 'utils/accordianExpandIcon';
// import { IssueVehicleDetailsModal, CancelConfirmModal } from './Modals';
import { CancelConfirmModal, IssueVehicleDetailsModal } from './Modals';

import styles from 'assets/sass/app.module.scss';
const { Panel } = Collapse;
const { Text } = Typography;

const CancellationIssueMain = (props) => {
    const { cancellationData, handleVinSearch, vehicleVinData, setCancellationData, cancellationIssueVisible, setCancellationIssueVisible, saveIssueDetail, showGlobalNotification, resetVinDetails, listShowLoading, userId, fetchIssueList, indentIssueData, indentIssueDataLoading, indentIssueDataLoaded } = props;

    const [issueForm] = Form.useForm();
    const [issueModalOpen, setIssueModal] = useState(false);
    const [isConfirmationModal, setIsConfirmationModal] = useState(false);
    const [issueData, setIssueData] = useState([{}]);
    const [myActiveKey, setmyActiveKey] = useState([]);
    useEffect(() => {
        if (vehicleVinData?.vehicleSearch?.length && cancellationData) issueForm.setFieldsValue({ modelDescription: cancellationData?.modelDescription, ...vehicleVinData?.vehicleSearch[0] });
        issueForm.setFieldsValue({ modelDescription: cancellationData?.modelDescription });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [issueModalOpen, cancellationData, vehicleVinData]);

    const handleCollapses = (values) => {
        myActiveKey?.includes(values) ? setmyActiveKey('') : setmyActiveKey([values]);
    };
    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
    };
    const onCloseAction = (key) => {
        setIssueModal(false);
        issueForm.resetFields();
        resetVinDetails();
    };
    const handleCloseConfirmation = (key) => {
        setIsConfirmationModal(false);
    };
    const ViewDetailProps = {
        formData: cancellationData,
    };
    const handleIssueAdd = () => {
        setIssueModal(true);
    };

    const handleCancellationRequest = () => {
        setIsConfirmationModal(true);
    };
    const handlePrintDownload = () => {};

    const onFinish = (values) => {
        if (!values?.engineNumber) {
            showGlobalNotification({ notificationType: 'error', title: 'ERROR', message: 'Search VIN to continue' });
            return;
        }

        let data = { ...values, indentHdrId: cancellationData?.id, id: '', modelCode: values?.modelCode, issueStatus: values?.issueStatus, issueDate: values?.issueDate };
        console.log('Issue Detail', values);

        const onSuccess = (res) => {
            issueForm.resetFields();
            setCancellationIssueVisible(false);
            setIssueData({ ...issueData, values });
            resetVinDetails();
            // fetchIssueList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction, extraParams });
            // fetchIndentLocation({ setIsLoading: listShowLoading, userId, onSuccessAction: onSuccessActionFetchIndLoc, onErrorAction, extraParams: extraParamData });
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveIssueDetail(requestData);
    };
    const handdleYes = () => {
        let data = {
            issueId: indentIssueData?.issueId,
            indentDetailId: cancellationData?.indentDetailId,
            indentHdrId: cancellationData?.id,
            issueStatus: ISSUE_CONSTANT?.CANCEL?.key,
        };
        const onSuccess = (res) => {
            resetVinDetails();
            const extraParams = [
                {
                    key: 'indentNumber',
                    title: 'Number',
                    value: cancellationData?.indentNumber,
                },
            ];
            fetchIssueList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction, extraParams });
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveIssueDetail(requestData);
    };

    const IssueVehicleDetailsProps = { onCloseAction, isVisible: issueModalOpen, titleOverride: DRAWER_TITLE_CONSTANT?.ISSUE?.name, issueForm, onFinish, cancellationData, handleVinSearch, vehicleVinData };
    const cancellationIssueProps = { onCloseAction: handleCloseConfirmation, isVisible: isConfirmationModal, titleOverride: DRAWER_TITLE_CONSTANT?.CONFIRMATION?.name, handdleYes };

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
