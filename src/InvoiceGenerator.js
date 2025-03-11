import React, { useState } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    service: "",
    amount: "",
    taxRate: "",
    terms: "",
    fontSize: "16", // Default font size
    alignment: "left", // Default text alignment
  });

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const generateInvoice = () => {
    const { clientName, service, amount, taxRate, terms, fontSize, alignment } = invoiceData;
    const taxAmount = (amount * taxRate) / 100;
    const total = parseFloat(amount) + taxAmount;

    const pdf = new jsPDF();
    pdf.setFontSize(parseInt(fontSize));

    // Adjust alignment
    let xPos = alignment === "center" ? 105 : alignment === "right" ? 180 : 20;

    pdf.text("Invoice", xPos, 20, { align: alignment });
    pdf.text(`Client: ${clientName}`, xPos, 40, { align: alignment });
    pdf.text(`Service: ${service}`, xPos, 50, { align: alignment });
    pdf.text(`Amount: $${amount}`, xPos, 60, { align: alignment });
    pdf.text(`Tax (${taxRate}%): $${taxAmount}`, xPos, 70, { align: alignment });
    pdf.text(`Total: $${total}`, xPos, 80, { align: alignment });
    pdf.text(`Terms: ${terms}`, xPos, 100, { align: alignment });

    pdf.save("invoice.pdf");
  };

  return (
    <div>
      <h2>Invoice Generator</h2>
      
      <label>Client Name:</label>
      <input name="clientName" placeholder="Client Name" onChange={handleChange} />

      <label>Service:</label>
      <input name="service" placeholder="Service" onChange={handleChange} />

      <label>Amount ($):</label>
      <input name="amount" type="number" placeholder="Amount" onChange={handleChange} />

      <label>Tax Rate (%):</label>
      <input name="taxRate" type="number" placeholder="Tax Rate" onChange={handleChange} />

      <label>Terms & Conditions:</label>
      <textarea name="terms" placeholder="Enter terms & conditions" onChange={handleChange} />

      <label>Font Size:</label>
      <select name="fontSize" onChange={handleChange}>
        <option value="12">Small</option>
        <option value="16" selected>Medium</option>
        <option value="20">Large</option>
      </select>

      <label>Text Alignment:</label>
      <select name="alignment" onChange={handleChange}>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <button onClick={generateInvoice}>Generate Invoice</button>
    </div>
  );
}
