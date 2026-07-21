import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { STATUS_MAP } from "../components/data/orders";
import { calcOrderTotal } from "../components/data/orders";

const BRAND = {
  name: "Stowave",
  site: "stowave.com",
  accent: [15, 23, 42], // slate-900 in RGB
  accentSoft: [241, 245, 249], // slate-100
};

function drawHeader(doc, title) {
  const pageWidth = doc.internal.pageSize.getWidth();

  // Brand bar
  doc.setFillColor(...BRAND.accent);
  doc.rect(0, 0, pageWidth, 26, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(BRAND.name, 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(BRAND.site, 14, 22);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(title, pageWidth - 14, 16, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const dateStr = new Date().toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  doc.text(`Generated: ${dateStr}`, pageWidth - 14, 22, { align: "right" });

  doc.setTextColor(0, 0, 0);
  return 34; // y cursor after header
}

function drawFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.line(14, pageHeight - 16, pageWidth - 14, pageHeight - 16);
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${BRAND.name} \u2022 ${BRAND.site}`, 14, pageHeight - 10);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 14, pageHeight - 10, {
      align: "right",
    });
    doc.setTextColor(0, 0, 0);
  }
}

/**
 * Generate a single-order PDF (branded order receipt) and trigger download.
 */
export function downloadOrderPdf(order, status) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = drawHeader(doc, "Order Receipt");

  const statusInfo = STATUS_MAP[status] || { label: status };

  // Order meta box
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(`Order ${order.id}`, 14, y + 6);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  const placed = new Date(order.placedAt).toLocaleString("en-PK", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  doc.text(`Placed: ${placed}`, 14, y + 12);
  doc.text(`Payment: ${order.paymentMethod}`, 14, y + 17);

  // Status chip
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  const chipText = `Status: ${statusInfo.label}`;
  const chipWidth = doc.getTextWidth(chipText) + 8;
  doc.setFillColor(...BRAND.accent);
  doc.roundedRect(196 - chipWidth, y + 1, chipWidth, 7, 1.5, 1.5, "F");
  doc.text(chipText, 196 - chipWidth / 2, y + 5.7, { align: "center" });
  doc.setTextColor(0, 0, 0);

  y += 24;

  // Customer info
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Customer", 14, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(order.customer.name, 14, y + 5);
  doc.text(order.customer.email, 14, y + 10);
  doc.text(order.customer.phone, 14, y + 15);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Shipping Address", 110, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const addrLines = doc.splitTextToSize(order.address, 80);
  doc.text(addrLines, 110, y + 5);

  y += 28;

  // Items table
  const rows = order.items.map((item) => [
    item.name,
    item.sku,
    String(item.qty),
    `Rs ${item.price.toLocaleString()}`,
    `Rs ${(item.price * item.qty).toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: y,
    head: [["Item", "SKU", "Qty", "Unit Price", "Subtotal"]],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: BRAND.accent,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: { fontSize: 9, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: BRAND.accentSoft },
    margin: { left: 14, right: 14 },
  });

  const finalY = doc.lastAutoTable.finalY + 8;
  const total = calcOrderTotal(order);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Total: Rs ${total.toLocaleString()}`, 196, finalY, {
    align: "right",
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Thank you for shopping with Stowave.",
    14,
    finalY
  );

  drawFooter(doc);
  doc.save(`${order.id}-stowave-order.pdf`);
}

/**
 * Generate a bulk PDF for a list of orders (e.g. all orders, or filtered by status).
 * Each order shows its status code so it's clear what's been actioned.
 */
export function downloadOrdersBulkPdf(orders, statusGetter, opts = {}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const title = opts.title || "Orders Export";
  let y = drawHeader(doc, title);

  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`${orders.length} order${orders.length === 1 ? "" : "s"} included`, 14, y);
  doc.setTextColor(0, 0, 0);
  y += 6;

  const rows = orders.map((order) => {
    const status = statusGetter(order.id) || order.status;
    const statusInfo = STATUS_MAP[status] || { label: status };
    const total = calcOrderTotal(order);
    const placed = new Date(order.placedAt).toLocaleDateString("en-PK", {
      dateStyle: "medium",
    });
    return [
      order.id,
      order.customer.name,
      placed,
      `${order.items.length} item${order.items.length === 1 ? "" : "s"}`,
      `Rs ${total.toLocaleString()}`,
      statusInfo.label,
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [["Order ID", "Customer", "Date", "Items", "Total", "Status"]],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: BRAND.accent,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9,
    },
    bodyStyles: { fontSize: 9, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: BRAND.accentSoft },
    margin: { left: 14, right: 14 },
    didParseCell: (data) => {
      // Color the status column text based on status
      if (data.section === "body" && data.column.index === 5) {
        const label = data.cell.raw;
        const entry = Object.values(STATUS_MAP).find((s) => s.label === label);
        if (entry) {
          const hex = entry.color.replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          data.cell.styles.textColor = [r, g, b];
          data.cell.styles.fontStyle = "bold";
        }
      }
    },
  });

  const finalY = doc.lastAutoTable.finalY + 8;
  const grandTotal = orders.reduce((sum, o) => sum + calcOrderTotal(o), 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`Grand Total: Rs ${grandTotal.toLocaleString()}`, 196, finalY, {
    align: "right",
  });

  drawFooter(doc);

  const filenameSuffix = opts.filenameSuffix || "all";
  doc.save(`stowave-orders-${filenameSuffix}.pdf`);
}