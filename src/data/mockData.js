// MoTA Synthetic Data Store - Case-Centric Intelligence Layer
// Note: All personal data is strictly synthetic and generated for demonstration purposes.

export const ROLES = {
  APPLICANT: 'applicant',
  VERIFIER: 'verifier',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin'
};

export const USER_PERSONAS = [
  {
    id: 'persona-1',
    role: ROLES.APPLICANT,
    name: 'Sunita Maravi',
    designation: 'NFST Ph.D. Research Scholar (Botany)',
    institution: 'Indian Institute of Science (IISc), Bengaluru',
    tribe: 'Gond (Madhya Pradesh)',
    caseId: 'MOTA-NFST-2025-0482',
    avatar: 'SM',
    badge: 'Tribal Scholar',
    email: 'sunita.maravi@res.iisc.ac.in',
    phone: '+91 98261 XXXXX'
  },
  {
    id: 'persona-2',
    role: ROLES.VERIFIER,
    name: 'Dr. Rajesh Meena',
    designation: 'Senior Nodal Verification Officer',
    institution: 'MoTA State Fellowship Directorate, Central Zone',
    tribe: 'Meena (Rajasthan)',
    avatar: 'RM',
    badge: 'Desk Verifier L-2',
    email: 'rajesh.meena@tribal.gov.in',
    phone: '+91 94140 XXXXX'
  },
  {
    id: 'persona-3',
    role: ROLES.ADMIN,
    name: 'Smt. Arundhati Soren',
    designation: 'Joint Director & Scheme Administrator (Fellowships)',
    institution: 'Ministry of Tribal Affairs, Shastri Bhawan, New Delhi',
    tribe: 'Santhal (Jharkhand)',
    avatar: 'AS',
    badge: 'Scheme Administrator',
    email: 'arundhati.soren@gov.in',
    phone: '+91 97714 XXXXX'
  },
  {
    id: 'persona-4',
    role: ROLES.SUPERADMIN,
    name: 'Shri Vikram Singh, IAS',
    designation: 'Joint Secretary (Tribal Development & DBT Mission)',
    institution: 'Ministry of Tribal Affairs, Government of India',
    tribe: 'General Administration',
    avatar: 'VS',
    badge: 'Ministry Super Admin',
    email: 'vikram.singh.ias@gov.in',
    phone: '+91 98101 XXXXX'
  }
];

export const SCHEMES = [
  {
    code: 'NFST',
    name: 'National Fellowship for Scheduled Tribe Students (NFST)',
    hindiName: 'अनुसूचित जनजाति छात्रों हेतु राष्ट्रीय अध्येतावृत्ति',
    level: 'M.Phil / Ph.D. Research Fellowships',
    slotsAnnual: 750,
    activeBeneficiaries: 2840,
    stipendMonthly: 37000,
    contingencyAnnual: 12000,
    hraPercentage: 27,
    maxTenureYears: 5,
    pvtgQuota: 'Sub-quota prioritized for 75 PVTG groups',
    eligibilityIncome: 'No income ceiling (Merit & ST qualification based)',
    implementingAgency: 'Ministry of Tribal Affairs & UGC / INFLIBNET',
    description: 'Provides 100% financial assistance to ST students to pursue higher studies leading to M.Phil. and Ph.D. degrees in Science, Humanities, and Engineering.'
  },
  {
    code: 'NOS',
    name: 'National Overseas Scholarship for ST Candidates (NOS)',
    hindiName: 'राष्ट्रीय प्रवासी छात्रवृत्ति योजना',
    level: 'Master’s / Ph.D. in QS/Times Top 500 Global Universities',
    slotsAnnual: 20,
    activeBeneficiaries: 46,
    annualMaintenanceUSD: 15400,
    annualMaintenanceGBP: 9900,
    tuitionCoverage: '100% actual university tuition + economy airfare + visa',
    eligibilityIncome: 'Family income <= ₹6,00,000 / year',
    bondRequirement: 'Execution of Academic & Return Bond with 2 Indian sureties',
    implementingAgency: 'MoTA Overseas Cell & Indian Missions Abroad',
    description: 'Facilitates meritorious ST students to acquire higher education abroad in recognized international institutions ranked within the QS/Times World Top 500.'
  },
  {
    code: 'TOPCLASS',
    name: 'Top Class Education Scheme for ST Students',
    hindiName: 'अनुसूचित जनजाति छात्रों के लिए शीर्ष श्रेणी शिक्षा योजना',
    level: 'Undergraduate / Postgraduate in 258 Notified Premier Institutes',
    slotsAnnual: 1000,
    activeBeneficiaries: 3820,
    tuitionCoverage: 'Full tuition fee + non-refundable charges',
    livingAllowanceMonthly: 3000,
    booksAnnual: 5000,
    hardwareGrantOneTime: 45000,
    eligibilityIncome: 'Family income <= ₹6,00,000 / year',
    implementingAgency: 'Ministry of Tribal Affairs & Premier Institutes (IITs/IIMs/AIIMS/NITs)',
    description: 'Aims to encourage ST scholars who secure admission into premier notified institutions such as IITs, NITs, IIMs, AIIMS, and National Law Universities.'
  },
  {
    code: 'PMS_ST',
    name: 'Post-Matric Scholarship for ST Students (PMS-ST)',
    hindiName: 'अनुसूचित जनजाति उत्तर-मैट्रिक छात्रवृत्ति',
    level: 'Post-Secondary (Classes 11, 12, ITI, Diploma, Degrees)',
    slotsAnnual: 'Demand Driven (Open Quota)',
    activeBeneficiaries: 284000,
    annualOutlayCr: 2150,
    sharingPattern: '75:25 (Center:State), 90:10 (NE & Himalayan States)',
    eligibilityIncome: 'Family income <= ₹2,50,000 / year',
    implementingAgency: 'State Tribal Welfare Depts & MoTA Direct DBT Gateway',
    description: 'Centrally sponsored umbrella scholarship enabling ST students to continue higher education post 10th standard.'
  },
  {
    code: 'PRE_MATRIC',
    name: 'Pre-Matric Scholarship for ST Students (Classes 9 & 10)',
    hindiName: 'अनुसूचित जनजाति पूर्व-मैट्रिक छात्रवृत्ति (कक्षा 9 व 10)',
    level: 'Secondary Education (Classes 9 & 10 in recognized schools)',
    slotsAnnual: 'Demand Driven (Open Quota for all eligible ST scholars)',
    activeBeneficiaries: 1420000,
    annualOutlayCr: 980,
    sharingPattern: '75:25 (Center:State), 90:10 (NE & Himalayan States)',
    eligibilityIncome: 'Family income <= ₹2,50,000 / year',
    implementingAgency: 'State Tribal Welfare Depts & District Education Officers',
    description: 'Centrally sponsored scholarship to support parents of ST children for education of their wards studying in classes 9 and 10 to reduce drop-out rates at secondary stage.'
  }
];

export const PAYMENT_GATES = [
  {
    gateId: 'G1',
    code: 'SELECTION_SANCTION',
    title: 'Selection & Merit Sanction',
    description: 'Award letter generated and verified against approved scheme merit quota.',
    responsibleEntity: 'Scheme Selection Committee / UGC Panel',
    icon: 'Award'
  },
  {
    gateId: 'G2',
    code: 'AADHAAR_NPCI_SEEDING',
    title: 'Aadhaar-Bank Seeding & DBT Mandate',
    description: 'Bank account mapped on NPCI mapper and active for Direct Benefit Transfer.',
    responsibleEntity: 'NPCI / Beneficiary Bank Bridge',
    icon: 'CreditCard'
  },
  {
    gateId: 'G3',
    code: 'PFMS_BENEFICIARY_CODE',
    title: 'PFMS Beneficiary Code & Validation',
    description: 'PFMS party master registration with >=90% name match score and valid IFSC.',
    responsibleEntity: 'Public Financial Management System (PFMS)',
    icon: 'ShieldCheck'
  },
  {
    gateId: 'G4',
    code: 'INSTITUTE_CONTINUITY',
    title: 'Academic Milestone & Continuity Proof',
    description: 'Verified joining report, quarterly supervisor attendance, and dean sign-off.',
    responsibleEntity: 'Nodal Institute / Dean of Academic Affairs',
    icon: 'Building2'
  },
  {
    gateId: 'G5',
    code: 'SCHEME_COMPLIANCE',
    title: 'Scheme-Specific Compliance Checks',
    description: 'Academic bond (NOS), fee breakdown reconciliation (Top Class), or PVTG validation.',
    responsibleEntity: 'MoTA Verification Desk',
    icon: 'FileCheck'
  },
  {
    gateId: 'G6',
    code: 'PFMS_BATCH_STAGING',
    title: 'DSC Approval & Batch Release',
    description: 'Grouped into electronic DBT bill, digitally signed with DSC, and queued for transfer.',
    responsibleEntity: 'Drawing and Disbursing Officer (DDO), MoTA',
    icon: 'Send'
  }
];

