/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useMemo, useEffect, useState } from 'react';
import { Typography, Divider, Collapse, Tag, Row, Button, Space } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TbRefresh } from 'react-icons/tb';
import { ConfirmationModal } from 'utils/ConfirmationModal';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { STATUS } from 'constants/modelVariant';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

const { Panel } = Collapse;

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
    const { typeData, setCustomerNameList, selectedRecordId, setButtonData, buttonData, setFormData } = props;
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

    const { selectedCustomerId, setChangeModel } = props;
    const vehicleModelChangeRequest = formData?.vehicleModelChangeRequest || false;

    const [uploadedFileName, setUploadedFileName] = useState('');
    const [modelStatus, setModelStatus] = useState(STATUS?.PENDING?.key);
    const [statusDescription, setStatusDescription] = useState();
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
                        setChangeModel(false);
                        showGlobalNotification({ notificationType: 'success', title: 'Request Generated Successfully', message: 'Model Change Request has been submitted successfully' });
                    }
                    if (res?.data?.sapStatusResponseCode === STATUS?.REJECTED?.key) {
                        setStatusDescription(res?.data?.sapStatusResponse);
                        setConfirmRequest({
                            isVisible: true,
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
                                    Requested Change Model is blocked for dealer
                                    <br /> Please try again with different model
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
    return (
        <>
            <div className={styles?.cardInsideBox}>
                {addMode ? (
                    <AddEditForm {...formProps} />
                ) : (
                    modelChangeItemList?.map((item) => {
                        return (
                            <Collapse key={1} defaultActiveKey={1} collapsible="disabled">
                                <Panel
                                    header={
                                        <>
                                            <Row justify="space-between" className={styles.fullWidth}>
                                                <Text strong> Change Model</Text>

                                                {/* {item?.pending &&  */}
                                                <div className={styles.verticallyCentered}>
                                                    {onModelSubmit && (
                                                        <>
                                                            {modelStatus === STATUS?.PENDING?.key ? <Tag color="warning">Pending for SAP Confirmation</Tag> : modelStatus === STATUS?.SUCCESS?.key ? <Tag color="success">Success</Tag> : <Tag color="error">Failed for SAP Confirmation</Tag>}
                                                            <Button onClick={handleRefresh} type="link" icon={<TbRefresh />}></Button>
                                                        </>
                                                    )}
                                                </div>
                                            </Row>
                                            {/* // } */}
                                        </>
                                    }
                                    key={1}
                                    showArrow={false}
                                >
                                    <Divider />

                                    {/* {item?.changeAllowed && */}
                                    <AddEditForm {...formProps} />
                                    {/* } */}
                                    <ConfirmationModal {...confirmRequest} />
                                </Panel>
                            </Collapse>
                        );
                    })
                )}
            </div>
        </>
    );
};
export const ChangeModelVariantMaster = connect(mapStateToProps, mapDispatchToProps)(ChangeModelVariantMasterBase);
