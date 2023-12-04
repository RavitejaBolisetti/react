/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useEffect, useReducer, useState } from 'react';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Col, Form, Row, Input, Empty } from 'antd';

import { HierarchyFormButton } from 'components/common/Button';

import { FROM_ACTION_TYPE } from 'constants/formActionType';

import { ViewDetails } from './ViewDetails';

import TreeSelectField from '../../common/TreeSelectField';

import { ManufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy/manufacturerAdminHierarchy';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';

import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';

import { otfBlockMasterDataAction } from 'store/actions/data/otfBlockMaster';

import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';

import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { AddEditForm } from './AddEditForm';

import { showGlobalNotification } from 'store/actions/notification';

import { DisableParent } from 'components/common/ProductHierarchy/ProductHierarchyUtils';

import LeftPanel from 'components/common/LeftPanel';

import styles from 'assets/sass/app.module.scss';

import { LANGUAGE_EN } from 'language/en';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },

        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },

            OTFBlockMaster: { isLoaded: isOtfBlockDataLoaded = false, isLoading: isOtfBlockDataLoading, data: otfBlockMasterData },

            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [], isDetailLoaded = false },

            ManufacturerOrgHierarchy: { isLoaded: isDataOrgLoaded = false, isLoading: isDataOrgLoading, data: manufacturerOrgHierarchyData = [] },

            ManufacturerAdmin: {
                ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, isLoading: ManufacturerAdminHierarchyLoading, data: manufacturerAdminHierarchyData = [] },
            },

            ProductHierarchy: { isLoaded: isProductDataLoaded = false, data: productHierarchyData = [], organizationId = '' },
        },

        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('bookingBlockMaster.heading.moduleTitle');

    const viewTitle = translateContent('bookingBlockMaster.heading.viewTitle');

    let returnValue = {
        collapsed,

        userId,

        typeData,

        isDataLoaded,

        isProductDataLoaded,

        manufacturerAdminHierarchyData,

        isDataAttributeLoaded,

        productHierarchyData,

        moduleTitle,

        viewTitle,

        isDetailLoaded,

        isDataOrgLoaded,

        manufacturerOrgHierarchyData,

        attributeData: attributeData?.filter((i) => i),

        isDataOrgLoading,

        ManufacturerAdminHierarchyLoading,

        organizationId,

        isOtfBlockDataLoaded,

        isOtfBlockDataLoading,

        otfBlockMasterData,
    };

    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,

    ...bindActionCreators(
        {
            fetchList: ManufacturerAdminHierarchyDataActions.fetchList,

            listShowLoading: ManufacturerAdminHierarchyDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,

            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,

            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,

            fetchOrgList: manufacturerOrgHierarchyDataActions.fetchList,

            fetchProductDataList: productHierarchyDataActions.fetchList,

            listProductLoading: productHierarchyDataActions.listShowLoading,

            setSelectedOrganizationId: productHierarchyDataActions.setSelectedOrganizationId,

            resetData: productHierarchyDataActions.resetData,

            fetchOTFBlockList: otfBlockMasterDataAction.fetchList,

            saveOTFBlockData: otfBlockMasterDataAction.saveData,

            listOTFBlockShowLoading: otfBlockMasterDataAction.listShowLoading,

            showGlobalNotification,
        },

        dispatch
    ),
});

