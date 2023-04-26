import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { FaHistory } from 'react-icons/fa';
import { HierarchyFormButton } from 'components/common/Button';

import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { manufacturerOrgHierarchyDataActions } from 'store/actions/data/manufacturerOrgHierarchy';
import { ManufacturerOrgHierarchyChangeHistory } from '../ManufacturerOrganizationHierarchy';
import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';

import { EN } from 'language/en';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ViewManufacturerOrgDetail } from './ViewManufacturerOrgDetails';

import LeftPanel from '../LeftPanel';

import styles from 'components/common/Common.module.css';
import style from '../ProductHierarchy/producthierarchy.module.css';

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
    const moduleTitle = 'Manufacturer Organisation Detail';
    const viewTitle = 'Hierarchy Details';

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

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
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

    const flatternData = generateList(finalManufacturerOrgHierarchyData);

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
                const manufactureOrgShrtName = flatternData.find((i) => formData?.data?.manufactureOrgParntId === i.key)?.data?.manufactureOrgShrtName;
                formData && setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: manufactureOrgShrtName });
            } else {
                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            }
        }

        setSelectedTreeKey(keys);
    };
    const handleAttributeChange = (value) => {
        const selectedAttribute = attributeData?.find((i) => i.id === value);
    };

    const handleSelectTreeClick = (value) => {
        setSelectedTreeSelectKey(value);
        setFormBtnActive(true);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, manufactureOrgParntId: codeToBeSaved };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });

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
        treeData: manufacturerOrgHierarchyData,
        searchValue,
        setSearchValue,
    };
    const formProps = {
        setSelectedTreeKey,
        flatternData,
        formActionType,
        isVisible: isFormVisible,
        onFinishFailed,
        onCloseAction: () => setIsFormVisible(false),
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        selectedTreeKey,
        selectedTreeData,
        unFilteredAttributeData,
        selectedTreeSelectKey,
        handleResetBtn,
        handleAttributeChange,
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

    const noDataTitle = EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const leftCol = manufacturerOrgHierarchyData?.length > 0 ? 16 : 24;
    const rightCol = manufacturerOrgHierarchyData?.length > 0 ? 8 : 24;
    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} className={styles.searchAndLabelAlign}>
                            <Col xs={24} sm={24} md={18} lg={18} xl={18} className={style.contentHeaderRightBackground}>
                                Hierarchy
                                <Search
                                    placeholder="Search"
                                    // style={{
                                    //     width: '43%',
                                    // }}
                                    className={styles.headerSelectField}
                                    allowClear
                                    onChange={onChange}
                                    // className={style.searchField}
                                />
                            </Col>
                            {manufacturerOrgHierarchyData?.length > 0 && (
                                <Col className={styles.buttonHeadingContainer} xs={24} sm={24} md={6} lg={6} xl={6}>
                                    <Button type="primary" onClick={changeHistoryModelOpen}>
                                        <FaHistory className={styles.buttonIcon} />
                                        Change History
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                    <div className={styles.content}>
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
                                    <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add
                                    </Button>
                                </Empty>
                            </div>
                        ) : (
                            <LeftPanel {...myProps} />
                        )}
                    </div>
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.pad0}>
                    {selectedTreeData && selectedTreeData?.id ? (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <ViewManufacturerOrgDetail {...viewProps} />
                            <div className={styles.hyrbuttonContainer}>
                                <HierarchyFormButton {...viewProps} />
                            </div>
                        </Col>
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
            </Row>
            <AddEditForm {...formProps} />
            <ManufacturerOrgHierarchyChangeHistory />
        </>
    );
};

export const ManufacturerOrgHierarchy = connect(mapStateToProps, mapDispatchToProps)(ManufacturerOrgHierarchyMain);
