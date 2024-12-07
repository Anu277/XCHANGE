// import PDFDocument from 'pdfkit-table';
// import fs from 'fs';
// import { format } from 'date-fns';
// import numberToWords from 'number-to-words';
// import axios from 'axios';

// // import PDFDocument from 'pdfkit-table';
// // import fs from 'fs';
// // import { format } from 'date-fns';
// // import numberToWords from 'number-to-words';
// // import axios from 'axios';  // Importing axios

// // Function to fetch the HSN code from Python API
// async function fetchHSNFromPython(query) {
//     try {
//         const response = await axios.post('http://127.0.0.1:8000/get-hsn-code/', {
//             query: query  // Send the query as JSON in the request body
//         });
//         console.log("response.data");  // Log the response to inspect it
//         console.log(response.data);  // Log the response to inspect it
//         return response.data.hsn_code;  // Return the HSN code from the response
//     } catch (error) {
//         console.error('Error fetching HSN code:', error);  // Log any error
//         return "not_found";  // Return a default value in case of an error
//     }
// }

// // Function to get HSN code by category
// const getHSNCodeByCategory = async (categories, hsnData) => {
//     if (!Array.isArray(categories) || categories.length === 0) {
//         return "N/A";  // Return "N/A" if the categories array is empty or invalid
//     }

//     const ladders = categories[0]?.ladder;
//     if (!Array.isArray(ladders) || ladders.length === 0) {
//         return "N/A";  // Return "N/A" if the ladder is not valid
//     }

//     const lastCategory = ladders[ladders.length - 1]?.name?.trim();
//     if (!lastCategory) {
//         return "N/A";  // Return "N/A" if no valid category name is found
//     }

//     // Flatten the table cells and search for the category name
//     const tableCells = hsnData.info.flatMap(info =>
//         info.tables.flatMap(table => table.tableCells)
//     );

//     for (const row of tableCells) {
//         const descriptionCell = row.find(cell =>
//             cell.text && cell.text.trim().toLowerCase() === lastCategory.toLowerCase()
//         );
//         if (descriptionCell) {
//             const hsnField = row[1];  // Assuming the second column contains the HSN code
//             return hsnField?.text || "N/A";  // Return the HSN code if found, otherwise "N/A"
//         }
//     }

//     // Fetch HSN code from the Python API if not found locally
//     try {
//         const pythonHSNCode = await fetchHSNFromPython(lastCategory);  // Await the promise
//         console.log("Python HSN Code:", pythonHSNCode);  // Log the fetched code
//         return pythonHSNCode !== "not_found" ? pythonHSNCode : "N/A";  // Return the code or "N/A" if not found
//     } catch (error) {
//         console.error("Error resolving Python HSN Code:", error);  // Log any errors
//         return "N/A";  // Return "N/A" if there's an error during the fetch
//     }
// };

// // const getHSNCodeByCategory = (categories, hsnData) => {
   

// //     console.log("Categories:", categories);

// //     if (!Array.isArray(categories) || categories.length === 0) {
// //         return "N/A"; // Return "N/A" if categories is not an array or is empty
// //     }

// //     // Extract the last category name from the ladder array
// //     const ladders = categories[0]?.ladder; // Assuming categories has a single element with a "ladder" property
// //     if (!Array.isArray(ladders) || ladders.length === 0) {
// //         return "N/A"; // Return "N/A" if the ladder array is missing or empty
// //     }

// //     const lastCategory = ladders[ladders.length - 1]?.name?.trim(); // Get the name of the last category
// //     if (!lastCategory) {
// //         return "N/A"; // Return "N/A" if the last category name is missing or invalid
// //     }

// //     console.log("Last Category:", lastCategory);

// //     // Flatten all table cells into a single array
// //     const tableCells = hsnData.info.flatMap(info =>
// //         info.tables.flatMap(table =>
// //             table.tableCells
// //         )
// //     );

// //     // Search for the category in the DESCRIPTION field
// //     for (const row of tableCells) {
// //         const descriptionCell = row.find(cell =>
// //             cell.text && cell.text.trim().toLowerCase() === lastCategory.toLowerCase()
// //         );
// //         if (descriptionCell) {
// //             // Get the second cell's text in the row
// //             const hsnField = row[1]; // Assuming the second cell contains the HSN code
// //             return hsnField?.text || "N/A"; // Return the text or 'N/A' if it doesn't exist
// //         }
// //     }

// //     return "N/A"; // Return "N/A" if no match is found
// // };

