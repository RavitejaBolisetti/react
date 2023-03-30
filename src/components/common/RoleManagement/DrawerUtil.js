import React from 'react';

import { Drawer, Input, Form, Col, Row, Switch, Button, Space, Modal, Collapse, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';

import mockTreeData from './Treedata.json';

const { TextArea } = Input;
const { Panel } = Collapse;

const DrawerUtil = ({ onClose, openDrawer, setOpenDrawer }) => {
    const [form] = Form.useForm();
    const disabledProps = { disabled: false };

    const handleFormSubmitBtn = () => {
        // setFormBtnDisable(true);
    };

    const onFinish = () => {};
    const onFinishFailed = () => {};

    const accordianTreeUtils = (data) => {
        return data.map((subt, i) => {
            let subdata = subt;
            console.log(subt);
           return ( <Collapse style={{marginBottom: '10px'}} size="small" expandIcon={() => <PlusOutlined />} expandIconPosition="start">
                <Panel header={subt?.title} key={subt?.key}>
                    <Tree
                        // checkable
                        // onExpand={onExpand}
                        // expandedKeys={expandedKeys}
                        // autoExpandParent={autoExpandParent}
                        // onCheck={onCheck}
                        // checkedKeys={checkedKeys}
                        // onSelect={onSelect}
                        // selectedKeys={selectedKeys}
                        treeData={[subdata]}
                        showLine
                        showIcon
                    />
                </Panel>
           </Collapse>
           )

    });
    };

    return (
        <Drawer title={'Role Management'} width="540" placement="right" onClose={onClose} open={openDrawer} maskClosable={false}>
            <Space
                direction="vertical"
                size="small"
                style={{
                    display: 'flex',
                }}
            >
                <Form id="myForm" form={form} onFieldsChange={handleFormSubmitBtn} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="hierarchyAttribueCode" label="Code" rules={[{ max: 5, message: 'Code must be  5 characters long.' }, { min: 5, message: 'Code must be  5 characters long .' }, validateRequiredInputField('Code')]}>
                                <Input placeholder={preparePlaceholderText('Code')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                                name="hierarchyAttribueName"
                                label="Name"
                                rules={[
                                    { min: 2, message: 'Name must contain 2 characters.' },
                                    { max: 50, message: 'Name must be less than 50 characters.' },
                                ]}
                            >
                                <Input placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        {/* </Row> */}
                        {/* <Row > */}
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label="Role Description" name="roleDescription">
                                <TextArea
                                    // value={value}
                                    // onChange={(e) => setValue(e.target.value)}
                                    placeholder=""
                                    autoSize={{
                                        minRows: 2,
                                        maxRows: 5,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        {/* </Row> */}
                        {/* <Row gutter={20}> */}
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Duplicate Allowed?" name="duplicateAllowedAtAttributerLevelInd">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {accordianTreeUtils(mockTreeData)}
                        </Col>
                    </Row>
                </Form>
            </Space>
        </Drawer>
    );
};

export default DrawerUtil;
