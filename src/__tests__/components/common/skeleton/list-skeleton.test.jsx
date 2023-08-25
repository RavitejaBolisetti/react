/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { ListSkeleton } from '@components/common/Skeleton/ListSkeleton';
afterEach(() => {
    jest.restoreAllMocks();
});

describe('ListSkeleton Components', () => {
    it('should render ListSkeleton components', () => {
        customRender(<ListSkeleton />);
    });
});
