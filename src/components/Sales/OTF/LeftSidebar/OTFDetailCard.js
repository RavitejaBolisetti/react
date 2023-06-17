import React from 'react';
import { Collapse, Space } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const { Panel } = Collapse;
const expandIcon = ({ isActive }) => (isActive ? <SlArrowUp size={18} /> : <SlArrowDown size={18} />);

const OTFDetailCard = (props) => {
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon}>
            <Panel
                header={
                    <>
                        <Space direction="vertical">
                            <p>
                                Name - <span>John Michael</span>
                            </p>
                            <p>
                                OTF No. - <span>4962946</span>
                            </p>
                        </Space>
                    </>
                }
                key={1}
            >
                <p>
                    Customer Type: <span>Corporate</span>
                </p>
                <p>
                    Mobile No.: <span>9893473843</span>
                </p>
                <p>
                    OTF Date: <span>01 Dec 2021</span>
                </p>
                <p>
                    Model: <span>SCORPIO</span>
                </p>
                <p>
                    CPD: <span>13 April 2023</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default OTFDetailCard;
