/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const handleEdit = (props) => (record) => () => {
    const { onEditAction } = props;
    onEditAction(record.id);
};

export const handleCustomEdit = (props) => (record) => () => {
    const { history, url } = props;
    history.push(url);
};
