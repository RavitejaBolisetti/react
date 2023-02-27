import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Col, Input, Modal, Form, Row, Select, Space, Switch, Table, DatePicker, InputNumber, Drawer } from 'antd';
import styles from '../Common.module.css';
import { bindActionCreators } from 'redux';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { FaUserPlus, FaSave, FaUndo } from 'react-icons/fa';
import { configparameditActions } from 'store/actions/data/configparameterediting';
import { withLayoutMaster } from 'components/withLayoutMaster';
import { CONFIGURABLE_PARAMETARS_INPUT_TYPE } from './InputType';
const { RangePicker } = DatePicker;
let type;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: { isLoaded: isDataLoaded = false, data: geoData = [] },
            HierarchyAttributeMaster: { isLoaded: isDataAttributeLoaded, data: attributeData = [] },
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
        isDataAttributeLoaded,
        attributeData: attributeData?.filter((i) => i),
    };
    return returnValue;
};
const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: configparameditActions.fetchList,
            // saveData: configparameditActions.saveData,
            listShowLoading: configparameditActions.listShowLoading,
        },
        dispatch
    ),
});
export const ConfigurableParameterEditings = (userId, fetchList, listShowLoading) => {
    const [form] = Form.useForm();
    const [isFavourite, setFavourite] = useState(false);
    const handleFavouriteClick = () => setFavourite(!isFavourite);
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

    // useEffect(() => {
    //     fetchList({ setIsLoading: listShowLoading, userId, parameterType: 'CFG_PARAM' });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const onFinish = (values) => {
        // saveData({ data: values, setIsLoading: listShowLoading, userId });
        fetchList({ setIsLoading: listShowLoading, userId });
    };

    const defaultColumns = [
        {
            title: 'Control ID',
            dataIndex: 'ControlID',
            key: 'ControlID',
            render: () => (
                <Form.Item name="ControlID" rules={[validateRequiredInputField('ControlID')]}>
                    <Select
                        placeholder="Select"
                        options={[
                            { value: 'ACLOK', label: 'Lock Account' },
                            { value: 'NOLOG', label: 'No Login' },
                        ]}
                    ></Select>
                </Form.Item>
            ),
            width: 200,
        },
        {
            title: 'Control Description',
            dataIndex: 'ControlDescription',
            key: 'ControlDescription',
            render: () => (
                <Form.Item name="ControlDescription" rules={[validateRequiredInputField('ControlDescription')]}>
                    <Input placeholder="Enter Data" />
                </Form.Item>
            ),
            width: 200,
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
            render: () => ConfigParamValue(),
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
                        />{' '}
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

    const ConfigParamValue = () => {
        if (selected == 'T') {
            return (
                <>
                    {' '}
                    <Form.Item name="ConfigParamValues" rules={[validateRequiredInputField('ConfigParamValues')]}>
                        <Input placeholder="Enter Data" />
                    </Form.Item>{' '}
                </>
            );
        } else if (selected == 'D') {
            return (
                <>
                    {' '}
                    <Form.Item name="ConfigParamValues" rules={[validateRequiredInputField('ConfigParamValues')]}>
                        <RangePicker />
                    </Form.Item>
                </>
            );
        } else if (selected == 'B') {
            return (
                <>
                    {' '}
                    <Form.Item name="ConfigParamValues" rules={[validateRequiredSelectField('ConfigParamValues')]}>
                        <Select
                            placeholder="Select"
                            options={[
                                { value: 'Y', label: 'Yes' },
                                { value: 'N', label: 'No' },
                            ]}
                        />
                    </Form.Item>
                </>
            );
        } else if (selected == 'N') {
            return (
                <>
                    {' '}
                    <Form.Item name="ConfigParamValues" rules={[validateRequiredInputField('ConfigParamValues')]}>
                        <InputNumber min={1} max={100} defaultValue={1} />
                        <InputNumber min={1} max={100} defaultValue={100} />
                    </Form.Item>
                </>
            );
        }
    };
    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    return (
        <>
            <Button danger onClick={showDrawer}>
                <FaUserPlus className={styles.buttonIcon} />
                Add Row
            </Button>
            <Table bordered dataSource={data} columns={defaultColumns} pagination={false} />
            <Drawer
                title="Add Configurable Parameter Editing"
                placement="right"
                onClose={onClose}
                open={open}
                width={500}
                extra={
                    <Space>
                        <Button onClick={onFinishFailed} htmlType="submit" danger>
                            <FaSave className={styles.buttonIcon} />
                            Save
                        </Button>

                        <Button danger>
                            <FaUndo className={styles.buttonIcon} />
                            Reset
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical" onClick={onFinishFailed}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="ControlID" label="Control ID" rules={[validateRequiredInputField('ControlID')]}>
                                <Select
                                    placeholder="Select"
                                    options={[
                                        { value: 'ACLOK', label: 'Lock Account' },
                                        { value: 'NOLOG', label: 'No Login' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="ControlDescription" label="Control Description" rules={[validateRequiredInputField('ControlDescription')]}>
                                <Input placeholder="Enter Data" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="ConfigParamType" label="Configurable Parameter Type" rules={[validateRequiredSelectField('ConfigParamType')]}>
                                <Select
                                    placeholder="Select Parameter Type"
                                    options={[
                                        { value: 'N', label: 'Number Range' },
                                        { value: 'T', label: 'Text' },
                                        { value: 'D', label: 'Date Range' },
                                        { value: 'B', label: 'Boolean' },
                                    ]}
                                    onChange={changeSelectOptionHandler}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="ConfigParamValues" label="Configurable Parameter Values" rules={[validateRequiredInputField('ConfigParamValues')]}>
                                {selected == 'T' ? (
                                    <Input placeholder="Enter Data" />
                                ) : selected == 'N' ? (
                                    <>
                                        <InputNumber min={1} max={100} defaultValue={1} />
                                        <InputNumber min={1} max={100} defaultValue={100} />
                                    </>
                                ) : selected == 'B' ? (
                                    <Select
                                        placeholder="Select"
                                        options={[
                                            { value: 'Y', label: 'Yes' },
                                            { value: 'N', label: 'No' },
                                        ]}
                                    />
                                ) : (
                                    <RangePicker />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item name="rolegroup" label="Role Group" rules={[validateRequiredSelectField('rolegroup')]}>
                                <Select
                                    placeholder="Select"
                                    options={[
                                        { value: '1', label: 'Parameter Type 1' },
                                        { value: '2', label: 'Parameter Type 2' },
                                        { value: '3', label: 'Parameter Type 3' },
                                        { value: '4', label: 'Parameter Type 4' },
                                    ]}
                                />{' '}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export const ConfigurableParameterEditing = connect(mapStateToProps, mapDispatchToProps)(ConfigurableParameterEditings);
