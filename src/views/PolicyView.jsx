import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sliders,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle2,
  BookOpen,
  Info,
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Layers,
  Plus,
  Filter,
  Check,
  X,
  Calendar,
  Lock,
  Edit3,
  Eye,
  Building,
  UserCheck,
  ArrowRight,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { PolicyConflictModal } from '../components/PolicyConflictModal';

export const PolicyView = () => {
  const { SCHEMES, showToast, currentUser, addAuditEntry } = useApp();

  // Active View Tab inside Policy Engine
  const [activeTab, setActiveTab] = useState('SCHEME_CARDS'); // SCHEME_CARDS, POLICY_VERSION, RULE_BUILDER, POLICY_CONFLICTS, SIMULATOR

  // Scheme Cards state - 5 Comprehensive Schemes with scheme-specific configuration
  const [schemesConfig, setSchemesConfig] = useState([
    {
      id: 'NFST',
      code: 'NFST',
      name: 'National Fellowship for Scheduled Tribe Students (NFST)',
      hindiName: 'अनुसूचित जनजाति छात्रों हेतु राष्ट्रीय अध्येतावृत्ति योजना',
      policyVersion: '2026–27',
      gazetteRef: 'F.No. 11015/02/2026-Schol (MoTA Gazette Notified)',
      status: 'Active',
      effectiveDate: '01-Apr-2026',
      targetBeneficiaries: 'ST scholars admitted to full-time regular M.Phil and Ph.D. degrees in UGC/CSIR recognized universities and premier research institutions.',
      slotsAnnual: '750 National Merit Slots / Year (5-Year Tenure)',
      stipendRates: 'JRF: ₹37,000/mo (Years 1-2) • SRF: ₹42,000/mo (Years 3-5) + HRA + Contingency ₹12,000/yr',
      eligibilityRules: [
        { rule: 'Caste Mandate', detail: 'Applicant must belong to a Scheduled Tribe notified under Article 342 in the respective state.' },
        { rule: 'Academic Prerequisite', detail: 'Minimum 55% marks in Master’s Degree; qualified in UGC-NET / CSIR-NET / GATE.' },
        { rule: 'Income Bar', detail: 'No family income ceiling (pure merit and research aptitude based).' },
        { rule: 'PVTG Horizontal Priority', detail: 'Sub-quota prioritized for scholars from 75 Particularly Vulnerable Tribal Groups.' },
        { rule: 'Age Limit', detail: 'Maximum 36 years for male, 41 years for female/transgender/PwD candidates.' }
      ],
      requiredDocuments: [
        { doc: 'Caste Certificate', note: 'Digitally verified e-District / SDO certificate with Digilocker hash' },
        { doc: 'Ph.D. Registration Letter', note: 'Official enrollment notification issued by University Academic Registrar' },
        { doc: 'Annexure-I Research Plan', note: 'Synopsis endorsed by Guide and Departmental Research Committee' },
        { doc: 'Annexure-IV Continuation Certificate', note: 'Mandatory quarterly report with Guide signature & Dean round seal' },
        { doc: 'Bank Passbook / Mandate Form', note: 'Aadhaar-seeded bank account with active NPCI DBT mapping' }
      ],
      verificationStages: [
        { stage: 1, role: 'University Research Supervisor', action: 'Monthly biometric attendance & academic progress attestation' },
        { stage: 2, role: 'Dean of Academic Affairs / Registrar', action: 'Institutional round-seal endorsement of quarterly Annexure-IV' },
        { stage: 3, role: 'MoTA Fellowship Desk L-1 Verifier', action: 'Scrutiny of UGC-NET roll, registration date, and caste authenticity' },
        { stage: 4, role: 'Senior Nodal Verification Officer L-2', action: 'Statutory concurrence and payment readiness gate clearance' }
      ],
      selectionStage: {
        mode: 'National Merit Quota Selection Panel',
        criteria: 'UGC-NET / CSIR-NET percentile score ranking + 30% female reservation + dedicated PVTG sub-quota allocation.',
        sanctionAuthority: 'National Fellowship Selection Committee chaired by Joint Secretary, MoTA'
      },
      complianceRequirements: [
        { requirement: 'Quarterly Attendance', threshold: '≥ 75% physical attendance endorsed by supervisor' },
        { requirement: 'Two-Year SRF Upgrade', threshold: 'Three-member assessment committee review before elevation to ₹42,000/mo' },
        { requirement: 'Non-Duplication Mandate', threshold: 'Strict prohibition of concurrent stipends under Rule 7.2 (surrender required if drawing state aid)' },
        { requirement: 'Annual Progress Monograph', threshold: 'Publication of at least 1 peer-reviewed research paper per tenure year' }
      ],
      paymentReadinessConditions: [
        { condition: 'PFMS Gate 1 (Sanction)', desc: 'Valid NFST Merit Sanction Order registered on INFLIBNET portal' },
        { condition: 'PFMS Gate 2 (Aadhaar Bridge)', desc: 'NPCI Active DBT mapper ping verification' },
        { condition: 'PFMS Gate 3 (PFMS Master)', desc: 'PFMS Party Beneficiary Code active with ≥90% name match score' },
        { condition: 'PFMS Gate 4 (Continuity)', desc: 'Quarterly Annexure-IV verified with Guide signature & Dean seal' },
        { condition: 'PFMS Gate 6 (Batching)', desc: 'DDO Digital Signature (DSC) batch staging for direct treasury wire' }
      ]
    },
    {
      id: 'NOS',
      code: 'NOS',
      name: 'National Overseas Scholarship for ST Candidates (NOS)',
      hindiName: 'राष्ट्रीय प्रवासी छात्रवृत्ति योजना (अनुसूचित जनजाति)',
      policyVersion: '2026–27',
      gazetteRef: 'F.No. 11018/01/2026-Overseas (MoTA Overseas Directorate)',
      status: 'Active',
      effectiveDate: '01-Apr-2026',
      targetBeneficiaries: 'Meritorious ST students selected for higher studies abroad (Master’s, Ph.D.) in institutions ranked within the QS World Top 500.',
      slotsAnnual: '20 National Slots / Year (Demand-Driven Merit Panel)',
      stipendRates: 'Tuition Fee 100% actuals + Annual Maintenance £9,900 (UK) / $15,400 (USA & Others) + Airfare + Visa',
      eligibilityRules: [
        { rule: 'Caste Mandate', detail: 'Applicant must belong to a recognized Scheduled Tribe community in India.' },
        { rule: 'Family Income Ceiling', detail: 'Total family income from all sources must NOT exceed ₹6,00,000/- per annum.' },
        { rule: 'Academic Excellence', detail: 'Minimum 60% marks or equivalent CGPA in qualifying bachelor’s/master’s degree.' },
        { rule: 'Age Threshold', detail: 'Below 35 years as on first day of the application financial year.' },
        { rule: 'Eligible Courses', detail: 'Pure & Applied Sciences, Engineering, Management, Agriculture, Medicine, Social Sciences.' }
      ],
      requiredDocuments: [
        { doc: 'Unconditional Admission Offer', note: 'Letter from university ranked within QS World Top 500 with confirmed seat' },
        { doc: 'Income Certificate', note: 'Competent revenue authority certificate proving family income ≤ ₹6,00,000' },
        { doc: 'Academic Surety & Return Bond', note: 'Registered deed on ₹100 stamp paper backed by 2 Gazetted Indian sureties' },
        { doc: 'Tier-4 / Student Visa Vignette', note: 'VFS Global stamped biometric visa copy covering at least term 1' },
        { doc: 'Airfare Quotation & Forex Account', note: 'Authorized foreign exchange account / Indian Embassy offshore bank mandate' }
      ],
      verificationStages: [
        { stage: 1, role: 'MoTA Overseas Cell Desk', action: 'CAS offer verification via university international admissions portal' },
        { stage: 2, role: 'Indian Mission Abroad (Embassy/High Commission)', action: 'Overseas campus enrollment and fee invoice endorsement' },
        { stage: 3, role: 'Standing Overseas Selection Board', action: 'Subject expert interview & QS ranking eligibility review' },
        { stage: 4, role: 'Financial Advisor & Joint Secretary', action: 'Foreign exchange sanction order and DDO wire authorization' }
      ],
      selectionStage: {
        mode: 'Expert Overseas Selection Committee Panel',
        criteria: 'QS World Rank of admitted university (weightage 50%) + academic score in qualifying degree (weightage 50%).',
        sanctionAuthority: 'Ministerial Overseas Scholarship Board chaired by Secretary (Tribal Affairs)'
      },
      complianceRequirements: [
        { requirement: '₹25 Lakhs Surety Bond', threshold: 'Execution of legal bond guaranteeing return to India for minimum 5 years post-completion' },
        { requirement: 'Two Permanent Sureties', threshold: 'Sureties must be permanent Gazetted Officers or furnish landed solvency certificates' },
        { requirement: 'Semi-Annual Academic Progress', threshold: 'Foreign supervisor semester evaluation report submitted to Indian Mission' },
        { requirement: 'Employment Restriction', threshold: 'No full-time foreign employment during tenure without prior MoTA permission' }
      ],
      paymentReadinessConditions: [
        { condition: 'PFMS Gate 1 (Sanction)', desc: 'Cabinet approved Overseas Fellowship Sanction Order issued' },
        { condition: 'PFMS Gate 2 (Forex Bridge)', desc: 'Foreign inward remittance bridge verified via State Bank of India Foreign Desk' },
        { condition: 'PFMS Gate 4 (Visa Stamping)', desc: 'Tier-4 student visa page verified with valid biometric vignette' },
        { condition: 'PFMS Gate 5 (Bond Verification)', desc: 'Physical verification of registered deed of bond with 2 Gazetted sureties' },
        { condition: 'PFMS Gate 6 (Wire Transfer)', desc: 'Direct electronic wire to university tuition account and scholar maintenance fund' }
      ]
    },
    {
      id: 'TOPCLASS',
      code: 'TOPCLASS',
      name: 'Top Class Education Scheme for ST Students',
      hindiName: 'अनुसूचित जनजाति छात्रों के लिए शीर्ष श्रेणी शिक्षा योजना',
      policyVersion: '2026–27',
      gazetteRef: 'F.No. 11020/05/2026-TopClass (MoTA Premier Education Cell)',
      status: 'Active',
      effectiveDate: '01-Apr-2026',
      targetBeneficiaries: 'ST students securing admission into 258 notified premier institutions (IITs, NITs, IIMs, AIIMS, NLUs, IIITs).',
      slotsAnnual: '1,000 Fresh Scholarships / Year (Institute Quota Capped)',
      stipendRates: 'Full Tuition Fee + Living Allowance ₹3,000/mo + Books ₹5,000/yr + One-time Laptop Grant ₹45,000',
      eligibilityRules: [
        { rule: 'Caste Mandate', detail: 'Must be a member of a notified Scheduled Tribe with valid state certificate.' },
        { rule: 'Notified Institute Admission', detail: 'Must have secured confirmed admission in one of the 258 MoTA-notified premier institutions.' },
        { rule: 'Parental Income Bar', detail: 'Family annual income from all sources must NOT exceed ₹6,00,000/- per annum.' },
        { rule: 'Single Scheme Restriction', detail: 'Scholar cannot receive tuition assistance from institute or any other sponsor concurrently.' },
        { rule: 'Renewal Continuation', detail: 'Must be promoted to next academic year without semester backlog.' }
      ],
      requiredDocuments: [
        { doc: 'Allotment Letter / Entrance Rank', note: 'JEE Advanced / NEET / CLAT / CAT category allotment letter' },
        { doc: 'Institute Fee Breakdown Invoice', note: 'Itemized breakdown certified by Dean of Student Affairs or Finance Officer' },
        { doc: 'Income Certificate', note: 'Issued by Executive Magistrate / Tehsildar valid for the academic year' },
        { doc: 'Computer Procurement Bill', note: 'Original GST tax invoice for laptop/hardware grant of ₹45,000' },
        { doc: 'Hosteller Proof', note: 'Hostel warden allotment slip for claiming living allowance' }
      ],
      verificationStages: [
        { stage: 1, role: 'Institute Nodal Officer (AISHE Desk)', action: 'E-authentication of roll number, entrance scorecard, and admission fee' },
        { stage: 2, role: 'Dean of Student Affairs', action: 'Consolidated institutional fee bill attestation and hostel validation' },
        { stage: 3, role: 'MoTA Premier Scheme Desk Officer', action: 'Reconciliation of invoice heads against approved statutory fee caps' },
        { stage: 4, role: 'Drawing and Disbursing Officer (DDO)', action: 'Direct DBT release of living allowance & laptop grant to student bank account' }
      ],
      selectionStage: {
        mode: 'Institute-Wise Quota Sanction',
        criteria: 'Direct approval for all ST candidates admitted within institutional slot limits; merit rank used if applicants exceed quota.',
        sanctionAuthority: 'MoTA Top Class Screening Directorate'
      },
      complianceRequirements: [
        { requirement: 'Annual Academic Clearance', threshold: 'Passing marks in all semester examinations with continuous hosteller enrollment' },
        { requirement: 'Institutional Fee Reconciliation', threshold: 'Institute must submit utilization certificate (UC) before renewal grant release' },
        { requirement: 'Hardware Physical Audit', threshold: 'Asset serial number declaration for laptop purchased under ₹45,000 grant' }
      ],
      paymentReadinessConditions: [
        { condition: 'PFMS Gate 1 (Sanction)', desc: 'Top Class Sanction Letter generated and communicated to AISHE Portal' },
        { condition: 'PFMS Gate 2 (Aadhaar Seeding)', desc: 'Beneficiary bank account validated on NPCI mapper' },
        { condition: 'PFMS Gate 3 (PFMS Beneficiary)', desc: 'Valid PFMS vendor/party code generated with matching IFSC' },
        { condition: 'PFMS Gate 5 (Fee Reconciliation)', desc: 'Tuition + Living + Laptop bills vetted against statutory ceilings' },
        { condition: 'PFMS Gate 6 (Batch Release)', desc: 'Staged into MoTA Top Class DBT Batch and digitally signed via DSC' }
      ]
    },
    {
      id: 'PRE_MATRIC',
      code: 'PRE_MATRIC',
      name: 'Pre-Matric Scholarship for ST Students (Classes 9 & 10)',
      hindiName: 'अनुसूचित जनजाति पूर्व-मैट्रिक छात्रवृत्ति (कक्षा 9 व 10)',
      policyVersion: '2026–27',
      gazetteRef: 'F.No. 11025/08/2026-PreMatric (Centrally Sponsored Scheme)',
      status: 'Active',
      effectiveDate: '01-Apr-2026',
      targetBeneficiaries: 'ST students studying in classes 9 and 10 in government, local body, or government-aided recognized schools.',
      slotsAnnual: 'Demand-Driven Universal Entitlement (No Slot Cap)',
      stipendRates: 'Day Scholars: ₹3,500/year • Hostellers: ₹7,000/year + Book grant ₹1,000/year',
      eligibilityRules: [
        { rule: 'Caste Mandate', detail: 'Student must belong to a recognized Scheduled Tribe of the state of domicile.' },
        { rule: 'Family Income Ceiling', detail: 'Parental/guardian annual income must NOT exceed ₹2,50,000/- per annum.' },
        { rule: 'Enrollment Class', detail: 'Must be enrolled in Class 9 or 10 on a full-time regular basis.' },
        { rule: 'Attendance Minimum', detail: 'Minimum 70% physical school attendance required in the preceding quarter.' },
        { rule: 'School Recognition', detail: 'School must possess valid UDISE+ code and recognition from State Education Board.' }
      ],
      requiredDocuments: [
        { doc: 'ST Caste Certificate', note: 'Issued by competent authority or self-declaration for PVTG families' },
        { doc: 'Parental Income Certificate', note: 'Issued by Tehsildar or revenue circle officer (valid for current FY)' },
        { doc: 'UDISE+ Enrollment Bonafide', note: 'Headmaster attestation certifying admission in Class 9 or 10' },
        { doc: 'Bank Account Passbook', note: 'Joint bank account with parent or minor savings account linked to Aadhaar' },
        { doc: 'Previous Year Marksheet', note: 'Class 8 / Class 9 annual progress report card' }
      ],
      verificationStages: [
        { stage: 1, role: 'School Headmaster / Principal', action: 'UDISE+ enrollment check, attendance verification, and online forwarding' },
        { stage: 2, role: 'Block Education Officer (BEO)', action: 'Block-level compilation and basic deduplication check' },
        { stage: 3, role: 'District Tribal Welfare Officer (DTWO)', action: 'Income certificate scrutiny and district sanction consolidation' },
        { stage: 4, role: 'State Tribal Welfare Directorate', action: 'PFMS DBT payment batch compilation and central share claim' }
      ],
      selectionStage: {
        mode: 'Universal Demand-Driven Coverage',
        criteria: 'Every eligible ST student fulfilling income and enrollment conditions is entitled to receive scholarship.',
        sanctionAuthority: 'District Level Sanctioning Authority (Collector / DTWO)'
      },
      complianceRequirements: [
        { requirement: 'Quarterly Attendance', threshold: '≥ 70% attendance certified by school headmaster on UDISE+ portal' },
        { requirement: 'Drop-out Prevention Tracking', threshold: 'Inter-school transfer certificates mapped via APAAR ID' },
        { requirement: 'Non-Duplication Check', threshold: 'Cross-check against State Social Welfare minority/OBC databases' }
      ],
      paymentReadinessConditions: [
        { condition: 'PFMS Gate 1 (Sanction)', desc: 'District Consolidated Sanction Register generated' },
        { condition: 'PFMS Gate 2 (Aadhaar Seeding)', desc: 'Student or Parent/Guardian account active on NPCI bridge' },
        { condition: 'PFMS Gate 3 (PFMS Party Code)', desc: 'PFMS bulk beneficiary registration without bank reject codes' },
        { condition: 'PFMS Gate 4 (Attendance Attestation)', desc: 'Headmaster quarterly attendance confirmation uploaded' },
        { condition: 'PFMS Gate 6 (Treasury Transfer)', desc: 'State Direct DBT release with 75:25 Center-State fund settlement' }
      ]
    },
    {
      id: 'PMS_ST',
      code: 'PMS_ST',
      name: 'Post-Matric Scholarship for ST Students (PMS-ST)',
      hindiName: 'अनुसूचित जनजाति उत्तर-मैट्रिक छात्रवृत्ति योजना',
      policyVersion: '2026–27',
      gazetteRef: 'F.No. 11011/04/2026-PMS (Centrally Sponsored Umbrella Scheme)',
      status: 'Active',
      effectiveDate: '01-Apr-2026',
      targetBeneficiaries: 'ST students pursuing recognized post-secondary courses (Classes 11, 12, ITI, Diploma, Undergraduate, and Postgraduate degrees).',
      slotsAnnual: 'Demand-Driven Open Entitlement (~2.84 Million Scholars / Year)',
      stipendRates: 'Compulsory non-refundable fees + Monthly maintenance allowance from ₹2,300 to ₹12,000/year (Group 1 to Group 4 courses)',
      eligibilityRules: [
        { rule: 'Caste Mandate', detail: 'Must belong to Scheduled Tribe notified under Article 342 for the state of domicile.' },
        { rule: 'Parental Income Cap', detail: 'Total parental income from all sources must NOT exceed ₹2,50,000/- per annum.' },
        { rule: 'Post-Secondary Course', detail: 'Studying in recognized college/institute affiliated with state/central university or AICTE/UGC.' },
        { rule: 'Single Stage Assistance', detail: 'Assistance available for one stage of education (e.g. one B.A., one M.A.); not for repeated stages.' },
        { rule: 'Dual Stipend Prohibition', detail: 'Cannot draw concurrent fellowship or stipend from state or central government.' }
      ],
      requiredDocuments: [
        { doc: 'ST Caste Certificate', note: 'Digital certificate issued by SDO / Tehsildar with QR code verification' },
        { doc: 'Parental Income Certificate', note: 'Issued by Executive Magistrate / Tehsildar (Current financial year)' },
        { doc: 'Fee Receipt / Bonafide Certificate', note: 'Institution nodal officer attested receipt of non-refundable fees' },
        { doc: 'Previous Qualifying Marksheet', note: 'Class 10 / 12 / Degree pass certificate' },
        { doc: 'Aadhaar-Seeded Bank Passbook', note: 'NPCI-mapped personal bank account in beneficiary’s name' }
      ],
      verificationStages: [
        { stage: 1, role: 'College / Institute Nodal Officer', action: 'Verification of physical enrollment, fee structure, and category' },
        { stage: 2, role: 'District Verification Officer (DTWO)', action: 'Income ceiling scrutiny, caste cross-check, and district quota endorsement' },
        { stage: 3, role: 'State Scholarship Sanction Directorate', action: 'Deduplication across state portals and PFMS staging' },
        { stage: 4, role: 'Central MoTA DBT Division', action: 'Direct DBT release of central 75% share into student bank accounts' }
      ],
      selectionStage: {
        mode: 'Universal Demand-Driven Open Sanction',
        criteria: 'All eligible applicants passing income and course verification receive the sanctioned scholarship.',
        sanctionAuthority: 'State Tribal Welfare Department & Central MoTA DBT Mission'
      },
      complianceRequirements: [
        { requirement: 'Yearly Promotion', threshold: 'Must clear university exams without dropping out; repeating the same year is unassisted' },
        { requirement: 'Mandatory NPCI Seeding', threshold: 'Account must remain actively seeded on NPCI mapper to prevent disbursement failure' },
        { requirement: 'Cross-Portal Deduplication', threshold: 'Automated Aadhaar query to NSP and state DBT gateways to prevent concurrent claims' }
      ],
      paymentReadinessConditions: [
        { condition: 'PFMS Gate 1 (Sanction)', desc: 'State-Level Sanction Order generated and uploaded to PFMS' },
        { condition: 'PFMS Gate 2 (NPCI Mapping)', desc: 'NPCI Aadhaar Payment Bridge active status confirmed' },
        { condition: 'PFMS Gate 3 (PFMS Party Code)', desc: 'PFMS beneficiary party code created and mapped' },
        { condition: 'PFMS Gate 5 (Fee Cap Audit)', desc: 'Tuition and maintenance calculated according to course group slabs' },
        { condition: 'PFMS Gate 6 (DBT Release)', desc: 'Central + State fund settlement released via RBI e-Kuber gateway' }
      ]
    }
  ]);

  // Selected Scheme for detailed inspection or Version Panel
  const [selectedSchemeId, setSelectedSchemeId] = useState('NFST');

  // Policy Versions State
  const [policyVersions, setPolicyVersions] = useState({
    NFST: [
      { version: '2026–27', status: 'Active', gazetteNo: 'MoTA/NFST/2026-02', approvalDate: '15-Jan-2026', author: 'Joint Secretary (Fellowships)', remarks: 'Current active statutory policy.' },
      { version: '2025–26', status: 'Archived', gazetteNo: 'MoTA/NFST/2025-01', approvalDate: '10-Feb-2025', author: 'Standing Committee', remarks: 'Previous financial year rules.' },
      { version: '2027–28', status: 'Draft (Cabinet Review)', gazetteNo: 'DRAFT-CABINET-2027-NFST', approvalDate: 'Pending Cabinet Note', author: 'Policy Cell', remarks: 'Proposing JRF hike to ₹42k.' }
    ],
    NOS: [
      { version: '2026–27', status: 'Active', gazetteNo: 'MoTA/NOS/2026-01', approvalDate: '20-Jan-2026', author: 'Overseas Cell', remarks: 'Current active foreign scholarship rules.' },
      { version: '2025–26', status: 'Archived', gazetteNo: 'MoTA/NOS/2025-04', approvalDate: '12-Mar-2025', author: 'Overseas Cell', remarks: 'Archived.' }
    ],
    TOPCLASS: [
      { version: '2026–27', status: 'Active', gazetteNo: 'MoTA/TOPCLASS/2026-03', approvalDate: '22-Jan-2026', author: 'Premier Cell', remarks: 'Includes 258 notified institutes.' }
    ],
    PRE_MATRIC: [
      { version: '2026–27', status: 'Active', gazetteNo: 'MoTA/PRE/2026-01', approvalDate: '05-Feb-2026', author: 'Centrally Sponsored Desk', remarks: 'Demand-driven open scheme.' }
    ],
    PMS_ST: [
      { version: '2026–27', status: 'Active', gazetteNo: 'MoTA/PMS/2026-04', approvalDate: '01-Feb-2026', author: 'Umbrella Directorate', remarks: 'Current revised post-matric guidelines.' }
    ]
  });

  const [activeVersionByScheme, setActiveVersionByScheme] = useState({
    NFST: '2026–27',
    NOS: '2026–27',
    TOPCLASS: '2026–27',
    PRE_MATRIC: '2026–27',
    PMS_ST: '2026–27'
  });

  // Rule Builder UI State
  const [configuredRules, setConfiguredRules] = useState([
    {
      id: 'RULE-01',
      name: 'PMS-ST Mandatory Parental Income Cap',
      field: 'Family Annual Income',
      operator: '≤',
      threshold: '₹2,50,000 / year',
      scheme: 'PMS_ST',
      effectiveDate: '01-Apr-2026',
      policyVersion: '2026–27',
      category: 'Eligibility',
      active: true,
      description: 'Parental gross income from all sources must not exceed statutory ceiling.'
    },
    {
      id: 'RULE-02',
      name: 'NOS Global University Ranking Mandate',
      field: 'QS / Times World Rank',
      operator: '≤',
      threshold: '500',
      scheme: 'NOS',
      effectiveDate: '01-Apr-2026',
      policyVersion: '2026–27',
      category: 'Eligibility',
      active: true,
      description: 'Admission must be in an overseas institution ranked within the Top 500 globally.'
    },
    {
      id: 'RULE-03',
      name: 'NFST Quarterly Continuity Attendance',
      field: 'Quarterly Physical Attendance',
      operator: '≥',
      threshold: '75%',
      scheme: 'NFST',
      effectiveDate: '01-Apr-2026',
      policyVersion: '2026–27',
      category: 'Compliance',
      active: true,
      description: 'Ph.D. research scholar quarterly attendance certified by guide.'
    },
    {
      id: 'RULE-04',
      name: 'Top Class Parental Income Cap',
      field: 'Family Annual Income',
      operator: '≤',
      threshold: '₹6,00,000 / year',
      scheme: 'TOPCLASS',
      effectiveDate: '01-Apr-2026',
      policyVersion: '2026–27',
      category: 'Eligibility',
      active: true,
      description: 'Maximum parental income ceiling to receive 100% full fee waiver in IITs/IIMs.'
    },
    {
      id: 'RULE-05',
      name: 'NOS Academic & Return Bond Sureties',
      field: 'Gazetted Officer Sureties Count',
      operator: '≥',
      threshold: '2',
      scheme: 'NOS',
      effectiveDate: '01-Apr-2026',
      policyVersion: '2026–27',
      category: 'Compliance',
      active: true,
      description: 'Execution of legal return deed backed by two validated Gazetted Officers.'
    },
    {
      id: 'RULE-06',
      name: 'Pre-Matric School Recognition Mandate',
      field: 'UDISE+ Code Verification',
      operator: '=',
      threshold: 'VALID_GOV_RECOGNIZED',
      scheme: 'PRE_MATRIC',
      effectiveDate: '01-Apr-2026',
      policyVersion: '2026–27',
      category: 'Verification',
      active: true,
      description: 'Secondary school must possess an active, authenticated UDISE+ establishment code.'
    },
    {
      id: 'RULE-07',
      name: 'Article 342 Tribal Notification Verification',
      field: 'Presidential Order ST List',
      operator: 'IN',
      threshold: 'CONSTITUTION_ST_ORDER_1950',
      scheme: 'ALL_SCHEMES',
      effectiveDate: '01-Apr-2026',
      policyVersion: '2026–27',
      category: 'Eligibility',
      active: true,
      description: 'Community must appear in the Presidential Scheduled Tribe list for the state of domicile.'
    }
  ]);

  // New Rule Form state
  const [newRuleForm, setNewRuleForm] = useState({
    name: 'NOS Minimum Graduation Aggregate',
    field: 'Bachelor Degree Marks',
    operator: '≥',
    threshold: '60%',
    scheme: 'NOS',
    effectiveDate: '2026-04-01',
    policyVersion: '2026–27',
    category: 'Eligibility'
  });

  // Policy Conflicts / Review Required Cases State
  const [conflictCases, setConflictCases] = useState([
    {
      id: 'CONF-01',
      caseId: 'MOTA-PMS-2025-1044',
      applicantName: 'Arjun Meena',
      tribe: 'Meena',
      state: 'Rajasthan',
      scheme: 'PMS_ST',
      policyVersion: '2026–27',
      conflictType: 'Income Definition / Tax-Exempt Agricultural Deduction',
      ruleName: 'PMS-ST Mandatory Parental Income Cap (Rule 4.1)',
      statutoryClause: 'PMS-ST Clause 4.1 specifies: "Total parental/guardian income from all sources must not exceed ₹2,50,000/- per annum."',
      threshold: 'Parental Income ≤ ₹2,50,000',
      observedData: 'Income Certificate indicates Gross Family Income = ₹2,90,000; Applicant attached Revenue Affidavit claiming ₹50,000 is tax-exempt agricultural income under Section 10(1).',
      ambiguityDescription: 'Statutory policy guidelines do not define whether "Gross Income from all sources" includes or excludes non-taxable agricultural income. Applying gross calculation flags the candidate; applying net agricultural-exempt income yields ₹2,40,000 (Eligible).',
      aiFlagReason: 'Ambiguity in statutory definition of taxable vs non-taxable agricultural receipts. Deterministic evaluation impossible.',
      aiConfidence: 51,
      status: 'REVIEW_REQUIRED',
      adjudicated: false
    },
    {
      id: 'CONF-02',
      caseId: 'MOTA-NOS-2025-0812',
      applicantName: 'Kiran Tirkey',
      tribe: 'Oraon',
      state: 'Odisha',
      scheme: 'NOS',
      policyVersion: '2026–27',
      conflictType: 'Foreign University Federation Ranking Accreditation',
      ruleName: 'NOS Global University Ranking Mandate (Rule 3.2)',
      statutoryClause: 'NOS Rule 3.2 specifies: "The foreign institution must be ranked within the Top 500 in the latest QS World University Rankings."',
      threshold: 'QS World Rank ≤ 500',
      observedData: 'Admitted to PSL University (Paris Sciences & Lettres) / Sorbonne Collège. Program ranked #32 worldwide in Shanghai ARWU, but parent institution uses collegiate consortium listing.',
      ambiguityDescription: 'Collegiate federation ranking in ARWU is Top 50, but QS ranks individual constituent colleges separately where some colleges lack distinct QS standalone numbers.',
      aiFlagReason: 'Ranking index equivalency gap between Shanghai ARWU Top 50 vs standalone QS numbering.',
      aiConfidence: 46,
      status: 'REVIEW_REQUIRED',
      adjudicated: false
    },
    {
      id: 'CONF-03',
      caseId: 'MOTA-NFST-2025-0994',
      applicantName: 'Sukhlal Bhil',
      tribe: 'Bhil',
      state: 'Rajasthan',
      scheme: 'NFST',
      policyVersion: '2026–27',
      conflictType: 'Concurrent Fellowship Surrender in Progress',
      ruleName: 'NFST Anti-Duplication Mandate (Rule 7.2)',
      statutoryClause: 'NFST Rule 7.2 prohibits concurrent receipt of financial assistance from state/central fellowship programs.',
      threshold: 'Concurrent Fellowship = None / Zero',
      observedData: 'Candidate has an active stipend under Rajasthan TAD-ST-2024, but submitted an unstamped application seeking surrender of state stipend to accept central NFST.',
      ambiguityDescription: 'The surrender process has been formally initiated at the state treasury, but final Treasury No-Dues Certificate has not yet been countersigned.',
      aiFlagReason: 'Active state DBT ledger entry co-exists with initiated surrender letter. Cannot automate clearance or rejection.',
      aiConfidence: 54,
      status: 'REVIEW_REQUIRED',
      adjudicated: false
    },
    {
      id: 'CONF-04',
      caseId: 'MOTA-PRE-2025-4491',
      applicantName: 'Sunil Kol',
      tribe: 'Kol',
      state: 'Madhya Pradesh / Uttar Pradesh',
      scheme: 'PRE_MATRIC',
      policyVersion: '2026–27',
      conflictType: 'Inter-State Article 342 Tribal List Jurisdictional Variation',
      ruleName: 'Article 342 Domicile Tribal Categorization',
      statutoryClause: 'The candidate must belong to a Scheduled Tribe notified under Article 342 for the state of study/domicile.',
      threshold: 'Valid ST Status in Domicile State',
      observedData: 'Kol community is notified as Scheduled Tribe (ST) in Madhya Pradesh, but candidate attends border residential school in Sonbhadra (UP) where Kol is listed under SC schedule.',
      ambiguityDescription: 'Inter-state migration and constitutional border schedule disparity creates a conflict between state of family origin (ST) and school location (SC).',
      aiFlagReason: 'Border jurisdictional conflict under Article 342 Presidential Order. Central policy concurrence required.',
      aiConfidence: 42,
      status: 'REVIEW_REQUIRED',
      adjudicated: false
    }
  ]);

  // Selected conflict for modal
  const [selectedConflictCase, setSelectedConflictCase] = useState(null);

  // Interactive What-If Simulator states (Preserved & Enhanced)
  const [jrfStipend, setJrfStipend] = useState(37000);
  const [nosIncomeLimit, setNosIncomeLimit] = useState(600000);
  const [topClassCount, setTopClassCount] = useState(258);
  const [pmsIncomeLimit, setPmsIncomeLimit] = useState(250000);

  // Computed Impact
  const stipendDeltaCr = (((jrfStipend - 37000) * 12 * 2840) / 10000000).toFixed(2);
  const additionalEligibleScholars = Math.round(
    ((nosIncomeLimit - 600000) / 100000) * 18 +
    ((topClassCount - 258) * 45) +
    ((pmsIncomeLimit - 250000) / 50000) * 14200
  );

  // Toggle scheme active/inactive
  const handleToggleSchemeStatus = (schemeId) => {
    setSchemesConfig(prev => prev.map(s => {
      if (s.id === schemeId) {
        const nextStatus = s.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`Scheme ${s.code} status changed to ${nextStatus}.`, 'info');
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  // Add rule in Rule Builder
  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRuleForm.name.trim() || !newRuleForm.threshold.trim()) {
      showToast('Please fill all mandatory rule attributes.', 'error');
      return;
    }

    const newRule = {
      id: `RULE-${Math.floor(10 + Math.random() * 90)}`,
      name: newRuleForm.name,
      field: newRuleForm.field,
      operator: newRuleForm.operator,
      threshold: newRuleForm.threshold,
      scheme: newRuleForm.scheme,
      effectiveDate: newRuleForm.effectiveDate,
      policyVersion: newRuleForm.policyVersion,
      category: newRuleForm.category,
      active: true,
      description: `Rule configured for ${newRuleForm.scheme} under Policy Version ${newRuleForm.policyVersion}.`
    };

    setConfiguredRules(prev => [newRule, ...prev]);
    showToast(`Rule "${newRule.name}" added to statutory policy configuration!`, 'success');

    if (addAuditEntry) {
      addAuditEntry({
        action: 'POLICY_RULE_CREATED',
        details: `Configured new statutory rule ${newRule.id}: ${newRule.name} (${newRule.field} ${newRule.operator} ${newRule.threshold}) for ${newRule.scheme}`
      });
    }

    setNewRuleForm({
      name: '',
      field: 'Family Annual Income',
      operator: '≤',
      threshold: '',
      scheme: 'PMS_ST',
      effectiveDate: '2026-04-01',
      policyVersion: '2026–27',
      category: 'Eligibility'
    });
  };

  // Toggle rule active status
  const handleToggleRuleActive = (ruleId) => {
    setConfiguredRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        const next = !r.active;
        showToast(`Rule ${r.id} ${next ? 'Activated' : 'Suspended'}.`, 'info');
        return { ...r, active: next };
      }
      return r;
    }));
  };

  // Resolve policy conflict callback
  const handleResolveConflict = (conflictId, decision, justification) => {
    setConflictCases(prev => prev.map(c => {
      if (c.id === conflictId) {
        return {
          ...c,
          status: 'RESOLVED_BY_HUMAN',
          adjudicated: true,
          resolutionDecision: decision,
          resolutionNotes: justification,
          resolvedBy: currentUser.name,
          resolvedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    if (addAuditEntry) {
      addAuditEntry({
        action: `POLICY_CONFLICT_ADJUDICATION: ${decision}`,
        details: `Officer ${currentUser.name} adjudicated conflict ${conflictId} (${decision}). Justification: ${justification}`
      });
    }
  };

  const activeSchemeData = schemesConfig.find(s => s.id === selectedSchemeId) || schemesConfig[0];
  const unresolvedConflictsCount = conflictCases.filter(c => !c.adjudicated).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Governance Principles */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Scheme & Policy Management Module
              </span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                Gazette Policy Version: 2026–27 Active
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Statutory Scheme Configuration & Decision Support Engine
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Configure scheme-specific eligibility, required documents, verification hierarchies, selection criteria, 
              and payment-readiness conditions. <strong>Different schemes operate under distinct statutory rules</strong>; 
              the policy engine provides decision support, while all final exceptions and government determinations remain human-controlled.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Configured Schemes</span>
              <span className="text-lg font-black text-slate-900">{schemesConfig.length}</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-700 block">Active Rules</span>
              <span className="text-lg font-black text-blue-800">
                {configuredRules.filter(r => r.active).length}
              </span>
            </div>
            <div className={`px-3.5 py-2 rounded-xl border text-center ${
              unresolvedConflictsCount > 0 ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <span className={`text-[10px] uppercase font-bold block ${unresolvedConflictsCount > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                Policy Conflicts
              </span>
              <span className={`text-lg font-black ${unresolvedConflictsCount > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                {unresolvedConflictsCount}
              </span>
            </div>
          </div>
        </div>

        {/* Mandatory Governance Alert */}
        <div className="pt-3 border-t border-slate-100">
          <div className="bg-amber-500/10 border border-amber-300 rounded-xl p-3 flex items-start sm:items-center space-x-3 text-xs text-amber-950">
            <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5 sm:mt-0" />
            <div className="leading-relaxed">
              <strong>Statutory Decision Support Mandate:</strong> The policy engine evaluates submissions against configured scheme rules to provide assistive insights. 
              <strong> The AI does not make binding rejections or discretionary waivers.</strong> When policy ambiguities arise, cases are routed to the <em>Policy Conflict / Review Required</em> desk for official human determination.
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex flex-wrap gap-2 text-xs font-bold">
        {[
          { id: 'SCHEME_CARDS', label: '1. Scheme Cards & Workflows (5 Schemes)', icon: Layers },
          { id: 'POLICY_VERSION', label: '2. Policy Version Panel', icon: BookOpen },
          { id: 'RULE_BUILDER', label: '3. Rule Builder UI', icon: Scale },
          { 
            id: 'POLICY_CONFLICTS', 
            label: `4. Policy Conflicts / Review Required (${unresolvedConflictsCount})`, 
            icon: AlertTriangle,
            badge: unresolvedConflictsCount > 0
          },
          { id: 'SIMULATOR', label: '5. Macro Outlay Simulator', icon: Sliders }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 5 SCHEME CARDS & WORKFLOWS */}
      {activeTab === 'SCHEME_CARDS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Scheme-Specific Statutory Frameworks & Multi-Tier Workflows
              </h2>
              <p className="text-xs text-slate-500">
                Tailored configuration for each of the 5 supported Ministry of Tribal Affairs schemes.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing 5 Configured Schemes
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {schemesConfig.map((sc) => (
              <div
                key={sc.id}
                className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden ${
                  sc.status === 'Active' ? 'border-slate-200 hover:border-slate-300' : 'border-slate-200 opacity-75'
                }`}
              >
                {/* Scheme Header */}
                <div className="p-5 bg-slate-50/70 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-900 text-amber-300">
                        {sc.code}
                      </span>
                      <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                        Policy Version: {sc.policyVersion}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {sc.gazetteRef}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">
                      {sc.name}
                    </h3>
                    <p className="text-xs font-hindi text-slate-500">
                      {sc.hindiName}
                    </p>
                  </div>

                  {/* Active / Inactive Status Toggle */}
                  <div className="flex items-center space-x-3 self-end md:self-center">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                        sc.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {sc.status === 'Active' ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <Lock className="w-3 h-3 text-slate-500" />}
                        <span>{sc.status}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleSchemeStatus(sc.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
                    >
                      {sc.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>

                {/* Scheme Core Details Grid */}
                <div className="p-6 space-y-6">
                  
                  {/* Target Beneficiaries & Financial Slabs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 md:col-span-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Target Beneficiaries
                      </span>
                      <p className="font-semibold text-slate-800 leading-relaxed text-[11px]">
                        {sc.targetBeneficiaries}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                        Slots & Annual Outlay
                      </span>
                      <div className="font-bold text-slate-900 text-xs">
                        {sc.slotsAnnual}
                      </div>
                      <div className="text-[11px] text-amber-900 mt-1 leading-snug">
                        {sc.stipendRates}
                      </div>
                    </div>
                  </div>

                  {/* 4-Box Scheme Configuration Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                    
                    {/* Box 1: Eligibility Rules */}
                    <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <Scale className="w-4 h-4 text-amber-600" />
                          Configured Eligibility Rules
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {sc.eligibilityRules.length} Rules
                        </span>
                      </div>
                      <ul className="space-y-2 text-[11px]">
                        {sc.eligibilityRules.map((er, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0"></span>
                            <div>
                              <strong className="text-slate-900">{er.rule}:</strong>
                              <span className="text-slate-600 ml-1">{er.detail}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Box 2: Required Documents */}
                    <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-indigo-600" />
                          Required Statutory Documents
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {sc.requiredDocuments.length} Documents
                        </span>
                      </div>
                      <div className="space-y-2 text-[11px]">
                        {sc.requiredDocuments.map((rd, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start justify-between gap-2">
                            <strong className="text-slate-800 text-[11px]">{rd.doc}</strong>
                            <span className="text-[10px] text-slate-500 text-right leading-tight">{rd.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Box 3: Verification Stages & Selection Stage */}
                    <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-emerald-600" />
                          Multi-Tier Verification & Selection Hierarchy
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {sc.verificationStages.length} Stages
                        </span>
                      </div>
                      <div className="space-y-2">
                        {sc.verificationStages.map((vs, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-[11px]">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                              {vs.stage}
                            </span>
                            <div>
                              <strong className="text-slate-900 block leading-tight">{vs.role}</strong>
                              <span className="text-slate-500 text-[10px] leading-snug">{vs.action}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-100 text-[11px] bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                        <strong className="text-emerald-950 block text-[11px]">Selection Stage: {sc.selectionStage.mode}</strong>
                        <p className="text-emerald-800 text-[10px] mt-0.5">{sc.selectionStage.criteria}</p>
                        <span className="text-[10px] text-emerald-900 font-mono block mt-1">Authority: {sc.selectionStage.sanctionAuthority}</span>
                      </div>
                    </div>

                    {/* Box 4: Compliance Requirements & Payment Readiness Conditions */}
                    <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                          Compliance & Payment-Readiness Gates
                        </span>
                        <span className="text-[10px] font-mono bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                          Selected ≠ Payment Ready
                        </span>
                      </div>

                      {/* Compliance */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Ongoing Compliance Mandates:
                        </span>
                        {sc.complianceRequirements.map((cr, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px] p-1.5 rounded bg-slate-50">
                            <span className="text-slate-700 font-medium">{cr.requirement}</span>
                            <span className="font-mono font-bold text-slate-900 text-[10px]">{cr.threshold}</span>
                          </div>
                        ))}
                      </div>

                      {/* Payment Readiness */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Disbursement Clearing Gates:
                        </span>
                        {sc.paymentReadinessConditions.slice(0, 3).map((pr, idx) => (
                          <div key={idx} className="text-[10px] text-slate-600 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span><strong>{pr.condition}:</strong> {pr.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-500 text-[11px]">
                    Effective from: <strong className="text-slate-700">{sc.effectiveDate}</strong> • Version: <strong className="font-mono text-slate-700">{sc.policyVersion}</strong>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedSchemeId(sc.id);
                        setActiveTab('POLICY_VERSION');
                      }}
                      className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold transition-all text-xs flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>Inspect Policy Versions</span>
                    </button>

                    <button
                      onClick={() => {
                        setNewRuleForm(prev => ({ ...prev, scheme: sc.id }));
                        setActiveTab('RULE_BUILDER');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all text-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-400" />
                      <span>Configure Rules</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: POLICY VERSION PANEL */}
      {activeTab === 'POLICY_VERSION' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Gazette Registry
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  Policy Version & Gazette Life-Cycle Panel
                </h2>
                <p className="text-xs text-slate-500">
                  Track in-force statutory policies, archived historical versions, and pending cabinet draft circulars.
                </p>
              </div>

              {/* Scheme Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-slate-600">Select Scheme:</span>
                <select
                  value={selectedSchemeId}
                  onChange={(e) => setSelectedSchemeId(e.target.value)}
                  className="text-xs font-bold py-2 px-3 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  {schemesConfig.map(sc => (
                    <option key={sc.id} value={sc.id}>
                      {sc.code} — {sc.name.split('(')[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scheme Snapshot Header Card */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Target Scheme
                </span>
                <div className="text-base font-black text-white mt-0.5">
                  {activeSchemeData.name}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Current In-Force Policy Version: {activeVersionByScheme[selectedSchemeId] || '2026–27'}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Status: Active
                </span>
              </div>
            </div>

            {/* Version Timeline Cards */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Available Policy Versions for {selectedSchemeId}:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(policyVersions[selectedSchemeId] || [
                  { version: '2026–27', status: 'Active', gazetteNo: `MoTA/${selectedSchemeId}/2026-01`, approvalDate: '15-Jan-2026', author: 'Standing Committee', remarks: 'Current statutory policy.' }
                ]).map((ver, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                      ver.status === 'Active'
                        ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                        : ver.status.includes('Draft')
                        ? 'bg-blue-50/40 border-blue-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-slate-900">
                        {ver.version}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        ver.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ver.status.includes('Draft')
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {ver.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-600 text-[11px]">
                      <div><strong>Gazette Ref:</strong> <span className="font-mono">{ver.gazetteNo}</span></div>
                      <div><strong>Approved:</strong> {ver.approvalDate}</div>
                      <div><strong>Authority:</strong> {ver.author}</div>
                      <div className="text-[10px] text-slate-500 italic mt-1">{ver.remarks}</div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-end">
                      {ver.status === 'Active' ? (
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> In-Force on Production Engine
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveVersionByScheme(prev => ({ ...prev, [selectedSchemeId]: ver.version }));
                            showToast(`Switched active policy version for ${selectedSchemeId} to ${ver.version}.`, 'info');
                          }}
                          className="text-[10px] text-slate-700 font-bold hover:underline"
                        >
                          Switch to this Version
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Configured Rules by 5 Categories for this Scheme */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Configured Rules Breakdown under Version {activeVersionByScheme[selectedSchemeId] || '2026–27'}:
              </span>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                {[
                  { cat: 'Eligibility', count: 5, desc: 'Income, Caste Art 342, Age, Merit' },
                  { cat: 'Required Documents', count: 5, desc: 'Digilocker Caste, Income, Marksheet' },
                  { cat: 'Verification', count: 4, desc: 'Supervisor, Dean, Desk L-1, Nodal L-2' },
                  { cat: 'Selection', count: 1, desc: 'Merit Quota & PVTG Sub-allocation' },
                  { cat: 'Compliance', count: 4, desc: 'Attendance ≥75%, No Dual Fellowship' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Category {idx + 1}
                    </span>
                    <strong className="text-slate-900 block text-xs">{item.cat}</strong>
                    <span className="text-[10px] font-mono text-indigo-700 font-bold block">{item.count} Active Rules</span>
                    <p className="text-[10px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: RULE BUILDER UI */}
      {activeTab === 'RULE_BUILDER' && (
        <div className="space-y-6">
          
          {/* Rule Builder Interactive Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Statutory Rule Constructor
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-1">
                  Rule Builder & Policy Constraint Engine
                </h2>
                <p className="text-xs text-slate-500">
                  Construct deterministic decision support parameters for optical comparison and eligibility checks.
                </p>
              </div>

              <div className="text-xs font-mono bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
                Syntax: [Field] [Operator] [Threshold / Value]
              </div>
            </div>

            <form onSubmit={handleAddRule} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Rule Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Rule Name:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Mandatory Parental Income Ceiling"
                    value={newRuleForm.name}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, name: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                {/* Applicable Scheme */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Applicable Scheme:
                  </label>
                  <select
                    value={newRuleForm.scheme}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, scheme: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="PMS_ST">PMS-ST (Post-Matric)</option>
                    <option value="NFST">NFST (National Fellowship)</option>
                    <option value="NOS">NOS (National Overseas)</option>
                    <option value="TOPCLASS">Top Class Scholarship</option>
                    <option value="PRE_MATRIC">Pre-Matric Scholarship</option>
                    <option value="ALL_SCHEMES">Universal (All Schemes)</option>
                  </select>
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Rule Category:
                  </label>
                  <select
                    value={newRuleForm.category}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, category: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white font-semibold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="Eligibility">Eligibility</option>
                    <option value="Required Documents">Required Documents</option>
                    <option value="Verification">Verification</option>
                    <option value="Selection">Selection</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>

                {/* Field */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Field (Parameter):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Family Annual Income"
                    value={newRuleForm.field}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, field: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                {/* Operator */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Operator:
                  </label>
                  <select
                    value={newRuleForm.operator}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, operator: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white font-mono font-bold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option value="≤">≤ (Less Than or Equal To)</option>
                    <option value="≥">≥ (Greater Than or Equal To)</option>
                    <option value="=">= (Exact Match / Boolean)</option>
                    <option value="IN">IN (Present in Notified List)</option>
                    <option value="CONTAINS">CONTAINS (Substring Match)</option>
                    <option value="NOT_EMPTY">NOT_EMPTY (Mandatory Field)</option>
                  </select>
                </div>

                {/* Threshold / Value */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Threshold / Value:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., ₹2,50,000 / year"
                    value={newRuleForm.threshold}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, threshold: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                  />
                </div>

                {/* Effective Date */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Effective Date:
                  </label>
                  <input
                    type="date"
                    value={newRuleForm.effectiveDate}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, effectiveDate: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                {/* Policy Version */}
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                    Policy Version:
                  </label>
                  <input
                    type="text"
                    value={newRuleForm.policyVersion}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, policyVersion: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white font-mono focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

              </div>

              {/* Real-time Syntax Visualizer */}
              <div className="p-3 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                    Evaluated Rule Expression:
                  </span>
                  <span className="font-mono text-xs bg-slate-800 px-3 py-1 rounded border border-slate-700 text-amber-200">
                    {newRuleForm.field || 'Field'} {newRuleForm.operator} {newRuleForm.threshold || 'Configured Threshold'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1.5 self-end sm:self-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Statutory Rule</span>
                </button>
              </div>
            </form>
          </div>

          {/* Active Rules Inventory Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Active Statutory Rules Registry ({configuredRules.length})
              </h3>
              <span className="text-xs text-slate-500">
                Deterministic decision support parameters
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <th className="p-3">Rule Name & UID</th>
                    <th className="p-3">Scheme</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Field</th>
                    <th className="p-3 text-center">Operator</th>
                    <th className="p-3">Threshold / Value</th>
                    <th className="p-3">Version & Date</th>
                    <th className="p-3 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {configuredRules.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{r.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{r.id}</div>
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold px-2 py-0.5 rounded text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {r.scheme}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 font-medium">
                        {r.category}
                      </td>
                      <td className="p-3 font-mono text-slate-800 text-[11px]">
                        {r.field}
                      </td>
                      <td className="p-3 text-center font-mono font-black text-amber-700 text-sm">
                        {r.operator}
                      </td>
                      <td className="p-3 font-mono font-bold text-slate-900 text-[11px]">
                        {r.threshold}
                      </td>
                      <td className="p-3 text-slate-500 text-[10px]">
                        <div>Ver: {r.policyVersion}</div>
                        <div>Eff: {r.effectiveDate}</div>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleToggleRuleActive(r.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                            r.active
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {r.active ? 'ACTIVE' : 'SUSPENDED'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: POLICY CONFLICT / REVIEW REQUIRED */}
      {activeTab === 'POLICY_CONFLICTS' && (
        <div className="space-y-6">
          <div className="bg-red-50/70 border border-red-200 rounded-2xl p-5 flex items-start space-x-3 text-xs text-red-950">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-red-900 block font-bold text-sm">
                Policy Conflict / Human Review Required Queue ({unresolvedConflictsCount} Active Cases)
              </strong>
              <p className="mt-1 text-red-800 leading-relaxed">
                When an application record cannot be confidently evaluated against configured statutory policy 
                (due to conflicting legal interpretations, inter-state domicile disparities, or incomplete surrender papers), 
                the AI policy engine sets the case into <strong>Policy Conflict / Review Required</strong>. 
                In compliance with administrative law, <strong>final determinations and exceptions remain strictly human-controlled.</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {conflictCases.map((cc) => (
              <div
                key={cc.id}
                className={`bg-white rounded-2xl border p-5 transition-all shadow-sm ${
                  cc.adjudicated
                    ? 'border-slate-200 opacity-80 bg-slate-50/50'
                    : 'border-red-200 hover:border-red-300 ring-1 ring-red-500/10'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      cc.adjudicated ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {cc.adjudicated ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">{cc.caseId}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {cc.scheme}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          Policy: {cc.policyVersion}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5">
                        {cc.applicantName} ({cc.tribe}) • {cc.state}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end md:self-center">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      AI Confidence: <strong>{cc.aiConfidence}% (Inconclusive)</strong>
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      cc.adjudicated
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800 animate-pulse'
                    }`}>
                      {cc.adjudicated ? 'ADJUDICATED BY OFFICER' : 'REVIEW REQUIRED'}
                    </span>
                  </div>
                </div>

                {/* Conflict Details Grid */}
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Conflict Classification:
                    </span>
                    <div className="font-bold text-red-900 text-xs">{cc.conflictType}</div>
                    <div className="text-[11px] text-slate-700 mt-1">{cc.statutoryClause}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">Configured Rule: {cc.threshold}</div>
                  </div>

                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-amber-800 block">
                      Observed Fact & Why AI is Inconclusive:
                    </span>
                    <div className="font-medium text-slate-900 text-[11px] leading-snug">{cc.observedData}</div>
                    <p className="text-slate-600 text-[10px] mt-1 leading-relaxed">{cc.ambiguityDescription}</p>
                  </div>

                </div>

                {/* If adjudicated, show record */}
                {cc.adjudicated && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1 mb-2">
                    <div className="flex items-center justify-between text-emerald-950 font-bold">
                      <span>Official Adjudication: {cc.resolutionDecision}</span>
                      <span className="text-[10px] text-emerald-800 font-mono">By {cc.resolvedBy}</span>
                    </div>
                    <p className="text-[11px] text-emerald-900 italic">
                      File Noting: "{cc.resolutionNotes}"
                    </p>
                  </div>
                )}

                {/* Action Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    {cc.adjudicated ? 'Decision recorded in central audit trail.' : 'Official discretion required under MoTA Delegated Powers.'}
                  </span>

                  {!cc.adjudicated && (
                    <button
                      onClick={() => setSelectedConflictCase(cc)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-amber-200" />
                      <span>Adjudicate Policy Conflict</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MACRO OUTLAY WHAT-IF SIMULATOR */}
      {activeTab === 'SIMULATOR' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sliders (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  <span>Macro Parameter Sliders</span>
                </h3>
                <span className="text-xs text-slate-500">Real-time dynamic recalculation</span>
              </div>

              {/* Slider 1: NFST Monthly JRF Stipend */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    1. NFST Monthly JRF Fellowship Rate
                  </span>
                  <span className="font-mono font-bold text-amber-700 text-sm">
                    ₹{jrfStipend.toLocaleString('en-IN')} / month
                  </span>
                </div>
                <input
                  type="range"
                  min="31000"
                  max="50000"
                  step="1000"
                  value={jrfStipend}
                  onChange={(e) => setJrfStipend(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Baseline: ₹37,000/mo</span>
                  <span>7th CPC Alignment: ₹42,000/mo</span>
                  <span>Max: ₹50,000/mo</span>
                </div>
              </div>

              {/* Slider 2: NOS Income Ceiling */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    2. National Overseas Scholarship (NOS) Family Income Ceiling
                  </span>
                  <span className="font-mono font-bold text-amber-700 text-sm">
                    ₹{(nosIncomeLimit / 100000).toFixed(1)} Lakhs / annum
                  </span>
                </div>
                <input
                  type="range"
                  min="600000"
                  max="1200000"
                  step="50000"
                  value={nosIncomeLimit}
                  onChange={(e) => setNosIncomeLimit(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Current Limit: ₹6.0 LPA</span>
                  <span>Proposed: ₹8.0 LPA</span>
                  <span>Max: ₹12.0 LPA</span>
                </div>
              </div>

              {/* Slider 3: Top Class Premier Institutes */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    3. Top Class Premier Notified Institutes Count
                  </span>
                  <span className="font-mono font-bold text-amber-700 text-sm">
                    {topClassCount} Premier Institutes
                  </span>
                </div>
                <input
                  type="range"
                  min="258"
                  max="320"
                  step="2"
                  value={topClassCount}
                  onChange={(e) => setTopClassCount(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Current: 258 (IITs/IIMs/AIIMS)</span>
                  <span>Adding 22 IIITs: 280</span>
                  <span>Central Univs: 320</span>
                </div>
              </div>

              {/* Slider 4: Post-Matric ST Income Ceiling */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    4. Post-Matric Scholarship (PMS-ST) Parental Income Ceiling
                  </span>
                  <span className="font-mono font-bold text-amber-700 text-sm">
                    ₹{(pmsIncomeLimit / 100000).toFixed(2)} Lakhs / annum
                  </span>
                </div>
                <input
                  type="range"
                  min="250000"
                  max="450000"
                  step="25000"
                  value={pmsIncomeLimit}
                  onChange={(e) => setPmsIncomeLimit(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Current: ₹2.50 LPA</span>
                  <span>State Demand: ₹3.50 LPA</span>
                  <span>Max: ₹4.50 LPA</span>
                </div>
              </div>
            </div>

            {/* Projected Impact (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0A192F] to-[#102A4C] text-white rounded-2xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Simulated Macro Outcome</span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  Projected Annual Impact Summary
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Based on historical application patterns and census Scheduled Tribe distribution data.
                </p>

                <div className="space-y-4 mt-6">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                    <span className="text-[11px] text-slate-400 font-semibold block">
                      Additional Newly Eligible ST Scholars
                    </span>
                    <p className="text-3xl font-extrabold text-amber-400 mt-1">
                      +{additionalEligibleScholars.toLocaleString('en-IN')} Students
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Includes ~{Math.round(additionalEligibleScholars * 0.084)} PVTG students in remote blocks.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700">
                    <span className="text-[11px] text-slate-400 font-semibold block">
                      Projected Additional Budget Outlay
                    </span>
                    <p className="text-3xl font-extrabold text-emerald-400 mt-1">
                      +₹{Number(stipendDeltaCr) > 0 ? stipendDeltaCr : '0.00'} Crores / year
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      To be requisitioned under Demand No. 92, Ministry of Tribal Affairs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Model Version: MoTA-SIM-2026.1</span>
                <span className="text-emerald-400 font-semibold">100% Deterministic</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Policy Conflict Adjudication Modal */}
      {selectedConflictCase && (
        <PolicyConflictModal
          conflictCase={selectedConflictCase}
          onClose={() => setSelectedConflictCase(null)}
          onResolve={handleResolveConflict}
        />
      )}

    </div>
  );
};
