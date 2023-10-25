/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { listStateActionConstants } from 'store/actions/common/Geo/State/ListState';
import { crudListReducer } from 'store/reducers/crud/crudList';

export const ListState = crudListReducer(listStateActionConstants);
