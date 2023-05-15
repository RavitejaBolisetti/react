import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Space, Empty, ConfigProvider, Select } from 'antd';
import { bindActionCreators } from 'redux';

import { geoCountryDataActions } from 'store/actions/data/geo/country';
import { geoStateDataActions } from 'store/actions/data/geo/state';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { showGlobalNotification } from 'store/actions/notification';

import { ListDataTable } from 'utils/ListDataTable';
import { RxCross2 } from 'react-icons/rx';

import { filterFunction } from 'utils/filterFunction';
import { AdvancedSearch } from './AdvancedSearch';
import { AddEditForm } from './AddEditForm';
import { PlusOutlined } from '@ant-design/icons';
import { FilterIcon } from 'Icons';
import { TfiReload } from 'react-icons/tfi';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData = [] },
                State: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'State Master List';

    const finalCountryData = countryData?.map((item, index) => {
        return { ...item, default: index <= 0 || false };
    });

    const defaultCountry = finalCountryData && finalCountryData?.find((i) => i.default)?.countryCode;
    let returnValue = {
        userId,
        isDataCountryLoaded,
        isCountryLoading,
        countryData: finalCountryData,
        defaultCountry,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCountryList: geoCountryDataActions.fetchList,
            countryShowLoading: geoCountryDataActions.listShowLoading,

            fetchList: geoStateDataActions.fetchList,
            saveData: geoStateDataActions.saveData,
            resetData: geoStateDataActions.reset,
            listShowLoading: geoStateDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ListStateMasterBase = (props) => {
    const { data, saveData, fetchList, userId, isDataLoaded, isLoading, listShowLoading, resetData, showGlobalNotification, moduleTitle } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, fetchCountryList, countryShowLoading } = props;

    const [form] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState({ advanceFilter: true });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const extraParams = [
        {
            key: 'countryCode',
            title: 'Country',
            value: filterString?.countryCode,
            name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
            canRemove: false,
        },
        {
            key: 'keyword',
            title: 'Keyword',
            value: filterString?.keyword,
            name: filterString?.keyword,
            canRemove: true,
        },
    ];

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        setFilterString({ countryCode: defaultCountry });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultCountry]);

    useEffect(() => {
        if (userId && !isDataCountryLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            if (!isDataCountryLoaded) {
                fetchCountryList({ setIsLoading: countryShowLoading, userId });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataCountryLoaded]);

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
                const countryCode = filterString?.countryCode;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.code) || filterFunction(keyword)(item?.name) : true) && (countryCode ? filterFunction(countryCode)(item?.countryCode) : true));
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

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            if (name === 'countryCode') {
                advanceFilterForm.setFieldsValue({ stateCode: undefined });
            }
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
        value ? setFilterString({ ...filterString, advanceFilter: true, keyword: value }) : handleResetFilter();
    };

    const onFinish = (values) => {
        let data = { ...values };

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

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
    };

    const handleResetFilter = () => {
        resetData();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setAdvanceSearchVisible(false);
    };
    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        setAdvanceSearchVisible,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,

        data,
        handleFilterChange,
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
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
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat(moduleTitle),
        tableData: searchData,

        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,

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

    const removeFilter = (key) => {
        console.log("🚀 ~ file: ListStateMaster.js:304 ~ removeFilter ~ key:", key)
        const { [key]: names, ...rest } = filterString;
        setFilterString({ ...rest });
    };

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={4} lg={4} xl={4} className={styles.lineHeight33}>
                                        State List
                                    </Col>
                                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                        <Search placeholder="Search" value={filterString?.keyword} allowClear className={styles.headerSearchField} onSearch={onSearchHandle} />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                        <Button icon={<FilterIcon />} type="link" className={styles.filterBtn} onClick={() => setAdvanceSearchVisible(true)} danger>
                                            Advanced Filters
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                            <Col className={styles.addGroup} xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Button icon={<TfiReload />} className={styles.refreshBtn} onClick={handleReferesh} danger />
                                <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                    Add State
                                </Button>
                            </Col>
                        </Row>
                        {filterString?.advanceFilter && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
                                            <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
                                        </Col>
                                        <Col xs={24} sm={22} md={22} lg={18} xl={18} className={styles.advanceFilterContainer}>
                                            {extraParams?.map((filter) => {
                                                return (
                                                    filter?.value && (
                                                        <div className={styles.advanceFilterItem}>
                                                            {filter?.name}
                                                            {filter?.canRemove && (
                                                                <span>
                                                                    <RxCross2 onClick={() => removeFilter(filter?.key)} />
                                                                </span>
                                                            )}
                                                        </div>
                                                    )
                                                );
                                            })}
                                        </Col>
                                        <Col xs={24} sm={2} md={2} lg={2} xl={2} className={styles.advanceFilterClear}>
                                            <Button className={styles.clearBtn} onClick={handleResetFilter} danger>
                                                Clear
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )}
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={isLoading} {...tableProps} handleAdd={handleAdd} addTitle={'State'} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListStateMaster = connect(mapStateToProps, mapDispatchToProps)(ListStateMasterBase);
