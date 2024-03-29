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
import { VehicleCheclistDetailsdataActions } from 'store/actions/data/VehicleReceiptCheckList/VehicleReceiptChecklistMaster';

import { AddEditForm, tableColumn } from 'components/Sales/Common/ChecklistDetails';
import { VehicleCheckListbutton } from '../VehicleRecieptFormButton';
import { MODULE_TYPE_CONSTANTS } from 'constants/modules/vehicleChecklistConstants';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            VehicleReceiptChecklist: {
                VehicleReceiptMaster: { isLoaded: isChecklistDataLoaded = false, isLoading: isChecklistDataLoading, data: ChecklistData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Checklist Details';
    const paginationDataKey = 'checklistDetailList';
    const uniqueMatchKey = 'ansMstId';

    let returnValue = {
        userId,
        isChecklistDataLoaded,
        isChecklistDataLoading,
        ChecklistData,
        typeData,
        moduleTitle,
        paginationDataKey,
        uniqueMatchKey,
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
    const { form, selectedCheckListId, section, formActionType, handleFormValueChange, NEXT_ACTION, paginationDataKey, uniqueMatchKey } = props;

    const { chassisNumber } = selectedRecord;
    const { checkListDataModified, setcheckListDataModified } = props;

    const pageIntialState = {
        pageSize: 10,
        current: 1,
    };
    const [page, setPage] = useState({ ...pageIntialState });

    const [isReadOnly, setIsReadOnly] = useState(false);
    const [aggregateForm] = Form.useForm();
    const [AdvanceformData, setAdvanceformData] = useState([]);
    const [isEditing, setisEditing] = useState();

    const onSuccessAction = (res) => {};

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };
    const checklistDetailsParams = useMemo(() => {
        return [
            { key: 'chassisNumber', title: 'chassisNumber', value: chassisNumber, name: 'Chassis Number' },
            { key: 'id', title: 'id', value: selectedRecord?.id, name: 'id' },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chassisNumber, userId]);

    useEffect(() => {
        if (userId && chassisNumber && !isChecklistDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: checklistDetailsParams, onErrorAction, onSuccessAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, chassisNumber, isChecklistDataLoaded]);

    useEffect(() => {
        if (isChecklistDataLoaded && ChecklistData[paginationDataKey]?.length > 0) {
            if (!checkListDataModified?.find((element) => element?.ismodified) || !checkListDataModified?.length > 0) {
                setcheckListDataModified(
                    ChecklistData[paginationDataKey]?.map((element) => {
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
            .catch((err) => console.err(err));
    };
    const handleCheckListClick = ({ record, index }) => {
        setAdvanceformData({ ...record, index: index });
        aggregateForm.resetFields();
        setisEditing(true);
        setIsReadOnly(true);
    };

    const tableProps = {
        dynamicPagination: true,
        showAddButton: false,
        page,
        setPage,
        isLoading: isChecklistDataLoading,
        tableColumn: tableColumn({ handleButtonClick: handleCheckListClick, formActionType, aggregateForm, checklistType: MODULE_TYPE_CONSTANTS?.RECEIPT_CHECKLIST?.key }),
        tableData: checkListDataModified,
        totalRecords: checkListDataModified?.length,
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
        page,
        setPage,
        pageIntialState,
        matchKey: uniqueMatchKey,
        isChecklistDataLoading,
        styles,
        checklistType: MODULE_TYPE_CONSTANTS?.RECEIPT_CHECKLIST?.key,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBodyRight}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <h2>{translateContent('vehicleReceiptChecklist.heading.section' + section?.id)}</h2>
                        </Col>
                    </Row>
                    <AddEditForm {...formProps} />
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
