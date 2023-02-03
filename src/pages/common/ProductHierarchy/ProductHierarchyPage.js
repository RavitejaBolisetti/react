import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Row, Col, Input, Select, Switch, Button, Modal, Space } from 'antd';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaLongArrowAltLeft, FaAngleDoubleRight, FaAngleDoubleLeft, FaHistory } from 'react-icons/fa';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import TreeView from 'components/common/TreeView';
import { ChangeHistory } from '../ChangeHistory/ChangeHistory';
import styles from '../Common.module.css';
import { connect } from 'react-redux';
import MetaTag from 'utils/MetaTag';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { ROUTING_DASHBOARD } from 'constants/routing';
import ParentHierarchy from '../Geo/ParentHierarchy';

const { confirm } = Modal;
const { TextArea } = Input;

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

export const ProductHierarchyBase = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavourite, setFavourite] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(false);
    const [isChangeHistoryVisible, setChangeHistoryVisible] = useState(false);

    const toggleHistory = (e) => {
        setChangeHistoryVisible(!isChangeHistoryVisible);
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

    return (
        <>
            <MetaTag metaTitle={'Product Hierarchy'} />
            <Row gutter={20}>
                <Col xs={16} sm={24} md={12} lg={18} xl={18} xxl={18}>
                    <Space>
                        <div>
                            <span className={styles.headingGradient}>Product Hierarchy</span>
                        </div>
                        <div className={styles.favIconHeading}>{isFavourite ? <BsStarFill color="#ff3e5b" size={18} onClick={handleFavouriteClick} /> : <BsStar size={18} onClick={handleFavouriteClick} />}</div>
                    </Space>
                </Col>
                <Col xs={8} sm={24} md={12} lg={6} xl={6} xxl={6}>
                    <div className={styles.buttonContainer}>
                        <Button danger  onClick={toggleHistory}>
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
                                        <Form.Item label="Parent" name="Parent" className="control-label-blk" rules={[validateRequiredInputField('Parent')]}>
                                            <Input.Group compact>
                                                <Input
                                                    style={{
                                                        width: 'calc(100% - 48px)',
                                                    }}
                                                    name="Parent"
                                                    placeholder="Parent"
                                                    className={styles.inputBox}
                                                />
                                                <Button type="primary" id="hierarchyChange" className="btn btn-outline srchbtn mr0 boxShdwNon" onClick={() => setIsModalOpen(true)}>
                                                    <FaSearch />
                                                </Button>
                                            </Input.Group>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item label="Code" name="Code" rules={[validateRequiredInputField('Code')]}>
                                            <Input name="Code" placeholder="Code" className={styles.inputBox} />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                        <Form.Item name="Short Description" label="Short Description" rules={[validateRequiredInputField('Short Description')]}>
                                            <Input className={styles.inputBox} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <Form.Item name="Long Desciption" label="Long Description" rules={[validateRequiredInputField('Long Description')]}>
                                            <TextArea rows={1} placeholder="Type here" />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }}>
                                        <Form.Item name="Active inactive button" label="Status">
                                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
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

                                            <button type="submit" className="btn btn-outline rightbtn boxShdwNon mrl15" onClick={onSubmit}>
                                                <FaSave className={styles.buttonIcon} /> Save
                                            </button>

                                            {/* <Button danger onClick={onSubmit} type="submit">
                                                <FaSave className={styles.buttonIcon} />
                                                Save
                                            </Button> */}

                                            <Button danger>
                                                <FaUndo className={styles.buttonIcon} />
                                                Reset
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    )}
                </Col>
            </Row>

            <ParentHierarchy title={'Parent Hierarchy'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
};

export const ProductHierarchyPage = connect(mapStateToProps, null)(withLayoutMaster(ProductHierarchyBase));
