/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Empty } from 'antd';
import { FaHistory } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';

import { HierarchyFormButton } from 'components/common/Button';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { HierarchyView } from './HierarchyView';
import TreeSelectField from '../TreeSelectField';

import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { supportingDocumentDataActions } from 'store/actions/data/supportingDocument';

import { documentViewDataActions } from 'store/actions/data/customerMaster/documentView';
import { manufacturerAdminUploadDataActions } from 'store/actions/data/manufacturerAdminHierarchy/manufacturerAdminUpload';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { AddEditForm } from './AddEditForm';
import { ManufactureAdminHierarchyUpload } from '../ManufacturerAdminstrativeHierarchy';
import { showGlobalNotification } from 'store/actions/notification';

import { ChangeHistory } from './ChangeHistory';

import { disableParent } from 'components/common/ProductHierarchy/ProductHierarchyUtils';

import LeftPanel from '../LeftPanel';
import styles from 'components/common/Common.module.css';

import { LANGUAGE_EN } from 'language/en';

const { Search } = Input;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerAdminHierarchyData = [], changeHistoryVisible, historyData = [], isDetailLoaded = false, detailData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
            ManufacturerOrgHierarchy: { isLoaded: isDataOrgLoaded = false, isLoading: isDataOrgLoading, data: manufacturerOrgHierarchyData = [] },
            CustomerMaster: {
                ViewDocument: { isLoaded: isViewDataLoaded = false, data: viewDocument },
            },
            ManufacturerAdmin: {
                ManufacturerAdminUpload: { isLoaded: isAuthorityDataLoaded = false, isLoading: isAuthorityDataLoading, data: authorityData = [] },
            },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Manufacturer Detail';
    const viewTitle = 'Hierarchy Details';

    let returnValue = {
        collapsed,
        userId,
        typeData,
        isAuthorityDataLoaded,
        isAuthorityDataLoading,
        authorityData,
        isDataLoaded,
        viewDocument,
        isViewDataLoaded,
        isChangeHistoryVisible: changeHistoryVisible,
        manufacturerAdminHierarchyData,
        isDataAttributeLoaded,
        moduleTitle,
        historyData,
        viewTitle,
        isDetailLoaded,
        detailData,
        isDataOrgLoaded,
        manufacturerOrgHierarchyData,
        attributeData: attributeData?.filter((i) => i),
        isDataOrgLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: manufacturerAdminHierarchyDataActions.fetchList,
            saveData: manufacturerAdminHierarchyDataActions.saveData,
            listShowLoading: manufacturerAdminHierarchyDataActions.listShowLoading,
            changeHistoryModelOpen: manufacturerAdminHierarchyDataActions.changeHistoryModelOpen,
            changeHistoryAuthorityModelOpen: manufacturerAdminHierarchyDataActions.changeHistoryAuthorityModelOpen,
            uploadModelOpen: manufacturerAdminHierarchyDataActions.uploadModelOpen,
            onCloseAction: manufacturerAdminHierarchyDataActions.changeHistoryVisible,
            cardBtnDisableAction: manufacturerAdminHierarchyDataActions.cardBtnDisableAction,

            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,

            fetchOrgList: manufacturerOrgHierarchyDataActions.fetchList,

            fetchViewDocument: documentViewDataActions.fetchList,
            viewListShowLoading: documentViewDataActions.listShowLoading,
            resetViewData: documentViewDataActions.reset,

            uploadDocumentFile: supportingDocumentDataActions.uploadFile,
            downloadFile: supportingDocumentDataActions.downloadFile,
            fetchDocumentFileDocId: manufacturerAdminUploadDataActions.fetchList,
            saveAuthorityData: manufacturerAdminUploadDataActions.saveData,
            authorityShowLoading: manufacturerAdminUploadDataActions.listShowLoading,
            resetData: manufacturerAdminUploadDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ManufacturerAdminstrativeHierarchyMain = (props) => {
    const { viewTitle, manufacturerAdminHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, cardBtnDisableAction } = props;
    const { isDataOrgLoaded, manufacturerOrgHierarchyData, fetchOrgList, fetchDocumentFileDocId } = props;
    const { resetData, resetViewData, detailData, userId, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { downloadFile, uploadDocumentFile, accessToken, token } = props;
    const { isDataOrgLoading } = props;

    const { authorityShowLoading, isAuthorityDataLoaded, isAuthorityDataLoading, authorityData, typeData } = props;
    const { saveAuthorityData, isViewDataLoaded, isLoading, viewListShowLoading, fetchViewDocument, viewDocument } = props;

    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [selectedId, setSelectedId] = useState();
    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [employeeName, setEmployeeName] = useState(false);
    const [tokenValidate, setTokenValidate] = useState();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [documentTypesList, setDocumentTypesList] = useState([]);
    const [isChangeHistoryVisible, setIsChangeHistoryVisible] = useState(false);
    const [organizationId, setOrganizationId] = useState('');
    const [attributeDataOptions, setattributeDataOptions] = useState('');

    const fieldNames = { title: 'manufactureAdminShortName', key: 'id', children: 'subManufactureAdmin' };

    const [uploadForm] = Form.useForm();

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const [uploadedFile, setUploadedFile] = useState();
    const [emptyList, setEmptyList] = useState(true);

    const [uploadedFileName, setUploadedFileName] = useState('');

    const [fileList, setFileList] = useState([]);

    const [downloadForm, setDownLoadForm] = useState(false);
    const [isUploadDrawer, setIsUploadDrawer] = useState(false);

    const supportedFileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const maxSize = 8;

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
    };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Manufacturer Administration', onErrorAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (selectedId && userId && organizationId) {
            fetchList({ setIsLoading: listShowLoading, id: selectedId, userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId, userId]);
    useEffect(() => {
        if (organizationId && userId) {
            if (organizationId === '') return;
            fetchList({ setIsLoading: listShowLoading, userId, manufacturerOrgId: organizationId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, organizationId]);

    useEffect(() => {
        if (selectedId && detailData?.attributeKey) {
            const isChildAllowed = attributeData?.find((attribute) => attribute.id === detailData.attributeKey)?.isChildAllowed;

            const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === detailData?.attributeKey)?.hierarchyAttribueName;
            const prodctShrtName = flatternData.find((i) => detailData?.parntProdctId === i.key)?.data?.prodctShrtName;

            setFormData({ ...detailData, isChildAllowed });
            setSelectedTreeData({ ...detailData, hierarchyAttribueName, parentName: prodctShrtName });
            setDocumentTypesList(detailData?.adminAuthority?.map((authority) => ({ ...authority, isModified: false })) || []);
            setattributeDataOptions(attributeData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailData, selectedId]);

    useEffect(() => {
        if (!isDataOrgLoaded && userId) {
            fetchOrgList({ setIsLoading: listShowLoading, userId, errorAction: onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataOrgLoaded, userId]);
    useEffect(() => {
        manufacturerOrgHierarchyData?.map((i) => disableParent(i));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [manufacturerOrgHierarchyData]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const finalManufacturerAdministrativeHirarchyData = manufacturerAdminHierarchyData?.map((i) => {
        return { ...i, geoParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
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

    const flatternData = generateList(finalManufacturerAdministrativeHirarchyData);

    const handleTreeViewClick = (keys) => {
        setButtonData({ ...defaultBtnVisiblity });
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);
        setSelectedTreeKey([]);

        setFormActionType(FROM_ACTION_TYPE.VIEW);
        setSelectedId('');
        if (keys && keys.length > 0) {
            const formData = flatternData.find((i) => keys[0] === i.key);
            const ID = formData.data.id;

            setSelectedId(ID);
            cardBtnDisableAction(true);

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setSelectedTreeKey(keys);
        }
    };

    const handleSelectTreeClick = (value) => {
        if (value === selectedTreeKey[0]) {
            return showGlobalNotification({ notificationType: 'warning', title: sameParentAndChildWarning?.TITLE, message: sameParentAndChildWarning?.MESSAGE, placement: 'bottomRight' });
        }
        setSelectedTreeSelectKey(value);
    };

    const handleAdd = () => {
        setIsFormVisible(true);
        setFormBtnActive(false);
    };

    const handleButtonClick = (type) => {
        switch (type) {
            case FROM_ACTION_TYPE.CHILD: {
                form.resetFields();
                setFormData([]);
                setDocumentTypesList([]);
                break;
            }

            case FROM_ACTION_TYPE.SIBLING: {
                form.resetFields();
                setFormData([]);
                setDocumentTypesList([]);
                break;
            }
            case FROM_ACTION_TYPE.EDIT: {
                setFormData(selectedTreeData);
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

        const data = { isModified: false, id: recordId, manufactureOrganizationId: organizationId, adminAuthority: documentTypesList, ...values };
        const onSuccess = (res) => {
            form.resetFields();

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            formData && setFormData(data);

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId, manufacturerOrgId: organizationId, onErrorAction });
                fetchList({ setIsLoading: listShowLoading, id: selectedId, userId, onErrorAction });
                setOrganizationId(organizationId);
                setSelectedTreeKey([res?.data?.id]);
                setFormActionType(FROM_ACTION_TYPE.VIEW);
                setFormBtnActive(false);
                setIsFormVisible(false);
                setSelectedId(selectedId);
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

    const onFinishFailed = (errorInfo) => {};

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        searchValue,
        setSearchValue,
        treeData: manufacturerAdminHierarchyData,
        employeeName,
        setEmployeeName,
        tokenValidate,
        setTokenValidate,
    };

    const formProps = {
        setSelectedTreeKey,
        flatternData,
        formActionType,
        selectedTreeKey,
        selectedTreeSelectKey,
        formData,
        manufacturerAdminHierarchyData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        attributeData,
        fieldNames,
        setSelectedTreeSelectKey,
        isVisible: isFormVisible,
        onCloseAction: () => setIsFormVisible(false),
        handleResetBtn,
        buttonData,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        documentTypesList,
        setDocumentTypesList,
        selectedTreeData,
        employeeName,
        setEmployeeName,
        tokenValidate,
        setTokenValidate,
        onFinish,
        EDIT_ACTION,
        detailData,
        attributeDataOptions,
        setattributeDataOptions,
    };

    const viewProps = {
        formActionType,
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
        documentTypesList,
        setDocumentTypesList,
        cardBtnDisableAction,
        viewMode: true,
        manufacturerAdminHierarchyData,
        isLoading: isDataOrgLoading,
    };
    const leftCol = manufacturerAdminHierarchyData?.length > 0 && organizationId ? 14 : 24;
    const rightCol = manufacturerAdminHierarchyData?.length > 0 && organizationId ? 10 : 24;

    const noDataTitle = !organizationId ? 'Please Select Organization from dropdown' : LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = organizationId && LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING;

    const myCloseAction = () => {
        form.resetFields();
        setIsChangeHistoryVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsUploadDrawer(false);
    };

    const drawerTitle = 'Upload Authority Details';

    const uploadProps = {
        ...props,
        isVisible: isUploadDrawer,
        titleOverride: drawerTitle,
        form: uploadForm,
        typeData,
        userId,
        accessToken,
        token,
        saveAuthorityData,
        fetchDocumentFileDocId,
        authorityShowLoading,
        onFinish,
        uploadedFile,
        fetchList,
        isAuthorityDataLoaded,
        isAuthorityDataLoading,
        authorityData,
        isDataLoaded,
        downloadForm,
        setDownLoadForm,
        resetData,
        organizationId,

        listShowLoading,
        showGlobalNotification,
        viewDocument,
        isViewDataLoaded,
        uploadDocumentFile,
        viewListShowLoading,
        fetchViewDocument,

        onCloseAction,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,

        setUploadedFile,
        emptyList,
        setEmptyList,
        uploadedFileName,
        setUploadedFileName,
        resetViewData,
        isLoading,
        fileList,
        setFileList,
        downloadFile,
        supportedFileTypes,
        maxSize,
    };
    const organizationFieldNames = { title: 'manufactureOrgShrtName', key: 'id', children: 'subManufactureOrg' };
    const treeOrgFieldNames = { ...organizationFieldNames, label: organizationFieldNames?.title, value: organizationFieldNames?.key };

    const treeSelectFieldProps = {
        treeFieldNames: treeOrgFieldNames,
        treeData: manufacturerOrgHierarchyData,
        selectedTreeSelectKey: organizationId,
        defaultParent: false,
        handleSelectTreeClick: (value) => {
            setOrganizationId(value);
        },
        HandleClear: () => {
            setOrganizationId(null);
            setSelectedTreeKey(null);
        },
        defaultValue: 'organizationId',
        placeholder: preparePlaceholderSelect('Organization Hierarchy'),
    };
    const title = 'Hierarchy';

    const handleOnClickUpload = () => {
        setButtonData({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: true, saveBtn: true });
        setIsUploadDrawer(true);
    };

    const drawerProps = {
        isVisible: isChangeHistoryVisible,
        onCloseAction: myCloseAction,
        titleOverride: 'Change History',
        organizationId,
    };
    const onfinishHeader = (value) => {};

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm} onFinish={onfinishHeader} onFinishFailed={onFinishFailed}>
                            <Form.Item label={`${title}`} name="code">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                        <TreeSelectField {...treeSelectFieldProps} />
                                    </Col>
                                    {organizationId && manufacturerAdminHierarchyData?.length > 0 && (
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <Search placeholder="Search" allowClear onChange={onChange} className={styles.headerSearchField} />
                                        </Col>
                                    )}
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                    {organizationId && manufacturerAdminHierarchyData?.length > 0 && (
                        <Col className={styles.buttonHeadingContainer} xs={24} sm={24} md={6} lg={6} xl={6}>
                            <Button type="primary" onClick={handleOnClickUpload}>
                                Upload
                            </Button>

                            <Button
                                type="primary"
                                onClick={() => {
                                    setIsChangeHistoryVisible(true);
                                }}
                            >
                                <FaHistory className={styles.buttonIcon} />
                                Change History
                            </Button>
                        </Col>
                    )}
                </Row>
            </div>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol} className={styles.marT20}>
                    <div className={styles.content}>
                        {!manufacturerAdminHierarchyData?.length ? (
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
                                    {organizationId && (
                                        <Button icon={<PlusOutlined />} type="primary" danger onClick={handleAdd}>
                                            Add
                                        </Button>
                                    )}
                                </Empty>
                            </div>
                        ) : (
                            organizationId && <LeftPanel {...myProps} />
                        )}
                    </div>
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.padRight0}>
                    {selectedTreeKey && selectedTreeKey?.length && organizationId ? (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padRight0}>
                            <HierarchyView {...viewProps} />
                            <div className={styles.hyrbuttonContainer}>
                                <HierarchyFormButton {...viewProps} />
                            </div>
                        </Col>
                    ) : (
                        organizationId &&
                        manufacturerAdminHierarchyData?.length > 0 && (
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
                        )
                    )}
                </Col>
            </Row>
            <ManufactureAdminHierarchyUpload {...uploadProps} />
            <ChangeHistory {...drawerProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ManufacturerAdminstrativeHierarchy = connect(mapStateToProps, mapDispatchToProps)(ManufacturerAdminstrativeHierarchyMain);
