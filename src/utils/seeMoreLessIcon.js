/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { translateContent } from "./translateContent";

export const seeMoreLessIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>{translateContent('global.buttons.seeLess')}</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>{translateContent('global.buttons.seeMore')}</span>
            <SlArrowDown size={13} />
        </>
    );
