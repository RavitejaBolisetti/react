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

import { FaHistory } from 'react-icons/fa';
import { HierarchyFormButton } from 'components/common/Button';

import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { ManufacturerOrgHierarchyChangeHistory } from '../ManufacturerOrganizationHierarchy';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';

import { LANGUAGE_EN } from 'language/en';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ViewManufacturerOrgDetail } from './ViewManufacturerOrgDetails';

import LeftPanel from '../LeftPanel';

import styles from 'assets/sass/app.module.scss';
import { HIERARCHY_DEFAULT_PARENT } from 'constants/constants';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerOrgHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerOrgHierarchyData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = translateContent('manufacturerOrganisation.heading.mainTitle');
    const viewTitle = translateContent('manufacturerOrganisation.heading.viewTitle');

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
        isDataLoaded,
        manufacturerOrgHierarchyData,
        isDataAttributeLoaded,
        viewTitle,
        attributeData: attributeData?.filter((i) => i?.status),
        unFilteredAttributeData: attributeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: manufacturerOrgHierarchyDataActions.fetchList,
            saveData: manufacturerOrgHierarchyDataActions.saveData,
            listShowLoading: manufacturerOrgHierarchyDataActions.listShowLoading,
            changeHistoryModelOpen: manufacturerOrgHierarchyDataActions.changeHistoryModelOpen,
            fetchChangeHistoryList: manufacturerOrgHierarchyDataActions.fetchChangeHistoryList,
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ManufacturerOrgHierarchyMain = ({ moduleTitle, isChangeHistoryVisible, fetchChangeHistoryList, viewTitle, userId, changeHistoryModelOpen, isDataLoaded, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, manufacturerOrgHierarchyData, showGlobalNotification, unFilteredAttributeData }) => {
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

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };

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
        if (userId) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Manufacturer Organization' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const finalManufacturerOrgHierarchyData = manufacturerOrgHierarchyData?.map((i) => {
        return { ...i, manufacturerOrgHierarchyParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
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

    const flatternData = finalManufacturerOrgHierarchyData && generateList(finalManufacturerOrgHierarchyData);

    const handleTreeViewClick = (keys) => {
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys?.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys[0] === i.key);

            if (formData) {
                const isChildAllowed = unFilteredAttributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.isChildAllowed;
                setFormData({ ...formData?.data, isChildAllowed });

                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: isChildAllowed, siblingBtn: true });
                const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.hierarchyAttribueName;
                const manufactureOrgShrtName = flatternData.find((i) => formData?.data?.manufactureOrgParntId === i.key)?.data?.manufactureOrgShrtName;
                setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: manufactureOrgShrtName });
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
        const codeToBeSaved = selectedTreeSelectKey === HIERARCHY_DEFAULT_PARENT ? '' : selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, manufactureOrgParntId: codeToBeSaved };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });

                fetchList({ setIsLoading: listShowLoading, userId });
                fetchChangeHistoryList({ setIsLoading: listShowLoading, userId });

                const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute.id === res?.data?.attributeKey)?.hierarchyAttribueName;
                const manufactureOrgShrtName = flatternData.find((i) => res?.data?.manufactureOrgParntId === i.key)?.data?.manufactureOrgShrtName;
                res?.data && setSelectedTreeData({ ...res?.data, hierarchyAttribueName, parentName: manufactureOrgShrtName });

                setSelectedTreeKey([res?.data?.id]);
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
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
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
        treeData: manufacturerOrgHierarchyData,
        searchValue,
        setSearchValue,
    };
    const formProps = {
        setSelectedTreeKey,
        flatternData,
        formActionType,
        isVisible: isFormVisible,
        onCloseAction: () => setIsFormVisible(false),
        titleOverride: (formData?.id ? translateContent('global.drawerTitle.edit') : translateContent('global.drawerTitle.add')).concat(moduleTitle),
        onFinish,
        selectedTreeKey,
        selectedTreeData,
        unFilteredAttributeData,
        selectedTreeSelectKey,
        handleResetBtn,
        formData,
        manufacturerOrgHierarchyData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        attributeData,
        fieldNames,
        setSelectedTreeSelectKey,
        isFormBtnActive,
        setFormBtnActive,
    };

    const viewProps = {
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
    };

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const leftCol = manufacturerOrgHierarchyData?.length > 0 ? 14 : 24;
    const rightCol = manufacturerOrgHierarchyData?.length > 0 ? 10 : 24;
    const title = translateContent('manufacturerOrganisation.heading.title');
    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <Form onKeyPress={onKeyPressHandler} autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onFinish}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <Form.Item label={`${title}`} name="code" validateTrigger={['onSearch']}>
                                        <Search placeholder={translateContent('global.placeholder.search')} allowClear onChange={onChange} className={`${styles.headerSearchField} ${styles.headerSearchInput}`} />
                                    </Form.Item>{' '}
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    {manufacturerOrgHierarchyData?.length > 0 && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.buttonsGroupRight}>
                            <Button icon={<FaHistory />} type="primary" className={styles.verticallyCentered} onClick={changeHistoryModelOpen}>
                                {translateContent('global.changeHistory.title')}
                            </Button>
                        </Col>
                    )}
                </Row>
            </div>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    {manufacturerOrgHierarchyData?.length <= 0 ? (
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
                                <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
                                    {translateContent('global.buttons.add')}
                                </Button>
                            </Empty>
                        </div>
                    ) : (
                        <LeftPanel {...myProps} />
                    )}
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol}>
                    {selectedTreeData && selectedTreeData?.id ? (
                        <>
                            <ViewManufacturerOrgDetail {...viewProps} />
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
                                        {translateContent('manufacturerOrganisation.label.description')}
                                    </span>
                                }
                            ></Empty>
                        </div>
                    )}
                </Col>
            </Row>
            <AddEditForm {...formProps} />
            <ManufacturerOrgHierarchyChangeHistory isChangeHistoryContainer={true} />
        </>
    );
};

export const ManufacturerOrgHierarchy = connect(mapStateToProps, mapDispatchToProps)(ManufacturerOrgHierarchyMain);
