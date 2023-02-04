import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Input, Form, Row, Select, Switch, Space, Modal } from 'antd';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaLongArrowAltLeft, FaAngleDoubleRight, FaAngleDoubleLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredSelectField } from 'utils/validation';

import TreeView from 'components/common/TreeView';
import ParentHierarchy from './ParentHierarchy';

import styles from './GeoPage.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTING_DASHBOARD } from 'constants/routing';

const { Option } = Select;
const { confirm } = Modal;

const mapStateToProps = (state) => {
    const {
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
    };
    return returnValue;
};

export const GeoPageBase = () => {
    const navigate = useNavigate();

    const [activate, setActivate] = useState({
        Attribute: '',
        Parent: '',
        Code: '',
        Name: '',
    });

    const handle = (event) => {
        setActivate({
            ...activate,
            [event.target.name]: event.target.value,
        });
    };

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavourite, setFavourite] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(false);
    const [antdForm, setAntdForm] = useState(false);
    const [formContent, setFormContent] = useState({
        Attribute: '',
        Parent: '',
        Code: '',
        Name: '',
    });

    const handleTreeViewVisibleClink = () => setTreeViewVisible(!isTreeViewVisible);

    const handleFavouriteClick = () => setFavourite(!isFavourite);
    const [editableFormContent, setEditableFormContent] = useState({
        editAttribute: false,
        editParent: false,
        editCode: false,
        editName: false,
    });

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

    const onSubmit = (e) => {
        form.validateFields()
            .then((err, values) => {
                console.log('🚀 ~ file: GeoPage.js:17 ~ validateFields ~ values', values, err);
            })
            .catch((errorInfo) => {
                console.log('🚀 ~ file: GeoPage.js:20 ~ validateFields ~ errorInfo', errorInfo);
            });
    };
    return (
        <>
            <Row gutter={20}>
                <Col xs={16} sm={24} md={12} lg={18} xl={18} xxl={18} className={styles.padRight0}>
                    <Space>
                        <div>
                            <span className={styles.headingGradient}>Geographical Hierarchy</span>
                        </div>
                        <div className={styles.favIconHeading}>{isFavourite ? < FaHeart  color="#ff3e5b" size={18} onClick={handleFavouriteClick} /> : <FaRegHeart size={18} onClick={handleFavouriteClick} />}</div>
                    </Space>
                </Col>
                <Col xs={8} sm={24} md={12} lg={6} xl={6} xxl={6} className={styles.padRight0}>
                    <div className={styles.buttonContainer}>
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
                                    <TreeView editableFormContent={editableFormContent} setEditableFormContent={setEditableFormContent} antdForm={antdForm} setAntdForm={setAntdForm} setFormContent={setFormContent} formContent={formContent} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                                </div>
                            </div>
                        </div>
                    </Col>
                ) : undefined}

                <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.padRight0}>
                   
                        <Form layout="vertical">
                            <Row gutter={20}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight0} >
                                    <Form.Item name="Attribute Level" label="Geographical Attribute Level" rules={[validateRequiredSelectField('Attribute Level')]}>
                                        <Select>
                                            <Option value="Continent">Continent</Option>
                                            <Option value="Country">Country</Option>
                                            <Option value="State">State</Option>
                                            <Option value="City">District/City</Option>
                                            <Option value="Tashil">Tashil</Option>
                                            <Option value="Pincode">Pincode</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12}  style={{ padding: '0' }} className={styles.padLeft10}>
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
                                                onChange={handle}
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
                                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight0}>
                                    <Form.Item
                                        label="Code"
                                        name="Code"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter the Code !',
                                            },
                                        ]}
                                    >
                                        <Input name="Code" onChange={handle} placeholder="Code" className={styles.inputBox} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }} className={styles.padLeft10}>
                                    <Form.Item
                                        label="Name"
                                        name="Name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input the name!',
                                            },
                                        ]}
                                    >
                                        <Input name="Name" onChange={handle} placeholder="Name" className={styles.inputBox} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                                    <Form.Item name="Active inactive button" label="Status">
                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
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
                                </Col>
                            </Row>
                        </Form>
                    
                </Col>
            </Row>
            <ParentHierarchy title={'Parent Hierarchy'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
};

export const GeoPage = connect(mapStateToProps, null)(withLayoutMaster(GeoPageBase));