// // const generateQuotationPDF = async (order, address, hsnFilePath) => {
// //     return new Promise(async (resolve, reject) => {
// //         try {
// //             const directory = 'invoices'; // Define the directory
// //             const outputPath = `${directory}/quotation_${order.orderId}.pdf`; // Define the file path

// //             // Ensure the directory exists
// //             if (!fs.existsSync(directory)) {
// //                 fs.mkdirSync(directory, { recursive: true }); // Create directory recursively
// //             }

// //             // Load HSN data
// //             const hsnData = JSON.parse(fs.readFileSync('./utils/HSN_SAC.json', 'utf-8'));

// //             const doc = new PDFDocument({ margin: 50 });
//             // const stream = fs.createWriteStream(outputPath); // Create file stream for the PDF
// const generateQuotationPDF = async (order, address) => {
//                 return new Promise((resolve, reject) => {
//                     try {
//                         const hsnData = JSON.parse(fs.readFileSync('./utils/HSN_SAC.json', 'utf-8'));
            
//                         const doc = new PDFDocument({ margin: 50 });
//                         const buffers = [];
            
//                         doc.on('data', buffers.push.bind(buffers)); // Collect PDF data into the buffer
//                         doc.on('end', () => resolve(Buffer.concat(buffers))); // Resolve with the complete PDF buffer
            

//             // doc.pipe(stream);

//             // Header Section
//             doc.image('utils/logo.png', 50, 30, { width: 80 });
//             doc.fontSize(18).text('QUOTATION', { align: 'center', underline: true }).moveDown();
//             doc.fontSize(12)
//                 .text('XCHANGETECHS STAR ALLIANCE LLP', { align: 'center' })
//                 .text('GSTIN: 29AAAFX1191P2ZJ    PAN: AAAFX1191P', { align: 'center' })
//                 .text('LUT ARN: AD2903240527422', { align: 'center' })
//                 .text('# 459, 2nd Floor, KIRAN Towers, Koramangala, HSR Layout 5th Sector, Bengaluru, Karnataka, 560034', { align: 'center' })
//                 .text('Email: accounts.payable@xchangetechs.com', { align: 'center' })
//                 .moveDown(2);

//             // Quotation Details
//             const currentDate = new Date();
//             const expiryDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
//             doc.fontSize(12)
//                 .text(`Quotation #: ${order.orderId}`, 50)
//                 .text(`Quotation Date: ${format(currentDate, 'dd MMM yyyy')}`, 50)
//                 .text(`Due Date: ${format(expiryDate, 'dd MMM yyyy')}`, 50)
//                 .moveDown(2);

//             // Customer Details
//             doc.fontSize(12).text('Customer Details:', { underline: true });
//             doc.text('Qualcomm India Private Limited', 50)
//                 .text('Qualcomm India Private Limited, SEZ Unit')
//                 .text('GSTIN: 36AAACQ0231C4Z3')
//                 .moveDown(1.5);

//             // Billing Address
//             doc.text('Billing Address:', { underline: true });
//             doc.text(`${address.street}, ${address.city}, ${address.state}, ${address.zipcode}`, 50)
//                 .text(`${address.country}`)
//                 .moveDown(2);

//             // Build Table Rows with HSN Codes
//             const tableRows = [];
//             for (const item of order.items) {
//                 console.log(item.category)
//                 const hsnCode =   getHSNCodeByCategory(item.category, hsnData);
//                 tableRows.push([
//                     item.title,
//                     hsnCode,
//                     item.quantity,
//                     `₹${item.price_upper.toFixed(2)}`,
//                     `₹${(item.quantity * item.price_upper).toFixed(2)}`,
//                 ]);
//             }

//             // Add Delivery Charges if applicable
//             if (order.deliveryCharge) {
//                 tableRows.push([
//                     'Delivery Charges',
//                     '', // No HSN Code for delivery charges
//                     1,
//                     `₹${order.deliveryCharge.toFixed(2)}`,
//                     `₹${order.deliveryCharge.toFixed(2)}`,
//                 ]);
//             }

//             // Total Amount
//             const totalAmount = order.items.reduce((sum, item) => sum + item.quantity * item.price_upper, 0) + (order.deliveryCharge || 0);

//             // Table Header and Rows
//             const table = {
//                 title: 'Order Details',
//                 headers: ['Item Name', 'HSN Code', 'Quantity', 'Unit Price', 'Amount'],
//                 rows: tableRows,
//             };

