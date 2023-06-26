/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { listActionConstants, listActions } from 'store/actions/crud/crudList';
import { prefix } from './prefix';

export const listConfigurableParameterActionConstants = listActionConstants(prefix);
export const listConfigurableParameterActions = listActions(listConfigurableParameterActionConstants);