export const OtfBlockMasterMain = (props) => {
    const { viewTitle, manufacturerAdminHierarchyData, fetchList, resetData, otfBlockMasterData, productHierarchyData, listOTFBlockShowLoading, fetchOTFBlockList, setSelectedOrganizationId, organizationId, saveOTFBlockData, isDataAttributeLoaded, attributeData, fetchProductDataList, listProductLoading } = props;

    const { isDataOrgLoaded, manufacturerOrgHierarchyData, fetchOrgList } = props;

    const { detailData, userId, listShowLoading, showGlobalNotification, moduleTitle } = props;

    const { AdminDetailData, ManufacturerAdminHierarchyDetailLoading } = props;

    const [form] = Form.useForm();

    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);

    const [selectedProductCode, setSelectedProductCode] = useState();

    const [options, setOptions] = useState(['All']);

    const [selectedOrganizationCode, setSelectedOrganizationCode] = useState();

    const [selectedProductName, setSelectedProductName] = useState();

    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);

    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);

    const [selectedTreeData, setSelectedTreeData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const [searchValue, setSearchValue] = useState('');

    const defaultBtnVisiblity = { editBtn: true, childBtn: false, siblingBtn: false, enable: false };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;

    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;

    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onErrorAction = (message) => {
        resetData();

        showGlobalNotification({ message });
    };

    const onCloseAction = () => {
        form.resetFields();

        setIsFormVisible(false);

        setButtonData({ ...defaultBtnVisiblity });
    };

    useEffect(() => {
        return () => {
            resetData();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const makeExtraparms = (Params) => {
        const extraParams = [];

        Params?.map((element) => {
            const { key, title, value, name } = element;

            extraParams.push({
                key: key,

                title: title,

                value: value,

                name: name,
            });

            return undefined;
        });

        return extraParams;
    };

    useEffect(() => {
        if (selectedProductCode && userId && selectedTreeKey) {
            fetchOTFBlockList({ setIsLoading: listOTFBlockShowLoading, userId, extraParams: makeExtraparms([{ key: 'code', title: 'code', value: selectedProductCode, name: 'code' }]), errorAction: onErrorAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProductCode, userId, selectedTreeKey]);

    useEffect(() => {
        if (organizationId && userId) {
            fetchProductDataList({ setIsLoading: listProductLoading, userId, onCloseAction, extraParams: [{ key: 'manufactureOrgCode', value: organizationId }] });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, organizationId]);

    useEffect(() => {
        if (productHierarchyData?.attributeKey) {
            const prodctShrtName = flatternData.find((i) => productHierarchyData?.manufactureOrgParntId === i.key)?.data?.prodctShrtName;

            setSelectedTreeData({ ...productHierarchyData, parentName: prodctShrtName });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyData]);

    useEffect(() => {
        if (!isDataOrgLoaded && userId) {
            fetchOrgList({ setIsLoading: listShowLoading, userId, errorAction: onErrorAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataOrgLoaded, userId]);

    useEffect(() => {
        manufacturerOrgHierarchyData?.map((i) => DisableParent(i));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manufacturerOrgHierarchyData]);

    useEffect(() => {
        if (formData?.id) {
            setSelectedTreeSelectKey([otfBlockMasterData?.hierarchyMstId]);

            form.setFieldsValue({ hierarchyMstId: otfBlockMasterData?.hierarchyMstName });
        } else {
            setSelectedTreeSelectKey(null);

            form.setFieldsValue({ hierarchyMstId: null });

            form.resetFields();

            setOptions([]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const finalProductHierarchyData = productHierarchyData?.map((i) => {
        return { ...i };
    });

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

    const flatternData = generateList(finalProductHierarchyData);

    const handleTreeViewClick = (keys) => {
        setButtonData({ ...defaultBtnVisiblity });

        form.resetFields();

        setFormData([]);

        setSelectedTreeData([]);

        setSelectedTreeKey([]);

        setFormActionType(FROM_ACTION_TYPE.VIEW);

        if (keys && keys.length > 0) {
            const formData = flatternData.find((i) => keys[0] === i?.data?.prodctCode);

            setButtonData({ ...defaultBtnVisiblity, editBtn: true });

            const prodctShrtName = flatternData.find((i) => formData?.data?.prodctCode === i.data?.prodctCode)?.data?.prodctShrtName;

            setSelectedProductName(prodctShrtName);

            const prodctCode = flatternData.find((i) => formData?.data?.prodctCode === i?.data?.prodctCode)?.data?.prodctCode;

            setSelectedProductCode(prodctCode);

            setSelectedTreeKey(keys);

            setFormData(otfBlockMasterData);
        }
    };

    const handleSelectTreeClick = (value) => {
        form.setFieldsValue({ hierarchyMstId: value });

        if (value === selectedTreeKey[0]) {
            return showGlobalNotification({ notificationType: 'warning', title: sameParentAndChildWarning?.TITLE, message: sameParentAndChildWarning?.MESSAGE, placement: 'bottomRight' });
        }

        setSelectedTreeSelectKey(value);

        setFormBtnActive(true);
    };

    const handleButtonClick = (type) => {
        switch (type) {
            case FROM_ACTION_TYPE.EDIT: {
                setFormData(otfBlockMasterData);

                break;
            }

            default: {
                break;
            }
        }

        setIsFormVisible(true);

        setFormActionType(type);

        setFormBtnActive(false);
    };

    const handleResetBtn = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';

        const data = { ...values, id: recordId, modelGroupCode: selectedProductCode, hierarchyMstId: formData?.id ? selectedTreeSelectKey[0] : selectedTreeSelectKey };

        const onSuccess = (res) => {
            form.resetFields();

            setButtonData({ ...defaultBtnVisiblity, editBtn: true });

            formData && setFormData(data);

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });

                fetchList({ setIsLoading: listShowLoading, userId, extraParams: makeExtraparms([{ key: 'manufacturerOrgId', title: 'manufacturerOrgId', value: organizationId, name: 'manufacturerOrgId' }]), errorAction: onErrorAction });

                setSelectedOrganizationId(organizationId);

                setSelectedTreeKey([res?.data?.id]);

                setFormActionType(FROM_ACTION_TYPE.VIEW);

                setFormBtnActive(false);

                setIsFormVisible(false);

                setOptions([]);

                setFormData(res?.data);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,

            setIsLoading: listShowLoading,

            method: formData?.id ? 'put' : 'post',

            userId,

            onError,

            onSuccess,
        };

        saveOTFBlockData(requestData);
    };

    const myProps = {
        isTreeViewVisible,

        handleTreeViewVisiblity,

        selectedTreeKey,

        selectedTreeSelectKey,

        fieldNames,

        handleTreeViewClick,

        searchValue,

        setSearchValue,

        treeData: productHierarchyData,
    };

    const formProps = {
        setSelectedTreeKey,

        flatternData,

        formActionType,

        selectedTreeKey,

        selectedTreeSelectKey,

        formData: otfBlockMasterData,

        productHierarchyData,

        organizationId,

        makeExtraparms,

        onErrorAction,

        handleSelectTreeClick,

        isDataAttributeLoaded,

        attributeData,

        fieldNames,

        setSelectedTreeSelectKey,

        isVisible: isFormVisible,

        onCloseAction: () => {
            setIsFormVisible(false);

            setOptions([]);

            form.setFieldsValue({ hierarchyMstId: null });

            form.resetFields();
        },

        handleResetBtn,

        buttonData,

        titleOverride: (formData?.id ? translateContent('global.drawerTitle.edit') : translateContent('global.drawerTitle.add')).concat(' ').concat(moduleTitle),

        isFormBtnActive,

        setFormBtnActive,

        manufacturerAdminHierarchyData,

        selectedTreeData,

        otfBlockMasterData,

        selectedProductName,

        selectedOrganizationCode,

        setFormData,

        onFinish,

        EDIT_ACTION,

        ADD_ACTION,

        VIEW_ACTION,

        detailData,

        forceUpdate,

        form,

        setOptions,

        options,
    };

    const viewProps = {
        formData: otfBlockMasterData,

        formActionType,

        buttonData,

        attributeData,

        selectedTreeData,

        handleButtonClick,

        styles,

        selectedProductName,

        viewTitle,

        otfBlockMasterData,

        setFormData,

        viewMode: true,

        selectedTreeSelectKey,

        AdminDetailData,

        manufacturerAdminHierarchyData,

        isLoading: ManufacturerAdminHierarchyDetailLoading,

        forceUpdate,
    };

    const leftCol = productHierarchyData?.length > 0 && organizationId ? 14 : 24;

    const rightCol = productHierarchyData?.length > 0 && organizationId ? 10 : 24;

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;

    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);

    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const organizationFieldNames = { title: 'manufactureOrgShrtName', key: 'manufactureOrgCode', children: 'subManufactureOrg' };

    const treeOrgFieldNames = { ...organizationFieldNames, label: organizationFieldNames?.title, value: organizationFieldNames?.key };

    const treeSelectFieldProps = {
        treeFieldNames: treeOrgFieldNames,

        treeData: manufacturerOrgHierarchyData,

        selectedTreeSelectKey: organizationId,

        defaultParent: false,

        onSelects: (value, treeObj, obj) => {
            resetData();

            setSelectedOrganizationId(value);

            setSelectedOrganizationCode(treeObj?.id);

            !value && resetData();
        },

        handleSelectTreeClick: (value) => {
            setSelectedTreeKey();

            setSelectedTreeSelectKey();

            setSelectedOrganizationId(value);

            !value && resetData();
        },

        defaultValue: 'organizationId',

        placeholder: preparePlaceholderSelect(translateContent('bookingBlockMaster.placeholder.organizationHierarchy')),
    };

    const title = translateContent('manufacturerOrganisation.heading.title');

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item label={`${title}`} name="code">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Col>

                                    {organizationId && productHierarchyData?.length > 0 && (
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Search placeholder={translateContent('global.placeholder.search')} allowClear onChange={onChange} />
                                        </Col>
                                    )}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>

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
                                    organizationId && !productHierarchyData?.hierarchyAttribute?.length ? (
                                        <span className={styles.descriptionText}>
                                            {noDataTitle} <br /> {noDataMessage}
                                        </span>
                                    ) : !organizationId ? (
                                        <span className={styles.descriptionText}>{translateContent('bookingBlockMaster.label.descriptionText')}</span>
                                    ) : (
                                        <span className={styles.descriptionText}>{translateContent('global.generalMessage.noRecordsFound')}</span>
                                    )
                                }
                            ></Empty>
                        </div>
                    ) : (
                        organizationId && <LeftPanel {...myProps} />
                    )}
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                    {selectedTreeKey && selectedTreeKey?.length && organizationId ? (
                        <>
                            <ViewDetails {...viewProps} />

                            <div className={styles.viewContainerFooter}>
                                <HierarchyFormButton {...viewProps} />
                            </div>
                        </>
                    ) : (
                        organizationId &&
                        productHierarchyData?.length > 0 && (
                            <div className={styles.emptyContainer}>
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    imageStyle={{
                                        height: 60,
                                    }}
                                    description={<span>{translateContent('bookingBlockMaster.label.viewHierarchyText')}</span>}
                                ></Empty>
                            </div>
                        )
                    )}
                </Col>
            </Row>

            <AddEditForm {...formProps} />
        </>
    );
};

export const OtfBlockMaster = connect(mapStateToProps, mapDispatchToProps)(OtfBlockMasterMain);