export const CASES_DATA = [
  {
    caseId: 'MOTA-NFST-2025-0482',
    applicantName: 'Sunita Maravi',
    gender: 'Female',
    tribe: 'Gond',
    isPVTG: false,
    state: 'Madhya Pradesh',
    district: 'Dindori',
    scheme: 'NFST',
    course: 'Ph.D. in Plant Molecular Biology',
    institution: 'Indian Institute of Science (IISc), Bengaluru',
    aisheCode: 'U-0220',
    nirfRank: 1,
    academicYear: '2025-26',
    applicationDate: '2025-07-14',
    selectionDate: '2025-08-20',
    overallStatus: 'Selected',
    paymentReadinessStatus: 'BLOCKED',
    paymentGatesScore: '4/6',
    gates: {
      G1: { passed: true, verifiedAt: '2025-08-20', remarks: 'Merit Rank ST-04, Selection Confirmed' },
      G2: { passed: true, verifiedAt: '2025-08-22', remarks: 'State Bank of India (Aadhaar Seeding Active on NPCI)' },
      G3: { passed: true, verifiedAt: '2025-08-25', remarks: 'PFMS Code: SBIN0002215-BEN-991204 (Name Match 98.4%)' },
      G4: { passed: false, verifiedAt: null, remarks: 'Quarterly Fellowship Continuation Certificate (Q1 Jul-Sep 2025) missing Dean seal & supervisor signature.' },
      G5: { passed: true, verifiedAt: '2025-08-21', remarks: 'Pre-requisite course credits vetted by UGC guide' },
      G6: { passed: false, verifiedAt: null, remarks: 'Waiting for Gate 4 clearance before inclusion in PFMS Batch' }
    },
    stipendPending: 111000,
    disbursedSoFar: 0,
    lastDisbursedDate: null,
    deficiencyCount: 1,
    activeDeficiencies: ['DEF-NFST-2025-091'],
    digilockerLinked: true,
    casteCertNo: 'MP-ST-DIN-2022-88192',
    incomeCertAmount: 180000,
    bankDetails: {
      accountHolder: 'Sunita Maravi',
      bankName: 'State Bank of India',
      branch: 'IISc Campus Branch, Bengaluru',
      accountMasked: 'XXXXXX4819',
      ifsc: 'SBIN0002215',
      npciMapped: true,
      dbtActive: true
    },
    aiRiskScore: 'LOW',
    aiNotes: 'Documents OCR matched 98.6%. Caste certificate verified via MP e-District API. Blocker is purely administrative (Quarterly continuation certificate formatting).',
    timeline: [
      { timestamp: '2025-07-14 10:22', event: 'Application Submitted on Portal', actor: 'Applicant' },
      { timestamp: '2025-07-18 14:40', event: 'DigiLocker Verification Success (Caste & Marksheets)', actor: 'AI Engine' },
      { timestamp: '2025-08-05 11:15', event: 'Desk Officer Initial Clearance', actor: 'Dr. Rajesh Meena (Verifier)' },
      { timestamp: '2025-08-20 16:00', event: 'Selection Committee Merit List Published (Award Issued)', actor: 'MoTA Committee' },
      { timestamp: '2025-08-25 12:30', event: 'PFMS Beneficiary Code Successfully Created', actor: 'PFMS Adapter' },
      { timestamp: '2025-09-02 09:45', event: 'Quarterly Continuation Audit Flag: Missing Supervisor Endorsement', actor: 'AI Policy Engine' },
      { timestamp: '2025-09-02 10:10', event: 'Deficiency DEF-NFST-2025-091 Raised with 15-day SLA', actor: 'Dr. Rajesh Meena' }
    ]
  },
  {
    caseId: 'MOTA-NOS-2025-0119',
    applicantName: 'Birsa Soren',
    gender: 'Male',
    tribe: 'Santhal',
    isPVTG: false,
    state: 'Jharkhand',
    district: 'Dumka',
    scheme: 'NOS',
    course: 'M.Sc. in Renewable Energy Systems',
    institution: 'University of Oxford, United Kingdom',
    aisheCode: 'OVERSEAS-UK-001',
    nirfRank: null,
    qsRank: 3,
    academicYear: '2025-26',
    applicationDate: '2025-06-10',
    selectionDate: '2025-07-28',
    overallStatus: 'Selected',
    paymentReadinessStatus: 'BLOCKED',
    paymentGatesScore: '3/6',
    gates: {
      G1: { passed: true, verifiedAt: '2025-07-28', remarks: 'Provisional Award Letter for Overseas Studies Issued' },
      G2: { passed: true, verifiedAt: '2025-08-02', remarks: 'Bank of India Forex & NRE Account Verified' },
      G3: { passed: true, verifiedAt: '2025-08-05', remarks: 'PFMS Beneficiary registered for International Wire Transfer' },
      G4: { passed: false, verifiedAt: null, remarks: 'Unconditional Admission Letter verified, but Tier-4 UK Student Visa copy not yet stamped by VFS.' },
      G5: { passed: false, verifiedAt: null, remarks: 'Execution of ₹25 Lakhs Return Bond with 2 Gazetted Indian Sureties pending physical verification.' },
      G6: { passed: false, verifiedAt: null, remarks: 'Blocked pending Bond and Visa verification' }
    },
    stipendPending: 1845000, // Equivalent £17,500 maintenance + term 1 tuition
    disbursedSoFar: 0,
    lastDisbursedDate: null,
    deficiencyCount: 2,
    activeDeficiencies: ['DEF-NOS-2025-012', 'DEF-NOS-2025-013'],
    digilockerLinked: true,
    casteCertNo: 'JH-ST-DMK-2021-39100',
    incomeCertAmount: 420000,
    bankDetails: {
      accountHolder: 'Birsa Soren',
      bankName: 'Bank of India',
      branch: 'Ranchi Main Branch',
      accountMasked: 'XXXXXX7721',
      ifsc: 'BKID0004900',
      npciMapped: true,
      dbtActive: true
    },
    aiRiskScore: 'MEDIUM',
    aiNotes: 'Oxford unconditional offer authentic (verified via e-CAS system). High value disbursement (₹18.45 L) mandates physical bond execution before Gate 5 clearance.',
    timeline: [
      { timestamp: '2025-06-10 11:00', event: 'Application Submitted with Oxford CAS Offer', actor: 'Applicant' },
      { timestamp: '2025-07-28 17:00', event: 'Selected under NOS 2025-26 Merit Quota', actor: 'Overseas Committee' },
      { timestamp: '2025-08-04 14:20', event: 'Deficiency DEF-NOS-2025-012 Raised: Academic Bond Sureties pending', actor: 'Overseas Desk' },
      { timestamp: '2025-08-15 10:00', event: 'Deficiency DEF-NOS-2025-013 Raised: Tier-4 UK Visa stamped biometric page required', actor: 'Overseas Desk' }
    ]
  },
  {
    caseId: 'MOTA-TOPCLASS-2025-0891',
    applicantName: 'Mangal Munda',
    gender: 'Male',
    tribe: 'Munda',
    isPVTG: false,
    state: 'Jharkhand',
    district: 'Khunti',
    scheme: 'TOPCLASS',
    course: 'B.Tech in Computer Science & Engineering',
    institution: 'Indian Institute of Technology Bombay (IIT Bombay)',
    aisheCode: 'U-0306',
    nirfRank: 3,
    academicYear: '2025-26',
    applicationDate: '2025-08-01',
    selectionDate: '2025-08-18',
    overallStatus: 'Payment Ready',
    paymentReadinessStatus: 'PAYMENT_READY',
    paymentGatesScore: '6/6',
    gates: {
      G1: { passed: true, verifiedAt: '2025-08-18', remarks: 'JEE Advanced ST Category Rank 84 - Top Class Sanctioned' },
      G2: { passed: true, verifiedAt: '2025-08-20', remarks: 'Union Bank of India (DBT Mandate Active, Aadhaar Seeded)' },
      G3: { passed: true, verifiedAt: '2025-08-22', remarks: 'PFMS Code: UBIN0538914-BEN-441029 (Matched 100%)' },
      G4: { passed: true, verifiedAt: '2025-08-26', remarks: 'IIT Bombay Dean of Student Affairs certified fee structure and hosteller status' },
      G5: { passed: true, verifiedAt: '2025-08-28', remarks: 'Fee Invoice ₹1,12,000 + Living allowance ₹18,000 + Laptop bill ₹45,000 verified' },
      G6: { passed: true, verifiedAt: '2025-09-01', remarks: 'Staged into Batch BATCH-MOTA-TOPCLASS-2025-Q1-TR02. Ready for DSC Sign-off.' }
    },
    stipendPending: 175000,
    disbursedSoFar: 0,
    lastDisbursedDate: null,
    deficiencyCount: 0,
    activeDeficiencies: [],
    digilockerLinked: true,
    casteCertNo: 'JH-ST-KHN-2023-11029',
    incomeCertAmount: 210000,
    bankDetails: {
      accountHolder: 'Mangal Munda',
      bankName: 'Union Bank of India',
      branch: 'IIT Powai Branch, Mumbai',
      accountMasked: 'XXXXXX3119',
      ifsc: 'UBIN0538914',
      npciMapped: true,
      dbtActive: true
    },
    aiRiskScore: 'LOW',
    aiNotes: 'All 6 Gates Cleared! Zero deficiency. Instant payment release recommended under upcoming PFMS DBT run.',
    timeline: [
      { timestamp: '2025-08-01 09:30', event: 'Application Submitted with JEE Advanced scorecard', actor: 'Applicant' },
      { timestamp: '2025-08-18 15:00', event: 'Approved under Top Class 2025-26 Sanctions', actor: 'MoTA Admin' },
      { timestamp: '2025-08-26 11:00', event: 'IIT Bombay Institute Nodal Officer e-authenticated fee dues', actor: 'AISHE Institute Officer' },
      { timestamp: '2025-09-01 16:30', event: 'All 6 Payment Gates Cleared. Case Staged for Batching', actor: 'AI Payment Engine' }
    ]
  },
  {
    caseId: 'MOTA-NFST-2025-0312',
    applicantName: 'Lakshmi Baiga',
    gender: 'Female',
    tribe: 'Baiga',
    isPVTG: true, // Particularly Vulnerable Tribal Group
    state: 'Madhya Pradesh',
    district: 'Mandla',
    scheme: 'NFST',
    course: 'Ph.D. in Ethnopharmacology & Traditional Forest Medicine',
    institution: 'Jawaharlal Nehru University (JNU), New Delhi',
    aisheCode: 'U-0108',
    nirfRank: 2,
    academicYear: '2025-26',
    applicationDate: '2025-07-20',
    selectionDate: '2025-08-22',
    overallStatus: 'Selected',
    paymentReadinessStatus: 'BLOCKED',
    paymentGatesScore: '3/6',
    gates: {
      G1: { passed: true, verifiedAt: '2025-08-22', remarks: 'PVTG Priority Selection Quota - Sanction Approved' },
      G2: { passed: false, verifiedAt: null, remarks: 'NPCI Bridge Alert: Aadhaar 3891-XXXX-0012 is linked to Bank of Baroda account, but Direct Benefit Transfer (DBT) mandate is INACTIVE / Dormant.' },
      G3: { passed: true, verifiedAt: '2025-08-27', remarks: 'PFMS Master created. Pending active DBT mapper trigger.' },
      G4: { passed: true, verifiedAt: '2025-08-30', remarks: 'JNU School of Biotechnology joining report endorsed' },
      G5: { passed: true, verifiedAt: '2025-08-25', remarks: 'Special PVTG field research contingency approved' },
      G6: { passed: false, verifiedAt: null, remarks: 'Payment release suspended until NPCI DBT mandate is activated by bank branch.' }
    },
    stipendPending: 111000,
    disbursedSoFar: 0,
    lastDisbursedDate: null,
    deficiencyCount: 1,
    activeDeficiencies: ['DEF-NFST-2025-044'],
    digilockerLinked: true,
    casteCertNo: 'MP-PVTG-MND-2020-00128',
    incomeCertAmount: 95000,
    bankDetails: {
      accountHolder: 'Lakshmi Baiga',
      bankName: 'Bank of Baroda',
      branch: 'Mandla Rural Branch',
      accountMasked: 'XXXXXX5012',
      ifsc: 'BARB0MANDLA',
      npciMapped: false, // Root blocker
      dbtActive: false
    },
    aiRiskScore: 'LOW',
    aiNotes: 'PVTG candidate deserving top priority. Root blocker is Bank of Baroda account NPCI seeding dormant flag. Auto-generated SMS/WhatsApp reminder sent with instructions to visit branch.',
    timeline: [
      { timestamp: '2025-07-20 12:15', event: 'Application received under PVTG Priority Reservation', actor: 'Applicant' },
      { timestamp: '2025-08-22 17:00', event: 'Awarded NFST Fellowship 2025-26', actor: 'MoTA Committee' },
      { timestamp: '2025-08-28 09:30', event: 'NPCI DBT Seeding Failed: Account Dormant flag detected', actor: 'PFMS DBT Adapter' },
      { timestamp: '2025-08-28 09:35', event: 'High Priority Deficiency Raised: Bank DBT Mandate activation required', actor: 'AI Readiness Engine' }
    ]
  },
  {
    caseId: 'MOTA-PMS-2025-1044',
    applicantName: 'Arjun Meena',
    gender: 'Male',
    tribe: 'Meena',
    isPVTG: false,
    state: 'Rajasthan',
    district: 'Sawai Madhopur',
    scheme: 'PMS_ST',
    course: 'B.Sc. Agriculture (Honours) - Year 2',
    institution: 'Maharana Pratap University of Agriculture & Technology (MPUAT), Udaipur',
    aisheCode: 'U-0402',
    nirfRank: 42,
    academicYear: '2025-26',
    applicationDate: '2025-08-10',
    selectionDate: null,
    overallStatus: 'Deficiency Raised',
    paymentReadinessStatus: 'NOT_ELIGIBLE_YET',
    paymentGatesScore: '1/6',
    gates: {
      G1: { passed: false, verifiedAt: null, remarks: 'Desk verification pending due to Income Certificate validity issue' },
      G2: { passed: true, verifiedAt: '2025-08-12', remarks: 'Aadhaar NPCI active' },
      G3: { passed: false, verifiedAt: null, remarks: 'PFMS creation pending selection' },
      G4: { passed: true, verifiedAt: '2025-08-15', remarks: 'College year 2 promotion marksheet validated (CGPA 7.8)' },
      G5: { passed: false, verifiedAt: null, remarks: 'Income ceiling compliance unverified' },
      G6: { passed: false, verifiedAt: null, remarks: 'Not ready' }
    },
    stipendPending: 34000,
    disbursedSoFar: 32000, // Year 1 disbursed
    lastDisbursedDate: '2024-11-20',
    deficiencyCount: 1,
    activeDeficiencies: ['DEF-PMS-2025-882'],
    digilockerLinked: false,
    casteCertNo: 'RJ-ST-SWM-2019-9941',
    incomeCertAmount: 290000, // Over 2.5 LPA ceiling!
    bankDetails: {
      accountHolder: 'Arjun Meena',
      bankName: 'Punjab National Bank',
      branch: 'Udaipur City',
      accountMasked: 'XXXXXX8801',
      ifsc: 'PUNB0128900',
      npciMapped: true,
      dbtActive: true
    },
    aiRiskScore: 'HIGH',
    aiNotes: 'Income Certificate uploaded shows ₹2,90,000 / year, which exceeds PMS-ST scheme guideline ceiling of ₹2,50,000 / year. Needs Tehsil revision certificate or re-assessment.',
    timeline: [
      { timestamp: '2025-08-10 14:00', event: 'Renewal Application for Year 2 submitted', actor: 'Applicant' },
      { timestamp: '2025-08-16 11:20', event: 'AI OCR Scan: Extracted Income ₹2,90,000 exceeds ceiling ₹2,50,000', actor: 'AI Policy Engine' },
      { timestamp: '2025-08-16 11:45', event: 'Deficiency DEF-PMS-2025-882 Issued: Income Ceiling Breach', actor: 'Dr. Rajesh Meena (Verifier)' }
    ]
  },
  {
    caseId: 'MOTA-NFST-2024-0105',
    applicantName: 'Priya Oraon',
    gender: 'Female',
    tribe: 'Oraon',
    isPVTG: false,
    state: 'Chhattisgarh',
    district: 'Jashpur',
    scheme: 'NFST',
    course: 'Ph.D. in Environmental Sciences (Year 2)',
    institution: 'Banaras Hindu University (BHU), Varanasi',
    aisheCode: 'U-0500',
    nirfRank: 5,
    academicYear: '2025-26',
    applicationDate: '2024-07-10',
    selectionDate: '2024-08-15',
    overallStatus: 'Disbursed',
    paymentReadinessStatus: 'DISBURSED',
    paymentGatesScore: '6/6',
    gates: {
      G1: { passed: true, verifiedAt: '2024-08-15', remarks: 'NFST Award Letter Active' },
      G2: { passed: true, verifiedAt: '2024-08-18', remarks: 'Canara Bank Aadhaar Seeded' },
      G3: { passed: true, verifiedAt: '2024-08-20', remarks: 'PFMS Code Validated' },
      G4: { passed: true, verifiedAt: '2025-07-15', remarks: 'Year 1 Research Assessment Committee approved SRF elevation' },
      G5: { passed: true, verifiedAt: '2025-07-20', remarks: 'Contingency bills & UC verified' },
      G6: { passed: true, verifiedAt: '2025-08-01', remarks: 'PFMS UTR DBT9921008432 Credit Success' }
    },
    stipendPending: 0,
    disbursedSoFar: 488000,
    lastDisbursedDate: '2025-08-05',
    deficiencyCount: 0,
    activeDeficiencies: [],
    digilockerLinked: true,
    casteCertNo: 'CG-ST-JSH-2021-4401',
    incomeCertAmount: 140000,
    bankDetails: {
      accountHolder: 'Priya Oraon',
      bankName: 'Canara Bank',
      branch: 'BHU Campus, Varanasi',
      accountMasked: 'XXXXXX1928',
      ifsc: 'CNRB0002441',
      npciMapped: true,
      dbtActive: true
    },
    aiRiskScore: 'LOW',
    aiNotes: 'Exemplary case. Both Tranches 1 & 2 credited smoothly. Year 2 milestone verified by Dean BHU.',
    timeline: [
      { timestamp: '2024-08-15 10:00', event: 'NFST Fellow Sanction Order Issued', actor: 'MoTA' },
      { timestamp: '2024-10-10 14:00', event: 'Tranche 1 Disbursed (₹2,22,000)', actor: 'PFMS Gateway' },
      { timestamp: '2025-07-15 11:30', event: 'Annual Progress Report Validated by AI OCR', actor: 'AI Engine' },
      { timestamp: '2025-08-05 16:20', event: 'Tranche 2 Disbursed (₹2,66,000) UTR DBT9921008432', actor: 'PFMS Gateway' }
    ]
  },
  {
    caseId: 'MOTA-NFST-2025-0771',
    applicantName: 'Somnath Gamit',
    gender: 'Male',
    tribe: 'Gamit',
    isPVTG: false,
    state: 'Gujarat',
    district: 'Tapi',
    scheme: 'NFST',
    course: 'Ph.D. in Organic Chemistry',
    institution: 'National Chemical Laboratory (CSIR-NCL) / Pune University',
    aisheCode: 'U-0321',
    nirfRank: 12,
    academicYear: '2025-26',
    applicationDate: '2025-07-28',
    selectionDate: '2025-08-25',
    overallStatus: 'Deficiency Raised',
    paymentReadinessStatus: 'BLOCKED',
    paymentGatesScore: '3/6',
    gates: {
      G1: { passed: true, verifiedAt: '2025-08-25', remarks: 'Merit Selection ST-49' },
      G2: { passed: true, verifiedAt: '2025-08-28', remarks: 'Bank of Baroda active' },
      G3: { passed: true, verifiedAt: '2025-08-29', remarks: 'PFMS Master generated' },
      G4: { passed: false, verifiedAt: null, remarks: 'Joining report uploaded does not have CSIR-NCL Research Guide official seal.' },
      G5: { passed: true, verifiedAt: '2025-08-26', remarks: 'Category list checked' },
      G6: { passed: false, verifiedAt: null, remarks: 'Awaiting Gate 4 correction' }
    },
    stipendPending: 111000,
    disbursedSoFar: 0,
    lastDisbursedDate: null,
    deficiencyCount: 1,
    activeDeficiencies: ['DEF-NFST-2025-771'],
    digilockerLinked: true,
    casteCertNo: 'GJ-ST-TAP-2022-7718',
    incomeCertAmount: 190000,
    bankDetails: {
      accountHolder: 'Somnath Gamit',
      bankName: 'Bank of Baroda',
      branch: 'Tapi Vyara Branch',
      accountMasked: 'XXXXXX6643',
      ifsc: 'BARB0VYARAX',
      npciMapped: true,
      dbtActive: true
    },
    aiRiskScore: 'LOW',
    aiNotes: 'Guide signature present but official round seal of CSIR-NCL Academic Section missing. AI flag: Seal Missing (Confidence 97%).',
    timeline: [
      { timestamp: '2025-07-28 16:40', event: 'Application Submitted', actor: 'Applicant' },
      { timestamp: '2025-08-25 15:00', event: 'Selected on NFST Merit Panel', actor: 'MoTA Committee' },
      { timestamp: '2025-09-03 11:15', event: 'Deficiency DEF-NFST-2025-771 Raised: Joining Report missing Institute Seal', actor: 'Dr. Rajesh Meena' }
    ]
  },
  {
    caseId: 'MOTA-TOPCLASS-2025-0418',
    applicantName: 'Devika Koya',
    gender: 'Female',
    tribe: 'Koya',
    isPVTG: false,
    state: 'Telangana',
    district: 'Bhadradri Kothagudem',
    scheme: 'TOPCLASS',
    course: 'B.A. LL.B. (Honours) - Year 1',
    institution: 'National Academy of Legal Studies and Research (NALSAR), Hyderabad',
    aisheCode: 'U-0024',
    nirfRank: 4,
    academicYear: '2025-26',
    applicationDate: '2025-08-05',
    selectionDate: '2025-08-20',
    overallStatus: 'Payment Ready',
    paymentReadinessStatus: 'PAYMENT_READY',
    paymentGatesScore: '6/6',
    gates: {
      G1: { passed: true, verifiedAt: '2025-08-20', remarks: 'CLAT ST Rank 22 - Approved' },
      G2: { passed: true, verifiedAt: '2025-08-22', remarks: 'State Bank of India (Aadhaar Seeding Validated)' },
      G3: { passed: true, verifiedAt: '2025-08-24', remarks: 'PFMS Code: SBIN0020491-BEN-884012 (Matched 99%)' },
      G4: { passed: true, verifiedAt: '2025-08-28', remarks: 'NALSAR Registrar certified 1st Year fee receipts & mess bill' },
      G5: { passed: true, verifiedAt: '2025-08-30', remarks: 'Tuition Fee (₹1,95,000) + Laptop (₹45,000) + Living (₹18,000) checked' },
      G6: { passed: true, verifiedAt: '2025-09-02', remarks: 'Batch BATCH-MOTA-TOPCLASS-2025-Q1-TR02 Staged' }
    },
    stipendPending: 258000,
    disbursedSoFar: 0,
    lastDisbursedDate: null,
    deficiencyCount: 0,
    activeDeficiencies: [],
    digilockerLinked: true,
    casteCertNo: 'TG-ST-BHD-2023-5510',
    incomeCertAmount: 310000,
    bankDetails: {
      accountHolder: 'Devika Koya',
      bankName: 'State Bank of India',
      branch: 'Shamirpet, Hyderabad',
      accountMasked: 'XXXXXX9014',
      ifsc: 'SBIN0020491',
      npciMapped: true,
      dbtActive: true
    },
    aiRiskScore: 'LOW',
    aiNotes: 'All 6 gates cleared without remarks. Batching ready.',
    timeline: [
      { timestamp: '2025-08-05 10:10', event: 'Application submitted via NALSAR Nodal desk', actor: 'Applicant' },
      { timestamp: '2025-08-20 18:00', event: 'Awarded Top Class Scholarship', actor: 'MoTA Admin' },
      { timestamp: '2025-09-02 14:00', event: 'Payment Gates 1-6 Fully Cleared', actor: 'AI Readiness Engine' }
    ]
  },
  {
    caseId: 'MOTA-NFST-2025-0994',
    applicantName: 'Sukhlal Bhil',
    gender: 'Male',
    tribe: 'Bhil',
    isPVTG: false,
    state: 'Rajasthan',
    district: 'Banswara',
    scheme: 'NFST',
    course: 'Ph.D. in Tribal Linguistics & Folklore',
    institution: 'Mohanlal Sukhadia University, Udaipur',
    aisheCode: 'U-0410',
    nirfRank: 85,
    academicYear: '2025-26',
    applicationDate: '2025-07-25',
    selectionDate: null,
    overallStatus: 'Flagged / Duplicate Benefit Alert',
    paymentReadinessStatus: 'FRAUD_HOLD',
    paymentGatesScore: '1/6',
    gates: {
      G1: { passed: false, verifiedAt: null, remarks: 'Cross-Portal Adapter Warning: Matching Aadhaar found actively drawing Rajiv Gandhi ST Fellowship on Rajasthan State DBT Portal (₹25,000/mo).' },
      G2: { passed: true, verifiedAt: '2025-07-28', remarks: 'Aadhaar validated' },
      G3: { passed: false, verifiedAt: null, remarks: 'On hold due to dual scholarship restriction (Scheme Rule 7.2)' },
      G4: { passed: true, verifiedAt: '2025-08-01', remarks: 'University admission valid' },
      G5: { passed: false, verifiedAt: null, remarks: 'Dual Benefit Rule 7.2 violation' },
      G6: { passed: false, verifiedAt: null, remarks: 'Strict Hold' }
    },
    stipendPending: 111000,
    disbursedSoFar: 0,
    lastDisbursedDate: null,
    deficiencyCount: 1,
    activeDeficiencies: ['DEF-DUAL-2025-009'],
    digilockerLinked: true,
    casteCertNo: 'RJ-ST-BSW-2021-9011',
    incomeCertAmount: 160000,
    bankDetails: {
      accountHolder: 'Sukhlal Bhil',
      bankName: 'State Bank of India',
      branch: 'Banswara Collectorate',
      accountMasked: 'XXXXXX1144',
      ifsc: 'SBIN0031201',
      npciMapped: true,
      dbtActive: true
    },
    aiRiskScore: 'CRITICAL',
    aiNotes: 'CROSS-PORTAL DEDUPLICATION ENGINE TRIGGER: Beneficiary is currently receiving monthly fellowship from Rajasthan Tribal Area Development (TAD) Department under Scheme Code TAD-ST-2024. MoTA NFST Rule 7.2 prohibits concurrent fellowships. Scholar must surrender state fellowship and submit No-Dues Certificate before proceeding.',
    timeline: [
      { timestamp: '2025-07-25 14:15', event: 'Application received', actor: 'Applicant' },
      { timestamp: '2025-07-29 08:30', event: 'NSP & State DBT Deduplication Check executed', actor: 'NSP Cross-Portal Adapter' },
      { timestamp: '2025-07-29 08:32', event: 'CRITICAL ALERT: Active State Fellowship (TAD-ST-2024) detected on Aadhaar', actor: 'AI Deduplication Radar' },
      { timestamp: '2025-07-29 09:10', event: 'Deficiency DEF-DUAL-2025-009 Issued: Surrender Certificate required', actor: 'Dr. Rajesh Meena' }
    ]
  }
];

