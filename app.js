/**
 * Bright Career Academy - Application Script
 */
import { 
  initCourses, 
  refreshAllCourseViews, 
  openCourseModal, 
  closeCourseModal, 
  handleCourseSubmit, 
  deleteCourse, 
  setAdminCategoryFilter, 
  setAdminCourseSearch, 
  resetCoursesToDefault 
} from './course-manager.js';

import {
  initStudents,
  getStudents,
  saveStudents,
  updateStudentKpis,
  renderAdminStudentsTable,
  setStudentSearch,
  openStudentModal,
  closeStudentModal,
  handleStudentSubmit,
  deleteStudent,
  deleteStudentFromModal,
  authenticateStudent,
  renderStudentDashboard,
  loginAsStudentDirectly
} from './student-manager.js';

import {
  initSiteTextSystem,
  applySavedSiteTexts,
  toggleLiveEditMode,
  saveAdminPageTexts,
  resetCurrentPageTexts,
  resetSiteTextsToDefault,
  renderTextManagerPanel,
  revertSingleText,
  switchAdminTextPage,
  searchAdminTexts,
  previewCurrentEditingPage
} from './text-editor.js';

// Expose Course Manager API to window for inline onclick handlers
window.openCourseModal = openCourseModal;
window.closeCourseModal = closeCourseModal;
window.handleCourseSubmit = handleCourseSubmit;
window.editCourse = openCourseModal;
window.deleteCourse = deleteCourse;
window.setAdminCategoryFilter = setAdminCategoryFilter;
window.setAdminCourseSearch = setAdminCourseSearch;
window.resetCoursesToDefault = resetCoursesToDefault;

// Expose Student Manager API to window
window.openStudentModal = openStudentModal;
window.closeStudentModal = closeStudentModal;
window.handleStudentSubmit = handleStudentSubmit;
window.deleteStudent = deleteStudent;
window.deleteStudentFromModal = deleteStudentFromModal;
window.setStudentSearch = setStudentSearch;
window.loginAsStudentDirectly = loginAsStudentDirectly;

// Expose Admin Portal Site Text CMS API to window
window.toggleLiveEditMode = toggleLiveEditMode;
window.saveAdminPageTexts = saveAdminPageTexts;
window.resetCurrentPageTexts = resetCurrentPageTexts;
window.resetSiteTextsToDefault = resetSiteTextsToDefault;
window.renderTextManagerPanel = renderTextManagerPanel;
window.revertSingleText = revertSingleText;
window.applySavedSiteTexts = applySavedSiteTexts;
window.switchAdminTextPage = switchAdminTextPage;
window.searchAdminTexts = searchAdminTexts;
window.previewCurrentEditingPage = previewCurrentEditingPage;

// Confirmation Dialog System
window.showConfirmDialog = function(title, message, confirmBtnText, onConfirmCallback) {
  const modal = document.getElementById('confirm-dialog-modal');
  const titleEl = document.getElementById('confirm-dialog-title');
  const msgEl = document.getElementById('confirm-dialog-message');
  const confirmBtn = document.getElementById('confirm-dialog-btn');

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;
  if (confirmBtn) {
    confirmBtn.textContent = confirmBtnText || 'Delete';
    confirmBtn.onclick = () => {
      window.closeConfirmDialog();
      if (typeof onConfirmCallback === 'function') {
        onConfirmCallback();
      }
    };
  }

  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
  }
};

window.closeConfirmDialog = function() {
  const modal = document.getElementById('confirm-dialog-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
};

// Initial Sample Data for Admissions CRM
const DEFAULT_ENQUIRIES = [
  {
    id: "ENQ-101",
    name: "Aarav Sen",
    phone: "+91 98310 44552",
    service: "Diploma Courses (Civil Engineering)",
    message: "Seeking admission guidance for 3-year polytechnic diploma after 10th standard.",
    date: "Today, 10:24 AM",
    status: "New"
  },
  {
    id: "ENQ-102",
    name: "Pooja Banerjee",
    phone: "+91 98745 61230",
    service: "Vocational Training (Tally Prime + GST)",
    message: "Interested in the 3-6 month accounting and Tally Prime certification course.",
    date: "Yesterday, 3:45 PM",
    status: "Contacted"
  },
  {
    id: "ENQ-103",
    name: "Vikram Mondal",
    phone: "+91 89721 00981",
    service: "B.Tech / B.E. Programs",
    message: "Enquiring about the 100% Tuition Fee Scholarship scheme for Computer Science.",
    date: "2 days ago",
    status: "Enrolled"
  }
];

// Initialize LocalStorage Enquiries if empty
if (!localStorage.getItem('bca_enquiries')) {
  localStorage.setItem('bca_enquiries', JSON.stringify(DEFAULT_ENQUIRIES));
}

// Global functions attached to window
window.navigateToView = function(viewId) {
  document.querySelectorAll('.page-view').forEach(el => {
    el.classList.remove('active');
  });
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Close mobile menu if open
  closeMobileMenu();
};

window.navigateAndScroll = function(viewId, sectionId) {
  window.navigateToView(viewId);
  setTimeout(() => {
    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
};

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.querySelector('#mobile-menu-btn i');
  if (menu && !menu.classList.contains('hidden')) {
    menu.classList.add('hidden');
    if (icon) {
      icon.className = 'fa-solid fa-bars text-2xl pointer-events-none';
    }
  }
}

window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.querySelector('#mobile-menu-btn i');
  if (menu) {
    const isHidden = menu.classList.toggle('hidden');
    if (icon) {
      icon.className = isHidden 
        ? 'fa-solid fa-bars text-2xl pointer-events-none'
        : 'fa-solid fa-xmark text-2xl pointer-events-none';
    }
  }
};

// Toast notification
window.showToast = function(message, isError = false) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : ''}`;
  const icon = isError ? 
    '<i class="fa-solid fa-circle-exclamation text-red-500 text-xl"></i>' : 
    '<i class="fa-solid fa-circle-check text-green-500 text-xl"></i>';
    
  toast.innerHTML = `${icon}<span class="text-gray-800 text-sm leading-snug">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 20);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
};

