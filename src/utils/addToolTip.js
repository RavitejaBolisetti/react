/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Tooltip } from 'antd';
import React from 'react';

export const addToolTip =
    (title, placement = 'bottom', color = '', className = '', defaultOpen = false) =>
    (inputComponent) => {
        const canOpen = defaultOpen ? { open: true } : undefined;
        return inputComponent ? (
            <Tooltip overlayClassName={className} title={title} placement={placement} color={color} {...canOpen}>
                {inputComponent}
            </Tooltip>
        ) : (
            title
        );
    };