export const DEFICIENCIES_MASTER = [
  {
    deficiencyId: 'DEF-NFST-2025-091',
    caseId: 'MOTA-NFST-2025-0482',
    applicantName: 'Sunita Maravi',
    scheme: 'NFST',
    category: 'CONTINUITY_PROOF',
    documentType: 'Quarterly Fellowship Continuation Certificate (Q1 Jul-Sep 2025)',
    defectCode: 'DEF_CONTINUITY_MISSING_DEAN_SEAL',
    severity: 'CRITICAL',
    disbursementBlocker: true,
    raisedBy: 'Dr. Rajesh Meena (Nodal Verification Officer)',
    raisedAt: '2025-09-02 10:10',
    deadline: '2025-09-17 23:59',
    daysLeft: 5,
    status: 'ACTION_REQUIRED',
    guidelineClause: 'NFST Guidelines 2024, Clause 8.3: "Quarterly stipend release requires progress endorsement signed by both Ph.D. Research Supervisor and Dean of Academic Affairs / Registrar with institutional seal."',
    defectSummary: 'Uploaded Annexure-IV continuation certificate contains Supervisor signature but is missing Dean/Registrar official round seal and signature.',
    actionRequired: 'Download Annexure-IV template, obtain joint signatures of your Ph.D. Supervisor and the Dean of Academic Affairs, IISc Bengaluru with official institutional stamp, and upload the scanned color PDF.',
    hindiInstruction: 'अपलोड किए गए अनुलग्नक-IV निरंतरता प्रमाणपत्र में शोध पर्यवेक्षक के हस्ताक्षर हैं, किंतु संकायाध्यक्ष (Dean)/कुलसचिव की मुहर व हस्ताक्षर अनुपस्थित हैं। कृपया संकायाध्यक्ष की मुहर लगवाकर नया रंगीन पीडीएफ अपलोड करें।',
    aiVerificationCriteria: [
      'Document contains supervisor signature',
      'Document contains Dean / Registrar signature',
      'Institutional round seal detected (confidence >= 85%)',
      'Quarter dates match 01-Jul-2025 to 30-Sep-2025'
    ],
    submissionAttempts: 1
  },
  {
    deficiencyId: 'DEF-NOS-2025-012',
    caseId: 'MOTA-NOS-2025-0119',
    applicantName: 'Birsa Soren',
    scheme: 'NOS',
    category: 'LEGAL_BOND',
    documentType: 'Academic Return & Surety Bond (₹25,00,000)',
    defectCode: 'DEF_NOS_BOND_SURETIES_UNVERIFIED',
    severity: 'CRITICAL',
    disbursementBlocker: true,
    raisedBy: 'Overseas Cell, MoTA',
    raisedAt: '2025-08-04 14:20',
    deadline: '2025-09-20 23:59',
    daysLeft: 8,
    status: 'ACTION_REQUIRED',
    guidelineClause: 'NOS Scheme Rules 2024, Rule 11 (Execution of Bond): "The selected candidate and two permanent Gazetted Officers or Solvency-verified sureties shall execute a registered deed of bond on non-judicial stamp paper of ₹100."',
    defectSummary: 'Non-judicial stamp paper bond uploaded, but Surety-2 salary slip and Gazetted Officer employment verification certificate is missing.',
    actionRequired: 'Upload the Form-16 / Latest Salary Certificate and Employment Verification of Surety 2 (Shri Hemant Soren, Asst. Engineer, PWD Jharkhand) authenticated by his Drawing & Disbursing Officer.',
    hindiInstruction: 'प्रतिभूति बांड में प्रतिभूति-2 (Surety-2) के वेतन प्रमाण पत्र एवं कार्यालय अध्यक्ष का सत्यापन पत्र संलग्न नहीं है। कृपया इसे शीघ्र अपलोड करें।',
    aiVerificationCriteria: [
      'Stamp paper value >= ₹100',
      'Two distinct sureties registered with Aadhaar/PAN',
      'Gazetted Officer employment seal present'
    ],
    submissionAttempts: 1
  },
  {
    deficiencyId: 'DEF-NOS-2025-013',
    caseId: 'MOTA-NOS-2025-0119',
    applicantName: 'Birsa Soren',
    scheme: 'NOS',
    category: 'IMMIGRATION_VISA',
    documentType: 'Tier-4 Student Visa / BRP Stamped Copy',
    defectCode: 'DEF_NOS_VISA_PENDING',
    severity: 'CRITICAL',
    disbursementBlocker: true,
    raisedBy: 'Overseas Cell, MoTA',
    raisedAt: '2025-08-15 10:00',
    deadline: '2025-09-25 23:59',
    daysLeft: 13,
    status: 'ACTION_REQUIRED',
    guidelineClause: 'NOS Scheme Rules 2024, Rule 9.4: "Foreign allowance and university airfare shall be disbursed only upon production of valid student visa issued by the designated embassy/high commission."',
    defectSummary: 'Only UK Visa appointment slip provided. Official visa vignette sticker or digital share code not yet submitted.',
    actionRequired: 'Upon collection of your passport with UK Student Visa vignette from VFS Global, upload a clear scan of the stamped visa page with validity dates covering at least academic term 1.',
    hindiInstruction: 'कृपया वीएफएस ग्लोबल से प्राप्त छात्र वीज़ा (Tier-4 Visa Vignette) पृष्ठ की स्पष्ट स्कैन प्रति अपलोड करें।',
    aiVerificationCriteria: [
      'Visa type is Student / Tier-4',
      'Name matches applicant name',
      'Valid from before semester start date'
    ],
    submissionAttempts: 0
  },
  {
    deficiencyId: 'DEF-NFST-2025-044',
    caseId: 'MOTA-NFST-2025-0312',
    applicantName: 'Lakshmi Baiga',
    scheme: 'NFST',
    category: 'BANK_DBT_MANDATE',
    documentType: 'Bank Passbook & Mandate Confirmation Form',
    defectCode: 'DEF_NPCI_MAPPING_INACTIVE',
    severity: 'CRITICAL',
    disbursementBlocker: true,
    raisedBy: 'AI Payment Readiness Engine',
    raisedAt: '2025-08-28 09:35',
    deadline: '2025-09-15 23:59',
    daysLeft: 3,
    status: 'ACTION_REQUIRED',
    guidelineClause: 'DBT Mission Guidelines, Govt of India: "All Centrally Sponsored DBT fellowships must route through Aadhaar Payment Bridge (APB) with active NPCI seeding."',
    defectSummary: 'NPCI Aadhaar Payment Bridge inquiry returned error code NPCI-ERR-M04: "Account in Dormant / Inactive DBT mandate status". Bank of Baroda account exists but is not mapped for receiving Government subsidies.',
    actionRequired: 'Visit your Bank of Baroda branch with Aadhaar card and passbook. Submit the "Aadhaar Seeding and NPCI DBT Consent Form" to enable APBS. Once activated by bank, upload the signed acknowledgment slip.',
    hindiInstruction: 'आपके बैंक ऑफ बड़ौदा खाते में आधार डीबीटी मैंडेट निष्क्रिय (Inactive) है। कृपया अपनी बैंक शाखा में जाकर "आधार सीडिंग व डीबीटी सहमति पत्र" जमा करें और बैंक की मुहर लगी पावती अपलोड करें।',
    aiVerificationCriteria: [
      'Bank branch acknowledgment slip present',
      'NPCI API real-time ping returns ACTIVE',
      'Name match >= 95%'
    ],
    submissionAttempts: 0
  },
  {
    deficiencyId: 'DEF-PMS-2025-882',
    caseId: 'MOTA-PMS-2025-1044',
    applicantName: 'Arjun Meena',
    scheme: 'PMS_ST',
    category: 'INCOME_ELIGIBILITY',
    documentType: 'Competent Authority Income Certificate',
    defectCode: 'DEF_INCOME_CEILING_BREACH',
    severity: 'CRITICAL',
    disbursementBlocker: true,
    raisedBy: 'Dr. Rajesh Meena (Verifier)',
    raisedAt: '2025-08-16 11:45',
    deadline: '2025-09-10 23:59',
    daysLeft: 0,
    status: 'EXPIRED_WARNING',
    guidelineClause: 'Post-Matric Scholarship Scheme for ST Students Revised Guidelines, Clause 4.1: "Scholarships will be paid to students whose parents/guardians income from all sources does not exceed ₹2,50,000/- per annum."',
    defectSummary: 'Income certificate issued by Tehsildar Sawai Madhopur reflects total parental annual income as ₹2,90,000, which exceeds the mandatory ceiling of ₹2,50,000.',
    actionRequired: 'Provide updated re-assessed income certificate from Tehsildar or Sub-Divisional Officer if previous calculation included exempt agricultural allowances, or clarify parental tax filing status.',
    hindiInstruction: 'तहसीलदार द्वारा जारी आय प्रमाण पत्र में वार्षिक आय ₹2,90,000 दर्शायी गई है, जो योजना सीमा (₹2,50,000) से अधिक है। कृपया सक्षम प्राधिकारी से संशोधित प्रमाणपत्र प्रस्तुत करें।',
    aiVerificationCriteria: [
      'Issued by Tehsildar or SDO',
      'Annual Income <= ₹2,50,000',
      'Valid for FY 2024-25 / 2025-26'
    ],
    submissionAttempts: 2
  },
  {
    deficiencyId: 'DEF-DUAL-2025-009',
    caseId: 'MOTA-NFST-2025-0994',
    applicantName: 'Sukhlal Bhil',
    scheme: 'NFST',
    category: 'DUAL_BENEFIT_PREVENTION',
    documentType: 'State Fellowship Surrender & No Dues Certificate',
    defectCode: 'DEF_CONCURRENT_FELLOWSHIP_DETECTED',
    severity: 'CRITICAL',
    disbursementBlocker: true,
    raisedBy: 'NSP & State Portal Deduplication Radar',
    raisedAt: '2025-07-29 09:10',
    deadline: '2025-09-30 23:59',
    daysLeft: 18,
    status: 'ACTION_REQUIRED',
    guidelineClause: 'NFST Operational Guidelines, Clause 7.2: "A scholar who is in receipt of any other fellowship or financial assistance from Central/State Government shall not be eligible for NFST fellowship unless the earlier fellowship is surrendered."',
    defectSummary: 'Cross-Portal Intelligence Engine detected active monthly stipend of ₹25,000 disbursed by TAD Rajasthan on beneficiary Aadhaar. Dual benefit is prohibited.',
    actionRequired: 'Submit an official surrender letter to TAD Rajasthan, obtain the formal Fellowship Relieving / No-Dues Order with refund of any overlap period, and upload the countersigned order.',
    hindiInstruction: 'क्रॉस-पोर्टल जांच में पाया गया कि आप राजस्थान सरकार की टीएडी अध्येतावृत्ति (₹25,000/माह) भी प्राप्त कर रहे हैं। नियम 7.2 के अनुसार दोहरी छात्रवृत्ति प्रतिबंधित है। कृपया राज्य अध्येतावृत्ति का अभ्यर्पण (Surrender) पत्र व अनापत्ति प्रमाणपत्र अपलोड करें।',
    aiVerificationCriteria: [
      'Surrender order from TAD Rajasthan',
      'Specifies cessation date of state fellowship',
      'Signed by Joint Director TAD'
    ],
    submissionAttempts: 0
  },
  {
    deficiencyId: 'DEF-NFST-2025-771',
    caseId: 'MOTA-NFST-2025-0771',
    applicantName: 'Somnath Gamit',
    scheme: 'NFST',
    category: 'JOINING_REPORT',
    documentType: 'CSIR-NCL Official Joining Report',
    defectCode: 'DEF_INSTITUTE_SEAL_ABSENT',
    severity: 'MODERATE',
    disbursementBlocker: true,
    raisedBy: 'Dr. Rajesh Meena',
    raisedAt: '2025-09-03 11:15',
    deadline: '2025-09-24 23:59',
    daysLeft: 12,
    status: 'ACTION_REQUIRED',
    guidelineClause: 'NFST Guidelines, Clause 6.1: "The fellowship takes effect from the date of joining research, duly attested by the Head of the Institution / Registrar."',
    defectSummary: 'Joining report carries supervisor signature and applicant signature, but institutional seal of the Academic Office CSIR-NCL is absent.',
    actionRequired: 'Get the joining report stamped by CSIR-NCL Student Academic Affairs / Head of Division and re-upload.',
    hindiInstruction: 'ज्वाइनिंग रिपोर्ट पर अनुसंधान मार्गदर्शक के हस्ताक्षर हैं किंतु संस्थान की आधिकारिक मुहर नहीं है। कृपया मुहर लगवाकर पुनः अपलोड करें।',
    aiVerificationCriteria: [
      'Institutional seal detected',
      'Date of joining clearly stated',
      'Designation of guide mentioned'
    ],
    submissionAttempts: 1
  }
];

