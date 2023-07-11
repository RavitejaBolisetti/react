/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Row, Form, Empty, ConfigProvider } from 'antd';
import { RxCross2 } from 'react-icons/rx';

import { customerDetailDataActions } from 'store/actions/customer/customerDetail';

import { PlusOutlined } from '@ant-design/icons';
import { tableColumn } from './tableColumn';

import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PARAM_MASTER } from 'constants/paramMaster';

import { SearchBox } from 'components/utils/SearchBox';
import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';

import DataTable from 'utils/dataTable/DataTable';
import { CustomerMainConatiner } from './CustomerMainConatiner';
import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
        },
        customer: {
            customerDetail: { isLoaded: isDataLoaded = false, isLoading, data, filter: filterString },
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
        },
        dispatch
    ),
});

const CustomerMasterMain = (props) => {
    const { data, fetchList, userId, isLoading, listShowLoading, moduleTitle, typeData, resetData } = props;
    const { filterString, setFilterString } = props;

    const [customerType, setCustomerType] = useState(CUSTOMER_TYPE?.INDIVIDUAL.id);
    const [selectedCustomer, setSelectedCustomer] = useState();
    const [selectedCustomerId, setSelectedCustomerId] = useState();
    const [shouldResetForm, setShouldResetForm] = useState(false);
    const [refreshCustomerList, setRefreshCustomerList] = useState(false);
    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [profileCardLoading, setProfileCardLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const defaultExtraParam = useMemo(() => {
        return [
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerType]);

    const extraParams = useMemo(() => {
        if (filterString) {
            return [
                ...defaultExtraParam,
                {
                    key: 'searchType',
                    title: 'Type',
                    value: filterString?.searchType,
                    name: typeData?.find((i) => i?.key === filterString?.searchType)?.value,
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
            ];
        } else {
            return defaultExtraParam;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultExtraParam, filterString]);

    const onSuccessAction = (res) => {
        setShowDataLoading(false);
        setRefreshCustomerList(false);
    };

    const onErrorAction = (res) => {
        setShowDataLoading(false);
        setRefreshCustomerList(false);
    };

    useEffect(() => {
        if (data && selectedCustomerId) {
            data && setSelectedCustomer(data?.find((i) => i.customerId === selectedCustomerId));
            setProfileCardLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, selectedCustomerId]);

    useEffect(() => {
        return () => {
            resetData();
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (customerType) {
            const defaultSection = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION.CUSTOMER_DETAILS.id : CUSTOMER_CORPORATE_SECTION.CUSTOMER_DETAILS.id;
            setSetionName(customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION);
            setDefaultSection(defaultSection);
            setSection(defaultSection);
            setFilterString();
            setShowDataLoading(true);
            resetData();
        }
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
        if (userId && customerType && extraParams) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: extraParams || defaultExtraParam, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, customerType, extraParams, refreshCustomerList]);

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
        setProfileCardLoading(false);

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

    // const onChange = (sorter, filters) => {
    //     form.resetFields();
    // };

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
        setProfileCardLoading();
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
        isLastSection,
        saveButtonName: !selectedCustomerId ? 'Create Customer ID' : isLastSection ? 'Submit' : 'Save & Next',
        setIsFormVisible,
        setRefreshCustomerList,
        profileCardLoading,
        setProfileCardLoading,
    };

    const handleCustomerTypeChange = (id) => {
        setCustomerType(id);
        searchForm.resetFields();
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });

            searchForm.resetFields();
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });

            searchForm.resetFields();
        }
    };

    const handleResetFilter = (e) => {
        setFilterString();
        setShowDataLoading(true);
        searchForm.resetFields();
    };

    const handleChange = (e) => {
        if (e.target.value.length > 2) {
            searchForm.validateFields(['code']);
        } else if (e?.target?.value === '') {
            setFilterString();
            searchForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const searchBoxProps = {
        searchForm,
        filterString,
        setFilterString,
        optionType: typeData,
        handleChange,
    };

    const showAddButton = true;

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
                                            <Button type={customerType === item?.id ? 'primary' : 'link'} danger onClick={() => handleCustomerTypeChange(item?.id)}>
                                                {item?.title}
                                            </Button>
                                        );
                                    })}
                                </div>
                                <SearchBox {...searchBoxProps} />
                            </Col>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className={styles.advanceFilterClear}>
                                {/* <Button danger type="primary" icon={<PlusOutlined />} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                    Add
                                </Button> */}
                            </Col>
                        </Row>
                        {filterString && extraParams.find((i) => i.name) && (
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                            <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
                                            {extraParams?.map((filter) => {
                                                return (
                                                    filter?.value &&
                                                    filter?.filter && (
                                                        <div className={styles.advanceFilterItem} key={filter?.key}>
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
                                            <Button className={styles.clearBtn} onClick={() => handleResetFilter()} danger>
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
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.datasearh}>
                    <ConfigProvider
                        renderEmpty={() => (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: '20%',
                                }}
                                description={
                                    <>
                                        No Record Found <br /> Please <b>"Add New Customer"</b> using below <br />
                                        button
                                    </>
                                }
                            >
                                {showAddButton && !data?.length && (
                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                        {`Add`}
                                    </Button>
                                )}
                            </Empty>
                        )}
                    >
                        <DataTable isLoading={showDataLoading} {...tableProps} />
                    </ConfigProvider>
                </Col>
            </Row>
            <CustomerMainConatiner {...containerProps} />
        </>
    );
};

export const CustomerMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerMasterMain);
