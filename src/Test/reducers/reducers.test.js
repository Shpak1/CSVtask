import dataTable from '../../reducers/table';
import data from '../helper';


test('should return object', () => {
    const action = {
        type: 'DATA_TABLE',
    };
    const state = dataTable(data[0], action);
    expect(state).toEqual(data[0]);
});
