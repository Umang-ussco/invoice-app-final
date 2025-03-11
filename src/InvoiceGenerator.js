import React, { useState } from "react";
import jsPDF from "jspdf";

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    date: getCurrentDate(),
    buyerName: "",
    buyerAddress: "",
    buyerGST: "",
    panNumber: "",
    lotNumber: "",
    hsnCode: "71023910",
    quantity: "",
    size: "N/A",
    rate: "",
    amount: "",
    cgstRate: "0",
    sgstRate: "0",
    igstRate: "1.50",
    terms: "The diamonds herein invoiced have been purchased from a legitimate source...",
  });

  function generateInvoiceNumber() {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `HK-001/${currentYear % 100}-${nextYear % 100}`;
  }

  function getCurrentDate() {
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  }

  const handleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const { quantity, rate, cgstRate, sgstRate, igstRate } = invoiceData;
    const totalAmount = parseFloat(quantity) * parseFloat(rate) || 0;
    const cgst = (totalAmount * parseFloat(cgstRate)) / 100;
    const sgst = (totalAmount * parseFloat(sgstRate)) / 100;
    const igst = (totalAmount * parseFloat(igstRate)) / 100;
    return {
      totalAmount,
      totalWithTax: totalAmount + cgst + sgst + igst,
      cgst,
      sgst,
      igst,
    };
  };

  const generateInvoice = () => {
    const {
      invoiceNumber,
      date,
      buyerName,
      buyerAddress,
      buyerGST,
      panNumber,
      lotNumber,
      hsnCode,
      quantity,
      size,
      rate,
      terms,
    } = invoiceData;

    const { totalAmount, totalWithTax, cgst, sgst, igst } = calculateTotal();

    const pdf = new jsPDF();
    pdf.setFontSize(12);

    pdf.text("HK & SONS", 80, 20);
    pdf.text("INVOICE", 90, 30);
    pdf.text(`INVOICE NO.: ${invoiceNumber}`, 20, 40);
    pdf.text(`DATE: ${date}`, 150, 40);
    pdf.text(`BUYER: ${buyerName}`, 20, 50);
    pdf.text(`ADDRESS: ${buyerAddress}`, 20, 60);
    pdf.text(`GSTIN: ${buyerGST}`, 20, 70);
    pdf.text(`PAN: ${panNumber}`, 20, 80);

    pdf.text("DESCRIPTION OF GOODS", 20, 100);
    pdf.text(`LOT NO.: ${lotNumber}`, 20, 110);
    pdf.text(`HSN CODE: ${hsnCode}`, 60, 110);
    pdf.text(`SIZE: ${size}`, 110, 110);
    pdf.text(`QUANTITY: ${quantity}`, 150, 110);
    pdf.text(`RATE: ₹${rate}`, 20, 120);
    pdf.text(`AMOUNT: ₹${totalAmount.toFixed(2)}`, 100, 120);

    pdf.text(`ADD CGST (${invoiceData.cgstRate}%): ₹${cgst.toFixed(2)}`, 20, 140);
    pdf.text(`ADD SGST (${invoiceData.sgstRate}%): ₹${sgst.toFixed(2)}`, 20, 150);
    pdf.text(`ADD IGST (${invoiceData.igstRate}%): ₹${igst.toFixed(2)}`, 20, 160);
    pdf.text(`TOTAL PAYABLE: ₹${totalWithTax.toFixed(2)}`, 20, 170);

    pdf.text(`AMOUNT IN WORDS: Five Lakh Twenty Seven Thousand Six Hundred Sixty Eight Only`, 20, 190);
    pdf.text(`TERMS & CONDITIONS:`, 20, 210);
    pdf.text(terms, 20, 220, { maxWidth: 170 });

    pdf.text("Partner/Authorized Signatory", 20, 260);
    pdf.t
