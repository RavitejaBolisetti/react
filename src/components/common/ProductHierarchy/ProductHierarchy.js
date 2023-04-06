import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Form, Row, Collapse, Table, Input } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';

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
    const [isCollapsableView, setCollapsableView] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [openPanels, setOpenPanels] = React.useState([]);

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
                formData && setFormData(res?.data);
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
    };

    return (
        <>
            <div className={styles.geoSection}>
                {isChildAllowed}
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={12} lg={16} xl={16} xxl={16}>
                        <div className={styles.contentHeaderBackground}>
                            <Row gutter={20} className={styles.searchAndLabelAlign}>
                                <Col xs={16} sm={16} md={16} lg={16} xl={16} className={style.subheading}>
                                    Hierarchy
                                    <Search
                                        placeholder="Search"
                                        style={{
                                            width: 300,
                                        }}
                                        // onChange={onChange}
                                        allowClear
                                        className={styles.searchField}
                                    />
                                    <Row gutter={20}>
                                        <div className={style.searchAndLabelAlign}>
                                            <Col xs={10} sm={10} md={10} lg={10} xl={10} className={style.subheading}></Col>
                                            <Col xs={14} sm={14} md={14} lg={14} xl={14}></Col>
                                        </div>
                                    </Row>
                                </Col>

                                <Col className={styles.buttonContainer} xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Button type="primary" onClick={changeHistoryModelOpen}>
                                        <FaHistory className={styles.buttonIcon} />
                                        Change History
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        <LeftPanel {...myProps} />
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8} className={styles.padRight0}>
                        {isCollapsableView ? (
                            <>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <div className={styles.contentHeaderBackground}>
                                        <Row gutter={20} className={styles.searchAndLabelAlign}>
                                            <Col xs={16} sm={16} md={16} lg={16} xl={16} className={style.subheading}>
                                                Hierarchy Details
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                    {isFormVisible && <AddEditForm {...formProps} />}
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                            {buttonData?.editBtn && (
                                                <Button danger onClick={() => handleEditBtn()}>
                                                    <FaEdit className={styles.buttonIcon} />
                                                    Edit
                                                </Button>
                                            )}

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

                                            {isFormVisible && (
                                                <>
                                                    {buttonData?.saveBtn && (
                                                        <Button htmlType="submit" danger>
                                                            <FaSave className={styles.buttonIcon} />
                                                            Save
                                                        </Button>
                                                    )}

                                                    {buttonData?.resetBtn && (
                                                        <Button danger onClick={handleResetBtn}>
                                                            <FaUndo className={styles.buttonIcon} />
                                                            Reset
                                                        </Button>
                                                    )}

                                                    {buttonData?.cancelBtn && (
                                                        <Button danger onClick={() => handleBack()}>
                                                            <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                                            Cancel
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </Form>
                            </>
                        ) : null}
                    </Col>
                </Row>
            </div>
            <ChangeHistory />
        </>
    );
};

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyMain);
