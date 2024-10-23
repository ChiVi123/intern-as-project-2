interface IReduxState<T> {
    data: T;
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string;
}
