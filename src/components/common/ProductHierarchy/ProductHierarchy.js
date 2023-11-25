/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Empty, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { PRODUCT_HIERARCHY_TYPE } from './ProductHierarchyType';
import LeftPanel from '../LeftPanel';
import TreeSelectField from '../TreeSelectField';
import { ViewProductDetail } from './ViewProductDetail';
import { LANGUAGE_EN } from 'language/en';
import { DisableParent } from './ProductHierarchyUtils';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { PRODUCT_LEVEL } from '../../../constants/modules/UserManagement/productLevel';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [], changeHistoryVisible, attributeData: productHierarchyAttributeData = [], organizationId = '', detailData: productDetail = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
            ManufacturerOrgHierarchy: { isLoaded: isDataOrgLoaded = false, data: manufacturerOrgHierarchyData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('productHierarchy.heading.moduleTitle');
    const viewTitle = translateContent('productHierarchy.heading.hierarchyDetails');
    let returnValue = {
        typeData,
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
        productDetail,
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
            //listShowLoading: productHierarchyDataActions.showLoading,
            changeHistoryModelOpen: productHierarchyDataActions.changeHistoryModelOpen,
            setSelectedOrganizationId: productHierarchyDataActions.setSelectedOrganizationId,
            cardBtnDisableAction: productHierarchyDataActions.cardBtnDisableAction,
            fetchListHierarchyAttributeName: productHierarchyDataActions.fetchAttributeNameList,
            listAttibuteShowLoading: productHierarchyDataActions.listShowLoading,
            resetData: productHierarchyDataActions.resetData,
            fetchProductDetail: productHierarchyDataActions.fetchDetail,
            fetchOrgList: manufacturerOrgHierarchyDataActions.fetchList,
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ProductHierarchyMain = ({ typeData, isLoading, moduleTitle, viewTitle, skuData, userId, productHierarchyData, fetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, showGlobalNotification, productHierarchyAttributeData, fetchOrgList, isDataOrgLoaded, manufacturerOrgHierarchyData, organizationId, setSelectedOrganizationId, resetData, fetchProductDetail, productDetail }) => {
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [skuAttributes, setSKUAttributes] = useState([]);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');
    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [showProductAttribute, setShowProductAttribute] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [disabledEdit, setDisabledEdit] = useState(false);
    const [viewData, setViewData] = useState([]);
    const [selectedOrganization, setSelectedOrganization] = useState();
    const organizationFieldNames = { title: 'manufactureOrgShrtName', key: 'manufactureOrgCode', children: 'subManufactureOrg' };
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
        if (!isDataOrgLoaded && userId) {
            fetchOrgList({ setIsLoading: listShowLoading, userId, onCloseAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataOrgLoaded, userId]);

    useEffect(() => {
        if (organizationId && userId) {
            fetchList({ setIsLoading: listShowLoading, userId, onCloseAction, extraParams: [{ key: 'manufactureOrgCode', value: organizationId }], onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, organizationId]);

    useEffect(() => {
        manufacturerOrgHierarchyData?.map((i) => DisableParent(i));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manufacturerOrgHierarchyData]);

    useEffect(() => {
        if (productDetail?.length > 0) {
            const parentName = flatternData?.find((e) => e?.data?.prodctCode === productDetail?.[0]?.parntProdctCode)?.data?.prodctShrtName;
            setViewData({ ...productDetail[0], parentName: parentName });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productDetail]);

    useEffect(() => {
        if (organizationId) {
            setViewData([]);
            setSelectedOrganization(flatternOrgData?.find((e) => e?.key === organizationId)?.data?.manufactureOrgShrtName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organizationId]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const dataOrgList = [];
    const generateOrgList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { [organizationFieldNames?.key]: key } = node;
            dataOrgList.push({
                key,
                data: node,
            });
            if (node[organizationFieldNames?.children]) {
                generateOrgList(node[organizationFieldNames?.children]);
            }
        }
        return dataOrgList;
    };
    const flatternOrgData = generateOrgList(manufacturerOrgHierarchyData);

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

    const flatternData = generateList(productHierarchyData);

    const handleTreeViewClick = (keys) => {
        const selectedProductData = flatternData?.find((i) => i?.key === keys[0])?.data;
        form.resetFields();
        setFormData([]);
        setViewData([]);

        if (keys && selectedProductData?.attributeType === PRODUCT_HIERARCHY_TYPE?.MODEL?.KEY) {
            const extraParams = [
                {
                    key: 'prodctCode',
                    value: selectedProductData?.prodctCode,
                },
            ];
            fetchProductDetail({ setIsLoading: () => {}, userId, onCloseAction, extraParams, onErrorAction });
        } else {
            setFormData({ ...selectedProductData });
            if (selectedProductData?.attributeType === PRODUCT_LEVEL?.PD.key) {
                setViewData({ ...selectedProductData, parentName: selectedOrganization });
            } else {
                const parentName = selectedProductData && selectedProductData?.parntProdctCode && flatternData?.find((e) => e?.key === selectedProductData?.parntProdctCode)?.data?.prodctShrtName;
                setViewData({ ...selectedProductData, parentName: parentName });
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
        placeholder: preparePlaceholderSelect(translateContent('productHierarchy.placeholder.organizationHierarchy')),
    };

    const onFinish = (values) => {
        const recordId = formData?.id?.toString() || '';
        const codeToBeSaved = selectedTreeSelectKey || '';

        const data = { ...values, id: recordId, parntProdctId: codeToBeSaved, otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N', skuAttributes, mfgOrgSk: organizationId };
        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
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

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        fieldNames,
        handleTreeViewClick,
        treeData: productHierarchyData,
        searchValue,
        setSearchValue,
        isLoading,
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
        isVisible: isFormVisible,
        onCloseAction: () => {
            setIsFormVisible(false);
            setFormBtnActive(false);
        },
        handleResetBtn,
        buttonData,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(" ").concat(moduleTitle),
        onFinish,
        isFormBtnActive,
        setFormBtnActive,
        skuAttributes,
        setSKUAttributes,
        productHierarchyAttributeData,
        showProductAttribute,
        setShowProductAttribute,
        showGlobalNotification,
        disabledEdit,
        setDisabledEdit,
    };

    const viewProps = {
        buttonData,
        attributeData,
        handleButtonClick,
        styles,
        viewTitle,
        skuAttributes,
        setSKUAttributes,
        disabledEdit,
        setDisabledEdit,
        viewData,
        typeData,
    };

    const leftCol = organizationId && productHierarchyData.length > 0 ? 14 : 24;
    const rightCol = organizationId && productHierarchyData.length > 0 ? 10 : 24;

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const title = translateContent('productHierarchy.heading.title');
    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish}>
                            <Form.Item label={`${title}`} name="code">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} data-testid="treeSelectField">
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Col>
                                    {organizationId && (
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Search placeholder={translateContent('global.placeholder.search')} allowClear onChange={onChange} />
                                        </Col>
                                    )}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                    {/* {organizationId && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.buttonsGroupRight}>
                            <Button icon={<FaHistory />} type="primary" className={styles.verticallyCentered} onClick={changeHistoryModelOpen}>
                                {translateContent('global.changeHistory.title')}
                            </Button>
                        </Col>
                    )} */}
                </Row>
            </div>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
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
                                        <span className={styles.descriptionText}>{translateContent('productHierarchy.label.noDataTitle')}</span>
                                    ) : (
                                        <span className={styles.descriptionText}>{translateContent('productHierarchy.label.noDataMessage')}</span>
                                    )
                                }
                            >
                                {/* {organizationId && (
                                    <div>
                                        <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
                                            {translateContent('global.buttons.add')}
                                        </Button>
                                    </div>
                                )} */}
                            </Empty>
                        </div>
                    ) : (
                        <LeftPanel {...myProps} />
                    )}
                </Col>

                {productHierarchyData.length > 0 && (
                    <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                        {viewData && viewData?.prodctCode ? (
                            <>
                                <ViewProductDetail {...viewProps} />
                                {/* <div className={styles.viewContainerFooter}>
                                    <HierarchyFormButton {...viewProps} />
                                </div> */}
                            </>
                        ) : (
                            <div className={styles.emptyContainer}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={<span>{translateContent('productHierarchy.label.description')}</span>}
                                ></Empty>
                            </div>
                        )}
                    </Col>
                )}
            </Row>
            {/* <ChangeHistory /> */}
            <AddEditForm {...formProps} />
        </>
    );
};

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyMain);
