/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useMemo, useEffect, useState } from 'react';
import { Typography, Divider, Collapse, Tag, Col, Row, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { BiTimeFive } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';

import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';
import { corporateDataActions } from 'store/actions/data/customerMaster/corporate';
import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import { STATUS } from '../statusConstant';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { getCodeValue } from 'utils/getCodeValue';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;
const { Panel } = Collapse;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                CustomerDetailsIndividual: { isLoaded: isDataLoaded = false, isLoading, data },
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isSupportingDocumentDataLoaded = false, isSupportingDocumentLoading, data: supportingData },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,
        isLoading,
        data,
        typeData,
        isSupportingDocumentLoading,
        isSupportingDocumentDataLoaded,
        supportingData,
        isViewDataLoaded,
        viewDocument,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCorporateLovList: corporateDataActions.fetchFilteredList,
            listCorporateLovShowLoading: corporateDataActions.listShowLoading,

            fetchViewDocument: documentViewDataActions.fetchList,
            viewListShowLoading: documentViewDataActions.listShowLoading,
            fetchSupportingDocumentList: supportingDocumentDataActions.fetchList,
            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            downloadFile: supportingDocumentDataActions.downloadFile,
            listSupportingDocumentShowLoading: supportingDocumentDataActions.listShowLoading,

            fetchList: customerDetailsIndividualDataActions.fetchList,
            listShowLoading: customerDetailsIndividualDataActions.listShowLoading,
            saveData: customerDetailsIndividualDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

