/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { DeliverableChecklistMaindataActions } from 'store/actions/data/vehicleDeliveryNote';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetails';
import { VehicleDeliveryNoteFormButton } from '../VehicleDeliveryNoteFormButton';
import { tableColumn } from './tableCoulmn';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleDeliveryNote: {
                DeliverableChecklistMain: { isLoaded: isChecklistDataLoaded = false, isLoading: isChecklistDataLoading, data: ChecklistData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isChecklistDataLoaded,
        isChecklistDataLoading,
        ChecklistData,
        typeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: DeliverableChecklistMaindataActions.fetchList,
            saveData: DeliverableChecklistMaindataActions.saveData,
            listShowLoading: DeliverableChecklistMaindataActions.listShowLoading,
            resetData: DeliverableChecklistMaindataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const DeliverableChecklistMain = (props) => {
    const { userId, isChecklistDataLoaded, isChecklistDataLoading, ChecklistData, deliveryNoteOnFinish } = props;
    const { selectedOrder, handleButtonClick } = props;
    const { fetchList, listShowLoading, showGlobalNotification } = props;
    const { form, selectedCheckListId, section, formActionType, handleFormValueChange, NEXT_ACTION, requestPayload, setRequestPayload } = props;

    const [isReadOnly, setIsReadOnly] = useState(false);
    const [aggregateForm] = Form.useForm();
    const [AdvanceformData, setAdvanceformData] = useState([]);
    const [isEditing, setisEditing] = useState();
    const [checkListDataModified, setcheckListDataModified] = useState([]);
    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };
    const extraParams = useMemo(() => {
        return [
            { key: 'checklistType', title: 'checklistType', value: 'VDCL', name: 'Checklist Type' },
            { key: 'modelGroupCode', title: 'modelGroupCode', value: '4' || selectedOrder?.modelGroup, name: 'Model Group Code' },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder]);

    useEffect(() => {
        if (userId && selectedOrder?.modelGroup && !isChecklistDataLoaded && !formActionType?.viewMode) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrder, isChecklistDataLoaded, formActionType]);

    useEffect(() => {
        if (isChecklistDataLoaded && ChecklistData?.length > 0 && !formActionType?.viewMode) {
            if (requestPayload?.vehicleDeliveryCheckList?.deliveryChecklistDtos?.length) {
                const newArr = requestPayload?.vehicleDeliveryCheckList?.deliveryChecklistDtos;
                setcheckListDataModified(
                    ChecklistData?.map((element) => {
                        const found = newArr?.find((i) => i?.id === element?.id);
                        if (found?.id) return { ...found };
                        return { ...element };
                    })
                );
            } else {
                setcheckListDataModified(
                    ChecklistData?.map((element) => {
                        return { ...element, ismodified: false };
                    })
                );
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecklistDataLoaded, ChecklistData, formActionType]);

    const onFinish = (values) => {
        deliveryNoteOnFinish();
    };
    const onFinishFailed = () => {
        form.validateFields()
            .then(() => {})
            .catch(() => {});
    };
    const handleCheckListClick = ({ buttonAction, record, index }) => {
        setAdvanceformData({ ...record, index: index });
        aggregateForm.resetFields();
        setisEditing(true);
        setIsReadOnly(true);
    };

    const tableProps = {
        isLoading: isChecklistDataLoading,
        tableColumn: tableColumn({ handleButtonClick: handleCheckListClick, formActionType }),
        tableData: checkListDataModified,
        showAddButton: false,
    };

    const formProps = {
        selectedOrder,
        formActionType,
        showGlobalNotification,
        selectedCheckListId,
        form,
        checkListDataModified,
        setcheckListDataModified,
        handleFormValueChange,
        isReadOnly,
        setIsReadOnly,
        aggregateForm,
        tableProps,
        AdvanceformData,
        setAdvanceformData,
        isEditing,
        setisEditing,
        requestPayload,
        setRequestPayload,
    };

    const viewProps = {
        styles,
        isChecklistDataLoading,
        checkListDataModified,
        setcheckListDataModified,
        formActionType,
        tableProps,
        requestPayload,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{section?.title}</h2>
                        </Col>
                    </Row>
                    {formActionType?.viewMode ? <ViewDetail {...viewProps} /> : <AddEditForm {...formProps} />}
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <VehicleDeliveryNoteFormButton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const DeliverableChecklistMaster = connect(mapStateToProps, mapDispatchToProps)(DeliverableChecklistMain);
