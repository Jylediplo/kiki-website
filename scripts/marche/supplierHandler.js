const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

// Log file setup
const logFile = fs.createWriteStream('script.log', { flags: 'a' });
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
  originalConsoleLog(...args);
  logFile.write(`[LOG] ${args.join(' ')}\n`);
};

console.error = (...args) => {
  originalConsoleError(...args);
  logFile.write(`[ERROR] ${args.join(' ')}\n`);
};

async function loadProcessedReferences() {
  const references = new Set();
  if (fs.existsSync('output.csv')) {
    const readStream = fs.createReadStream('output.csv').pipe(csvParser());
    for await (const row of readStream) {
      references.add(row.FOURNISSEUR_CODE);
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
  const outputPath = 'output.csv';
  const fileExists = fs.existsSync(outputPath);

  // If the file doesn't exist, write the header manually
  if (!fileExists) {
    const header =
      '"FOURNISSEUR_NOM","FOURNISSEUR_CODE","DATE_CREATION","Title","Image","Description"\n';
    fs.writeFileSync(outputPath, header);
  }

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: 'supplierName', title: 'FOURNISSEUR_NOM' },
      { id: 'supplierCode', title: 'FOURNISSEUR_CODE' },
      { id: 'dateCreation', title: 'DATE_CREATION' },
      { id: 'title', title: 'Title' },
      { id: 'image', title: 'Image' },
      { id: 'description', title: 'Description' },
    ],
    append: true, // Continue appending to the file
  });

  const processedReferences = await loadProcessedReferences();
  const processedReferenceSet = new Set(processedReferences);
  const loggedReferences = new Set(); // To track logged references
  const readStream = fs.createReadStream('ARTICLES.csv').pipe(csvParser());

  for await (const row of readStream) {
    const { FOURNISSEUR_NOM, FOURNISSEUR_REFERENCE, DATE_CREATION } = row;

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
      FOURNISSEUR_NOM === 'Brandit' ||
      FOURNISSEUR_NOM === 'BILLY EIGHT' ||
      FOURNISSEUR_NOM === 'HIGHLANDER' ||
      FOURNISSEUR_NOM === 'HELIKON-TEX' ||
      FOURNISSEUR_NOM === 'VANOS' ||
      FOURNISSEUR_NOM === 'A10' ||
      FOURNISSEUR_NOM === 'SUMMIT'
    ) {
      console.log(
        `Processing supplier: ${FOURNISSEUR_NOM} with reference ${FOURNISSEUR_REFERENCE}`
      );
      const productDetails = await executeSupplierScript(
        FOURNISSEUR_NOM,
        FOURNISSEUR_REFERENCE
      );
      if (productDetails && productDetails.title) {
        const record = {
          supplierName: FOURNISSEUR_NOM, // Supplier name in first column
          supplierCode: FOURNISSEUR_REFERENCE,
          dateCreation: DATE_CREATION,
          title: productDetails.title,
          image: productDetails.image,
          description: productDetails.description,
        };

        // Write each record immediately
        await csvWriter.writeRecords([record]);

        processedReferenceSet.add(FOURNISSEUR_REFERENCE);
        console.log(
          `Successfully fetched details for ${FOURNISSEUR_NOM} with reference ${FOURNISSEUR_REFERENCE}`
        );
      } else {
        // Log only if the reference wasn't processed and it's not already logged
        if (!loggedReferences.has(FOURNISSEUR_REFERENCE)) {
          console.log(
            `Unregistered reference: ${FOURNISSEUR_NOM} - ${FOURNISSEUR_REFERENCE}`
          );
          loggedReferences.add(FOURNISSEUR_REFERENCE);
        }
      }
    } else {
      console.log(`Supplier ${FOURNISSEUR_NOM} not recognized.`);
    }
  }

  console.log('All records processed');
}

processArticles().catch((error) =>
  console.error('Error processing articles:', error)
);
