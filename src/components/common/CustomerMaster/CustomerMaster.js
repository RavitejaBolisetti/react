/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Input, Form, Empty, ConfigProvider, Select } from 'antd';

import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { customerDetailDataActions } from 'store/actions/customer/customerDetail';
import { showGlobalNotification } from 'store/actions/notification';

import { PlusOutlined } from '@ant-design/icons';
import { tableColumn } from './tableColumn';

import { btnVisiblity } from 'utils/btnVisiblity';
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
            ConfigurableParameterEditing: { isLoaded: isConfigDataLoaded = false, isLoading: isConfigLoading, paramdata: typeData = [] },
        },
        customer: {
            customerDetail: { isLoaded: isDataLoaded = false, isLoading, data, filter: filterString = {} },
        },
    } = state;

    const moduleTitle = 'Customer';

    let returnValue = {
        userId,
        isDataLoaded,
        data,
        isLoading,
        moduleTitle,
        isConfigDataLoaded,
        isConfigLoading,
        typeData: typeData && typeData[PARAM_MASTER.CUST_MST.id],
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchConfigList: configParamEditActions.fetchList,
            listConfigShowLoading: configParamEditActions.listShowLoading,

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
    const { data, fetchList, userId, isLoading, listShowLoading, showGlobalNotification, resetData, moduleTitle } = props;
    const { isConfigDataLoaded, isConfigLoading, typeData, listConfigShowLoading, fetchConfigList } = props;
    const { filterString, setFilterString } = props;

    const [customerType, setCustomerType] = useState(CUSTOMER_TYPE?.INDIVIDUAL.id);
    const [selectedCustomer, setSelectedCustomer] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();

    const [form] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const NEXT_ACTION = FROM_ACTION_TYPE?.NEXT;

    const defaultExtraParam = [
        {
            key: 'customerType',
            title: 'Customer Type',
            value: customerType,
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

    useEffect(() => {
        const defaultSection = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION.CUSTOMER_DETAILS.id : CUSTOMER_CORPORATE_SECTION.CUSTOMER_DETAILS.id;
        setDefaultSection(defaultSection);
        setSection(defaultSection);
        setSetionName(customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerType]);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
    };

    const onErrorAction = (res) => {
        showGlobalNotification({ message: res?.responseMessage });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (!isConfigDataLoaded && !isConfigLoading && userId) {
            fetchConfigList({ setIsLoading: listConfigShowLoading, userId, parameterType: PARAM_MASTER.CUST_MST.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConfigDataLoaded, userId]);

    useEffect(() => {
        if (userId && customerType) {
            resetData();
            fetchList({ setIsLoading: listShowLoading, extraParams: defaultExtraParam, userId, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerType, userId]);

    const handleButtonClick = ({ record = null, buttonAction, formVisible = false }) => {
        form.resetFields();
        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION || buttonAction === NEXT_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        setIsFormVisible(true);

        if (buttonAction === NEXT_ACTION) {
            const section = Object.values(sectionName)?.find((i) => i.id > currentSection);
            section && setCurrentSection(section?.id);
        }

        if (buttonAction === VIEW_ACTION || !formVisible) {
            setSelectedCustomer(record);
            defaultSection && setCurrentSection(defaultSection);
        }
    };

    const onFinish = (values, e) => {};

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
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
        setShowDataLoading(true);
    };

    const handleChange = (selectedvalue) => {
        setFilterString({ searchType: selectedvalue });
    };

    const onChangeHandle = (event) => {
        if (event.target.value === undefined) {
            return false;
        }
        setFilterString({ ...filterString, searchParam: event.target.value });
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setFormActionType(defaultFormActionType);
        setButtonData(defaultBtnVisiblity);
        setSelectedCustomer();
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
        selectedCustomer,
        setSelectedCustomer,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
    };

    const selectProps = {
        optionFilterProp: 'children',
        allowClear: true,
        className: styles.headerSelectField,
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
                                            <Button className={styles.marR5} type={customerType === item?.id ? 'primary' : 'link'} danger onClick={() => setCustomerType(item?.id)}>
                                                {item?.title}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <div className={styles.selectSearchBg}>
                                    <Select {...selectProps} value={filterString?.searchType} className={styles.headerSelectField} onChange={handleChange} placeholder="Select Parameter">
                                        {typeData?.map((item) => (
                                            <Option key={'pnc' + item?.key} value={item?.key}>
                                                {item?.value}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Search placeholder="Search" value={filterString?.searchParam} onChange={onChangeHandle} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
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
