// import PDFDocument from 'pdfkit';
// import fs from 'fs';
// import { format } from 'date-fns';
// import numberToWords from 'number-to-words';

// const generateQuotationPDF = (order, address) => {
//     return new Promise((resolve, reject) => {
//         try {
//             const outputPath = `invoices/quotation_${order.orderId}.pdf`;
//             const directory = 'invoices';

//             // Ensure the directory exists
//             if (!fs.existsSync(directory)) {
//                 fs.mkdirSync(directory, { recursive: true });
//             }

//             const doc = new PDFDocument({ margin: 50 });
//             const stream = fs.createWriteStream(outputPath);

//             doc.pipe(stream);

//             // Add header
//             doc.image('utils/logo.png', 50, 30, { width: 100 });
//             doc.moveDown();
//             doc.fontSize(18).text('QUOTATION', { align: 'center', underline: true }).moveDown();
//             doc.fontSize(12)
//                 .text('XCHANGETECHS STAR ALLIANCE LLP', { align: 'center' })
//                 .text('GSTIN: 29AAAFX1191P2ZJ    PAN: AAAFX1191P', { align: 'center' })
//                 .text('LUT ARN: AD2903240527422', { align: 'center' })
//                 .text('# 459, 2nd Floor, KIRAN Towers, Koramangala, HSR Layout 5th Sector, Bengaluru, Karnataka, 560034', { align: 'center' })
//                 .text('Email: accounts.payable@xchangetechs.com', { align: 'center' })
//                 .moveDown(2);

//             // Add quotation details
//             const currentDate = new Date();
//             const expiryDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
//             doc.fontSize(12)
//                 .text(`Quotation #: ${order.orderId}`, 50)
//                 .text(`Quotation Date: ${format(currentDate, 'dd MMM yyyy')}`, 50)
//                 .text(`Due Date: ${format(expiryDate, 'dd MMM yyyy')}`, 50)
//                 .moveDown(2);

//             // Customer details
//             doc.fontSize(12).text('Customer Details:', { underline: true });
//             doc.text(order.address.firstName, 50)
//                 .text(order.customerUnit)
//                 .text(`GSTIN: ${order.customerGST}`)
//                 .moveDown(1.5);

//             // Billing address
//             doc.text('Billing Address:', { underline: true });
//             doc.text(`${address.street}, ${address.city}, ${address.state}, ${address.zipcode}`, 50)
//                 .text(address.country)
//                 .moveDown(2);

//             // Table header
//             const drawTableHeader = (y) => {
//                 doc.fontSize(10).fillColor('#000');
//                 const headerHeight = 25;
//                 doc.rect(50, y, 200, headerHeight).stroke().text('Item Name', 55, y + 8);
//                 doc.rect(250, y, 50, headerHeight).stroke().text('Qty', 260, y + 8, { align: 'center' });
//                 doc.rect(300, y, 100, headerHeight).stroke().text('Unit Price', 310, y + 8, { align: 'right' });
//                 doc.rect(400, y, 100, headerHeight).stroke().text('Amount', 410, y + 8, { align: 'right' });
//             };

//             // Draw table rows
//             const drawTableRow = (item, y) => {
//                 const textOptions = { width: 190, align: 'left' };
//                 const rowHeight = Math.max(
//                     doc.heightOfString(item.title || item.name, textOptions),
//                     25
//                 );

//                 doc.rect(50, y, 200, rowHeight).stroke();
//                 doc.text(item.name||item.title, 55, y + 8, textOptions);

//                 doc.rect(250, y, 50, rowHeight).stroke().text(item.quantity.toString(), 260, y + 8, { align: 'center' });
//                 doc.rect(300, y, 100, rowHeight).stroke().text(`₹${item.price_upper.toFixed(2)}`, 310, y + 8, { align: 'right' });
//                 doc.rect(400, y, 100, rowHeight).stroke().text(`₹${(item.quantity * item.price).toFixed(2)}`, 410, y + 8, { align: 'right' });

//                 return rowHeight;
//             };

//             // Draw table
//             const startY = 300;
//             const pageHeight = 750; // Adjusted for header/footer
//             let currentY = startY;

//             drawTableHeader(currentY);
//             currentY += 25;

//             let totalAmount = 0;
//             order.items.forEach((item) => {
//                 const rowHeight = drawTableRow(item, currentY);

