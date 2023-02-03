import { BsFillStarFill, BsMoon } from 'react-icons/bs';
import { FaAddressBook } from 'react-icons/fa';

import { getMenyKey } from 'utils/menuKey';

export const MenuConstant = {
    [getMenyKey('FAVS')]: {
        link: undefined,
        icon: <BsFillStarFill fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('COMN')]: {
        link: undefined,
        icon: <BsFillStarFill fontSize={20} />,
        parentMenuId: 'WEB',
    },
    [getMenyKey('COMN-11')]: {
        link: undefined,
        icon: <BsFillStarFill fontSize={20} />,
        parentMenuId: 'COMN',
    },

    [getMenyKey('DBP')]: {
        link: undefined,
        icon: <FaAddressBook fontSize={20} />,
        parentMenuId: 'WEB',
    },

   
};
