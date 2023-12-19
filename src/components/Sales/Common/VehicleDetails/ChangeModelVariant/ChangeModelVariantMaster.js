/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useMemo, useEffect, useState } from 'react';
import { Typography, Divider, Tag, Row, Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TbRefresh } from 'react-icons/tb';
import { ConfirmationModal } from 'utils/ConfirmationModal';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetail';
import { STATUS } from 'constants/modelVariant';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
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
    const { typeData, setCustomerNameList, selectedRecordId, setButtonData, buttonData, setFormData } = props;
    const {
        formActionType: { addMode, editMode, viewMode },
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
        getProductAttributeDetail,
        setRevisedProductAttributeData,
    } = props;

    const { selectedCustomerId, setShowChangeModel } = props;
    const vehicleModelChangeRequest = formData?.vehicleModelChangeRequest || false;

    const [uploadedFileName, setUploadedFileName] = useState('');
    const [modelChangeItemList, setModelChangeItemList] = useState([]);
    const [modelStatus, setModelStatus] = useState();

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };

    useEffect(() => {
        formData?.sapStatusResponseCode && setModelStatus(formData?.sapStatusResponseCode);
        if (formData?.revisedModel) {
            getProductAttributeDetail(formData?.revisedModel, setRevisedProductAttributeData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

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

    const formProps = {
        ...props,
        setModelStatus,
        modelStatus,
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
        selectedRecordId,
        listShowLoading,
        userId,
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
                const onSuccessAction = (res) => {
                    setModelStatus(res?.data?.sapStatusResponseCode);
                    if (res?.data?.sapStatusResponseCode === STATUS?.SUCCESS?.key) {
                        setButtonData({ ...buttonData, formBtnActive: true });
                        setOnModelSubmit(false);
                        setFormData(res?.data);
                        setShowChangeModel(false);
                        showGlobalNotification({ notificationType: 'success', title: 'Request Generated Successfully', message: 'Model Change Request has been submitted successfully' });
                    }
                    if (res?.data?.sapStatusResponseCode === STATUS?.REJECTED?.key) {
                        setConfirmRequest({
                            isVisible: true,
                            showCancelButton: false,
                            titleOverride: 'Failed Request',
                            closable: true,
                            icon: false,
                            onCloseAction: () => {
                                setConfirmRequest({
                                    ...confirmRequest,
                                    isVisible: false,
                                });
                            },
                            onSubmitAction: () => {
                                setOnModelSubmit(false);
                                setConfirmRequest({
                                    ...confirmRequest,
                                    isVisible: false,
                                });
                            },
                            submitText: 'Okay',
                            text: (
                                <>
                                    <p>{res?.data?.sapResonseRemarks}</p>
                                </>
                            ),
                        });
                    }
                };

                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams, onErrorAction });
            }

            if (!isVehicleServiceLoaded) {
                fetchServiceLov({ setIsLoading: serviceLoading, userId, onErrorAction });
            }
        }
    };
    const isReviedModelPending = formData?.revisedModel && [STATUS?.PENDING?.key, STATUS?.REJECTED?.key]?.includes(modelStatus);
    return (
        <>
            <div className={`${styles.cardInsideBox} ${styles.pad10}`}>
                <Row justify="space-between" className={styles.fullWidth}>
                    <div className={styles.marB10}>
                        <Text strong>Change Model</Text>
                    </div>
                    {isReviedModelPending && (
                        <div className={styles.verticallyCentered}>
                            {modelStatus === STATUS?.PENDING?.key ? <Tag color="warning">{STATUS?.PENDING?.title}</Tag> : modelStatus === STATUS?.SUCCESS?.key ? <Tag color="success">{STATUS?.SUCCESS?.title}</Tag> : <Tag color="error">{STATUS?.REJECTED?.title}</Tag>}
                            {modelStatus && (
                                <Button
                                    onClick={handleRefresh}
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
                {viewMode ? (
                    <ViewDetail {...formProps} />
                ) : (
                    modelChangeItemList?.map((item) => {
                        return (
                            <>
                                <Divider />
                                <AddEditForm {...formProps} />
                                <ConfirmationModal {...confirmRequest} />
                            </>
                        );
                    })
                )}
            </div>
        </>
    );
};
export const ChangeModelVariantMaster = connect(mapStateToProps, mapDispatchToProps)(ChangeModelVariantMasterBase);
