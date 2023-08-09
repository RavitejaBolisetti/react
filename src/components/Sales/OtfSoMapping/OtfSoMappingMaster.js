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
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { otfSoMappingActions } from 'store/actions/data/otf/otfSoMapping';
import { otfSoUserMappingActions } from 'store/actions/data/otf/otfSoUserMapping';
import TreeSelectField from '../../common/TreeSelectField';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { showGlobalNotification } from 'store/actions/notification';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { AddEditForm } from './AddEditForm';
import { ViewTaxCharges } from './ViewTaxCharges';
import LeftPanel from 'components/common/LeftPanel';

import { LANGUAGE_EN } from 'language/en';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from 'components/common/Common.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
            ManufacturerOrgHierarchy: { isLoaded: isDataOrgLoaded = false, data: manufacturerOrgHierarchyData = [] },
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [], attributeData: productHierarchyAttributeData = [], organizationId = '' },
            OTF: {
                OtfSoMapping: { isLoaded: isDataOtfSoMappingLoaded = false, data: otfSoMappingData = [] },
                OtfSoUserMapping: { isLoaded: isDataOtfSoUserMappingLoaded = false, data: otfSoUserMappingData = [] },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'User Type Mapping';
    const viewTitle = 'User Type Mapping';

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,

        isDataAttributeLoaded,
        viewTitle,
        attributeData,
        typeData,
        unFilteredAttributeData: attributeData?.filter((i) => i?.status),
        isDataOrgLoaded,
        manufacturerOrgHierarchyData,
        isLoading,
        isDataLoaded,
        productHierarchyData,
        productHierarchyAttributeData,
        organizationId,
        otfSoMappingData,
        otfSoUserMappingData,
        isDataOtfSoMappingLoaded,
        isDataOtfSoUserMappingLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOrgList: manufacturerOrgHierarchyDataActions.fetchList,
            listOrgLoading: manufacturerOrgHierarchyDataActions.listShowLoading,

            fetchProductDataList: productHierarchyDataActions.fetchList,
            listProductLoading: productHierarchyDataActions.listShowLoading,
            setSelectedOrganizationId: productHierarchyDataActions.setSelectedOrganizationId,
            resetData: productHierarchyDataActions.resetotfSodata,

            fetchOtfList: otfSoMappingActions.fetchList,
            listOtfSoMappingShowLoading: otfSoMappingActions.listShowLoading,

            fetchOtfUserList: otfSoUserMappingActions.fetchList,
            listOtfSoUserMappingShowLoading: otfSoUserMappingActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfSoMappingMain = ({
    typeData,
    moduleTitle,
    viewTitle,
    userId,
    changeHistoryModelOpen,
    isDataLoaded,
    fetchList,
    saveData,
    listOrgLoading,
    isDataAttributeLoaded,
    attributeData,
    hierarchyAttributeListShowLoading,
    taxChargeData,
    showGlobalNotification,
    unFilteredAttributeData,
    manufacturerOrgHierarchyData,
    fetchOrgList,
    isDataOrgLoaded,
    productHierarchyData,
    setSelectedOrganizationId,
    organizationId,
    fetchProductDataList,
    fetchOtfList,
    listOtfSoMappingShowLoading,
    resetData,
    otfSoMappingData,
    otfSoUserMappingData,
    isDataOtfSoMappingLoaded,
    isDataOtfSoUserMappingLoaded,
    fetchOtfUserList,
    listOtfSoUserMappingShowLoading,
    listProductLoading,
}) => {
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [soMapKey, setSoMapKey] = useState(null);

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const organizationFieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };
    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };

    const onKeyPressHandler = (e) => {
        e.key === 'Enter' && e.preventDefault();
    };

    useEffect(() => {
        if (!isDataOrgLoaded && userId) {
            fetchOrgList({ setIsLoading: listOrgLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataOrgLoaded, userId]);

    useEffect(() => {
        if (organizationId && userId) {
            resetData();
            fetchProductDataList({ setIsLoading: listProductLoading, userId, id: organizationId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, organizationId]);

    useEffect(() => {
        if (organizationId && soMapKey) {
            const extraParams = [
                {
                    key: 'code',
                    title: 'code',
                    value: soMapKey,
                    name: 'code ID',
                },
                {
                    key: 'manufactureOrdId',
                    title: 'manufactureOrdId',
                    value: organizationId,
                    name: 'manufacture OrdId ID',
                },
            ];
            fetchOtfList({ setIsLoading: listOtfSoMappingShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [soMapKey]);

    useEffect(() => {
        if (userId) {
            fetchOtfUserList({ setIsLoading: listOtfSoUserMappingShowLoading, userId });
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
        setSoMapKey(keys);
        console.log(keys, 'hey');

        form.setFieldValue({
            productAttributeCode: keys,
            productAttributeValue: null,
            
        });

        if (keys && keys?.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys?.[0] === i?.key);
            if (formData) {
                const isChildAllowed = unFilteredAttributeData?.find((attribute) => attribute.hierarchyAttribueCode === formData?.data?.attributeTypeCode)?.isChildAllowed;
                setFormData({ ...formData?.data, isChildAllowed });

                // setAttributeType(formData?.data?.attributeTypeCode);
                // setCalculationType(formData?.data?.calculationType);

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
        console.log('VAL', values);
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, parentCode: codeToBeSaved };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                // setAttributeType(res?.data?.attributeTypeCode);
                // setCalculationType(res?.data?.calculationType);

                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });

                // fetchList({ setIsLoading: listShowLoading, userId });

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
            // setIsLoading: listShowLoading,
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

    const treeOrgFieldNames = { ...organizationFieldNames, label: organizationFieldNames?.title, value: organizationFieldNames?.key };

    const treeSelectFieldProps = {
        treeFieldNames: treeOrgFieldNames,
        treeData: manufacturerOrgHierarchyData,
        selectedTreeSelectKey: organizationId,
        defaultParent: false,
        handleSelectTreeClick: (value) => {
            setSelectedTreeKey();
            resetData();
            setSoMapKey(null);
            setSelectedOrganizationId(value);
        },
        defaultValue: organizationId,
        placeholder: preparePlaceholderSelect('Organization Hierarchy'),
    };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: productHierarchyData,
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
        otfSoUserMappingData,
        productHierarchyData,
    };

    const viewProps = {
        typeData,
        buttonData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
    };

    const noDataTitle = 'Please Select Organization from dropdown';
    const diffSelection = 'No Product Found';
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const leftCol = productHierarchyData?.length > 0 ? 14 : 24;
    const rightCol = productHierarchyData?.length > 0 ? 10 : 24;
    const title = 'Hierarchy';

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item label={`${title}`} name="code">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Col>
                                    {/* {organizationId && (
                                        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                            <Search placeholder="Search" allowClear onChange={onChange} className={`${styles.headerSearchField} ${styles.headerSearchInput}`} />
                                        </Col>
                                    )} */}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

            {/* <div className={styles.contentHeaderBackground}>
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
            </div> */}

            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    {productHierarchyData?.length <= 0 ? (
                        <div className={styles.emptyContainer}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                imageStyle={{
                                    height: 60,
                                }}
                                description={
                                    <span>
                                        {organizationId && productHierarchyData?.length <= 0 ? (
                                            <>
                                                {diffSelection} <br /> {noDataTitle}
                                            </>
                                        ) : (
                                            noDataTitle
                                        )}
                                    </span>
                                }
                            />
                        </div>
                    ) : (
                        <LeftPanel {...myProps} />
                    )}
                </Col>

                {productHierarchyData?.length >= 0 ? (
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
                                        otfSoMappingData?.length <= 0 && soMapKey ? (
                                            <span>
                                                No records found <br />
                                                Please add New "So Map Detail" using below button
                                            </span>
                                        ) : (
                                            <span>
                                                Please select from left <br />
                                                side hierarchy to view “Details”
                                            </span>
                                        )
                                    }
                                >
                                    {otfSoMappingData?.length <= 0 && soMapKey ? (
                                        <Button icon={<PlusOutlined />} type="primary" danger onClick={handleAdd}>
                                            Add
                                        </Button>
                                    ) : null}
                                </Empty>
                            </div>
                        )}
                    </Col>
                ) : null}
            </Row>
            <AddEditForm {...formProps} />
        </>
    );
};

export const OtfSoMappingMaster = connect(mapStateToProps, mapDispatchToProps)(OtfSoMappingMain);
