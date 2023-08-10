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
import { ViewDetails } from './ViewDetails';
import LeftPanel from 'components/common/LeftPanel';

import { LANGUAGE_EN } from 'language/en';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerOrgHierarchy: { isLoaded: isDataOrgLoaded = false, data: manufacturerOrgHierarchyData = [] },
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [], organizationId = '' },
            OTF: {
                OtfSoMapping: { isLoaded: isDataOtfSoMappingLoaded = false, data: otfSoMappingData = {} },
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

        viewTitle,

        isDataOrgLoaded,
        manufacturerOrgHierarchyData,
        isLoading,
        isDataLoaded,
        productHierarchyData,
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
            saveData: otfSoMappingActions.saveData,

            fetchOtfUserList: otfSoUserMappingActions.fetchList,
            listOtfSoUserMappingShowLoading: otfSoUserMappingActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfSoMappingMain = ({ typeData, moduleTitle, viewTitle, userId, saveData, listOrgLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, showGlobalNotification, manufacturerOrgHierarchyData, fetchOrgList, isDataOrgLoaded, productHierarchyData, setSelectedOrganizationId, organizationId, fetchProductDataList, fetchOtfList, listOtfSoMappingShowLoading, resetData, otfSoMappingData, otfSoUserMappingData, isDataOtfSoMappingLoaded, isDataOtfSoUserMappingLoaded, fetchOtfUserList, listOtfSoUserMappingShowLoading, listProductLoading }) => {
    console.log('otfSoMappingData', otfSoMappingData);
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState(null);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [soMapKey, setSoMapKey] = useState(null);
    const [soMapName, setSoMapName] = useState(null);
    const [viewData, setViewData] = useState(null);

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false, save: false };
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

    const extraParams = [
        {
            key: 'code',
            title: 'code',
            value: selectedTreeKey,
            name: 'code ID',
        },
        {
            key: 'manufactureOrdId',
            title: 'manufactureOrdId',
            value: organizationId,
            name: 'manufacture OrdId ID',
        },
    ];

    useEffect(() => {
        if (organizationId && selectedTreeKey) {
            fetchOtfList({ setIsLoading: listOtfSoMappingShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTreeKey]);

    useEffect(() => {
        if (userId) {
            fetchOtfUserList({ setIsLoading: listOtfSoUserMappingShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (viewData) {
            setButtonData({ ...defaultBtnVisiblity, editBtn: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewData]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

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

    const flatternData = generateList(productHierarchyData);
    const handleTreeViewClick = (keys, tree) => {
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);
        setViewData(null);
        let name = tree?.node?.title?.props?.children?.[2];
        setSoMapName(name);

        if (keys && keys?.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
        }

        setSelectedTreeKey(keys);
    };

    useEffect(() => {
        if (otfSoMappingData?.orgManufactureId) {
            setViewData(otfSoMappingData);
        } else {
            setViewData(null);
            form.setFieldsValue({
                productAttributeCode: soMapKey?.[0],
                productAttributeValue: soMapName,
                manufactureOrgId: organizationId,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfSoMappingData]);

    const handleSelectTreeClick = (value) => {
        if (value === selectedTreeKey[0]) {
            return showGlobalNotification({ notificationType: 'warning', title: sameParentAndChildWarning?.TITLE, message: sameParentAndChildWarning?.MESSAGE, placement: 'bottomRight' });
        }
        setSelectedTreeSelectKey(value);
        setFormBtnActive(true);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const data = { ...values, id: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchOtfList({ setIsLoading: listOtfSoMappingShowLoading, userId, extraParams });
                //const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute.hierarchyAttribueCode === res?.data?.attributeTypeCode)?.hierarchyAttribueName;
                // const attributeParentName = flatternData.find((i) => res?.data?.parentCode === i.key)?.data?.taxChargesTypeCode;
                // res?.data && setSelectedTreeData({ ...res?.data, hierarchyAttribueName, parentName: attributeParentName });

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
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listOtfSoMappingShowLoading,
            userId,
            onError,
            onSuccess,
        };

        console.log('_DATA_', data);
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
        isFormBtnActive,
        setFormBtnActive,
        otfSoUserMappingData,
        productHierarchyData,
        form,
    };

    const viewProps = {
        typeData,
        buttonData,
        viewData,
        handleButtonClick,
        styles,
        viewTitle,
        otfSoMappingData,
    };

    const noDataTitle = 'Please choose organization hierarchy to view data';
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
                                    {organizationId && (
                                        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                            <Search placeholder="Search" allowClear onChange={onChange} className={`${styles.headerSearchField} ${styles.headerSearchInput}`} />
                                        </Col>
                                    )}
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

                {productHierarchyData?.length > 0 ? (
                    <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                        {viewData ? (
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
                                        viewData && selectedTreeKey ? (
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
                                    {viewData && selectedTreeKey ? (
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
