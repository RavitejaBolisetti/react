import React, { useState, useReducer} from 'react';
import { Table, Switch, Form, Select, Row, Col, Button,  Input,  Collapse } from 'antd';
import { FaSave, FaUserFriends, FaUserPlus, FaEdit, FaUndo, FaSearch,FaAngleDoubleLeft,FaAngleDoubleRight } from 'react-icons/fa';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import { ChangeHistory } from 'components/common/ChangeHistory';
import { ParentHierarchy } from 'components/common/parentHierarchy/ParentHierarchy';
import { addToolTip } from 'utils/customMenuLink';
import TreeView from 'components/common/TreeView';


import styles from '../Common.module.css';
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

const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
};



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
const { TextArea } = Input;
const { Panel } = Collapse;

export const ProductMasterPageBase = ({productHierarchyData, attributeData}) => {

    const finalGeoData = productHierarchyData?.map((i) => {
        return { ...i, geoParentData: attributeData?.find((a) => i.attributeKey === a.hierarchyAttribueId) };
    });
    
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);
    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [isFormVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState([]);
    const [formActionType, setFormActionType] = useState('');
    const flatternData = generateList(finalGeoData);
    const [isReadOnly, setReadOnly] = useState(false);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);

   
    const rendFn = (key) => {
        return (
            <Form form={form}>
                <Form.Item name={key} rules={[validateRequiredInputField('Enter data')]}>
                    <Input placeholder={key} />
                </Form.Item>
            </Form>
        );
    };
    const onSubmit = (e) => {
        form.validateFields()
            .then((err, values) => {
                // console.log('🚀 ~ file: GeoPage.js:17 ~ validateFields ~ values', values, err);
            })
            .catch((errorInfo) => {
                // console.log('🚀 ~ file: GeoPage.js:20 ~ validateFields ~ errorInfo', errorInfo);
            });
    };
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);
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

    const tblPrepareColumns = ({ title, dataIndex }) => {
        return {
            title,
            dataIndex,
            // render:rendFn,
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
    const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };

      return (
        <>
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
                   
       
                <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.paddingRightZero}>
                    {isChangeHistoryVisible ? (
                        <ChangeHistory />
                    ) : (
                        <div className="right col" style={{ padding: '0' }}>
                            <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                                <Panel header="Product Details" key="1">
                                    <Form layout="vertical">
                                        <Row gutter={20}>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Attribute Level" label="Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                                                    <Select
                                                        defaultValue="Mahindra Bolero"
                                                        options={[
                                                            { value: 'Mahindra Scorpio', label: 'Mahindra Scorpio' },
                                                            { value: 'Mahindra KUV100 NXT', label: 'Mahindra KUV100 NXT' },
                                                            { value: 'Mahindra Scorpio Classic', label: 'Mahindra Scorpio Classic' },
                                                            { value: 'Mahindra Thar', label: 'Mahindra Thar' },
                                                            { value: 'Mahindra Bolero', label: 'Mahindra Bolero' },
                                                        ]}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                                <Form.Item
                                                    label="Parent"
                                                    name="Parent"
                                                    className="control-label-blk"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Select a parent !',
                                                        },
                                                    ]}
                                                >
                                                    <Input.Group compact>
                                                        <Input
                                                            style={{
                                                                width: 'calc(100% - 48px)',
                                                            }}
                                                            //  readOnly={props.editableFormContent.editParent}
                                                            name="Parent"
                                                            placeholder="Parent"
                                                            className={styles.inputBox}
                                                        />

                                                        <Button
                                                            type="primary"
                                                            id="hierarchyChange"
                                                            className="btn btn-outline srchbtn mr0 boxShdwNon"
                                                            // disabled={props.editableFormContent.editParent}
                                                            onClick={() => setIsModalOpen(true)}
                                                        >
                                                            <FaSearch />
                                                        </Button>
                                                    </Input.Group>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Code" label="Code" rules={[validateRequiredInputField('Code')]}>
                                                    <Input placeholder="Type code here" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Short Description" label="Short Description" rules={[validateRequiredInputField('Short Description')]}>
                                                    <Input placeholder="Type here" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Long Desciption" label="Long Description" rules={[validateRequiredInputField('Long Description')]}>
                                                    <TextArea rows={1} placeholder="Type here" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Form.Item name="Active inactive button" label="Status">
                                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <div className={styles.buttonContainer}>
                                                    <Button danger>
                                                        <FaEdit className={styles.buttonIcon} />
                                                        Edit
                                                    </Button>

                                                    <Button danger>
                                                        <FaUserPlus className={styles.buttonIcon} />
                                                        Add Child
                                                    </Button>

                                                    <Button danger>
                                                        <FaUserFriends className={styles.buttonIcon} />
                                                        Add Sibling
                                                    </Button>

                                                    <Button htmlType="submit" danger onClick={onSubmit}>
                                                        <FaSave className={styles.buttonIcon} />
                                                        Save
                                                    </Button>

                                                    <Button danger>
                                                        <FaUndo className={styles.buttonIcon} />
                                                        Reset
                                                    </Button>
                                                    <Button danger>
                                                        <FaUndo className={styles.buttonIcon} />
                                                        View Attribute Detail
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Panel>
                            </Collapse>

                            <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                                <Panel header="Product Attributes Details (Mahindra Scorpio Classic Petrol)" key="2">
                                    <Table style={{ fontSize: '40px' }} columns={tableColumn} dataSource={dataSource} onChange={onChange} />
                                    <Form>
                                        <Form.Item>
                                            <div className={styles.buttonContainer}>
                                                <Button danger>
                                                    <FaSave className={styles.buttonIcon} />
                                                    Edit
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Panel>
                            </Collapse>
                        </div>
                    )}
                </Col>
            </Row>
            <ParentHierarchy title={'Parent Hierarchy'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
};
export const ProductMasterPage = withLayoutMaster(ProductMasterPageBase);