//             // Render Table
//             doc.table(table, {
//                 prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
//                 prepareRow: () => doc.font("Helvetica").fontSize(10),
//             });

//             // Total in Words
//             doc.moveDown();
//             const totalInWords = `Total (in words): ${numberToWords.toWords(totalAmount).toUpperCase()} RUPEES ONLY.`;
//             doc.text(totalInWords, 50).moveDown();

//             // Bank Details
//             doc.text('Bank Details:', { underline: true }).moveDown();
//             doc.text('Bank: ICICI Bank').text('Account #: 428405001856').text('IFSC Code: ICIC0004284').text('Branch: B NARAYANAPURA').moveDown();

//             // Notes and Terms
//             doc.text('Notes:', { underline: true }).text('Looking forward to your business!').moveDown();
//             doc.text('Terms and Conditions:', { underline: true });
//             doc.fontSize(10)
//                 .text('1. Supply meant for SEZ under LUT without Payment of Integrated Tax.')
//                 .text('2. Prices Quoted are in INR.')
//                 .text('3. Payment terms: 15 days.')
//                 .text('4. Packing and Delivery Charges: As applicable at actuals.')
//                 .text('5. Delivery lead time: 4-5 weeks from the date of PO.')
//                 .text('6. Proposal validity: Quote valid till 7 days from issue date.')
//                 .moveDown(2);

//             // Authorized Signatory
//             doc.text('Authorized Signatory', { align: 'right' });

//             // Finalize document
//             doc.end();

//             // stream.on('finish', () => resolve(outputPath));
//             // stream.on('error', reject);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

// export default generateQuotationPDF;


import PDFDocument from 'pdfkit-table';
import fs from 'fs';
import { format } from 'date-fns';
import numberToWords from 'number-to-words';
import axios from 'axios';

// Function to fetch the HSN code from Python API
async function fetchHSNFromPython(query) {
    console.log("fetchHSNFromPython: "+query)
    try {
        const response = await axios.post('http://127.0.0.1:8000/get-hsn-code/', {
            query: query  // Send the query as JSON in the request body
        });
        console.log("response.data");  // Log the response to inspect it
        console.log(response.data);  // Log the response to inspect it
        return response.data.hsn_code;  // Return the HSN code from the response
    } catch (error) {
        console.error('Error fetching HSN code:', error);  // Log any error
        return "not_found";  // Return a default value in case of an error
    }
}

// Function to get HSN code by category
const getHSNCodeByCategory = async (categories, hsnData) => {
    if (!Array.isArray(categories) || categories.length === 0) {
        return "N/A";  // Return "N/A" if the categories array is empty or invalid
    }

    const ladders = categories[0]?.ladder;
    if (!Array.isArray(ladders) || ladders.length === 0) {
        return "N/A";  // Return "N/A" if the ladder is not valid
    }

    const lastCategory = ladders[ladders.length - 1]?.name?.trim();
    if (!lastCategory) {
        return "N/A";  // Return "N/A" if no valid category name is found
    }

    // Flatten the table cells and search for the category name
    const tableCells = hsnData.info.flatMap(info =>
        info.tables.flatMap(table => table.tableCells)
    );

    for (const row of tableCells) {
        const descriptionCell = row.find(cell =>
            cell.text && cell.text.trim().toLowerCase() === lastCategory.toLowerCase()
        );
        if (descriptionCell) {
            const hsnField = row[1];  // Assuming the second column contains the HSN code
            return hsnField?.text || "N/A";  // Return the HSN code if found, otherwise "N/A"
        }
    }

    // Fetch HSN code from the Python API if not found locally
    try {
        const pythonHSNCode = await fetchHSNFromPython(lastCategory);  // Await the promise
        // console.log("Python HSN Code:", pythonHSNCode);  // Log the fetched code
        return pythonHSNCode !== "not_found" ? pythonHSNCode : "N/A";  // Return the code or "N/A" if not found
    } catch (error) {
        console.error("Error resolving Python HSN Code:", error);  // Log any errors
        return "N/A";  // Return "N/A" if there's an error during the fetch
    }
};

