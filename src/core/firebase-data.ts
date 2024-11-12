import { DocumentData, DocumentReference, DocumentSnapshot, getDoc, getDocs, Query } from 'firebase/firestore';

export function snapToData<T = DocumentData>(
    snapshot: DocumentSnapshot<T>,
    options: { idField?: string } = {},
): T | undefined {
    const data = snapshot.data();

    if (!snapshot.exists() || typeof data !== 'object' || data === null) {
        return data;
    }

    if (options.idField) {
        (data[options.idField as keyof T] as string) = snapshot.id;
    }
    return data as T;
}

export async function getDocData<T = DocumentData>(
    ref: DocumentReference<T>,
    options: { idField?: string } = {},
): Promise<T | undefined> {
    const snap = await getDoc(ref);
    return snapToData(snap, options);
}

export async function getDocsData<T = DocumentData>(query: Query<T>, options: { idField?: string } = {}): Promise<T[]> {
    const querySnap = await getDocs(query);
    return querySnap.docs.map((snap) => snapToData(snap, options)!);
}

export async function getDocRefs<T = DocumentData>(
    ref: DocumentReference<T>,
    options: { idField?: string; fields?: string[] } = {},
): Promise<T | undefined> {
    const docData = await getDocData(ref, options);
    if (!docData) {
        return docData;
    }

    // filter field is reference type
    if (!options.fields?.length) {
        options.fields = Object.keys(docData as keyof T).filter(
            (k) => docData[k as keyof T] instanceof DocumentReference,
        );
    }

    const promise = [];
    for (const field of options.fields) {
        promise.push(getDocData(docData[field as keyof T] as DocumentReference, options));
    }

    const childData = await Promise.all(promise);
    for (const field of options.fields) {
        (docData[field as keyof T] as DocumentData) = childData.shift()!;
    }
    return docData;
}

export async function getDocsRefs<T = DocumentData>(
    query: Query<T>,
    options: { idField?: string; fields?: string[] } = {},
): Promise<T[]> {
    const docs = await getDocsData(query, options);
    if (!options.fields?.length) {
        options.fields = Object.keys(docs[0] as keyof T).filter(
            (k) => docs[0][k as keyof T] instanceof DocumentReference,
        );
    }

    const promise = [];
    for (const docData of docs) {
        for (const field of options.fields) {
            promise.push(getDocData(docData[field as keyof T] as DocumentReference, { idField: 'id' }));
        }
    }

    const childData = await Promise.all(promise);
    for (const docData of docs) {
        for (const field of options.fields) {
            (docData[field as keyof T] as DocumentData) = childData.shift()!;
        }
    }

    return docs;
}