//                 currentY += rowHeight;
//                 if (currentY + 50 > pageHeight) { // Add margin for footer
//                     doc.addPage();
//                     currentY = 75;
//                     drawTableHeader(currentY);
//                     currentY += 25;
//                 }

//                 totalAmount += item.quantity * item.price;
//             });

//             // Delivery charges
//             if (order.deliveryCharge) {
//                 if (currentY + 50 > pageHeight) {
//                     doc.addPage();
//                     currentY = 75;
//                     drawTableHeader(currentY);
//                     currentY += 25;
//                 }

//                 currentY += drawTableRow(
//                     { name: 'Delivery Charges', quantity: 1, price: order.deliveryCharge },
//                     currentY
//                 );

//                 totalAmount += order.deliveryCharge;
//             }

//             // Draw total row
//             if (currentY + 50 > pageHeight) {
//                 doc.addPage();
//                 currentY = 75;
//             }

//             doc.fontSize(12);
//             const totalRowHeight = 25;
//             doc.rect(50, currentY, 350, totalRowHeight).stroke();
//             doc.text('Total Amount', 55, currentY + 8, { align: 'left' });

//             doc.rect(400, currentY, 100, totalRowHeight).stroke();
//             doc.text(`₹${totalAmount.toFixed(2)}`, 410, currentY + 8, { align: 'right' });

//             currentY += 50;

//             // Total in words
//             const totalInWords = `Total (in words): ${numberToWords.toWords(totalAmount).toUpperCase()} RUPEES ONLY.`;
//             doc.text(totalInWords, 50, currentY);

//             // Footer content
//             if (currentY + 100 > pageHeight) {
//                 doc.addPage();
//                 currentY = 75;
//             }

//             doc.text('Bank Details:', { underline: true });
//             doc.text('Bank: ICICI Bank').text('Account #: 428405001856').text('IFSC Code: ICIC0004284').text('Branch: B NARAYANAPURA');

//             doc.text('Notes:', { underline: true }).text('Looking forward to your business!');

//             doc.text('Terms and Conditions:', { underline: true });
//             doc.fontSize(10).text('1. Supply meant for SEZ under LUT without Payment of Integrated Tax.')
//                 .text('2. Prices Quoted are in INR.')
//                 .text('3. Payment terms: 15 days.')
//                 .text('4. Packing and Delivery Charges: As applicable at actuals.')
//                 .text('5. Delivery lead time: 4-5 weeks from the date of PO.')
//                 .text('6. Proposal validity: Quote valid till 7 days from issue date.');

//             doc.text('Authorized Signatory', { align: 'center' });

//             // Finalize document
//             doc.end();

//             stream.on('finish', () => resolve(outputPath));
//             stream.on('error', reject);
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

// Function to get HSN code based on category ladder array
const getHSNCodeByCategory = (categories, hsnData) => {
    /**
     * Searches for an HSN code using category names in the ladder array.
     *
     * Parameters:
     * - categories: Array of category names, e.g., ["Office Products", "School Supplies", "Paper"]
     * - hsnData: Array of HSN records (each with HSN_CD and HSN_DESC).
     *
     * Returns:
     * - The first matched HSN code or 'N/A' if no match is found.
     */
    if (!Array.isArray(categories)) {
        return "N/A"; // Return "N/A" if categories is not an array
    }
    for (const category of categories) {
        // Loop through each category and search for HSN code match
        const match = hsnData.find(({ HSN_DESC }) =>
            HSN_DESC.toLowerCase().includes(category.toLowerCase())
        );
        if (match) {
            return match.HSN_CD; // Return the first matched HSN code
        }
    }
    return "N/A"; // No match found
};

const generateQuotationPDF = async (order, address, hsnData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const outputPath = `invoices/quotation_${order.orderId}.pdf`;
            const directory = 'invoices';
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }

            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(outputPath);
            doc.pipe(stream);

            // Header Section with smaller logo
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

            // Build Table Rows with HSN Codes based on category array
            const tableRows = [];
            for (const item of order.items) {
                
                const hsnCode = getHSNCodeByCategory(item.category, hsnData); // Fetch HSN using category ladder array
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

            stream.on('finish', () => resolve(outputPath));
            stream.on('error', reject);
        } catch (error) {
            reject(error);
        }
    });
};

export default generateQuotationPDF;
