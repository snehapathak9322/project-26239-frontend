import React, { useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  ShieldCheck,
  BadgeCheck
} from 'lucide-react';

export const SubmittedDocsModal = ({ isOpen, onClose, activeCase }) => {
  const [selectedDocPreview, setSelectedDocPreview] = useState(null);

  if (!isOpen || !activeCase) return null;

  // Generate scheme-specific submitted documents list
  const getDocumentsForCase = (c) => {
    if (c.scheme === 'NFST') {
      return [
        {
          id: 'DOC-1',
          name: 'Scheduled Tribe Caste Certificate (Article 342)',
          category: 'Tribal Identity',
          date: '14-Jul-2025',
          size: '1.2 MB PDF',
          status: 'VERIFIED',
          source: 'DigiLocker Cryptographic XML',
          certNo: c.casteCertNo,
          ocrScore: '99.4%'
        },
        {
          id: 'DOC-2',
          name: 'Post-Graduate Master Degree & UGC-NET Scorecard',
          category: 'Academic Credential',
          date: '14-Jul-2025',
          size: '2.4 MB PDF',
          status: 'VERIFIED',
          source: 'National Academic Depository (NAD)',
          certNo: 'UGC-NET-DEC24-99120',
          ocrScore: '98.8%'
        },
        {
          id: 'DOC-3',
          name: 'Quarterly Fellowship Continuation Certificate (Annexure-IV)',
          category: 'Academic Milestone',
          date: '01-Sep-2025',
          size: '840 KB PDF',
          status: c.gates.G4.passed ? 'VERIFIED' : 'DEFICIENT',
          source: 'Uploaded by Scholar',
          certNo: 'IISC-ANNEX4-2025-Q1',
          ocrScore: '95.8%',
          issueNote: c.gates.G4.passed ? 'Verified with IISc Dean round seal' : 'Missing Dean/Registrar official round seal'
        },
        {
          id: 'DOC-4',
          name: 'Bank Passbook & Aadhaar Seeding Mandate Slip',
          category: 'Banking & DBT',
          date: '16-Jul-2025',
          size: '620 KB PDF',
          status: 'VERIFIED',
          source: 'NPCI Bridge Verified',
          certNo: 'SBI-MANDATE-4819',
          ocrScore: '97.2%'
        },
        {
          id: 'DOC-5',
          name: 'Competent Authority Family Income Certificate',
          category: 'Financial Eligibility',
          date: '14-Jul-2025',
          size: '950 KB PDF',
          status: 'VERIFIED',
          source: 'e-District MP Portal',
          certNo: 'MP-INC-2024-44109',
          ocrScore: '98.2%'
        }
      ];
    } else if (c.scheme === 'NOS') {
      return [
        {
          id: 'DOC-1',
          name: 'Scheduled Tribe Caste Certificate',
          category: 'Tribal Identity',
          date: '10-Jun-2025',
          size: '1.4 MB PDF',
          status: 'VERIFIED',
          source: 'DigiLocker XML',
          certNo: c.casteCertNo,
          ocrScore: '99.1%'
        },
        {
          id: 'DOC-2',
          name: 'Oxford University Unconditional Offer & CAS Letter',
          category: 'Academic Credential',
          date: '10-Jun-2025',
          size: '1.8 MB PDF',
          status: 'VERIFIED',
          source: 'University of Oxford CAS Portal',
          certNo: 'CAS-OXF-2025-9921',
          ocrScore: '99.6%'
        },
        {
          id: 'DOC-3',
          name: 'Academic Return & Surety Bond Deed (₹25,00,000)',
          category: 'Legal Compliance',
          date: '02-Aug-2025',
          size: '3.1 MB PDF',
          status: 'DEFICIENT',
          source: 'Uploaded by Scholar',
          certNo: 'BOND-JH-2025-012',
          ocrScore: '92.4%',
          issueNote: 'Surety-2 Gazetted Officer salary verification pending'
        },
        {
          id: 'DOC-4',
          name: 'UK Student Visa (Tier-4) Vignette Page',
          category: 'Immigration',
          date: 'Pending',
          size: 'Awaiting',
          status: 'DEFICIENT',
          source: 'VFS Global / UKVI',
          certNo: 'VISA-UK-PENDING',
          ocrScore: 'N/A',
          issueNote: 'Biometric sticker copy required'
        }
      ];
    } else {
      // Top Class
      return [
        {
          id: 'DOC-1',
          name: 'Scheduled Tribe Caste Certificate',
          category: 'Tribal Identity',
          date: '01-Aug-2025',
          size: '1.1 MB PDF',
          status: 'VERIFIED',
          source: 'DigiLocker XML',
          certNo: c.casteCertNo,
          ocrScore: '99.5%'
        },
        {
          id: 'DOC-2',
          name: 'JEE Advanced Official Rank Card (ST Rank 84)',
          category: 'Academic Entrance',
          date: '01-Aug-2025',
          size: '720 KB PDF',
          status: 'VERIFIED',
          source: 'NTA Gateway',
          certNo: 'JEE-ADV-2025-ST84',
          ocrScore: '99.8%'
        },
        {
          id: 'DOC-3',
          name: 'IIT Bombay Fee Breakdown & Hostel Dues Invoice',
          category: 'Institutional Claim',
          date: '24-Aug-2025',
          size: '1.5 MB PDF',
          status: 'VERIFIED',
          source: 'IIT Bombay Nodal Officer Portal',
          certNo: 'IITB-FEE-2025-SEM1',
          ocrScore: '98.9%'
        },
        {
          id: 'DOC-4',
          name: 'Union Bank of India Passbook & Mandate',
          category: 'Banking & DBT',
          date: '03-Aug-2025',
          size: '890 KB PDF',
          status: 'VERIFIED',
          source: 'PFMS Validated',
          certNo: 'UBIN-PASS-3119',
          ocrScore: '97.5%'
        }
      ];
    }
  };

  const docs = getDocumentsForCase(activeCase);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Document Repository
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Submitted Documents & AI Verification Dossier
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Case: {activeCase.caseId} • {activeCase.applicantName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Documents Table / List */}
        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {docs.map(doc => {
            const isVerified = doc.status === 'VERIFIED';
            return (
              <div
                key={doc.id}
                className={`p-4 rounded-xl border text-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isVerified
                    ? 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    : 'bg-red-50/60 border-red-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${
                    isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{doc.name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded ${
                        isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isVerified ? 'VERIFIED' : 'ACTION REQUIRED'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span>Category: <strong className="text-slate-700">{doc.category}</strong></span>
                      <span>•</span>
                      <span>Source: <strong className="text-slate-700">{doc.source}</strong></span>
                      <span>•</span>
                      <span>Size: {doc.size}</span>
                      <span>•</span>
                      <span>OCR Match: <strong className="text-emerald-700 font-mono">{doc.ocrScore}</strong></span>
                    </div>

                    {doc.issueNote && (
                      <p className="mt-1 text-[11px] text-red-700 font-semibold">
                        Notice: {doc.issueNote}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => setSelectedDocPreview(doc)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center gap-1 shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Document Inspection Panel (if opened) */}
        {selectedDocPreview && (
          <div className="p-4 bg-slate-900 text-white rounded-xl text-xs space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                AI Verification Audit for: {selectedDocPreview.name}
              </span>
              <button
                onClick={() => setSelectedDocPreview(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕ Close Preview
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
              <div>Ref Token: {selectedDocPreview.certNo}</div>
              <div>Audit Status: {selectedDocPreview.status}</div>
              <div>Digest: SHA256:4a9f...b012</div>
              <div>OCR Neural Confidence: {selectedDocPreview.ocrScore}</div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl"
          >
            Close Repository
          </button>
        </div>

      </div>
    </div>
  );
};
