import React, { useEffect, useState } from 'react';

import { Drawer, Input, Form, Col, Row, Switch, Button, Space, Modal, Collapse, Tree, Checkbox } from 'antd';
import { PlusOutlined, DownOutlined, SmileOutlined, MehOutlined, FrownFilled, FrownOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from '../DrawerAndTable.module.css';
import style from './RoleManagement.module.css';

// import mockTreeData from './Treedata.json';

const { TextArea } = Input;
const { Panel } = Collapse;
const children = [
    {
        title: 'Upload',
        key: 'Upload-1',
    },
    {
        title: 'View',
        key: 'View-1',
    },

    {
        title: 'Delete',
        key: 'Delete-1',
    },
    {
        title: 'Read',
        key: 'Read-1',
    },
    {
        title: 'Create',
        key: 'Create-1',
    },
    {
        title: 'Update',
        key: 'Update-1',
    },
];
const mockTreeData = [
    {
        title: 'Common',
        key: 'common',

        children: [
            {
                title: 'Application Master',
                key: 'ApplicationMaster1',
                children: [
                    {
                        title: 'Sub Application Master',
                        key: 'subApplicationMaster1',
                        isLeaf: true,
                    },
                ],
            },
            {
                title: 'Application Criticality Group',
                key: 'applicationCriticalityGroup1',
                children: [
                    {
                        title: 'Application Master',
                        key: 'ApplicationMaster2',
                        children: [
                            {
                                title: 'Sub Application Master',
                                key: 'subApplicationMaster2',
                            },
                        ],
                    },
                    {
                        title: 'Application Criticality Group',
                        key: 'applicationCriticalityGroup2',
                        children: [
                            {
                                title: 'dummy1',
                                key: 'dummy-1',
                            },
                        ],
                    },
                ],
            },
            {
                title: 'Geographical Hierarchy',
                key: 'geographicalHierarchy',
                children: [
                    {
                        title: 'dummy2',
                        key: 'dummy2',
                    },
                ],
            },
            {
                title: 'Product Hierarchy',
                key: 'commonProductHierarchy',
                children: [
                    {
                        title: 'dummy3',
                        key: 'dummy3',
                    },
                ],
            },
        ],
    },
];

const DrawerUtil = ({ openDrawer, setOpenDrawer, setsaveclick }) => {
    const [form] = Form.useForm();
    const Mychildren = [
        {
            title: 'Upload',
            key: 'Upload',
        },
        {
            title: 'View',
            key: 'View',
        },

        {
            title: 'Delete',
            key: 'Delete',
        },
        {
            title: 'Read',
            key: 'Read',
        },
        {
            title: 'Create',
            key: 'Create',
        },
        {
            title: 'Update',
            key: 'Update',
        },
    ];
    const disabledProps = { disabled: false };
    const [TreeData, setTreeData] = useState(mockTreeData);
    // useEffect(() => {
    //     function Subpanel(node) {
    //         if (!node?.children) {
    //             // setTreeData([{ ...node, children: Mychildren }]);
    //             console.log(node.title);
    //             node.children=Mychildren;
    //             return;
    //         }
    //         if (node?.children) {
    //             node?.children.forEach((child) => {
    //                 Subpanel(child);
    //             });
    //         }
    //     }
    //     Subpanel(mockTreeData);
    // }, []);

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
    const Title = (props) => {
        console.log('render');
        return <span className={style.placement}>{props.title}</span>;
    };
    const Paneldata = (data) => {
        return data?.map((subData) => {
            Subpanel(subData);

            function Subpanel(node) {
                if (!node?.children) {
                    return (
                        <Button onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                            Save
                        </Button>
                    );
                }
                node?.children.forEach((child) => {
                    Subpanel(child);
                });
                {
                    return (
                        <Collapse>
                            <Panel header={node?.title}></Panel>
                        </Collapse>
                    );
                }
            }
        });

        // return (
        //     <Collapse expandIcon={() => <PlusOutlined />}>
        //         <Panel header={node?.title}></Panel>
        //     </Collapse>
        // );
    };
    const CheckboxUti =({})=>{

    }
    const AccordianTreeUtils = ({ data }) => {
        return (
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                {Paneldata(data)}
            </Col>
        );
        //  data.map((subt, i) => {
        //     let subdata = subt;
        //     console.log(subt);
        // });
        // console.log(typeof data);
        // Object.entries(data).map(([key, val], i) => {
        //     console.log('Keyname', key, ' Name:', val);
        // });
    };
    return (
        <>
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

                        <Row>{/* <AccordianTreeUtils data={mockTreeData} /> */}</Row>
                    </Form>
                </Space>
            </Drawer>
            <Tree
                checkable
                showIcon
                className={style.roleManagement}
                defaultExpandAll
                switcherIcon={<PlusOutlined />}
                treeData={mockTreeData}
                titleRender={(treeNode) => {
                    if (treeNode.isLeaf) {
                        return (
                            <>
                                <span className="title">
                                    <span className="text">{treeNode.title}</span>
                                </span>
                                <div className="Placement">
                                    <Collapse defaultActiveKey={['1']} accordion>
                                        <Panel header="This is panel header 1" key="1">
                                            <p>This is the Action accordion</p>
                                        </Panel>
                                    </Collapse>
                                </div>
                            </>
                        );
                    }
                    return <>{treeNode.title}</>;
                }}
            />
        </>
    );
};

export default DrawerUtil;