export const EXTERNAL_ADAPTERS = [
  {
    id: 'digilocker',
    name: 'DigiLocker Ecosystem Adapter',
    acronym: 'DigiLocker',
    status: 'HEALTHY',
    connectedEntities: ['State e-District Portals', 'CBSE / State Boards', 'UIDAI'],
    purpose: 'Verifies authentic cryptographic XML for Caste, Income, and Matriculation marksheets directly from state registries.',
    latencyMs: 142,
    recordsFetchedToday: 1840,
    tamperingPrevented: 43,
    lastSync: 'Live (WebSocket Connected)'
  },
  {
    id: 'pfms',
    name: 'PFMS / DBT Bharat Payment Gateway',
    acronym: 'PFMS DBT',
    status: 'HEALTHY',
    connectedEntities: ['Ministry of Finance (CGA)', 'NPCI', 'Reserve Bank of India'],
    purpose: 'Validates beneficiary party master, bank account IFSC, Aadhaar APBS seeding, and executes electronic sanction orders.',
    latencyMs: 310,
    recordsFetchedToday: 4920,
    batchesStaged: 14,
    lastSync: 'Live (Last Batch Push: 2 hrs ago)'
  },
  {
    id: 'aishe',
    name: 'All India Survey on Higher Education & NIRF',
    acronym: 'AISHE / NIRF',
    status: 'HEALTHY',
    connectedEntities: ['Ministry of Education', 'UGC', 'NIRF Ranking Cell'],
    purpose: 'Validates institute accreditation, AISHE U-code existence, institutional bank account, and premier ranking tier for Top Class schemes.',
    latencyMs: 88,
    recordsFetchedToday: 760,
    unregisteredInstitutesFlagged: 6,
    lastSync: 'Synced (06:00 AM Daily Dump)'
  },
  {
    id: 'nsp_dedup',
    name: 'National Scholarship Portal Deduplication Radar',
    acronym: 'NSP DeDup',
    status: 'HEALTHY',
    connectedEntities: ['NSP (MeitY)', 'UGC Canara Fellowship Portal', '28 State DBT Portals'],
    purpose: 'Performs multi-dimensional fuzzy matching on Aadhaar, Bank Account, and High School Roll No to prevent concurrent fraudulent benefits.',
    latencyMs: 420,
    recordsFetchedToday: 12100,
    dualBenefitsDetected: 18,
    estimatedSavingsLakhs: 74.5,
    lastSync: 'Live (Cross-DB Hash Stream)'
  },
  {
    id: 'immigration',
    name: 'Bureau of Immigration & Overseas Missions Gateway',
    acronym: 'BoI / MEA',
    status: 'HEALTHY',
    connectedEntities: ['Ministry of External Affairs', 'Bureau of Immigration', 'Indian High Commissions'],
    purpose: 'Confirms valid student visa status, departure clearances, and university fee wire receipts for National Overseas Scholarship (NOS).',
    latencyMs: 512,
    recordsFetchedToday: 48,
    expiredVisasDetected: 1,
    lastSync: 'Live (Secure VPN Bridge)'
  }
];

