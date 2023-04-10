import React, { useEffect, useState } from 'react';

import { Drawer, Input, Form, Col, Row, Switch, Button, Space, Modal, Collapse, Tree, Checkbox } from 'antd';
import { PlusOutlined, DownOutlined, SmileOutlined, MehOutlined, FrownFilled, FrownOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from '../DrawerAndTable.module.css';
import style from './RoleManagement.module.css';

// import mocktreeData from './treeData.json';

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
const options = {
    ApplicationMaster1: [
        {
            label: 'Read',
            value: 'Read',
            Read: true
        },
        {
            label: 'View',
            value: 'View',
            View: true
        },
        {
            label: 'Update',
            value: 'Update',
            Update: false

        },
        {
            label: 'Delete',
            value: 'Delete',
        },
        {
            label: 'Create',
            value: 'Create',
        },
        {
            label: 'Upload',
            value: 'Upload',
        },
    ],
    applicationCriticalityGroup1: [
        {
            label: 'Read',
            value: 'Read',
            Read: true
        },
        {
            label: 'View',
            value: 'View',
            View: true
        },
        {
            label: 'Update',
            value: 'Update',
            Update: false
        },
        {
            label: 'Delete',
            value: 'Delete',
        },
        {
            label: 'Create',
            value: 'Create',
        },
        {
            label: 'Upload',
            value: 'Upload',
        },
    ],
    subApplicationMaster2: [
        {
            label: 'Read',
            value: 'Read',
            Read: true
        },
        {
            label: 'View',
            value: 'View',
            View: true
        },
        {
            label: 'Update',
            value: 'Update',
            Update: false
        },
        {
            label: 'Delete',
            value: 'Delete',
            Delete: true

        },
        {
            label: 'Create',
            value: 'Create',
        },
        {
            label: 'Upload',
            value: 'Upload',
        },
    ],
};

const options2 = [
    {
        label: 'Delete',
        value: 'Delete',
    },
    {
        label: 'Create',
        value: 'Create',
    },
    {
        label: 'Upload',
        value: 'Upload',
    },
];
const mocktreeData = [
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
                        // children: [
                        //     {
                        //         isLeaf: true,
                        //         checkable: false,
                        //     },
                        // ],
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
                                // children: [
                                //     {
                                //         isLeaf: true,
                                //         checkable: false,
                                //     },
                                // ],
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
                        key: 'dummy990',
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

const insertionData = {
    children: [
        {
            isLeaf: true,
            checkable: false,
        },
    ],
};

const mockData = [
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
        ],
    },
];

const DrawerUtil = ({ openDrawer, setOpenDrawer, setsaveclick }) => {
    const [form] = Form.useForm();
    // const [selectedActions, setSelectedActions] = useState({})
    const Mychildren = [
        {
            label: 'Read',
            value: 'Read',
        },
        {
            label: 'View',
            value: 'View',
        },
        {
            label: 'Update',
            value: 'Update',
        },
        {
            label: 'Delete',
            value: 'Delete',
        },
        {
            label: 'Create',
            value: 'Create',
        },
        {
            label: 'Upload',
            value: 'Upload',
        },
    ];
    const disabledProps = { disabled: false };
    const [treeData, settreeData] = useState([]);

    useEffect(() => {
        if (!treeData.length) {
            Subpanel(mocktreeData);
        }

        console.log('treeData', treeData);
    }, []);

    function Subpanel(arr) {
        const result = arr.map((row) => {
            if (row.children && row.children.length) {
                const children = Subpanel(row.children);
                return { ...row, children };
            } else {
                console.log('key', row);
                return {
                    ...row,
                    checkable: true,
                    children: [
                        {
                            isLeaf: true,
                            checkable: false,
                            dataIndex: row.key,
                        },
                    ],
                };
            }
        });
        settreeData(result);
        return result;
    }

    console.log('mockData insertionData', mockData);

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

    function updatedTreeData(arr, key) {
        const result = arr.map((row) => {
            if (row.children && row.children.length && row.children.key === key) {
                const children = updatedTreeData(row.children);
                return { ...row, children };
            } else {
                console.log('key', row);
                return {
                    ...row,
                    checkable: true,
                    children: [
                        {
                            isLeaf: true,
                            checkable: false,
                            key: row.key,
                        },
                    ],
                };
            }
        });
        settreeData(result);
        return result;
    }

    const onChange = (checkedValues, key) => {
        // let slectedData = treeData;

        console.log('checked = ', checkedValues, key);
    };
    const onTreeSelect = (data) => {
        console.log('onTreeSelect', data);
    };
    const CheckboxUtil = ({ upload, view, del, read, create, update, key }) => {
        return (
            <>
                {' '}
                <Form.Item
                    name="remember"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                    {console.log('Mein aagaya')}
                </Form.Item>
            </>
        );
    };
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

                        <Row>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Tree
                                    checkable
                                    showIcon
                                    className={style.roleManagement}
                                    selectable={false}
                                    defaultExpandAll
                                    switcherIcon={<PlusOutlined />}
                                    treeData={treeData}
                                    treeLine={true}
                                    treeIcon={true}
                                    onCheck={onTreeSelect}
                                    titleRender={(treeNode) => {
                                        if (treeNode.isLeaf) {
                                            console.log('treeNode', treeNode);
                                            return (
                                                <div className="LeafDiv">
                                                    <span className="title">
                                                        <span className="text">{treeNode.title}</span>
                                                    </span>
                                                    <div className="Placement">
                                                        {console.log("Value yeh hai",options[treeNode.dataIndex])}
                                                        {/* <Checkbox.Group defaultValue={[options[treeNode.dataIndex]]}  options={options[treeNode.dataIndex] ? options[treeNode.dataIndex] : options.ApplicationMaster1} onChange={(data) => onChange(data, treeNode.dataIndex)} /> */}
                                                        {options[treeNode.dataIndex]?.length>0 && options[treeNode.dataIndex].map(op => <Checkbox checked={op[op?.value]} defaultValue={op[op?.value]} onChange={(data) => onChange(data, treeNode.dataIndex)}>{op.label}</Checkbox>)}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return <>{treeNode.title}</>;
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Space>
            </Drawer>
        </>
    );
};

export default DrawerUtil;
