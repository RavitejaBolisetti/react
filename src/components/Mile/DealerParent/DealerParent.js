import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';
import { dealerParentDataActions } from 'store/actions/data/dealer/dealerParent';
import { dealerParentTitleDataActions } from 'store/actions/data/dealer/dealerParentTitle';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { showGlobalNotification } from 'store/actions/notification';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { filterFunction } from 'utils/filterFunction';
import { AddEditForm } from './AddEditForm';
import { ListDataTable } from 'utils/ListDataTable';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            DealerHierarchy: {
                DealerParent: { isLoaded: isDataLoaded = false, isLoading, data = [] },
                DealerParentTitle: { isLoaded: isTitleDataLoaded = false, detailData: titleData = [] },
            },
        },
    } = state;

    console.log(state, 'GLOBAL');

    const moduleTitle = 'Dealer Parent';

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,
        isTitleDataLoaded,
        titleData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: dealerParentDataActions.fetchList,
            saveData: dealerParentDataActions.saveData,
            listShowLoading: dealerParentDataActions.listShowLoading,
            fetchTitleList: dealerParentTitleDataActions.fetchDetail,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const DealerParentBase = (props) => {
    const { data, saveData, fetchList, fetchTitleList, userId, isDataLoaded, listShowLoading, showGlobalNotification, isTitleDataLoaded, titleData } = props;
    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId) {
            if (!isDataLoaded) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);

    useEffect(() => {
        if (userId) {
            if (!isTitleDataLoaded) {
                fetchTitleList({ setIsLoading: listShowLoading, userId, parameterType: 'TITLE', onSuccessAction, onErrorAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded]);

    useEffect(() => {
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.code) || filterFunction(keyword)(item?.name) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: false, keyword: value });
        }
    };

    const handleResetFilter = (e) => {
        setFilterString();
        listFilterForm.resetFields();
        setShowDataLoading(false);
    };

    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const onFinish = (values) => {
        // let validation = data?.some((item) => item.code === values.code);

        // if (validation) {
        //     showGlobalNotification({ notificationType: 'error', title: 'DUPLICATE', message: 'Duplicate Parent Group Code Found', placement: 'bottomRight' });
        // }
        // else {

        let data = { ...values, title: values.title.key };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
          
            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
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
        //}
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        dealerParentData: data,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat('Dealer Parent'),
        tableData: searchData,
        buttonData,
        setButtonData,
        handleButtonClick,
        handleResetFilter,
        titleData,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
    };

    const title = 'Dealer Parent';

    const advanceFilterResultProps = {
        advanceFilter: false,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        onSearchHandle,
        handleResetFilter,
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
                    <ListDataTable isLoading={showDataLoading} {...tableProps} scroll={1200} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const DealerParent = connect(mapStateToProps, mapDispatchToProps)(DealerParentBase);