export const PAYMENT_BATCHES = [
  {
    batchId: 'BATCH-MOTA-TOPCLASS-2025-Q1-TR02',
    scheme: 'TOPCLASS',
    batchName: 'Top Class Education 2025-26 Premier Institutes (IITs/IIMs/AIIMS) Tranche-1',
    totalScholars: 142,
    totalAmount: 24850000, // ₹2.485 Crores
    status: 'STAGED_READY_FOR_DSC',
    preparedAt: '2025-09-02 16:30',
    preparedBy: 'AI Payment Engine',
    assignedDDO: 'Shri K. L. Verma, DDO MoTA',
    sanctionOrderNo: 'MoTA/DBT/TC/2025-26/SO-048',
    readyScholars: ['MOTA-TOPCLASS-2025-0891', 'MOTA-TOPCLASS-2025-0418'],
    pfmsBatchRef: 'PFMS-2025-MOTA-009841'
  },
  {
    batchId: 'BATCH-MOTA-NFST-2025-Q1-TR04',
    scheme: 'NFST',
    batchName: 'NFST Q1 (Jul-Sep 2025) Monthly Stipend + Contingency Release Batch-4',
    totalScholars: 280,
    totalAmount: 31080000, // ₹3.108 Crores
    status: 'IN_COMPLIANCE_HOLD',
    preparedAt: '2025-09-01 11:00',
    preparedBy: 'AI Payment Engine',
    assignedDDO: 'Shri K. L. Verma, DDO MoTA',
    sanctionOrderNo: 'MoTA/NFST/2025-26/SO-112',
    blockedReason: '18 scholars have pending Dean continuation certificates; 6 scholars pending Aadhaar NPCI reactivation.',
    pfmsBatchRef: 'PFMS-2025-MOTA-009820'
  },
  {
    batchId: 'BATCH-MOTA-NOS-2025-FALL-01',
    scheme: 'NOS',
    batchName: 'National Overseas Scholarship 2025 Fall Intake Maintenance & Tuition Advance',
    totalScholars: 12,
    totalAmount: 22140000, // ₹2.214 Crores
    status: 'AUDIT_STAGE',
    preparedAt: '2025-08-29 15:40',
    preparedBy: 'Overseas Cell',
    assignedDDO: 'Dr. S. K. Mahapatra, Director (Finance)',
    sanctionOrderNo: 'MoTA/NOS/2025-26/SO-003',
    blockedReason: 'Awaiting MEA clearance on 3 overseas accounts.',
    pfmsBatchRef: 'PFMS-2025-MOTA-009790'
  }
];

