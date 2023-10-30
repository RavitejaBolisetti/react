import { render } from '@testing-library/react';
import { tableColumnSearchOTF } from '@components/Sales/VehicleAllotment/tableColumnSearchOTF';

test('tableColumnSearchOTF generates correct columns', () => {
    const columns = tableColumnSearchOTF();


    expect(columns[0].title).toBe('Booking No.');
    expect(columns[0].dataIndex).toBe('otfNumber');

    expect(columns[1].title).toBe('Booking Date');
    expect(columns[1].dataIndex).toBe('otfDate');

    render(<div>{columns[0].render('Test')}</div>);
    render(<div>{columns[1].render('Test')}</div>);
    render(<div>{columns[3].render('Test')}</div>);
 
});
