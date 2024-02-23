/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form, Collapse, Typography, Divider, Space, Card } from 'antd';
import { withDrawer } from 'components/withDrawer';
import { ViewIndentDetail, ViewIssueDetail } from './ViewDetails';
import { BUTTON_NAME_CONSTANTS, INDENT_ACTION_LIST, ISSUE_ACTION_LIST } from '../constants';
import { PlusOutlined } from '@ant-design/icons';

import { expandIcon } from 'utils/accordianExpandIcon';
import { handleBtnVisibility } from '../utils';
import { IssueIndentFrom } from './IssueIndentFrom';
import { converDateDayjs } from 'utils/formatDateTime';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import styles from 'assets/sass/app.module.scss';
import { InputSkeleton } from 'components/common/Skeleton';
import { FiDownload } from 'react-icons/fi';
import { translateContent } from 'utils/translateContent';
import { handleUnSavedChange } from 'utils/UnSaveDataConfirmation';

const { Panel } = Collapse;
const { Text } = Typography;

const IssueIndentMasterMain = (props) => {
    const { refershIndentData, setRefershIndentData, cancellationData, handleVinSearch, vehicleVinData, saveIssueDetail, showGlobalNotification, resetVinDetails, listShowLoading, userId, fetchIssueList, indentIssueData, resetIssueList, indentIssueDataLoaded, typeData, indentIssueDataLoading, toggleButton, vehicleVinDataLoading, handlePrintDownload, setReportDetail } = props;

    const defaultVisibility = {
        canCancel: true,
        canReturn: false,
        canReceive: false,
        canPrint: false,
        canAdd: true,
    };

    const [issueForm] = Form.useForm();
    const [issueModalOpen, setIssueModal] = useState(false);
    const [issueData, setIssueData] = useState([]);
    const [myActiveKey, setmyActiveKey] = useState([]);
    const [confirmRequest, setConfirmRequest] = useState();
    const [refershData, setRefershData] = useState(false);
    const [identifier, setIdentifier] = useState();

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (issueModalOpen && vehicleVinData?.paginationData?.length) {
            issueForm.setFieldsValue({ ...vehicleVinData?.paginationData[0], modelDescription: cancellationData?.modelDescription ?? '', oemInvoiceDate: converDateDayjs(vehicleVinData?.paginationData[0]?.oemInvoiceDate), grnDate: converDateDayjs(vehicleVinData?.paginationData[0]?.grnDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleVinData]);

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
        setIssueData((prev) => [...prev, { issueDetails: [] }]);
    };

    const onFinish = (values) => {
        console.log('identifier', identifier, values);
        const newArr = issueData?.map((item, index) => {
            if (index === identifier) {
                const Arr = item?.issueDetails;
                return { issueDetails: [...Arr, values] };
            }
            return item;
        });
        console.log('newArr', newArr);
        setIssueData(newArr);
        setIssueModal(false);
        issueForm.resetFields();
    };

    const onStatusChange = (values) => {
        setConfirmRequest({ isVisible: false });
        const data = {
            id: values?.id,
            issueId: values?.issueNumber,
            indentDetailId: cancellationData?.indentDetailId,
            indentHdrId: cancellationData?.id,
            issueStatus: values?.key,
        };

        const onSuccess = (res) => {
            resetVinDetails();
            setRefershData(!refershData);
            setRefershIndentData(!refershIndentData);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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
    };

    const IssueVehicleDetailsProps = { identifier, onCloseAction, isVisible: issueModalOpen, titleOverride: INDENT_ACTION_LIST.ISSUE?.name, issueForm, onFinish, cancellationData, handleVinSearch, vehicleVinData, typeData, vehicleVinDataLoading };

    const handleConfirmationClose = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };
    const handleIssueModalAdd = ({ uniqueKey }) => {
        setIdentifier(uniqueKey);
        setIssueModal(true);
    };

    return (
        <>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Text>Part Details</Text>
                    <ViewIndentDetail {...ViewDetailProps} />
                    <Row className={styles.marB20} justify="start">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Button type="primary" onClick={handleAdd}>
                                {BUTTON_NAME_CONSTANTS?.ADD?.name}
                            </Button>
                        </Col>
                    </Row>

                    <div
                    // className={styles.viewDrawerContainer}
                    >
                        {false ? (
                            <InputSkeleton height={80} count={3} />
                        ) : (
                            issueData?.map((element, i) => {
                                return (
                                    <Collapse expandIcon={expandIcon} activeKey={myActiveKey} onChange={() => handleCollapses(i)} expandIconPosition="end" collapsible="icon">
                                        <Panel
                                            header={
                                                <>
                                                    <Row>
                                                        <Col xs={20} sm={20} md={20} lg={20} xl={20} className={styles.verticallyCentered}>
                                                            {/* <Space style={{ display: 'flex' }} size="middle"> */}
                                                            {/* <Space size="small" direction="vertical"> */}
                                                            <div>
                                                                <Text>
                                                                    {translateContent('stockTransferIndent.issueIndent.label.stIssueNo')} : {element?.issueNumber ? element?.issueNumber : 'NA'}
                                                                </Text>
                                                            </div>
                                                            {/* </Space> */}
                                                            {handleBtnVisibility({ toggleButton, checkKey: element?.issueStatus, defaultVisibility })?.canPrint && (
                                                                <Button
                                                                    danger
                                                                    icon={<FiDownload />}
                                                                    onClick={() => {
                                                                        setReportDetail();
                                                                        handlePrintDownload(element);
                                                                    }}
                                                                >
                                                                    {BUTTON_NAME_CONSTANTS?.PRINT?.name}
                                                                </Button>
                                                            )}
                                                            {handleBtnVisibility({ toggleButton, checkKey: element?.issueStatus, defaultVisibility })?.canCancel && (
                                                                <Button danger onClick={() => handleRequest(element, ISSUE_ACTION_LIST?.CANCEL)} className={styles.marR10}>
                                                                    {BUTTON_NAME_CONSTANTS?.CANCEL?.name}
                                                                </Button>
                                                            )}
                                                            {/* </Space> */}
                                                        </Col>
                                                        <Col xs={4} sm={4} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
                                                            <Button icon={<PlusOutlined />} type="primary" onClick={() => handleIssueModalAdd({ uniqueKey: i })}>
                                                                Add
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    {/* <Button icon={<PlusOutlined />} type="primary" onClick={() => handleIssueModalAdd({ uniqueKey: i })}>
                                                    Add
                                                </Button> */}
                                                </>
                                            }
                                            key={i}
                                        >
                                            <Divider />
                                            {element?.issueDetails?.map((item, dataIndex) => (
                                                <ViewIssueDetail parentKey={i} childKey={dataIndex} setIssueData={setIssueData} issueData={issueData} typeData={typeData} formData={item} handleRequest={handleRequest} handleBtnVisibility={handleBtnVisibility} toggleButton={toggleButton} />
                                            ))}
                                        </Panel>
                                    </Collapse>
                                );
                            })
                        )}
                    </div>
                    {/* </div> */}
                </Col>
            </Row>
            <ConfirmationModal {...confirmRequest} />
            <IssueIndentFrom {...IssueVehicleDetailsProps} />
        </>
    );
};

export const IssueIndentMaster = withDrawer(IssueIndentMasterMain, { width: '90%', footer: null });
