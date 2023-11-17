/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { translateContent } from 'utils/translateContent';

export const drawerTitle = (formActionType) => {
    if (formActionType?.viewMode) {
        return translateContent('global.drawerTitle.view');
    } else if (formActionType?.editMode) {
        return translateContent('global.drawerTitle.edit');
    } else {
        return translateContent('global.drawerTitle.add');
    }
};
