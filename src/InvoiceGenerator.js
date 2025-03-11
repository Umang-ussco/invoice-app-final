import React, { useState } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState({
    clientName: "",
    service: "",
    amount: "",
    taxRate: "",
    terms: ""
  });

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const generateInvoice = () => {
    const { clientName, service, amount, taxRate, terms } = invoiceData;
    const taxAmount = (amount * taxRate) / 100;
    const total = parseFloat(amount) + taxAmount;

    const pdf = new jsPDF();
    pdf.text("Invoice", 20, 20);
    pdf.text(`Client: ${clientName}`, 20, 40);
    pdf.text(`Service: ${service}`, 20, 50);
    pdf.text(`Amount: $${amount}`, 20, 60);
    pdf.text(`Tax (${taxRate}%): $${taxAmount}`, 20, 70);
    pdf.text(`Total: $${total}`, 20, 80);
    pdf.text(`Terms: ${terms}`, 20, 100);

    pdf.save("invoice.pdf");
  };

  return (
    <div>
      <input name="clientName" placeholder="Client Name" onChange={handleChange} />
      <input name="service" placeholder="Service" onChange={handleChange} />
      <input name="amount" type="number" placeholder="Amount ($)" onChange={handleChange} />
      <input name="taxRate" type="number" placeholder="Tax Rate (%)" onChange={handleChange} />
      <input name="terms" placeholder="Terms & Conditions" onChange={handleChange} />
      <button onClick={generateInvoice}>Generate Invoice</button>
    </div>
  );
}
