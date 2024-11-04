import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { firebaseStore } from '~config';

function DashboardPage() {
    useEffect(() => {
        (async function () {
            const collectionRef = collection(firebaseStore, 'test');

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

    return <>DashboardPage</>;
}

export default DashboardPage;
