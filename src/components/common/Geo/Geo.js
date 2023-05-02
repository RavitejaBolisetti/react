import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Empty, Form, Row, Select, Input } from 'antd';
import { FaHistory } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';
import { HierarchyFormButton } from 'components/common/Button';

import { geoDataActions } from 'store/actions/data/geo';
import { hierarchyAttributeMasterDataActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { ChangeHistory } from './ChangeHistory';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { LANGUAGE_EN } from 'language/en';
import { showGlobalNotification } from 'store/actions/notification';

import { ViewGeoDetail } from './ViewGeoDetails';
import LeftPanel from '../LeftPanel';
import styles from 'components/common/Common.module.css';
import style from '../ProductHierarchy/producthierarchy.module.css';

const { Search } = Input;
const { Option } = Select;
const mapStateToProps = (state) => {
    console.log("🚀 ~ file: Geo.js:25 ~ mapStateToProps ~ state:", state)
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

    console.log('attributeData', attributeData);

    let returnValue = {
        collapsed,
        userId,
        moduleTitle,
        viewTitle,
        isDataLoaded,
        geoData,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((item) => item?.status),
        unFilteredAttributeData: attributeData,
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
            hierarchyAttributeFetchList: hierarchyAttributeMasterDataActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterDataActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const GeoMain = ({ isChangeHistoryGeoVisible, changeHistoryModelOpen, moduleTitle, viewTitle, userId, isDataLoaded, geoData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, unFilteredAttributeData, ChangeHistoryGeoModelOpen, hierarchyAttributeListShowLoading, showGlobalNotification }) => {
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
    const fieldNames = { title: 'geoName', key: 'id', children: 'subGeo' };

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

    const formModifiedData = (selectedData) => {
        const hierarchyAttribueName = unFilteredAttributeData?.find((attribute) => attribute.id === selectedData?.attributeKey)?.hierarchyAttribueName;
        const geoName = flatternData.find((i) => selectedData?.geoParentCode === i.key)?.data?.geoName;

        return { ...selectedData, hierarchyAttribueName, parentName: geoName };
    };

    const handleTreeViewClick = (keys) => {
        form.resetFields();
        setFormData([]);
        setSelectedTreeData([]);

        if (keys && keys.length > 0) {
            setFormActionType(FROM_ACTION_TYPE.VIEW);
            const formData = flatternData.find((i) => keys[0] === i.key);

            if (formData) {
                const isChildAllowed = unFilteredAttributeData?.find((attribute) => attribute.id === formData?.data?.attributeKey)?.isChildAllowed;
                formData && setFormData({ ...formData?.data, isChildAllowed });
                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: isChildAllowed, siblingBtn: true });

                formData && setSelectedTreeData(formModifiedData(formData?.data));
            } else {
                setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            }
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
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

    const handleAttributeChange = (value) => {
        const selectedAttribute = attributeData?.find((i) => i.id === value);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, isActive: values?.isActive, geoParentCode: codeToBeSaved };

        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId });

                res?.data && setSelectedTreeData(formModifiedData(res?.data));
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
        setSelectedTreeKey,
        handleAttributeChange,
        flatternData,
        formActionType,
        selectedTreeKey,
        selectedTreeSelectKey,
        isVisible: isFormVisible,
        formData,
        selectedTreeData,
        onFinish,
        onFinishFailed,
        onCloseAction: () => setIsFormVisible(false),
        geoData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat(moduleTitle),
        attributeData,
        unFilteredAttributeData,
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
    const leftCol = geoData?.length > 0 ? 16 : 24;
    const rightCol = geoData?.length > 0 ? 8 : 24;

    const noDataTitle = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = LANGUAGE_EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);
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
                            {geoData?.length > 0 && (
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
                        {geoData?.length <= 0 ? (
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
            <ChangeHistory />
            <AddEditForm {...formProps} />
        </>
    );
};

export const Geo = connect(mapStateToProps, mapDispatchToProps)(GeoMain);
