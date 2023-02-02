import React, { useState } from 'react';

import { Table, Switch, Popconfirm, Form, Select, Row, Col,Button,Modal } from 'antd';
import { FaTrash } from "react-icons/fa";

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const { Option } = Select;
export const ProductMasterPageBase = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    const columns = [
        {
            title: 'Srl.',
            dataIndex: 'Srl',

            width: '210px',
        },

        {
            title: 'Product Status',
            dataIndex: 'ProductStatus',



            width: '210px',
        },
        {
            title: 'Product Description',
            dataIndex: 'ProductDescription',

            width: '210px',
        },


        // {
        //     title: 'Description',
        //     dataIndex: 'Description',
        //     sorter: (a, b) => a.age - b.age,
        //     width: '30%',
        // },
        {
            title: 'Description to be printed on Invoice',
            dataIndex: 'Description',

            width: '210px',
        },
        {
            title: ' Status',
            key: 'key',
            dataIndex: 'key',
            render: () => <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />,
            width: '210px',
        },

        {
            title: 'Product Attributes',
            dataIndex: 'Parent',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <FaTrash />
                    </Popconfirm>
                ) : null,
            width: '210px',
        },




    ];

    const [dataSource, setDataSource] = useState([
        {
            Srl: "1.",
            ProductStatus: "T123456788",
            ProductDescription: "Mahindra Scorpio",
            Description: "Lorem ipsum is a name for...",
            Status: "Active",
            key: "6",
            Parent: "India",
            ShortDescription: "SMT 7STR",
            LongDescription: "This Smt 7STR variant comes..",
            Status: "Inactive",
        },
        {
            Srl: "2.",
            ProductStatus: "T123456788",
            ProductDescription: "Mahindra Scorpio",
            Description: "Lorem ipsum is a name for...",

            Parent: "India",
            key: "4",
            ShortDescription: "SMT 7STR",
            LongDescription: "This Smt 7STR variant comes..",
            Status: "Active",
        },
        {
            Srl: "3.",
            ProductStatus: "T123456788",
            ProductDescription: "Mahindra Scorpio",
            Description: "Lorem ipsum is a name for...",
            Status: "Active",
            key: "2",
            Parent: "India",
            ShortDescription: "SMT 7STR",
            LongDescription: "This Smt 7STR variant comes..",
            Status: "Inactive",
        },
        {
            Srl: "4.",
            ProductStatus: "T123456788",
            ProductDescription: "Mahindra Scorpio",
            Description: "Lorem ipsum is a name for...",
            Status: "Active",
            key: "1",
            Parent: "India",
            ShortDescription: "SMT 7STR",
            LongDescription: "This Smt 7STR variant comes..",

        },
        {
            Srl: "5.",
            ProductStatus: "T123456788",
            ProductDescription: "Mahindra Scorpio",
            Description: "Lorem ipsum is a name for...",
            Status: "Active",
            key: "3",
            Parent: "India",
            ShortDescription: "SMT 7STR",
            LongDescription: "This Smt 7STR variant comes..",

        },


    ])
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    return (
        <>
            <Form layout="vertical">
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Form.Item name="Parent Hierarchy Name" label="Parent Hierarchy Name" rules={[validateRequiredSelectField('Parent Hierarchy Name')]}>
                            <Select
                                defaultValue="Select"
                                options={[
                                    { value: 'Mahindra Electric', label: 'Mahindra Electric' },
                                    { value: 'Mahindra SUV', label: 'Mahindra SUV ' },
                                    { value: 'Mahindra Tractors', label: 'Mahindra Tractors ' },
                                    { value: 'Mahndra 2 Wheelers', label: 'Mahindra 2 Wheelers' },
                                    { value: 'Mahindra Truck & Bus', label: 'Mahindra Truck & Bus' },
                                ]}
                            />

                        </Form.Item>
                    </Col>

                    <Col xs={2400} sm={1200} md={1200} lg={120} xl={120}>
                        <Form.Item name="Choose Parent Hierarchy" label="Choose Parent Hierarchy">
                            <Button type="primary" className="btn btn-outline srchbtn mr0 boxShdwNon"
                            onClick={showModal}>CHANGE PARENT</Button>
                        </Form.Item>
                        <Modal title="Choose Product Hierarchy"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Parent Hierarchy</p>
                        <Form layout="inline">
                <Row gutter={24}>
                    
                    <Col  span={8}>
                        
                        <Form.Item name="Parent Hierarchy "  rules={[validateRequiredSelectField('Parent Hierarchy Name')]}>
                            <Select
                                defaultValue="Choose Parent Hierarchy"
                                options={[
                                    { value: 'Mahindra Electric', label: 'Mahindra Electric' },
                                    { value: 'Mahindra SUV', label: 'Mahindra SUV ' },
                                    { value: 'Mahindra Tractors', label: 'Mahindra Tractors ' },
                                    { value: 'Mahndra 2 Wheelers', label: 'Mahindra 2 Wheelers' },
                                    { value: 'Mahindra Truck & Bus', label: 'Mahindra Truck & Bus' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item rules={[validateRequiredSelectField('Parent Hierarchy Name')]}>
                            <Select
                                defaultValue="Choose Child Hierarchy"
                                options={[
                                    { value: 'Mahindra Electric', label: 'Mahindra Electric' },
                                    { value: 'Mahindra SUV', label: 'Mahindra SUV ' },
                                    { value: 'Mahindra Tractors', label: 'Mahindra Tractors ' },
                                    { value: 'Mahndra 2 Wheelers', label: 'Mahindra 2 Wheelers' },
                                    { value: 'Mahindra Truck & Bus', label: 'Mahindra Truck & Bus' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item  rules={[validateRequiredSelectField('Parent Hierarchy Name')]}>
                            <Select
                                defaultValue="Choose Sub-Child Hierarchy"
                                options={[
                                    { value: 'Mahindra Electric', label: 'Mahindra Electric' },
                                    { value: 'Mahindra SUV', label: 'Mahindra SUV ' },
                                    { value: 'Mahindra Tractors', label: 'Mahindra Tractors ' },
                                    { value: 'Mahndra 2 Wheelers', label: 'Mahindra 2 Wheelers' },
                                    { value: 'Mahindra Truck & Bus', label: 'Mahindra Truck & Bus' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    </Row>
                    </Form>
                        </Modal>
                    </Col>
                </Row>

            </Form>

            <Table
                columns={columns}
                dataSource={dataSource}
                onChange={onChange}
                scroll={{
                    x: 1300,
                    y: 300,
                }}
            />
        </>
    );
};
export const ProductMasterPage = withLayoutMaster(ProductMasterPageBase);

