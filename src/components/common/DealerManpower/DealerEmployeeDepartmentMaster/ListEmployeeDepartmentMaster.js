import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Empty, ConfigProvider, Select } from 'antd';
import { bindActionCreators } from 'redux';

import { dealerManpowerDivisionMasterDataActions } from 'store/actions/data/dealerManpower/dealerDivisionMaster';
import { dealerManpowerEmployeeDepartmentDataActions } from 'store/actions/data/dealerManpower/dealerEmployeeDepartmentMaster';

import { tableColumn } from './tableColumn';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { validateRequiredInputField } from 'utils/validation';

import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { DataTable } from 'utils/dataTable';
import { filterFunction } from 'utils/filterFunction';
import { AddEditForm } from './AddEditForm';
import { PlusOutlined } from '@ant-design/icons';
import { TfiReload } from 'react-icons/tfi';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            DealerManpower: {
                DealerDivisionMaster: { isLoaded: isDivisionDataLoaded = false, isLoading: isDivisionLoading, data: divisionData },
                DealerEmployeeDepartmentMaster: { isLoaded: isDataLoaded = false, isLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'Dealer Employee Department';

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,
        isDivisionDataLoaded,
        isDivisionLoading,
        divisionData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDivisionList: dealerManpowerDivisionMasterDataActions.fetchList,
            listDivisionShowLoading: dealerManpowerDivisionMasterDataActions.listShowLoading,

            fetchList: dealerManpowerEmployeeDepartmentDataActions.fetchList,
            saveData: dealerManpowerEmployeeDepartmentDataActions.saveData,
            listShowLoading: dealerManpowerEmployeeDepartmentDataActions.listShowLoading,
            resetData: dealerManpowerEmployeeDepartmentDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});



export const ListEmployeeDepartmentMasterBase = (props) => {
    
    const { data, saveData, fetchList, userId, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle, resetData } = props;
    const { isDivisionDataLoaded, listDivisionShowLoading, fetchDivisionList, isDivisionLoading, divisionData } = props;

    const [form] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);
    const [page, setPage] = useState(1);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState({ advanceFilter: true });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [filteredDivisionData, setFilteredDivisionData] = useState([]);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId && !isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }

        if (userId && !isDivisionDataLoaded) {
            fetchDivisionList({ setIsLoading: listDivisionShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataLoaded, isDivisionDataLoaded]);

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
                const division = filterString?.division;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.departmentCode) || filterFunction(keyword)(item?.departmentName) : true) && (division ? filterFunction(division)(item?.divisionCode) : true));
                setSearchdata(filterDataItem?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            } else {
                setSearchdata(data?.map((el, i) => ({ ...el, srl: i + 1 })));
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    // useEffect(() => {
    //     if ( isDivisionDataLoaded && isDataLoaded ) {
    //         // setFilterString({ countryCode: defaultCountry });
    //         //setFilteredDivisionData(divisionData?.filter((i) => i?.code === defaultCountry));
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isDataLoaded, isDivisionDataLoaded]);

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

    // const onSearchHandle = (value) => {
    //     setFilterString({ ...filterString, keyword: value });
    // };

    // const onChangeHandle = (e) => {
    //     setFilterString({ ...filterString, keyword: e.target.value });
    // };

    // const handleDivisionChange = (value) => {
    //     setFilterString({ ...filterString, division: value });
    // };

    const extraParams = [
        {
            key: 'code',
            title: 'Division',
            value: filterString?.code,
            name: divisionData?.find((i) => i?.code === filterString?.code)?.divisionName,
            canRemove: true,
        },
        {
            key: 'keyword',
            title: 'Keyword',
            value: filterString?.keyword,
            name: filterString?.keyword,
            canRemove: true,
        },
    ];

    useEffect(() => {
        if (userId && filterString) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, userId]);

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'code') {
                setFilteredDivisionData(data?.filter((i) => i?.divisionCode === filterValue));
                advanceFilterForm.setFieldsValue({ departmentCode: undefined });
            }
        };

        // const handleFilterChange =
        // (name, type = 'value') =>
        // (value) => {
        //     if (name === 'countryCode') {
        //         advanceFilterForm.setFieldsValue({ stateCode: undefined });
        //     }
        // };

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

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: (formActionType?.viewMode ? 'View ' : formActionType?.editMode ? 'Edit ' : 'Add ').concat('Employee Department'),
        tableData: searchData,

        isDivisionLoading,
        divisionData,

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

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        handleFilterChange,
        divisionData,
        filteredDivisionData,
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
    };

    const onSearchHandle = (value) => {
        value ? setFilterString({ ...filterString, advanceFilter: true, code: value }) : handleResetFilter();
    };

    const removeFilter = (key) => {
        const { [key]: names, ...rest } = filterString;
        setFilterString({ ...rest });
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            {/* <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.lineHeight33}>
                                        {`${moduleTitle}`}
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Select placeholder="Division" loading={isDivisionLoading} onChange={handleDivisionChange} allowClear className={styles.headerSelectField}>
                                            {divisionData?.map((item) => (
                                                <Option value={item?.code}>{item?.divisionName}</Option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Search placeholder="Search" allowClear className={styles.headerSearchField} onSearch={onSearchHandle} onChange={onChangeHandle} />
                                    </Col>
                                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                        <Button icon={<FilterIcon />} type="link" className={styles.filterBtn} onClick={() => setAdvanceSearchVisible(true)} danger>
                                            Advanced Filters
                                        </Button>
                                    </Col>
                                </Row>
                            </Col> */}

                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={14} md={14} lg={16} xl={16}>
                                        <Form colon={false} form={advanceFilterForm} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                            <Form.Item label={`${moduleTitle}`} initialValue={filterString?.code} name="keyword" rules={[validateRequiredInputField(`${moduleTitle}`)]}>
                                                <Search placeholder="Search" maxLength={6} allowClear className={styles.headerSearchField} onSearch={onSearchHandle} />
                                            </Form.Item>
                                        </Form>
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
                                    Add Department
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
                                                            <span>
                                                                <RxCross2 onClick={() => removeFilter(filter?.key)} />
                                                            </span>
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
                    <ConfigProvider
                        renderEmpty={() =>
                            isDataLoaded && (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        !searchData?.length ? (
                                            <span>
                                                No records found. Please add new parameter <br />
                                                using below button
                                            </span>
                                        ) : (
                                            <span> No records found.</span>
                                        )
                                    }
                                >
                                    {!searchData?.length ? (
                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                                    Add Department
                                                </Button>
                                            </Col>
                                        </Row>
                                    ) : (
                                        ''
                                    )}
                                </Empty>
                            )
                        }
                    >
                        <div className={styles.tableProduct}>
                            <DataTable isLoading={showDataLoading} {...tableProps} />
                        </div>
                    </ConfigProvider>
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListEmployeeDepartmentMaster = connect(mapStateToProps, mapDispatchToProps)(ListEmployeeDepartmentMasterBase);
