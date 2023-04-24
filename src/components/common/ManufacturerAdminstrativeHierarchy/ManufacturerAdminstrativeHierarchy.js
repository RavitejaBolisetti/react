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
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { ManufactureAdminHierarchyUpload } from '../ManufacturerAdminstrativeHierarchy';
import { ManufacturerAdminHierarchyChangeHistory, ManufacturerAdminAuthorityChangeHistory } from './ChangeHistory';
import { showGlobalNotification } from 'store/actions/notification';

import LeftPanel from '../LeftPanel';
import styles from 'components/common/Common.module.css';

import { EN } from 'language/en';

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
            cardBtmDisableAction: manufacturerAdminHierarchyDataActions.cardBtmDisableAction,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ManufacturerAdminstrativeHierarchyMain = (props) => {
    const { moduleTitle, viewTitle, isDetailLoaded, detailData, isChangeHistoryVisible, changeHistoryAuthorityModelOpen, changeHistoryModelOpen, userId, manufacturerAdminHierarchyData, isDataLoaded, fetchList, fetchDetail, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading, showGlobalNotification, uploadModelOpen, authTypeDataLoaded, cardBtmDisableAction } = props;
    const [form] = Form.useForm();
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [selectedId, setSelectedId] = useState();
    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    
    console.log("🚀 ~ file: ManufacturerAdminstrativeHierarchy.js:91 ~ ManufacturerAdminstrativeHierarchyMain ~ selectedTreeData:", selectedTreeData);
    console.log("🚀 ~ file: ManufacturerAdminstrativeHierarchy.js:91 ~ ManufacturerAdminstrativeHierarchyMain ~ formData:", formData);

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
        if (!isDetailLoaded && selectedId && userId) {
            fetchList({ setIsLoading: listShowLoading, id: selectedId, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDetailLoaded, selectedId, userId]);

    useEffect(() => {
        if (isDetailLoaded && selectedId && detailData) {
            console.log('🚀 ~ file: ManufacturerAdminstrativeHierarchy.js:90 ~ ManufacturerAdminstrativeHierarchyMain ~ selectedId:', selectedId, isDetailLoaded, detailData);
            const isChildAllowed = attributeData?.find((attribute) => attribute.id === detailData?.data?.attributeKey)?.isChildAllowed;
            fetchDetail && setFormData({ ...detailData?.data, isChildAllowed });

            const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === detailData?.data?.attributeKey)?.hierarchyAttribueName;
            const manufactureAdminShortName = flatternData.find((i) => detailData?.data?.manufactureAdminParntId === i.key)?.data?.manufactureAdminShortName;
            fetchDetail && setSelectedTreeData({ ...detailData?.data, hierarchyAttribueName, parentName: manufactureAdminShortName });

            setFormActionType('view');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDetailLoaded, fetchDetail]);

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
            cardBtmDisableAction(true);

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    const handleAdd = () => {
        setIsFormVisible(true);
        setFormBtnActive(false);
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
        console.log('🚀 ~ file: ManufacturerAdminstrativeHierarchy.js:198 ~ handleAttributeChange ~ selectedAttribute:', selectedAttribute);
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
                res?.data && setSelectedTreeData(res?.data);
                setSelectedTreeKey([res?.data?.id]);
                setFormActionType('view');
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
        // viewMode,
        // isViewMode,
        selectedTreeData,
    };

    const viewProps = {
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        styles,
        viewTitle,
        // viewMode,
        // isViewMode,
        cardBtmDisableAction,
    };
    const leftCol = manufacturerAdminHierarchyData.length > 0 ? 16 : 24;
    const rightCol = manufacturerAdminHierarchyData.length > 0 ? 8 : 24;

    const noDataTitle = EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);

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
                            {/* className={styles.searchAndLabelAlign} */}
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
                                    {/* <FaAngleUp className={styles.buttonIcon} /> */}
                                    Upload
                                </Button>
                                {manufacturerAdminHierarchyData.length > 0 && (
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
                        {manufacturerAdminHierarchyData.length <= 0 ? (
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
