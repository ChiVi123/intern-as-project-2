import { FormInstance } from 'antd';
import Button from './button';

interface IProps {
    form: FormInstance;
}

function ButtonGroupForm({ form }: IProps) {
    return (
        <div css={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, marginBottom: 32 }}>
            <Button variant='filled'>Hủy bỏ</Button>
            <Button onClick={() => form.submit()}>Cập nhật</Button>
        </div>
    );
}

export default ButtonGroupForm;
