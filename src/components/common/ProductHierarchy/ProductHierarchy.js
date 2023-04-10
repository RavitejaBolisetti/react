import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Form, Row, Collapse, Descriptions, Input, Empty } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'components/common/Common.module.css';
import style from '../ProductHierarchy/producthierarchy.module.css';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { ChangeHistory } from '../ChangeHistory';
import LeftPanel from '../LeftPanel';
import { DataTable } from 'utils/dataTable';
import { TfiReload } from 'react-icons/tfi';
import { FaHistory } from 'react-icons/fa';
import { validateRequiredSelectField } from 'utils/validation';
import TreeSelectField from '../TreeSelectField';

const { Panel } = Collapse;
const { Search } = Input;

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

    let returnValue = {
        isLoading,
        collapsed,
        userId,
        isChangeHistoryVisible: changeHistoryVisible,
        isDataLoaded,
        productHierarchyData,
        // productHierarchyData: [],
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

export const ProductHierarchyMain = ({ userId, isDataLoaded, productHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, isChangeHistoryVisible, changeHistoryModelOpen, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [form] = Form.useForm();
    const [isCollapsableView, setCollapsableView] = useState(true);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const [openPanels, setOpenPanels] = React.useState([]);
    const [closePanels, setClosePanels] = React.useState([]);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [selectedTreeData, setSelectedTreeData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);
    const [isFormVisible, setFormVisible] = useState(false);
    const [isFormBtnActive, setFormBtnActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [isChildAllowed, setIsChildAllowed] = useState(true);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, enable: false };
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

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);

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
        setForceFormReset(Math.random() * 10000);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false });
        form.resetFields();
        setFormVisible(false);
        setFormData([]);

        if (keys && keys.length > 0) {
            setFormActionType('view');
            const formData = flatternData.find((i) => keys[0] === i.key);
            formData && setFormData(formData?.data);
            formData && setSelectedTreeData(formData?.data);

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
            setFormVisible(true);
            forceUpdate();
            setReadOnly(true);

            if (formData?.data) {
                const selectedAttribute = attributeData?.find((i) => i.id === formData?.data?.attributeKey);
                setIsChildAllowed(fnCanAddChild(selectedAttribute?.isChildAllowed));
            }
        } else {
            setButtonData({ ...defaultBtnVisiblity, rootChildBtn: true });
            setReadOnly(false);
            setIsChildAllowed(true);
        }

        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    const handleAdd = () => {
        setIsVisible(true);
    };

    const handleEditBtn = () => {
        setIsVisible(true);
        setForceFormReset(Math.random() * 10000);

        const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        formData && setFormData(formData?.data);
        setFormActionType('edit');

        setReadOnly(false);
    };

    const handleRootChildBtn = () => {
        setIsVisible(true);
        setForceFormReset(Math.random() * 10000);
        setFormActionType('rootChild');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, enable: false });
    };

    const handleChildBtn = () => {
        setIsVisible(true);
        setForceFormReset(Math.random() * 10000);
        setFormActionType('child');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, enable: true });
    };

    const handleSiblingBtn = () => {
        setIsVisible(true);
        setForceFormReset(Math.random() * 10000);

        setFormActionType('sibling');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, enable: false });
    };

    const handleBack = () => {
        setReadOnly(true);
        setForceFormReset(Math.random() * 10000);
        if (selectedTreeKey && selectedTreeKey.length > 0) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
            setFormActionType('view');
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
        } else {
            setFormActionType('');
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        }
    };

    const handleAttributeChange = (value) => {
        const selectedAttribute = attributeData?.find((i) => i.id === value);
        setIsChildAllowed(fnCanAddChild(selectedAttribute?.isChildAllowed));
    };

    const handleResetBtn = () => {
        setForceFormReset(Math.random() * 10000);
        form.resetFields();
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = selectedTreeSelectKey || '';
        const data = { ...values, id: recordId, active: values?.active ? 'Y' : 'N', parentCode: codeToBeSaved, otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N' };
        const onSuccess = (res) => {
            form.resetFields();
            setForceFormReset(Math.random() * 10000);
            setReadOnly(true);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
            setFormVisible(true);
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
        isReadOnly,
        formData,
        productHierarchyData,
        handleSelectTreeClick,
        isDataAttributeLoaded,
        attributeData,
        fieldNames,
        setSelectedTreeSelectKey,
        handleAttributeChange,
        isVisible,
        onCloseAction: () => setIsVisible(false),
        handleResetBtn,
        handleRootChildBtn,
        handleBack,
        buttonData,
        titleOverride: (formData?.id ? 'Edit ' : 'Add ').concat('Product Detail'),
        onFinish,
        onFinishFailed,
        isFormBtnActive,
        setFormBtnActive,
    };
    const leftCol = productHierarchyData.length > 0 ? 16 : 24;
    const rightCol = productHierarchyData.length > 0 ? 8 : 24;
    return (
        <>
            <Row gutter={20} span={24}>
                <Col xs={24} sm={24} md={leftCol} lg={leftCol} xl={leftCol}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20} className={styles.searchAndLabelAlign}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16} className={style.subheading}>
                                Hierarchy
                                <Search
                                    placeholder="Search"
                                    style={{
                                        width: 300,
                                    }}
                                    allowClear
                                    onChange={onChange}
                                    className={styles.searchField}
                                />
                            </Col>
                            {productHierarchyData.length > 0 && (
                                <Col className={styles.buttonContainer} xs={8} sm={8} md={8} lg={8} xl={8}>
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
                                        <>
                                            <span>
                                                No records found. <br />
                                                Please add New Product Details using below button
                                            </span>
                                        </>
                                    }
                                >
                                    <Row>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Button icon={<PlusOutlined />} className={style.actionbtn} type="primary" danger onClick={handleAdd}>
                                                Add Child
                                            </Button>
                                        </Col>
                                    </Row>
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
                            <div>
                                <Descriptions title={<div className={styles.contentHeaderBackground}>Hierarchy Details</div>} bordered={true} colon={true} column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                                    <Descriptions.Item label="Attribute Level">{attributeData?.find((attribute) => attribute.id === selectedTreeData?.attributeKey)?.hierarchyAttribueName}</Descriptions.Item>
                                    <Descriptions.Item label="Parent">Parent Name</Descriptions.Item>
                                    <Descriptions.Item label="Code">{selectedTreeData.prodctCode}</Descriptions.Item>
                                    <Descriptions.Item label="Short Description">{selectedTreeData?.prodctShrtName}</Descriptions.Item>
                                    <Descriptions.Item label="Long Description">{selectedTreeData?.prodctLongName}</Descriptions.Item>
                                    <Descriptions.Item label="Status">{selectedTreeData?.active === 'Y' ? 'Active' : 'InActive'}</Descriptions.Item>
                                </Descriptions>
                            </div>
                            <div className={styles.content}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                        <div className={styles.btnLeft}>
                                            {buttonData?.editBtn && (
                                                <Button danger onClick={() => handleEditBtn()}>
                                                    <FaEdit className={styles.buttonIcon} />
                                                    Edit
                                                </Button>
                                            )}
                                        </div>

                                        <div className={styles.btnRight}>
                                            {buttonData?.rootChildBtn && (
                                                <Button danger onClick={() => handleRootChildBtn()}>
                                                    <FaUserPlus className={styles.buttonIcon} />
                                                    Add Child
                                                </Button>
                                            )}

                                            {buttonData?.childBtn && (
                                                <Button
                                                    danger
                                                    onClick={() => {
                                                        handleChildBtn();
                                                        setClosePanels(['1']);
                                                    }}
                                                >
                                                    <FaUserPlus className={styles.buttonIcon} />
                                                    Add Child
                                                </Button>
                                            )}

                                            {buttonData?.siblingBtn && (
                                                <Button danger onClick={() => handleSiblingBtn()}>
                                                    <FaUserFriends className={styles.buttonIcon} />
                                                    Add Sibling
                                                </Button>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
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

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyMain);
