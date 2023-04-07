import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Form, Row, Collapse, Table, Input, Empty } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'pages/common/Common.module.css';
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

            onCloseAction: productHierarchyDataActions.changeHistoryVisible,
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
    const [openPanels, setOpenPanels] = React.useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const [closePanels, setClosePanels] = React.useState([]);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [isChildAllowed, setIsChildAllowed] = useState(true);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false, enable: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };
    const treeFieldNames = { ...fieldNames, label: fieldNames.title, value: fieldNames.key };

    let treeCodeId = '';
    let treeCodeReadOnly = false;

    const fnCanAddChild = (value) => value === 'Y';

    useEffect(() => {
        setCollapsableView(!isChildAllowed);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChildAllowed]);

    const tblPrepareColumns = ({ title, dataIndex }) => {
        return {
            title,
            dataIndex,
        };
    };

    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'Srl',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Attribute Name',
            dataIndex: 'AttributeName',
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Attribute Value',
            dataIndex: 'AttributeValue',
        })
    );

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
        console.log('hello');
        setIsVisible(true);
    };

    const handleEditBtn = () => {
        setForceFormReset(Math.random() * 10000);

        const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        formData && setFormData(formData?.data);
        setFormActionType('edit');

        setReadOnly(false);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true, enable: false });
    };

    const handleRootChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('rootChild');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true, enable: false });
    };

    const handleChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('child');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true, enable: true });
    };

    const handleSiblingBtn = () => {
        setForceFormReset(Math.random() * 10000);

        setFormActionType('sibling');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true, enable: false });
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

    const myProps = {
        isTreeViewVisible,
        handleTreeViewVisiblity,
        selectedTreeKey,
        selectedTreeSelectKey,
        fieldNames,
        handleTreeViewClick,
        treeData: productHierarchyData,
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
        titleOverride: formData?.id ? 'Edit ' : 'Add '.concat('Product Detail'),
    };
    const treeSelectFieldProps = {
        treeFieldNames,
        treeData: productHierarchyData,
        treeDisabled: treeCodeReadOnly || isReadOnly,
        selectedTreeSelectKey,
        handleSelectTreeClick,
        defaultValue: treeCodeId,
    };

    return (
        <>
            {isChildAllowed}
            <Row gutter={20} span={24}>
                <Col Col xs={16} sm={16} md={16} lg={16} xl={16}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                <Row gutter={20}>
                                    <Col xs={10} sm={10} md={10} lg={16} xl={16}>
                                        Hierarchy
                                        <Search
                                            placeholder="Search"
                                            style={{
                                                width: 300,
                                            }}
                                            allowClear
                                            // onSearch={onSearchHandle}
                                            // onChange={onChangeHandle}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.content}>
                        {productHierarchyData ? (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
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
                            </Col>
                        ) : (
                            <>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <LeftPanel {...myProps} />
                                </Col>
                            </>
                        )}
                    </div>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className={styles.padRight0}>
                    {isCollapsableView ? (
                        <>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={style.subheading}>
                                <div className={styles.contentHeaderBackground}>
                                    <Row gutter={20}>
                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                            Hierarchy Details
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </>
                    ) : null}

                    {true && (
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className={styles.contentHeaderBackground}>
                                <Row gutter={20}>
                                    <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                        <p style={{ fontSize: '16px', padding: '6px' }}>Hierarchy Details</p>
                                    </Col>
                                </Row>
                            </div>

                            <div className={styles.content}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={formData?.attributeKey} name="attributeKey" label="Attribute Level">
                                            {isChildAllowed}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={treeCodeId} label="Parent" name="parntProdctId">
                                            <TreeSelectField {...treeSelectFieldProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item label="Code" name="prodctCode" initialValue={formData?.prodctCode}>
                                            {formData.prodctCode}{' '}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="prodctShrtName" label="Short Description" initialValue={formData?.prodctShrtName}>
                                            {formData?.prodctShrtName}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item name="prodctLongName" label="Long Description" initialValue={formData?.prodctLongName}>
                                            {formData?.prodctLongName}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                                        <Form.Item initialValue={formData?.active === 'Y' ? 1 : 0} label="Status" name="active">
                                            <div className={styles.activeText}>Active</div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )}
                </Col>
            </Row>
            <ChangeHistory />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyMain);
