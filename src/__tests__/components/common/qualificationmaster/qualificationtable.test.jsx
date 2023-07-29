import { render } from '@testing-library/react';
import { tableColumn } from '@components/common/QualificationMaster/tableColumn';

test('renders table columns correctly', () => {
    const handleButtonClick = jest.fn();

    const columns = tableColumn(handleButtonClick, 1, 10);

    columns.forEach((column) => {
        const { getByText } = render(<div>{column.title}</div>);
        const columnTitle = getByText(column.title);
        expect(columnTitle).toBeInTheDocument();
    });

    const statusRender = columns.find((column) => column.dataIndex === 'status')?.render;
    if (statusRender) {
        const { container } = render(statusRender(1));
        const statusTag = container.querySelector('.ant-tag');
        expect(statusTag).toBeInTheDocument();
    }
});