export const GRIEVANCES_DATA = [
  {
    ticketId: 'GRV-2025-0812',
    caseId: 'MOTA-NFST-2025-0482',
    applicantName: 'Sunita Maravi',
    subject: 'Delay in Q1 Fellowship Stipend & Clarification on Dean Seal Format',
    category: 'PAYMENT_BLOCKER',
    priority: 'HIGH',
    status: 'OFFICER_REVIEWING',
    createdAt: '2025-09-02 14:30',
    slaDeadline: '2025-09-05 18:00',
    assignedTo: 'Dr. Rajesh Meena (Nodal Verification Officer)',
    description: 'My selection letter was issued on 20th August. I submitted the quarterly continuation form on 1st September, but it shows deficient for missing Dean seal. IISc Dean Office issues a digital digital-signed continuation memo. Can that be accepted instead of physical stamp?',
    latestResponse: 'Under review by Officer. Nodal Officer has requested IISc Academic Registrar to verify the digital signature public key.',
    responses: [
      {
        sender: 'Sunita Maravi',
        role: 'Applicant',
        time: '2025-09-02 14:30',
        message: 'Respected Sir, IISc Bengaluru issues digital continuation certificates signed with e-Sign. Kindly allow digital upload instead of asking for physical physical visit.'
      },
      {
        sender: 'Dr. Rajesh Meena',
        role: 'Verifier',
        time: '2025-09-02 17:15',
        message: 'Dear Sunita, We have updated our AI Document rule engine to accept DigiLocker/e-Sign authenticated continuation certificates from NIRF Top 10 institutes. You may upload the e-Signed PDF directly under deficiency DEF-NFST-2025-091.'
      }
    ]
  },
  {
    ticketId: 'GRV-2025-0749',
    caseId: 'MOTA-NFST-2025-0312',
    applicantName: 'Lakshmi Baiga',
    subject: 'Assistance for Bank of Baroda NPCI Aadhaar Seeding in Rural Branch',
    category: 'BANKING_AER',
    priority: 'CRITICAL',
    status: 'ACTION_TAKEN',
    createdAt: '2025-08-29 10:00',
    slaDeadline: '2025-09-01 18:00',
    assignedTo: 'Lead District Manager (LDM) Mandla & MoTA Nodal Desk',
    description: 'Candidate is from Baiga PVTG tribal block. Rural branch official says they need letter from MoTA to enable APBS DBT on Jan Dhan account.',
    latestResponse: 'MoTA DBT Cell issued an official advisory letter to Bank of Baroda Regional Manager Jabalpur. Special banking correspondent dispatched to candidate residence.',
    responses: [
      {
        sender: 'Lakshmi Baiga (Assisted by Tribal Welfare Officer Mandla)',
        role: 'Applicant',
        time: '2025-08-29 10:00',
        message: 'Bank branch staff in Mandla is refusing to link Aadhaar for PFMS DBT stating account is Jan Dhan.'
      },
      {
        sender: 'Smt. Arundhati Soren',
        role: 'Admin',
        time: '2025-08-30 11:00',
        message: 'Official directive issued to BoB Lead Bank Officer. Account will be mapped on NPCI within 48 hours.'
      }
    ]
  }
];

