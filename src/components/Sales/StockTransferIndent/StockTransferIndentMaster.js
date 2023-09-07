/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FilterIcon } from 'Icons';

import { tableColumn } from './tableColumn';
import { PARAM_MASTER } from 'constants/paramMaster';
import { STOCK_TRANSFER } from 'constants/StockTransfer';
import { ADD_ACTION, VIEW_ACTION, CANCEL_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { showGlobalNotification } from 'store/actions/notification';
import { AdvancedSearch } from './AdvancedSearch';
import AdvanceFilter from './AdvanceFilter';
import { AddEditForm } from './AddEditForm';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        
        },
    } = state;
    let returnValue = {
        userId,
        typeData
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

export const OtfMasterBase = (props) => {
    const { userId, typeData } = props;
    const [searchForm] = Form.useForm();

    const [advanceFilterForm] = Form.useForm();
    
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [isAddNewIndentVisible, setIsAddNewIndentVisible] = useState(false);
    const [filterString, setFilterString] = useState();
    const [toggleButton, settoggleButton] = useState(STOCK_TRANSFER?.RAISED.key);
    const [openAccordian, setOpenAccordian] = useState('1');

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        cancelBtn: false,
        closeBtn: false,
        formBtnActive: false
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    useEffect(() => {
        setFilterString({ ...filterString, pageSize: 10, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.[PARAM_MASTER.OTF_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: filterString?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        switch (buttonAction) {
            case ADD_ACTION:
                break;
            case VIEW_ACTION:
                // setSelectedOrder(record);
                // record && setSelectedOrderId(record?.otfNumber);
                break;
            case CANCEL_ACTION:
                break;
            
            default:
                break;
        }

        if (buttonAction !== NEXT_ACTION) {
            if ([ADD_ACTION, VIEW_ACTION]?.includes(buttonAction)) {
                setFormActionType({
                    addMode: buttonAction === ADD_ACTION,
                    editMode: false,
                    viewMode: buttonAction === VIEW_ACTION,
                });
            }
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        }
    };

    const onFinish = (values) => {
        //const recordId = formData?.parentId || form.getFieldValue('parentId');
        //let data = { ...values, parentId: recordId };

        const onSuccess = (res) => {
            // form.resetFields();
            // setShowDataLoading(true);
            // showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            // fetchOTFDetail({ setIsLoading: listShowLoading, userId, onSuccessAction });
            // setButtonData({ ...buttonData, formBtnActive: false });
            // setIsFormVisible(false);
        };

        const onError = (message) => {
            // showGlobalNotification({ message });
        };

        const requestData = {
            //data: data,
            //baseURL,
            //method: formActionType?.editMode ? 'put' : 'post',
            //setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        //saveData(requestData);
    };

    const onCloseAction = () => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        //setSelectedOrder();
        //setIsFormVisible(false);
        //setButtonData({ ...defaultBtnVisiblity });
    };

    const handleOnAddIndentClick = () => {
        setIsAddNewIndentVisible(true);
    };

    const onAddIndentDetailsCloseAction = () => {
        setIsAddNewIndentVisible(false);
    };

    const onFinishSearch = (values) => {};

    const drawerTitle = useMemo(() => {
        // if (formActionType?.viewMode) {
        //     return 'View ';
        // } else if (formActionType?.editMode) {
        //     return 'Edit ';
        // } else {
        //     return 'Add New ';
        // }
    //}, [formActionType]);
    }, []);

    const tableProps = {
        //dynamicPagination,
        filterString,
        //totalRecords,
        //setPage: setFilterString,
        isLoading: false, //showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        //tableData: data,
        showAddButton: false,
        //noDataMessage: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
    };

    const advanceFilterProps = {
        extraParams,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        toggleButton, 
        settoggleButton,
        onFinish,
        onFinishFailed,

        setAdvanceSearchVisible,
        searchForm,
        onFinishSearch,
        handleOnAddIndentClick,
    };

    const advanceSearchFilterProps = {
        isVisible: isAdvanceSearchVisible,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        toggleButton,
        onCloseAction,
        //handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        // otfStatusList,
        // typeData,
        // onFinishSearch,
    };

    const addNewIndentProps = {
        isVisible: isAddNewIndentVisible,
        titleOverride: 'Add Indent Details',
        onCloseAction : onAddIndentDetailsCloseAction,
        openAccordian, 
        setOpenAccordian,
    };
   
    return (
        <>
            <AdvanceFilter {...advanceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceSearchFilterProps} />
            <AddEditForm {...addNewIndentProps} />;
        </>
    );
};

export const StockTransferIndentMaster = connect(mapStateToProps, mapDispatchToProps)(OtfMasterBase);
