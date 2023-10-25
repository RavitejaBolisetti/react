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
import { BASE_URL_CUSTOMER_MASTER_NAME_CHANGE_HISTORY as customURL } from 'constants/routingApi';

import { PlusOutlined } from '@ant-design/icons';
import { tableColumn } from './tableColumn';

import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PARAM_MASTER } from 'constants/paramMaster';

import { SearchBox } from 'components/utils/SearchBox';
import { CUSTOMER_INDIVIDUAL_SECTION } from 'constants/CustomerIndividualSection';
import { CUSTOMER_CORPORATE_SECTION } from 'constants/CustomerCorporateSection';
import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

import { CustomerChangeHistory } from './CustomerChangeHistory';
import { CustomerNameChangeHistory } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerNameChange';
import DataTable from 'utils/dataTable/DataTable';
import { CustomerMainConatiner } from './CustomerMainConatiner';
import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isSupportingDocumentDataLoaded = false, isSupportingDocumentLoading, data: supportingData },
            CustomerMaster: {
                CustomerDetailsIndividual: { detailData: historyData = [], isChangeHistoryLoaded, isChangeHistoryLoading, changeHistoryData },
            },
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
        totalRecords: data?.totalRecords || [],
        isLoading,
        historyData,
        moduleTitle,
        typeData: typeData && typeData[PARAM_MASTER.CUST_MST.id],
        filterString,
        isChangeHistoryLoaded,
        isChangeHistoryLoading,
        changeHistoryData,
        isSupportingDocumentDataLoaded,
        isSupportingDocumentLoading,
        supportingData,
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
            resetViewData: documentViewDataActions.reset,

            fetchCustomerChangeHistory: customerDetailsIndividualDataActions.changeHistory,
            listShowChangeHistoryLoading: customerDetailsIndividualDataActions.listShowChangeHistoryLoading,
            listDownloadShowLoading: supportingDocumentDataActions.listShowLoading,

            downloadFile: supportingDocumentDataActions.downloadFile,
            viewListShowLoading: documentViewDataActions.listShowLoading,
        },
        dispatch
    ),
});

