/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useMemo, useEffect, useState } from 'react';
import { Typography, Divider, Card, Tag, Row, Button, Space } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TbRefresh } from 'react-icons/tb';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { STATUS } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/statusConstant';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {},
    } = state;

    let returnValue = {
        userId,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

const ChangeModelVariantMasterBase = (props) => {
    const { typeData, setCustomerNameList, status, selectedRecordId } = props;
    const {
        formActionType: { addMode, editMode },
        formData,
        userId,
        showGlobalNotification,
        fetchList,
        listShowLoading,
        isVehicleServiceLoaded,
        isOTFModule,
        fetchServiceLov,
        serviceLoading,
        data,
        onModelSubmit,
        setOnModelSubmit,
        isLoading,
        handleFormValueChange,
        handleVehicleDetailChange,
        filterVehicleData,
        confirmRequest,
        setConfirmRequest,
    } = props;

    const { selectedCustomerId } = props;
    const vehicleModelChangeRequest = formData?.vehicleModelChangeRequest || false;

    const [uploadedFileName, setUploadedFileName] = useState('');
    const [modelChangeItemList, setModelChangeItemList] = useState([]);

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    const nameChangeHistoryItem = useMemo(() => {
        const vehicleModelItem = [
            {
                id: 1,
                formData,
                canEdit: editMode && !vehicleModelChangeRequest,
                pending: false,
                changeAllowed: false,
            },
        ];
        if (vehicleModelChangeRequest) {
            vehicleModelItem.push({
                id: 2,
                formData: vehicleModelChangeRequest,
                canEdit: editMode && vehicleModelChangeRequest,
                pending: true,
                changeAllowed: false,
            });
        }
        vehicleModelItem.reverse();
        return vehicleModelItem;
    }, [formData, editMode, vehicleModelChangeRequest]);

    useEffect(() => {
        setModelChangeItemList(nameChangeHistoryItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameChangeHistoryItem]);

    // useEffect(() => {
    //     if (data?.vehicleModelChangeRequest === null) {
    //         setCustomerNameList({
    //             titleCode: data?.titleCode,
    //             firstName: data?.firstName,
    //             middleName: data?.middleName,
    //             lastName: data?.lastName,
    //         });
    //     } else {
    //         setCustomerNameList({
    //             titleCode: data?.vehicleModelChangeRequest?.titleCode,
    //             firstName: data?.vehicleModelChangeRequest?.firstName,
    //             middleName: data?.vehicleModelChangeRequest?.middleName,
    //             lastName: data?.vehicleModelChangeRequest?.lastName,
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [data]);

    // const onSuccessAction = (res) => {
    //     if (res?.data?.docId) {
    //         let a = document.createElement('a');
    //         a.href = `data:image/png;base64,${res?.data?.base64}`;
    //         a.download = res?.data?.fileName;
    //         a.click();
    //         showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: 'Your download will start soon' });
    //     }
    // };

    //     const extraParams = [
    //         {
    //             key: 'docId',
    //             title: 'docId',
    //             value: file?.documentId,
    //             name: 'docId',
    //         },
    //     ];
    //     const supportingDocument = file?.documentName;
    //     fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument, onSuccessAction });
    // };

    // const deleteFile = (uploadData) => {
    //     const data = { customerId: uploadData?.customerId, status: false, docId: uploadData?.docId, documentTypeId: uploadData?.documentType, id: uploadData?.id, documentName: uploadData?.documentName };
    //     const onSuccess = (res) => {
    //         showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: 'File deleted Successfully' });
    //         fetchList({ setIsLoading: listSupportingDocumentShowLoading, userId });
    //     };

    //     const onError = (message) => {
    //         showGlobalNotification({ message });
    //     };
    //     const requestData = {
    //         data: data,
    //         method: 'post',
    //         setIsLoading: listSupportingDocumentShowLoading,
    //         userId,
    //         onError,
    //         onSuccess,
    //     };

    //     saveData(requestData);
    // };
    // const downloadFileFromList = () => {
    //     const extraParams = [
    //         {
    //             key: 'docId',
    //             title: 'docId',
    //             value: uploadedFile,
    //             name: 'docId',
    //         },
    //     ];
    //     const supportingDocument = uploadedFileName;
    //     fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, supportingDocument, onSuccessAction });
    // };

    // const handlePreview = (selectedDocument) => {
    //     const extraParams = [
    //         {
    //             key: 'docId',
    //             title: 'docId',
    //             value: selectedDocument?.docId,
    //             name: 'docId',
    //         },
    //     ];
    //     fetchViewDocument({ setIsLoading: viewListShowLoading, userId, extraParams, selectedDocument, onSuccessAction });
    // };

    // const onViewHistoryChange = () => {
    //     setShowNameChangeHistory(true);
    // };

    const formProps = {
        ...props,
        data,
        typeData,
        selectedCustomerId,
        setUploadedFileName,
        uploadedFileName,
        vehicleModelChangeRequest,
        modelChangeItemList,
        setModelChangeItemList,
        onModelSubmit,
        setOnModelSubmit,
        setCustomerNameList,
        handleFormValueChange,
        handleVehicleDetailChange,
        filterVehicleData,
        confirmRequest,
        setConfirmRequest,
    };

    const handleRefresh = () => {
        if (userId && selectedRecordId) {
            if (isOTFModule && !isLoading) {
                const extraParams = [
                    {
                        key: 'otfId',
                        value: selectedRecordId,
                    },
                ];
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
            }

            if (!isVehicleServiceLoaded) {
                fetchServiceLov({ setIsLoading: serviceLoading, userId, onErrorAction });
            }
        }
    };

    return (
        <>
            {addMode ? (
                <AddEditForm {...formProps} />
            ) : (
                modelChangeItemList?.map((item) => {
                    return (
                        <Card>
                            <Row justify="space-between" className={styles.fullWidth}>
                                <Text strong> Change Model</Text>
                                {/* {item?.pending &&  */}
                                <div className={styles.verticallyCentered}>
                                    <Space>
                                        {onModelSubmit && (
                                            <>
                                                {status === STATUS?.REJECTED?.title ? <Tag color="error">Rejected</Tag> : status === STATUS?.APPROVED?.title ? <Tag color="success">Approved</Tag> : <Tag color="warning">Pending For SAP Confirmation</Tag>}
                                                <Button onClick={handleRefresh} type="link" icon={<TbRefresh />}></Button>
                                            </>
                                        )}
                                    </Space>
                                </div>
                                {/* // } */}
                            </Row>
                            <Divider className={styles.marT20} />

                            {/* {item?.changeAllowed && */}
                            <AddEditForm {...formProps} />
                            {/* } */}
                        </Card>
                    );
                })
            )}
        </>
    );
};
export const ChangeModelVariantMaster = connect(mapStateToProps, mapDispatchToProps)(ChangeModelVariantMasterBase);
