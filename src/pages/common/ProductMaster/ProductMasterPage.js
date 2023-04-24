import React, { useState } from 'react';
import { Table, Switch, Form, Select, Row, Col, Button, Input, Collapse } from 'antd';
import { FaSave, FaUserFriends, FaUserPlus, FaEdit, FaUndo, FaSearch } from 'react-icons/fa';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import { ChangeHistory } from 'components/common/ChangeHistory';

import styles from 'components/common/Common.module.css';

const { TextArea } = Input;
const { Panel } = Collapse;

export const ProductMasterPageBase = () => {
    const [form] = Form.useForm();

    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

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
            .then((err, values) => {})
            .catch((errorInfo) => {});
    };

    const tblPrepareColumns = ({ title, dataIndex }) => {
        return {
            title,
            dataIndex,
            // render:rendFn,
        };
    };

    const tableColumn = [
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'Srl',
        }),
        tblPrepareColumns({
            title: 'Attribute Name',
            dataIndex: 'AttributeName',
        }),
        tblPrepareColumns({
            title: 'Attribute Value',
            dataIndex: 'AttributeValue',
        }),
    ];

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

    return (
        <>
            <Row gutter={20}>
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
                                    <Table style={{ fontSize: '40px' }} columns={tableColumn} dataSource={dataSource} />
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
        </>
    );
};
export const ProductMasterPage = withLayoutMaster(ProductMasterPageBase);
