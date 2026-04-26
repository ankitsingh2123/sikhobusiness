"use client";

import { useEffect, useRef } from "react";

interface InvoiceData {
  invoiceNumber: string;
  orderId: string;
  purchaseId: string;
  issuedAt: string;
  customer: { name: string; email: string; id: string };
  course: { title: string; category: string; id: string };
  payment: { subtotal: number; tax: number; total: number; currency: string; status: string };
  company: { name: string; address: string; email: string; website: string; gstin: string };
}

interface InvoiceModalProps {
  invoice: InvoiceData;
  onClose: () => void;
}

export default function InvoiceModal({ invoice, onClose }: InvoiceModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n);

  const dateStr = new Date(invoice.issuedAt).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });

  const handlePrint = () => {
    const printCSS = `
      @page { margin: 0; size: A4; }
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background: #fff; color: #111; }
      .invoice-wrap { width: 794px; min-height: 1123px; margin: 0 auto; background: #fff; position: relative; }
      
      /* Header Band */
      .inv-header { background: #0f172a; color: #fff; padding: 40px 48px 32px; display: flex; justify-content: space-between; align-items: flex-start; }
      .inv-brand { }
      .inv-brand-name { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: #fff; }
      .inv-brand-sub { font-size: 11px; color: #94a3b8; margin-top: 4px; }
      .inv-brand-contact { font-size: 11px; color: #64748b; margin-top: 2px; }
      .inv-meta { text-align: right; }
      .inv-label { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; }
      .inv-number { font-size: 22px; font-weight: 700; color: #f97316; margin-top: 2px; letter-spacing: 0.5px; }
      .inv-date { font-size: 12px; color: #94a3b8; margin-top: 4px; }
      
      /* Status Badge */
      .inv-status-bar { background: #f97316; color: #fff; text-align: center; font-size: 11px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; padding: 8px; }
      
      /* Body */
      .inv-body { padding: 40px 48px; }
      
      /* Bill To / Order Info Row */
      .inv-info-row { display: flex; gap: 0; margin-bottom: 40px; }
      .inv-info-box { flex: 1; padding-right: 32px; }
      .inv-info-box:last-child { padding-right: 0; padding-left: 32px; border-left: 1px solid #e2e8f0; }
      .inv-info-title { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: #94a3b8; margin-bottom: 10px; }
      .inv-info-name { font-size: 15px; font-weight: 600; color: #0f172a; }
      .inv-info-text { font-size: 12px; color: #475569; margin-top: 3px; }
      .inv-info-small { font-size: 10px; color: #94a3b8; margin-top: 4px; font-family: 'Courier New', monospace; }
      
      /* Table */
      .inv-table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
      .inv-table thead { background: #0f172a; }
      .inv-table thead th { color: #94a3b8; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; padding: 12px 16px; text-align: left; }
      .inv-table thead th:last-child { text-align: right; }
      .inv-table tbody tr { border-bottom: 1px solid #f1f5f9; }
      .inv-table tbody td { padding: 18px 16px; vertical-align: top; }
      .inv-table-desc-title { font-size: 14px; font-weight: 600; color: #0f172a; }
      .inv-table-desc-cat { font-size: 11px; color: #f97316; margin-top: 3px; text-transform: capitalize; }
      .inv-table-desc-note { font-size: 10px; color: #94a3b8; margin-top: 3px; }
      .inv-table-qty { font-size: 14px; color: #475569; text-align: center; }
      .inv-table-amt { font-size: 14px; font-weight: 600; color: #0f172a; text-align: right; }
      
      /* Totals */
      .inv-totals { display: flex; justify-content: flex-end; margin-bottom: 40px; }
      .inv-totals-box { width: 260px; }
      .inv-total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 13px; color: #475569; border-bottom: 1px solid #f1f5f9; }
      .inv-total-row:last-child { border-bottom: none; background: #0f172a; margin: 0 -16px; padding: 14px 16px; border-radius: 8px; }
      .inv-total-row:last-child span:first-child { color: #fff; font-weight: 700; font-size: 14px; }
      .inv-total-row:last-child span:last-child { color: #f97316; font-weight: 800; font-size: 18px; }
      
      /* Footer */
      .inv-footer { position: absolute; bottom: 0; left: 0; right: 0; background: #f8fafc; border-top: 2px solid #e2e8f0; padding: 24px 48px; display: flex; justify-content: space-between; align-items: center; }
      .inv-footer-left { font-size: 10px; color: #94a3b8; max-width: 380px; line-height: 1.6; }
      .inv-footer-right { text-align: right; }
      .inv-footer-right p { font-size: 10px; color: #cbd5e1; }
      .inv-footer-right strong { font-size: 11px; color: #64748b; }
      
      /* Watermark stripe */
      .inv-stripe { height: 4px; background: linear-gradient(90deg, #f97316, #fb923c, #fdba74, #f97316); }
    `;

    const invoiceHTML = `
      <div class="invoice-wrap">
        <div class="inv-stripe"></div>
        <div class="inv-header">
          <div class="inv-brand">
            <div class="inv-brand-name">Seekho Business</div>
            <div class="inv-brand-sub">${invoice.company.website}</div>
            <div class="inv-brand-contact">${invoice.company.email}</div>
          </div>
          <div class="inv-meta">
            <div class="inv-label">Tax Invoice</div>
            <div class="inv-number">${invoice.invoiceNumber}</div>
            <div class="inv-date">Date: ${dateStr}</div>
          </div>
        </div>

        <div class="inv-status-bar">✓ &nbsp; Payment Confirmed — Thank You!</div>

        <div class="inv-body">
          <div class="inv-info-row">
            <div class="inv-info-box">
              <div class="inv-info-title">Bill To</div>
              <div class="inv-info-name">${invoice.customer.name}</div>
              <div class="inv-info-text">${invoice.customer.email}</div>
              <div class="inv-info-small">Customer ID: #${invoice.customer.id}</div>
            </div>
            <div class="inv-info-box">
              <div class="inv-info-title">Order Reference</div>
              <div class="inv-info-name" style="font-size:12px; word-break: break-all;">${invoice.orderId}</div>
              <div class="inv-info-text">Payment: Cashfree</div>
              <div class="inv-info-text">Currency: INR</div>
            </div>
          </div>

          <table class="inv-table">
            <thead>
              <tr>
                <th style="width:55%">Description</th>
                <th style="width:15%; text-align:center;">Qty</th>
                <th style="width:15%; text-align:right;">Unit Price</th>
                <th style="width:15%; text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="inv-table-desc-title">${invoice.course.title}</div>
                  <div class="inv-table-desc-cat">${invoice.course.category}</div>
                  <div class="inv-table-desc-note">Lifetime Access · All Modules Included · Online Learning</div>
                </td>
                <td class="inv-table-qty">1</td>
                <td class="inv-table-amt">${fmt(invoice.payment.subtotal)}</td>
                <td class="inv-table-amt">${fmt(invoice.payment.subtotal)}</td>
              </tr>
            </tbody>
          </table>

          <div class="inv-totals">
            <div class="inv-totals-box">
              <div class="inv-total-row">
                <span>Subtotal</span>
                <span>${fmt(invoice.payment.subtotal)}</span>
              </div>
              ${invoice.payment.tax > 0 ? `
              <div class="inv-total-row">
                <span>GST (18%)</span>
                <span>${fmt(invoice.payment.tax)}</span>
              </div>
              ` : `
              <div class="inv-total-row">
                <span>Tax</span>
                <span>Nil</span>
              </div>
              `}
              <div class="inv-total-row">
                <span>Total Paid</span>
                <span>${fmt(invoice.payment.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="inv-footer">
          <div class="inv-footer-left">
            This is a computer-generated invoice and does not require a physical signature.
            For any payment-related queries, please write to <strong>${invoice.company.email}</strong>
            quoting your invoice number <strong>${invoice.invoiceNumber}</strong>.
          </div>
          <div class="inv-footer-right">
            <strong>${invoice.company.name}</strong>
            <p>${invoice.company.address}</p>
            <p style="margin-top: 4px; color: #94a3b8;">${invoice.company.website}</p>
          </div>
        </div>
      </div>
    `;

    const w = window.open("", "_blank", "width=900,height=750");
    if (!w) { alert("Please allow popups to download the invoice."); return; }
    w.document.write(`<!DOCTYPE html><html><head><title>${invoice.invoiceNumber} — Seekho Business</title><meta charset="utf-8"/><style>${printCSS}</style></head><body>${invoiceHTML}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Shell */}
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/10 flex flex-col"
        style={{ backgroundColor: "#0f172a" }}>

        {/* Top Controls Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/8"
          style={{ backgroundColor: "#0f172a" }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-400 text-[18px]">receipt_long</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{invoice.invoiceNumber}</p>
              <p className="text-slate-500 text-[10px]">Tax Invoice</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
              style={{ background: "#f97316", color: "#fff" }}>
              <span className="material-symbols-outlined text-[15px]">download</span>
              Download PDF
            </button>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 p-6">
          {/* Preview Card — mimics print layout */}
          <div className="rounded-xl overflow-hidden border border-white/8 text-[#0f172a]" style={{ background: "#fff" }}>

            {/* Orange gradient stripe */}
            <div className="h-1" style={{ background: "linear-gradient(90deg,#f97316,#fb923c,#fdba74,#f97316)" }} />

            {/* Header */}
            <div className="flex justify-between items-start px-8 py-7" style={{ background: "#0f172a" }}>
              <div>
                <p className="text-white text-xl font-bold tracking-tight">Seekho Business</p>
                <p className="text-slate-500 text-xs mt-1">{invoice.company.website}</p>
                <p className="text-slate-600 text-xs">{invoice.company.email}</p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-[9px] uppercase tracking-widest">Tax Invoice</p>
                <p className="text-orange-400 text-lg font-bold mt-1">{invoice.invoiceNumber}</p>
                <p className="text-slate-500 text-xs mt-1">{new Date(invoice.issuedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
              </div>
            </div>

            {/* Status bar */}
            <div className="text-center py-2 text-xs font-bold tracking-widest text-white uppercase"
              style={{ background: "#f97316" }}>
              ✓ &nbsp; Payment Confirmed — Thank You!
            </div>

            {/* Body */}
            <div className="px-8 py-7 space-y-7">

              {/* Bill To / Order */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Bill To</p>
                  <p className="text-slate-800 font-semibold text-sm">{invoice.customer.name}</p>
                  <p className="text-slate-500 text-xs mt-1">{invoice.customer.email}</p>
                  <p className="text-slate-400 text-[10px] font-mono mt-1">ID: #{invoice.customer.id}</p>
                </div>
                <div className="border-l border-slate-100 pl-6">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Order Reference</p>
                  <p className="text-slate-800 text-xs font-medium break-all">{invoice.orderId}</p>
                  <p className="text-slate-500 text-xs mt-1">Cashfree · INR</p>
                </div>
              </div>

              {/* Line Items */}
              <div className="rounded-lg overflow-hidden border border-slate-100">
                <div className="grid grid-cols-12 px-4 py-3" style={{ background: "#0f172a" }}>
                  <div className="col-span-6 text-[9px] text-slate-400 font-bold uppercase tracking-widest">Description</div>
                  <div className="col-span-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center">Qty</div>
                  <div className="col-span-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest text-right">Unit Price</div>
                  <div className="col-span-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest text-right">Total</div>
                </div>
                <div className="grid grid-cols-12 px-4 py-5 items-start border-t border-slate-50">
                  <div className="col-span-6">
                    <p className="text-slate-800 text-sm font-semibold">{invoice.course.title}</p>
                    <p className="text-orange-500 text-xs mt-1 capitalize">{invoice.course.category}</p>
                    <p className="text-slate-400 text-[10px] mt-1">Lifetime Access · All Modules</p>
                  </div>
                  <div className="col-span-2 text-center">
                    <p className="text-slate-600 text-sm">1</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-slate-700 text-sm font-medium">{fmt(invoice.payment.subtotal)}</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <p className="text-slate-800 text-sm font-semibold">{fmt(invoice.payment.subtotal)}</p>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="flex justify-end">
                <div className="w-56 space-y-2">
                  <div className="flex justify-between text-xs text-slate-500 py-1.5 border-b border-slate-100">
                    <span>Subtotal</span><span>{fmt(invoice.payment.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 py-1.5 border-b border-slate-100">
                    <span>Tax</span><span>Nil</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 rounded-lg mt-1" style={{ background: "#0f172a" }}>
                    <span className="text-white text-sm font-bold">Total Paid</span>
                    <span className="text-orange-400 text-lg font-extrabold">{fmt(invoice.payment.total)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-between items-start px-8 py-5 border-t-2 border-slate-100" style={{ background: "#f8fafc" }}>
              <p className="text-slate-400 text-[10px] max-w-xs leading-relaxed">
                Computer-generated invoice. No signature required.<br />
                For queries: <span className="text-slate-500 font-medium">{invoice.company.email}</span>
              </p>
              <div className="text-right">
                <p className="text-slate-600 text-xs font-semibold">{invoice.company.name}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{invoice.company.website}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
