import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { ChangeHistory } from '@components/common/ProductHierarchy/ChangeHistory';

describe("ChangeHistory Components", () => {

    it("should render ChangeHistory components", () => {
        customRender(<ChangeHistory />);
    });

});