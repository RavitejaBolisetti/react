/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { HierarchyFormButton } from 'components/common/Button';
import { financialAccTaxChargeActions } from 'store/actions/data/financialAccounting/taxCharges';
import { documentDescriptionDataActions } from 'store/actions/data/financialAccounting/documentDescription';
import { financialAccountHeadDataActions } from 'store/actions/data/financialAccounting/financialAccountHead';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';

import { showGlobalNotification } from 'store/actions/notification';

import { AddEditForm } from './AddEditForm';
import { ViewTaxCharges } from './ViewTaxCharges';
import LeftPanel from 'components/common/LeftPanel';

import { LANGUAGE_EN } from 'language/en';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { HIERARCHY_ATTRIBUTES } from 'constants/modules/hierarchyAttributes';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const { Search } = Input;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
            FinancialAccounting: {
                FinancialAccountHead: { isLoaded: isFinancialAccountHeadLoaded = false, data: financialAccount = [] },
                DocumentDescription: { isLoaded: isDocumentDescriptionLoaded = false, data: documentDescription = [] },
                TaxCharges: { isLoaded: isTaxChargeLoaded = false, data: taxChargeData = [] },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Tax & Charges Detail';
    const viewTitle = 'Tax & Charges Details';

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
        isFinancialAccountHeadLoaded,
        financialAccount,
        isDocumentDescriptionLoaded,
        documentDescription,
        taxChargeData,
        isDataAttributeLoaded,
        viewTitle,
        isTaxChargeLoaded,
        attributeData,
        typeData,
        unFilteredAttributeData: attributeData?.filter((i) => i?.status),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,

            fetchList: financialAccTaxChargeActions.fetchList,
            saveData: financialAccTaxChargeActions.saveData,
            listShowLoading: financialAccTaxChargeActions.listShowLoading,

            fetchFinancialAccountHead: financialAccountHeadDataActions.fetchList,
            listShowLoadingFinancialAccountHead: financialAccountHeadDataActions.listShowLoading,

            fetchDocumentDescription: documentDescriptionDataActions.fetchList,
            listShowLoadingDocumentDescription: documentDescriptionDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const TaxChargesMain = ({
    typeData,
    moduleTitle,
    isChangeHistoryVisible,
    fetchDocumentDescription,
    documentDescription,
    isDocumentDescriptionLoaded,
    fetchFinancialAccountHead,
    isFinancialAccountHeadLoaded,
    financialAccount,
    fetchChangeHistoryList,
    viewTitle,
    userId,
    changeHistoryModelOpen,
    isDataLoaded,
    fetchList,
    hierarchyAttributeFetchList,
    saveData,
    listShowLoading,
    isDataAttributeLoaded,
    attributeData,
    hierarchyAttributeListShowLoading,
    taxChargeData,
    showGlobalNotification,
    unFilteredAttributeData,
    fetchListTaxCharge,
    saveDataTaxCharge,
    listShowLoadingTaxCharge,
    isTaxChargeLoaded,
    listShowLoadingFinancialAccountHead,
    listShowLoadingDocumentDescription,
}) => {
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [calType, setCalType] = useState(null);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [attributeType, setAttributeType] = useState();
    const [calculationType, setCalculationType] = useState();

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldNames = { title: 'taxChargesTypeCode', key: 'taxChargesTypeCode', children: 'subChargeTypes' };

    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (!isFinancialAccountHeadLoaded && userId) {
            fetchFinancialAccountHead({ setIsLoading: listShowLoadingFinancialAccountHead, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFinancialAccountHeadLoaded, userId]);

    useEffect(() => {
        if (!isDocumentDescriptionLoaded && userId) {
            fetchDocumentDescription({ setIsLoading: listShowLoadingDocumentDescription, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDocumentDescriptionLoaded, userId]);

    useEffect(() => {
        if (userId) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: HIERARCHY_ATTRIBUTES?.TAX_AND_CHARGES?.KEY });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const finalTaxAndChargesData = taxChargeData?.map((i) => {
        return { ...i, taxAndChargesParentData: attributeData?.find((a) => i.attributeTypeCode === a.hierarchyAttribueId) };
    });

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { [fieldNames?.key]: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node[fieldNames?.children]) {
                generateList(node[fieldNames?.children]);
            }
        }
        return dataList;
    };

    const flatternData = generateList(finalTaxAndChargesData);
    const handleTreeViewClick = (keys) => {
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys?.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys?.[0] === i?.key);
            if (formData) {
                const isChildAllowed = unFilteredAttributeData?.find((attribute) => attribute.hierarchyAttribueCode === formData?.data?.attributeTypeCode)?.isChildAllowed;
                setFormData({ ...formData?.data, isChildAllowed });

                setAttributeType(formData?.data?.attributeTypeCode);
                setCalculationType(formData?.data?.calculationType);

                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: isChildAllowed, siblingBtn: true });

                const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute?.hierarchyAttribueCode === formData?.data?.attributeTypeCode)?.hierarchyAttribueName;
                const attributeParentName = flatternData.find((i) => formData?.data?.parentCode === i.key)?.data?.taxChargesTypeCode;
                setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: attributeParentName });
            } else {
                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            }
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        if (value === selectedTreeKey[0]) {
            return showGlobalNotification({ notificationType: 'warning', title: sameParentAndChildWarning?.TITLE, message: sameParentAndChildWarning?.MESSAGE, placement: 'bottomRight' });
        }
        setSelectedTreeSelectKey(value);
        setFormBtnActive(true);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, parentCode: codeToBeSaved };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                setAttributeType(res?.data?.attributeTypeCode);
                setCalculationType(res?.data?.calculationType);

                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });

                fetchList({ setIsLoading: listShowLoading, userId });

                const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute.hierarchyAttribueCode === res?.data?.attributeTypeCode)?.hierarchyAttribueName;
                const attributeParentName = flatternData.find((i) => res?.data?.parentCode === i.key)?.data?.taxChargesTypeCode;
                res?.data && setSelectedTreeData({ ...res?.data, hierarchyAttribueName, parentName: attributeParentName });

                setSelectedTreeKey([res?.data?.id || res?.data?.taxChargesTypeCode]);
                setFormActionType(FROM_ACTION_TYPE.VIEW);
                setFormBtnActive(false);
                setIsFormVisible(false);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formData?.attributeTypeCode ? 'put' : 'post',
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

    const handleResetBtn = () => {
        form.resetFields();
    };
    const handleAdd = () => {
        setFormBtnActive(false);
        setIsFormVisible(true);
    };

    const handleButtonClick = (type) => {
        setFormData([]);
        form.resetFields();
        if (type === FROM_ACTION_TYPE.EDIT) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
        }
        setIsFormVisible(true);
        setFormBtnActive(false);
        setFormActionType(type);
    };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: taxChargeData,
        searchValue,
        setSearchValue,
    };
    const formProps = {
        typeData,
        setSelectedTreeKey,
        flatternData,
        formActionType,
        isVisible: isFormVisible,
        onFinishFailed,
        onCloseAction: () => {
            setIsFormVisible(false);
            setAttributeType();
            setCalculationType();
        },
        titleOverride: (formData?.taxChargesTypeCode ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        selectedTreeKey,
        selectedTreeData,
        unFilteredAttributeData,
        selectedTreeSelectKey,
        handleResetBtn,
        formData,
        taxChargeData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        attributeData,
        fieldNames,
        setSelectedTreeSelectKey,
        isFormBtnActive,
        setFormBtnActive,
        attributeType,
        setAttributeType,
        calculationType,
        setCalculationType,
        financialAccount,
        documentDescription,
        calType,
        setCalType,
    };

    const viewProps = {
        typeData,
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
        calType,
        attributeType,
        calculationType,
        setCalType,
        documentDescription,
        financialAccount,
    };

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const leftCol = taxChargeData?.length > 0 ? 14 : 24;
    const rightCol = taxChargeData?.length > 0 ? 10 : 24;
    const title = 'Tax & Charges';
    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form onKeyPress={onKeyPressHandler} autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item label={title} name="code" validateTrigger={['onSearch']}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <Search placeholder="Search" allowClear onChange={onChange} />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    {taxChargeData?.length <= 0 ? (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        {noDataTitle} <br /> {noDataMessage}
                                    </span>
                                }
                            >
                                <Button icon={<PlusOutlined />} type="primary" danger onClick={handleAdd}>
                                    Add
                                </Button>
                            </Empty>
                        </div>
                    ) : (
                        <LeftPanel {...myProps} />
                    )}
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                    {selectedTreeData && selectedTreeData?.taxChargesTypeCode ? (
                        <>
                            <ViewTaxCharges {...viewProps} />
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
                                        Please select Tax and Charges from left <br />
                                        side hierarchy to view “Details”
                                    </span>
                                }
                            ></Empty>
                        </div>
                    )}
                </Col>
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const TaxChargesMaster = connect(mapStateToProps, mapDispatchToProps)(TaxChargesMain);
