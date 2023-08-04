

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewProductDetail } from '@components/common/ProductHierarchy/ViewProductDetail';
import { screen } from '@testing-library/react';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

const selectedTreeData = {
    skuAttributes: [
        { id: 'test', code: "test", active: true },
        { id: 'test1', code: "test", active: false },
        { id: 'test2', code: "test", active: true },
        { id: 'test3', code: "test", active: true },
        { id: 'test4', code: "test", active: true },
        { id: 'test5', code: "test", active: false }
    ],
    active: true
}
const skuAttributes = [
    { id: 'test', code: "test", value: "tsetvalue" },
    { id: 'test', code: "test", value: "tsetvalue" },
    { id: 'test', code: "test", value: "tsetvalue" },
    { id: 'test', code: "test", value: "tsetvalue" },
    { id: 'test', code: "test", value: "tsetvalue" },
    { id: 'test', code: "test", value: "tsetvalue" }]

const props = {
    setSKUAttributes: jest.fn(),
    viewTitle: "DMA test",
    handleEditBtn: jest.fn(),
    handleRootChildBtn: jest.fn(),
    handleChildBtn: jest.fn(),
    handleSiblingBtn: jest.fn(),
    styles: jest.fn()
}

const viewProps = {
    bordered: false,
    colon: false,
    layout: 'vertical',
    title: <div className={props.styles.contentHeaderRightBackground}>{props.viewTitle}</div>,
    column: {}
};

describe('ViewProductDetail component', () => {
    it('should render the ViewProductDetail components', () => {
        customRender(<ViewProductDetail
            viewProps={viewProps}
            selectedTreeData={selectedTreeData}
            skuAttributes={skuAttributes}
            {...props}
            setDisabledEdit={jest.fn()}
            setSKUAttributes={jest.fn()}
        />);
        expect(screen.getByText(/Attribute Level/)).toBeInTheDocument();
        expect(screen.getByText(/Parent/)).toBeInTheDocument();
        expect(screen.getByText(/Code/)).toBeInTheDocument();
        expect(screen.getByText(/Short Description/)).toBeInTheDocument();
        expect(screen.getByText(/Long Description/)).toBeInTheDocument();
        expect(screen.getByText(/Status/)).toBeInTheDocument();
        screen.debug()
    });
});
