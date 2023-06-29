/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Form, Empty, ConfigProvider, Select } from 'antd';

import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { showGlobalNotification } from 'store/actions/notification';
import { validateRequiredInputField, validateMobileNoField, validateLettersWithWhitespaces, validateRequiredInputFieldMinLength, validateRequiredSelectField } from 'utils/validation';

import { PlusOutlined } from '@ant-design/icons';
import { tableColumn } from './tableColumn';

import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PARAM_MASTER } from 'constants/paramMaster';

import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import DataTable from 'utils/dataTable/DataTable';
import { CustomerMainConatiner } from './CustomerMainConatiner';
import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
        customer: {
            customerDetail: { isLoaded: isDataLoaded = false, isLoading, data, filter: filterString = {} },
        },
    } = state;

    const moduleTitle = 'Customer';

    let returnValue = {
        userId,
        isDataLoaded,
        data: data?.customerMasterDetails || [],
        isLoading,
        moduleTitle,
        typeData: typeData && typeData[PARAM_MASTER.CUST_MST.id],
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: customerDetailDataActions.fetchList,
            saveData: customerDetailDataActions.saveData,
            setFilterString: customerDetailDataActions.setFilter,
            resetData: customerDetailDataActions.reset,
            listShowLoading: customerDetailDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const CustomerMasterMain = (props) => {
    const { data, fetchList, userId, isLoading, listShowLoading, showGlobalNotification, resetData, moduleTitle, typeData } = props;
    const { filterString, setFilterString } = props;

    const [customerType, setCustomerType] = useState(CUSTOMER_TYPE?.INDIVIDUAL.id);
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [selectedCustomerId, setSelectedCustomerId] = useState();
    const [shouldResetForm, setShouldResetForm] = useState(false);
    const [refreshList, setRefreshList] = useState(false);

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [customerSearchRules, setCustomerSearchRules] = useState({ rules: [validateRequiredInputField('Keyword')] });

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const defaultExtraParam = [
        {
            key: 'customerType',
            title: 'Customer Type',
            value: customerType,
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

    const extraParams = [
        ...defaultExtraParam,
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
    ];

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
    };

    const onErrorAction = (res) => {
        showGlobalNotification({ message: res?.responseMessage });
        setShowDataLoading(false);
    };

    useEffect(() => {
        const defaultSection = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION.CUSTOMER_DETAILS.id : CUSTOMER_CORPORATE_SECTION.CUSTOMER_DETAILS.id;
        setSetionName(customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION);
        setDefaultSection(defaultSection);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerType]);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);
            const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    useEffect(() => {
        if (userId && customerType) {
            resetData();
            fetchList({ setIsLoading: listShowLoading, extraParams: defaultExtraParam, userId, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerType, userId, refreshList]);

    // useEffect(() => {
    //     setFilterString(() => '');
    // }, [filterString]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();

        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                break;
            case EDIT_ACTION:
                setSelectedCustomer(record);
                record && setSelectedCustomerId(record?.customerId);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedCustomer(record);
                record && setSelectedCustomerId(record?.customerId);
                defaultSection && setCurrentSection(defaultSection);
                break;

            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                break;

            default:
                break;
        }

        if (buttonAction !== NEXT_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        }
        setIsFormVisible(true);
    };

    const onFinish = (values, e) => {};

    const onFinishFailed = (errorInfo) => {
        console.error(errorInfo);
        // form.validateFields().then((values) => {});
    };

    const tableProps = {
        isLoading: isLoading,
        tableData: data,
        tableColumn: tableColumn(handleButtonClick),
    };

    const onChange = (sorter, filters) => {
        form.resetFields();
    };

    const onSearchHandle = (value) => {
        searchForm
            .validateFields()
            .then((values) => {
                setShowDataLoading(true);
                fetchList({ setIsLoading: listShowLoading, extraParams, userId, onSuccessAction, onErrorAction });
            })
            .catch((err) => {
                console.log(err);
                return;
            });
    };

    const handleChange = (selectedvalue) => {
        setFilterString({ searchType: selectedvalue, searchParam: '' });
        setCustomerSearchRules({ rules: [validateRequiredInputField('Keyword')] });

        //setSearchvalue(''); // Cleared search value
        // setFilterString({ ...filterString, searchParam: '' });
        console.log('filterString', filterString);
    };

    const onChangeHandle = (event) => {
        if (event.target.value === undefined) {
            return false;
        }
        if (!filterString?.searchType) {
            setCustomerSearchRules({ rules: [validateRequiredSelectField('Parameter')] });
        }
        if (filterString?.searchType === 'mobileNumber') {
            setCustomerSearchRules({ rules: [validateMobileNoField('Mobile Number'), validateRequiredInputField('Mobile Number')] });
        }
        if (filterString?.searchType === 'customerName') {
            setCustomerSearchRules({ rules: [validateLettersWithWhitespaces('Customer Name'), validateRequiredInputFieldMinLength('Customer Name')] });
        }

        setFilterString({ ...filterString, searchParam: event.target.value });
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue({});

        setIsFormVisible(false);
        setFormActionType(defaultFormActionType);
        setButtonData(defaultBtnVisiblity);
        setSelectedCustomer();
        setSelectedCustomerId();
        setShouldResetForm(true);
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);

    const containerProps = {
        record: selectedCustomer,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,
        customerType,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedCustomerId,
        setSelectedCustomerId,
        selectedCustomer,
        setSelectedCustomer,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        shouldResetForm,
        handleFormValueChange,
        setRefreshList,
        isLastSection,
        saveButtonName: !selectedCustomerId ? 'Create Customer ID' : isLastSection ? 'Submit' : 'Save & Next',
    };

    const selectProps = {
        optionFilterProp: 'children',
        allowClear: true,
        className: styles.headerSelectField,
    };

    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles.searchAndLabelAlign}>
                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                    {Object.values(CUSTOMER_TYPE)?.map((item) => {
                                        return (
                                            <Button type={customerType === item?.id ? 'primary' : 'link'} danger onClick={() => setCustomerType(item?.id)}>
                                                {item?.title}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <div className={styles.selectSearchBg}>
                                    <Form onKeyPress={onKeyPressHandler} form={searchForm} layout="vertical" autoComplete="off">
                                        <Form.Item name="parameter" rules={[validateRequiredSelectField('parameter')]}>
                                            <Select {...selectProps} value={filterString?.searchType} className={styles.headerSelectField} onChange={handleChange} placeholder="Select Parameter">
                                                {typeData?.map((item) => (
                                                    <Option key={'pnc' + item?.key} value={item?.key}>
                                                        {item?.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item {...customerSearchRules} name="keyword" validateTrigger={['onChange', 'onSearch']}>
                                            <Search placeholder="Search" value={filterString?.searchParam} onChange={onChangeHandle} onSearch={onSearchHandle} allowClear className={styles.headerSearchField} htmlType="submit" />
                                        </Form.Item>
                                    </Form>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className={styles.advanceFilterClear}>
                                <Button danger type="primary" icon={<PlusOutlined />} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                    Add
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ConfigProvider
                        renderEmpty={() => (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={<span> No record found.</span>}
                            ></Empty>
                        )}
                    >
                        <DataTable isLoading={showDataLoading} {...tableProps} onChange={onChange} />
                    </ConfigProvider>
                </Col>
            </Row>
            <CustomerMainConatiner {...containerProps} />
        </>
    );
};

export const CustomerMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerMasterMain);
