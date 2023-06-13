import React, { useState } from 'react';
import { ViewIndividualAddressDetails } from './ViewIndividualAddressDetails';
import { Collapse, Space, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { FaRegUserCircle } from 'react-icons/fa';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewAddressList = (formProps) => {
    const { styles, contactData, formData, isViewModeVisible } = formProps;
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleCheckboxChange = (event) => {
        console.log('event', event);
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div>
            {!isViewModeVisible
                ? contactData?.length > 0 &&
                  contactData?.map((data, i) => {
                      return (
                          <Collapse onChange={() => handleCollapse(i)} expandIconPosition="end" expandIcon={({ isActive }) => expandIcon(isActive)} activeKey={openAccordian}>
                              <Panel
                                  header={
                                      <Row>
                                          <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                              <Space>
                                                  <FaRegUserCircle className={styles.userCircle} />
                                                  <Text strong> {`${data?.addressType ? data?.addressType : ''} `}</Text>
                                              </Space>
                                          </Col>
                                          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                              {data?.defaultaddress && (
                                                  <>
                                                      <Checkbox valuePropName="checked" defaultValue={data?.defaultaddress} onChange={handleCheckboxChange}>
                                                          Mark As Default
                                                      </Checkbox>
                                                      <Divider type="vertical" />
                                                  </>
                                              )}
                                              <Text type="secondary">{data?.addressType}</Text>
                                          </Col>
                                      </Row>
                                  }
                                  key={i}
                              >
                                  <ViewIndividualAddressDetails styles={styles} formData={data} />
                              </Panel>
                          </Collapse>
                      );
                  })
                : formData?.length > 0 &&
                  formData?.map((data) => {
                      return <ViewIndividualAddressDetails styles={styles} formData={data} />;
                  })}
        </div>
    );
};

export default ViewAddressList;
