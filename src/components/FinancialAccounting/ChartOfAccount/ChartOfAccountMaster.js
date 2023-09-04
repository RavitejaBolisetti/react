/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Row, Input, Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ExportCOA } from './ExportCOA';
import { HierarchyFormButton } from 'components/common/Button';
import { customSelectBox } from 'utils/customSelectBox';
import { dealerCompanyDataActions } from 'store/actions/data/dealer/dealerCompany';
import { chartOfAccountDataHierarchyActions } from 'store/actions/data/financialAccounting/chartOfAccount/chartOfAccountHierarchy';
import { chartOfAccountDataActions } from 'store/actions/data/financialAccounting/chartOfAccount/chartOfAccount';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { ViewDetails } from './ViewDetails';
import LeftPanel from 'components/common/LeftPanel';
import { COA_ACCOUNT_TYPE } from 'constants/modules/ChartOfAccount/coaAccountType';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            DealerHierarchy: {
                DealerCompany: { isLoaded: isDealerCompanyDataLoaded = false, data: dealerCompanyLovData = [] },
            },
            FinancialAccounting: {
                ChartOfAccountMaster: {
                    ChartOfAccountHierarchy: { isLoaded: isChartOfAccountHierarchyLoaded = false, data: chartOfAccountHierarchy = [] },
                    ChartOfAccount: { isLoaded: isChartOfAccountLoaded = false, data: chartOfAccountData = [] },
                },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Chart of Account Hierarchy';
    const viewTitle = 'Chart of Account Hierarchy';

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
        viewTitle,
        isDealerCompanyDataLoaded,
        dealerCompanyLovData,
        isChartOfAccountHierarchyLoaded,
        chartOfAccountHierarchy,
        isChartOfAccountLoaded,
        chartOfAccountData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchDealerCompanyLov: dealerCompanyDataActions.fetchList,
            listShowLoadingDealerCompanyLov: dealerCompanyDataActions.listShowLoading,

            fetchChartOfAccountHierarchy: chartOfAccountDataHierarchyActions.fetchList,
            listShowLoadingChartOfAccountHierachy: chartOfAccountDataHierarchyActions.listShowLoading,

            fetchChartOfAccount: chartOfAccountDataActions.fetchList,
            listShowLoadingChartOfAccount: chartOfAccountDataActions.listShowLoading,
            saveData: chartOfAccountDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ChartOfAccountMain = ({ typeData, moduleTitle, viewTitle, userId, saveData, showGlobalNotification, fetchDealerCompanyLov, listShowLoadingDealerCompanyLov, dealerCompanyLovData, fetchChartOfAccountHierarchy, isDealerCompanyDataLoaded, listShowLoadingChartOfAccountHierachy, chartOfAccountHierarchy, isChartOfAccountLoaded, chartOfAccountData, listShowLoadingChartOfAccount, fetchChartOfAccount }) => {
    const [form] = Form.useForm();
    const [exportCoaForm] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState(null);
    const [formActionType, setFormActionType] = useState('');

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [viewData, setViewData] = useState(null);
    const [companyCode, setCompanyCode] = useState(null);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState(null);
    const [change, setChange] = useState(false);
    const [disable, setDisable] = useState(true);
    const [recordId, setRecordId] = useState('');
    const [accountTyp, setAccountTyp] = useState(null);
    const [childAdd, isChildAdd] = useState(false);
    const [updatedChartOfAccountData, setUpdatedChartOfAccountData] = useState(null);

    const defaultBtnVisiblity = { editBtn: true, childBtn: true, siblingBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [modalOpen, setModalOpen] = useState(false);
    const companyFieldNames = { value: 'companyName', key: 'companyCode' };
    const fieldNames = { title: 'accountDescription', key: 'accountCode', children: 'subGroup' };

    useEffect(() => {
        if (userId && !isDealerCompanyDataLoaded) {
            fetchDealerCompanyLov({ setIsLoading: listShowLoadingDealerCompanyLov, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDealerCompanyDataLoaded]);

    const onSelect = (val) => {
        setCompanyCode(val);
        setViewData(null);
        setSelectedTreeKey(null);
        const extraParams = [
            {
                key: 'companyCode',
                value: val,
            },
        ];
        fetchChartOfAccountHierarchy({ setIsLoading: listShowLoadingChartOfAccountHierachy, extraParams });
    };

    const extraParams = [
        {
            key: 'accountCode',
            value: selectedTreeKey,
        },
    ];

    useEffect(() => {
        if (selectedTreeKey?.length > 0) {
            fetchChartOfAccount({ setIsLoading: listShowLoadingChartOfAccount, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTreeKey]);

    useEffect(() => {
        setViewData(chartOfAccountData);
        if (chartOfAccountData?.accountType === COA_ACCOUNT_TYPE?.LEDGER_ACCOUNT?.key) {
            setButtonData({ ...defaultBtnVisiblity, childBtn: false });
        } else if (chartOfAccountData?.accountType === COA_ACCOUNT_TYPE?.GROUP_ACCOUNT?.key) {
            setButtonData({ ...defaultBtnVisiblity, childBtn: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartOfAccountData]);

    useEffect(() => {
        if (formActionType === FROM_ACTION_TYPE?.CHILD) {
            form.resetFields();
            setRecordId('');
            setDisable(true);
            setSelectedTreeSelectKey(chartOfAccountData?.accountDescription);
            setAccountTyp(null);
            isChildAdd(true);
            form.setFieldValue('parentAccountCode', chartOfAccountData?.accountCode);
        } else if (formActionType === FROM_ACTION_TYPE?.SIBLING) {
            form.resetFields();
            setRecordId('');
            setDisable(true);
            setSelectedTreeSelectKey(chartOfAccountData?.parentAccountDescription);
            setAccountTyp(null);
            if (chartOfAccountData?.parentAccountCode === '') {
                isChildAdd(false);
            } else {
                isChildAdd(true);
            }
            form.setFieldValue('parentAccountCode', chartOfAccountData?.parentAccountCode);
        } else if (formActionType === FROM_ACTION_TYPE?.EDIT) {
            form.resetFields();
            setRecordId(chartOfAccountData?.id);
            setDisable(false);
            setSelectedTreeSelectKey(chartOfAccountData?.parentAccountDescription);
            setAccountTyp(chartOfAccountData?.accountType);
            form.setFieldsValue({
                accountType: chartOfAccountData?.accountType,
                parentAccountCode: chartOfAccountData?.parentAccountCode,
                accountCode: chartOfAccountData?.accountCode,
                accountDescription: chartOfAccountData?.accountDescription,
                openingBalanceCredit: chartOfAccountData?.accountType === COA_ACCOUNT_TYPE?.LEDGER_ACCOUNT?.key ? chartOfAccountData?.openingBalanceCredit : null,
                openingBalanceDebit: chartOfAccountData?.accountType === COA_ACCOUNT_TYPE?.LEDGER_ACCOUNT?.key ? chartOfAccountData?.openingBalanceDebit : null,
                status: chartOfAccountData?.status,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, change]);

    useEffect(() => {
        setUpdatedChartOfAccountData(
            chartOfAccountHierarchy?.map((i) => ({
                ...i,
                disabled: i?.accountType === COA_ACCOUNT_TYPE?.LEDGER_ACCOUNT?.key,
            }))
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartOfAccountHierarchy]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const handleTreeViewClick = (keys, tree) => {
        form.resetFields();
        setViewData(null);
        setSelectedTreeKey(keys);
    };

    const handleAdd = () => {
        form.resetFields();
        setSelectedTreeSelectKey(null);
        setIsFormVisible(true);
        setFormBtnActive(false);
    };

    const onCoaModelOpen = () => {
        exportCoaForm.resetFields();
        setModalOpen(true);
    };

    const onFinish = (values) => {
        const parentCode = values?.parentAccountCode ? values?.parentAccountCode : '';
        const data = { ...values, id: recordId, companyCode: companyCode, parentAccountCode: parentCode, addChild: childAdd };

        const onSuccess = (res) => {
            form.resetFields();

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchChartOfAccountHierarchy({ setIsLoading: listShowLoadingChartOfAccountHierachy, extraParams: [{ key: 'companyCode', value: companyCode }], userId });
                setFormBtnActive(false);
                setIsFormVisible(false);
                setSelectedTreeKey([res?.data?.accountCode]);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType === FROM_ACTION_TYPE?.EDIT ? 'put' : 'post',
            setIsLoading: listShowLoadingChartOfAccount,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const onCoaFinish = () => {
        exportCoaForm
            .validateFields()
            .then(() => {
                //let data = exportCoaForm.getFieldsValue();
                setModalOpen(false);
            })
            .catch((error) => console.log(error));
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleButtonClick = (type) => {
        form.resetFields();
        setFormActionType(type);
        setIsFormVisible(true);
        setFormBtnActive(false);
        setChange(() => !change);
    };

    const onCloseAction = () => {
        setIsFormVisible(false);
        form.resetFields();
    };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        fieldNames,
        handleTreeViewClick,
        treeData: chartOfAccountHierarchy,
        searchValue,
        setSearchValue,
    };

    const formProps = {
        typeData,
        setSelectedTreeKey,
        formActionType,
        isVisible: isFormVisible,
        onFinishFailed,
        onCloseAction,
        titleOverride: (formActionType === FROM_ACTION_TYPE?.EDIT ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        isFormBtnActive,
        setFormBtnActive,
        form,
        chartOfAccountHierarchy: updatedChartOfAccountData,
        selectedTreeSelectKey,
        disable,
        setSelectedTreeSelectKey,
        accountTyp,
        setAccountTyp,
        isChildAdd,
    };

    const viewProps = {
        typeData,
        buttonData,
        viewData,
        handleButtonClick,
        styles,
        viewTitle,
    };

    const modalProps = {
        modalOpen,
        setModalOpen,
        exportCoaForm,
        onCoaFinish,
        onFinishFailed,
    };

    const noDataTitle = 'Please choose Financial Company to view data';
    const diffSelection = 'No Record Found';

    const leftCol = chartOfAccountHierarchy?.length > 0 ? 14 : 24;
    const rightCol = chartOfAccountHierarchy?.length > 0 ? 10 : 24;
    const title = 'Financial Company';

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item label={`${title}`} name="code">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                        {customSelectBox({ data: dealerCompanyLovData, placeholder: preparePlaceholderSelect('Financial Company'), onChange: onSelect, fieldNames: companyFieldNames })}
                                    </Col>
                                    {companyCode && chartOfAccountHierarchy?.length > 0 && (
                                        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                            <Search placeholder="Search" allowClear onChange={onChange} className={`${styles.headerSearchField} ${styles.headerSearchInput}`} />
                                        </Col>
                                    )}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.buttonsGroupRight}>
                        <Button type="primary" className={styles.verticallyCentered} onClick={onCoaModelOpen}>
                            Export COA
                        </Button>
                    </Col>

                    <ExportCOA {...modalProps} />
                </Row>
            </div>

            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    {chartOfAccountHierarchy?.length <= 0 ? (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        {companyCode && chartOfAccountHierarchy?.length <= 0 ? (
                                            <>
                                                {diffSelection} {'Please add new '} <br />
                                                {'"Chart of Account" details using below button'}
                                            </>
                                        ) : (
                                            noDataTitle
                                        )}
                                    </span>
                                }
                            >
                                {companyCode && chartOfAccountHierarchy?.length <= 0 && (
                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add
                                    </Button>
                                )}
                            </Empty>
                        </div>
                    ) : (
                        <LeftPanel {...myProps} />
                    )}
                </Col>

                {chartOfAccountHierarchy?.length > 0 ? (
                    <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                        {selectedTreeKey?.length > 0 ? (
                            <>
                                <ViewDetails {...viewProps} />
                                <div className={styles.viewContainerFooter}>
                                    <HierarchyFormButton {...viewProps} />
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyContainer}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        <span>
                                            Please select Chart of Account from left side
                                            <br />
                                            hierarchy menu to view “Chart of Account Details”
                                        </span>
                                    }
                                />
                            </div>
                        )}
                    </Col>
                ) : null}
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const ChartOfAccountMaster = connect(mapStateToProps, mapDispatchToProps)(ChartOfAccountMain);
