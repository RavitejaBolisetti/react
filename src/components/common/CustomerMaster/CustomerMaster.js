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
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            SupportingDocument: { isLoaded: isSupportingDocumentDataLoaded = false, isSupportingDocumentLoading, data: supportingData },
            CustomerMaster: {
                CustomerDetailsIndividual: { detailData: historyData = [], isChangeHistoryLoaded, isChangeHistoryLoading, changeHistoryData, isLoading: isIndividualLoading = false },
            },
        },
        customer: {
            customerDetail: { isLoaded: isDataLoaded = false, isLoading, data, filter: filterString },
        },
    } = state;

    const moduleTitle = translateContent('customerMaster.heading.title');

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

        isIndividualLoading,
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
    const [defaultSection, setDefaultSection] = useState(1);
    const [currentSection, setCurrentSection] = useState(1);
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
    const [isUnsavedDataPopup, setIsUnsavedDataPopup] = useState(false);
    const [nextCurentSection, setNextCurrentSection] = useState('');

    const defaultBtnVisiblity = { nextBtn: false, editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false, changeHistory: true };
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
        if (typeData && typeData?.length) {
            searchForm?.setFieldValue('searchType', 'customerName');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData]);

    useEffect(() => {
        if (customerType) {
            setFilterString({ ...filterString, customerType, current: 1 });
            const defaultSection = customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION.CUSTOMER_DETAILS.id : CUSTOMER_CORPORATE_SECTION.CUSTOMER_DETAILS.id;
            setSetionName(customerType === CUSTOMER_TYPE?.INDIVIDUAL.id ? CUSTOMER_INDIVIDUAL_SECTION : CUSTOMER_CORPORATE_SECTION);
            setDefaultSection(defaultSection);
            setSection(defaultSection);
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

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true, isNextBtnClick = false }) => {
        buttonAction !== NEXT_ACTION && form.resetFields();

        switch (buttonAction) {
            case ADD_ACTION:
                // setFilterString({});
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
                if (buttonData?.formBtnActive && isNextBtnClick) {
                    setIsUnsavedDataPopup(true);
                    setNextCurrentSection(nextSection?.id);
                } else {
                    section && setCurrentSection(nextSection?.id);
                    setLastSection(!nextSection?.id);
                }

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
        } else {
            setButtonData((prev) => ({ ...prev, nextBtn: isLastSection || (currentSection === 1 && buttonAction !== NEXT_ACTION) ? false : true }));
        }
        setIsFormVisible(true);
    };

    // const onFinish = (values, e) => {};

    const onFinishFailed = (errorInfo) => {
        console.error(errorInfo);
        // form.validateFields().then((values) => {});
    };

    const handleOkUnsavedModal = () => {
        if (nextCurentSection) {
            setIsUnsavedDataPopup(false);
            setCurrentSection(nextCurentSection);
            section && setLastSection(!nextCurentSection);
            setButtonData({ ...buttonData, formBtnActive: false });
            setNextCurrentSection('');
        } else {
            onCloseAction();
        }
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page: filterString,
        isLoading: isLoading,
        tableData: data,
        tableColumn: tableColumn(handleButtonClick),
        setPage: setFilterString,
        filterString,
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
        setIsUnsavedDataPopup(false);

        setIsFormVisible(false);
        setFormActionType(defaultFormActionType);
        setButtonData(defaultBtnVisiblity);
        setSelectedCustomer();
        setProfileCardLoading();
        setSelectedCustomerId();
        setShouldResetForm(true);
    };

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
        optionType: typeData?.length && typeData,
        handleChange,
        allowClear: false,
    };

    const changeHistoryProps = {
        isVisible: ChangeHistoryVisible,
        onCloseAction: () => {
            setChangeHistoryVisible(false);
        },
        titleOverride: translateContent('customerMaster.drawerTitle.cusChange'),
        setIsFormVisible,
        buttonData,
        selectedCustomerId,
        ChangeHistoryTitle,
        customerType,
    };

    const nameChangeHistoryProps = {
        isVisible: showNameChangeHistory,
        titleOverride: translateContent('customerMaster.drawerTitle.nameChange'),
        onCloseAction: () => {
            setShowNameChangeHistory(false);
        },
        selectedCustomerId,
        customerType,
        downloadFileFromButton,
        changeHistoryData,
    };

    const onCloseDrawer = () => {
        if (buttonData?.formBtnActive) {
            setIsUnsavedDataPopup(true);
        } else {
            onCloseAction();
        }
    };

    const containerProps = {
        record: selectedCustomer,
        form,
        formActionType,
        setFormActionType,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction: !isLoading && onCloseDrawer,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        tableData: data,
        customerType,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        setFilterString,

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
        saveButtonName: !selectedCustomerId ? translateContent('customerMaster.button.customerID') : isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.saveAndNext'),
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
        setIsUnsavedDataPopup,
        setNextCurrentSection,
        showSpinner: !formActionType?.viewMode,
    };

    const showAddButton = false;

    const handleCancelUnsaveDataModal = () => {
        setIsUnsavedDataPopup(false);
        setNextCurrentSection('');
    };

    const unsavedDataModalProps = {
        isVisible: isUnsavedDataPopup,
        titleOverride: translateContent('global.generalNotifications.unsaveDataWarning.title'),
        closable: false,
        onCloseAction: handleCancelUnsaveDataModal,
        onSubmitAction: handleOkUnsavedModal,
        submitText: 'Leave',
        showField: false,
        text: translateContent('global.generalNotifications.unsaveDataWarning.message'),
    };

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
                                            <div className={styles.advanceFilterTitle}>{translateContent('global.advanceFilter.appliedAdvanceFilter')}</div>
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
                                                {translateContent('global.buttons.clear')}
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
                                        {translateContent('customerMaster.label.noRecordFound')}
                                        {/* <br /> {translateContent('customerMaster.label.please')}
                                        <b> {translateContent('customerMaster.label.addCus')} </b>
                                        {translateContent('customerMaster.label.usingBelow')} <br />
                                        {translateContent('customerMaster.label.button')} */}
                                    </>
                                }
                            >
                                {showAddButton && !data?.length && (
                                    <Button icon={<PlusOutlined />} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                                        {translateContent('global.buttons.add')}
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
            <CustomerChangeHistory {...changeHistoryProps} />
            <CustomerNameChangeHistory {...nameChangeHistoryProps} />
            <ConfirmationModal {...unsavedDataModalProps} />
        </>
    );
};

export const CustomerMaster = connect(mapStateToProps, mapDispatchToProps)(CustomerMasterMain);
