import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Input, Form, Row, Select, Switch, Modal } from 'antd';
import { FaSearch, FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import TreeView from 'components/common/TreeView';

import styles from 'pages/common/Common.module.css';
import { ROUTING_DASHBOARD } from 'constants/routing';
import { addToolTip } from 'utils/customMenuLink';
import { geoDataActions } from 'store/actions/data/geo';
import ParentHierarchy from 'pages/common/Geo/ParentHierarchy';
import { hierarchyAttributeMasterActions } from 'store/actions/data/hierarchyAttributeMaster';

const { Option } = Select;
const { confirm } = Modal;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
        },
        common: {
            LeftSideBar: { collapsed = false },
        },
    } = state;

    let returnValue = {
        collapsed,
        userId,
        isDataLoaded,
        geoData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: geoDataActions.fetchList,
            saveData: geoDataActions.saveData,
            listShowLoading: geoDataActions.listShowLoading,

            hierarchyAttributeFetchList: hierarchyAttributeMasterActions.fetchList,
            hierarchyAttributeSaveData: hierarchyAttributeMasterActions.saveData,
            hierarchyAttributeListShowLoading: hierarchyAttributeMasterActions.listShowLoading,
        },
        dispatch
    ),
});

export const GeoMain = ({ userId, isDataLoaded, geoData, fetchList, hierarchyAttributeFetchList, saveData, listShowLoading }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isDataLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
            hierarchyAttributeFetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    const [form] = Form.useForm();
    const { setFieldValue } = form;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFavourite, setFavourite] = useState(false);
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);

    const handleTreeViewVisibleClink = () => setTreeViewVisible(!isTreeViewVisible);

    const handleFavouriteClick = () => setFavourite(!isFavourite);

    const handleBack = () => {
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

    const onFinish = (values) => {
        saveData({ data: values, setIsLoading: listShowLoading, userId });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const dataList = [];
    const generateList = (data) => {
        for (let i = 0; i < data?.length; i++) {
            const node = data[i];
            const { geoCode: key } = node;
            dataList.push({
                key,
                data: node,
            });
            if (node.subGeo) {
                generateList(node.subGeo);
            }
        }
        return dataList;
    };

    const flatternData = generateList(geoData);

    const handleSelectClick = (keys) => {
        console.log('🚀 ~ file: GeoPage.js:134 ~ handleSelectClick ~ keys', keys);
        const SelectedParentNode = flatternData.find((i) => keys.includes(i.key));
        console.log('🚀 ~ file: GeoPage.js:136 ~ handleSelectClick ~ SelectedParentNode', SelectedParentNode);
        setFieldValue('geoParentCode', SelectedParentNode?.title);
    };
    return (
        <>
            <Row gutter={20}>
                <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisibleClink}>
                    {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                </div>
            </Row>
            <Row gutter={20}>
                {isTreeViewVisible ? (
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <div className={styles.leftpanel}>
                            <div className={styles.treeViewContainer}>
                                <div className={styles.treemenu}>
                                    <TreeView handleSelectClick={handleSelectClick} dataList={geoData} />
                                </div>
                            </div>
                        </div>
                    </Col>
                ) : undefined}

                <Col xs={24} sm={24} md={!isTreeViewVisible ? 24 : 12} lg={!isTreeViewVisible ? 24 : 16} xl={!isTreeViewVisible ? 24 : 16} xxl={!isTreeViewVisible ? 24 : 16} className={styles.padRight0}>
                    <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight0}>
                                <Form.Item name="attributeKey" label="Geographical Attribute Level" rules={[validateRequiredSelectField('Geographical Attribute Level')]}>
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

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }} className={styles.padLeft10}>
                                <Form.Item label="Parent" name="geoParentCode" className="control-label-blk">
                                    <Input.Group compact>
                                        <Input
                                            style={{
                                                width: 'calc(100% - 48px)',
                                            }}
                                            disabled
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
                            <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.padRight0}>
                                <Form.Item label="Code" name="geoCode" rules={[validateRequiredInputField('Code')]}>
                                    <Input placeholder="Code" className={styles.inputBox} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: '0' }} className={styles.padLeft10}>
                                <Form.Item label="Name" name="geoName" rules={[validateRequiredInputField('Name')]}>
                                    <Input placeholder="Name" className={styles.inputBox} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.padLeft10}>
                                <Form.Item label="Status" name="status" initialValue={true}>
                                    <Switch value={1} checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
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

                                <Button htmlType="submit" danger>
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
            <ParentHierarchy title={'Parent Hierarchy'} dataList={geoData} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </>
    );
};

export const Geo = connect(mapStateToProps, mapDispatchToProps)(GeoMain);
