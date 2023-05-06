import { useState } from 'react';
import { Table, Pagination, Row, Col, Select } from 'antd';
import { InputSkeleton } from 'components/common/Skeleton';

export default function DataTable({ isLoading, tableColumn, tableData }) {
    const showTotal = (total) => `Total ${!isLoading ? tableData?.length : null} items`;

    const [tablePagination, setPagination] = useState({ pageSize: 10, current: 1, position: ['bottomRight'], showSizeChanger: true, hideOnSinglePage: true, showTotal });

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination({ ...pagination, showTotal });
    };

    const tableSkeletonColumn = tableColumn?.map((item) => {
        return { ...item, render: () => <InputSkeleton height={40} /> };
    });

    const skeletonData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    const onChange = (page, pageSize) => {
        setPagination({ ...tablePagination, current: page });
    };
    return (
        <>
            <Table
                columns={isLoading ? tableSkeletonColumn : tableColumn}
                dataSource={isLoading ? skeletonData : tableData}
                onChange={handleTableChange}
                pagination={tablePagination}
                scroll={{
                    x: 'auto',
                }}
            />
            {/* <Row>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Select
                        defaultValue="10"
                        style={{
                            width: 120,
                        }}
                        options={[
                            {
                                value: '10',
                                label: '10 / Page',
                            },
                            {
                                value: '20',
                                label: '20 / Page',
                            },
                            {
                                value: '30',
                                label: '30 / Page',
                            },
                            {
                                value: '50',
                                label: '50 / Page',
                            },

                            {
                                value: '100',
                                label: '100 / Page',
                            },
                        ]}
                    />
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ float: 'right' }}>
                    <Pagination current={tablePagination?.current} total={tableData?.length} hideOnSinglePage={true} pagination={tableData?.length > 10 ? tablePagination : false} showSizeChanger={false} onChange={onChange} showTotal={showTotal} />
                </Col> 
            </Row>*/}
        </>
    );
}
