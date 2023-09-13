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
import { PARAM_MASTER } from 'constants/paramMaster';
import { expandIcon } from 'utils/accordianExpandIcon';
// import { IssueVehicleDetailsModal, CancelConfirmModal } from './Modals';
import { CancelConfirmModal, IssueVehicleDetailsModal } from './Modals';

import styles from 'assets/sass/app.module.scss';
const { Panel } = Collapse;
const { Text } = Typography;

const CancellationIssueMain = (props) => {
    const { cancellationData, handleVinSearch, vehicleVinData, saveIssueDetail, showGlobalNotification, resetVinDetails, listShowLoading, userId, fetchIssueList, indentIssueData, resetIssueList, indentIssueDataLoaded, typeData, indentIssueDataLoading } = props;

    const [issueForm] = Form.useForm();
    const [issueModalOpen, setIssueModal] = useState(false);
    const [isConfirmationModal, setIsConfirmationModal] = useState(false);
    const [issueData, setIssueData] = useState([]);
    const [myActiveKey, setmyActiveKey] = useState([]);
    const [issueCanceData, setIssueCanceData] = useState('');
    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
    };

    useEffect(() => {
        if (issueModalOpen && vehicleVinData?.vehicleSearch?.length) issueForm.setFieldsValue({ ...vehicleVinData?.vehicleSearch[0], modelDescription: cancellationData?.modelDescription });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleVinData]);

    useEffect(() => {
        if (!indentIssueDataLoading && indentIssueData && indentIssueDataLoaded) setIssueData(indentIssueData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indentIssueDataLoading, indentIssueData, indentIssueDataLoaded]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'indentNumber',
                title: 'Number',
                value: cancellationData?.indentNumber,
            },
        ];
        fetchIssueList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction, extraParams });
        return () => {
            resetIssueList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCollapses = (values) => {
        myActiveKey?.includes(values) ? setmyActiveKey('') : setmyActiveKey([values]);
    };

    const onCloseAction = () => {
        resetVinDetails();
        issueForm.resetFields();
        setIssueModal(false);
    };
    const handleCloseConfirmation = () => {
        setIsConfirmationModal(false);
    };
    const ViewDetailProps = {
        formData: cancellationData,
    };
    const handleIssueAdd = () => {
        setIssueModal(true);
    };

    const handleCancellationRequest = (data) => {
        setIsConfirmationModal(true);
        setIssueCanceData(data);
    };
    const handlePrintDownload = () => {};

    const onFinish = (values) => {
        if (!values?.engineNumber) {
            showGlobalNotification({ notificationType: 'error', title: 'ERROR', message: 'Search VIN to continue' });
            return;
        }
        const { invoiceDate, invoiceNumber, ...rest } = values;
        let data = { ...rest, oemInvoiceDate: invoiceDate, oemInvoiceNumber: invoiceNumber, indentHdrId: cancellationData?.id, id: '', modelCode: cancellationData?.modelCode, issueStatus: cancellationData?.issueStatus, issueDate: cancellationData?.issueDate };
        const onSuccess = (res) => {
            issueForm.resetFields();
            setIssueModal(false);
            setIssueData([...issueData, values]);
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
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveIssueDetail(requestData);
    };
    const handdleYes = (values) => {
        const data = {
            issueId: issueCanceData?.issueNumber,
            indentDetailId: cancellationData?.indentDetailId,
            indentHdrId: cancellationData?.id,
            issueStatus: ISSUE_CONSTANT?.CANCEL?.key,
        };

        const onSuccess = (res) => {
            resetVinDetails();
            setIsConfirmationModal(false);
            setIssueCanceData('');
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

    const IssueVehicleDetailsProps = { onCloseAction, isVisible: issueModalOpen, titleOverride: DRAWER_TITLE_CONSTANT?.ISSUE?.name, issueForm, onFinish, cancellationData, handleVinSearch, vehicleVinData, typeData };
    const cancellationIssueProps = { onCloseAction: handleCloseConfirmation, isVisible: isConfirmationModal, titleOverride: DRAWER_TITLE_CONSTANT?.CONFIRMATION?.name, handdleYes };
    const handleCancelButton = (btnKey) => {
        if (btnKey === ISSUE_CONSTANT?.CANCEL?.key || btnKey === ISSUE_CONSTANT?.RECEIVED?.key) {
            return false;
        }
        return true;
    };
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
                                                    <Text> {`ST issue Note No. ${element?.issueNumber ? element?.issueNumber : 'NA'} `}</Text>
                                                    <Text> {`|`}</Text>
                                                    <Text> {`${element?.vin ? element?.vin : 'NA'} `}</Text>
                                                    {handleCancelButton(element?.issueStatus) && (
                                                        <Button type="primary" onClick={() => handleCancellationRequest(element)}>
                                                            {BUTTON_NAME_CONSTANTS?.CANCEL?.name}
                                                        </Button>
                                                    )}
                                                    <Button danger onClick={() => handlePrintDownload(element)}>
                                                        {BUTTON_NAME_CONSTANTS?.PRINT?.name}
                                                    </Button>
                                                </Space>
                                                <Row>
                                                    <Text className={styles.subSection}> {`Status: ${typeData[PARAM_MASTER?.ISS_STS?.id]?.find((i) => i?.key === element?.issueStatus)?.value} `}</Text>
                                                </Row>
                                            </Col>
                                        </Row>
                                    }
                                    key={i}
                                >
                                    <Divider />
                                    <ViewIssueCard typeData={typeData} formData={element} />
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
