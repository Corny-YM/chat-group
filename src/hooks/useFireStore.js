import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { db } from '../firebase/config';

const useFireStore = (table, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = collection(db, table);
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                setDocuments([]);
                return;
            }
            collectionRef = query(
                collectionRef,
                where(condition.fieldName, condition.operator, condition.compareValue),
                orderBy('createdAt'),
            );
        }

        const unsubcribe = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log(documents);
            setDocuments(documents);
        });
        return () => {
            unsubcribe();
        };
    }, [table, condition]);

    return documents;
};

export default useFireStore;
