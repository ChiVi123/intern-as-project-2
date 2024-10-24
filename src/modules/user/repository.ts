import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '~config';

export const signIn = async (email: string, password: string) => {
    try {
        return await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
        console.log(error);
    }
};