// Enquiry - Form (pop up) Modal Management (Client Requirement)
window.openEnquiryModal = function(preselectedCategory) {
  const modal = document.getElementById('enquiry-popup-modal');
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      const content = document.getElementById('enquiry-popup-content');
      if (content) {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
      }
    }, 10);
    document.body.style.overflow = 'hidden';

    if (preselectedCategory) {
      const select = document.getElementById('popup-enquiry-category');
      if (select) select.value = preselectedCategory;
    }
  }
};

window.closeEnquiryModal = function() {
  const modal = document.getElementById('enquiry-popup-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    const content = document.getElementById('enquiry-popup-content');
    if (content) {
      content.classList.remove('scale-100');
      content.classList.add('scale-95');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }
};

window.handlePopupEnquirySubmit = function(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('popup-enquiry-name')?.value.trim();
  const phone = document.getElementById('popup-enquiry-phone')?.value.trim();
  const email = document.getElementById('popup-enquiry-email')?.value.trim();
  const category = document.getElementById('popup-enquiry-category')?.value;
  const message = document.getElementById('popup-enquiry-msg')?.value.trim();

  if (!name || !phone || !email || !category) {
    window.showToast("Please provide all required fields (Name, Contact/WhatsApp, Email, and Menu option)!", true);
    return;
  }

  // Save to CRM localStorage
  try {
    const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
    const newEnquiry = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name,
      phone: phone,
      email: email,
      service: category,
      message: message || `Enquiry for ${category}. WhatsApp/Call requested at ${phone}`,
      date: 'Just now',
      status: 'New'
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
    if (typeof renderEnquiriesTable === 'function') {
      renderEnquiriesTable();
    }
  } catch (err) {
    console.error(err);
  }

  const form = document.getElementById('popup-enquiry-form');
  if (form) form.reset();
  window.closeEnquiryModal();
  window.showToast(`Thank you, ${name}! Your enquiry for "${category}" has been received. Our team will contact you on WhatsApp (+91 8101243220).`);
};

// ==========================================
// ONLINE FEE & COURSE PAYMENT SYSTEM
// ==========================================
window.openPaymentModal = function(purpose, amount, studentId, studentName) {
  const modal = document.getElementById('quick-payment-modal');
  if (modal) {
    if (purpose) {
      const purpSelect = document.getElementById('pay-purpose');
      if (purpSelect) {
        purpSelect.value = purpose;
      }
    }
    if (amount) {
      const amtInput = document.getElementById('pay-amount');
      if (amtInput) amtInput.value = amount;
    }
    if (studentId) {
      const idInput = document.getElementById('pay-studentid');
      if (idInput) idInput.value = studentId;
    }
    if (studentName) {
      const nameInput = document.getElementById('pay-name');
      if (nameInput) nameInput.value = studentName;
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      const content = document.getElementById('quick-payment-content');
      if (content) {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
      }
    }, 10);
    document.body.style.overflow = 'hidden';
  }
};

window.closePaymentModal = function() {
  const modal = document.getElementById('quick-payment-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    const content = document.getElementById('quick-payment-content');
    if (content) {
      content.classList.remove('scale-100');
      content.classList.add('scale-95');
    }
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }
};

window.updatePaymentAmountFromSelect = function(purpose) {
  const select = document.getElementById('pay-purpose');
  const amountInput = document.getElementById('pay-amount');
  if (select && amountInput) {
    const selectedOption = select.options[select.selectedIndex];
    const amount = selectedOption?.getAttribute('data-amount');
    if (amount) {
      amountInput.value = amount;
    }
  }
};

window.updatePagePaymentAmountFromSelect = function(purpose) {
  const select = document.getElementById('page-pay-purpose');
  const amountInput = document.getElementById('page-pay-amount');
  if (select && amountInput) {
    const selectedOption = select.options[select.selectedIndex];
    const amount = selectedOption?.getAttribute('data-amount');
    if (amount) {
      amountInput.value = amount;
    }
  }
};

