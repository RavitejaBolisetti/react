/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Steps } from 'antd';

import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { OTF_STATUS } from 'constants/OTFStatus';

export const OTFStatusBar = (props) => {
    const { status } = props;

    const otfStatusList = Object.values(OTF_STATUS);
    const currentStatusId = otfStatusList?.find((i) => i.title === status)?.id;

    const displayItem = otfStatusList
        .filter((i) => i.displayOnView)
        .map((i) => ({
            ...i,
            icon: i.id <= currentStatusId ? <FaCheckCircle color={'#70C922'} /> : <BsRecordCircleFill color={'#b5b5b6'} />,
        }));
    return <Steps current={0} size="small" labelPlacement="vertical" items={displayItem} />;
};
