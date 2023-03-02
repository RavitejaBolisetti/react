import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Table, DatePicker, InputNumber, Drawer } from 'antd';
import styles from '../Common.module.css';
import { bindActionCreators } from 'redux';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { FaPlus } from 'react-icons/fa';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

const { RangePicker } = DatePicker;

const { Option } = Select;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isDataLoaded = false, data: configData = [] },
            // ConfigurableParameterEditing: { isParamLoading,isParamLoaded = false, paramdata: Data = [] },
        },
    } = state;

    let returnValue = {
        userId,
        isDataLoaded,

        configData: configData?.filter((i) => i),
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: configParamEditActions.fetchList,
            saveData: configParamEditActions.saveData,
            fetchdataList: configParamEditActions.fetchDataList,
            listShowLoading: configParamEditActions.listShowLoading,
        },
        dispatch
    ),
});
export const ConfigurableParameterEditingBase = ({ fetchdataList, saveData, fetchList, userId, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, attributeData }) => {
    useEffect(() => {
        if (!isDataLoaded) {
            fetchdataList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataLoaded]);

    const [form] = Form.useForm();

    const { confirm } = Modal;
    const [selected, setSelected] = React.useState('T');
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const changeSelectOptionHandler = (event) => {
        setSelected(event);
    };

    useEffect(() => {
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: 'CFG_PARAM' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Control ID',
            dataIndex: 'controlId',
        }),

        tblPrepareColumns({
            title: 'Control Description',
            dataIndex: 'controlDescription',
        }),
        tblPrepareColumns({
            title: 'Configurable Parameter Type',
            dataIndex: 'configurableParameterType',
            width: 300,
        }),
        tblPrepareColumns({
            title: 'Configurable Parameter Values',
            dataIndex: 'textValue',
        }),
        tblPrepareColumns({
            title: 'Role Group',
            dataIndex: 'controlGroup',
        }),
        {
            title: 'Action',
            dataIndex: '',
            width: 100,
            render: () => [
                <Space wrap>
                    <EditOutlined />
                    {/* <DeleteOutlined onClick={showConfirm} /> */}
                </Space>,
            ],
        }
    );

    const onFinish = (values) => {
        const data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: [data],
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textRight}>
                    <Button danger onClick={showDrawer}>
                        <FaPlus className={styles.buttonIcon} />
                        Add Group
                    </Button>
                </Col>
            </Row>
            {/* <Table bordered dataSource={configData} columns={tableColumn} pagination={true} /> */}
            <Drawer
                title="Add Configurable Parameter Editing"
                placement="right"
                onClose={onClose}
                open={open}
                width={500}
                maskClosable={false}
                footer={
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} className={styles.drawerFooterButtons}>
                            <Button danger>Cancel</Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} className={styles.drawerFooterButtons} style={{ textAlign: 'right' }}>
                            <Button onClick={onFinishFailed} htmlType="submit" type="primary">
                                Save
                            </Button>

                            <Button onClick={onFinishFailed} htmlType="submit" type="primary">
                                Save and New
                            </Button>
                        </Col>
                    </Row>
                }
            >
                <Form layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="controlId" label="Control ID" rules={[validateRequiredInputField('ControlID')]}>
                                <Select placeholder="Select">
                                    {configData?.map((item) => (
                                        <Option value={item?.controlDescription}>{item?.value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="controlDescription" label="Control Description" rules={[validateRequiredInputField('ControlDescription')]}>
                                <Input placeholder="Enter Data" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="controlGroup" label="Role Group" rules={[validateRequiredSelectField('rolegroup')]}>
                                <Select
                                    placeholder="Select"
                                    options={[
                                        { value: '1', label: 'Parameter Type 1' },
                                        { value: '2', label: 'Parameter Type 2' },
                                        { value: '3', label: 'Parameter Type 3' },
                                        { value: '4', label: 'Parameter Type 4' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="configurableParameterType" label="Configurable Parameter Type" rules={[validateRequiredSelectField('ConfigParamType')]}>
                                <Select
                                    placeholder="Select Parameter Type"
                                    options={[
                                        { value: CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY, label: 'Text' },
                                        { value: CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY, label: 'Number Range' },
                                        { value: CONFIGURABLE_PARAMETARS_INPUT_TYPE.DATE_RANGE.KEY, label: 'Date Range' },
                                        { value: CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY, label: 'Boolean' },
                                    ]}
                                    onChange={changeSelectOptionHandler}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name="textValue" label="Configurable Parameter Values" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                {selected === CONFIGURABLE_PARAMETARS_INPUT_TYPE.TEXT.KEY ? (
                                    <Input placeholder="Enter Data" />
                                ) : selected === CONFIGURABLE_PARAMETARS_INPUT_TYPE.NUMBER.KEY ? (
                                    <>
                                        <InputNumber min={1} max={100} defaultValue={1} />
                                        <InputNumber min={1} max={100} defaultValue={100} />
                                    </>
                                ) : selected === CONFIGURABLE_PARAMETARS_INPUT_TYPE.BOOLEAN.KEY ? (
                                    <Select
                                        placeholder="Select"
                                        options={[
                                            { value: 'Y', label: 'Yes' },
                                            { value: 'N', label: 'No' },
                                        ]}
                                    />
                                ) : (
                                    <RangePicker width={'100%'} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export const ConfigurableParameterEditing = connect(mapStateToProps, mapDispatchToProps)(ConfigurableParameterEditingBase);