export const AUDIT_TRAIL = [
  {
    id: 'AUD-88902',
    timestamp: '2025-09-03 11:15:22',
    actor: 'Dr. Rajesh Meena (Verifier L-2)',
    ip: '10.24.110.42 (NIC National Cloud)',
    action: 'RAISE_DEFICIENCY',
    caseId: 'MOTA-NFST-2025-0771',
    ruleTriggered: 'RULE_INST_SEAL_REQUIRED',
    details: 'Raised deficiency DEF-NFST-2025-771 on CSIR-NCL Joining Report for absence of Academic Section Seal.'
  },
  {
    id: 'AUD-88901',
    timestamp: '2025-09-02 16:30:10',
    actor: 'AI Payment Readiness Engine (Automated)',
    ip: '10.24.110.10 (Internal Serverless Engine)',
    action: 'STAGE_BATCH',
    caseId: 'MOTA-TOPCLASS-2025-0891, MOTA-TOPCLASS-2025-0418',
    ruleTriggered: 'RULE_PAYMENT_READY_ALL_GATES_PASS',
    details: 'Cases verified 6/6 gates. Grouped into BATCH-MOTA-TOPCLASS-2025-Q1-TR02 for electronic sanction order generation.'
  },
  {
    id: 'AUD-88900',
    timestamp: '2025-09-02 10:10:45',
    actor: 'Dr. Rajesh Meena (Verifier L-2)',
    ip: '10.24.110.42 (NIC National Cloud)',
    action: 'RAISE_DEFICIENCY',
    caseId: 'MOTA-NFST-2025-0482',
    ruleTriggered: 'RULE_NFST_CLAUSE_8_3',
    details: 'Flagged missing Dean signature on Quarterly continuation certificate.'
  },
  {
    id: 'AUD-88899',
    timestamp: '2025-08-29 08:32:19',
    actor: 'NSP & State Deduplication Radar',
    ip: '10.24.110.88 (Cross-Portal Worker)',
    action: 'FRAUD_FLAG_HOLD',
    caseId: 'MOTA-NFST-2025-0994',
    ruleTriggered: 'RULE_DUAL_BENEFIT_RESTRICTION_7_2',
    details: 'Aadhaar matching detected concurrent active stipend under Rajasthan TAD-ST-2024 scheme.'
  },
  {
    id: 'AUD-88898',
    timestamp: '2025-08-28 09:35:04',
    actor: 'PFMS DBT Adapter (NPCI Webhook)',
    ip: '164.100.128.5 (PFMS Ministry of Finance)',
    action: 'GATE_STATUS_FAILED',
    caseId: 'MOTA-NFST-2025-0312',
    ruleTriggered: 'RULE_NPCI_APB_SEEDING',
    details: 'NPCI returned response M04 (Dormant DBT mandate). Payment Gate 2 set to False.'
  }
];

