import { css } from '@emotion/react';
import { Checkbox, CheckboxOptionType, CheckboxProps, Flex } from 'antd';
import { useState } from 'react';

interface IProps {
    options: CheckboxOptionType<string>[];
    value?: string[] | undefined;
    onChange?: (value: unknown) => void;
}

const cssUserSelect = css({
    '& label > span, label& > span': { userSelect: 'none' },
});
const cssFlex = css({
    flexDirection: 'column',
    gap: 12,
});

function CheckboxGroup({ options, value, onChange }: IProps) {
    const [checkedList, setCheckedList] = useState<string[]>(value ?? []);

    const checkAll = options.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < options.length;

    const handleChange = (list: string[]) => {
        setCheckedList(list);
        onChange?.(list);
    };

    const handleCheckAllChange: CheckboxProps['onChange'] = (e) => {
        const list: string[] = e.target.checked ? options.map((item) => item.value) : [];
        setCheckedList(list);
        onChange?.(list);
    };

    return (
        <Flex gap={12} vertical>
            <Checkbox
                indeterminate={indeterminate}
                onChange={handleCheckAllChange}
                checked={checkAll}
                css={cssUserSelect}
            >
                Tất cả
            </Checkbox>
            <Checkbox.Group
                options={options}
                value={checkedList}
                onChange={handleChange}
                css={[cssFlex, cssUserSelect]}
            />
        </Flex>
    );
}

export default CheckboxGroup;
