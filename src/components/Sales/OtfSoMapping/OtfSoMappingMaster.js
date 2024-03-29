/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Form, Row, Input, Empty } from 'antd';
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

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

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

    const moduleTitle = translateContent('bookingSoMapping.heading.moduleTitle');
    const viewTitle = translateContent('bookingSoMapping.heading.viewTitle');

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
            resetData: productHierarchyDataActions.resetData,

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

export const OtfSoMappingMain = ({ typeData, moduleTitle, viewTitle, userId, saveData, listOrgLoading, showGlobalNotification, manufacturerOrgHierarchyData, fetchOrgList, isDataOrgLoaded, productHierarchyData, setSelectedOrganizationId, organizationId, fetchProductDataList, fetchOtfList, listOtfSoMappingShowLoading, resetData, otfSoMappingData, otfSoUserMappingData, fetchOtfUserList, listOtfSoUserMappingShowLoading, listProductLoading }) => {
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState(null);
    const [formActionType, setFormActionType] = useState('');
    const [change, setChange] = useState(false);

    const [formData, setFormData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [soMapName, setSoMapName] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [finalManufacturerOrgHierarchyData, setFinalManufacturerOrgHierarchyData] = useState(null);
    const [finalProductHierarchyData, setFinalProductHierarchyData] = useState(null);

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false, save: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const organizationFieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };
    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };

    useEffect(() => {
        if (!isDataOrgLoaded && userId) {
            fetchOrgList({ setIsLoading: listOrgLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataOrgLoaded, userId]);

    const onErrorAction = (message) => {
        resetData();
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (organizationId && userId) {
            fetchProductDataList({ setIsLoading: listProductLoading, userId, id: organizationId, onErrorAction });
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

    useEffect(() => {
        if (otfSoMappingData?.orgManufactureId) {
            form.setFieldsValue({
                productAttributeCode: otfSoMappingData?.productAttributeCode,
                productAttributeValue: otfSoMappingData?.productAttributeValue,
                manufactureOrgId: otfSoMappingData?.orgManufactureId,
                otfSoMapUnmapBy: otfSoMappingData?.otfSoMapUnmapBy,
            });
            setFormActionType(FROM_ACTION_TYPE.EDIT);
        } else {
            form.setFieldsValue({
                productAttributeCode: viewData?.productAttributeCode?.[0],
                productAttributeValue: viewData?.productAttributeValue,
                manufactureOrgId: organizationId,
                otfSoMapUnmapBy: null,
            });
            setFormActionType(FROM_ACTION_TYPE.ADD);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType, change]);

    const disableParent = (node, key) => {
        function datas(node) {
            if (node?.[key] && node?.[key].length) {
                node['disabled'] = true;
                node?.[key]?.forEach((child) => {
                    datas(child);
                });
            } else {
                return;
            }
        }
        datas(node);
        return node;
    };

    useEffect(() => {
        setFinalManufacturerOrgHierarchyData(manufacturerOrgHierarchyData?.map((i) => disableParent(i, 'subManufactureOrg')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manufacturerOrgHierarchyData]);

    useEffect(() => {
        setFinalProductHierarchyData(productHierarchyData?.map((i) => disableParent(i, 'subProdct')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyData]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    const handleTreeViewClick = (keys, tree) => {
        form.resetFields();
        setFormData([]);
        setViewData(null);
        let name = tree?.node?.title?.props?.children?.[2];
        setSoMapName(name);
        setSelectedTreeKey(keys);
    };

    useEffect(() => {
        if (otfSoMappingData?.orgManufactureId) {
            setViewData(otfSoMappingData);
        } else {
            setViewData({ productAttributeCode: selectedTreeKey, productAttributeValue: soMapName, manufactureOrgId: organizationId, otfSoMapUnmapBy: 'NA' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfSoMappingData]);

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const data = { ...values, id: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
                fetchOtfList({ setIsLoading: listOtfSoMappingShowLoading, userId, extraParams });
                setFormBtnActive(false);
                setIsFormVisible(false);
            }
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType === FROM_ACTION_TYPE.EDIT ? 'put' : 'post',
            setIsLoading: listOtfSoMappingShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const handleButtonClick = () => {
        setFormData([]);
        form.resetFields();
        setIsFormVisible(true);
        setFormBtnActive(false);
        setChange(() => !change);
    };

    const treeOrgFieldNames = { ...organizationFieldNames, label: organizationFieldNames?.title, value: organizationFieldNames?.key };

    const treeSelectFieldProps = {
        treeFieldNames: treeOrgFieldNames,
        treeData: finalManufacturerOrgHierarchyData,
        selectedTreeSelectKey: organizationId,
        defaultParent: false,
        handleSelectTreeClick: (value) => {
            setSelectedTreeKey();
            setViewData(null);
            setSelectedOrganizationId(value);
        },
        defaultValue: organizationId,
        placeholder: preparePlaceholderSelect(translateContent('bookingSoMappingControlMaster.placeholder.organizationHierarchy')),
    };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        fieldNames,
        handleTreeViewClick,
        treeData: finalProductHierarchyData,
        searchValue,
        setSearchValue,
    };

    const formProps = {
        typeData,
        setSelectedTreeKey,
        formActionType,
        isVisible: isFormVisible,
        onCloseAction: () => {
            setIsFormVisible(false);
        },
        titleOverride: 'Map '.concat(moduleTitle),
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
        otfSoUserMappingData,
    };

    const noDataTitle = translateContent('bookingSoMappingControlMaster.heading.noDataTitle');
    const diffSelection = translateContent('bookingSoMappingControlMaster.validation.diffSelection');

    const leftCol = productHierarchyData?.length > 0 ? 14 : 24;
    const rightCol = productHierarchyData?.length > 0 ? 10 : 24;
    const title = translateContent('bookingSoMappingControlMaster.heading.title');

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
                                    {organizationId && productHierarchyData?.length > 0 && (
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
                                            {translateContent('bookingSoMappingControlMaster.description.selectLeft')} <br />
                                            {translateContent('bookingSoMappingControlMaster.description.sideHierarchyView')}
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

export const OtfSoMappingMaster = connect(mapStateToProps, mapDispatchToProps)(OtfSoMappingMain);
