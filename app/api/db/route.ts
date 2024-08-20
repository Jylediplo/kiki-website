// // pages/api/createItem.js
// import { db } from './firebase';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { NextResponse } from 'next/server';

// export const GET = async (req:any, res:any) => {
//     try {
//         const rawResponse = await fetch('http://localhost:3000/api/products')
//         const response = await rawResponse.json()
//         console.log(response);
//         return new NextResponse(JSON.stringify({ id: docRef.id }), { status: 200 });
        
//     }
//     catch (error) {
//         return new NextResponse("Error fetching data: " + error);
//     }
//     try {
//         // const body = await req.json();  // Parse the request body
//         // // console.log(body);

//         // // Add the document to the 'items' collection
//         // const docRef = await addDoc(collection(db, 'items'), {
//         //     ...body,
//         //     createdAt: serverTimestamp()
//         // });

//         // return new NextResponse(JSON.stringify({ id: docRef.id }), { status: 200 });
//     } catch (error) {
//         console.error('Error adding document: ', error);
//         return new NextResponse(JSON.stringify({error}), { status: 500 });
//     }
// };
