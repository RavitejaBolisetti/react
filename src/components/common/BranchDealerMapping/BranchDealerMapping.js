import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Form, Row, Checkbox, Input, Select, Switch, Space, DatePicker, Collapse, Tree, Card, Modal, Divider, Table } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle, FaRegCheckCircle, FaBullhorn, FaLongArrowAltLeft } from 'react-icons/fa';
import { EditOutlined } from '@ant-design/icons';
import { addToolTip } from 'utils/customMenuLink';
import TreeView from 'components/common/TreeView';

import styles from 'pages/common/Common.module.css';
import styles2 from './BranchDealerMapping.module.css';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { ChangeHistory } from '../ChangeHistory';
import { DataTable } from 'utils/dataTable';
import { tblPrepareColumns } from 'utils/tableCloumn';

const { Option } = Select;
const { Panel } = Collapse;
const { success: successModel, error: errorModel } = Modal;
const { RangePicker } = DatePicker;

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
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShformDataowLoading,
        },
        dispatch
    ),
});

export const BranchDealerMappingMain = ({ isChangeHistoryVisible, userId, isDataLoaded, productHierarchyData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading, isDataAttributeLoaded, attributeData, hierarchyAttributeListShowLoading }) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    const [isFormVisible, setFormVisible] = useState(false);
    const [isCollapsible, setCollapsible] = useState(true);
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const [data, setRowsData] = useState([]);

    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [value, setValue] = useState(['0-0-0']);
    const [isChildVisible, setChildVisible] = useState(true);
    const disabledProps = { disabled: isReadOnly };
    const [open, setOpen] = useState([]);
    const [open2, setOpen2] = useState([]);
    const [isValid, setValid] = useState(false);

    const treeData = [
        {
            title: 'parent 1',
            key: '0-0',

            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',

                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                        },
                        {
                            title: (
                                <>
                                    <div>multiple line title</div>
                                    <div>multiple line title</div>
                                </>
                            ),
                            key: '0-0-0-1',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-2',
                        },
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',

                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-1-0',
                        },
                    ],
                },
                {
                    title: 'parent 1-2',
                    key: '0-0-2',

                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-2-0',
                        },
                        {
                            title: 'leaf',
                            key: '0-0-2-1',
                        },
                    ],
                },
            ],
        },
        {
            title: 'parent 2',
            key: '0-1',

            children: [
                {
                    title: 'parent 2-0',
                    key: '0-1-0',

                    children: [
                        {
                            title: 'leaf',
                            key: '0-1-0-0',
                        },
                        {
                            title: 'leaf',
                            key: '0-1-0-1',
                        },
                    ],
                },
            ],
        },
    ];

    useEffect(() => {
        if (!isDataLoaded) {
            // fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded, isDataAttributeLoaded]);

    useEffect(() => {
        // hierarchyAttributeFetchList({ setIsLoading: hierarchyAttributeListShowLoading, userId, type: 'Product Hierarchy' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forceFormReset]);
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Product',
            dataIndex: 'product',
            sorter: false,
            // render: (text) => convertDateTime(text),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Category',
            dataIndex: 'Category',
            sorter: false,

            // render: (text) => convertDateTime(text),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'From Date',
            dataIndex: 'fromDate',
            sorter: false,

            // render: (text) => convertDateTime(text),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'To Date',
            dataIndex: 'toDate',
            sorter: false,

            // render: (text) => convertDateTime(text),
        })
    );
    tableColumn.push(
        tblPrepareColumns({
            title: 'Action',
            dataIndex: 'action',
            // render: (text) => convertDateTime(text),
            sorter: false,

            render: () => [
                <Space wrap>
                    <EditOutlined />
                    {/* <DeleteOutlined onClick={showConfirm} /> */}
                </Space>,
            ],
        })
    );

    const finalGeoData = productHierarchyData?.map((i) => {
        return { ...i, geoParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
    });

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
    const handleValidity = () => {
        // setValid(true);
    };
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

    const onFinish = (values) => {
        setButtonData({ ...defaultBtnVisiblity, saveBtn: true, resetBtn: true, cancelBtn: true, childBtn: false, rootChildBtn: false });
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
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true });
    };

    const handleRootChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('rootChild');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: true, editBtn: true, siblingBtn: true });
    };

    const handleChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('child');
        setCollapsible(true);
        setFormVisible(false);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true, siblingBtn: false, editBtn: false });
    };

    const handleSiblingBtn = () => {
        setForceFormReset(Math.random() * 10000);

        setFormActionType('sibling');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true, editBtn: false });
    };

    const handleResetBtn = () => {
        setForceFormReset(Math.random() * 10000);
        form.resetFields();
    };
    const handleDrawer = () => {};
    const handleBack = () => {
        setReadOnly(true);
        setOpen('0');
        setOpen2('0');

        setForceFormReset(Math.random() * 10000);
        if (selectedTreeKey && selectedTreeKey.length > 0) {
            const formData = flatternData.find((i) => selectedTreeKey[0] === i.key);
            formData && setFormData(formData?.data);
            setFormActionType('view');
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, rootChildBtn: false, childBtn: true, siblingBtn: true });
        } else {
            setFormActionType('');
            setFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
        }
    };
    const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };

    const [form] = Form.useForm();

    const Leftpane = () => {
        return (
            <>
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
            </>
        );
    };

    const Formitems = () => {
        return (
            <>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Attribute Level"
                            label="Attribute Level"
                            rules={[
                                {
                                    required: true,
                                    message: 'Select an option',
                                },
                            ]}
                        >
                            <Select placeholder="Enter Data" allowClear>
                                <Option value="Nothing2">Nothing2</Option>
                                <Option value="Nothing1">Nothing1</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Parent"
                            label="Parent"
                            rules={[
                                {
                                    required: true,
                                    message: 'Select an option',
                                },
                            ]}
                        >
                            <Select placeholder="Enter Data" allowClear>
                                <Option value="Nothing2">Nothing2</Option>
                                <Option value="Nothing1">Nothing1</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Branches Code"
                            label="Branches Code"
                            rules={[
                                {
                                    max: 5,
                                    message: 'Code must be maximum 5 characters.',
                                },
                                {
                                    required: true,
                                    message: 'Please Enter Code',
                                },
                                {
                                    min: 5,
                                    message: 'Code must be maximum 5 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Short Description/Branch Name"
                            label="Short Description/Branch Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Short Description/Branch Name',
                                },
                                {
                                    max: 50,
                                    message: 'Short Description/Branch Name must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Long Description"
                            label="Long Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Long Description',
                                },
                                {
                                    max: 50,
                                    message: 'Long Description must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Branch Address"
                            label="Branch Address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Branch Address',
                                },
                                {
                                    max: 50,
                                    message: 'Branch Address must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Locality"
                            label="Locality"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Locality',
                                },
                                {
                                    max: 50,
                                    message: 'Locality must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="City"
                            label="City"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter City',
                                },
                                {
                                    max: 50,
                                    message: 'City must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="State"
                            label="State"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter State',
                                },
                                {
                                    max: 50,
                                    message: 'State must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="District"
                            label="District"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter District',
                                },
                                {
                                    max: 50,
                                    message: 'District must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Status"
                            label="Status"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={formData?.isActive === 'Y' ? 1 : 0}
                        >
                            <Form.Item>
                                <Switch initialValue={formData?.isActive === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
                            </Form.Item>
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Company"
                            label="Company"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Company',
                                },
                                {
                                    max: 50,
                                    message: 'Company must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Data" />
                        </Form.Item>
                    </Col>
                </Row>
            </>
        );
    };
    const FormitemsNew = () => {
        return (
            <>
                <Row gutter={20}>
                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                        <Form.Item
                            name="Token"
                            label="Enter Token No."
                            rules={[
                                {
                                    required: true,
                                    message: 'Enter Token No',
                                },
                                {
                                    max: 50,
                                    message: 'Token must be maximum 50 characters.',
                                },
                            ]}
                        >
                            <Input placeholder="Enter Token No" style={{ height: '36px' }} />
                        </Form.Item>
                    </Col>
                    <Col xs={14} sm={14} md={14} lg={14} xl={14} className={styles2.validBtn}>
                        <Button onClick={handleValidity} danger>
                            <FaSave className={styles.buttonIcon} />
                            Validate
                        </Button>
                    </Col>
                </Row>
                {!isValid && (
                    <Space direction="vertical" style={{ display: 'flex' }}>
                        <Row gutter={20} style={{ padding: '10px 0px 0px 10px' }}>
                            User Details
                            <Divider type="horizontal" style={{ margin: '0px' }} />
                        </Row>
                        <Row gutter={20} style={{ padding: '5px 10px 10px 10px' }}>
                            Employee Details:
                        </Row>

                        <Row gutter={20} className={styles2.rowBgColor}>
                            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                Product Dealer Mapping
                            </Col>
                            <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles2.floatRight}>
                                {' '}
                                {buttonData?.saveBtn && (
                                    <Button onClick={handleDrawer} danger>
                                        <FaSave className={styles.buttonIcon} />
                                        Add Product-Dealer
                                    </Button>
                                )}
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Table dataSource={[...data]} columns={tableColumn} bordered />
                            </Col>
                        </Row>
                    </Space>
                )}
            </>
        );
    };
    //tree for the product hierarchy
    const [expandedKeys, setExpandedKeys] = useState();
    const [checkedKeys, setCheckedKeys] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };
    const handlecollapse1 = () => {
        if (open === '1') {
            setOpen('');
        } else {
            setOpen('1');
            setOpen2('');
        }
    };

    const handlecollapse2 = () => {
        if (open2 === '1') {
            setOpen2('');
        } else {
            setOpen('');
            setOpen2('1');
        }
    };

    const [expandIconPosition, setExpandIconPosition] = useState('end');
    return (
        <>
            <Form form={form} name="control-hooks" layout="vertical" onFinish={onFinish}>
                <div className={styles.geoSection}>
                    <Row gutter={20}>
                        <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisiblity}>
                            {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                        </div>
                    </Row>

                    <Row gutter={20}>
                        <Leftpane />
                        <Col xs={24} sm={24} md={isTreeViewVisible ? 12 : 24} lg={isTreeViewVisible ? 16 : 24} xl={isTreeViewVisible ? 16 : 24}>
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    display: 'flex',
                                }}
                            >
                                {isCollapsible && (
                                    <>
                                        <Row gutter={20} className={styles2.rowBgColor}>
                                            <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                                                New Dealer Details
                                            </Col>
                                            <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles2.floatRight}>
                                                {' '}
                                                <Space layout="horizontal" style={{ display: 'flex' }}>
                                                    {buttonData?.saveBtn && (
                                                        <Button htmlType="submit" danger>
                                                            <FaSave className={styles.buttonIcon} />
                                                            Save
                                                        </Button>
                                                    )}

                                                    {buttonData?.cancelBtn && (
                                                        <Button danger onClick={() => handleBack()}>
                                                            <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                                            Cancel
                                                        </Button>
                                                    )}

                                                    {buttonData?.resetBtn && (
                                                        <Button danger onClick={handleResetBtn}>
                                                            <FaUndo className={styles.buttonIcon} />
                                                            Reset
                                                        </Button>
                                                    )}

                                                    {buttonData?.saveBtn && (
                                                        <Button htmlType="submit" danger>
                                                            <FaLongArrowAltLeft className={styles.buttonIcon} />
                                                            Exit
                                                        </Button>
                                                    )}
                                                </Space>
                                            </Col>
                                        </Row>

                                        <Collapse activeKey={open} onChange={handlecollapse1} bordered={true} expandIconPosition={'end'}>
                                            {/* error haI ISME */}
                                            <Panel header="Dealer Branch" key="1">
                                                <Formitems />
                                            </Panel>
                                        </Collapse>
                                        <Collapse activeKey={open2} onChange={handlecollapse2} bordered={true} expandIconPosition={'end'}>
                                            <Panel header="Product Hierarchy Mapping" key="1">
                                                <FormitemsNew />
                                            </Panel>
                                        </Collapse>
                                    </>
                                )}
                            </Space>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};

export const BranchDealerMapping = connect(null, null)(BranchDealerMappingMain);
