import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, Collapse, Table, Input } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';

import TreeView from 'components/common/TreeView';

import styles from 'pages/common/Common.module.css';
import { ROUTING_COMMON_PRODUCT_MASTER } from 'constants/routing';
import { addToolTip } from 'utils/customMenuLink';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { AddEditForm } from './AddEditForm';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { ChangeHistory } from '../ChangeHistory';
import { ProductMasterPage } from 'pages/common/ProductMaster/ProductMasterPage';
import { ProductMaster } from 'pages/common/ProductHierarchy/ProductMaster';
import { validateRequiredInputField } from 'utils/validation';
const { Panel } = Collapse;

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
    const [collapsable, setCollapsable] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const [isFormVisible, setFormVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const navigate = useNavigate();
    const [isProductMaster, setProductMaster] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false ,enable:false};
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const rendFn = (key) => {
        return (
            <Form form={form}>
                <Form.Item name={key} rules={[validateRequiredInputField('Enter data')]}>
                    <Input placeholder={key} />
                </Form.Item>
            </Form>
        );
    };
    const tblPrepareColumns = ({ title, dataIndex }) => {
        return {
            title,
            dataIndex,
        };
    };
    const dataSource = [
        {
            Srl: '1',
            AttributeName: 'Sample',
            AttributeValue: rendFn('Sample'),
        },
        {
            Srl: '2',
            AttributeName: 'Sample',
            AttributeValue: rendFn('Sample2'),
        },
        {
            Srl: '3',
            AttributeName: 'Sample',
            AttributeValue: rendFn('Sample3'),
        },
        {
            Srl: '4',
            AttributeName: 'Sample',
            AttributeValue: rendFn('Sample4'),
        },
    ];
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
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Product Hierarchy' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            if (node.subProdct) {
                generateList(node.subProdct);
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
        } else {
            setButtonData({ ...defaultBtnVisiblity, rootChildBtn: true });
            setReadOnly(false);
        }
        setSelectedTreeKey(keys);
    };

    const handleSelectTreeClick = (value) => {
        // setSelectedTreeKey([value]);
        setSelectedTreeSelectKey(value);
    };

    const onFinish = (values) => {
        const recordId = formData?.id || '';
        const codeToBeSaved = Array.isArray(values?.parentCode) ? values?.parentCode[0] : values?.parentCode || '';

        const data = { ...values, id: formData?.id || '', active: values?.active ? 'Y' : 'N', parentCode: codeToBeSaved, otfAmndmntAlwdInd: values?.otfAmndmntAlwdInd || 'N' };
        const formUpdatedData = { ...data, parntProdctId: codeToBeSaved, prodctShrtName: values?.shortName, prodctLongName: values?.longName };
        const onSuccess = (res) => {
            form.resetFields();
            setForceFormReset(Math.random() * 10000);

            setReadOnly(true);
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
            setFormVisible(true);
            formData && setFormData(formUpdatedData);

            if (selectedTreeKey && selectedTreeKey.length > 0) {
                !recordId && setSelectedTreeKey(codeToBeSaved);
                setFormActionType('view');
            }
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
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
        form.validateFields().then((values) => {});
    };

    const handleEditBtn = () => {
        setForceFormReset(Math.random() * 10000);

        const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
        formData && setFormData(formData?.data);
        setFormActionType('edit');

        setReadOnly(false);
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true , enable:false});
    };

    const handleRootChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('rootChild');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true,enable: false });
    };

    const handleChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('child');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true ,enable: true});
        setCollapsable(!collapsable);
    };

    const handleSiblingBtn = () => {
        setForceFormReset(Math.random() * 10000);

        setFormActionType('sibling');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true,enable:false });
    };

    const handleResetBtn = () => {
        setForceFormReset(Math.random() * 10000);
        form.resetFields();
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
                        ) : collapsable ? (
                            <>
                                {' '}
                                <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                                    <Panel header="Product Details" key="1">
                                        {/* <AddEditForm showAttributeDetail={true} /> */}
                                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                        {isFormVisible && <AddEditForm setSelectedTreeKey={setSelectedTreeKey} isChecked={isChecked} setIsChecked={setIsChecked} flatternData={flatternData} formActionType={formActionType} selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} isReadOnly={isReadOnly} formData={formData} productHierarchyData={productHierarchyData} handleSelectTreeClick={handleSelectTreeClick} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} setIsModalOpen={setIsModalOpen}/>}
                                       
                                        <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    { (
                                            <>
                                                { (
                                                    <Button htmlType="submit" danger>
                                                        <FaSave className={styles.buttonIcon} />
                                                        Save
                                                    </Button>
                                                )}
                                                {(
                                                    <Button danger onClick={() => handleEditBtn()}>
                                                        <FaEdit className={styles.buttonIcon} />
                                                            Edit
                                                    </Button>
                                                )}
                                                 
                                                { (
                                                    <Button danger onClick={()=>handleResetBtn()}>
                                                        <FaUndo className={styles.buttonIcon} />
                                                        Reset
                                                    </Button>
                                                )}

                                                { (
                                                    <Button danger onClick={() => handleRootChildBtn()}>
                                                        <FaUserPlus className={styles.buttonIcon} />
                                                            Add Child
                                                    </Button>
                                                )}
                                                <Button danger >
                                                        <FaUndo className={styles.buttonIcon} />
                                                        View Attribute Detail
                                                    </Button>
                                            </>
                                        )}
                                        </Col>
                                        </Row>
                                 </Form>
                                    </Panel>
                                    
                                </Collapse>
                                <Collapse defaultActiveKey={['1']} expandIconPosition="end" >
                                    <Panel header="Product Attributes Details (Mahindra Scorpio Classic Petrol)" key="2" >
                                        <Table style={{ fontSize: '40px' }} columns={tableColumn} dataSource={dataSource} pagination={false} />
                                        <Form>
                                            <Form.Item>
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.buttonContainer}>
                                                            <Button danger>
                                                                <FaSave className={styles.buttonIcon} />
                                                                Save
                                                            </Button>
                                                        </div>
                                                        
                                                    </Col>
                                                </Row>
                                            </Form.Item>
                                        </Form>
                                    </Panel>
                                </Collapse>
                            </>
                        ) : (
                            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                {isFormVisible && <AddEditForm setSelectedTreeKey={setSelectedTreeKey} isChecked={isChecked} setIsChecked={setIsChecked} flatternData={flatternData} formActionType={formActionType} selectedTreeKey={selectedTreeKey} selectedTreeSelectKey={selectedTreeSelectKey} isReadOnly={isReadOnly} formData={formData} productHierarchyData={productHierarchyData} handleSelectTreeClick={handleSelectTreeClick} isDataAttributeLoaded={isDataAttributeLoaded} attributeData={attributeData} setIsModalOpen={setIsModalOpen} />}
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
                                            <Button danger onClick={() => handleChildBtn()}>
                                                <FaUserPlus className={styles.buttonIcon} />
                                                Add Childs
                                            </Button>
                                        )}

                                        {buttonData?.siblingBtn && (
                                            <Button danger onClick={() => handleSiblingBtn()}>
                                                <FaUserFriends className={styles.buttonIcon} />
                                                Add Sibling
                                            </Button>
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
