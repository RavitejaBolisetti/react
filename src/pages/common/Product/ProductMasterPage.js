import React, { useState } from 'react';

import { Table, Switch, Popconfirm, Form, Select, Row, Col, Button, Modal, Input } from 'antd';
import { FaTrash } from "react-icons/fa";

import { withLayoutMaster } from 'components/withLayoutMaster';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const { Option } = Select;
export const ProductMasterPageBase = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [attri,setAttri]=useState(false);
    const [bottom, setBottom] = useState('bottomLeft');
    const handleattri=()=> {
        setAttri(!attri);
        console.log(attri);
    }
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

            width: "10%",
        },

        {
            title: 'Attribute Name',
            dataIndex: 'AttributeName',

            width: "30%",
        },
        {
            title: 'Attribute Value',
            render: () => <Input placeholder="Dummy Place Holder" readonly="true" />,
            dataIndex: 'AttributeValue',

            width: "30%",
        },







    ];

    const [dataSource, setDataSource] = useState([
        {
            Srl: "1.",
            AttributeName: "	Product Division",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "2.",
            AttributeName: "Model Group",
            AttributeValue: "Mahindra Scorpio"

        },
        {
            Srl: "3.",
            AttributeName: "Sales Model Group",
            AttributeValue: "Mahindra Scorpio",

        },
        {
            Srl: "4.",
            AttributeName: "Model Family",
            AttributeValue: "Mahindra Scorpio",


        },
        {
            Srl: "5.",
            AttributeName: "Vehicle Type",
            AttributeValue: "Mahindra Scorpio",


        },
        {
            Srl: "6.",
            AttributeName: "Vehicle Category",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "7.",
            AttributeName: "Body Type",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "8.",
            AttributeName: "Vehicle Category",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "9.",
            AttributeName: "Seating Capacity",
            AttributeValue: "Mahindra Scorpio"


        },
        {
            Srl: "10.",
            AttributeName: "Trim Level",
            AttributeValue: "Mahindra Scorpio"


        },
        


    ])
    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };
    return (

        <>
            <h5>Product Attributes Details (Mahindra Scorpio Classic Petrol)</h5>
            <Button onClick={handleattri} danger>View Attribute Detail</Button>
            { attri ?<>
            
            
             <Table
              style={{width: '70%', fontSize: '40px'}}
                columns={columns}
                dataSource={dataSource}
                onChange={onChange}
                pagination={{
                    position:[bottom],
                    pageSize: 10,
                    total: 50
                }}
                // scroll={{
                //     x: 300,
                //     y: 300,
                // }}
            /></>: null }
        </>
    );
};
export const ProductMasterPage = withLayoutMaster(ProductMasterPageBase);

