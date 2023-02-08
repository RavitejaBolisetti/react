import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';

import TreeView from 'components/common/TreeView';

import styles from 'pages/common/Common.module.css';
import { addToolTip } from 'utils/customMenuLink';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
// import { ParentHierarchy } from '../parentHierarchy/ParentHierarchy';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { ChangeHistory } from '../ChangeHistory';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ProductHierarchy: { isLoading, isLoaded: isDataLoaded = false, data: productHierarchyData = [] },
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

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const ProductHierarchyMain = ({ isChangeHistoryVisible, userId, isDataLoaded, productHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [parentCodeValue, setParentCodeValue] = useState();

    const [formData, setFormData] = useState([]);

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, childBtn: true, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Product Hierarchy' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            if (node.subProdct) {
                generateList(node.subProdct);
            }
        }
        return dataList;
    };

    const flatternData = generateList(finalGeoData);

    const handleTreeViewClick = (keys) => {
        setButtonData({ ...defaultBtnVisiblity });
        form.resetFields();
        setFormVisible(false);
        setFormData([]);

        if (keys && keys.length > 0) {
            const formData = flatternData.find((i) => keys[0] === i.key);
            formData && setFormData(formData?.data);

            setParentCodeValue(formData?.data?.parentCode);

            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setFormVisible(true);
            forceUpdate();
            setReadOnly(true);
        } else {
            setReadOnly(false);
        }
        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        setParentCodeValue(value);
        setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    const onFinish = (values) => {
        const onSuccess = (res) => {
            form.resetFields();
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: { ...values, id: formData?.id || '', active: values?.active ? 'Y' : 'N', parentCode: values?.parentCode || '', otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N' },
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

    const handleEditBtn = () => {
        setReadOnly(false);
        setButtonData({ ...defaultBtnVisiblity, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true });
    };

    const handleChildBtn = () => {
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        setSelectedTreeKey([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleSiblingBtn = () => {
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setParentCodeValue();
        setButtonData({ ...defaultBtnVisiblity, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleResetBtn = () => {
        form.resetFields();
    };

    const handleBack = () => {
        setReadOnly(true);
        if (selectedTreeKey && selectedTreeKey.length > 0) {
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
        } else {
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        }
    };
    const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };

    return (
        <>
            <div className={styles.geoSection}>
                <Row gutter={20}>
                    <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisiblity}>
                        {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                    </div>
                </Row>
                <Row gutter={20}>
                    {isTreeViewVisible ? (
                        <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                            <div className={styles.leftpanel}>
                                <div className={styles.treeViewContainer}>
                                    <div className={styles.treemenu}>
                                        <TreeView selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} fieldNames={fieldNames} handleTreeViewClick={handleTreeViewClick} dataList={productHierarchyData} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ) : undefined}

                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.padRight0}>
                        {isChangeHistoryVisible ? (
                            <ChangeHistory />
                        ) : (
                            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                {isFormVisible && <AddEditForm selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} isReadOnly={isReadOnly} formData={formData} productHierarchyData={productHierarchyData} handleSelectTreeClick={handleSelectTreeClick} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} setIsModalOpen={setIsModalOpen} />}
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                                        {buttonData?.editBtn && (
                                            <Button danger onClick={() => handleEditBtn()}>
                                                <FaEdit className={styles.buttonIcon} />
                                                Edit
                                            </Button>
                                        )}

                                        {buttonData?.childBtn && (
                                            <Button danger onClick={() => handleChildBtn()}>
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
                        )}
                    </Col>
                </Row>

                {/* <ParentHierarchy title={'Parent Hierarchy'} dataList={productHierarchyData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} /> */}
            </div>
        </>
    );
};

export const ProductHierarchy = connect(mapStateToProps, mapDispatchToProps)(ProductHierarchyMain);
