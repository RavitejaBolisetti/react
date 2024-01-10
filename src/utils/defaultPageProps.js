/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const defaultPageProps = (page) => {
    return [
        {
            key: 'pageSize',
            title: 'Value',
            value: page?.pageSize ?? 10,
            canRemove: true,
            filter: false,
        },
        {
            key: 'pageNumber',
            title: 'Value',
            value: page?.current ?? 1,
            canRemove: true,
            filter: false,
        },
        {
            key: 'sortBy',
            title: 'Sort By',
            value: page?.sortBy,
            canRemove: true,
            filter: false,
        },
        {
            key: 'sortIn',
            title: 'Sort Type',
            value: page?.sortType,
            canRemove: true,
            filter: false,
        },
    ];
};
