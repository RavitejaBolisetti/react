import React from 'react';

import { Drawer, Input, Form, Col, Row, Switch, Button, Space, Modal, Collapse, Tree, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from '../DrawerAndTable.module.css';
import style from './RoleManagement.module.css';

import mockTreeData from './Treedata.json';

const { TextArea } = Input;
const { Panel } = Collapse;

const DrawerUtil = ({ openDrawer, setOpenDrawer, setsaveclick }) => {
    const [form] = Form.useForm();
    const disabledProps = { disabled: false };

    const handleFormSubmitBtn = () => {
        // setFormBtnDisable(true);
    };
    const handleAdd = () => {};
    const handleUpdate2 = () => {};
    const onClose = () => {
        setOpenDrawer(false);
        form.resetFields();
    };
    const onFinish = () => {};
    const onFinishFailed = () => {};

    // const accordianTreeUtils = (data) => {
    // return data.map((subt, i) => {
    //     let subdata = subt;
    //     console.log(subt);
    //     return (
    // <Collapse
    // //inline style to be removed
    // style={{ marginBottom: '10px' }}
    //  //inline style to be removed
    //  size="small" expandIcon={() => <PlusOutlined />} expandIconPosition="start">
    //     <Panel header={subt?.title} key={subt?.key}>
    //         <Tree
    //             checkable
    //             onExpand={onExpand}
    //             expandedKeys={expandedKeys}
    //             autoExpandParent={autoExpandParent}
    //             onCheck={onCheck}
    //             checkedKeys={checkedKeys}
    //             onSelect={onSelect}
    //             selectedKeys={selectedKeys}
    //             treeData={[subdata]}
    //             showLine
    //             showIcon
    //         />

    //     </Panel>
    // </Collapse>

    //     {

    //     }
    // }
    //             );
    //         });
    //     };

    // let i = 0;
    // const mapDataToCollapse = (data, i) => {
    //     if (mockTreeData?.children === null) {
    //         return <Checkbox >hello</Checkbox>;
    //     }
    //     if (mockTreeData?.children?.at(0)?.children === null) {
    //         return <Panel />;
    //     } else if (i === 0 && mockTreeData?.children?.length != 0) {
    //         <Collapse> {mapDataToCollapse(mockTreeData?.children, (i = 1))}</Collapse>;
    //     } else if (i === 1 && mockTreeData.children?.length != 0) {
    //         mapDataToCollapse(mockTreeData?.children, (i = 2));
    //     } else if (i === 2 && mockTreeData?.children?.length != 0) {
    //         mapDataToCollapse(mockTreeData?.children, (i = 3));
    //     }
    // };
    // };

    const mapDataToCollapse = (data) => {
        console.log('data', data, 'index', data?.title, 'children', data?.children);

        return data?.map((item, index) => {
            console.log('item in map', item, 'index in map ', index);
            return (
                <>
                    <Collapse>
                        <Panel header={item?.title} key={item?.key}>
                            {console.log(item?.children, 'inside')}
                            {item?.children?.map((item, index) => {
                                console.log('item in map in map', item, 'index in map in map', index);

                                return (
                                    <Collapse>
                                        <Panel header={item?.title} key={item?.key}>
                                            {item?.children?.map((item, index) => {
                                                console.log('in the endgame');

                                                return (
                                                    <Collapse expandIcon={() => <Checkbox/>}>
                                                       {/* <Checkbox/>  */}
                                                       <Panel header={item?.title} key={item?.key}></Panel>
                                                     </Collapse>
                                                );
                                            })}
                                        </Panel>
                                    </Collapse>
                                );
                            })}
                        </Panel>
                    </Collapse>
                </>
            );
        });
    };
    return (
        <Drawer
            title={'Role Management'}
            width="540"
            placement="right"
            onClose={onClose}
            open={openDrawer}
            maskClosable={false}
            footer={
                <>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button danger onClick={onClose} className={styles.cancelBtn}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={styles.saveBtn}>
                            <Button onClick={handleAdd} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                Save & Add New
                            </Button>
                            <Button onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                                Save
                            </Button>
                            {/* <Button onClick={handleUpdate2} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                Edit
                            </Button> */}
                        </Col>
                    </Row>
                </>
            }
        >
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
                            <Form.Item name="hierarchyAttribueName" label="Name" rules={[{ min: 2, message: 'Name must contain 2 characters.' }, { max: 50, message: 'Name must be less than 50 characters.' }, validateRequiredInputField('Name')]}>
                                <Input placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        {/* </Row> */}
                        {/* <Row > */}
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item
                                label="Role Description"
                                name="roleDescription"
                                rules={[
                                    { min: 50, message: 'Role Description must contain 2 characters.' },
                                    { max: 250, message: 'Role Description must be less than 50 characters.' },
                                    {
                                        required: true,
                                    },
                                ]}
                            >
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
                            {/* {accordianTreeUtils(mockTreeData)} */}
                            {mapDataToCollapse(mockTreeData)}
                        </Col>
                    </Row>
                </Form>
            </Space>
        </Drawer>
    );
};

export default DrawerUtil;
