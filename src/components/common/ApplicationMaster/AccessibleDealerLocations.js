import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addToolTip } from 'utils/customMenuLink';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FaTrash, FaPlus } from 'react-icons/fa';

import { Button, Col, Row, Form, Select, Modal, Input, Switch, Space } from 'antd';

import styles from 'pages/common/Common.module.css';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { DataTable } from 'utils/dataTable';

const { confirm } = Modal;

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ApplicationMaster: { applicationCriticalityGroupData: criticalityGroupData, applicationDetailsData, dealerLocations },
        },
    } = state;

    let returnValue = {
        criticalityGroupData,
        applicationDetailsData,
        dealerLocations,
    };
    return returnValue;
};

export const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, form, dealerLocations=[], fieldNames, ...restProps }) => {
    let inputField = '';
    switch (inputType) {
        case 'switch':
            inputField = (
                <Form.Item
                    normalize={(a, b) => (a ? 'Y' : 'N')}
                    style={{
                        margin: 0,
                    }}
                    key={record.id + index + dataIndex + 'swi'}
                    name={[index, dataIndex]}
                    // rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Switch defaultChecked={record[dataIndex] === 'Y'} readOnly={!record?.isEditable && !record.deletable} disabled={!record?.isEditable && !record.deletable} checkedChildren="Active" unCheckedChildren="Inactive" />
                </Form.Item>
            );
            break;
        case 'select':
            inputField = (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    key={record.id + index + dataIndex + 'swi'}
                    name={[index, dataIndex]}
                    rules={[validateRequiredSelectField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Select
                        defaultValue={record[dataIndex]}
                        showSearch
                        placeholder="Select accesable location"
                        optionFilterProp="children"
                        fieldNames={fieldNames}
                        style={{
                            width: '140px',
                        }}
                        // onChange={onChange}
                        // onSearch={onSearch}
                        filterOption={(input, option) => (option?.value ?? '').toLowerCase().includes(input.toLowerCase())}
                        options={dealerLocations}
                    />
                </Form.Item>
            );
            break;
        default:
            inputField = (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    key={record.id + index + dataIndex + 'swi'}
                    name={[index, dataIndex]}
                    rules={[validateRequiredInputField(`${title}`)]}
                    initialValue={record[dataIndex]}
                >
                    <Input readOnly={!record?.isEditable && !record.deletable} disabled={!record?.isEditable && !record.deletable} />
                </Form.Item>
            );
            break;
    }
    return <td key={record.id + index + dataIndex + 'swi'}>{inputField}</td>;
};

const existingLocation = [
    {
        key: Math.random() * 1000,
        id: '1321',
        code: 'uuid123',
        value: 'Location uuid123',
    },
    // {
    //     dealerLocationId: "11709848-ad3c-453f-94ec-6dbe6e7bb2c1",
    //     dealerOrgnizationId: "1",
    //     applicationId: "1",
    //     status: "y"
    // },
    // {
    //     dealerLocationId : "29a9f481-d74b-4036-b56c-dceb22cec511",
    //     dealerOrgnizationId : "1",
    //     applicationId: "1",
    //     status: "y"
    // },
];


const AccessibleDealerLocationsMain = ({ form, isReadOnly, formActionType, dealerLocations }) => {
    const [data, setRowsData] = useState(existingLocation);

    useEffect(() => {
        if(formActionType === "view"){
            setRowsData(existingLocation)
        }else{
            setRowsData([{}]);
        }
    },[formActionType])

    const handleAdd = () => {
        const currentlyFormDataObj = form.getFieldsValue();
        const newData = {
            id: Math.random() * 1000,
            key: Math.random() * 1000,
            label: '',
            value: '',
        };
        const newlyAddedRow = Object.entries(currentlyFormDataObj)
            .map(([key, value]) => value)
            .filter((v) => !!v);
        setRowsData([...newlyAddedRow, { ...newData }]);
    };

    // const edit = (record) => {
    //     const updatedDataItem = data && data.map((item) => (+item?.id === +record?.id ? { ...item, isEditable: true } : item));
    //     setRowsData(updatedDataItem);
    // };

    const deleteTableRows = (record, index) => {
        const currentRows = form.getFieldsValue();
        const updatedRows = Object.entries(currentRows)
            .map(([key, value]) => value)
            // .filter((v) => !!v)
            .filter((el) => el?.id !== record?.id);
        setRowsData([...updatedRows]);
    };

    const showConfirm = (record, index) => {
        confirm({
            title: 'Delete Location',
            icon: <ExclamationCircleFilled />,
            content: 'Do you Want to delete this location?',
            onOk() {
                deleteTableRows(record, index);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Dealer Location',
            dataIndex: 'dealerLocationId',
            width: '17%',
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {EditableCell({ record, index, title: 'Dealer Location', dataIndex: 'dealerLocationId', inputType: 'select', form, dealerLocations, fieldNames: {label: 'dealerLocationId', value: 'dealerLocationId' } })}
        
                        <Form.Item hidden initialValue={record.key} name={[index, 'key']}>
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={record.id} name={[index, 'id']}>
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={record.deletable} name={[index, 'deletable']}>
                            <Input />
                        </Form.Item>
                        <Form.Item hidden initialValue={record.isEditable} name={[index, 'isEditable']}>
                            <Input />
                        </Form.Item>
                    </Space>
                );
            },
        })
    );

    tableColumn.push(
        tblPrepareColumns({
            title: '',
            dataIndex: 'action',
            width:'50',
            sorter: false,
            render: (text, record, index) => {
                return (
                    <Space wrap>
                        {/* {!record?.deletable && <FaEdit onClick={() => edit(record)} />} */}
                        {<FaTrash onClick={() => showConfirm(record, index)} />}
                    </Space>
                );
            },
        })
    );
    
    return (
        <>
            <Form scrollToFirstError={true} preserve={false} form={form} layout="vertical" >
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        {/* <Table dataSource={data} pagination={false} columns={tableColumn} /> */}
                        <DataTable isLoading={false} tableColumn={tableColumn} tableData={data} />
                    </Col>
                </Row>
                {!isReadOnly && (
                    <Row justify="end" gutter={20} style={{ marginTop: '20px', marginRight: '2px' }}>
                        <Button danger onClick={handleAdd}>
                            <FaPlus className={styles.buttonIcon} />
                            Add Row
                        </Button>
                    </Row>
                )}
            </Form>
        </>
    );
};

export const AccessibleDealerLocations = connect(mapStateToProps, null)(AccessibleDealerLocationsMain);