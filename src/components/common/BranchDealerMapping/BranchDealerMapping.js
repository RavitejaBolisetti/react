import React, { useEffect, useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Form, Row, Checkbox, Input, Select, Switch, Space, DatePicker, Collapse, Tree, Card } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';
import { addToolTip } from 'utils/customMenuLink';
import TreeView from 'components/common/TreeView';

import styles from 'pages/common/Common.module.css';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';
import { ChangeHistory } from '../ChangeHistory';

const { Option } = Select;
const { Panel } = Collapse;
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
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
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
    const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [value, setValue] = useState(['0-0-0']);
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
        console.log(form);
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
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: false, cancelBtn: true });
    };

    const handleRootChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('rootChild');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleChildBtn = () => {
        setForceFormReset(Math.random() * 10000);
        setFormActionType('child');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
    };

    const handleSiblingBtn = () => {
        setForceFormReset(Math.random() * 10000);

        setFormActionType('sibling');
        setFormVisible(true);
        setReadOnly(false);
        setFormData([]);
        form.resetFields();
        setButtonData({ ...defaultBtnVisiblity, rootChildBtn: false, childBtn: false, saveBtn: true, resetBtn: true, cancelBtn: true });
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

    const [form] = Form.useForm();
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    const onReset = () => {
        form.resetFields();
    };
    const TableRenderer = () => {
        return <></>;
    };
    const onClick = (e) => {
        if (e === '') {
            form.validateFields(['division']);
        }
        console.log(e);
    };
    const DivisionDetailsFetch = () => {
        return (
            <Form.Item
                name="division"
                rules={[
                    {
                        required: true,
                        message: 'Please input  division',
                    },
                ]}
            >
                <Select placeholder="Select">
                    <Select.Option value="">Select</Select.Option>
                    <Select.Option value="Sales">Sales</Select.Option>
                    <Select.Option value="Service">Service</Select.Option>
                    <Select.Option value="Spares">Spares</Select.Option>
                    <Select.Option value="HR">HR</Select.Option>
                    <Select.Option value="Admin">Admin</Select.Option>
                </Select>
            </Form.Item>
        );
    };
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
    const disabledProps = { disabled: false };
    const Formitems = () => {
        return (
            <Form form={form} name="control-hooks" layout="vertical" onFinish={onFinish}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            name="Attribute Level"
                            label="Attribute Level"
                            rules={[
                                {
                                    required: true,
                                    message: 'Select an option'
                                },
                            ]}
                        >
                            <Select placeholder="Select a option and change input text above" allowClear>
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
                                    message: 'Select an option'
                                },
                            ]}
                        >
                            <Select placeholder="Select a option and change input text above" allowClear>
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
                                    message: 'Code must be maximum 5 characters.' 
                                },
                                { 
                                    required: true, 
                                    message: 'Please Enter Code' 
                                },
                                { 
                                    min: 5, 
                                    message: 'Code must be maximum 5 characters.' 
                                },
                            ]}
                        >
                            <Input />
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
                            <Input />
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
                            <Input />
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
                            <Input />
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
                            <Input />
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
                            <Input />
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
                            <Input />
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
                            <Input />
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
                                <Switch value={formData?.isActive === 'Y' ? 1 : 0} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked {...disabledProps} />
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
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    };
    //tree for the product hierarchy
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1']);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
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
    const FormitemsNew = () => {
        return (
            <Row gutter={20}>
                <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}>
                    <Card style={{ overflowY: 'scroll', height: '300px' }}>
                        <Tree checkable onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent} onCheck={onCheck} checkedKeys={checkedKeys} onSelect={onSelect} selectedKeys={selectedKeys} showLine={true} treeData={treeData} />
                    </Card>
                </Col>
                <Col xs={15} sm={15} md={15} lg={15} xl={15} xxl={15}>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item
                                name="Attribute Type"
                                label="Attribute Type"
                                rules={[
                                    {
                                        required: true,
                                        message: ' Select  an option ',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a option and change input text above"
                                    style={{
                                        height: '15px !important',
                                    }}
                                    allowClear
                                >
                                    <Option value="Primary">Primary</Option>
                                    <Option value="Secondary">Secondary</Option>
                                    <Option value="other">other</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item
                                name="Token"
                                label="Token"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter Token',
                                    },
                                    {
                                        max: 50,
                                        message: 'Token must be maximum 50 characters.',
                                    },
                                ]}
                            >
                                <Input style={{ height: '36px' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        {' '}
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                            <Space>
                                <Button danger>
                                    <FaSave className={styles.buttonIcon} />
                                    Validate
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Space direction="vertical">
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="Employee Name"
                                    label="Employee Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Name',
                                        },
                                        {
                                            max: 50,
                                            message: 'Name must be maximum 5 characters.',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}></Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="Primary/Secondary"
                                    label="Primary/Secondary"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select an option',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select a option and change input text above"
                                        style={{
                                            height: '15px !important',
                                        }}
                                        allowClear
                                    >
                                        <Option value="Primary">Primary</Option>
                                        <Option value="Secondary">Secondary</Option>
                                        <Option value="other">other</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item
                                    name="Effective Date"
                                    label="Effective Date"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Select a Range',
                                        },
                                    ]}
                                    allowClear
                                >
                                    <RangePicker style={{ height: '36px' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Space>
                </Col>
            </Row>
        );
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

                        <Col xs={24} sm={24} md={isTreeViewVisible ? 16 : 24} lg={isTreeViewVisible ? 16 : 24} xl={isTreeViewVisible ? 16 : 24} xxl={isTreeViewVisible ? 16 : 24}>
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <Collapse bordered={true} expandIconPosition={'end'}>
                                    <Panel header="Dealer Branch" key="1">
                                        <Formitems />
                                    </Panel>
                                </Collapse>
                                <Collapse bordered={true} expandIconPosition={'end'}>
                                    <Panel header="Product Hierarchy Mapping" key="1">
                                        <FormitemsNew />
                                    </Panel>
                                </Collapse>
                                <Row gutter={20} justify="end" className={styles.buttonContainer}><Space>
                                <Button danger onClick={() => handleBack()}>
                                        <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                        Cancel
                                    </Button>

                                    <Button danger onClick={handleResetBtn}>
                                        <FaUndo className={styles.buttonIcon} />
                                        Reset
                                    </Button>

                                    <Button htmlType="submit" danger>
                                        <FaSave className={styles.buttonIcon} />
                                        Save
                                    </Button>
                                </Space>
                                    
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
};

export const BranchDealerMapping = connect(null, null)(BranchDealerMappingMain);
