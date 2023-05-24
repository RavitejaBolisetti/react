import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Input, Empty, Dropdown } from 'antd';
import { FaHistory } from 'react-icons/fa';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';

import { HierarchyFormButton } from 'components/common/Button';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { HierarchyView } from './HierarchyView';

import { manufacturerAdminHierarchyDataActions } from 'store/actions/data/manufacturerAdminHierarchy';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { ManufactureAdminHierarchyUpload } from '../ManufacturerAdminstrativeHierarchy';
import { ManufacturerAdminHierarchyChangeHistory, ManufacturerAdminAuthorityChangeHistory } from './ChangeHistory';
import { showGlobalNotification } from 'store/actions/notification';

import LeftPanel from '../LeftPanel';
import styles from 'components/common/Common.module.css';

import { LANGUAGE_EN } from 'language/en';

const { Search } = Input;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ManufacturerAdminHierarchy: { isLoaded: isDataLoaded = false, data: manufacturerAdminHierarchyData = [], changeHistoryVisible, historyData = [], isDetailLoaded = false, detailData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
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
        isDataLoaded,
        isChangeHistoryVisible: changeHistoryVisible,
        manufacturerAdminHierarchyData,
        isDataAttributeLoaded,
        moduleTitle,
        historyData,
        viewTitle,
        isDetailLoaded,
        detailData,
        attributeData: attributeData?.filter((i) => i),
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

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ManufacturerAdminstrativeHierarchyMain = (props) => {
    const { moduleTitle, viewTitle, isDetailLoaded, detailData, changeHistoryAuthorityModelOpen, changeHistoryModelOpen, userId, manufacturerAdminHierarchyData, isDataLoaded, fetchList, fetchDetail, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, showGlobalNotification, uploadModelOpen, authTypeDataLoaded, cardBtnDisableAction } = props;
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [selectedId, setSelectedId] = useState();
    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);

    const [isFormBtnActive, setFormBtnActive] = useState(false);

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [documentTypesList, setDocumentTypesList] = useState([]);

    const fieldNames = { title: 'manufactureAdminShortName', key: 'id', children: 'subManufactureAdmin' };

    useEffect(() => {
        if (!isDataLoaded && userId) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Manufacturer Administration' });
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (selectedId && userId) {
            setFormData([]);
            setSelectedTreeData([]);
            setDocumentTypesList([]);

            fetchList({ setIsLoading: listShowLoading, id: selectedId, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedId, userId]);

    useEffect(() => {
        if (selectedId && detailData) {
            const isChildAllowed = attributeData?.find((attribute) => attribute.id === detailData.attributeKey)?.isChildAllowed;

            const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === detailData?.attributeKey)?.hierarchyAttribueName;
            const prodctShrtName = flatternData.find((i) => detailData?.parntProdctId === i.key)?.data?.prodctShrtName;

            setFormData({ ...detailData, isChildAllowed });
            setSelectedTreeData({ ...detailData, hierarchyAttribueName, parentName: prodctShrtName });
            setDocumentTypesList(detailData?.adminAuthority || []);
            setFormActionType(FROM_ACTION_TYPE.VIEW);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailData, selectedId]);

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


        if (keys && keys.length > 0) {
            const formData = flatternData.find((i) => keys[0] === i.key);
            const ID = formData.data.id;

            setSelectedId(ID);
            cardBtnDisableAction(true);

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        }

        setSelectedTreeKey(keys);
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
        form.resetFields();

        setIsFormVisible(true);
        setFormActionType(type);
        setFormBtnActive(false);
    };

    const handleAttributeChange = (value) => {
        const selectedAttribute = attributeData?.find((i) => i.id === value);
    };

    const handleResetBtn = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';

        const data = { isModified: false, id: recordId, adminAuthority: documentTypesList, ...values };
        const onSuccess = (res) => {
            form.resetFields();

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            formData && setFormData(data);

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId });

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

        console.log(requestData, 'DATATATA');

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        // form.validateFields().then((values) => {});
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
        treeData: manufacturerAdminHierarchyData,
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
        handleAttributeChange,
        isVisible: isFormVisible,
        onCloseAction: () => setIsFormVisible(false),
        handleResetBtn,
        buttonData,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
        documentTypesList,
        setDocumentTypesList,
        selectedTreeData,
    };

    const viewProps = {
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
        documentTypesList,
        setDocumentTypesList,
        cardBtnDisableAction,
    };
    const leftCol = manufacturerAdminHierarchyData?.length > 0 ? 16 : 24;
    const rightCol = manufacturerAdminHierarchyData?.length > 0 ? 8 : 24;

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    const sameParentAndChildWarning = LANGUAGE_EN.GENERAL.HIERARCHY_SAME_PARENT_AND_CHILD_WARNING

    const historyOptions = [
        {
            label: <div onClick={changeHistoryModelOpen}>Administrative Change History</div>,
            key: '1',
            icon: <FaHistory />,
        },
        {
            label: <div onClick={changeHistoryAuthorityModelOpen}>Authority Change History</div>,
            key: '2',
            icon: <FaHistory />,
        },
    ];

    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Col xs={19} sm={19} md={19} lg={19} xl={12}>
                                Hierarchy
                                <Search
                                    placeholder="Search"
                                    style={{
                                        width: '70%',
                                    }}
                                    allowClear
                                    onChange={onChange}
                                    className={styles.searchField}
                                />
                            </Col>
                            <div>
                                <Button type="primary" onClick={uploadModelOpen}>
                                    Upload
                                </Button>
                                {manufacturerAdminHierarchyData?.length > 0 && (
                                    <Col className={styles.buttonHeadingContainer} xs={5} sm={5} md={5} lg={5} xl={5}>
                                        <Dropdown
                                            menu={{
                                                items: historyOptions,
                                            }}
                                        >
                                            <Button type="primary">
                                                <FaHistory className={styles.buttonIcon} />
                                                Change History
                                                <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                )}
                            </div>
                        </Row>
                    </div>
                    <div className={styles.content}>
                        {manufacturerAdminHierarchyData?.length <= 0 ? (
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
                                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" danger onClick={handleAdd}>
                                        Add
                                    </Button>
                                </Empty>
                            </div>
                        ) : (
                            <LeftPanel {...myProps} />
                        )}
                    </div>
                </Col>

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.padRight0}>
                    {selectedTreeData && selectedTreeData?.id ? (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <HierarchyView {...viewProps} />
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
            <ManufacturerAdminHierarchyChangeHistory />
            <ManufacturerAdminAuthorityChangeHistory />
            <ManufactureAdminHierarchyUpload />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ManufacturerAdminstrativeHierarchy = connect(mapStateToProps, mapDispatchToProps)(ManufacturerAdminstrativeHierarchyMain);
