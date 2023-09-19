/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Collapse, Typography, Divider, Space } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { ViewIndentDetail, ViewIssueDetail } from './ViewDetails';
import { BUTTON_NAME_CONSTANTS, INDENT_ACTION_LIST, ISSUE_ACTION_LIST } from '../constants';
import { PARAM_MASTER } from 'constants/paramMaster';
import { expandIcon } from 'utils/accordianExpandIcon';
import { handleBtnVisibility } from '../utils';
import { IssueIndentFrom } from './IssueIndentFrom';
import { converDateDayjs } from 'utils/formatDateTime';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import styles from 'assets/sass/app.module.scss';
import { InputSkeleton } from 'components/common/Skeleton';

const { Panel } = Collapse;
const { Text } = Typography;

const IssueIndentMasterMain = (props) => {
    const { refershIndentData, setRefershIndentData, cancellationData, handleVinSearch, vehicleVinData, saveIssueDetail, showGlobalNotification, resetVinDetails, listShowLoading, userId, fetchIssueList, indentIssueData, resetIssueList, indentIssueDataLoaded, typeData, indentIssueDataLoading, toggleButton, vehicleVinDataLoading, handlePrintDownload } = props;

    const defaultVisibility = {
        canCancel: true,
        canReturn: false,
        canReceive: false,
        canPrint: true,
        canAdd: true,
    };

    const [issueForm] = Form.useForm();
    const [issueModalOpen, setIssueModal] = useState(false);
    const [issueData, setIssueData] = useState([]);
    const [myActiveKey, setmyActiveKey] = useState([]);
    const [confirmRequest, setConfirmRequest] = useState();
    const [refershData, setRefershData] = useState(false);

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (issueModalOpen && vehicleVinData?.vehicleSearch?.length) {
            issueForm.setFieldsValue({ ...vehicleVinData?.vehicleSearch[0], modelDescription: cancellationData?.modelDescription ?? '', invoiceDate: converDateDayjs(vehicleVinData?.vehicleSearch[0]?.invoiceDate), grnDate: converDateDayjs(vehicleVinData?.vehicleSearch[0]?.grnDate) });
        }
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

            {
                key: 'modelCode',
                title: 'Model Code',
                value: cancellationData?.modelCode,
            },
        ];
        fetchIssueList({ setIsLoading: listShowLoading, userId, onErrorAction, extraParams });
        return () => {
            resetIssueList();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refershData]);

    const handleCollapses = (values) => {
        myActiveKey?.includes(values) ? setmyActiveKey('') : setmyActiveKey([values]);
    };

    const onCloseAction = () => {
        resetVinDetails();
        issueForm.resetFields();
        setIssueModal(false);
    };

    const ViewDetailProps = {
        formData: cancellationData,
        typeData,
    };

    const handleRequest = (data, actionItem) => {
        actionItem &&
            setConfirmRequest({
                isVisible: true,
                titleOverride: actionItem?.title,
                text: actionItem?.modelMessage,
                closable: true,
                icon: false,
                onCloseAction: handleConfirmationClose,
                onSubmitAction: (values) => onStatusChange({ ...actionItem, ...data }),
                submitText: actionItem?.modalButtonName,
                showField: false,
            });
    };

    const handleAdd = () => {
        setIssueModal(true);
    };

    const onFinish = (values) => {
        if (!values?.engineNumber) {
            showGlobalNotification({ notificationType: 'error', title: 'ERROR', message: 'Search VIN to continue' });
            return;
        }
        const { invoiceDate, invoiceNumber, ...rest } = values;

        const data = { ...rest, grnDate: vehicleVinData?.vehicleSearch[0]?.grnDate, oemInvoiceDate: vehicleVinData?.vehicleSearch[0]?.invoiceDate, oemInvoiceNumber: values?.invoiceNumber ?? '', indentHdrId: cancellationData?.id ?? '', id: '', modelCode: cancellationData?.modelCode ?? '', issueStatus: cancellationData?.issueStatus ?? '', issueDate: cancellationData?.issueDate ?? '', indentDetailId: cancellationData?.indentDetailId ?? '', issueNumber: '' };

        const onSuccess = (res) => {
            issueForm.resetFields();
            setIssueModal(false);
            resetVinDetails();
            setRefershIndentData(!refershIndentData);
            setRefershData(!refershData);
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

    const onStatusChange = (values) => {
        setConfirmRequest({ isVisible: false });
        const data = {
            issueId: values?.issueNumber,
            indentDetailId: cancellationData?.indentDetailId,
            indentHdrId: cancellationData?.id,
            issueStatus: values?.key,
        };

        const onSuccess = (res) => {
            resetVinDetails();
            setRefershData(!refershData);
            setRefershIndentData(!refershIndentData);
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

    const IssueVehicleDetailsProps = { onCloseAction, isVisible: issueModalOpen, titleOverride: INDENT_ACTION_LIST.ISSUE?.name, issueForm, onFinish, cancellationData, handleVinSearch, vehicleVinData, typeData, vehicleVinDataLoading };

    const handleConfirmationClose = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };

    return (
        <>
            <div className={styles.drawerBodyNew}>
                <ViewIndentDetail {...ViewDetailProps} />
                {cancellationData?.balancedQuantity > 0 && cancellationData?.balancedQuantity && handleBtnVisibility({ toggleButton, checkKey: undefined, defaultVisibility })?.canAdd && (
                    <Row className={styles.marB20} gutter={20} justify="start">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Button type="primary" onClick={handleAdd}>
                                {BUTTON_NAME_CONSTANTS?.ADD?.name}
                            </Button>
                        </Col>
                    </Row>
                )}

                <div className={styles.viewDrawerContainer}>
                    {indentIssueDataLoading ? (
                        <InputSkeleton height={80} count={3} />
                    ) : (
                        issueData?.map((element, i) => {
                            return (
                                <Collapse expandIcon={expandIcon} activeKey={myActiveKey} onChange={() => handleCollapses(i)} expandIconPosition="end" collapsible="icon">
                                    <Panel
                                        header={
                                            <Row justify="space-between">
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Space size="middle" style={{ display: 'flex' }}>
                                                        <Text> {`ST issue Note No. ${element?.issueNumber ? element?.issueNumber : 'NA'} `}</Text>
                                                        <Text>|</Text>
                                                        <Text> VIN: {element?.vin ? element?.vin : 'NA'}</Text>
                                                        {handleBtnVisibility({ toggleButton, checkKey: element?.issueStatus, defaultVisibility })?.canCancel && (
                                                            <Button type="primary" onClick={() => handleRequest(element, ISSUE_ACTION_LIST?.CANCEL)}>
                                                                {BUTTON_NAME_CONSTANTS?.CANCEL?.name}
                                                            </Button>
                                                        )}
                                                        {handleBtnVisibility({ toggleButton, checkKey: element?.issueStatus, defaultVisibility })?.canPrint && (
                                                            <Button danger onClick={() => handlePrintDownload(element)}>
                                                                {BUTTON_NAME_CONSTANTS?.PRINT?.name}
                                                            </Button>
                                                        )}
                                                    </Space>
                                                    <Row>
                                                        <Text type="secondary">{`Status: ${typeData[PARAM_MASTER?.ISS_STS?.id]?.find((i) => i?.key === element?.issueStatus)?.value} `}</Text>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        }
                                        key={i}
                                    >
                                        <Divider />
                                        <ViewIssueDetail typeData={typeData} formData={element} handleRequest={handleRequest} handleBtnVisibility={handleBtnVisibility} toggleButton={toggleButton} />
                                    </Panel>
                                </Collapse>
                            );
                        })
                    )}
                </div>
            </div>
            <ConfirmationModal {...confirmRequest} />
            <IssueIndentFrom {...IssueVehicleDetailsProps} />
        </>
    );
};

export const IssueIndentMaster = withDrawer(IssueIndentMasterMain, { width: '90%', footer: null });

//export const IssueIndentMaster = connect(withDrawer(mapStateToProps, mapDispatchToProps)(IssueIndentMasterMain, { width: '90%', footer: null }));
