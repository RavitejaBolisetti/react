import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Empty, Form, Row, Select } from 'antd';
import { FaEdit, FaUserPlus, FaHistory, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';
import { HierarchyFormButton } from 'components/common/Button';

import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { ChangeHistoryGeo } from '../ChangeHistory';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { EN } from 'language/en';

import { ViewGeoDetail } from './ViewGeoDetails';
import LeftPanel from '../LeftPanel';
import styles from 'components/common/Common.module.css';
import style from '../ProductHierarchy/producthierarchy.module.css';
import Search from 'antd/es/input/Search';

const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;
    const moduleTitle = 'Geographical Detail';
    const viewTitle = 'Hierarchy Details';

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
        viewTitle,
        isDataLoaded,
        geoData,
        isDataAttributeLoaded,
        attributeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,
            changeHistoryModelOpen: geoDataActions.changeHistoryModelOpen,
            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const GeoMain = ({ isChangeHistoryGeoVisible, changeHistoryModelOpen, moduleTitle, viewTitle, userId, isDataLoaded, geoData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, ChangeHistoryGeoModelOpen, hierarchyAttributeListShowLoading }) => {
    const [form] = Form.useForm();
    const [isCollapsableView, setCollapsableView] = useState(true);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');
    const [selectedTreeData, setSelectedTreeData] = useState([]);

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);
    const [isChildAllowed, setIsChildAllowed] = useState(true);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const fieldNames = { title: 'geoName', key: 'id', children: 'subGeo' };

    const fnCanAddChild = (value) => value === 'Y';

    useEffect(() => {
        setCollapsableView(!isChildAllowed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChildAllowed]);

    useEffect(() => {
        if (!isDataLoaded && userId) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded, userId]);

    useEffect(() => {
        if (userId) {
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Geographical' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const finalGeoData = geoData?.map((i) => {
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

    const flatternData = generateList(finalGeoData);

    const handleTreeViewClick = (keys) => {
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys.length > 0) {
            setFormActionType('view');
            const formData = flatternData.find((i) => keys[0] === i.key);

            if (formData) {
                const isChildAllowed = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.isChildAllowed;
                formData && setFormData({ ...formData?.data, isChildAllowed });

                const hierarchyAttribueName = attributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.hierarchyAttribueName;
                const geoName = flatternData.find((i) => formData?.data?.geoParentCode === i.key)?.data?.geoName;

                formData && setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: geoName });
            }

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        } else {
            setButtonData({ ...defaultBtnVisiblity, rootChildBtn: true });
            setIsChildAllowed(true);
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    const handleAdd = () => {
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
        setFormActionType(type);
    };

    const handleAttributeChange = (value) => {
        const selectedAttribute = attributeData?.find((i) => i.id === value);
        setIsChildAllowed(fnCanAddChild(selectedAttribute?.isChildAllowed));
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, isActive: values?.isActive ? true : false, geoParentCode: codeToBeSaved };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });

            if (res?.data) {
                handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId });
                res?.data && setSelectedTreeData(res?.data);
                setSelectedTreeKey([res?.data?.id]);
                setFormActionType('view');
                setIsFormVisible(false);
            }
        };
        const onError = (message) => {
            handleErrorModal(message);
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
        //form.validateFields().then((values) => {});
    };

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: geoData,
        setSearchValue,
        searchValue,
    };

    const formProps = {
        isChecked,
        setIsChecked,
        setSelectedTreeKey,
        handleAttributeChange,
        flatternData,
        formActionType,
        selectedTreeKey,
        selectedTreeSelectKey,
        isVisible: isFormVisible,
        formData,
        onFinish,
        onFinishFailed,
        onCloseAction: () => setIsFormVisible(false),
        geoData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
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
    const leftCol = geoData.length > 0 ? 16 : 24;
    const rightCol = geoData.length > 0 ? 8 : 24;

    const noDataTitle = EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} className={styles.searchAndLabelAlign}>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18}>
                                Hierarchy
                                <Option value="hyr">Hyr</Option>
                                <Search
                                    placeholder="Search"
                                    style={{
                                        width: '43%',
                                    }}
                                    allowClear
                                    onChange={onChange}
                                    className={styles.searchField}
                                />
                            </Col>
                            {geoData.length > 0 && (
                                <Col className={styles.buttonHeadingContainer} xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Button type="primary" onClick={changeHistoryModelOpen}>
                                        <FaHistory className={styles.buttonIcon} />
                                        Change History
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                    <div className={styles.content}>
                        {geoData.length <= 0 ? (
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

                <Col xs={24} sm={24} md={rightCol} lg={rightCol} xl={rightCol} className={styles.padRight0}>
                    {isCollapsableView ? <></> : null}

                    {selectedTreeData && selectedTreeData?.id ? (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <ViewGeoDetail {...viewProps} />
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
            <ChangeHistoryGeo />
            <AddEditForm {...formProps} />
        </>
    );
};

export const Geo = connect(mapStateToProps, mapDispatchToProps)(GeoMain);
