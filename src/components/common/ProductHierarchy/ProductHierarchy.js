import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Form, Row, Collapse, Input, Empty, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { HierarchyFormButton } from 'components/common/Button';
import styles from 'components/common/Common.module.css';
import style from '../ProductHierarchy/producthierarchy.module.css';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ChangeHistory } from '../ChangeHistory';
import LeftPanel from '../LeftPanel';

import { FaHistory } from 'react-icons/fa';

import { ViewProductDetail } from './ViewProductDetail';

import { EN } from 'language/en';

const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [], changeHistoryVisible },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    const moduleTitle = 'Product Detail';
    const viewTitle = 'Hierarchy Details';

    let returnValue = {
        isLoading,
        collapsed,
        userId,
        isChangeHistoryVisible: changeHistoryVisible,
        isDataLoaded,
        productHierarchyData,
        // productHierarchyData: [],
        moduleTitle,
        viewTitle,
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: productHierarchyDataActions.fetchList,
            saveData: productHierarchyDataActions.saveData,
            listShowLoading: productHierarchyDataActions.listShowLoading,
            changeHistoryModelOpen: productHierarchyDataActions.changeHistoryModelOpen,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,

            // onOpenAction: productHierarchyDataActions.changeHistoryVisible,
        },
        dispatch
    ),
});

export const ProductHierarchyMain = ({ moduleTitle, viewTitle, userId, isDataLoaded, productHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, isChangeHistoryVisible, changeHistoryModelOpen, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [form] = Form.useForm();
    const [isCollapsableView, setCollapsableView] = useState(true);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [openPanels, setOpenPanels] = React.useState([]);
    const [closePanels, setClosePanels] = React.useState([]);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [isChildAllowed, setIsChildAllowed] = useState(true);

    const defaultBtnVisiblity = { editBtn: false, childBtn: false, siblingBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };

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
            hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Product Hierarchy' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const onChange = (e) => {
        setSearchValue(e.target.value);
    };

    const finalGeoData = productHierarchyData?.map((i) => {
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
                const prodctShrtName = flatternData.find((i) => formData?.data?.parntProdctId === i.key)?.data?.prodctShrtName;
                formData && setSelectedTreeData({ ...formData?.data, hierarchyAttribueName, parentName: prodctShrtName });
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

    const handleResetBtn = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, active: values?.active ? 'Y' : 'N', parentCode: codeToBeSaved, otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N' };
        const onSuccess = (res) => {
            form.resetFields();
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });

            if (res?.data) {
                handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId });
                formData && setSelectedTreeData(formData?.data);
                setSelectedTreeKey([res?.data?.id]);
                setFormActionType('view');
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
        treeData: productHierarchyData,
        searchValue,
        setSearchValue,
    };

    const formProps = {
        isChecked,
        setIsChecked,
        setSelectedTreeKey,
        flatternData,
        formActionType,
        selectedTreeKey,
        selectedTreeSelectKey,
        formData,
        productHierarchyData,
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
    };

    const viewProps = {
        buttonData,
        attributeData,
        selectedTreeData,
        handleButtonClick,
        setClosePanels,
        styles,
        viewTitle,
    };
    const leftCol = productHierarchyData.length > 0 ? 16 : 24;
    const rightCol = productHierarchyData.length > 0 ? 8 : 24;

    const noDataTitle = EN.GENERAL.NO_DATA_EXIST.TITLE;
    const noDataMessage = EN.GENERAL.NO_DATA_EXIST.MESSAGE.replace('{NAME}', moduleTitle);

    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} className={styles.searchAndLabelAlign}>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18} className={style.subheading}>
                                Hierarchy
                                <Select
                                    placeholder="Select a option"
                                    disabled
                                    allowClear
                                    className={styles.searchField}
                                    style={{
                                        width: '43%',
                                    }}
                                >
                                    <Option value="hyr">Hyr</Option>
                                </Select>
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
                            {productHierarchyData.length > 0 && (
                                <Col className={styles.buttonContainer} xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Button type="primary" onClick={changeHistoryModelOpen}>
                                        <FaHistory className={styles.buttonIcon} />
                                        Change History
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                    <div className={styles.content}>
                        {productHierarchyData.length <= 0 ? (
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
                            <ViewProductDetail {...viewProps} />
                            <HierarchyFormButton {...viewProps} />
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

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyMain);
