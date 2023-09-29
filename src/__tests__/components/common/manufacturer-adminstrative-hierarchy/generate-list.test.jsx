import React from 'react';
import { ManufacturerAdminstrativeHierarchy } from '@components/common/ManufacturerAdminstrativeHierarchy/ManufacturerAdminstrativeHierarchy';
import { generateList, findParentName } from '@components/common/ManufacturerAdminstrativeHierarchy/generateList';
import customRender from '@utils/test-utils';

describe('MyComponent', () => {
  it('renders a list of items correctly', () => {
    const data = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
                children: []
              }
            ]
          }
        ]
      }
    ];
    const fieldNames = {
      children: 'children'
    };

    const expectedList = generateList(data, fieldNames);
    const findName = findParentName(data, fieldNames);
    customRender(<ManufacturerAdminstrativeHierarchy data={data} fieldNames={fieldNames} />);
  });
});