const CustomerNameChangeMasterBase = (props) => {
    const { typeData, setCustomerNameList, status, setShowNameChangeHistory } = props;
    const {
        formActionType: { addMode, editMode },
        formData,
        userId,
        showGlobalNotification,
        fetchList,
        data,
        saveData,
        isLoading,
    } = props;

    const { selectedCustomerId } = props;
    const customerNameChangeRequest = formData?.customerNameChangeRequest || false;
    const { fetchViewDocument, viewListShowLoading, listSupportingDocumentShowLoading, isSupportingDocumentDataLoaded, supportingData, isViewDataLoaded, viewDocument } = props;

    const [emptyList, setEmptyList] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [uploadedFileName, setUploadedFileName] = useState('');
    const [editedMode, setEditedMode] = useState(false);
    const [uploadedFile, setUploadedFile] = useState();
    const [uploadImgDocId, setUploadImgDocId] = useState('');
    const [supportingDataView, setSupportingDataView] = useState();
    const [activeKey, setActiveKey] = useState([]);
    const [changeNameAllowed, setChangeNameAllowed] = useState(false);
    const [nameChangeHistoryItemList, setNameChangeHistoryItemList] = useState([]);

    const nameChangeHistoryItem = useMemo(() => {
        const changeHistoryItem = [
            {
                id: 1,
                formData,
                canEdit: editMode && !customerNameChangeRequest,
                pending: false,
                changeAllowed: false,
            },
        ];
        if (customerNameChangeRequest) {
            changeHistoryItem.push({
                id: 2,
                formData: customerNameChangeRequest,
                canEdit: editMode && customerNameChangeRequest,
                pending: true,
                changeAllowed: false,
            });
        }
        changeHistoryItem.reverse();
        return changeHistoryItem;
    }, [formData, editMode, customerNameChangeRequest]);

    useEffect(() => {
        setNameChangeHistoryItemList(nameChangeHistoryItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameChangeHistoryItem]);

    useEffect(() => {
        if (data?.customerNameChangeRequest === null) {
            setCustomerNameList({
                titleCode: data?.titleCode,
                firstName: data?.firstName,
                middleName: data?.middleName,
                lastName: data?.lastName,
            });
        } else {
            setCustomerNameList({
                titleCode: data?.customerNameChangeRequest?.titleCode,
                firstName: data?.customerNameChangeRequest?.firstName,
                middleName: data?.customerNameChangeRequest?.middleName,
                lastName: data?.customerNameChangeRequest?.lastName,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const onSuccessAction = (res) => {
        if (res?.data?.docId) {
            let a = document.createElement('a');
            a.href = `data:image/png;base64,${res?.data?.base64}`;
            a.download = res?.data?.fileName;
            a.click();
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'Your download will start soon' });
        }
    };

    const downloadFileFromButton = (file) => {
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: file?.documentId,
                name: 'docId',
            },
        ];
        const supportingDocument = file?.documentName;
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument, onSuccessAction });
    };

    const deleteFile = (uploadData) => {
        const data = { customerId: uploadData?.customerId, status: false, docId: uploadData?.docId, documentTypeId: uploadData?.documentType, id: uploadData?.id, documentName: uploadData?.documentName };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: 'File deleted Successfully' });
            fetchList({ setIsLoading: listSupportingDocumentShowLoading, userId });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listSupportingDocumentShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };
    const downloadFileFromList = () => {
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: uploadedFile,
                name: 'docId',
            },
        ];
        const supportingDocument = uploadedFileName;
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument, onSuccessAction });
    };

    const handlePreview = (selectedDocument) => {
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: selectedDocument?.docId,
                name: 'docId',
            },
        ];
        fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, selectedDocument, onSuccessAction });
    };

    const onViewHistoryChange = () => {
        setShowNameChangeHistory(true);
    };

    const formProps = {
        ...props,
        data,
        setUploadImgDocId,
        uploadImgDocId,
        typeData,
        isSupportingDocumentDataLoaded,
        supportingData,
        isViewDataLoaded,
        viewDocument,
        selectedCustomerId,
        setUploadedFile,
        uploadedFile,
        downloadFileFromButton,
        deleteFile,
        editedMode,
        setEditedMode,
        downloadFileFromList,
        setUploadedFileName,
        uploadedFileName,
        setFileList,
        fileList,
        setEmptyList,
        emptyList,
        handlePreview,
        supportingDataView,
        setSupportingDataView,
        activeKey,
        setActiveKey,
        onViewHistoryChange,
        setChangeNameAllowed,
        customerNameChangeRequest,
        nameChangeHistoryItemList,
        setNameChangeHistoryItemList,
    };

    const viewProps = {
        ...formProps,
        styles,
        isLoading,
        editedMode,
        setEditedMode,
    };

    const onEdit = (currentKey) => (e) => {
        setNameChangeHistoryItemList(nameChangeHistoryItem?.map((i) => ({ ...i, changeAllowed: i?.id === currentKey ? true : false })));
        setActiveKey(currentKey);
    };

    const customerName = ({ currentKey, formData, requestPending, canEdit }) => {
        return checkAndSetDefaultValue(
            <>
                <Typography className={styles.verticallyCentered}>
                    <div className={styles.flexDirectionColumn}>
                        {getCodeValue(typeData?.TITLE, formData?.titleCode, '', false) + ' ' + (formData?.firstName || '') + ' ' + (formData?.middleName || '') + ' ' + (formData?.lastName || '')}
                        {customerNameChangeRequest && (
                            <Text type="secondary" style={{ fontSize: '12px', fontWeight: 'normal' }}>
                                {requestPending ? 'Current' : 'Previous'} Name
                            </Text>
                        )}
                    </div>
                    {canEdit && (
                        <Button className={`${styles.marL20} ${styles.verticallyCentered}`} disabled={changeNameAllowed} type="link" icon={<FiEdit />} onClick={onEdit(currentKey)}>
                            {translateContent('global.buttons.edit')}
                        </Button>
                    )}
                </Typography>
            </>,
            isLoading
        );
    };

    return (
        <>
            <div className={styles.cardInsideBox}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.verticallyCentered}>
                        <Text style={{ fontSize: '16px' }} strong>
                            {translateContent('customerMaster.drawerSubHeading.cusTitle')}
                        </Text>
                    </Col>
                    {!addMode && (
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                            <Button type="link" onClick={onViewHistoryChange} icon={<BiTimeFive />} className={styles.verticallyCentered}>
                                View History
                            </Button>
                        </Col>
                    )}
                </Row>
                <Divider className={styles.marT20} />
                {addMode ? (
                    <AddEditForm {...formProps} />
                ) : (
                    nameChangeHistoryItemList?.map((item) => {
                        return (
                            <Collapse key={item?.id} expandIcon={expandIcon} activeKey={activeKey} onChange={(value) => setActiveKey(value)} expandIconPosition="end" collapsible="icon">
                                <Panel
                                    header={
                                        <Row justify="space-between" className={styles.fullWidth}>
                                            {customerName({ currentKey: item?.id, formData: item?.formData, requestPending: item?.pending, changeAllowed: item?.changeAllowed, canEdit: item?.canEdit })}

                                            {item?.pending && <div className={styles.verticallyCentered}>{status === STATUS?.REJECTED?.title ? <Tag color="error">Rejected</Tag> : status === STATUS?.APPROVED?.title ? <Tag color="success">Approved</Tag> : <Tag color="warning">Pending for Approval</Tag>}</div>}
                                        </Row>
                                    }
                                    key={item?.id}
                                >
                                    <Divider />
                                    {item?.changeAllowed ? <AddEditForm {...formProps} /> : <ViewDetail {...viewProps} showApproveNameChangeRequestBtn={item?.pending} />}
                                </Panel>
                            </Collapse>
                        );
                    })
                )}
            </div>
        </>
    );
};
export const CustomerNameChangeMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerNameChangeMasterBase);
