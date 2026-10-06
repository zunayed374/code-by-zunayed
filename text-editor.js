/**
 * Bright Career Academy - Universal Site Text CMS (Admin-Only Portal)
 * 
 * Strict Constraint: All site text editing is restricted exclusively to the Admin Portal.
 * Public visitors cannot edit text. All customizations persist in localStorage ('bca_site_texts')
 * and synchronize live to all pages in real time.
 */

const STORAGE_KEY = 'bca_site_texts';
let currentActivePageKey = 'view-home';
let currentSearchQuery = '';

/**
 * Complete, structured configurations for all 11 pages/sections across Bright Career Academy
 */
export const PAGE_TEXT_CONFIGS = {
  'view-home': {
    name: 'Home Page',
    icon: 'fa-house',
    description: 'Hero banner, statistics, key verticals, about institution, and contact introduction.',
    fields: [
      {
        id: 'home_hero_badge',
        section: 'Hero Banner',
        label: 'Hero Top Pill Badge',
        selector: '#home .inline-flex',
        defaultText: '4.5+ Years of Proven Excellence'
      },
      {
        id: 'home_hero_title',
        section: 'Hero Banner',
        label: 'Main Hero Heading',
        selector: '#home h1',
        defaultText: 'Shape and Empower of Future with Bright Career Academy'
      },
      {
        id: 'home_hero_desc',
        section: 'Hero Banner',
        label: 'Hero Description Subtitle',
        selector: '#home p.text-base',
        defaultText: 'Your trusted partner for Job Consultancy, Vocational Training, Technical Diplomas, and comprehensive Educational guidance. We build bridges between talent and high-growth careers.'
      },
      {
        id: 'home_hero_stat',
        section: 'Hero Banner',
        label: 'Hero Placement Card Stat',
        selector: '#home .bg-white.p-5 p.text-2xl',
        defaultText: '1000+ Placed'
      },
      {
        id: 'home_services_eyebrow',
        section: 'Key Verticals',
        label: 'Verticals Eyebrow Tag',
        selector: '#services h2',
        defaultText: 'OUR KEY VERTICALS'
      },
      {
        id: 'home_services_title',
        section: 'Key Verticals',
        label: 'Verticals Main Heading',
        selector: '#services h3',
        defaultText: 'Dedicated to Your Success'
      },
      {
        id: 'home_services_desc',
        section: 'Key Verticals',
        label: 'Verticals Section Description',
        selector: '#services p.text-base',
        defaultText: 'Specialized career coaching, industry-aligned skill building, and direct campus placements.'
      },
      {
        id: 'home_card1_title',
        section: 'Verticals Cards',
        label: 'Vertical 1 Title (Vocational)',
        selector: '#services .service-card:nth-of-type(1) h4',
        defaultText: 'Vocational Training'
      },
      {
        id: 'home_card1_desc',
        section: 'Verticals Cards',
        label: 'Vertical 1 Description',
        selector: '#services .service-card:nth-of-type(1) p',
        defaultText: 'Practical, industry-aligned skill development programs designed to make you job-ready. Over 30 specialized courses in IT, Accounting, Electrical, Hardware, and Healthcare.'
      },
      {
        id: 'home_card2_title',
        section: 'Verticals Cards',
        label: 'Vertical 2 Title (Job Consultancy)',
        selector: '#services .service-card:nth-of-type(2) h4',
        defaultText: 'Job Consultancy'
      },
      {
        id: 'home_card2_desc',
        section: 'Verticals Cards',
        label: 'Vertical 2 Description',
        selector: '#services .service-card:nth-of-type(2) p',
        defaultText: 'Personalized career guidance and examination preparation. Comprehensive coaching for Government exams (UPSC, SSC, Railways) and corporate recruitment drives.'
      },
      {
        id: 'home_card3_title',
        section: 'Verticals Cards',
        label: 'Vertical 3 Title (Higher Education)',
        selector: '#services .service-card:nth-of-type(3) h4',
        defaultText: 'Higher Education & B.Tech'
      },
      {
        id: 'home_card3_desc',
        section: 'Verticals Cards',
        label: 'Vertical 3 Description',
        selector: '#services .service-card:nth-of-type(3) p',
        defaultText: 'Complete academic guidance and admission assistance for 30 Diploma Engineering branches and 20 B.Tech / B.E. programs with 100% Tuition Fee Scholarship opportunities.'
      },
      {
        id: 'home_card4_title',
        section: 'Verticals Cards',
        label: 'Vertical 4 Title (Placement Cell)',
        selector: '#services .service-card:nth-of-type(4) h4',
        defaultText: 'Placement Cell'
      },
      {
        id: 'home_card4_desc',
        section: 'Verticals Cards',
        label: 'Vertical 4 Description',
        selector: '#services .service-card:nth-of-type(4) p',
        defaultText: 'Dedicated placement team conducting resume workshops, technical interviews, and corporate campus placement drives with over 50 recruiting partners nationwide.'
      },
      {
        id: 'home_about_eyebrow',
        section: 'About Institution',
        label: 'About Eyebrow Tag',
        selector: '#about span.text-accent',
        defaultText: 'ABOUT OUR INSTITUTION'
      },
      {
        id: 'home_about_title',
        section: 'About Institution',
        label: 'About Section Heading',
        selector: '#about h2',
        defaultText: '4.5+ Years of Building Successful Careers'
      },
      {
        id: 'home_about_desc1',
        section: 'About Institution',
        label: 'About Paragraph 1',
        selector: '#about p.text-blue-100:nth-of-type(1)',
        defaultText: 'At Bright Career Academy, we understand the evolving demands of the modern industrial landscape. Established over four years ago in West Bengal, we have empowered hundreds of students to achieve their educational and career milestones.'
      },
      {
        id: 'home_about_desc2',
        section: 'About Institution',
        label: 'About Paragraph 2',
        selector: '#about p.text-blue-100:nth-of-type(2)',
        defaultText: 'Our mission is to bridge the gap between academic theory and practical corporate competence, making quality technical education accessible and rewarding.'
      },
      {
        id: 'home_about_callout',
        section: 'About Institution',
        label: 'About Image Card Callout',
        selector: '#about .rounded-3xl p.text-blue-200',
        defaultText: 'Affiliated counselling and scholarship assistance for top technical colleges.'
      },
      {
        id: 'home_contact_title',
        section: 'Contact & Inquiry',
        label: 'Contact Intro Heading',
        selector: '#contact h3',
        defaultText: 'Get in Touch'
      },
      {
        id: 'home_contact_desc',
        section: 'Contact & Inquiry',
        label: 'Contact Subtitle Text',
        selector: '#contact p.text-gray-300',
        defaultText: "Speak directly with our career counsellors. We'll guide you on admissions, scholarship eligibility, and courses."
      }
    ]
  },

  'view-coaching': {
    name: 'Coaching (Nursery–12)',
    icon: 'fa-chalkboard-user',
    description: 'Foundational schooling, middle school mastery, board exam targets, and senior secondary streams.',
    fields: [
      {
        id: 'coach_page_title',
        section: 'Header',
        label: 'Coaching Main Title',
        selector: '#view-coaching h2',
        defaultText: 'ACADEMIC COACHING (NURSERY TO 12TH)'
      },
      {
        id: 'coach_page_subtitle',
        section: 'Header',
        label: 'Board Affiliations Subtitle',
        selector: '#view-coaching p.text-gray-600',
        defaultText: 'CBSE • ICSE / ISC • West Bengal & State Boards • Science, Commerce & Arts'
      },
      {
        id: 'coach_pill_badge',
        section: 'Header',
        label: 'Batch Size Highlight Pill',
        selector: '#view-coaching .shadow-xs:nth-of-type(1) span, #view-coaching .text-gray-700.shadow-xs',
        defaultText: 'Small Batches (Max 15-20)'
      },
      {
        id: 'coach_wing1_title',
        section: 'Academic Wings',
        label: 'Wing 1 Title (Nursery–5th)',
        selector: '#view-coaching .rounded-3xl:nth-of-type(1) h3',
        defaultText: 'Early Childhood & Primary Foundation'
      },
      {
        id: 'coach_wing1_desc',
        section: 'Academic Wings',
        label: 'Wing 1 Description',
        selector: '#view-coaching .rounded-3xl:nth-of-type(1) p.text-xs',
        defaultText: 'Nurturing curiosity, phonics, reading fluency, handwriting, and mental arithmetic. Activity-based learning that removes fear of mathematics and builds solid conceptual roots.'
      },
      {
        id: 'coach_wing2_title',
        section: 'Academic Wings',
        label: 'Wing 2 Title (6th–8th)',
        selector: '#view-coaching .rounded-3xl:nth-of-type(2) h3',
        defaultText: 'Middle School Conceptual Mastery'
      },
      {
        id: 'coach_wing2_desc',
        section: 'Academic Wings',
        label: 'Wing 2 Description',
        selector: '#view-coaching .rounded-3xl:nth-of-type(2) p.text-xs',
        defaultText: 'Transition from rote learning to deep understanding. Prepares students for secondary board syllabus, Olympiads (IMO, NSO), and early NTSE reasoning techniques.'
      },
      {
        id: 'coach_wing3_title',
        section: 'Academic Wings',
        label: 'Wing 3 Title (9th & 10th Board)',
        selector: '#view-coaching .rounded-3xl:nth-of-type(3) h3',
        defaultText: 'Secondary Board Exam Target (90%+ Aim)'
      },
      {
        id: 'coach_wing3_desc',
        section: 'Academic Wings',
        label: 'Wing 3 Description',
        selector: '#view-coaching .rounded-3xl:nth-of-type(3) p.text-xs',
        defaultText: 'Laser-focused board examination methodology. Complete syllabus finished 4 months before board exams, followed by 10-year previous question drills and pre-board simulated tests.'
      },
      {
        id: 'coach_wing4_title',
        section: 'Academic Wings',
        label: 'Wing 4 Title (11th & 12th Streams)',
        selector: '#view-coaching .rounded-3xl:nth-of-type(4) h3',
        defaultText: 'Senior Secondary Stream Specialization'
      },
      {
        id: 'coach_wing4_desc',
        section: 'Academic Wings',
        label: 'Wing 4 Description',
        selector: '#view-coaching .rounded-3xl:nth-of-type(4) p.text-xs',
        defaultText: 'Specialized batch faculties for Science, Commerce, and Arts streams. Synchronized board exam preparation with competitive entrance foundation.'
      },
      {
        id: 'coach_form_title',
        section: 'Admission Form',
        label: 'Admissions Form Heading',
        selector: '#view-coaching .bg-white.max-w-4xl h3',
        defaultText: 'Enroll in Academic Coaching Batches'
      },
      {
        id: 'coach_form_desc',
        section: 'Admission Form',
        label: 'Admissions Form Subtitle',
        selector: '#view-coaching .bg-white.max-w-4xl p.text-xs',
        defaultText: 'Experience our classroom methodology with 2 complimentary demo lectures.'
      }
    ]
  },

  'view-jeeneet': {
    name: 'JEE & NEET Prep',
    icon: 'fa-atom',
    description: 'Engineering and Medical entrance preparation, Kota-pedagogy programs, and CBT test series.',
    fields: [
      {
        id: 'jeeneet_page_title',
        section: 'Header',
        label: 'JEE/NEET Main Title',
        selector: '#view-jeeneet h2',
        defaultText: 'JEE (MAIN & ADVANCED) & NEET-UG FOUNDATION'
      },
      {
        id: 'jeeneet_page_subtitle',
        section: 'Header',
        label: 'Pedagogy Subtitle',
        selector: '#view-jeeneet p.text-gray-600',
        defaultText: 'Mentored by Ex-IITians & Senior Medical Doctors • Kota & Kolkata Pedagogy'
      },
      {
        id: 'jeeneet_ratio_badge',
        section: 'Header',
        label: 'Success Ratio Pill',
        selector: '#view-jeeneet .bg-purple-50',
        defaultText: '98.4% Qualifying Ratio'
      },
      {
        id: 'jeeneet_stat1_label',
        section: 'Key Stats Bar',
        label: 'Question Bank Stat Label',
        selector: '#view-jeeneet .grid-cols-2 > div:nth-child(1) p',
        defaultText: 'DPP Solved Question Bank'
      },
      {
        id: 'jeeneet_prog1_title',
        section: 'Target Programs',
        label: 'Program 1 Title (Pre-Foundation)',
        selector: '#view-jeeneet .grid-cols-1 > div:nth-child(1) h3',
        defaultText: 'Pre-Foundation Program (IIT-JEE / NEET)'
      },
      {
        id: 'jeeneet_prog1_desc',
        section: 'Target Programs',
        label: 'Program 1 Description',
        selector: '#view-jeeneet .grid-cols-1 > div:nth-child(1) p.text-xs',
        defaultText: 'Engineered to build deep scientific reasoning, advanced mathematical intuition, and aptitude for national Olympiads (IMO, NSO, PRMO, NTSE).'
      },
      {
        id: 'jeeneet_prog2_title',
        section: 'Target Programs',
        label: 'Program 2 Title (Pinnacle 2-Year)',
        selector: '#view-jeeneet .grid-cols-1 > div:nth-child(2) h3',
        defaultText: 'Pinnacle 2-Year Integrated JEE / NEET Batch'
      },
      {
        id: 'jeeneet_prog2_desc',
        section: 'Target Programs',
        label: 'Program 2 Description',
        selector: '#view-jeeneet .grid-cols-1 > div:nth-child(2) p.text-xs',
        defaultText: 'The gold standard for cracking Top 500 All-India Ranks. Thorough mastery of 11th syllabus synchronized with rigorous JEE Advanced / NEET level numerical problems.'
      },
      {
        id: 'jeeneet_prog3_title',
        section: 'Target Programs',
        label: 'Program 3 Title (Fast Track 1-Year)',
        selector: '#view-jeeneet .grid-cols-1 > div:nth-child(3) h3',
        defaultText: 'Target 1-Year Fast Track JEE / NEET Batch'
      },
      {
        id: 'jeeneet_prog3_desc',
        section: 'Target Programs',
        label: 'Program 3 Description',
        selector: '#view-jeeneet .grid-cols-1 > div:nth-child(3) p.text-xs',
        defaultText: 'High-yield revision of Class 11th topics combined with Class 12th board preparation and exhaustive mock test drills under strict time pressure.'
      },
      {
        id: 'jeeneet_prog4_title',
        section: 'Target Programs',
        label: 'Program 4 Title (Droppers Batch)',
        selector: '#view-jeeneet .grid-cols-1 > div:nth-child(4) h3',
        defaultText: 'Rank Booster Repeaters & Droppers Batch'
      },
      {
        id: 'jeeneet_prog4_desc',
        section: 'Target Programs',
        label: 'Program 4 Description',
        selector: '#view-jeeneet .grid-cols-1 > div:nth-child(4) p.text-xs',
        defaultText: 'Zero-distraction intensive dropper batch with 600+ classroom hours, error-analysis labs, negative marking correction strategies, and weekly All-India CBT tests.'
      }
    ]
  },

  'view-scholarship': {
    name: 'Scholarship Exam',
    icon: 'fa-award',
    description: 'National Talent Search & Scholarship Examination (BC-STSE), reward tiers, and hall ticket guidance.',
    fields: [
      {
        id: 'stse_page_title',
        section: 'Header',
        label: 'Scholarship Main Title',
        selector: '#view-scholarship h2',
        defaultText: 'NATIONAL TALENT SEARCH & SCHOLARSHIP EXAM (BC-STSE)'
      },
      {
        id: 'stse_page_subtitle',
        section: 'Header',
        label: 'Scholarship Subtitle',
        selector: '#view-scholarship p.text-gray-600',
        defaultText: 'Conducting Merit Examinations for Class 5th to Graduation • Up to 100% Tuition Fee Waiver & Cash Grants'
      },
      {
        id: 'stse_pool_badge',
        section: 'Header',
        label: 'Scholarship Pool Amount Badge',
        selector: '#view-scholarship .bg-amber-500, #view-scholarship span.font-bold:contains("Lakhs")',
        defaultText: '₹25 Lakhs Scholarship Pool'
      },
      {
        id: 'stse_tier1_title',
        section: 'Rewards Tiers',
        label: 'Tier 1 Award Heading (Rank 1-5)',
        selector: '#view-scholarship .from-amber-500 h3',
        defaultText: 'Rank 1 to 5: 100% Full Scholarship'
      },
      {
        id: 'stse_tier1_desc',
        section: 'Rewards Tiers',
        label: 'Tier 1 Award Description',
        selector: '#view-scholarship .from-amber-500 p.text-xs',
        defaultText: 'Plus Free Student Laptop / Tablet & National Gold Medal of Excellence.'
      },
      {
        id: 'stse_tier2_title',
        section: 'Rewards Tiers',
        label: 'Tier 2 Award Heading (Rank 6-20)',
        selector: '#view-scholarship .from-blue-700 h3',
        defaultText: 'Rank 6 to 20: 75% Tuition Fee Waiver'
      },
      {
        id: 'stse_tier2_desc',
        section: 'Rewards Tiers',
        label: 'Tier 2 Award Description',
        selector: '#view-scholarship .from-blue-700 p.text-xs',
        defaultText: 'Plus ₹5,000 Academic Books Grant & Silver Medal of Distinction.'
      },
      {
        id: 'stse_tier3_title',
        section: 'Rewards Tiers',
        label: 'Tier 3 Award Heading (Rank 21-100)',
        selector: '#view-scholarship .from-emerald-700 h3',
        defaultText: 'Rank 21 to 100: 50% Tuition Fee Waiver'
      },
      {
        id: 'stse_tier3_desc',
        section: 'Rewards Tiers',
        label: 'Tier 3 Award Description',
        selector: '#view-scholarship .from-emerald-700 p.text-xs',
        defaultText: 'Plus Certificate of Merit & Free 1-Year Comprehensive Test Series Pass.'
      }
    ]
  },

  'view-govtexams': {
    name: 'Govt Exams Guide',
    icon: 'fa-building-flag',
    description: 'UPSC, SSC, Railway Recruitment, Banking, State PSC, and competitive classroom batches.',
    fields: [
      {
        id: 'govexam_page_title',
        section: 'Header',
        label: 'Govt Exams Main Title',
        selector: '#view-govtexams h2',
        defaultText: 'GOVERNMENT EXAMS GUIDE'
      },
      {
        id: 'govexam_page_subtitle',
        section: 'Header',
        label: 'Govt Exams Subtitle',
        selector: '#view-govtexams p.text-gray-600',
        defaultText: 'UPSC • SSC • Railway Recruitment • State Services'
      },
      {
        id: 'govexam_callout_title',
        section: 'Batches Callout',
        label: 'Coaching Batches Box Title',
        selector: '#view-govtexams .from-blue-900 h3',
        defaultText: 'Join Our Government Exam Coaching Batches'
      },
      {
        id: 'govexam_callout_desc',
        section: 'Batches Callout',
        label: 'Coaching Batches Box Description',
        selector: '#view-govtexams .from-blue-900 p.text-blue-100',
        defaultText: 'Expert faculty mentorship, speed math shortcuts, daily bilingual GS capsules, and 100+ full-length online Computer Based Test (CBT) mock tests.'
      },
      {
        id: 'govexam_form_title',
        section: 'Mock Test Pass',
        label: 'Mock Test Pass Form Title',
        selector: '#view-govtexams form h4, #view-govtexams .bg-slate-900 h4',
        defaultText: 'Claim Free Mock Test Pass & Counselling'
      }
    ]
  },

  'view-govtskills': {
    name: 'Govt Skill (PMKVY)',
    icon: 'fa-handshake-angle',
    description: 'PMKVY 4.0, NSDC Certified Vocational Training, DDU-GKY schemes, and subsidized job roles.',
    fields: [
      {
        id: 'govtskill_page_title',
        section: 'Header',
        label: 'Skill Mission Main Title',
        selector: '#view-govtskills h2',
        defaultText: 'GOVERNMENT SKILL DEVELOPMENT PROGRAMS'
      },
      {
        id: 'govtskill_page_subtitle',
        section: 'Header',
        label: 'Accreditation Subtitle',
        selector: '#view-govtskills p.text-gray-600',
        defaultText: 'PMKVY 4.0 • NSDC Certified • DDU-GKY • Free Vocational Training & Placement Support'
      },
      {
        id: 'govtskill_badge',
        section: 'Header',
        label: '100% Free Subsidy Badge',
        selector: '#view-govtskills .bg-teal-600, #view-govtskills .text-teal-800',
        defaultText: '100% Free Govt Subsidized'
      },
      {
        id: 'govtskill_banner_title',
        section: 'Overview Banner',
        label: 'Mission Overview Title',
        selector: '#view-govtskills .from-teal-900 h3',
        defaultText: 'Skill India Mission — Empowering Youth with Employable Competence'
      },
      {
        id: 'govtskill_banner_desc',
        section: 'Overview Banner',
        label: 'Mission Overview Description',
        selector: '#view-govtskills .from-teal-900 p.text-teal-100',
        defaultText: 'Bright Career Academy is a recognized execution and mobilization partner delivering standardized Skill India certifications, practical workshop training, and corporate placement connections.'
      }
    ]
  },

  'view-diploma': {
    name: 'Diploma Engineering',
    icon: 'fa-award',
    description: 'Polytechnic Diploma in Engineering, 30 specialized branches, fee structures, and admission notes.',
    fields: [
      {
        id: 'diploma_page_title',
        section: 'Header',
        label: 'Diploma Page Heading',
        selector: '#diploma-count-heading',
        defaultText: 'ALL DIPLOMA COURSES (30)'
      },
      {
        id: 'diploma_page_subtitle',
        section: 'Header',
        label: 'Qualification & Fee Subtitle',
        selector: '#view-diploma p.text-gray-600',
        defaultText: 'QUALIFICATION • DURATION • APPROX. FEES'
      },
      {
        id: 'diploma_notice_note',
        section: 'Notice Callout',
        label: 'Regulatory Notice Paragraph',
        selector: '#view-diploma .bg-blue-50 p',
        defaultText: 'Fees are approximate and vary by institute, university, affiliation, and state norms. Regulated programmes such as D.Pharm, GNM, and technical polytechnics require admission only through approved bodies. Education • Skill • Placement | Bright Career Academy'
      }
    ]
  },

  'view-vocational': {
    name: 'Vocational & ITI',
    icon: 'fa-tools',
    description: '30 industrial and technical vocational trades, laboratory hands-on training, and fee details.',
    fields: [
      {
        id: 'voc_page_title',
        section: 'Header',
        label: 'Vocational Page Heading',
        selector: '#vocational-count-heading',
        defaultText: 'ALL VOCATIONAL COURSES (30)'
      },
      {
        id: 'voc_page_subtitle',
        section: 'Header',
        label: 'Vocational Subtitle',
        selector: '#view-vocational p.text-gray-600',
        defaultText: 'Vocational Training Centre • Career Counselling • Coaching • Placement'
      },
      {
        id: 'voc_notice_note',
        section: 'Notice Callout',
        label: 'Vocational Equipment Notice',
        selector: '#view-vocational .bg-amber-50 p',
        defaultText: 'Fees shown are indicative counselling ranges for short-term and vocational certificate programs. Practical workshop equipment and hands-on laboratory kits are provided.'
      }
    ]
  },

  'view-btech': {
    name: 'B.Tech / B.E. Degrees',
    icon: 'fa-graduation-cap',
    description: '20 Undergraduate Engineering branches, 100% Tuition Fee Scholarship criteria, and fee details.',
    fields: [
      {
        id: 'btech_page_title',
        section: 'Header',
        label: 'B.Tech Page Heading',
        selector: '#btech-count-heading',
        defaultText: 'B.TECH / B.E. COURSES (20)'
      },
      {
        id: 'btech_page_subtitle',
        section: 'Header',
        label: 'B.Tech Subtitle',
        selector: '#view-btech p.text-gray-600',
        defaultText: 'Engineering Programmes • 100% Tuition Fee Scholarship Schemes'
      },
      {
        id: 'btech_sch_title',
        section: 'Scholarship Card',
        label: 'Scholarship Banner Title',
        selector: '#view-btech .bg-indigo-50 h3',
        defaultText: '100% TUITION FEE SCHOLARSHIP'
      },
      {
        id: 'btech_sch_sub',
        section: 'Scholarship Card',
        label: 'Scholarship Tagline',
        selector: '#view-btech .bg-indigo-50 p.text-indigo-800',
        defaultText: 'Zero Donation • Zero Tuition Fee • Transparent Admissions'
      },
      {
        id: 'btech_sch_desc',
        section: 'Scholarship Card',
        label: 'Scholarship Description',
        selector: '#view-btech .bg-indigo-50 p.text-gray-700',
        defaultText: 'Eligible students can secure complete tuition waivers across 20 undergraduate engineering branches under affiliated institutional scholarship arrangements.'
      }
    ]
  },

  'view-placement': {
    name: 'Placement & Careers',
    icon: 'fa-briefcase',
    description: 'Corporate recruiting partners, placement records, and the 3-Phase Placement Acceleration Blueprint.',
    fields: [
      {
        id: 'placement_page_title',
        section: 'Header',
        label: 'Placement Cell Heading',
        selector: '#view-placement h2',
        defaultText: 'TRAINING & PLACEMENT CELL'
      },
      {
        id: 'placement_page_subtitle',
        section: 'Header',
        label: 'Placement Subtitle',
        selector: '#view-placement p.text-gray-600',
        defaultText: 'Bridging Campus Talents to Leading Corporate Careers'
      },
      {
        id: 'placement_stat1_title',
        section: 'Key Stats',
        label: 'Stat 1 Title (1000+ Placed)',
        selector: '#view-placement .grid-cols-1 > div:nth-child(1) p.font-bold',
        defaultText: 'Students Placed Nationwide'
      },
      {
        id: 'placement_stat2_title',
        section: 'Key Stats',
        label: 'Stat 2 Title (50+ Partners)',
        selector: '#view-placement .grid-cols-1 > div:nth-child(2) p.font-bold',
        defaultText: 'Active Recruiting Partners'
      },
      {
        id: 'placement_blueprint_title',
        section: 'Acceleration Blueprint',
        label: 'Blueprint Section Heading',
        selector: '#view-placement h3',
        defaultText: 'Our 3-Phase Placement Acceleration Blueprint'
      },
      {
        id: 'placement_phase1_desc',
        section: 'Acceleration Blueprint',
        label: 'Phase 1 Description (Skill Audit)',
        selector: '#view-placement .grid-cols-1 > div:nth-child(1) p.text-xs',
        defaultText: 'Evaluation of technical fundamentals, communication fluency, and domain competence to identify ideal roles.'
      },
      {
        id: 'placement_phase2_desc',
        section: 'Acceleration Blueprint',
        label: 'Phase 2 Description (Mock Drills)',
        selector: '#view-placement .grid-cols-1 > div:nth-child(2) p.text-xs',
        defaultText: 'Intensive corporate mock interviews, ATS resume optimization, group discussions, and HR etiquette training.'
      }
    ]
  },

  'view-global': {
    name: 'Global Header & Footer',
    icon: 'fa-globe',
    description: 'Institution branding, top navbar, emergency phone/WhatsApp, address, and copyright statement.',
    fields: [
      {
        id: 'global_academy_name',
        section: 'Institution Identity',
        label: 'Academy Brand Name',
        selector: '#navbar .font-extrabold',
        defaultText: 'Bright Career Academy.'
      },
      {
        id: 'global_academy_tagline',
        section: 'Institution Identity',
        label: 'Brand Tagline',
        selector: '#navbar .tracking-wide',
        defaultText: 'Education • Skill • Placement'
      },
      {
        id: 'global_phone',
        section: 'Contact Info',
        label: 'Primary Phone / WhatsApp Number',
        selector: '#contact a[href^="https://wa.me"], #contact p.font-mono, footer a[href^="tel:"]',
        defaultText: '+91 8101243220'
      },
      {
        id: 'global_whatsapp',
        section: 'Contact Info',
        label: 'Official WhatsApp Number',
        selector: 'a[href^="https://wa.me/918101243220"]',
        defaultText: '8101243220'
      },
      {
        id: 'global_email1',
        section: 'Contact Info',
        label: 'Official Email (info)',
        selector: 'a[href="mailto:info@brightcareeracademy.org"]',
        defaultText: 'info@brightcareeracademy.org'
      },
      {
        id: 'global_email2',
        section: 'Contact Info',
        label: 'Official Email (career)',
        selector: 'a[href="mailto:career@brightcareeracademy.org"]',
        defaultText: 'career@brightcareeracademy.org'
      },
      {
        id: 'global_email3',
        section: 'Contact Info',
        label: 'Official Email (Gmail)',
        selector: 'a[href="mailto:bcacademy608@gmail.com"]',
        defaultText: 'bcacademy608@gmail.com'
      },
      {
        id: 'global_address',
        section: 'Contact Info',
        label: 'Campus Physical Address',
        selector: '#contact .space-y-6 > div:nth-child(1) p',
        defaultText: 'Chinakuri, Paschim Bardhaman, West Bengal'
      },
      {
        id: 'global_footer_about',
        section: 'Footer',
        label: 'Footer About Statement',
        selector: 'footer p.text-gray-400',
        defaultText: 'Bright Career Academy is a premier educational consultancy, skill development centre, and career guidance institute based in West Bengal.'
      },
      {
        id: 'global_footer_copyright',
        section: 'Footer',
        label: 'Footer Copyright Notice',
        selector: 'footer p.text-gray-500',
        defaultText: '© 2026 Bright Career Academy. All rights reserved.'
      }
    ]
  }
};

