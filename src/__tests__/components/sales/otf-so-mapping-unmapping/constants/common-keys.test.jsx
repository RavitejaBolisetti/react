import { setAllkeysToNull } from 'components/Sales/OtfSoMappingUnmapping/Constants';

describe('setAllkeysToNull Component', () => {

    it('should load set all keys to null', () => {
        (setAllkeysToNull())
    });

    it('should load set all keys to null with data', () => {
        (setAllkeysToNull('Data'))
    });

});