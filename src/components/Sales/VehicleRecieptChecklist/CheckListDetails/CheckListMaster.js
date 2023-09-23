/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showGlobalNotification } from 'store/actions/notification';
import { VehicleCheclistDetailsdataActions } from 'store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistMaster';

import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetails';
import { VehicleCheckListbutton } from '../VehicleRecieptFormButton';
import { tableColumn } from './tableCoulmn';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleReceiptChecklist: {
                VehicleReceiptMaster: { isLoaded: isChecklistDataLoaded = false, isLoading: isChecklistDataLoading = true, data: ChecklistData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Checklist Details';

    let returnValue = {
        userId,
        isChecklistDataLoaded,
        isChecklistDataLoading,
        ChecklistData,
        typeData,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: VehicleCheclistDetailsdataActions.fetchList,
            saveData: VehicleCheclistDetailsdataActions.saveData,
            listShowLoading: VehicleCheclistDetailsdataActions.listShowLoading,
            resetData: VehicleCheclistDetailsdataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleRecieptCheckListMain = (props) => {
    const { userId, handleButtonClick, selectedRecord } = props;
    const { isChecklistDataLoaded, isChecklistDataLoading, ChecklistData } = props;
    const { fetchList, listShowLoading, showGlobalNotification } = props;
    const { form, selectedCheckListId, section, formActionType, handleFormValueChange, NEXT_ACTION } = props;

    const { chassisNumber } = selectedRecord;
    const { checkListDataModified, setcheckListDataModified, resetData } = props;

    const [isReadOnly, setIsReadOnly] = useState(false);
    const [aggregateForm] = Form.useForm();
    const [AdvanceformData, setAdvanceformData] = useState([]);
    const [isEditing, setisEditing] = useState();

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message: message });
    };
    const makeExtraParams = ({ key, title, value, name }) => {
        const params = [
            {
                key: key,
                title: title,
                value: value,
                name: name,
            },
        ];
        return params;
    };

    useEffect(() => {
        if (userId && chassisNumber && !isChecklistDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: makeExtraParams({ key: 'chassisNumber', title: 'chassisNumber', value: chassisNumber, name: 'Chassis Number' }), onErrorAction, onSuccessAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, chassisNumber, isChecklistDataLoaded]);

    useEffect(() => {
        if (isChecklistDataLoaded && ChecklistData['checklistDetailList']?.length > 0) {
            if (!checkListDataModified?.find((element) => element?.ismodified) || !checkListDataModified?.length > 0) {
                setcheckListDataModified(
                    ChecklistData['checklistDetailList']?.map((element) => {
                        return { ...element, ismodified: false };
                    })
                );
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecklistDataLoaded, ChecklistData, formActionType]);

    const onFinish = (values) => {
        handleButtonClick({ buttonAction: NEXT_ACTION });
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
    };

    const formProps = {
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
    };

    const viewProps = {
        styles,
        isChecklistDataLoading,
        checkListDataModified,
        setcheckListDataModified,
        formActionType,
        tableProps,
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
                    <VehicleCheckListbutton {...props} />
                </Col>
            </Row>
        </Form>
    );
};
export const VehicleRecieptCheckListMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleRecieptCheckListMain);