/**
 * Read all customized texts from persistent localStorage
 */
export function getSavedSiteTexts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to parse site texts:', e);
    return {};
  }
}

/**
 * Save customized texts map to localStorage
 */
export function saveSiteTexts(textsMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(textsMap));
    return true;
  } catch (e) {
    console.error('Failed to save site texts:', e);
    return false;
  }
}

/**
 * Apply all saved customizations across DOM elements
 */
export function applySavedSiteTexts() {
  const saved = getSavedSiteTexts();
  const keys = Object.keys(saved);

  // Apply mapped fields across all 11 configs
  Object.keys(PAGE_TEXT_CONFIGS).forEach(pageId => {
    const config = PAGE_TEXT_CONFIGS[pageId];
    config.fields.forEach(field => {
      if (saved[field.id] !== undefined) {
        try {
          const targets = document.querySelectorAll(field.selector);
          targets.forEach(target => {
            if (target) {
              target.innerHTML = saved[field.id];
              target.classList.add('text-has-custom-override');
            }
          });
        } catch (err) {
          // Ignore invalid selector queries safely
        }
      }
    });
  });

  // Also apply any direct key overrides if present
  if (keys.length > 0) {
    keys.forEach(k => {
      if (!k.includes('/')) return; // Mapped field ids don't have slashes
      const el = document.querySelector(`[data-edit-key="${k}"]`);
      if (el) {
        el.innerHTML = saved[k];
        el.classList.add('text-has-custom-override');
      }
    });
  }

  updateCustomCountBadge();
}

