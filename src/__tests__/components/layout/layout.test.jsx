import React from 'react';
import { Layout, InnerLayout } from 'components/Layout/Layout';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('antd/es/layout/Sider', () => {
    return function Sider(props) {
        return <div {...props} />;
    };
});

describe('Add Edit Form Component', () => {

    it('should render add edit form component UI', () => {
        customRender(<Layout />)
    });

    it('should render inner layout', () => {
        customRender(<InnerLayout />)
    });

    it('should render header', () => {
        customRender(<Layout.Header />)
    });

    it('should render inner header', () => {
        customRender(<InnerLayout.Header />)
    });

    it('should render left menu', () => {
        customRender(<Layout.LeftMenu />)
    });

    it('should render main body', () => {
        customRender(<Layout.MainBody />)
    });

    it('should render center body', () => {
        customRender(<Layout.CenterBody />)
    });

    it('should render footer', () => {
        customRender(<Layout.Footer />)
    });

});