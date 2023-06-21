import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import AdvanceOtfFilter from './AdvanceOtfFilter';
import { btnVisiblity } from 'utils/btnVisiblity';
import { AddEditForm } from './AddEditForm';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { OTF_STATUS } from 'constants/OTFStatus';
import { PARAM_MASTER } from 'constants/paramMaster';

import { showGlobalNotification } from 'store/actions/notification';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { otfDetailsDataActions } from 'store/actions/data/otf/otfDetails';
import { otfSearchListAction } from 'store/actions/data/otf/otfSearchAction';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isConfigDataLoaded = false, isLoading: isConfigLoading, paramdata: typeData = [] },
            OTF: {
                OtfDetails: { isLoaded: isDataLoaded = false, isLoading, data: otfData = [] },
                OtfSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data: otfSearchList = [] },
            },
        },
    } = state;
    console.log('state', state);

    const moduleTitle = 'OTF Details';

    let returnValue = {
        userId,
        typeData: typeData && typeData[PARAM_MASTER.OTF_SER.id],
        isDataLoaded,
        otfSearchList: otfSearchList?.otfDetails,
        otfData,
        isLoading,
        moduleTitle,
        isOTFSearchLoading,
        isSearchDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

            fetchOTFSearchedList: otfSearchListAction.fetchList,

            fetchList: otfDetailsDataActions.fetchList,
            saveData: otfDetailsDataActions.saveData,
            resetData: otfDetailsDataActions.reset,
            listShowLoading: otfDetailsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, fetchOTFSearchedList, otfSearchList, isDataLoaded, otfData, isOTFSearchLoading, isSearchDataLoaded } = props;
    const { isConfigDataLoaded, isConfigLoading, typeData, listConfigShowLoading, fetchConfigList } = props;

    const [form] = Form.useForm();
    const [otfSearchResult, setOtfSearchResult] = useState();
    const [listFilterForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [isNewDataLoading, setIsNewDataLoading] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [otfSearchvalue, setOtfSearchvalue] = useState();
    const [otfSearchSelected, setOtfSearchSelected] = useState('');
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const extraParams = [
        {
            key: 'searchType',
            title: 'Type',
            value: filterString?.searchType,
            canRemove: true,
        },
        {
            key: 'searchParam',
            title: 'Value',
            value: filterString?.searchParam,
            canRemove: true,
        },
        {
            key: 'pageSize',
            title: 'Value',
            value: 1000,
            canRemove: true,
        },
        {
            key: 'pageNumber',
            title: 'Value',
            value: 1,
            canRemove: true,
        },
    ];

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const errorAction = (message) => {
        showGlobalNotification(message);
    };

    useEffect(() => {
        if (!isConfigDataLoaded && !isConfigLoading) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.OTF_SER.id });
        }
    }, [isConfigDataLoaded, userId, isConfigLoading]);

    useEffect(() => {
        if (userId) {
            fetchOTFSearchedList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSearchDataLoaded, userId]);

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        const extraParams = [
            {
                key: 'otfNumber',
                title: 'otfNumber',
                value: record?.otfNumber,
                name: 'OTF Number',
            },
        ];

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        fetchList({ setIsLoading: listShowLoading, extraParams, onSuccessAction, errorAction, userId });

        setIsFormVisible(true);
    };

    //const onSearchHandle = (value) => {
    //     if (value === '') {
    //         return;
    //     }
    //     if (value?.trim()?.length >= 3) {
    //         //setFilterString({ ...filterString, searchParam: value });
    //     }

    //     // if (otfSearchSelected !== undefined && otfSearchSelected && otfSearchSelected?.length > 0) console.log('otfSearchSelected', otfSearchSelected);
    //     // if (otfSearchSelected === 'OTF No') setOtfSearchResult(initialTableData.filter((data) => data.otfNumber.includes(value)));
    //     // else if (otfSearchSelected === 'Mobile No') setOtfSearchResult(initialTableData.filter((data) => data.mobileNumber.includes(value)));
    //     // else if (otfSearchSelected === 'Customer Name') setOtfSearchResult(initialTableData.filter((data) => data.customerName.includes(value)));
    // };

    const onSearchHandle = (value) => {
        setShowDataLoading(true);
    };

    const handleResetFilter = (e) => {
        setFilterString();
        listFilterForm.resetFields();
        form.resetFields();
        setShowDataLoading(false);
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
        const recordId = formData?.parentId || form.getFieldValue('parentId');
        let data = { ...values, parentId: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

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
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

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
        setFormData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat('OTF Details'),
        tableData: otfSearchList,
        buttonData,
        setButtonData,
        handleButtonClick,
        handleResetFilter,
        listShowLoading,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: otfSearchList,
    };

    const handleOTFChange = (selectedvalue) => {
        setFilterString({ searchType: selectedvalue });
        setOtfSearchSelected(selectedvalue);
        setOtfSearchvalue(''); // Cleared search value
    };

    const ChangeSearchHandler = (event) => {
        if (event.target.value === undefined) {
            return false;
        }
        setFilterString({ ...filterString, searchParam: event.target.value });
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            if (name === 'code') {
            }
        };
    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        form.resetFields();
    };

    const title = 'Search OTF';

    const advanceFilterResultProps = {
        advanceFilter: true,
        otfFilter: true,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        onSearchHandle,
        handleResetFilter,
        handleClearInSearch,
        handleButtonClick,
        title,
        otfSearchList,
        ChangeSearchHandler,
        handleOTFChange,
        otfSearchvalue,
        setAdvanceSearchVisible,
        typeData,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        handleFilterChange,
        filterString,
        setFilterString,
        form,
        setAdvanceSearchVisible,
        otfStatusList: Object.values(OTF_STATUS),
    };

    return (
        <>
            <AdvanceOtfFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} isLoading={showDataLoading} {...tableProps} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const OtfMaster = connect(mapStateToProps, mapDispatchToProps)(OtfMasterBase);
