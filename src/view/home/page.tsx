import { Button, Flex, Typography } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { firebaseAuth, firebaseStore } from '~config';
import { designToken } from '~core';

function HomePage() {
    useEffect(() => {
        (async function () {
            const collectionRef = collection(firebaseStore, 'test');
            const user = firebaseAuth.currentUser;

            console.log(user);

            try {
                const snapshot = await getDocs(collectionRef);
                console.log(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));

                if (snapshot.empty) {
                    console.log('empty? may be you are not login');
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleSubmit = async () => {
        await firebaseAuth.signOut();
    };

    return (
        <>
            <Typography.Title level={1}>HomePage</Typography.Title>
            <Flex gap={20}>
                <Button
                    variant='filled'
                    color='primary'
                    css={{
                        minWidth: 148,
                        height: 48,
                        '&.ant-btn-color-primary.ant-btn-variant-filled:not(:disabled):not(.ant-btn-disabled):hover': {
                            backgroundColor: designToken['orange-2'],
                        },
                    }}
                    onClick={handleSubmit}
                >
                    Đăng xuất
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    css={{
                        minWidth: 148,
                        height: 48,
                        '&.ant-btn-color-primary.ant-btn-variant-outlined': {
                            backgroundColor: designToken['orange-1'],
                        },
                    }}
                >
                    Hủy bỏ
                </Button>
                <Button variant='solid' color='primary' css={{ minWidth: 148, height: 48 }}>
                    Thêm dịch vụ
                </Button>
            </Flex>
        </>
    );
}

export default HomePage;
