import PDFDocument from 'pdfkit';
import fs from 'fs';
import { format } from 'date-fns';
import numberToWords from 'number-to-words';

const generateQuotationPDF = (order, address) => {
    return new Promise((resolve, reject) => {
        try {
            const outputPath = `invoices/quotation_${order.orderId}.pdf`;
            const directory = 'invoices';
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }

            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(outputPath);

            doc.pipe(stream);

            // Header Section
            doc.image('utils/logo.png', 50, 30, { width: 100 });
            doc.moveDown();
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
            doc.text(order.customerName, 50)
                .text(order.customerUnit)
                .text(`GSTIN: ${order.customerGST}`)
                .moveDown(1.5);

            // Billing Address
            doc.text('Billing Address:', { underline: true });
            doc.text(`${address.street}, ${address.city}, ${address.state}, ${address.zipcode}`, 50)
                .text(`${address.country}`)
                .moveDown(2);

            // Table Header
            const drawTableHeader = (y) => {
                doc.fontSize(10).fillColor('#000');
                doc.rect(50, y, 200, 25).stroke().text('Item Name', 55, y + 8);
                doc.rect(250, y, 50, 25).stroke().text('Qty', 260, y + 8, { align: 'center' });
                doc.rect(300, y, 100, 25).stroke().text('Unit Price', 310, y + 8, { align: 'right' });
                doc.rect(400, y, 100, 25).stroke().text('Amount', 410, y + 8, { align: 'right' });
            };

            // Table Row
            const drawTableRow = (item, y) => {
                const textOptions = { width: 190, align: 'left' };
                const rowHeight = Math.max(doc.heightOfString(item.name, textOptions), 25);
                doc.rect(50, y, 200, rowHeight).stroke();
                doc.text(item.name, 55, y + 8, textOptions);
                doc.rect(250, y, 50, rowHeight).stroke();
                doc.text(item.quantity.toString(), 260, y + 8, { align: 'center' });
                doc.rect(300, y, 100, rowHeight).stroke();
                doc.text(`₹${item.price.toFixed(2)}`, 310, y + 8, { align: 'right' });
                doc.rect(400, y, 100, rowHeight).stroke();
                doc.text(`₹${(item.quantity * item.price).toFixed(2)}`, 410, y + 8, { align: 'right' });
                return rowHeight;
            };

            // Table Rendering
            let currentY = 300;
            const pageHeight = doc.page.height - doc.page.margins.bottom - 50;

            drawTableHeader(currentY);
            currentY += 25;

            let totalAmount = 0;
            order.items.forEach((item) => {
                const rowHeight = drawTableRow(item, currentY);
                currentY += rowHeight;

                if (currentY + 50 > pageHeight) {
                    doc.addPage();
                    currentY = 75;
                    drawTableHeader(currentY);
                    currentY += 25;
                }

                totalAmount += item.quantity * item.price;
            });

            // Delivery Charges
            if (order.deliveryCharge) {
                if (currentY + 50 > pageHeight) {
                    doc.addPage();
                    currentY = 75;
                    drawTableHeader(currentY);
                    currentY += 25;
                }

                currentY += drawTableRow(
                    { name: 'Delivery Charges', quantity: 1, price: order.deliveryCharge },
                    currentY
                );

                totalAmount += order.deliveryCharge;
            }

            // Total Row
            if (currentY + 50 > pageHeight) {
                doc.addPage();
                currentY = 75;
            }
            doc.fontSize(12).text('Total Amount', 50, currentY).text(`₹${totalAmount.toFixed(2)}`, 400, currentY, { align: 'right' });
            currentY += 25;

            // Total in Words
            const totalInWords = `Total (in words): ${numberToWords.toWords(totalAmount).toUpperCase()} RUPEES ONLY.`;
            doc.text(totalInWords, 50, currentY);

            // Footer Section
            currentY += 50;
            doc.text('Bank Details:', { underline: true }).text('Bank: ICICI Bank').text('Account #: 428405001856').text('IFSC Code: ICIC0004284').text('Branch: B NARAYANAPURA');

            doc.text('Notes:', { underline: true }).text('Looking forward to your business!');

            doc.text('Terms and Conditions:', { underline: true });
            doc.fontSize(10).text('1. Supply meant for SEZ under LUT without Payment of Integrated Tax.')
                .text('2. Prices Quoted are in INR.')
                .text('3. Payment terms: 15 days.')
                .text('4. Packing and Delivery Charges: As applicable at actuals.')
                .text('5. Delivery lead time: 4-5 weeks from the date of PO.')
                .text('6. Proposal validity: Quote valid till 7 days from issue date.');

            doc.text('Authorized Signatory', { align: 'center' });

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
