const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

async function loadProcessedReferences() {
  const references = new Set();
  if (fs.existsSync('output.csv')) {
    const readStream = fs.createReadStream('output.csv').pipe(csvParser());
    for await (const row of readStream) {
      references.add(row.Reference); // Assurez-vous que le titre de la colonne correspond
    }
    console.log('Processed references:', Array.from(references));
  } else {
    console.log(
      'No output.csv file found, starting with an empty set of processed references.'
    );
  }
  return references;
}

async function executeSupplierScript(supplierName, supplierReference) {
  const supplierScriptPath = path.join(__dirname, `${supplierName}.js`);
  if (fs.existsSync(supplierScriptPath)) {
    try {
      const fetchProductDetails = require(supplierScriptPath);
      if (typeof fetchProductDetails === 'function') {
        console.log(
          `Fetching details for ${supplierName} with reference ${supplierReference}`
        );
        return await fetchProductDetails(supplierReference);
      } else {
        console.error(`The script for ${supplierName} is not a function.`);
      }
    } catch (error) {
      console.error(`Failed to execute script for ${supplierName}:`, error);
    }
  } else {
    console.warn(`No script found for supplier: ${supplierName}`);
  }
  return null;
}

async function processArticles() {
  const csvWriter = createObjectCsvWriter({
    path: 'output.csv',
    header: [
      { id: 'supplierName', title: 'Supplier' },
      { id: 'reference', title: 'Reference' },
      { id: 'title', title: 'Title' },
      { id: 'image', title: 'Image' },
      { id: 'description', title: 'Description' },
    ],
    append: true, // Append to the existing file instead of overwriting
  });

  const results = [];
  const processedReferences = await loadProcessedReferences(); // Charger les références traitées
  const processedReferenceSet = new Set(processedReferences); // Utiliser un Set pour vérifier rapidement

  const readStream = fs.createReadStream('ARTICLES.csv').pipe(csvParser());

  for await (const row of readStream) {
    const { FOURNISSEUR_NOM, FOURNISSEUR_REFERENCE } = row;

    // Si la référence a déjà été traitée, on l'ignore
    if (processedReferenceSet.has(FOURNISSEUR_REFERENCE)) {
      console.log(
        `Reference ${FOURNISSEUR_REFERENCE} already processed, skipping.`
      );
      continue;
    }

    if (
      FOURNISSEUR_NOM === 'MP-SEC' ||
      FOURNISSEUR_NOM === 'GILBERT' ||
      FOURNISSEUR_NOM === 'TREESCO' ||
      FOURNISSEUR_NOM === 'GK' ||
      FOURNISSEUR_NOM === 'PROMODIS' ||
      FOURNISSEUR_NOM === 'WOOLPOWER' ||
      FOURNISSEUR_NOM === 'Brandit'
    ) {
      console.log(
        `Processing supplier: ${FOURNISSEUR_NOM} with reference ${FOURNISSEUR_REFERENCE}`
      );
      const productDetails = await executeSupplierScript(
        FOURNISSEUR_NOM,
        FOURNISSEUR_REFERENCE
      );
      if (productDetails && productDetails.title) {
        // Vérifier que productDetails et le titre ne sont pas null
        results.push({
          supplierName: FOURNISSEUR_NOM, // Inclure le nom du fournisseur
          reference: FOURNISSEUR_REFERENCE, // Ajouter la référence ici
          ...productDetails,
        });
        processedReferenceSet.add(FOURNISSEUR_REFERENCE); // Marquer cette référence comme traitée
        console.log(
          `Successfully fetched details for ${FOURNISSEUR_NOM} with reference ${FOURNISSEUR_REFERENCE}`
        );
      }
    } else {
      console.warn(`Supplier ${FOURNISSEUR_NOM} not recognized.`);
    }
  }

  if (results.length > 0) {
    await csvWriter.writeRecords(results);
    console.log('CSV file successfully processed and saved as output.csv');
  } else {
    console.log('No new records to write to output.csv');
  }
}

processArticles().catch((error) =>
  console.error('Error processing articles:', error)
);