window.setPaymentQuickAmount = function(purpose, amount) {
  const pagePurpose = document.getElementById('page-pay-purpose');
  const pageAmount = document.getElementById('page-pay-amount');
  if (pagePurpose && pageAmount) {
    pagePurpose.value = purpose;
    pageAmount.value = amount;
    window.showToast(`Selected "${purpose}" — ₹${amount}`);
    document.getElementById('page-payment-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

window.switchPaymentTab = function(mode) {
  ['upi', 'card', 'netbanking'].forEach(m => {
    const tab = document.getElementById(`tab-pay-${m}`);
    const content = document.getElementById(`pay-content-${m}`);
    if (tab && content) {
      if (m === mode) {
        tab.classList.add('border-emerald-600', 'bg-emerald-50', 'text-emerald-900');
        tab.classList.remove('border-gray-200', 'bg-white', 'text-gray-600');
        content.classList.remove('hidden');
      } else {
        tab.classList.remove('border-emerald-600', 'bg-emerald-50', 'text-emerald-900');
        tab.classList.add('border-gray-200', 'bg-white', 'text-gray-600');
        content.classList.add('hidden');
      }
    }
  });
};

window.switchPagePaymentTab = function(mode) {
  ['upi', 'card', 'netbanking'].forEach(m => {
    const tab = document.getElementById(`page-tab-pay-${m}`);
    const content = document.getElementById(`page-pay-content-${m}`);
    if (tab && content) {
      if (m === mode) {
        tab.classList.add('border-emerald-600', 'bg-emerald-50', 'text-emerald-900');
        tab.classList.remove('border-gray-200', 'bg-white', 'text-gray-600');
        content.classList.remove('hidden');
      } else {
        tab.classList.remove('border-emerald-600', 'bg-emerald-50', 'text-emerald-900');
        tab.classList.add('border-gray-200', 'bg-white', 'text-gray-600');
        content.classList.add('hidden');
      }
    }
  });
};

window.copyUpiId = function() {
  const upi = '8101243220@upi';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(upi).then(() => {
      window.showToast("UPI ID 8101243220@upi copied to clipboard!");
    }).catch(() => {
      window.showToast("UPI ID: 8101243220@upi");
    });
  } else {
    window.showToast("UPI ID: 8101243220@upi");
  }
};

window.handleOnlinePayment = function(event) {
  if (event) event.preventDefault();
  
  // Determine if submitted from quick modal or full page view
  const isPageForm = event?.target?.id === 'page-payment-form';
  const prefix = isPageForm ? 'page-pay-' : 'pay-';
  
  const name = document.getElementById(`${prefix}name`)?.value.trim();
  const phone = document.getElementById(`${prefix}phone`)?.value.trim();
  const email = document.getElementById(`${prefix}email`)?.value.trim();
  const studentId = document.getElementById(`${prefix}studentid`)?.value.trim() || 'N/A';
  const purpose = document.getElementById(`${prefix}purpose`)?.value;
  const amount = document.getElementById(`${prefix}amount`)?.value;

  if (!name || !phone || !email || !amount || Number(amount) < 10) {
    window.showToast("Please provide all required fields with a valid amount (min ₹10)!", true);
    return;
  }

  // Show processing loader modal
  const procModal = document.getElementById('payment-processing-modal');
  if (procModal) {
    procModal.classList.remove('hidden');
    setTimeout(() => procModal.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
  }

  // Close quick payment modal if open
  window.closePaymentModal();

  setTimeout(() => {
    // Hide processing loader modal
    if (procModal) {
      procModal.classList.add('opacity-0');
      setTimeout(() => procModal.classList.add('hidden'), 200);
    }

    const randomTxnNum = Math.floor(10000 + Math.random() * 90000);
    const txnId = `BCA-TXN-2026-${randomTxnNum}`;
    const dateFormatted = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const txnData = {
      txnId,
      name,
      phone,
      email,
      studentId,
      purpose,
      amount: `₹${Number(amount).toLocaleString('en-IN')}`,
      rawAmount: Number(amount),
      date: dateFormatted,
      mode: 'UPI / Direct Bank (Verified)',
      status: 'Success'
    };

    // Store in localStorage
    try {
      const transactions = JSON.parse(localStorage.getItem('bca_transactions') || '[]');
      transactions.unshift(txnData);
      localStorage.setItem('bca_transactions', JSON.stringify(transactions));
    } catch (e) {
      console.error(e);
    }

    // Reset forms
    document.getElementById('quick-payment-form')?.reset();
    document.getElementById('page-payment-form')?.reset();

    // Show celebratory success modal
    window.showPaymentSuccessModal(txnData);
  }, 1200);
};

window.showPaymentSuccessModal = function(txnData) {
  const succModal = document.getElementById('payment-success-modal');
  if (succModal) {
    document.getElementById('succ-txnid').textContent = txnData.txnId;
    document.getElementById('succ-name').textContent = txnData.name;
    document.getElementById('succ-phone').textContent = txnData.phone;
    document.getElementById('succ-email').textContent = txnData.email;
    document.getElementById('succ-purpose').textContent = txnData.purpose;
    document.getElementById('succ-mode').textContent = txnData.mode;
    document.getElementById('succ-date').textContent = txnData.date;
    document.getElementById('succ-amount').textContent = txnData.amount;

    const waMsg = encodeURIComponent(`Hello Bright Career Academy, I have completed the online fee payment.\n\n*Transaction ID:* ${txnData.txnId}\n*Name:* ${txnData.name}\n*Purpose:* ${txnData.purpose}\n*Amount:* ${txnData.amount}\n*Date:* ${txnData.date}\n\nPlease verify and acknowledge.`);
    const waLink = document.getElementById('succ-whatsapp-share');
    if (waLink) {
      waLink.href = `https://wa.me/918101243220?text=${waMsg}`;
    }

    succModal.classList.remove('hidden');
    setTimeout(() => {
      succModal.classList.remove('opacity-0');
      const content = document.getElementById('payment-success-content');
      if (content) {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
      }
    }, 10);
    document.body.style.overflow = 'hidden';

    window.showToast(`🎉 Payment of ${txnData.amount} Successful! Receipt generated.`);
  }
};

window.closePaymentSuccessModal = function() {
  const succModal = document.getElementById('payment-success-modal');
  if (succModal) {
    succModal.classList.add('opacity-0');
    const content = document.getElementById('payment-success-content');
    if (content) {
      content.classList.remove('scale-100');
      content.classList.add('scale-95');
    }
    setTimeout(() => {
      succModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }
};

window.printPaymentReceipt = function() {
  const txnId = document.getElementById('succ-txnid')?.textContent || 'BCA-TXN';
  const name = document.getElementById('succ-name')?.textContent || '';
  const phone = document.getElementById('succ-phone')?.textContent || '';
  const email = document.getElementById('succ-email')?.textContent || '';
  const purpose = document.getElementById('succ-purpose')?.textContent || '';
  const amount = document.getElementById('succ-amount')?.textContent || '';
  const date = document.getElementById('succ-date')?.textContent || '';

  const printWindow = window.open('', '_blank', 'width=750,height=800');
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Fee Payment Receipt - ${txnId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; background: #fff; }
          .receipt-box { border: 2px solid #047857; border-radius: 16px; padding: 30px; max-width: 650px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
          .logo-title h1 { margin: 0; font-size: 22px; color: #047857; }
          .logo-title p { margin: 4px 0 0; font-size: 12px; color: #64748b; }
          .badge { background: #d1fae5; color: #065f46; font-weight: bold; padding: 6px 12px; border-radius: 20px; font-size: 12px; }
          .details-table { width: 100%; border-collapse: collapse; margin-top: 25px; }
          .details-table td { padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
          .details-table td.label { color: #64748b; font-weight: 500; }
          .details-table td.val { font-weight: bold; text-align: right; }
          .total-row td { border-top: 2px dashed #cbd5e1; font-size: 16px; font-weight: 900; color: #047857; padding-top: 15px; }
          .footer { margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 11px; color: #64748b; }
          .stamp { text-align: center; border: 2px dashed #047857; padding: 10px 15px; border-radius: 8px; color: #047857; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="receipt-box">
          <div class="header">
            <div class="logo-title">
              <h1>BRIGHT CAREER ACADEMY</h1>
              <p>Chinakuri, Paschim Bardhaman, West Bengal • Official Fee Receipt</p>
              <p>Email: bcacademy608@gmail.com • WhatsApp: +91 8101243220</p>
            </div>
            <div class="badge">PAID & VERIFIED</div>
          </div>
          <table class="details-table">
            <tr><td class="label">Transaction Reference ID:</td><td class="val">${txnId}</td></tr>
            <tr><td class="label">Candidate / Student Name:</td><td class="val">${name}</td></tr>
            <tr><td class="label">Contact / Phone Number:</td><td class="val">${phone}</td></tr>
            <tr><td class="label">Receipt Email:</td><td class="val">${email}</td></tr>
            <tr><td class="label">Fee Purpose / Category:</td><td class="val">${purpose}</td></tr>
            <tr><td class="label">Payment Mode:</td><td class="val">Online UPI (8101243220@upi)</td></tr>
            <tr><td class="label">Transaction Date & Time:</td><td class="val">${date}</td></tr>
            <tr class="total-row"><td class="label">Total Amount Paid:</td><td class="val">${amount}</td></tr>
          </table>
          <div class="footer">
            <div>
              <p>This is a computer-generated digital tax receipt.</p>
              <p>Authorized by Accounts Division, Bright Career Academy.</p>
            </div>
            <div class="stamp">
              BRIGHT CAREER ACADEMY<br>
              <small>FEE VERIFIED ✓</small>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  } else {
    window.print();
  }
};

// Form handling
window.showFormMessage = function() {
  const name = document.getElementById('contact-name')?.value.trim();
  const phone = document.getElementById('contact-phone')?.value.trim();
  const email = document.getElementById('contact-email')?.value.trim();
  const service = document.getElementById('contact-service')?.value;
  const message = document.getElementById('contact-msg')?.value.trim();

  if (!name || !phone) {
    window.showToast('Please provide your name and phone number', true);
    return;
  }

  // Save enquiry to localStorage
  try {
    const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
    const newEnquiry = {
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name,
      phone: phone,
      email: email || 'Not provided',
      service: service || 'General Consultation',
      message: message || `Admission enquiry submitted for ${service}.`,
      date: 'Just now',
      status: 'New'
    };
    enquiries.unshift(newEnquiry);
    localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
    if (typeof renderEnquiriesTable === 'function') {
      renderEnquiriesTable();
    }
  } catch (e) {
    console.error(e);
  }

  const form = document.getElementById('contact-form');
  if (form) form.reset();
  window.showToast("Message sent successfully! Our counsellor will call or message you on WhatsApp (+91 8101243220).");
};

// Coaching Admissions Form (Nursery to 12th)
window.submitCoachingEnquiry = function(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('coach-name')?.value.trim();
  const phone = document.getElementById('coach-phone')?.value.trim();
  const studentClass = document.getElementById('coach-class')?.value;
  const board = document.getElementById('coach-board')?.value;
  const timing = document.getElementById('coach-timing')?.value;

  if (!name || !phone) {
    window.showToast("Please enter candidate name and contact number", true);
    return;
  }

  try {
    const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
    enquiries.unshift({
      id: `COACH-${Math.floor(100 + Math.random() * 900)}`,
      name: name,
      phone: phone,
      service: `Coaching: ${studentClass} (${board})`,
      message: `Preferred Batch: ${timing}. Requested admission & demo class.`,
      date: 'Just now',
      status: 'New'
    });
    localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
    renderEnquiriesTable();
  } catch(e) { console.error(e); }

  document.getElementById('coaching-enquiry-form')?.reset();
  window.showToast(`Admission enquiry registered for ${name}! Academic coordinator will call you.`);
};

// Scholarship Exam Registration with Hall Ticket Generator
window.registerScholarshipExam = function(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('stse-name')?.value.trim();
  const parent = document.getElementById('stse-parent')?.value.trim();
  const phone = document.getElementById('stse-phone')?.value.trim();
  const studentClass = document.getElementById('stse-class')?.value;
  const mode = document.getElementById('stse-mode')?.value;
  const center = document.getElementById('stse-center')?.value;

  if (!name || !phone) {
    window.showToast("Please fill in Student Name and Contact Phone", true);
    return;
  }

  const rollNumber = `BC-STSE-${Math.floor(10000 + Math.random() * 90000)}`;
  const examDate = "Sunday, 25th October 2026 (11:00 AM - 01:00 PM)";

  try {
    const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
    enquiries.unshift({
      id: rollNumber,
      name: `${name} (Parent: ${parent || 'N/A'})`,
      phone: phone,
      service: `Scholarship Exam: ${studentClass}`,
      message: `Mode: ${mode}, Center: ${center}, Roll No: ${rollNumber}`,
      date: 'Just now',
      status: 'New'
    });
    localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
    renderEnquiriesTable();
  } catch(e) { console.error(e); }

  // Render Hall Ticket Slip
  const receiptBox = document.getElementById('scholarship-hallticket-slip');
  const detailsBox = document.getElementById('scholarship-slip-details');
  if (receiptBox && detailsBox) {
    detailsBox.innerHTML = `
      <div class="bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-6 text-left space-y-3">
        <div class="flex justify-between items-start border-b border-amber-200 pb-3">
          <div>
            <span class="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">Provisional Hall Ticket</span>
            <h4 class="text-lg font-black text-gray-900 mt-1">National Talent Search & Scholarship Exam (BC-STSE)</h4>
          </div>
          <div class="text-right">
            <span class="text-xs text-gray-500 font-bold block">Application / Roll No</span>
            <span class="text-sm font-mono font-bold text-amber-700 bg-white px-2.5 py-1 rounded-md border border-amber-200">${rollNumber}</span>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div><strong class="text-gray-500">Candidate Name:</strong> <p class="text-gray-900 font-bold">${name}</p></div>
          <div><strong class="text-gray-500">Contact Number:</strong> <p class="text-gray-900 font-bold">${phone}</p></div>
          <div><strong class="text-gray-500">Registered Class / Stream:</strong> <p class="text-gray-900 font-bold">${studentClass}</p></div>
          <div><strong class="text-gray-500">Examination Mode & Center:</strong> <p class="text-gray-900 font-bold">${mode} • ${center}</p></div>
          <div class="sm:col-span-2"><strong class="text-gray-500">Schedule & Reporting Time:</strong> <p class="text-amber-900 font-bold">${examDate}</p></div>
        </div>
        <div class="pt-2 text-[11px] text-gray-600 flex items-center justify-between border-t border-amber-200">
          <span>✓ Bring a printed copy or photo ID on the exam day.</span>
          <button type="button" onclick="window.print()" class="text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-lg cursor-pointer">
            <i class="fa-solid fa-print"></i> Print Hall Ticket
          </button>
        </div>
      </div>
    `;
    receiptBox.classList.remove('hidden');
    receiptBox.scrollIntoView({ behavior: 'smooth' });
  }

  document.getElementById('stse-registration-form')?.reset();
  window.showToast(`Scholarship Registration Confirmed! Roll No: ${rollNumber}`);
};

// JEE & NEET Foundation Registration
window.registerJeeNeet = function(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('jeeneet-name')?.value.trim();
  const phone = document.getElementById('jeeneet-phone')?.value.trim();
  const target = document.getElementById('jeeneet-target')?.value;
  const currentClass = document.getElementById('jeeneet-class')?.value;

  if (!name || !phone) {
    window.showToast("Please enter candidate name and phone", true);
    return;
  }

  try {
    const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
    enquiries.unshift({
      id: `JN-${Math.floor(100 + Math.random() * 900)}`,
      name: name,
      phone: phone,
      service: `JEE/NEET Prep: ${target}`,
      message: `Class: ${currentClass}. Registered for Diagnostic Screening & Scholarship Test.`,
      date: 'Just now',
      status: 'New'
    });
    localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
    renderEnquiriesTable();
  } catch(e) { console.error(e); }

  document.getElementById('jeeneet-form')?.reset();
  window.showToast("Application received! Free 1-on-1 Academic Diagnosis & Seat Reservation scheduled.");
};

// Government Skill Development Program Application
window.submitGovtSkillApplication = function(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('skill-name')?.value.trim();
  const phone = document.getElementById('skill-phone')?.value.trim();
  const sector = document.getElementById('skill-sector')?.value;
  const qual = document.getElementById('skill-qual')?.value;
  const district = document.getElementById('skill-district')?.value.trim();

  if (!name || !phone) {
    window.showToast("Please provide your name and mobile number", true);
    return;
  }

  try {
    const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
    enquiries.unshift({
      id: `PMKVY-${Math.floor(100 + Math.random() * 900)}`,
      name: name,
      phone: phone,
      service: `Govt Skill: ${sector}`,
      message: `Qualification: ${qual}, District: ${district || 'West Bengal'}. Free Govt Training enrolled.`,
      date: 'Just now',
      status: 'New'
    });
    localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
    renderEnquiriesTable();
  } catch(e) { console.error(e); }

  document.getElementById('govtskill-form')?.reset();
  window.showToast("Application submitted! Our Govt Skill Scheme nodal officer will contact you for document verification.");
};

// Govt Exam Coaching Registration
window.submitGovtExamEnquiry = function(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('govexam-name')?.value.trim();
  const phone = document.getElementById('govexam-phone')?.value.trim();
  const exam = document.getElementById('govexam-target')?.value;

  if (!name || !phone) {
    window.showToast("Please enter name and phone number", true);
    return;
  }

  try {
    const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
    enquiries.unshift({
      id: `GOV-${Math.floor(100 + Math.random() * 900)}`,
      name: name,
      phone: phone,
      service: `Govt Exam Prep: ${exam}`,
      message: `Requested Free Mock Test Pass & Classroom Batch counseling.`,
      date: 'Just now',
      status: 'New'
    });
    localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
    renderEnquiriesTable();
  } catch(e) { console.error(e); }

  document.getElementById('govexam-form')?.reset();
  window.showToast("Free Mock Test & Batch details sent to your phone! Academic advisor will assist you.");
};

// Preloader & Scroll Animation
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader && preloader.style.visibility !== 'hidden') {
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';
    document.body.classList.remove('overflow-hidden');
    initScrollAnimations();
    setTimeout(() => {
      preloader.style.visibility = 'hidden';
    }, 600);
  }
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// Window load with safety timeout
window.addEventListener('load', () => {
  initCourses();
  refreshAllCourseViews();
  initStudents();
  updateStudentKpis();
  initSiteTextSystem();
  setTimeout(hidePreloader, 600);
});
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCourses();
    refreshAllCourseViews();
    initStudents();
    updateStudentKpis();
    initSiteTextSystem();
  });
} else {
  initCourses();
  refreshAllCourseViews();
  initStudents();
  updateStudentKpis();
  initSiteTextSystem();
}
setTimeout(hidePreloader, 2000); // Safety fallback if assets load slowly

// Navbar scroll shadow
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md');
      navbar.classList.remove('shadow-sm');
    } else {
      navbar.classList.remove('shadow-md');
      navbar.classList.add('shadow-sm');
    }
  }
});

// Admin Modal Logic
window.openAdminLogin = function() {
  const modal = document.getElementById('admin-login-modal');
  const content = document.getElementById('admin-modal-content');
  if (modal && content) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      content.classList.remove('scale-95');
    }, 10);
  }
};

window.closeAdminLogin = function() {
  const modal = document.getElementById('admin-login-modal');
  const content = document.getElementById('admin-modal-content');
  if (modal && content) {
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    setTimeout(() => {
      modal.classList.add('hidden');
      if (window.location.hash === '#admin') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }, 300);
  }
};

window.togglePasswordVisibility = function() {
  const passInput = document.getElementById('admin-password');
  const eyeIcon = document.getElementById('admin-eye-icon');
  if (passInput && eyeIcon) {
    if (passInput.type === 'password') {
      passInput.type = 'text';
      eyeIcon.className = 'fa-regular fa-eye-slash absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-sm cursor-pointer';
    } else {
      passInput.type = 'password';
      eyeIcon.className = 'fa-regular fa-eye absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm cursor-pointer hover:text-gray-600';
    }
  }
};

window.switchAdminTab = function(tab) {
  const sysTab = document.getElementById('tab-sysadmin');
  const staffTab = document.getElementById('tab-staff');
  const userInput = document.getElementById('admin-username');
  const userLabel = document.getElementById('admin-user-label');
  const passInput = document.getElementById('admin-password');
  
  if (tab === 'staff') {
    staffTab.className = "flex-1 text-center py-2 bg-white rounded-lg shadow-sm text-blue-600 text-xs font-bold border border-gray-100 flex items-center justify-center gap-2 cursor-pointer";
    sysTab.className = "flex-1 text-center py-2 text-gray-500 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:text-gray-700";
    if (userInput) {
      userInput.placeholder = "Enter Staff ID";
      userInput.value = "";
    }
    if (passInput) passInput.value = "";
    if (userLabel) userLabel.textContent = "Staff Identity ID";
  } else {
    sysTab.className = "flex-1 text-center py-2 bg-white rounded-lg shadow-sm text-blue-600 text-xs font-bold border border-gray-100 flex items-center justify-center gap-2 cursor-pointer";
    staffTab.className = "flex-1 text-center py-2 text-gray-500 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:text-gray-700";
    if (userInput) {
      userInput.placeholder = "Enter System ID";
      userInput.value = "";
    }
    if (passInput) passInput.value = "";
    if (userLabel) userLabel.textContent = "System Account ID";
  }
};

window.processAdminLogin = function(event) {
  if (event) event.preventDefault();
  const user = document.getElementById('admin-username');
  const pass = document.getElementById('admin-password');
  
  const userVal = user ? user.value.trim() : '';
  const passVal = pass ? pass.value.trim() : '';

  // Stored password or default
  const savedPass = localStorage.getItem('bca_admin_password') || 'icse';
  const savedStaffId = localStorage.getItem('bca_staff_id') || 'admin';
  const savedStaffPass = localStorage.getItem('bca_staff_password') || savedPass;
  const cleanUser = userVal.toLowerCase();

  // Support System Admin & Staff ID
  const isValidAdmin = (cleanUser === 'zunayedk886@gmail.com' || cleanUser === 'admin@brightcareer.in') && (passVal === savedPass);
  const isValidStaff = (cleanUser === savedStaffId.toLowerCase() || (savedStaffId === 'admin' && (cleanUser === 'admin' || cleanUser === 'staff'))) && (passVal === savedStaffPass || passVal === savedPass);

  if (isValidAdmin || isValidStaff) {
    sessionStorage.setItem('bca_admin_session', 'true');
    window.closeAdminLogin();
    setTimeout(() => {
      window.openAdminDashboard();
      window.showToast(`Authenticated successfully as ${isValidStaff ? 'Staff Administrator' : 'System Administrator'}!`);
    }, 300);
    if (user) user.value = '';
    if (pass) pass.value = '';
  } else {
    window.showToast("Invalid System ID or Password!", true);
  }
};

window.openAdminDashboard = function() {
  document.body.style.overflow = 'hidden';
  const dashboard = document.getElementById('admin-dashboard-view');
  if (dashboard) {
    dashboard.classList.remove('hidden');
    setTimeout(() => {
      dashboard.classList.remove('opacity-0');
    }, 10);
    renderEnquiriesTable();
    refreshAllCourseViews();
    renderAdminStudentsTable();
    updateStudentKpis();
    refreshSecurityPanel();
    renderTextManagerPanel();
  }
};

window.exitAdminDashboard = function() {
  const dashboard = document.getElementById('admin-dashboard-view');
  if (dashboard) {
    dashboard.classList.add('opacity-0');
    setTimeout(() => {
      dashboard.classList.add('hidden');
      document.body.style.overflow = '';
      if (window.location.hash === '#admin') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }, 300);
  }
};

window.switchAdminSection = function(sectionId) {
  document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById(sectionId);
  if (target) target.classList.remove('hidden');

  if (sectionId === 'panel-security') {
    refreshSecurityPanel();
  } else if (sectionId === 'panel-texts') {
    renderTextManagerPanel();
  }

  // Update active sidebar button
  document.querySelectorAll('.admin-nav-item').forEach(btn => {
    btn.classList.remove('bg-teal-700', 'text-white');
    btn.classList.add('text-gray-600', 'hover:bg-gray-50');
  });
  const activeBtn = document.getElementById(`nav-${sectionId}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-50');
    activeBtn.classList.add('bg-teal-700', 'text-white');
  }

  if (sectionId === 'panel-courses') {
    refreshAllCourseViews();
  } else if (sectionId === 'panel-students') {
    renderAdminStudentsTable();
    updateStudentKpis();
  }
};

// Render Admissions CRM Table
function renderEnquiriesTable() {
  const tbody = document.getElementById('crm-enquiries-tbody');
  const kpiCount = document.getElementById('kpi-enquiry-count');
  const badgeNew = document.getElementById('badge-new-enquiries');
  if (!tbody) return;

  const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
  if (kpiCount) kpiCount.textContent = enquiries.length;
  const newCount = enquiries.filter(e => e.status === 'New').length;
  if (badgeNew) badgeNew.textContent = `${newCount} New`;

  if (enquiries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">No enquiries received yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = enquiries.map((enq, index) => {
    const cleanPhone = (enq.phone || '').replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    return `
    <tr class="hover:bg-gray-50/80 border-b border-gray-100 transition-colors">
      <td class="px-6 py-4">
        <div class="font-bold text-gray-900">${enq.name}</div>
        <div class="text-[11px] text-gray-400 font-mono">${enq.id} • ${enq.date}</div>
        ${enq.email && enq.email !== 'Not provided' ? `
          <a href="mailto:${enq.email}" class="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-0.5">
            <i class="fa-solid fa-envelope text-[10px]"></i> ${enq.email}
          </a>
        ` : ''}
      </td>
      <td class="px-6 py-4">
        <div class="space-y-1">
          <a href="tel:${enq.phone}" class="text-blue-600 font-bold hover:underline text-xs flex items-center gap-1">
            <i class="fa-solid fa-phone text-[10px]"></i> ${enq.phone}
          </a>
          <a href="https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(enq.name)}%2C%20regarding%20your%20admission%20enquiry%20at%20Bright%20Career%20Academy..." target="_blank" class="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded font-semibold transition-colors">
            <i class="fa-brands fa-whatsapp text-emerald-600"></i> WhatsApp Chat
          </a>
        </div>
      </td>
      <td class="px-6 py-4">
        <span class="inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
          enq.service === 'Vocational' ? 'bg-amber-100 text-amber-800' :
          enq.service === 'Education' ? 'bg-blue-100 text-blue-800' :
          enq.service === 'Job consultancy' ? 'bg-purple-100 text-purple-800' :
          enq.service === 'Placement cell' ? 'bg-emerald-100 text-emerald-800' :
          'bg-gray-100 text-gray-800'
        }">
          ${enq.service}
        </span>
      </td>
      <td class="px-6 py-4 text-xs text-gray-600 max-w-xs truncate" title="${enq.message}">
        ${enq.message}
      </td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
          enq.status === 'New' ? 'bg-amber-100 text-amber-800' :
          enq.status === 'Contacted' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }">
          ${enq.status}
        </span>
      </td>
      <td class="px-6 py-4 text-right whitespace-nowrap">
        <button onclick="window.markEnquiryStatus(${index})" class="text-teal-700 hover:text-teal-900 text-xs font-bold mr-3 cursor-pointer" title="Toggle Status">
          <i class="fa-solid fa-check-double mr-1"></i>Status
        </button>
        <button onclick="window.deleteEnquiry(${index})" class="text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `}).join('');
}

window.markEnquiryStatus = function(index) {
  const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
  if (enquiries[index]) {
    const statuses = ['New', 'Contacted', 'Enrolled'];
    const currentIdx = statuses.indexOf(enquiries[index].status);
    enquiries[index].status = statuses[(currentIdx + 1) % statuses.length];
    localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
    renderEnquiriesTable();
    window.showToast(`Enquiry updated to ${enquiries[index].status}`);
  }
};

window.deleteEnquiry = function(index) {
  const enquiries = JSON.parse(localStorage.getItem('bca_enquiries') || '[]');
  enquiries.splice(index, 1);
  localStorage.setItem('bca_enquiries', JSON.stringify(enquiries));
  renderEnquiriesTable();
  window.showToast('Enquiry deleted');
};

// Security Panel & Credentials Management
window.refreshSecurityPanel = function() {
  const staffIdEl = document.getElementById('current-staff-id-display');
  const savedStaffId = localStorage.getItem('bca_staff_id') || 'admin';
  if (staffIdEl) staffIdEl.textContent = savedStaffId;
};

// Staff ID & Credentials Update
window.updateStaffCredentials = function(event) {
  if (event) event.preventDefault();
  const newStaffId = document.getElementById('settings-new-staff-id')?.value.trim();
  const newStaffPass = document.getElementById('settings-new-staff-pass')?.value.trim();
  const verifyPass = document.getElementById('settings-staff-admin-pass')?.value;
  const savedAdminPass = localStorage.getItem('bca_admin_password') || 'icse';

  if (verifyPass !== savedAdminPass) {
    window.showToast("Current Master Password does not match! Verification failed.", true);
    return;
  }

  if (!newStaffId || newStaffId.length < 3) {
    window.showToast("Staff ID must be at least 3 characters long!", true);
    return;
  }

  if (newStaffId.includes(' ')) {
    window.showToast("Staff ID cannot contain spaces!", true);
    return;
  }

  if (newStaffPass && newStaffPass.length < 4) {
    window.showToast("Staff Password must be at least 4 characters long!", true);
    return;
  }

  localStorage.setItem('bca_staff_id', newStaffId);
  if (newStaffPass) {
    localStorage.setItem('bca_staff_password', newStaffPass);
  }

  window.refreshSecurityPanel();
  document.getElementById('staff-id-form')?.reset();
  window.showToast(`Staff Identity ID updated successfully to "${newStaffId}"!`);
};

// Admin Master Password Update
window.updateAdminPassword = function(event) {
  if (event) event.preventDefault();
  const currentP = document.getElementById('settings-curr-pass')?.value;
  const newP = document.getElementById('settings-new-pass')?.value;
  const confP = document.getElementById('settings-conf-pass')?.value;
  const savedP = localStorage.getItem('bca_admin_password') || 'icse';

  if (currentP !== savedP) {
    window.showToast("Current master password does not match!", true);
    return;
  }
  if (!newP || newP.length < 4) {
    window.showToast("New password must be at least 4 characters long", true);
    return;
  }
  if (newP !== confP) {
    window.showToast("New passwords do not match!", true);
    return;
  }

  localStorage.setItem('bca_admin_password', newP);
  window.showToast("Admin master password updated successfully!");
  document.getElementById('pwd-form')?.reset();
};

// Real-Time Table Filter
window.filterTable = function(tableId, query) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const q = query.toLowerCase().trim();
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
};

// Student Portal Login
window.processStudentLogin = function(event) {
  if (event) event.preventDefault();
  const regId = document.getElementById('student-reg-id')?.value.trim();
  const pass = document.getElementById('student-pass')?.value.trim();

  if (!regId || !pass) {
    window.showToast("Please enter Student ID and Access Password", true);
    return;
  }

  const student = authenticateStudent(regId, pass);
  if (student) {
    renderStudentDashboard(student);
    window.showToast(`Welcome, ${student.name} (${student.id})! Access granted.`);
  } else {
    window.showToast("Invalid Student Registration ID or Access Password!", true);
  }
};

window.studentLogout = function() {
  document.getElementById('student-dashboard-box')?.classList.add('hidden');
  document.getElementById('student-login-box')?.classList.remove('hidden');
  const form = document.getElementById('student-login-form');
  if (form) form.reset();
  window.showToast("Logged out of Student Portal");
};

// Hash change listener for #admin
window.addEventListener('hashchange', () => {
  if (window.location.hash === '#admin') {
    window.openAdminLogin();
  }
});
if (window.location.hash === '#admin') {
  setTimeout(() => window.openAdminLogin(), 400);
}

// Auto-show Enquiry - Form (pop up) once per visitor session (after 10s)
setTimeout(() => {
  if (!sessionStorage.getItem('bca_enquiry_popup_seen') && 
      sessionStorage.getItem('bca_admin_session') !== 'true' && 
      !window.location.hash.includes('admin')) {
    sessionStorage.setItem('bca_enquiry_popup_seen', 'true');
    window.openEnquiryModal();
  }
}, 10000);