const CustomerMasterMain = (props) => {
    const { data, fetchList, userId, isLoading, listShowLoading, changeHistoryData, fetchCustomerChangeHistory, listShowChangeHistoryLoading, moduleTitle, typeData, resetData, totalRecords } = props;
    const { filterString, setFilterString, ChangeHistoryTitle } = props;
    const { resetViewData, downloadFile, listDownloadShowLoading } = props;

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
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [profileCardLoading, setProfileCardLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [ChangeHistoryVisible, setChangeHistoryVisible] = useState(false);
    const [showNameChangeHistory, setShowNameChangeHistory] = useState(false);
    const [previousSection, setPreviousSection] = useState(1);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false, changeHistory: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const dynamicPagination = true;

    useEffect(() => {
        setFilterString({ current: 1, customerType: CUSTOMER_TYPE?.INDIVIDUAL.id, pageSize: 10 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    useEffect(() => {
        if (selectedCustomerId && defaultExtraParam) {
            const extraParams = [
                ...defaultExtraParam,
                {
                    key: 'customerId',
                    title: 'customerId',
                    value: selectedCustomerId,
                    name: 'Customer Id',
                },
            ];
            fetchCustomerChangeHistory({ customURL, setIsLoading: listShowChangeHistoryLoading, userId, extraParams: extraParams || defaultExtraParam });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCustomerId, defaultExtraParam]);

    const onSuccessAction = (res) => {
        setShowDataLoading(false);
        setRefreshCustomerList(false);
        // setFilterString();
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
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (customerType) {
            // setFilterString({ current: 1 });
            setFilterString({ ...filterString, customerType });
            const defaultSection = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION.CUSTOMER_DETAILS.id : CUSTOMER_CORPORATE_SECTION.CUSTOMER_DETAILS.id;
            setSetionName(customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION);
            setDefaultSection(defaultSection);
            setSection(defaultSection);
            // setShowDataLoading(false);
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
        if (userId && extraParams) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams: refreshCustomerList ? defaultExtraParam : extraParams || defaultExtraParam, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams, refreshCustomerList]);

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();

        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
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

            setButtonData(btnVisiblity({ defaultBtnVisiblity: { ...defaultBtnVisiblity, changeHistory: buttonAction !== ADD_ACTION }, buttonAction }));
        }
        setIsFormVisible(true);
    };

    const setPage = (page) => {
        setFilterString({ ...filterString, ...page });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        filterString,
        isLoading: isLoading,
        tableData: data,
        tableColumn: tableColumn(handleButtonClick),
        setPage,
    };

    // const onChange = (sorter, filters) => {
    //     form.resetFields();
    // };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleChangeHistory = () => {
        setChangeHistoryVisible(true);
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

    const handleCustomerTypeChange = (id) => {
        setCustomerType(id);
        setFilterString({ current: 1, customerType: id, pageSize: 10 });
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
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ pageSize: 10, current: 1, customerType: customerType });
        setShowDataLoading(true);
        searchForm.resetFields();
    };

    const downloadFileFromButton = () => {
        const extraParams = [
            {
                key: 'docId',
                title: 'docId',
                value: changeHistoryData?.customerNameChangeResponses[0].supportingDocuments[0].documentId,
                name: 'docId',
            },
        ];
        const supportingDocument = changeHistoryData?.customerNameChangeResponses[0].supportingDocuments[0].documentName;
        downloadFile({ setIsLoading: listDownloadShowLoading, userId, extraParams, supportingDocument, onSuccessAction });
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
        defaultOption: 'customerName',
        handleChange,
        allowClear: false,
    };

    const changeHistoryProps = {
        isVisible: ChangeHistoryVisible,
        onCloseAction: () => {
            setChangeHistoryVisible(false);
        },
        titleOverride: 'Customer Change History',
        setIsFormVisible,
        buttonData,
        selectedCustomerId,
        ChangeHistoryTitle,
        customerType,
    };

    const nameChangeHistoryProps = {
        isVisible: showNameChangeHistory,
        titleOverride: 'Name Change History',
        onCloseAction: () => {
            setShowNameChangeHistory(false);
        },
        selectedCustomerId,
        customerType,
        downloadFileFromButton,
        changeHistoryData,
    };

    const containerProps = {
        record: selectedCustomer,
        form,
        formActionType,
        setFormActionType,
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
        resetViewData,
        handleChangeHistory,
        handleResetFilter,
        setShowNameChangeHistory,
        setPreviousSection,
        previousSection,
    };

    const showAddButton = true;
    // const unsavedDataModalProps = {
    //     isVisible: isUnsavedDataPopup,
    //     titleOverride: 'Confirm',
    //     information: 'You have modified this work section. You can discard your changes, or cancel to continue editing.',
    //     handleCloseModal: () => setIsUnsavedDataPopup(false),
    //     onCloseAction: () => setIsUnsavedDataPopup(false),
    //     handleOk,
    //     closable: true,
    //     nextCurentSection,
    //     setNextCurrentSection,
    // };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                                    <Form.Item>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.verticallyCentered}>
                                                <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                                    {Object.values(CUSTOMER_TYPE)?.map((item) => {
                                                        return (
                                                            <Button type={customerType === item?.id ? 'primary' : 'link'} onClick={() => handleCustomerTypeChange(item?.id)}>
                                                                {item?.title}
                                                            </Button>
                                                        );
                                                    })}
                                                </div>
                                                <div className={styles.fullWidth}>
                                                    <SearchBox {...searchBoxProps} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </Col>
                            {/* <Col xs={24} sm={24} md={10} lg={10} xl={10} className={styles.advanceFilterClear}>
                                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                    Add
                                </Button>
                            </Col> */}
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
                                                                    <RxCross2 onClick={() => removeFilter(filter?.key)} data-testid="removeFilter" />
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
                                    <Button icon={<PlusOutlined />} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
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
            {/* <UnsavedDataPopup {...unsavedDataModalProps} /> */}
            <CustomerChangeHistory {...changeHistoryProps} />
            <CustomerNameChangeHistory {...nameChangeHistoryProps} />
        </>
    );
};

export const CustomerMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerMasterMain);
