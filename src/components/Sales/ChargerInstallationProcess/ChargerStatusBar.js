/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Steps } from 'antd';

import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';

export const ChargerStatusBar = (props) => {
    const { status } = props;

    const otfStatusList = Object.values(QUERY_BUTTONS_CONSTANTS);
    const currentStatusId = otfStatusList?.find((i) => i.key === status)?.id;

    if (status === QUERY_BUTTONS_CONSTANTS.SITE_SURVEY.key) {
        otfStatusList.filter((i) => i.displayOnView && i?.id === QUERY_BUTTONS_CONSTANTS.SITE_SURVEY.id);
    } else if (status === QUERY_BUTTONS_CONSTANTS.SITE_VALIDATION.key) {
        otfStatusList.filter((i) => (i.displayOnView && i?.id === QUERY_BUTTONS_CONSTANTS.SITE_SURVEY.id) || QUERY_BUTTONS_CONSTANTS.SITE_VALIDATION.id);
    }

    return (
        <Steps
            current={0}
            size="small"
            labelPlacement="vertical"
            items={otfStatusList.map((i) => ({
                ...i,
                icon: i.id <= currentStatusId ? <FaCheckCircle color={'#70C922'} /> : <BsRecordCircleFill color={'#b5b5b6'} />,
            }))}
        />
    );
};
