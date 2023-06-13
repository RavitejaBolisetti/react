import React, { useState, useEffect,useMemo } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { lessorCompanyMasterDataActions } from 'store/actions/data/lessorCompanyMaster';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';

import { showGlobalNotification } from 'store/actions/notification';

import { filterFunction } from 'utils/filterFunction';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            LessorCompanyMaster: { isLoaded: isDataLoaded = false, isLoading, detailData },
        },
    } = state;

    const moduleTitle = 'Lessor Company';

    let returnValue = {
        userId,
        isDataLoaded,
        detailData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDetail: lessorCompanyMasterDataActions.fetchDetail,
            saveData: lessorCompanyMasterDataActions.saveData,
            listShowLoading: lessorCompanyMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ListLessorCompanyMasterBase = (props) => {
    const { detailData, saveData, fetchDetail, userId, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState(detailData);
    const [refershData, setRefershData] = useState(false);
    

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onErrorAction = () => {
        console.log('error');
    };

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && !isDataLoaded) {
            fetchDetail({ setIsLoading: listShowLoading, userId, customerId: '673a6f88-6a5f-4e0b-9208-7b09819a5398', onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);

    useEffect(() => {
        if (userId && refershData) {
            fetchDetail({ setIsLoading: listShowLoading, userId, customerId: '673a6f88-6a5f-4e0b-9208-7b09819a5398', onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (detailData?.length) {
            setSearchdata(detailData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailData]);

    useEffect(() => {
        if (detailData?.length > 0 && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const filterDataItem = detailData?.filter((item) => (keyword ? filterFunction(keyword)(item?.companyDescription) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(detailData?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, detailData, userId]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };
   
    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        } else if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        }
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';

        let data = { customerId: '673a6f88-6a5f-4e0b-9208-7b09819a5398', customerLessorCompanyDetails: [{ ...values, id: recordId }] };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchDetail({ setIsLoading: listShowLoading, userId, onSuccessAction, customerId: '673a6f88-6a5f-4e0b-9208-7b09819a5398' });

            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
                setButtonData({ saveBtn: true, saveAndNewBtn: true, cancelBtn: true });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });
    
    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add ';
        }
    }, [formActionType]);

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: searchData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
       tableData: searchData,
    };

    const title = 'Lessor Company Name';

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,

        onSearchHandle,
        handleClearInSearch,
        handleReferesh,
        handleButtonClick,
        title,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={handleAdd} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListLessorCompanyMaster = connect(mapStateToProps, mapDispatchToProps)(ListLessorCompanyMasterBase);
