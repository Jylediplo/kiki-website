// pages/api/createItem.js
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async (req:any, res:any) => {
  if (req.method === 'POST') {
    const { item } = req.body;

    try {
      const docRef = await addDoc(collection(db, 'items'), {
        ...item,
        createdAt: serverTimestamp()
      });

      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Error adding document: ' + error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
