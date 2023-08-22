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
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { HierarchyFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ChangeHistory } from './ChangeHistory';
import LeftPanel from '../LeftPanel';
import TreeSelectField from '../TreeSelectField';
import { FaHistory } from 'react-icons/fa';
import { ViewProductDetail } from './ViewProductDetail';
import { LANGUAGE_EN } from 'language/en';
import { DisableParent } from './ProductHierarchyUtils';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [], changeHistoryVisible, attributeData: productHierarchyAttributeData = [], organizationId = '' },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
            ManufacturerOrgHierarchy: { isLoaded: isDataOrgLoaded = false, data: manufacturerOrgHierarchyData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Product Detail';
    const viewTitle = 'Hierarchy Details';
    let returnValue = {
        isLoading,
        collapsed,
        userId,
        isChangeHistoryVisible: changeHistoryVisible,
        isDataLoaded,
        productHierarchyData,
        manufacturerOrgHierarchyData,
        moduleTitle,
        viewTitle,
        isDataAttributeLoaded,
        isDataOrgLoaded,
        attributeData: attributeData?.filter((item) => item?.status),
        unFilteredAttributeData: attributeData,
        productHierarchyAttributeData,
        organizationId,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: productHierarchyDataActions.fetchList,
            saveData: productHierarchyDataActions.saveData,
            listShowLoading: productHierarchyDataActions.listShowLoading,
            changeHistoryModelOpen: productHierarchyDataActions.changeHistoryModelOpen,
            setSelectedOrganizationId: productHierarchyDataActions.setSelectedOrganizationId,

            cardBtnDisableAction: productHierarchyDataActions.cardBtnDisableAction,
            fetchListHierarchyAttributeName: productHierarchyDataActions.fetchAttributeNameList,
            listAttibuteShowLoading: productHierarchyDataActions.listShowLoading,
            resetData: productHierarchyDataActions.resetData,

            fetchOrgList: manufacturerOrgHierarchyDataActions.fetchList,

            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ProductHierarchyMain = ({ moduleTitle, viewTitle, skulist, skuData, userId, isDataLoaded, productHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, isChangeHistoryVisible, changeHistoryModelOpen, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, showGlobalNotification, unFilteredAttributeData, fetchListHierarchyAttributeName, productHierarchyAttributeData, fetchOrgList, isDataOrgLoaded, manufacturerOrgHierarchyData, organizationId, setSelectedOrganizationId, resetData }) => {
    const [form] = Form.useForm();
    const [isCollapsableView, setCollapsableView] = useState(true);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [skuAttributes, setSKUAttributes] = useState([]);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');
    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isChildAllowed, setIsChildAllowed] = useState(true);
    const [showProductAttribute, setShowProductAttribute] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [disabledEdit, setDisabledEdit] = useState(false);
    const organizationFieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };
    const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };
    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };

    useEffect(() => {
        return () => {
            resetData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Product Hierarchy', onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (!isDataOrgLoaded && userId) {
            fetchOrgList({ setIsLoading: listShowLoading, userId, onCloseAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataOrgLoaded, userId]);

    useEffect(() => {
        if (organizationId && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, onCloseAction, id: organizationId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, organizationId]);

    useEffect(() => {
        manufacturerOrgHierarchyData?.map((i) => DisableParent(i));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manufacturerOrgHierarchyData]);

    useEffect(() => {
        if (userId) {
            fetchListHierarchyAttributeName({ userId, setIsLoading: listShowLoading, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        setCollapsableView(!isChildAllowed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChildAllowed]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { id: key } = node;
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

    const flatternData = generateList(productHierarchyData);

    const handleTreeViewClick = (keys) => {
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys?.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys[0] === i.key);

            if (formData) {
                const isChildAllowed = unFilteredAttributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.isChildAllowed;
                formData && setFormData({ ...formData?.data, isChildAllowed });

                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: isChildAllowed, siblingBtn: true });
                const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.hierarchyAttribueName;
                const prodctShrtName = flatternData.find((i) => formData?.data?.parntProdctId === i.key)?.data?.prodctShrtName;
                setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: prodctShrtName });
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

    const handleAdd = () => {
        setFormBtnActive(false);
        setIsFormVisible(true);
        handleButtonClick(FROM_ACTION_TYPE.SIBLING);
    };

    const handleButtonClick = (type) => {
        setFormData([]);
        form.resetFields();
        if (type === FROM_ACTION_TYPE.EDIT) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
        }
        setIsFormVisible(true);
        setFormActionType(type);
        setFormBtnActive(false);
    };

    const handleAttributeChange = (value) => {
        const selectedAttribute = attributeData?.find((i) => i.id === value);
        selectedAttribute.hierarchyAttribueCode === 'SKU' ? setShowProductAttribute(true) : setShowProductAttribute(false);
        setIsChildAllowed(selectedAttribute?.isChildAllowed);
        selectedAttribute.hierarchyAttribueCode === 'SKU' && form.setFieldValue('adAmHirchyAttrbtMstSk', value);
    };

    const handleResetBtn = () => {
        form.resetFields();
    };

    const treeOrgFieldNames = { ...organizationFieldNames, label: organizationFieldNames?.title, value: organizationFieldNames?.key };

    const treeSelectFieldProps = {
        treeFieldNames: treeOrgFieldNames,
        treeData: manufacturerOrgHierarchyData,
        selectedTreeSelectKey: organizationId,
        defaultParent: false,
        handleSelectTreeClick: (value) => {
            setSelectedTreeKey();
            setSelectedTreeSelectKey();
            setSelectedOrganizationId(value);
            !value && resetData();
        },
        defaultValue: organizationId,
        placeholder: preparePlaceholderSelect('Organization Hierarchy'),
    };


    

    const onFinish = (values) => {
        const recordId = formData?.id?.toString() || '';
        const codeToBeSaved = selectedTreeSelectKey || '';

        const data = { ...values, id: recordId, parntProdctId: codeToBeSaved, otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N', skuAttributes, mfgOrgSk: organizationId };
        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (selectedTreeData?.subProdct?.length > 0 && formActionType === FROM_ACTION_TYPE.EDIT && data?.active === false) {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Not allowed to disabled' });
            } else if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                if (organizationId && userId) {
                    fetchList({ setIsLoading: listShowLoading, userId, onCloseAction, id: organizationId, onErrorAction });

                    const formData = res;

                    const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.hierarchyAttribueName;
                    const prodctShrtName = flatternData.find((i) => formData?.data?.parntProdctId === i.key)?.data?.prodctLongName;
                    formData && setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: prodctShrtName });

                    setSelectedTreeKey([res?.data?.id]);
                    setFormActionType(FROM_ACTION_TYPE.VIEW);
                    setFormBtnActive(false);
                    setIsFormVisible(false);
                }
            }
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => { };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        //selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: productHierarchyData,
        searchValue,
        setSearchValue,
    };

    const formProps = {
        form,
        isChecked,
        setIsChecked,
        setSelectedTreeKey,
        flatternData,
        formActionType,
        selectedTreeKey,
        selectedTreeSelectKey,
        formData,
        productHierarchyData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        attributeData,
        skuData,
        fieldNames,
        setSelectedTreeSelectKey,
        handleAttributeChange,
        isVisible: isFormVisible,
        onCloseAction: () => {
            setIsFormVisible(false);
            setFormBtnActive(false);
        },
        handleResetBtn,
        buttonData,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        skuAttributes,
        setSKUAttributes,
        productHierarchyAttributeData,
        showProductAttribute,
        selectedTreeData,
        setShowProductAttribute,
        showGlobalNotification,
        disabledEdit,
        setDisabledEdit,
    };

    const viewProps = {
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
        skuAttributes,
        setSKUAttributes,
        disabledEdit,
        setDisabledEdit,
    };

    const leftCol = organizationId && productHierarchyData.length > 0 ? 14 : 24;
    const rightCol = organizationId && productHierarchyData.length > 0 ? 10 : 24;

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const title = 'Hierarchy';
    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item label={`${title}`} name="code">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} data-testid="treeSelectField">
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Col>
                                    {organizationId && (
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Search placeholder="Search" allowClear onChange={onChange} />
                                        </Col>
                                    )}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                    {organizationId && (
                        <Col className={styles.buttonHeadingContainer} xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Button type="primary" className={`${styles.changeHistoryModelOpen} ${styles.floatRight}`} onClick={changeHistoryModelOpen}>
                                <FaHistory className={styles.buttonIcon} />
                                Change History
                            </Button>
                        </Col>

                    )}
                </Row>
            </div>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol} className={`${styles.borderBottomCorner} ${styles.productHierarchy} ${styles.marT20}`}>
                    {/* <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                <Form autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                    <Form.Item label={`${title}`} name="code" >
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} data-testid="code">
                                                <TreeSelectField {...treeSelectFieldProps} />
                                            </Col>
                                            {organizationId && (
                                                <Col xs={24} sm={24} md={12} lg={12} xl={12} name="search" data-testid="search">
                                                    <Search placeholder="Search"  allowClear onChange={onChange} className={styles.headerSearchField} />
                                                </Col>
                                            )}
                                        </Row>
                                    </Form.Item>
                                </Form>
                            </Col>
                            {organizationId && (
                                <Col className={styles.buttonHeadingContainer} xs={24} sm={24} md={6} lg={6} xl={6} data-testid="change-history">
                                    <Button data-testid="button" type="primary" className={`${styles.changeHistoryModelOpen} ${styles.floatRight}`} onClick={changeHistoryModelOpen}>
                                        <FaHistory className={styles.buttonIcon} />
                                        Change History
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div> */}
                    <div className={styles.content}>
                        {productHierarchyData.length <= 0 ? (
                            <div className={styles.emptyContainer}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={
                                        organizationId && !productHierarchyData?.hierarchyAttribute?.length ? (
                                            <span className={styles.descriptionText}>
                                                {noDataTitle} <br /> {noDataMessage}
                                            </span>
                                        ) : !organizationId ? (
                                            <span className={styles.descriptionText} >Please select hierarchy type to view records.</span>
                                        ) : (
                                            <span className={styles.descriptionText}> No records found.</span>
                                        )
                                    }
                                >
                                    {organizationId && (
                                        <div>
                                            <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" onClick={handleAdd}>
                                                Add
                                            </Button>
                                        </div>
                                    )}
                                </Empty>
                            </div>
                        ) : (
                            <LeftPanel {...myProps} />
                        )}
                    </div>
                </Col>

                {productHierarchyData.length > 0 && (
                    <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.pad0}>
                        {isCollapsableView ? <></> : null}

                        {selectedTreeData && selectedTreeData?.id ? (
                            <>
                                <ViewProductDetail {...viewProps} />
                                <div className={styles.hyrbuttonContainer}>
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
                                            Please select product from left <br />
                                            side hierarchy to view “Hierarchy Details”
                                        </span>
                                    }
                                ></Empty>
                            </div>
                        )}
                    </Col>
                )}
            </Row>
            <ChangeHistory />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyMain);