// PDF generation function
const generateQuotationPDF = async (order, address) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hsnData = JSON.parse(fs.readFileSync('./utils/HSN_SAC.json', 'utf-8'));
            const doc = new PDFDocument({ margin: 50 });
            const buffers = [];

            doc.on('data', buffers.push.bind(buffers));  // Collect PDF data into the buffer
            doc.on('end', () => resolve(Buffer.concat(buffers)));  // Resolve with the complete PDF buffer

            // Header Section
            doc.image('utils/logo.png', 50, 30, { width: 80 });
            doc.fontSize(18).text('QUOTATION', { align: 'center', underline: true }).moveDown();
            doc.fontSize(12)
                .text('XCHANGETECHS STAR ALLIANCE LLP', { align: 'center' })
                .text('GSTIN: 29AAAFX1191P2ZJ    PAN: AAAFX1191P', { align: 'center' })
                .text('LUT ARN: AD2903240527422', { align: 'center' })
                .text('# 459, 2nd Floor, KIRAN Towers, Koramangala, HSR Layout 5th Sector, Bengaluru, Karnataka, 560034', { align: 'center' })
                .text('Email: accounts.payable@xchangetechs.com', { align: 'center' })
                .moveDown(2);

            // Quotation Details
            const currentDate = new Date();
            const expiryDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            doc.fontSize(12)
                .text(`Quotation #: ${order.orderId}`, 50)
                .text(`Quotation Date: ${format(currentDate, 'dd MMM yyyy')}`, 50)
                .text(`Due Date: ${format(expiryDate, 'dd MMM yyyy')}`, 50)
                .moveDown(2);

            // Customer Details
            doc.fontSize(12).text('Customer Details:', { underline: true });
            doc.text('Qualcomm India Private Limited', 50)
                .text('Qualcomm India Private Limited, SEZ Unit')
                .text('GSTIN: 36AAACQ0231C4Z3')
                .moveDown(1.5);

            // Billing Address
            doc.text('Billing Address:', { underline: true });
            doc.text(`${address.street}, ${address.city}, ${address.state}, ${address.zipcode}`, 50)
                .text(`${address.country}`)
                .moveDown(2);

            // Build Table Rows with HSN Codes
            const tableRows = [];
            for (const item of order.items) {
                console.log(item.category);
                const hsnCode = await getHSNCodeByCategory(item.category, hsnData); // Await the promise here
                tableRows.push([
                    item.title,
                    hsnCode,
                    item.quantity,
                    `₹${item.price_upper.toFixed(2)}`,
                    `₹${(item.quantity * item.price_upper).toFixed(2)}`,
                ]);
            }

            // Add Delivery Charges if applicable
            if (order.deliveryCharge) {
                tableRows.push([
                    'Delivery Charges',
                    '', // No HSN Code for delivery charges
                    1,
                    `₹${order.deliveryCharge.toFixed(2)}`,
                    `₹${order.deliveryCharge.toFixed(2)}`,
                ]);
            }

            // Total Amount
            const totalAmount = order.items.reduce((sum, item) => sum + item.quantity * item.price_upper, 0) + (order.deliveryCharge || 0);

            // Table Header and Rows
            const table = {
                title: 'Order Details',
                headers: ['Item Name', 'HSN Code', 'Quantity', 'Unit Price', 'Amount'],
                rows: tableRows,
            };

            // Render Table
            doc.table(table, {
                prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
                prepareRow: () => doc.font("Helvetica").fontSize(10),
            });

            // Total in Words
            doc.moveDown();
            const totalInWords = `Total (in words): ${numberToWords.toWords(totalAmount).toUpperCase()} RUPEES ONLY.`;
            doc.text(totalInWords, 50).moveDown();

            // Bank Details
            doc.text('Bank Details:', { underline: true }).moveDown();
            doc.text('Bank: ICICI Bank').text('Account #: 428405001856').text('IFSC Code: ICIC0004284').text('Branch: B NARAYANAPURA').moveDown();

            // Notes and Terms
            doc.text('Notes:', { underline: true }).text('Looking forward to your business!').moveDown();
            doc.text('Terms and Conditions:', { underline: true });
            doc.fontSize(10)
                .text('1. Supply meant for SEZ under LUT without Payment of Integrated Tax.')
                .text('2. Prices Quoted are in INR.')
                .text('3. Payment terms: 15 days.')
                .text('4. Packing and Delivery Charges: As applicable at actuals.')
                .text('5. Delivery lead time: 4-5 weeks from the date of PO.')
                .text('6. Proposal validity: Quote valid till 7 days from issue date.')
                .moveDown(2);

            // Authorized Signatory
            doc.text('Authorized Signatory', { align: 'right' });

            // Finalize document
            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};

export default generateQuotationPDF;