/**
 * Switch Active Page inside the Admin Portal Text CMS
 */
export function switchAdminTextPage(pageKey) {
  if (PAGE_TEXT_CONFIGS[pageKey]) {
    currentActivePageKey = pageKey;
  }
  renderAdminPagePills();
  renderAdminPageTextForm();
}

/**
 * Render Page Selection Pills in Admin Portal
 */
export function renderAdminPagePills() {
  const container = document.getElementById('admin-text-page-pills');
  if (!container) return;

  const saved = getSavedSiteTexts();

  let html = '';
  Object.keys(PAGE_TEXT_CONFIGS).forEach(pageKey => {
    const config = PAGE_TEXT_CONFIGS[pageKey];
    const isActive = pageKey === currentActivePageKey;

    // Count how many overrides exist on this specific page
    const pageOverrides = config.fields.filter(f => saved[f.id] !== undefined).length;

    html += `
      <button type="button" onclick="switchAdminTextPage('${pageKey}')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/40' 
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
      }">
        <i class="fa-solid ${config.icon} text-xs ${isActive ? 'text-white' : 'text-blue-600'}"></i> 
        <span>${config.name}</span>
        ${pageOverrides > 0 ? `<span class="px-1.5 py-0.2 rounded-full text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-pink-100 text-pink-700'}">${pageOverrides}</span>` : ''}
      </button>
    `;
  });

  container.innerHTML = html;
}

