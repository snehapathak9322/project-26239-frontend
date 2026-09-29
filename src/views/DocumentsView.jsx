import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Search,
  Eye,
  FileText,
  BadgeCheck,
  Fingerprint,
  Scale,
  ArrowRight,
  Filter,
  Send,
  HelpCircle,
  Scan,
  RefreshCw,
  Building,
  UserCheck,
  Check,
  X,
  FileSearch,
  Lock,
  Layers
} from 'lucide-react';
import { EvidenceModal } from '../components/EvidenceModal';
import { ExplainDeficiencyModal } from '../components/ExplainDeficiencyModal';
import { DraftNoticeModal } from '../components/DraftNoticeModal';

export const DocumentsView = () => {
  const { cases, showToast, currentUser, auditLog, addAuditEntry } = useApp();

  // Selected modals state
  const [selectedDocForEvidence, setSelectedDocForEvidence] = useState(null);
  const [selectedDocForExplain, setSelectedDocForExplain] = useState(null);
  const [selectedDocForDraft, setSelectedDocForDraft] = useState(null);
  const [selectedDocForOfficerReview, setSelectedDocForOfficerReview] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, DEFICIENT, VERIFIED
  const [schemeFilter, setSchemeFilter] = useState('ALL'); // ALL, NFST, NOS, TOPCLASS, PMS_ST

  // Scanning animation state
  const [scanningDocId, setScanningDocId] = useState(null);
  const [activeVisualChainStep, setActiveVisualChainStep] = useState(null);

  // Synthetic Document Database with exact prompt attributes
  const [documents, setDocuments] = useState([
    {
      id: 'DOC-PMS-2025-01',
      name: 'Rajasthan_Tehsildar_Income_Cert_2024_ArjunMeena.pdf',
      type: 'Competent Authority Income Certificate',
      uploadDate: '16-Aug-2025',
      processingStatus: 'DEFICIENCY DETECTED',
      statusType: 'DEFICIENT',
      scheme: 'PMS_ST',
      caseId: 'MOTA-PMS-2025-1044',
      applicantName: 'Arjun Meena',
      tribe: 'Meena',
      institution: 'Government Polytechnic College, Sawai Madhopur',
      certNumber: 'RJ-INC-SWM-2024-91823',
      issuingAuthority: 'Office of Tehsildar, Sawai Madhopur (Rajasthan)',
      jurisdiction: 'Sawai Madhopur, Rajasthan',
      fileSize: '1.2 MB',
      affectedGate: 'G5',
      officerReviewStatus: 'PENDING_OFFICER_SIGNOFF',
      officerNotes: null,
      evidenceSnippet: 'Total Gross Annual Family Income from all sources: Rs. 2,90,000/- (Two Lakh Ninety Thousand Only)',
      extraction: {
        confidence: 98.4,
        detectedSummary: 'Annual Parental Income: ₹2,90,000 / year',
        fields: [
          { label: 'Applicant Name', value: 'Arjun Meena' },
          { label: "Father's Name", value: 'Shri Ramesh Meena' },
          { label: 'Issuing Officer', value: 'Tehsildar (Executive Magistrate)' },
          { label: 'Certificate Date', value: '18-Jul-2024' },
          { label: 'Total Annual Income', value: '₹2,90,000 / annum' },
          { label: 'Applicable Financial Year', value: '2024-25' },
          { label: 'Security Hologram / Seal', value: 'State Revenue Seal Present' }
        ]
      },
      ruleComparison: {
        schemeRequirement: 'Post-Matric Scholarship for ST Students (PMS-ST) Guidelines 2024, Clause 4.1',
        eligibilityCondition: 'Total family income from all sources must NOT exceed ₹2,50,000/- per annum.',
        requiredDocumentRule: 'Must be issued by an officer not below the rank of Tehsildar and valid for the current academic session.'
      },
      deficiency: {
        title: 'Income certificate details do not satisfy the configured requirement.',
        relatedRule: 'PMS-ST Scheme Guidelines 2024, Clause 4.1 (Parental Income Cap of ₹2,50,000)',
        evidence: 'OCR extracted value at line 14: "Total Gross Annual Family Income: Rs. 2,90,000/- (Two Lakh Ninety Thousand Only)".',
        detectedInformation: 'Parental Annual Income: ₹2,90,000 (Exceeds statutory threshold by ₹40,000)',
        expectedRequirement: 'Parental Annual Income <= ₹2,50,000/- per annum',
        explanation: 'The AI comparison engine compared the extracted income amount against the policy-defined ceiling of ₹2,50,000 for Centrally Sponsored Post-Matric ST scholarships. The applicant\'s declared parental income of ₹2,90,000 renders the application prima facie ineligible unless an updated or rectifying assessment (such as non-taxable agricultural exclusions) is provided by the competent revenue authority.',
        requiredCorrection: 'Provide an updated re-assessed income certificate from Tehsildar or Sub-Divisional Officer if previous calculation included exempt agricultural allowances, or clarify parental tax filing status within 15 calendar days.',
        hindiInstruction: 'तहसीलदार द्वारा जारी आय प्रमाण पत्र में वार्षिक आय ₹2,90,000 दर्शायी गई है, जो योजना सीमा (₹2,50,000) से अधिक है। कृपया सक्षम प्राधिकारी से संशोधित प्रमाणपत्र 15 दिनों में प्रस्तुत करें।'
      }
    },
    {
      id: 'DOC-NFST-2025-02',
      name: 'IISc_NFST_Annexure_IV_Q1_SunitaMaravi.pdf',
      type: 'Quarterly Fellowship Continuation Certificate (Annexure-IV)',
      uploadDate: '02-Sep-2025',
      processingStatus: 'DEFICIENCY DETECTED',
      statusType: 'DEFICIENT',
      scheme: 'NFST',
      caseId: 'MOTA-NFST-2025-0482',
      applicantName: 'Sunita Maravi',
      tribe: 'Gond',
      institution: 'Indian Institute of Science (IISc), Bengaluru',
      certNumber: 'IISC-MCB-Q1-2025-081',
      issuingAuthority: 'Department of Molecular & Cell Biology, IISc',
      jurisdiction: 'Bengaluru Urban, Karnataka',
      fileSize: '2.1 MB',
      affectedGate: 'G4',
      officerReviewStatus: 'PENDING_OFFICER_SIGNOFF',
      officerNotes: null,
      evidenceSnippet: 'Annexure-IV Page 2: "Signature & Seal of Dean/Registrar" box is blank. Bounding box [x: 420, y: 780, w: 180, h: 60] contains no ink strokes.',
      extraction: {
        confidence: 96.2,
        detectedSummary: 'Supervisor Signed; Institutional Dean Seal Missing',
        fields: [
          { label: 'Scholar Name', value: 'Sunita Maravi' },
          { label: 'Course', value: 'Ph.D. in Plant Molecular Biology' },
          { label: 'Quarter Period', value: '01-Jul-2025 to 30-Sep-2025' },
          { label: 'Supervisor Signature', value: 'Present (Prof. K. Narayanaswamy)' },
          { label: 'Dean / Registrar Round Seal', value: 'ABSENT / NOT DETECTED' },
          { label: 'Attendance Percentage', value: '98% Satisfactory Progress' }
        ]
      },
      ruleComparison: {
        schemeRequirement: 'NFST Guidelines 2024, Clause 8.3 (Institutional Continuity Attestation)',
        eligibilityCondition: 'Continuous full-time research verified jointly by Supervisor and Dean of Academic Affairs.',
        requiredDocumentRule: 'Annexure-IV continuation certificate must bear official round seal and signature of Dean/Registrar.'
      },
      deficiency: {
        title: 'Continuation certificate missing mandatory institutional seal & Dean counter-signature.',
        relatedRule: 'NFST Operational Guidelines 2024, Clause 8.3 (Institutional Joint Attestation)',
        evidence: 'Annexure-IV Page 2 Bottom Section: "Signature & Seal of Dean/Registrar" box is blank. Bounding box [x: 420, y: 780, w: 180, h: 60] contains no ink strokes or institutional stamp.',
        detectedInformation: 'Supervisor Signature: Detected. Dean Signature: Absent. Official Round Stamp: Absent.',
        expectedRequirement: 'Joint attestation by both Ph.D. Research Supervisor AND Dean of Academic Affairs/Registrar with institutional seal.',
        explanation: 'AI optical layout analysis flagged that while the Research Supervisor endorsed the scholar\'s quarterly attendance, the required institutional oversight sign-off by the Dean of Academic Affairs is completely unexecuted. PFMS Gate 4 (Institute Continuity) cannot be cleared without institutional counter-seal.',
        requiredCorrection: 'Download prescribed Annexure-IV form, submit to IISc Academic Office for Dean\'s endorsement and official round seal, and upload clean color scan within 15 calendar days.',
        hindiInstruction: 'अनुलग्नक-IV निरंतरता प्रमाणपत्र में शोध पर्यवेक्षक के हस्ताक्षर हैं, किंतु संकायाध्यक्ष (Dean)/कुलसचिव की मुहर व हस्ताक्षर अनुपस्थित हैं। कृपया संकायाध्यक्ष की मुहर लगवाकर नया रंगीन पीडीएफ अपलोड करें।'
      }
    },
    {
      id: 'DOC-NOS-2025-03',
      name: 'NOS_Surety_Bond_BirsaSoren_25Lakhs.pdf',
      type: 'Legal Surety & Return Deed of Bond',
      uploadDate: '04-Aug-2025',
      processingStatus: 'DEFICIENCY DETECTED',
      statusType: 'DEFICIENT',
      scheme: 'NOS',
      caseId: 'MOTA-NOS-2025-0119',
      applicantName: 'Birsa Soren',
      tribe: 'Santhal',
      institution: 'University of Oxford, United Kingdom',
      certNumber: 'JH-STAMP-881920-2025',
      issuingAuthority: 'Sub-Registrar Office, Dumka (Jharkhand)',
      jurisdiction: 'Dumka, Jharkhand',
      fileSize: '3.4 MB',
      affectedGate: 'G5',
      officerReviewStatus: 'PENDING_OFFICER_SIGNOFF',
      officerNotes: null,
      evidenceSnippet: 'Annexure-B Surety Sheet 2: Employer declaration checkbox ticked "Gazetted Officer", but official DDO seal and Form-16 attachment is absent.',
      extraction: {
        confidence: 97.8,
        detectedSummary: 'Bond Value ₹25L Valid; Surety-2 DDO Seal Missing',
        fields: [
          { label: 'Candidate Name', value: 'Birsa Soren' },
          { label: 'Bond Value', value: '₹25,00,000 (Twenty-Five Lakhs)' },
          { label: 'Stamp Paper Denomination', value: '₹100 Non-Judicial Stamp Paper' },
          { label: 'Surety 1 Status', value: 'Shri Sukra Soren (Solvency Certificate Verified)' },
          { label: 'Surety 2 Status', value: 'Shri Hemant Soren (Gazetted Officer DDO seal missing)' },
          { label: 'Overseas Institution', value: 'University of Oxford, UK (QS Rank #3)' }
        ]
      },
      ruleComparison: {
        schemeRequirement: 'National Overseas Scholarship Rules 2024, Rule 11 (Execution of Return Bond)',
        eligibilityCondition: 'Execution of ₹25L bond with 2 permanent Gazetted Officers or Solvency-verified sureties.',
        requiredDocumentRule: 'Surety 2 requires DDO employment certificate and Form-16 / latest salary certification.'
      },
      deficiency: {
        title: 'Surety-2 verification details do not satisfy the configured NOS bond requirement.',
        relatedRule: 'NOS Scheme Rules 2024, Rule 11 (Deed of Bond & Sureties)',
        evidence: 'Annexure-B Surety Sheet 2: Employer declaration checkbox ticked "Gazetted Officer", but official DDO seal and Form-16 attachment is absent.',
        detectedInformation: 'Surety-2 name provided without DDO attestation or latest salary certification.',
        expectedRequirement: 'Two distinct sureties with validated solvency or authenticated Gazetted Officer employment certificate.',
        explanation: 'The AI rule checker detected that Surety-2 is listed as an Assistant Engineer in PWD Jharkhand, but no salary slip or DDO verification stamp was appended to substantiate the employment guarantee required for overseas fellowship liability.',
        requiredCorrection: 'Upload Form-16 / Latest Salary Certificate and Employment Verification of Surety 2 authenticated by Drawing & Disbursing Officer.',
        hindiInstruction: 'प्रतिभूति बांड में प्रतिभूति-2 (Surety-2) के वेतन प्रमाण पत्र एवं कार्यालय अध्यक्ष का सत्यापन पत्र संलग्न नहीं है। कृपया इसे शीघ्र अपलोड करें।'
      }
    },
    {
      id: 'DOC-NFST-2025-04',
      name: 'MP_eDistrict_Caste_Certificate_SunitaMaravi.pdf',
      type: 'Scheduled Tribe Caste Certificate',
      uploadDate: '14-Jul-2025',
      processingStatus: 'FULLY SATISFIED',
      statusType: 'VERIFIED',
      scheme: 'NFST',
      caseId: 'MOTA-NFST-2025-0482',
      applicantName: 'Sunita Maravi',
      tribe: 'Gond',
      institution: 'Indian Institute of Science (IISc), Bengaluru',
      certNumber: 'MP-ST-DIN-2022-88192',
      issuingAuthority: 'Sub-Divisional Magistrate (SDO), Dindori (MP)',
      jurisdiction: 'Dindori, Madhya Pradesh',
      fileSize: '1.5 MB',
      affectedGate: 'G1',
      officerReviewStatus: 'OFFICER_APPROVED',
      officerNotes: 'Verified against MP e-District repository. Complies with Article 342 ST list.',
      evidenceSnippet: 'DigiLocker Cryptographic XML Verified. Certificate issued under Constitution (ST) Order 1950.',
      extraction: {
        confidence: 99.4,
        detectedSummary: 'Gond Tribe (MP) - Fully Validated',
        fields: [
          { label: 'Candidate Name', value: 'Sunita Maravi' },
          { label: "Father's Name", value: 'Shri Ramcharan Maravi' },
          { label: 'Sub-Tribe / Community', value: 'Gond' },
          { label: 'Issuing Officer', value: 'Sub-Divisional Officer (Civil)' },
          { label: 'Constitutional Reference', value: 'Constitution (ST) Order 1950, Part VIII' },
          { label: 'DigiLocker Status', value: 'Cryptographic XML Verified (DS/MP-GOV)' }
        ]
      },
      ruleComparison: {
        schemeRequirement: 'NFST Guidelines 2024, Clause 3.1 (ST Categorization)',
        eligibilityCondition: 'Must belong to Scheduled Tribe notified under Article 342 of Constitution of India.',
        requiredDocumentRule: 'Certificate issued by SDO/DM with digital barcode or holographic seal.'
      },
      deficiency: null
    },
    {
      id: 'DOC-TOPCLASS-2025-05',
      name: 'IITBombay_Fee_Breakdown_Invoice_2025_MangalMunda.pdf',
      type: 'Tuition & Non-Refundable Charges Invoice',
      uploadDate: '26-Aug-2025',
      processingStatus: 'FULLY SATISFIED',
      statusType: 'VERIFIED',
      scheme: 'TOPCLASS',
      caseId: 'MOTA-TOPCLASS-2025-0891',
      applicantName: 'Mangal Munda',
      tribe: 'Munda',
      institution: 'IIT Bombay (Indian Institute of Technology Bombay)',
      certNumber: 'IITB-ACAD-FEE-2025-0441',
      issuingAuthority: 'Office of Dean of Student Affairs, IIT Bombay',
      jurisdiction: 'Mumbai Suburban, Maharashtra',
      fileSize: '1.8 MB',
      affectedGate: 'G5',
      officerReviewStatus: 'OFFICER_APPROVED',
      officerNotes: 'Fee structure matches notified MoTA limits for Premier Institutes (Gate 5 cleared).',
      evidenceSnippet: 'Certified fee breakdown: Tuition ₹1,12,000 + Living ₹18,000 + Laptop ₹45,000. Institutional Dean sign-off verified.',
      extraction: {
        confidence: 99.1,
        detectedSummary: 'All Fee Heads Within Statutory Ceilings',
        fields: [
          { label: 'Student Name', value: 'Mangal Munda' },
          { label: 'Roll Number', value: '24B030042' },
          { label: 'Academic Program', value: 'B.Tech in Computer Science & Engineering' },
          { label: 'Tuition Fee Amount', value: '₹1,12,000 / semester' },
          { label: 'Living Expense Allowance', value: '₹18,000 / semester' },
          { label: 'Computer/Hardware Grant', value: '₹45,000 (One-time reimbursement)' },
          { label: 'Institutional Sign-off', value: 'Dean of Student Affairs (Verified)' }
        ]
      },
      ruleComparison: {
        schemeRequirement: 'Top Class Scheme Guidelines 2024, Clause 5.2 (Approved Fee Heads)',
        eligibilityCondition: 'Admission in premier institute; full tuition reimbursement + fixed living allowances.',
        requiredDocumentRule: 'Fee schedule certified by Dean / Registrar on official letterhead.'
      },
      deficiency: null
    }
  ]);

  // Visual chain steps definition
  const visualChainSteps = [
    { id: 'DOCUMENT', label: '1. DOCUMENT', desc: 'Synthetic Document Upload' },
    { id: 'EXTRACTION', label: '2. AI EXTRACTION', desc: 'OCR & Metadata Parsing' },
    { id: 'COMPARISON', label: '3. RULE COMPARISON', desc: 'Scheme Rule Match' },
    { id: 'FLAG', label: '4. DEFICIENCY FLAG', desc: 'Heuristic Discrepancy' },
    { id: 'EVIDENCE', label: '5. EVIDENCE', desc: 'Optical Crop & Token' },
    { id: 'ACTION', label: '6. REQUIRED ACTION', desc: 'Remedial Procedure' },
    { id: 'REVIEW', label: '7. OFFICER REVIEW', desc: 'Human Adjudication' }
  ];

  // Filtering logic
  const filteredDocuments = documents.filter(doc => {
    // Status Filter
    if (statusFilter === 'DEFICIENT' && doc.statusType !== 'DEFICIENT') return false;
    if (statusFilter === 'VERIFIED' && doc.statusType !== 'VERIFIED') return false;

    // Scheme Filter
    if (schemeFilter !== 'ALL' && doc.scheme !== schemeFilter) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name.toLowerCase().includes(q);
      const matchType = doc.type.toLowerCase().includes(q);
      const matchApplicant = doc.applicantName.toLowerCase().includes(q);
      const matchCase = doc.caseId.toLowerCase().includes(q);
      const matchDef = doc.deficiency?.title?.toLowerCase().includes(q);
      return matchName || matchType || matchApplicant || matchCase || matchDef;
    }

    return true;
  });

  // Handle live re-scan simulation
  const handleSimulateScan = (docId) => {
    setScanningDocId(docId);
    showToast('Optical Character Recognition & Policy Rule Engine executing...', 'info');

    setTimeout(() => {
      setScanningDocId(null);
      showToast('Live AI Inspection finished: Extracted fields cross-referenced against statutory scheme rules.', 'success');
    }, 1500);
  };

  // Handle Send for Officer Review
  const handleSendForOfficerReview = (doc) => {
    setSelectedDocForOfficerReview(doc);
  };

  // Confirm Officer Review Action
  const handleConfirmOfficerDecision = (decisionType, notes) => {
    if (!selectedDocForOfficerReview) return;

    const docId = selectedDocForOfficerReview.id;
    let newStatus = 'OFFICER_REVIEW_IN_PROGRESS';
    let toastMsg = '';

    if (decisionType === 'CONFIRM_DEFICIENCY') {
      newStatus = 'OFFICER_CONFIRMED_DEFICIENT';
      toastMsg = `Officer confirmed deficiency on ${selectedDocForOfficerReview.name}. Notice queued for beneficiary.`;
    } else if (decisionType === 'OVERRIDE_CLEAR') {
      newStatus = 'OFFICER_OVERRIDDEN_VERIFIED';
      toastMsg = `Officer exercised administrative discretion: Overrode AI flag for ${selectedDocForOfficerReview.name}.`;
    } else {
      newStatus = 'OFFICER_RE_INVESTIGATION';
      toastMsg = `Document ${selectedDocForOfficerReview.name} sent for supplementary field investigation.`;
    }

    setDocuments(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          officerReviewStatus: newStatus,
          officerNotes: notes || 'Administrative review completed by nodal officer.'
        };
      }
      return d;
    }));

    if (addAuditEntry) {
      addAuditEntry({
        action: `OFFICER_DOCUMENT_REVIEW: ${decisionType}`,
        details: `Officer reviewed ${selectedDocForOfficerReview.name} (${selectedDocForOfficerReview.caseId}). Status updated to ${newStatus}. Notes: ${notes || 'N/A'}`
      });
    }

    showToast(toastMsg, 'success');
    setSelectedDocForOfficerReview(null);
  };

  // Callback when a notice is dispatched from DraftNoticeModal
  const handleNoticeDispatched = (doc, refNo, notes) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === doc.id) {
        return {
          ...d,
          officerReviewStatus: 'NOTICE_DISPATCHED',
          officerNotes: `Official Notice ${refNo} approved and dispatched. Officer sign-off verified.`
        };
      }
      return d;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & AI Assistive Boundaries Charter */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                MoTA AI Document Intelligence Engine
              </span>
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Strict Government Compliance: Decision Support Layer
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              AI Document & Deficiency Intelligence
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Automated optical extraction, anti-tamper heuristics, and statutory policy comparison for tribal scholarship documentation. 
              The AI performs <strong>only assistive tasks</strong>; final government determinations and DBT payment authorizations 
              remain solely with Human Verification Officers.
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Inspected</span>
              <span className="text-lg font-black text-slate-900">{documents.length}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-red-50 border border-red-200 text-center">
              <span className="text-[10px] uppercase font-bold text-red-700 block">Flagged Deficiencies</span>
              <span className="text-lg font-black text-red-700">
                {documents.filter(d => d.statusType === 'DEFICIENT').length}
              </span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Fully Satisfied</span>
              <span className="text-lg font-black text-emerald-700">
                {documents.filter(d => d.statusType === 'VERIFIED').length}
              </span>
            </div>
          </div>
        </div>

        {/* 6 AI Assistive Roles Banner */}
        <div className="pt-3 border-t border-slate-100">
          <div className="bg-slate-900 text-white p-3.5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-amber-300">Assistive-Only Mandate:</span>
                <span className="text-slate-300 ml-1.5">
                  AI does NOT make final government decisions or authorize payments. Permitted AI tasks:
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              {['EXTRACT', 'COMPARE', 'FLAG', 'SUMMARIZE', 'DRAFT', 'EXPLAIN'].map((act, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-amber-200 border border-slate-700">
                  {act}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Chain Stepper Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-600" />
            AI Document Intelligence Verification Chain
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            End-to-End Governance Architecture
          </span>
        </div>

        {/* Stepper Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {visualChainSteps.map((step, idx) => (
            <div
              key={step.id}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                activeVisualChainStep === step.id
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm scale-102'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              onMouseEnter={() => setActiveVisualChainStep(step.id)}
              onMouseLeave={() => setActiveVisualChainStep(null)}
            >
              <div className="text-[10px] font-black uppercase tracking-wider truncate">
                {step.label}
              </div>
              <div className={`text-[10px] mt-0.5 truncate ${activeVisualChainStep === step.id ? 'text-amber-100' : 'text-slate-500'}`}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Filters & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by name, applicant, case ID, or deficiency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status Filter */}
          <div className="flex items-center rounded-xl bg-slate-100 p-0.5 text-xs font-semibold">
            {[
              { id: 'ALL', label: 'All Documents' },
              { id: 'DEFICIENT', label: 'Flagged Deficiencies' },
              { id: 'VERIFIED', label: 'Fully Satisfied' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  statusFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scheme Filter */}
          <select
            value={schemeFilter}
            onChange={(e) => setSchemeFilter(e.target.value)}
            className="text-xs py-1.5 px-3 border border-slate-200 rounded-xl bg-white text-slate-700 font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
          >
            <option value="ALL">All Schemes</option>
            <option value="PMS_ST">PMS-ST (Post-Matric)</option>
            <option value="NFST">NFST (Ph.D. Fellowship)</option>
            <option value="NOS">NOS (National Overseas)</option>
            <option value="TOPCLASS">Top Class Scholarship</option>
          </select>

        </div>
      </div>

      {/* 4. Document Intelligence Cards Grid */}
      <div className="space-y-6">
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <FileSearch className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No documents matched your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting the search filters or query text.</p>
            <button
              onClick={() => {
                setStatusFilter('ALL');
                setSchemeFilter('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-semibold text-xs inline-flex items-center space-x-1.5 shadow-xs hover:bg-slate-800"
            >
              <span>Reset Document Filters</span>
            </button>
          </div>
        ) : (
          filteredDocuments.map(doc => {
            const isScanning = scanningDocId === doc.id;
            const hasDeficiency = doc.statusType === 'DEFICIENT';

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition-all"
              >
                {/* Document Top Bar */}
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      hasDeficiency ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {hasDeficiency ? <AlertTriangle className="w-5 h-5" /> : <FileCheck2 className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">
                          {doc.name}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {doc.scheme}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {doc.caseId}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                        <span><strong>Type:</strong> {doc.type}</span>
                        <span><strong>Uploaded:</strong> {doc.uploadDate}</span>
                        <span><strong>Applicant:</strong> {doc.applicantName} ({doc.tribe})</span>
                      </div>
                    </div>
                  </div>

                  {/* Processing Status & Re-scan */}
                  <div className="flex items-center space-x-3 self-end md:self-center">
                    <div className="text-right">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border inline-flex items-center gap-1 ${
                        hasDeficiency
                          ? 'bg-red-50 text-red-800 border-red-200'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {hasDeficiency ? (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                            <span>DEFICIENCY DETECTED</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>RULE SATISFIED</span>
                          </>
                        )}
                      </span>

                      {/* Officer Signoff Indicator */}
                      <span className="block text-[10px] text-slate-500 mt-1">
                        Review Gate: <strong className="text-slate-700">{doc.officerReviewStatus}</strong>
                      </span>
                    </div>

                    <button
                      onClick={() => handleSimulateScan(doc.id)}
                      disabled={isScanning}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                      title="Run Optical AI Re-Inspection"
                    >
                      <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin text-amber-600' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* 3-Column Inspection Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left: AI Extraction (4 cols) */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Scan className="w-4 h-4 text-indigo-600" />
                        AI Extraction
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Confidence: {doc.extraction.confidence}%
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Detected Summary
                      </span>
                      <p className="font-bold text-slate-900 font-mono text-[11px]">
                        {doc.extraction.detectedSummary}
                      </p>
                    </div>

                    {/* Extracted fields */}
                    <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs overflow-hidden">
                      {doc.extraction.fields.map((f, i) => (
                        <div key={i} className="p-2 flex items-center justify-between bg-white hover:bg-slate-50">
                          <span className="text-slate-500">{f.label}</span>
                          <span className="font-mono font-semibold text-slate-900 text-[11px] text-right truncate max-w-[180px]">
                            {f.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Middle: Rule Comparison (4 cols) */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-amber-600" />
                        Rule Comparison
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500">
                        Statutory Benchmark
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Scheme Requirement
                        </span>
                        <p className="font-semibold text-slate-800 text-[11px] leading-snug">
                          {doc.ruleComparison.schemeRequirement}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-blue-800 block">
                          Eligibility Condition
                        </span>
                        <p className="font-semibold text-blue-950 text-[11px] leading-snug">
                          {doc.ruleComparison.eligibilityCondition}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Required Document Rule
                        </span>
                        <p className="text-slate-700 text-[11px] leading-snug">
                          {doc.ruleComparison.requiredDocumentRule}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Deficiency Detection or Satisfaction Verdict (4 cols) */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        {hasDeficiency ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        )}
                        {hasDeficiency ? 'Deficiency Detection' : 'Compliance Verdict'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        hasDeficiency ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {hasDeficiency ? 'Action Required' : 'Pre-Check Clean'}
                      </span>
                    </div>

                    {hasDeficiency ? (
                      <div className="p-3.5 bg-red-50/80 border border-red-200 rounded-xl space-y-2 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-red-700 block">
                            Flagged Deficiency
                          </span>
                          <h4 className="font-bold text-red-950 text-xs mt-0.5 leading-snug">
                            “{doc.deficiency.title}”
                          </h4>
                        </div>

                        <div className="space-y-1.5 text-[11px]">
                          <div>
                            <strong className="text-slate-700 block">Related Rule:</strong>
                            <span className="text-slate-600 font-mono text-[10px] leading-tight block">
                              {doc.deficiency.relatedRule}
                            </span>
                          </div>

                          <div>
                            <strong className="text-slate-700 block">Evidence:</strong>
                            <span className="text-slate-600 italic block font-serif text-[10px]">
                              {doc.deficiency.evidence}
                            </span>
                          </div>

                          <div>
                            <strong className="text-amber-800 block">Detected Information:</strong>
                            <span className="text-amber-950 font-semibold block font-mono text-[10px]">
                              {doc.deficiency.detectedInformation}
                            </span>
                          </div>

                          <div>
                            <strong className="text-blue-800 block">Expected Requirement:</strong>
                            <span className="text-blue-950 font-semibold block font-mono text-[10px]">
                              {doc.deficiency.expectedRequirement}
                            </span>
                          </div>

                          <div>
                            <strong className="text-slate-700 block">Explanation:</strong>
                            <span className="text-slate-600 block text-[10px] leading-relaxed">
                              {doc.deficiency.explanation}
                            </span>
                          </div>

                          <div className="pt-1 border-t border-red-200">
                            <strong className="text-red-800 block">Required Correction:</strong>
                            <span className="text-red-950 font-medium block text-[10px] leading-relaxed">
                              {doc.deficiency.requiredCorrection}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-3 text-xs">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>All Pre-Checks Satisfied</span>
                        </div>
                        <p className="text-[11px] text-emerald-900 leading-relaxed">
                          The document matches all configured statutory rules for {doc.scheme}. 
                          Optical clarity, digital seals, and candidate identity have zero heuristic discrepancies.
                        </p>
                        <div className="p-2.5 bg-white rounded-lg border border-emerald-200 text-[10px] font-mono text-emerald-800">
                          {doc.evidenceSnippet}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* 4 Required Action Buttons Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Visual Chain Stage:</span>
                    <span className="font-mono bg-slate-200 px-2 py-0.5 rounded text-[10px] text-slate-800">
                      {hasDeficiency ? 'EVIDENCE → ACTION REQUIRED' : 'COMPLIANCE CLEAR'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    
                    {/* Button 1: View Evidence */}
                    <button
                      onClick={() => setSelectedDocForEvidence(doc)}
                      className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>View Evidence</span>
                    </button>

                    {/* Button 2: Explain Deficiency (Enabled if deficient) */}
                    {hasDeficiency && (
                      <button
                        onClick={() => setSelectedDocForExplain(doc)}
                        className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all shadow-2xs flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Explain Deficiency</span>
                      </button>
                    )}

                    {/* Button 3: Draft Notice (Enabled if deficient) */}
                    {hasDeficiency && (
                      <button
                        onClick={() => setSelectedDocForDraft(doc)}
                        className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-200" />
                        <span>Draft Notice</span>
                      </button>
                    )}

                    {/* Button 4: Send for Officer Review */}
                    <button
                      onClick={() => handleSendForOfficerReview(doc)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Send for Officer Review</span>
                    </button>

                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 5. Officer Review Adjudication Modal */}
      {selectedDocForOfficerReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Officer Adjudication & Decision Workspace
                  </h3>
                  <p className="text-xs text-slate-300">
                    Case: {selectedDocForOfficerReview.caseId} • {selectedDocForOfficerReview.applicantName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDocForOfficerReview(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950">
                <strong>Statutory Adjudication Mandate:</strong> The AI has completed OCR pre-checks and flagged potential 
                discrepancies. You are logged in as <strong>{currentUser.name} ({currentUser.designation})</strong>. 
                Please exercise independent administrative discretion to decide the next action on this document.
              </div>

              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Document Details</span>
                <div className="font-bold text-slate-900">{selectedDocForOfficerReview.name}</div>
                <div className="text-slate-600">Type: {selectedDocForOfficerReview.type}</div>
                <div className="text-slate-600">Scheme: {selectedDocForOfficerReview.scheme}</div>
                {selectedDocForOfficerReview.deficiency && (
                  <div className="text-red-700 font-semibold mt-1">
                    AI Flag: {selectedDocForOfficerReview.deficiency.title}
                  </div>
                )}
              </div>

              {/* Decision Options */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Select Officer Determination:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleConfirmOfficerDecision('CONFIRM_DEFICIENCY', 'Officer confirmed statutory discrepancy.')}
                    className="p-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-left transition-all"
                  >
                    <div className="font-bold text-red-900">Uphold AI Flag</div>
                    <div className="text-[10px] text-red-700 mt-1">
                      Confirm deficiency and queue official notice for applicant.
                    </div>
                  </button>

                  <button
                    onClick={() => handleConfirmOfficerDecision('OVERRIDE_CLEAR', 'Officer exercised statutory override. Document accepted.')}
                    className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-left transition-all"
                  >
                    <div className="font-bold text-emerald-900">Override & Accept</div>
                    <div className="text-[10px] text-emerald-700 mt-1">
                      Treat flag as false-positive and clear payment gate.
                    </div>
                  </button>

                  <button
                    onClick={() => handleConfirmOfficerDecision('RE_INVESTIGATE', 'Sent to District Tribal Welfare Officer for physical inquiry.')}
                    className="p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-left transition-all"
                  >
                    <div className="font-bold text-amber-900">Field Inquiry</div>
                    <div className="text-[10px] text-amber-700 mt-1">
                      Request field verification from District Tribal Officer.
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedDocForOfficerReview(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 6. Evidence Modal */}
      {selectedDocForEvidence && (
        <EvidenceModal
          doc={selectedDocForEvidence}
          onClose={() => setSelectedDocForEvidence(null)}
          onOpenExplain={(doc) => setSelectedDocForExplain(doc)}
          onOpenDraft={(doc) => setSelectedDocForDraft(doc)}
        />
      )}

      {/* 7. Explain Deficiency Modal */}
      {selectedDocForExplain && (
        <ExplainDeficiencyModal
          doc={selectedDocForExplain}
          onClose={() => setSelectedDocForExplain(null)}
          onOpenDraft={(doc) => setSelectedDocForDraft(doc)}
          onOpenEvidence={(doc) => setSelectedDocForEvidence(doc)}
        />
      )}

      {/* 8. Draft Notice Modal */}
      {selectedDocForDraft && (
        <DraftNoticeModal
          doc={selectedDocForDraft}
          onClose={() => setSelectedDocForDraft(null)}
          onDispatched={handleNoticeDispatched}
        />
      )}

    </div>
  );
};
