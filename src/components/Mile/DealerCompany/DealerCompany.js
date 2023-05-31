import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Col, Form, Row } from 'antd';
import { bindActionCreators } from 'redux';

import { dealerCompanyDataActions } from 'store/actions/data/dealer/dealerCompany';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';

import { filterFunction } from 'utils/filterFunction';
import { AddEditForm } from './AddEditForm';

import { ListDataTable } from 'utils/ListDataTable';
import { dealerParentGroupSearchDataActions } from 'store/actions/data/dealer/dealerParentGroupSearch';
import { dealerParentDataActions } from 'store/actions/data/dealer/dealerParent';
import { geoPincodeDetailsActions } from 'store/actions/data/pincodeDetails';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            DealerHierarchy: {
                DealerCompany: { isLoaded: isDataLoaded = false, isLoading, data = [] },
                DealerParentGroupSearch: { isLoaded: isParentGroupSearchDataLoaded = false, isLoading: isParentGroupSearchLoading = false, data: parentGroupSearchData = [] },
                DealerParent: { isLoaded: isDealerParentDataLoaded = false, isLoading: isDealerParentDataLoading = false, data: dealerParentData = [] },
            },
            PincodeDetails: { isLoaded: isPincodeDetailsLoaded = false, isLoading: isPincodeDetailsLoading = false, detailData: pincodeDetailsData = [] },
        },
    } = state;

    const moduleTitle = 'Dealer Company';
    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isParentGroupSearchDataLoaded,
        isParentGroupSearchLoading,
        parentGroupSearchData,
        isDealerParentDataLoaded,
        isDealerParentDataLoading,
        dealerParentData,
        isPincodeDetailsLoaded,
        isPincodeDetailsLoading,
        pincodeDetailsData,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchParentGroupSearchList: dealerParentGroupSearchDataActions.fetchList,
            listParentGroupSearchShowLoading: dealerParentGroupSearchDataActions.listShowLoading,

            fetchDealerParentList: dealerParentDataActions.fetchList,
            listDealerParentShowLoading: dealerParentDataActions.listShowLoading,

            fetchPincodeDetailsList: geoPincodeDetailsActions.fetchDetail,
            listPincodeDetailsShowLoading: geoPincodeDetailsActions.listShowLoading,

            fetchList: dealerCompanyDataActions.fetchList,
            saveData: dealerCompanyDataActions.saveData,
            listShowLoading: dealerCompanyDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const DealerCompanyBase = (props) => {
    const { data, saveData, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification, detailData } = props;
    const { parentGroupSearchData, fetchParentGroupSearchList, listParentGroupSearchShowLoading, isParentGroupSearchDataLoaded } = props;
    const { pincodeDetailsData, fetchPincodeDetailsList, listPincodeDetailsShowLoading, isPincodeDetailsLoaded } = props;
    const { dealerParentData, isDealerParentDataLoaded, fetchDealerParentList, listDealerParentShowLoading } = props;

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
        if (userId && !isDataLoaded) {
            // console.log(extraParams,"PARAMS")

            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, onErrorAction });
        }
        if (userId && !isParentGroupSearchDataLoaded) {
            fetchParentGroupSearchList({ setIsLoading: listParentGroupSearchShowLoading, userId });
        }
        if (userId && !isPincodeDetailsLoaded) {
            fetchPincodeDetailsList({ setIsLoading: listPincodeDetailsShowLoading, userId, onErrorAction });
        }
        if (userId && !isDealerParentDataLoaded) {
            fetchDealerParentList({ setIsLoading: listDealerParentShowLoading, userId });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded, isParentGroupSearchDataLoaded, isDealerParentDataLoaded]);

    useEffect(() => {
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.keyword;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.companyCode) || filterFunction(keyword)(item?.companyName) : true));
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
        const recordId = formData?.parentId || '';
        let data = { ...values, parentId: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

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
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
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

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat('Dealer Company'),
        tableData: searchData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        handleResetFilter,

        parentGroupSearchData,
        pincodeDetailsData,
        listShowLoading,
        fetchPincodeDetailsList,
        dealerParentData,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
    };

    const title = 'Dealer Company';

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
                    <ListDataTable isLoading={showDataLoading} {...tableProps} />
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const DealerCompany = connect(mapStateToProps, mapDispatchToProps)(DealerCompanyBase);
