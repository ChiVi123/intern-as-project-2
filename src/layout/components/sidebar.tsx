import { Button } from '~components';
import { RightFromBracketFilledIcon } from '~icons';
import Navigate from './navigate';

function Sidebar() {
    return (
        <>
            <div>
                <div css={{ width: 80, marginInline: 'auto', marginBottom: 54 }}>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/intern-as-project-2.appspot.com/o/logo-alta-min-160x128.png?alt=media&token=8a296b60-778b-42f4-be9f-f372cd3d6de5'
                        alt='logo'
                        css={{ width: '100%', height: '100%' }}
                    />
                </div>

                <Navigate />
            </div>

            <div css={{ paddingInline: 12 }}>
                <Button variant='filled' block icon={<RightFromBracketFilledIcon />}>
                    Đăng xuất
                </Button>
            </div>
        </>
    );
}

export default Sidebar;
