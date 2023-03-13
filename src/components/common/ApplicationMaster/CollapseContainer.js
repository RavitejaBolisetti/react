// import React from 'react';
// import { Input, Select, Switch, TreeSelect, Collapse, Space, Table, Modal } from 'antd';
// const CollapseContainer = () => {
//     return (
//         <Collapse defaultActiveKey={['1']} expandIconPosition="end">
//             <Panel header="Application Details" key="1">
//                 <Form layout="vertical">
//                     <Row gutter={20}>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Application ID" label="Application ID" rules={[validateRequiredSelectField('Application ID')]}>
//                                 <Input placeholder="Type code here" />
//                             </Form.Item>
//                         </Col>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Application Name" label="Application Name" rules={[validateRequiredSelectField('Application Name')]}>
//                                 <Input placeholder="Type code here" />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Row gutter={20}>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Application Title" label="Application Title" rules={[validateRequiredSelectField('Application Type')]}>
//                                 <Input placeholder="Type code here" />
//                             </Form.Item>
//                         </Col>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Application Type" label="Application Type" rules={[validateRequiredSelectField('Application Type')]}>
//                                 <Input placeholder="Type code here" />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Row gutter={20}>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Parent Application ID" label="Parent Application ID" rules={[validateRequiredSelectField('Parent Application ID')]}>
//                                 <Select>
//                                     <Option></Option>
//                                 </Select>
//                             </Form.Item>
//                         </Col>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Application Criticality Group" label="Application Criticality Group" rules={[validateRequiredSelectField('Application Criticality Group')]}>
//                                 <Select>
//                                     <Option></Option>
//                                 </Select>
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Row gutter={20}>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Accessible Locations" label="Accessible Locations" rules={[validateRequiredSelectField('Accessible Locations')]}>
//                                 <Input placeholder="Type code here" />
//                             </Form.Item>
//                         </Col>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Document No. to be generated" label="Document No. to be generated" rules={[validateRequiredSelectField('Document No. to be generated')]}>
//                                 <Switch defaultChecked checkedChildren="Active" unCheckedChildren="Inactive" />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                     <Row gutter={20}>
//                         <Col xs={24} sm={12} md={12} lg={12} xl={12}>
//                             <Form.Item name="Status" label="Status" rules={[validateRequiredSelectField('Status')]}>
//                                 <Switch defaultChecked checkedChildren="Active" unCheckedChildren="Inactive" />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//                 </Form>
//             </Panel>

//             <Panel header="Application Actions" key="2">
//                 <Row gutter={20}>
//                     <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
//                         <Table columns={columns} dataSource={data} pagination={false} />
//                         <Row gutter={20}>
//                             <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer} style={{ marginTop: '15px' }}>
//                                 <Button danger>
//                                     <FaUserPlus className={styles.buttonIcon} />
//                                     Add Row
//                                 </Button>
//                             </Col>
//                         </Row>
//                     </Col>
//                 </Row>
//             </Panel>

//             <Panel header="Document Types" key="3">
//                 <Row gutter={20}>
//                     <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
//                         <Table
//                             columns={tableColumn}
//                             dataSource={dataSource}
//                             pagination={{
//                                 position: [bottom],
//                             }}
//                             scrollable={true}
//                         />
//                         <Row gutter={20}>
//                             <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
//                                 <Button danger>
//                                     <FaUserPlus className={styles.buttonIcon} />
//                                     Add Row
//                                 </Button>
//                             </Col>
//                         </Row>
//                     </Col>
//                 </Row>
//             </Panel>
//             <Panel header="Accessible Dealer Locations" key="3">
//                 <Row gutter={20}>
//                     <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
//                         <LocationTable />
//                         <Row gutter={20}>
//                             <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
//                                 <Button danger>
//                                     <FaUserPlus className={styles.buttonIcon} />
//                                     Add Row
//                                 </Button>
//                             </Col>
//                         </Row>
//                     </Col>
//                 </Row>
//             </Panel>
//         </Collapse>
//     );
// };

// export default CollapseContainer;
