import React from 'react';
import { Steps } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { OTF_STATUS } from 'constants/OTFStatus';

const OTFStatusBar = (props) => {
    const { status } = props;
    const otfStatusList = Object.values(OTF_STATUS);
    return <Steps current={0} size="small" labelPlacement="vertical" items={otfStatusList.filter((i) => i.displayOnView).map((i) => ({ ...i, icon: i.id === status ? <FaCheckCircle color={'#70C922'} /> : <BsRecordCircleFill color={'#b5b5b6'} /> }))} />;
};

export default OTFStatusBar;