/**
 * Filter text fields based on search query
 */
export function searchAdminTexts(query) {
  currentSearchQuery = (query || '').toLowerCase().trim();
  renderAdminPageTextForm();
}

/**
 * Render the Text Editing Form for the currently selected page
 */
export function renderAdminPageTextForm() {
  const formContainer = document.getElementById('admin-page-text-fields-container');
  const pageTitleEl = document.getElementById('admin-current-text-page-title');
  const pageDescEl = document.getElementById('admin-current-text-page-desc');
  if (!formContainer) return;

  const config = PAGE_TEXT_CONFIGS[currentActivePageKey];
  if (!config) return;

  if (pageTitleEl) {
    pageTitleEl.innerHTML = `<i class="fa-solid ${config.icon} text-blue-600 mr-2"></i> ${config.name} — Content Editor`;
  }
  if (pageDescEl) {
    pageDescEl.textContent = config.description;
  }

  const saved = getSavedSiteTexts();

  // Filter fields if search query is provided
  let filteredFields = config.fields;
  if (currentSearchQuery) {
    filteredFields = config.fields.filter(field => {
      const currentVal = saved[field.id] || field.defaultText;
      return (
        field.label.toLowerCase().includes(currentSearchQuery) ||
        field.id.toLowerCase().includes(currentSearchQuery) ||
        (field.section && field.section.toLowerCase().includes(currentSearchQuery)) ||
        currentVal.toLowerCase().includes(currentSearchQuery)
      );
    });
  }

  if (filteredFields.length === 0) {
    formContainer.innerHTML = `
      <div class="py-12 text-center text-gray-400">
        <i class="fa-solid fa-magnifying-glass text-3xl mb-2 text-gray-300"></i>
        <p class="text-xs font-bold text-gray-600">No fields matching "${currentSearchQuery}" on this page.</p>
        <button type="button" onclick="searchAdminTexts(''); document.getElementById('admin-text-search-input').value='';" class="mt-3 text-xs text-blue-600 hover:underline font-semibold cursor-pointer">
          Clear search filter
        </button>
      </div>
    `;
    return;
  }

  // Group fields by section
  const sections = {};
  filteredFields.forEach(field => {
    const sec = field.section || 'General Content';
    if (!sections[sec]) sections[sec] = [];
    sections[sec].push(field);
  });

  let html = `<div class="space-y-6">`;

  Object.keys(sections).forEach(secName => {
    html += `
      <div class="space-y-3">
        <div class="flex items-center gap-2 border-b border-gray-100 pb-1.5">
          <span class="text-[11px] font-black uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md">${secName}</span>
          <span class="text-[11px] text-gray-400 font-medium">${sections[secName].length} field(s)</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;

    sections[secName].forEach(field => {
      // Determine current value
      let currentVal = saved[field.id];
      if (currentVal === undefined) {
        try {
          const el = document.querySelector(field.selector);
          currentVal = el ? el.innerText.trim() : field.defaultText;
        } catch (e) {
          currentVal = field.defaultText;
        }
      }

      const isOverridden = saved[field.id] !== undefined;
      const isLongText = (currentVal && currentVal.length > 70) || field.label.toLowerCase().includes('desc') || field.label.toLowerCase().includes('paragraph');

      html += `
        <div class="admin-field-card ${isLongText ? 'md:col-span-2' : ''} bg-slate-50/70 p-4 rounded-2xl border ${isOverridden ? 'border-pink-300 bg-pink-50/20' : 'border-gray-200'} transition-all">
          <div class="flex justify-between items-center mb-1.5">
            <label for="input_${field.id}" class="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              ${field.label}
              ${isOverridden ? '<span class="bg-pink-100 text-pink-700 text-[9px] font-bold px-1.5 py-0.2 rounded">Customized</span>' : ''}
            </label>
            <span class="text-[10px] text-gray-400 font-mono">${field.id}</span>
          </div>

          ${
            isLongText 
              ? `<textarea id="input_${field.id}" name="${field.id}" rows="3" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed transition-all shadow-2xs">${escapeHtml(currentVal)}</textarea>`
              : `<input type="text" id="input_${field.id}" name="${field.id}" value="${escapeHtml(currentVal)}" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-2xs">`
          }

          <div class="flex justify-between items-center mt-2 text-[10px] text-gray-400">
            <span class="truncate max-w-xs" title="Target Selector: ${field.selector}">Target: <code class="font-mono text-[9px]">${field.selector}</code></span>
            ${isOverridden ? `
              <button type="button" onclick="revertSingleText('${field.id}')" class="text-red-500 hover:text-red-700 font-bold hover:underline cursor-pointer flex items-center gap-1">
                <i class="fa-solid fa-rotate-left"></i> Revert
              </button>
            ` : `
              <span class="text-gray-400">Original Default</span>
            `}
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  html += `
      <div class="pt-4 flex justify-between items-center border-t border-gray-100">
        <button type="button" onclick="resetCurrentPageTexts()" class="text-gray-500 hover:text-amber-700 font-semibold text-xs flex items-center gap-1 cursor-pointer">
          <i class="fa-solid fa-rotate-left"></i> Revert ${config.name} to Factory Default
        </button>
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center gap-2">
          <i class="fa-solid fa-floppy-disk"></i> Save & Publish ${config.name}
        </button>
      </div>
    </div>
  `;

  formContainer.innerHTML = html;
}

/**
 * Handle form submit for page content editing inside Admin Portal
 */
export function saveAdminPageTexts(event) {
  if (event) event.preventDefault();

  const config = PAGE_TEXT_CONFIGS[currentActivePageKey];
  if (!config) return;

  const currentSaved = getSavedSiteTexts();
  let changeCount = 0;

  config.fields.forEach(field => {
    const inputEl = document.getElementById(`input_${field.id}`);
    if (inputEl) {
      const newVal = inputEl.value.trim();
      if (newVal !== '') {
        currentSaved[field.id] = newVal;
        changeCount++;

        // Update DOM element directly
        try {
          const domEls = document.querySelectorAll(field.selector);
          domEls.forEach(el => {
            el.innerHTML = newVal;
            el.classList.add('text-has-custom-override');
          });
        } catch (e) {
          // Ignore
        }
      }
    }
  });

  saveSiteTexts(currentSaved);
  renderTextManagerPanel();

  if (window.showToast) {
    window.showToast(`Updated and saved text content for ${config.name}! Published live.`);
  }
}

/**
 * Preview the currently edited page directly on the website
 */
export function previewCurrentEditingPage() {
  if (window.exitAdminDashboard) {
    window.exitAdminDashboard();
  }
  
  if (window.navigateToView) {
    if (currentActivePageKey === 'view-global') {
      window.navigateToView('view-home');
    } else {
      window.navigateToView(currentActivePageKey);
    }
  }

  if (window.showToast) {
    window.showToast(`Previewing ${PAGE_TEXT_CONFIGS[currentActivePageKey]?.name || 'Page'}. To make more edits, reopen Admin Portal.`);
  }
}

/**
 * Reset all texts of the current page back to factory default
 */
export function resetCurrentPageTexts() {
  const config = PAGE_TEXT_CONFIGS[currentActivePageKey];
  if (!config) return;

  const confirmMsg = `Reset all text fields for "${config.name}" back to original defaults?`;
  
  if (window.showConfirmDialog) {
    window.showConfirmDialog(
      `Reset ${config.name}?`,
      confirmMsg,
      "Reset Page",
      () => performPageReset()
    );
  } else if (confirm(confirmMsg)) {
    performPageReset();
  }

  function performPageReset() {
    const saved = getSavedSiteTexts();
    config.fields.forEach(field => {
      delete saved[field.id];
    });
    saveSiteTexts(saved);
    applySavedSiteTexts();
    renderTextManagerPanel();

    if (window.showToast) {
      window.showToast(`Reset ${config.name} text content back to factory defaults.`);
    }
  }
}

/**
 * Reset all texts across the entire site to original default content
 */
export function resetSiteTextsToDefault() {
  const confirmMsg = "Are you sure you want to revert all custom text edits across EVERY page back to factory defaults? This cannot be undone.";

  if (window.showConfirmDialog) {
    window.showConfirmDialog(
      "Reset All Page Texts?",
      confirmMsg,
      "Reset Everything",
      () => performReset()
    );
  } else if (confirm(confirmMsg)) {
    performReset();
  }

  function performReset() {
    localStorage.removeItem(STORAGE_KEY);
    applySavedSiteTexts();
    renderTextManagerPanel();

    if (window.showToast) {
      window.showToast("All page texts reverted to original defaults.");
    }
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}

/**
 * Revert a single custom text override from the table
 */
export function revertSingleText(key) {
  const saved = getSavedSiteTexts();
  if (saved[key] !== undefined) {
    delete saved[key];
    saveSiteTexts(saved);
    applySavedSiteTexts();
    renderTextManagerPanel();

    if (window.showToast) {
      window.showToast(`Reverted text override for "${key}" to factory default.`);
    }
  }
}

/**
 * Render the Text Manager Panel inside Admin Dashboard CMS
 */
export function renderTextManagerPanel() {
  renderAdminPagePills();
  renderAdminPageTextForm();

  const tbody = document.getElementById('admin-texts-tbody');
  const countBadge = document.getElementById('admin-texts-count');
  const customCountBadge = document.getElementById('admin-custom-count-badge');
  const registryLabel = document.getElementById('admin-registry-count-label');

  const saved = getSavedSiteTexts();
  const keys = Object.keys(saved);

  if (countBadge) countBadge.textContent = keys.length;
  if (customCountBadge) customCountBadge.textContent = keys.length;
  if (registryLabel) registryLabel.textContent = `${keys.length} overrides active`;

  if (!tbody) return;

  if (keys.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="px-6 py-8 text-center text-gray-400 text-xs">
          <i class="fa-solid fa-circle-check text-2xl text-emerald-500 mb-2 block"></i>
          All pages are displaying verified default institutional text. Select any page above to customize copy.
        </td>
      </tr>
    `;
    return;
  }

  let html = '';
  keys.forEach((key, idx) => {
    const rawVal = saved[key];
    const preview = (rawVal || '').replace(/<[^>]*>/g, '').trim().slice(0, 90);

    // Identify which page this belongs to
    let pageLabel = 'Custom Element';
    Object.keys(PAGE_TEXT_CONFIGS).forEach(pKey => {
      if (PAGE_TEXT_CONFIGS[pKey].fields.some(f => f.id === key)) {
        pageLabel = PAGE_TEXT_CONFIGS[pKey].name;
      }
    });

    html += `
      <tr class="hover:bg-gray-50 text-xs">
        <td class="px-6 py-3 font-bold text-gray-400">${idx + 1}</td>
        <td class="px-6 py-3">
          <span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-mono font-bold text-[10px]">${pageLabel}</span>
          <p class="font-mono text-[10px] text-gray-400 mt-0.5 truncate max-w-xs" title="${key}">${key}</p>
        </td>
        <td class="px-6 py-3 text-gray-800 font-medium">
          <p class="line-clamp-2 max-w-md">${escapeHtml(preview)}</p>
        </td>
        <td class="px-6 py-3 text-right whitespace-nowrap">
          <button onclick="revertSingleText('${key}')" class="text-red-500 hover:text-red-700 font-bold px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer" title="Revert to original default text">
            <i class="fa-solid fa-rotate-left mr-1"></i> Revert
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

/**
 * Update the badge in sidebar and panels
 */
function updateCustomCountBadge() {
  const saved = getSavedSiteTexts();
  const count = Object.keys(saved).length;
  const countBadge = document.getElementById('admin-texts-count');
  const customCountBadge = document.getElementById('admin-custom-count-badge');
  if (countBadge) countBadge.textContent = count;
  if (customCountBadge) customCountBadge.textContent = count;
}

/**
 * Escape HTML special characters for form values
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Guard function: live editing on website is disabled as user requested
 * "Site text only edit from admin portal"
 */
export function toggleLiveEditMode(forceState) {
  if (window.openAdminLogin) {
    if (sessionStorage.getItem('bca_admin_session') !== 'true') {
      window.openAdminLogin();
      if (window.showToast) {
        window.showToast("Site text can only be edited from the Admin Portal. Please log in first.", true);
      }
    } else if (window.openAdminDashboard && window.switchAdminSection) {
      window.openAdminDashboard();
      window.switchAdminSection('panel-texts');
    }
  }
}

/**
 * Initialize the system on load
 */
export function initSiteTextSystem() {
  applySavedSiteTexts();

  // Hook into navigateToView to ensure customized text remains applied on dynamic page switching
  const origNavigate = window.navigateToView;
  if (typeof origNavigate === 'function') {
    window.navigateToView = function(viewId) {
      origNavigate(viewId);
      setTimeout(() => {
        applySavedSiteTexts();
      }, 30);
    };
  }
}
