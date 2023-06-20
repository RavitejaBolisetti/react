/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { addActionConstants, addActions } from 'store/actions/crud/crudAdd';
import { prefix } from './prefix';

export const addConfigurableParameterActionConstants = addActionConstants(prefix);
export const addConfigurableParameterActions = addActions(addConfigurableParameterActionConstants);
