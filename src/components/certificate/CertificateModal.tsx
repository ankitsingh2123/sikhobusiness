"use client";

import { useEffect, useRef } from "react";

interface CertificateProps {
  userName: string;
  courseTitle: string;
  courseCategory: string;
  issuedAt: string;
  onClose: () => void;
}

export default function CertificateModal({
  userName,
  courseTitle,
  courseCategory,
  issuedAt,
  onClose,
}: CertificateProps) {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const dateStr = new Date(issuedAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  // Generate a deterministic certificate ID from course + date
  const certId = `SB-CERT-${courseTitle.slice(0, 3).toUpperCase()}-${new Date(issuedAt).getFullYear()}-${Math.abs(courseTitle.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 90000 + 10000)}`;

  const handlePrint = () => {
    const css = `
      @page { margin: 0; size: A4 landscape; }
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { font-family: 'Georgia', 'Times New Roman', serif; background: #fff; }
      .cert-page {
        width: 1122px; height: 794px; position: relative; overflow: hidden;
        background: #fff;
        display: flex; align-items: center; justify-content: center;
      }
      /* Outer border frame */
      .cert-outer {
        position: absolute; inset: 24px;
        border: 2px solid #c8a96e;
      }
      .cert-inner {
        position: absolute; inset: 30px;
        border: 1px solid #e8d5a3;
      }
      /* Corner ornaments */
      .corner {
        position: absolute; width: 48px; height: 48px;
        border-color: #c8a96e;
        border-style: solid;
      }
      .corner-tl { top: 18px; left: 18px; border-width: 3px 0 0 3px; }
      .corner-tr { top: 18px; right: 18px; border-width: 3px 3px 0 0; }
      .corner-bl { bottom: 18px; left: 18px; border-width: 0 0 3px 3px; }
      .corner-br { bottom: 18px; right: 18px; border-width: 0 3px 3px 0; }
      /* Content */
      .cert-content { position: relative; z-index: 2; text-align: center; padding: 40px 100px; width: 100%; }
      .cert-brand { font-size: 13px; letter-spacing: 0.4em; text-transform: uppercase; color: #c8a96e; font-family: 'Helvetica Neue', sans-serif; font-weight: 600; margin-bottom: 6px; }
      .cert-divider { display: flex; align-items: center; justify-content: center; gap: 16px; margin: 12px auto; }
      .cert-divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #c8a96e, transparent); max-width: 120px; }
      .cert-divider-diamond { width: 6px; height: 6px; background: #c8a96e; transform: rotate(45deg); }
      .cert-headline { font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: #555; font-family: 'Helvetica Neue', sans-serif; margin-bottom: 22px; }
      .cert-name { font-size: 52px; color: #1a1a2e; font-family: 'Georgia', serif; font-style: italic; font-weight: 400; line-height: 1.1; margin-bottom: 20px; letter-spacing: 1px; }
      .cert-body { font-size: 14px; color: #555; line-height: 1.9; font-family: 'Helvetica Neue', sans-serif; font-weight: 300; margin-bottom: 24px; }
      .cert-course { font-size: 24px; color: #1a1a2e; font-family: 'Georgia', serif; font-weight: 700; margin: 4px 0; }
      .cert-category { font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase; color: #c8a96e; font-family: 'Helvetica Neue', sans-serif; font-weight: 600; }
      /* Signatures row */
      .cert-footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 36px; padding: 0 40px; }
      .cert-sig-block { text-align: center; }
      .cert-sig-line { width: 160px; height: 1px; background: #999; margin: 0 auto 6px; }
      .cert-sig-name { font-size: 12px; color: #333; font-family: 'Helvetica Neue', sans-serif; font-weight: 600; }
      .cert-sig-title { font-size: 10px; color: #888; font-family: 'Helvetica Neue', sans-serif; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }
      .cert-seal { width: 80px; height: 80px; border-radius: 50%; border: 3px solid #c8a96e; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0 auto; }
      .cert-seal-text { font-size: 8px; color: #c8a96e; text-transform: uppercase; letter-spacing: 0.15em; text-align: center; font-family: 'Helvetica Neue', sans-serif; font-weight: 700; }
      .cert-id { font-size: 9px; color: #bbb; letter-spacing: 0.1em; font-family: 'Courier New', monospace; margin-top: 4px; }
      /* Background watermark */
      .cert-watermark { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.03; pointer-events: none; }
      .cert-watermark-text { font-size: 140px; font-family: 'Georgia', serif; color: #c8a96e; transform: rotate(-30deg); font-weight: 700; letter-spacing: 4px; }
    `;

    const html = `
      <div class="cert-page">
        <div class="cert-watermark"><div class="cert-watermark-text">SEEKHO</div></div>
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
        <div class="cert-outer"></div>
        <div class="cert-inner"></div>
        <div class="cert-content">
          <div class="cert-brand">Seekho Business</div>
          <div class="cert-divider">
            <div class="cert-divider-line"></div>
            <div class="cert-divider-diamond"></div>
            <div class="cert-divider-line"></div>
          </div>
          <div class="cert-headline">Certificate of Completion</div>
          <div class="cert-divider">
            <div class="cert-divider-line"></div>
            <div class="cert-divider-diamond"></div>
            <div class="cert-divider-line"></div>
          </div>
          <p class="cert-body">This is to certify that</p>
          <div class="cert-name">${userName}</div>
          <p class="cert-body">has successfully completed the course</p>
          <div class="cert-course">${courseTitle}</div>
          <div class="cert-category">${courseCategory}</div>
          <p class="cert-body" style="margin-top:12px;">Issued on ${dateStr}</p>
          <div class="cert-footer">
            <div class="cert-sig-block">
              <div class="cert-sig-line"></div>
              <div class="cert-sig-name">Seekho Business</div>
              <div class="cert-sig-title">Authorized Signatory</div>
            </div>
            <div class="cert-sig-block">
              <div class="cert-seal">
                <div class="cert-seal-text">SEEKHO<br/>BUSINESS<br/>✓ VERIFIED</div>
              </div>
            </div>
            <div class="cert-sig-block">
              <div class="cert-id">${certId}</div>
              <div class="cert-sig-line" style="margin-top:6px;"></div>
              <div class="cert-sig-name">${userName}</div>
              <div class="cert-sig-title">Recipient</div>
            </div>
          </div>
        </div>
      </div>
    `;

    const w = window.open("", "_blank", "width=1200,height=850");
    if (!w) { alert("Please allow popups to download your certificate."); return; }
    w.document.write(`<!DOCTYPE html><html><head><title>Certificate — ${courseTitle}</title><meta charset="utf-8"/><style>${css}</style></head><body>${html}</body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-[#c8a96e]/30"
        style={{ background: "#fff" }}>

        {/* Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8d5a3]"
          style={{ background: "#1a1a2e" }}>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#c8a96e] text-[20px]">workspace_premium</span>
            <span className="text-white text-sm font-semibold">Certificate of Completion</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all"
              style={{ background: "#c8a96e" }}>
              <span className="material-symbols-outlined text-[15px]">download</span>
              Download Certificate
            </button>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="p-8" style={{ background: "#faf8f3" }}>
          <div className="relative border-2 border-[#c8a96e] bg-white overflow-hidden"
            style={{ aspectRatio: "1.414/1", fontFamily: "Georgia, serif" }}>

            {/* Inner border */}
            <div className="absolute inset-3 border border-[#e8d5a3] pointer-events-none z-10" />

            {/* Corner decorations */}
            {[["top-2 left-2 border-t-2 border-l-2", "tl"], ["top-2 right-2 border-t-2 border-r-2", "tr"],
              ["bottom-2 left-2 border-b-2 border-l-2", "bl"], ["bottom-2 right-2 border-b-2 border-r-2", "br"]
            ].map(([cls]) => (
              <div key={cls} className={`absolute w-8 h-8 border-[#c8a96e] ${cls}`} />
            ))}

            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-[110px] font-bold text-[#c8a96e] -rotate-12 tracking-widest">SEEKHO</span>
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-16 py-8">

              <p className="text-[9px] tracking-[0.4em] uppercase text-[#c8a96e] font-sans font-semibold mb-2">Seekho Business</p>

              <div className="flex items-center gap-3 my-2 w-full justify-center">
                <div className="flex-1 h-px max-w-[80px]" style={{ background: "linear-gradient(90deg, transparent, #c8a96e)" }} />
                <div className="w-2 h-2 bg-[#c8a96e] rotate-45" />
                <div className="flex-1 h-px max-w-[80px]" style={{ background: "linear-gradient(90deg, #c8a96e, transparent)" }} />
              </div>

              <p className="text-[9px] tracking-[0.3em] uppercase text-[#666] font-sans mb-1">Certificate of Completion</p>

              <div className="flex items-center gap-3 my-2 w-full justify-center">
                <div className="flex-1 h-px max-w-[80px]" style={{ background: "linear-gradient(90deg, transparent, #c8a96e)" }} />
                <div className="w-1.5 h-1.5 bg-[#c8a96e] rotate-45" />
                <div className="flex-1 h-px max-w-[80px]" style={{ background: "linear-gradient(90deg, #c8a96e, transparent)" }} />
              </div>

              <p className="text-[9px] text-[#888] font-sans mb-1 mt-2">This is to certify that</p>
              <h2 className="text-3xl text-[#1a1a2e] font-serif italic mb-2 leading-tight">{userName}</h2>
              <p className="text-[9px] text-[#888] font-sans mb-1">has successfully completed the course</p>
              <h3 className="text-base font-bold text-[#1a1a2e] font-serif leading-tight mb-1">{courseTitle}</h3>
              <p className="text-[8px] tracking-widest uppercase text-[#c8a96e] font-sans font-semibold">{courseCategory}</p>
              <p className="text-[9px] text-[#aaa] font-sans mt-2">Issued on {dateStr}</p>

              {/* Footer */}
              <div className="flex justify-between items-end w-full mt-4 px-4">
                <div className="text-center">
                  <div className="w-24 h-px bg-[#999] mx-auto mb-1" />
                  <p className="text-[8px] font-semibold text-[#333] font-sans">Seekho Business</p>
                  <p className="text-[7px] text-[#999] font-sans uppercase tracking-wider">Authorized Signatory</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-[#c8a96e] flex items-center justify-center mx-auto">
                    <span className="text-[7px] text-[#c8a96e] font-bold text-center font-sans leading-tight uppercase">SB<br/>✓</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[6px] text-[#ccc] font-mono mb-1">{certId}</p>
                  <div className="w-24 h-px bg-[#999] mx-auto mb-1" />
                  <p className="text-[8px] font-semibold text-[#333] font-sans">{userName}</p>
                  <p className="text-[7px] text-[#999] font-sans uppercase tracking-wider">Recipient</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
