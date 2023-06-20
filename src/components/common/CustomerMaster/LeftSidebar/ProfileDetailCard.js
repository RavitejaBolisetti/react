import React from 'react';
import { Collapse, Space } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';

const { Panel } = Collapse;
const expandIcon = ({ isActive }) => (isActive ? <SlArrowUp size={18} /> : <SlArrowDown size={18} />);

const ProfileDetailCard = (props) => {
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
                                <span>4962946</span>
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
            </Panel>
        </Collapse>
    );
};

export default ProfileDetailCard;
