import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table, Switch, Form, Select, Row, Col, Button, Modal, Input, Space, Collapse } from 'antd';

import { FaSave, FaUserFriends, FaUserPlus, FaEdit, FaUndo, FaSearch } from 'react-icons/fa';
import { FaLongArrowAltLeft, FaAngleDoubleRight, FaAngleDoubleLeft, FaHistory } from 'react-icons/fa';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { ExclamationCircleFilled } from '@ant-design/icons';

import TreeView from 'components/common/TreeView';
import { ChangeHistory } from '../ChangeHistory/ChangeHistory';

import MetaTag from 'utils/MetaTag';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';
import { ROUTING_DASHBOARD } from 'constants/routing';
import ParentHierarchy from '../Geo/ParentHierarchy';


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const { confirm } = Modal;
const { TextArea } = Input;
const { Panel } = Collapse;
export const ProductMasterPageBase = () => {
    const [attri, setAttri] = useState(false);
    const [bottom, setBottom] = useState('bottomLeft');
    const [form] = Form.useForm();
    const navigate = useNavigate();

    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavourite, setFavourite] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);
    const handleattri = () => {
        setAttri(!attri);
        console.log(attri);
    }
    
    const onSubmit = (e) => {

        form.validateFields()
            .then((err, values) => {
                console.log('🚀 ~ file: GeoPage.js:17 ~ validateFields ~ values', values, err);
            })
            .catch((errorInfo) => {
                console.log('🚀 ~ file: GeoPage.js:20 ~ validateFields ~ errorInfo', errorInfo);
            })
    }

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const columns = [
        {
            title: 'Srl.',
            dataIndex: 'Srl',

            width: "10%",
        },


        {
            title: 'Attribute Name',
            dataIndex: 'AttributeName',

            width: "30%",
        },
        {
            title: 'Attribute Value',
            render: (key) => <Form form={form}><Form.Item name={key} rules={[validateRequiredInputField('Enter data')]}>
                <Input placeholder={key} />
            </Form.Item></Form>,
            // dataIndex: 'AttributeValue',
            dataIndex: 'AttributeValue',

            width: "30%",
        },









    ];

    const [dataSource, setDataSource] = useState([
        {
            Srl: "1.",
            AttributeName: "	Product Division",
            AttributeValue: "Enter Product Division"



        },
        {
            Srl: "2.",
            AttributeName: "Model Group",
            AttributeValue: "Enter Model Group "

        },
        {
            Srl: "3.",
            AttributeName: "Sales Model Group",
            AttributeValue: "Enter Sales Model Group",

        },
        {
            Srl: "4.",
            AttributeName: "Model Family",
            AttributeValue: "Enter Model Family",


        },
        {
            Srl: "5.",
            AttributeName: "Vehicle Type",
            AttributeValue: "Enter Vehicle Type",


        },
        {
            Srl: "6.",
            AttributeName: "Vehicle Category",
            AttributeValue: "Enter Vehicle Category"


        },
        {
            Srl: "7.",
            AttributeName: "Body Type",
            AttributeValue: "Enter Body Type"


        },
        {
            Srl: "8.",
            AttributeName: "Vehicle Category Type",
            AttributeValue: "Enter Vehicle Category Type"


        },
        {
            Srl: "9.",
            AttributeName: "Seating Capacity",
            AttributeValue: "Enter Seating Capacity"


        },
        {
            Srl: "10.",
            AttributeName: "Trim Level",
            AttributeValue: "Enter Trim Level"


        },



    ])
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);

    };

    const showConfirm = () => {
        confirm({
            title: 'Are you sure to leave this page?',
            icon: <ExclamationCircleFilled />,
            content: 'If you leave this page, All unsaved data will be lost',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            cancelType: 'danger',
            onOk() {
                navigate(-1) || navigate(ROUTING_DASHBOARD);
            },
            onCancel() {},
        });
    };
    const handleTreeViewVisibleClink = () => setTreeViewVisible(!isTreeViewVisible);

    const handleFavouriteClick = () => setFavourite(!isFavourite);
    const toggleHistory = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
    };

    return (

        <>

            <MetaTag metaTitle={'Product Master'} />
            <Row gutter={20}>
                <Col xs={16} sm={24} md={12} lg={18} xl={18} xxl={18}>
                    <Space>
                        <div>
                            <span className={styles.headingGradient}>Product Master</span>
                        </div>
                        <div className={styles.favIconHeading}>{isFavourite ? <BsStarFill color="#ff3e5b" size={18} onClick={handleFavouriteClick} /> : <BsStar size={18} onClick={handleFavouriteClick} />}</div>
                    </Space>
                </Col>

                <Col xs={8} sm={24} md={12} lg={6} xl={6} xxl={6}>
                    <div className={styles.buttonContainer}>
                        <Button danger onClick={toggleHistory}>
                            <FaHistory className={styles.buttonIcon} />
                            Change History
                        </Button>
                        <Button danger onClick={showConfirm}>
                            <FaLongArrowAltLeft className={styles.buttonIcon} />
                            Exit
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}>
                    <div className={styles.pageHeaderNameSection}></div>
                </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: '-20px' }}>
                <div className={styles.treeCollapsibleButton} onClick={handleTreeViewVisibleClink}>
                    {isTreeViewVisible ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
                </div>
            </Row>

            <Row gutter={20}>
                {isTreeViewVisible ? (
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <div className={styles.leftpanel}>
                            <div className={styles.treeViewContainer}>
                                <div className={styles.treemenu}>
                                    <TreeView isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                                </div>
                            </div>
                        </div>
                    </Col>
                ) : undefined}
                <Col xs={24} sm={24} md={!isTreeViewVisible ? 23 : 12} lg={!isTreeViewVisible ? 23 : 16} xl={!isTreeViewVisible ? 23 : 16} xxl={!isTreeViewVisible ? 23 : 16} className={styles.paddingRightZero}>
                    {isChangeHistoryVisible ? (
                        <ChangeHistory />
                    ) : (

                        <div className="right col" style={{ padding: '0' }}>
                            {/* <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={24} xl={24} xxl={24}> */}
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

                                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                                <Space>
                                                    <Form.Item name="Parent" className={styles.parentInput} label="Parent" rules={[validateRequiredInputField('Parent')]}>
                                                        <Input placeholder="Parent" />
                                                    </Form.Item>

                                                    <Form.Item className={styles.parentIcon}>
                                                        <Button type="button" className="btn btn-outline srchbtn mr0 boxShdwNon" >
                                                            <FaSearch />
                                                        </Button>
                                                        <Modal title="Basic Modal" open={isModalOpen} >
                                                            <p>Some contents...</p>
                                                            <p>Some contents...</p>
                                                            <p>Some contents...</p>
                                                        </Modal>
                                                    </Form.Item>
                                                </Space>
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
                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaEdit className="fas fa-edit mrr5" />
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaUserPlus className="fa-solid fa-user-plus mrr5" />
                                                    Add Child
                                                </button>
                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaUserFriends className="fa-solid fa-user-group mrr5" />
                                                    Add Sibling
                                                </button>
                                                <button type="submit" className="btn btn-outline rightbtn boxShdwNon mrl15" onClick={onSubmit}>
                                                    <FaSave className="fa fa-save mrr5" /> Save
                                                </button>
                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaUndo className="fa fa-undo mrr5" />
                                                    Reset
                                                </button>

                                                <button type="button" className="btn btn-outline rightbtn boxShdwNon mrl15">
                                                    <FaEdit className="fas fa-edit mrr5" />
                                                    View Attribute Detail
                                                </button>
                                            </Col>
                                        </Row>

                                    </Form>


                                </Panel>
                            </Collapse>
                            <Collapse defaultActiveKey={['1']} expandIconPosition="end">
                                <Panel header="Product Attributes Details (Mahindra Scorpio Classic Petrol)" key="2">
                                    <Table
                                        style={{ fontSize: '40px' }}
                                        columns={columns}
                                        dataSource={dataSource}
                                        onChange={onChange}
                                        pagination={false}
                                    // {{
                                    //     position: [bottom],
                                    //     pageSize: 10,
                                    //     total: 200


                                    // }}

                                    // scroll={{
                                    //     x: 300,
                                    //     y: 300,
                                    // }}
                                    />
                                    <Form><Form.Item>
                                        <button type="submit" style={{ marginRight: "right" }} className={"btn btn-outline rightbtn boxShdwNon mrl15"} onClick={onSubmit} expandIconPosition>
                                            <FaSave className="fa fa-save mrr5" /> Save
                                        </button>
                                    </Form.Item></Form>
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

