import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { tableColumn } from './tableColumn';
import { AdvancedSearch } from './AdvancedSearch';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';

import ListDataTable from 'utils/ListDataTable/ListDataTable';
import { filterFunction } from 'utils/filterFunction';
import { showGlobalNotification } from 'store/actions/notification';
import { geoStateDataActions } from 'store/actions/data/geo/state';
import { geoDistrictDataActions } from 'store/actions/data/geo/district';
import { geoCountryDataActions } from 'store/actions/data/geo/country';

import { searchValidator } from 'utils/validation';

import { AddEditForm } from './AddEditForm';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData },
                State: { isLoaded: isStateDataLoaded = false, isLoading: isStateLoading, data: stateData },
                District: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'District Details';
    const finalCountryData = countryData?.map((item, index) => {
        return { ...item, default: index <= 0 || false };
    });
    const defaultCountry = finalCountryData && finalCountryData?.find((i) => i.default)?.countryCode;

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,
        isCountryLoading,
        countryData: finalCountryData,
        isDataCountryLoaded,
        defaultCountry,
        isStateDataLoaded,
        isStateLoading,
        stateData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchStateList: geoStateDataActions.fetchList,
            listStateShowLoading: geoStateDataActions.listShowLoading,
            countryShowLoading: geoCountryDataActions.listShowLoading,
            fetchCountryList: geoCountryDataActions.fetchList,
            showGlobalNotification,
            saveData: geoDistrictDataActions.saveData,
            fetchList: geoDistrictDataActions.fetchList,
            listShowLoading: geoDistrictDataActions.listShowLoading,
            resetData: geoDistrictDataActions.reset,
        },
        dispatch
    ),
});

export const ListDistrictBase = (props) => {
    const { data, saveData, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification, resetData } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, fetchCountryList, countryShowLoading } = props;
    const { isStateDataLoaded, fetchStateList, listStateShowLoading, stateData } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

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
        setAdvanceSearchVisible(false);
    };

    useEffect(() => {
        if (userId) {
            if (!isDataCountryLoaded) {
                fetchCountryList({ setIsLoading: countryShowLoading, userId });
            }
            if (!isStateDataLoaded) {
                fetchStateList({ setIsLoading: listStateShowLoading, userId });
            }
            if (!isDataLoaded) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataCountryLoaded, isStateDataLoaded, isDataLoaded]);

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
                const state = filterString?.stateCode;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.districtCode) || filterFunction(keyword)(item?.name) || filterFunction(keyword)(item?.code) : true) && (state ? filterFunction(state)(item?.stateCode) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    useEffect(() => {
        if (isDataCountryLoaded && defaultCountry && isStateDataLoaded) {
            setFilterString({ countryCode: defaultCountry });
            defaultCountry ? setFilteredStateData(stateData?.filter((i) => i?.countryCode === defaultCountry)) : setFilteredStateData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataCountryLoaded, isStateDataLoaded]);

    const extraParams = [
        {
            key: 'countryCode',
            title: 'Country',
            value: filterString?.countryCode,
            name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
            canRemove: true,
        },
        {
            key: 'stateCode',
            title: 'State',
            value: filterString?.stateCode,
            name: filteredStateData?.find((i) => i?.code === filterString?.stateCode)?.name,
            canRemove: true,
        },
        {
            key: 'keyword',
            title: 'District',
            value: filterString?.keyword,
            name: filterString?.keyword,
            canRemove: true,
        },
    ];

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(buttonAction === VIEW_ACTION ? { ...defaultBtnVisiblity, closeBtn: true, editBtn: true } : buttonAction === EDIT_ACTION ? { ...defaultBtnVisiblity, saveBtn: true, cancelBtn: true } : { ...defaultBtnVisiblity, saveBtn: true, saveAndNewBtn: true, cancelBtn: true });

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'countryCode') {
                setFilteredStateData(stateData?.filter((i) => i?.countryCode === filterValue));
                advanceFilterForm.setFieldsValue({ stateCode: undefined });
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }

            if (name === 'stateCode') {
                setFilteredDistrictData(data?.filter((i) => i?.stateCode === filterValue));
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }
        };

    const onFinish = (values) => {
        let data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            fetchStateList({ setIsLoading: listStateShowLoading, userId });

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
            setIsLoading: listShowLoading,
            method: formActionType?.editMode ? 'put' : 'post',
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
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat('District Details'),
        tableData: searchData,

        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,
        stateData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,

        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick, page?.current, page?.pageSize),
        tableData: searchData,
        setPage,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        resetData();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setFilterString();
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: true, keyword: value });
            listFilterForm.setFieldsValue({ code: undefined });
        }
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,
        districtData: data,
        stateData,
        data,
        handleFilterChange,
        filteredStateData,
        filteredDistrictData,
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,
    };

    const removeFilter = (key) => {
        if (key === 'countryCode') {
            advanceFilterForm.resetFields();
            setFilterString(undefined);
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ [key]: undefined });
            setFilterString({ ...rest });

            if (!filterString?.countryCode && !filterString?.stateCode && !filterString?.keyword) {
                setFilterString();                
                advanceFilterForm.resetFields();
            } else {
                setFilterString({ ...rest });
            }
        }
    };

    const title = 'District';
    const advanceFilterResultProps = {
        advanceFilter: true,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        extraParams,
        removeFilter,
        handleResetFilter,
        onSearchHandle,
        setAdvanceSearchVisible,
        handleReferesh,
        handleButtonClick,
        advanceFilterProps,
        title,
    };
    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <div className={styles.tableProduct}>
                        <ListDataTable isLoading={showDataLoading} {...tableProps} />
                    </div>
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListDistrictMaster = connect(mapStateToProps, mapDispatchToProps)(ListDistrictBase);
