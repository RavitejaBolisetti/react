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
import { ATTRIBUTE_TYPE } from 'constants/modules/ChartOfAccount/attributeType';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from 'components/common/Common.module.css';

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

    console.log(state);

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
    const [change, setChange] = useState(false);

    const [formData, setFormData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [viewData, setViewData] = useState(null);
    const [companyCode, setCompanyCode] = useState(null);
    // const [hierarchyData, setHierarchyData] = useState(null);

    const defaultBtnVisiblity = { editBtn: true, childBtn: true, siblingBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [modalOpen, setModalOpen] = useState(false);
    const companyFieldNames = { value: 'companyName', key: 'companyCode' };
    const fieldNames = { title: 'parentAccountDescription', key: 'parentAccountCode', children: 'subGroup' };

    useEffect(() => {
        if (userId && !isDealerCompanyDataLoaded) {
            fetchDealerCompanyLov({ setIsLoading: listShowLoadingDealerCompanyLov, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDealerCompanyDataLoaded]);

    const onSelect = (val) => {
        setCompanyCode(val);
        setViewData(null);
        const extraParams = [
            {
                key: 'companyCode',
                title: 'companyCode',
                value: val,
                name: 'Company Code',
            },
        ];
        fetchChartOfAccountHierarchy({ setIsLoading: listShowLoadingChartOfAccountHierachy, extraParams });
    };

    const extraParams = [
        {
            key: 'accountCode',
            title: 'accountCode',
            value: selectedTreeKey,
            name: 'Account Code',
        },
    ];

    useEffect(() => {
        if (selectedTreeKey?.length > 0) {
            console.log('INSIDE_SHAKA');

            fetchChartOfAccount({ setIsLoading: listShowLoadingChartOfAccount, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTreeKey]);

    useEffect(() => {
        setViewData(chartOfAccountData);
        if (chartOfAccountData?.chartOfAccountData === ATTRIBUTE_TYPE?.[1]?.key) {
            setButtonData({ ...defaultBtnVisiblity, childBtn: true });
        } else if (chartOfAccountData?.chartOfAccountData === ATTRIBUTE_TYPE?.[0]?.key) {
            setButtonData({ ...defaultBtnVisiblity, childBtn: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartOfAccountData]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const handleTreeViewClick = (keys, tree) => {
        console.log('_KEY_', keys);
        form.resetFields();
        setFormData([]);
        setViewData(null);
        let name = tree?.node?.title?.props?.children?.[2];
        setSelectedTreeKey(keys?.[0]);
    };

    const handleAdd = () => {
        setIsFormVisible(true);
        setFormBtnActive(false);
    };

    const onCoaModelOpen = () => {
        exportCoaForm.resetFields();
        setModalOpen(true);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const data = { ...values, id: recordId, parentAccountCode: 'DMS', companyCode: companyCode };

        console.log('TOBE', data);

        const onSuccess = (res) => {
            form.resetFields();

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchChartOfAccount({ setIsLoading: listShowLoadingChartOfAccount, userId, extraParams });
                setFormBtnActive(false);
                setIsFormVisible(false);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'post',
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
        setFormData([]);
        form.resetFields();
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
        // setSelectedTreeKey,
        formActionType,
        isVisible: isFormVisible,
        onFinishFailed,
        onCloseAction,
        titleOverride: (formData?.code ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        isFormBtnActive,
        setFormBtnActive,
        form,
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

    useEffect(() => {
        console.log(chartOfAccountHierarchy, 'chartOfAccountHierarchy');
    }, [chartOfAccountHierarchy]);

    useEffect(() => {
        console.log(chartOfAccountData, 'chartOfAccountData');
    }, [chartOfAccountData]);

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item label={`${title}`} name="code">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                        {customSelectBox({ data: dealerCompanyLovData, placeholder: preparePlaceholderSelect('Attribute Level'), onChange: onSelect, fieldNames: companyFieldNames })}
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

                {chartOfAccountData?.length > 0 ? (
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
