/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { crudDataReducer } from 'store/reducers/crud/crudData';
import { RECEIVE_DATA_LOADING_ACTION_CONSTANT, RECEIVE_DATA_ACTION_CONSTANT, RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT, RECIEVE_DATA_DETAIL_ACTION_CONSTANT, SAVE_DATA_ACTION_CONSTANT, RESET_DATA_ACTION_CONSTANT, RESET_DETAIL_DATA_ACTION_CONSTANT } from 'store/actions/data/shieldSchemeCategoryLov';

export const ShieldSchemeCategoryLov = crudDataReducer({
    RECEIVE_DATA_LOADING_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_CONSTANT,
    RECEIVE_DATA_ACTION_APPLY_FILTER_CONSTANT,
    RECIEVE_DATA_DETAIL_ACTION_CONSTANT,
    SAVE_DATA_ACTION_CONSTANT,
    RESET_DATA_ACTION_CONSTANT,
    RESET_DETAIL_DATA_ACTION_CONSTANT,
});
