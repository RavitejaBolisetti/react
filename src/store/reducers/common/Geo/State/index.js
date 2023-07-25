/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { AddState } from './AddState';
import { EditState } from './EditState';
import { ListState } from './ListState';

export const State = combineReducers({
    AddState,
    EditState,
    ListState,
});
