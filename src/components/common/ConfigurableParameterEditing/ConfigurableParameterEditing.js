import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch, Table, DatePicker, InputNumber, Drawer } from 'antd';
import styles from '../Common.module.css';
import { bindActionCreators } from 'redux';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { FaPlus } from 'react-icons/fa';
import { configparameditActions } from 'store/actions/data/configurableParamterEditing';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
import { tblPrepareColumns } from 'utils/tableCloumn';
const { RangePicker } = DatePicker;

const { Option } = Select;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { isLoaded: isDataLoaded = false, data: configData = [] },
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
            fetchList: configparameditActions.fetchList,
            listShowLoading: configparameditActions.listShowLoading,
        },
        dispatch
    ),
});
export const ConfigurableParameterEditingBase = ({ fetchList, userId, configData, isDataLoaded, listShowLoading, isDataAttributeLoaded, attributeData }) => {
    const tableData = [
        {
            id: 'adfadfadaddfdasfadsfasdf',
            controlId: 'NOLOG',
            controlDescription: 'Desc 1',
            configurableParameterType: 'T',
            textValue: 'Text 1',
            isActive: 'Y',
            fromDate: null,
            toDate: null,
            fromNumber: null,
            toNumber: null,
            booleanValue: null,
            controlGroup: 'CMN',
        },
        {
            id: 'adfadfadaddfdasfadsfasdf',
            controlId: 'NOLOG',
            controlDescription: 'Desc 2',
            configurableParameterType: 'N',
            textValue: null,
            isActive: 'Y',
            fromDate: null,
            toDate: null,
            fromNumber: 122,
            toNumber: 2300,
            booleanValue: null,
            controlGroup: 'CMN',
        },
        {
            id: 'adfadfadaddfdasfadsfasdf',
            controlId: 'NOLOG',
            controlDescription: 'Desc 3',
            configurableParameterType: 'D',
            textValue: null,
            isActive: 'Y',
            fromDate: '01/01/2023',
            toDate: '02/01/2023',
            fromNumber: null,
            toNumber: null,
            booleanValue: null,
            controlGroup: 'CMN',
        },
        {
            id: 'adfadfadaddfdasfadsfasdf',
            controlId: 'NOLOG',
            controlDescription: 'Desc 4',
            configurableParameterType: 'B',
            textValue: null,
            isActive: 'Y',
            fromDate: null,
            toDate: null,
            fromNumber: null,
            toNumber: null,
            booleanValue: true,
            controlGroup: 'ADMN',
        },
    ];
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
    const [count, setCount] = useState(2);
    const [data, setRowsData] = useState([
        {
            key: '0',
            name: '',
        },
    ]);
    const handleAdd = () => {
        const newData = [
            {
                key: count,
                name: '',
            },
        ];
        setRowsData([...data, newData]);
        setCount(count + 1);
    };
    useEffect(() => {
        fetchList({ setIsLoading: listShowLoading, userId, parameterType: 'CFG_PARAM' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    //
    const deleteTableRows = (index) => {
        const rows = [...data];
        rows.splice(index, 1);
        setRowsData(rows);
    };
    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                deleteTableRows(data.key);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Control ID',
            dataIndex: 'controlId',
        })
    );

    const defaultColumns = [
        {
            title: 'Control ID',
            dataIndex: 'controlId',
            key: 'controlId',
        },
        {
            title: 'Control Description',
            dataIndex: 'ControlDescription',
            key: 'ControlDescription',
        },
        {
            title: 'Configurable Parameter Type',
            dataIndex: 'ConfigParamType',
            key: 'ConfigParamType',
            render: () => (
                <>
                    <Form.Item name="ConfigParamType" rules={[validateRequiredSelectField('ConfigParamType')]}>
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
                </>
            ),
            width: 300,
        },
        {
            title: 'Configurable Parameter Values',
            dataIndex: 'ConfigParamValues',
            key: 'ConfigParamValues',
            width: 200,
        },
        {
            title: 'Role Group',
            dataIndex: 'rolegroup',
            key: 'rolegroup',
            render: () => (
                <>
                    <Form.Item name="rolegroup" rules={[validateRequiredSelectField('rolegroup')]}>
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
                </>
            ),
        },
        {
            title: 'Action',
            dataIndex: '',
            width: 100,
            render: () => [
                <Space wrap>
                    <EditOutlined />

                    <DeleteOutlined onClick={showConfirm} />
                </Space>,
            ],
        },
    ];

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
            <Table bordered dataSource={tableData} columns={tableColumn} pagination={true} />
            <Drawer
                title="Add Configurable Parameter Editing"
                placement="right"
                onClose={onClose}
                open={open}
                width={500}
                maskClosable={false}
                footer={
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Button danger>Cancel</Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} style={{ textAlign: 'right' }}>
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
                <Form layout="vertical" onClick={onFinishFailed}>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="ControlID" label="Control ID" rules={[validateRequiredInputField('ControlID')]}>
                                <Select placeholder="Select">
                                    {configData?.map((item) => (
                                        <Option value={item?.id}>{item?.value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="ControlDescription" label="Control Description" rules={[validateRequiredInputField('ControlDescription')]}>
                                <Input placeholder="Enter Data" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Form.Item name="rolegroup" label="Role Group" rules={[validateRequiredSelectField('rolegroup')]}>
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
                            <Form.Item name="ConfigParamType" label="Configurable Parameter Type" rules={[validateRequiredSelectField('ConfigParamType')]}>
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
                            <Form.Item name="ConfigParamValues" label="Configurable Parameter Values" rules={[validateRequiredInputField('ConfigParamValues')]}>
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