export const POLICY_CONFIG = {
  currentRules: [
    {
      ruleId: 'POL-01',
      scheme: 'NFST',
      parameter: 'JRF Monthly Stipend Rate',
      currentValue: '₹37,000 / month',
      proposedValue: '₹42,000 / month',
      description: 'Monthly fellowship assistance for first two years of Ph.D. research.'
    },
    {
      ruleId: 'POL-02',
      scheme: 'NFST',
      parameter: 'SRF Monthly Stipend Rate (Post 2-Yr Assessment)',
      currentValue: '₹42,000 / month',
      proposedValue: '₹48,000 / month',
      description: 'Elevated monthly fellowship upon clearing 2-year university assessment committee.'
    },
    {
      ruleId: 'POL-03',
      scheme: 'NOS',
      parameter: 'Family Income Ceiling',
      currentValue: '₹6,00,000 / annum',
      proposedValue: '₹8,00,000 / annum',
      description: 'Maximum parental/guardian income eligible to apply for foreign studies scholarship.'
    },
    {
      ruleId: 'POL-04',
      scheme: 'TOPCLASS',
      parameter: 'Notified Premier Institutes Count',
      currentValue: '258 Institutions (IITs, IIMs, AIIMS, NITs, NLUs)',
      proposedValue: '280 Institutions (Adding newly notified IIITs & Central Universities)',
      description: 'List of institutions where ST students receive 100% full fee waiver.'
    },
    {
      ruleId: 'POL-05',
      scheme: 'PMS_ST',
      parameter: 'Parental Income Ceiling',
      currentValue: '₹2,50,000 / annum',
      proposedValue: '₹3,50,000 / annum',
      description: 'Maximum income threshold for state-administered Post-Matric scholarships.'
    },
    {
      ruleId: 'POL-06',
      scheme: 'ALL_SCHEMES',
      parameter: 'PVTG Horizontal Weightage / Reservation',
      currentValue: 'Dedicated Sub-Quota for 75 Recognized PVTGs',
      proposedValue: 'Auto-exemption from income ceilings + priority fast-track payment queue',
      description: 'Empowerment policy for Particularly Vulnerable Tribal Groups.'
    }
  ],
  analytics: {
    totalApplicationsFY25: 148920,
    totalSelectedScholars: 8420,
    totalPaymentReadyScholars: 5190,
    totalPaymentBlockedScholars: 3230,
    totalDisbursedCr: 412.8,
    averageTurnaroundDays: 24,
    pvtgRepresentationPct: 8.4,
    femaleScholarsPct: 34.2, // Exceeds 30% mandate
    fraudSavingsCr: 14.2,
    statePerformance: [
      { state: 'Madhya Pradesh', tribalPopLakhs: 153.1, selected: 1840, paymentReady: 1210, disbursedCr: 88.4 },
      { state: 'Jharkhand', tribalPopLakhs: 86.4, selected: 1420, paymentReady: 980, disbursedCr: 69.2 },
      { state: 'Odisha', tribalPopLakhs: 95.9, selected: 1290, paymentReady: 870, disbursedCr: 62.8 },
      { state: 'Maharashtra', tribalPopLakhs: 105.1, selected: 1110, paymentReady: 790, disbursedCr: 54.1 },
      { state: 'Gujarat', tribalPopLakhs: 89.2, selected: 940, paymentReady: 620, disbursedCr: 46.5 },
      { state: 'Rajasthan', tribalPopLakhs: 92.4, selected: 860, paymentReady: 510, disbursedCr: 41.3 },
      { state: 'Chhattisgarh', tribalPopLakhs: 78.2, selected: 780, paymentReady: 520, disbursedCr: 38.6 },
      { state: 'North-East States (8 States)', tribalPopLakhs: 124.0, selected: 1180, paymentReady: 690, disbursedCr: 51.9 }
    ]
  }
};
