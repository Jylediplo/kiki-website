import csvParser from 'csv-parser';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

type Product = {
  ID: string;
  Title: string;
  Image: string;
  Description: string;
  FOURNISSEUR_NOM: string;
  FOURNISSEUR_REFERENCE: string;
  DATE_CREATION: string;
  'TAILLES/COULEURS': string;
};

export const GET = async (request: Request) => {
  try {
    const results: Product[] = [];
    const csvFilePath = path.join(process.cwd(), 'scripts/marche/output.csv');

    // Lire et analyser le fichier CSV
    const readCSV = new Promise<Product[]>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });

    const rows = await readCSV;

    // Extraire l'ID du produit de la requête
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (productId) {
      // Rechercher le produit correspondant par ID
      const product = rows.find((row) => row.ID === productId);

      if (product) {
        return new NextResponse(JSON.stringify(product), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new NextResponse(
          JSON.stringify({ message: 'Product not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    } else {
      // Si aucun ID n'est fourni, retourner tous les produits
      return new NextResponse(JSON.stringify(rows), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'An error occurred', error: error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
