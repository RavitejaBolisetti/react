/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { tableColumn } from './tableColumn';

import { ListDataTable } from 'utils/ListDataTable';
import { btnVisiblity } from 'utils/btnVisiblity';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { AdvancedSearch } from './AdvancedSearch';

import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

import { ViewDetail } from './ViewDetail';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData = [] },
            },
        },
    } = state;
    const moduleTitle = 'Dealer Communication View';
    let returnValue = {
        userId,

        moduleTitle,
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
export const DealerCommunicationViewMasterBase = (props) => {
    const { data, saveData, moduleTitle, userId, showGlobalNotification } = props;

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

    const [searchData, setSearchdata] = useState([{}]);
    const [refershData, setRefershData] = useState(false);

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
    const VIEW_ONLY_ACTION = FROM_ACTION_TYPE?.VIEW_ONLY;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: `${translateContent('global.notificationSuccess.success')}`, message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (isAdvanceSearchVisible) {
            advanceFilterForm.resetFields();
            advanceFilterForm.setFieldsValue({ code: filterString?.code });
            if (filterString?.stateCode) {
                advanceFilterForm.setFieldsValue({ stateCode: filterString?.stateCode, districtCode: filterString?.districtCode });
                handleFilterChange('stateCode')(filterString?.stateCode);
            }
            if (filterString?.districtCode) {
                advanceFilterForm.setFieldsValue({ districtCode: filterString?.districtCode });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isAdvanceSearchVisible]);

    const extraParams = [
        {
            key: 'districtCode',
            title: `${translateContent('city.title.district')}`,
            canRemove: true,
            value: filterString?.districtCode,
            name: filteredDistrictData?.find((i) => i?.key === filterString?.districtCode)?.value,
        },

        {
            key: 'keyword',
            title: `${translateContent('city.title.keyword')}`,
            canRemove: true,
            value: filterString?.keyword,
            name: filterString?.keyword,
        },
    ];

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction: buttonAction === VIEW_ACTION ? VIEW_ONLY_ACTION : buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const removeFilter = (key) => {
        if (key === 'countryCode') {
            setFilterString(undefined);
            setFilteredDistrictData([]);
        } else if (key === 'stateCode') {
            const { stateCode, districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
            setFilteredDistrictData([]);
        } else if (key === 'districtCode') {
            const { districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, code: undefined });

            if (!filterString?.countryCode && !filterString?.stateCode && !filterString?.districtCode) {
                setFilterString();
                advanceFilterForm.resetFields();
            } else {
                setFilterString({ ...rest });
            }
        }
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: true, keyword: value });
            listFilterForm.setFieldsValue({ code: undefined });
        }
    };

    const handleClearInSearch = (e) => {
        if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        } else if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;
            if (!value) {
                switch (name) {
                    case 'stateCode': {
                        setFilteredDistrictData();
                        advanceFilterForm.setFieldsValue({ districtCode: undefined });
                        break;
                    }

                    default: {
                        break;
                    }
                }
                return;
            }

            if (name === 'countryCode') {
                advanceFilterForm.setFieldsValue({ stateCode: undefined, districtCode: undefined, cityCode: undefined, tehsilCode: undefined });
            }

            if (name === 'stateCode') {
                advanceFilterForm.setFieldsValue({ districtCode: undefined, cityCode: undefined, tehsilCode: undefined });
            }
        };

    const onFinish = (values) => {
        let data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: `${translateContent('global.notificationSuccess.success')}`, message: res?.responseMessage });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: `${translateContent('global.notificationSuccess.success')}`, message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: `${translateContent('global.notificationSuccess.success')}`, message: res?.responseMessage });
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
            // setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
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
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        tableData: data,
        data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
    };
    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setFilteredDistrictData(undefined);
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        titleOverride: translateContent('city.title.advanceFilters'),
        handleFilterChange,
        filteredStateData,
        filteredDistrictData,
        filterString,
        setFilterString,
        advanceFilterForm,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: [
            {
                corporateCode: 'CC999',
                corporateName: 'Test Corp',
                corporateCategory: 'Test Category',
                corporateType: 'Type',
                createdDate: '07/12/1996'
            },
        ],
    };

    const title = moduleTitle || translateContent('Dealer Communication View');
    const advanceFilterResultProps = {
        advanceFilter: true,
        filterString,
        from: listFilterForm,
        onFinish,
        extraParams,
        removeFilter,
        handleResetFilter,
        onSearchHandle,
        handleClearInSearch,
        setAdvanceSearchVisible,
        handleReferesh,
        handleButtonClick,
        advanceFilterProps,
        title,
        setFilteredDistrictData,
        tableData: searchData,
        showAddButton: false,
        showRefreshBtn: false,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <ListDataTable isLoading={false} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>

            {formActionType?.viewMode ? <ViewDetail {...formProps} /> : <AddEditForm {...formProps} />}
        </>
    );
};

export const DealerCommunicationViewMaster = connect(mapStateToProps, mapDispatchToProps)(DealerCommunicationViewMasterBase);
