import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

import { GoogleAIFileManager } from "@google/generative-ai/server";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 *
 * See https://ai.google.dev/gemini-api/docs/prompting_with_media
 */
async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  return file;
}

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "text/plain",
};

async function run() {
  // TODO Make these files available on the local file system
  // You may need to update the file paths
  const files = [await uploadToGemini("", "image/jpeg")];

  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: files[0].mimeType,
              fileUri: files[0].uri,
            },
          },
          {
            text: "Extract the information from the provided image of a bulgarian invoice in a json format.\nUse the following schema :\ntype InvoiceSchema = {\n  invoice_type: string,\n  invoice_number: string,\n  invoice_date: string,\n  supplier: {\n    name: string,\n    address: string | undefined,\n    eik: string | undefined,\n    dds_no: string | undefined,\n    mol: string | undefined,\n  },\n  items: \n    {\n      no: number,\n      code: string | undefined,\n      itemName: string,\n      itemQuantity: number,\n      unit: string,\n      unit_price: number,\n      total_price: number,\n    }[]\n  ,\n  totals: {\n    subtotal: number,\n    discount_percentage: number,\n    discount_amount: number,\n    tax_base: number,\n    vat_rate: number,\n    vat_amount: number,\n    total_amount: number,\n    total_in_words: string,\n  },\n};\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: 'The user wants to extract information from a Bulgarian invoice image and structure it as a JSON object based on the provided schema.\nI need to identify each field in the schema and locate its corresponding value in the image.\n\nHere\'s a plan:\n1. **Invoice Header Information**: Extract invoice type, number, and date.\n2. **Supplier Information**: Extract supplier\'s name, address, EIK, DDS No., and MOL.\n3. **Client Information**: Although not explicitly in the schema, it\'s good to identify client information in case it\'s relevant for context.\n4. **Items Table**: Iterate through each row in the items table and extract item details (No, Code, Item Name, Quantity, Unit, Unit Price, Total Price).\n5. **Totals Section**: Extract subtotal, discount, VAT details, and total amount.\n6. **Total in Words**: Extract the total amount in words.\n7. **Construct JSON**: Assemble all extracted information into a JSON object conforming to the provided schema.\n\nLet\'s go through each field:\n\n- **invoice_type**: "ФАКТУРА"\n- **invoice_number**: "0000033548"\n- **invoice_date**: "13.02.2025"\n\n- **supplier**:\n    - **name**: "Графобал България АД"\n    - **address**: "гр. Своге, кв. Слатина"\n    - **eik**: "832084295"\n    - **dds_no**: "BG832084295"\n    - **mol**: "Евгени Райков"\n\n- **items**: Iterate through rows 1 to 8:\n    - Row 1:\n        - no: 1\n        - code: "3020.51-2758"\n        - itemName: "Подложка ф22 Сребро"\n        - itemQuantity: 300\n        - unit: "бр"\n        - unit_price: 0.280000\n        - total_price: 84.00\n    - Row 2:\n        - no: 2\n        - code: "3020.51-2759"\n        - itemName: "Подложка ф28 Сребро"\n        - itemQuantity: 200\n        - unit: "бр"\n        - unit_price: 0.410000\n        - total_price: 82.00\n    - Row 3:\n        - no: 3\n        - code: "3020.51-2760"\n        - itemName: "Подложка за торта 32/32 5пл.Сребро"\n        - itemQuantity: 150\n        - unit: "бр"\n        - unit_price: 0.830000\n        - total_price: 124.50\n    - Row 4:\n        - no: 4\n        - code: "3020.51-2761"\n        - itemName: "Подложка за торта 47/31 5пл.Сребро"\n        - itemQuantity: 50\n        - unit: "бр"\n        - unit_price: 0.910000\n        - total_price: 45.50\n    - Row 5:\n        - no: 5\n        - code: "5525581"\n        - itemName: "Кутии за торти, 24/24/13 (с отделен капак)"\n        - itemQuantity: 250\n        - unit: "бр"\n        - unit_price: 0.590000\n        - total_price: 147.50\n    - Row 6:\n        - no: 6\n        - code: "5525582"\n        - itemName: "Кутии за торти 33/33/15 (с отделен капак)"\n        - itemQuantity: 200\n        - unit: "бр"\n        - unit_price: 0.850000\n        - total_price: 170.00\n    - Row 7:\n        - no: 7\n        - code: "5525583"\n        - itemName: "Кутии за торти, 48/33/14 (с отделен капак)"\n        - itemQuantity: 50\n        - unit: "бр"\n        - unit_price: 1.040000\n        - total_price: 52.00\n    - Row 8:\n        - no: 8\n        - code: "400-90"\n        - itemName: "Разходи за транспорт"\n        - itemQuantity: 1\n        - unit: "бр"\n        - unit_price: 70.000000\n        - total_price: 70.00\n\n- **totals**:\n    - **subtotal**: 775.50\n    - **discount_percentage**: 0.00\n    - **discount_amount**: 0.00\n    - **tax_base**: 775.50\n    - **vat_rate**: 20\n    - **vat_amount**: 155.10\n    - **total_amount**: 930.60\n    - **total_in_words**: "деветстотин и тридесет лева и 60 стотинки"\n\nDouble check all values and format them correctly for JSON. Ensure numbers are numbers and strings are strings.',
          },
          {
            text: '```json\n{\n  "invoice_type": "ФАКТУРА",\n  "invoice_number": "0000033548",\n  "invoice_date": "13.02.2025",\n  "supplier": {\n    "name": "Графобал България АД",\n    "address": "гр. Своге, кв. Слатина",\n    "eik": "832084295",\n    "dds_no": "BG832084295",\n    "mol": "Евгени Райков"\n  },\n  "items": [\n    {\n      "no": 1,\n      "code": "3020.51-2758",\n      "itemName": "Подложка ф22 Сребро",\n      "itemQuantity": 300,\n      "unit": "бр",\n      "unit_price": 0.280000,\n      "total_price": 84.00\n    },\n    {\n      "no": 2,\n      "code": "3020.51-2759",\n      "itemName": "Подложка ф28 Сребро",\n      "itemQuantity": 200,\n      "unit": "бр",\n      "unit_price": 0.410000,\n      "total_price": 82.00\n    },\n    {\n      "no": 3,\n      "code": "3020.51-2760",\n      "itemName": "Подложка за торта 32/32 5пл.Сребро",\n      "itemQuantity": 150,\n      "unit": "бр",\n      "unit_price": 0.830000,\n      "total_price": 124.50\n    },\n    {\n      "no": 4,\n      "code": "3020.51-2761",\n      "itemName": "Подложка за торта 47/31 5пл.Сребро",\n      "itemQuantity": 50,\n      "unit": "бр",\n      "unit_price": 0.910000,\n      "total_price": 45.50\n    },\n    {\n      "no": 5,\n      "code": "5525581",\n      "itemName": "Кутии за торти, 24/24/13 (с отделен капак)",\n      "itemQuantity": 250,\n      "unit": "бр",\n      "unit_price": 0.590000,\n      "total_price": 147.50\n    },\n    {\n      "no": 6,\n      "code": "5525582",\n      "itemName": "Кутии за торти 33/33/15 (с отделен капак)",\n      "itemQuantity": 200,\n      "unit": "бр",\n      "unit_price": 0.850000,\n      "total_price": 170.00\n    },\n    {\n      "no": 7,\n      "code": "5525583",\n      "itemName": "Кутии за торти, 48/33/14 (с отделен капак)",\n      "itemQuantity": 50,\n      "unit": "бр",\n      "unit_price": 1.040000,\n      "total_price": 52.00\n    },\n    {\n      "no": 8,\n      "code": "400-90",\n      "itemName": "Разходи за транспорт",\n      "itemQuantity": 1,\n      "unit": "бр",\n      "unit_price": 70.000000,\n      "total_price": 70.00\n    }\n  ],\n  "totals": {\n    "subtotal": 775.50,\n    "discount_percentage": 0.00,\n    "discount_amount": 0.00,\n    "tax_base": 775.50,\n    "vat_rate": 20.00,\n    "vat_amount": 155.10,\n    "total_amount": 930.60,\n    "total_in_words": "деветстотин и тридесет лева и 60 стотинки"\n  }\n}\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();
