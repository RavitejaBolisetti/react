/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productDetailsDataActions } from 'store/actions/data/vehicle/productDetails';

import { showGlobalNotification } from 'store/actions/notification';

import styles from 'components/common/Common.module.css';
import { AddEditForm } from './AddEditForm';
import { ViewDetail } from './ViewDetails';
import { VehicleCheckListbutton } from '../VehicleRecieptFormButton';
import { tableColumn } from './tableCoulmn';
// import { PARAM_MASTER } from 'constants/paramMaster';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Vehicle: {
                ProductDetails: { isLoaded: isDataLoaded = false, isLoading, data: ChecklistData = [] },
            },
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
    } = state;

    const moduleTitle = 'Product Details';

    let returnValue = {
        userId,
        isDataLoaded,
        typeData,
        ChecklistData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: productDetailsDataActions.fetchList,
            saveData: productDetailsDataActions.saveData,
            listShowLoading: productDetailsDataActions.listShowLoading,
            resetData: productDetailsDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

const VehicleRecieptCheckListMain = (props) => {
    const { userId, isDataLoaded, ChecklistData, isLoading, handleButtonClick } = props;
    const { fetchList, resetData, saveData, listShowLoading, showGlobalNotification, typeData } = props;
    const { form, selectedCheckListId, section, formActionType, handleFormValueChange, NEXT_ACTION } = props;

    const [formData, setformData] = useState({});
    const [checkListDataModified, setcheckListDataModified] = useState([
        { group: 'Mirrors', subGroup: 'Mirrors-L', checkPoint: 'NA', checkResult: 'This is the dummy text', Remarks: 'Side mirrors', formItemType: 'input' },
        { group: 'Digital Meter', subGroup: 'Odometer Reading', checkPoint: 'NA', checkResult: '12/06/2020-12/06/2020', Remarks: 'Odometer', formItemType: 'numberRange' },
        { group: 'Mirrors', subGroup: 'Mirrors-R', checkPoint: 'NA', checkResult: 200 - 220, Remarks: 'Side mirrors', formItemType: 'datePicker' },
    ]);
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
        if (userId && selectedCheckListId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: makeExtraParams({ key: 'vin', title: 'vin', value: selectedCheckListId, name: 'vin Number' }), onErrorAction, onSuccessAction });
        }
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedCheckListId]);

    const onFinish = (values) => {
        const data = { ...formData, vehicleIdentificationNumber: selectedCheckListId, aggregates: checkListDataModified?.filter((checkList) => checkList?.isEdited) };
        const onSuccess = (res) => {
            setcheckListDataModified([]);
            setformData();
            setIsReadOnly(false);
            form.resetFields();
            handleButtonClick({ record: res?.data, buttonAction: NEXT_ACTION });
        };

        const onError = (message) => {
            setcheckListDataModified([]);
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
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
        isLoading: isLoading,
        tableColumn: tableColumn({ handleButtonClick: handleCheckListClick, formActionType }),
        tableData: checkListDataModified,
    };

    const formProps = {
        formData,
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
        formData,
        isLoading,
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
