/**
 * Bright Career Academy - Student Directory & Portal Manager
 */

export const DEFAULT_STUDENTS = [
  {
    id: "ZAK9090",
    password: "icse",
    name: "Zakariya Khan",
    email: "zak9090@brightcareer.in",
    phone: "+91 98765 12340",
    course: "Diploma in Computer Science Engineering",
    semester: "Semester IV (2024–2027)",
    roll: "2024-CSE-007",
    attendance: "94.8%",
    cgpa: "9.20",
    feeStatus: "CLEARED - 100% Scholarship",
    subjects: [
      { code: "CS-401", name: "Data Structures & Algorithms", credits: 4, score: "29 / 30", grade: "O (Outstanding)" },
      { code: "CS-402", name: "Database Management Systems", credits: 4, score: "28 / 30", grade: "A+" },
      { code: "CS-403", name: "Computer Networks & Security", credits: 4, score: "29 / 30", grade: "O (Outstanding)" },
      { code: "CS-404", name: "Full-Stack Web Development Lab", credits: 3, score: "49 / 50", grade: "O (Outstanding)" }
    ]
  },
  {
    id: "BCA-2026-001",
    password: "student123",
    name: "Rahul Sharma",
    email: "rahul.sharma@brightcareer.in",
    phone: "+91 98310 77112",
    course: "Diploma in Mechanical Engineering",
    semester: "Semester IV (2024–2027)",
    roll: "2024-DME-042",
    attendance: "92.4%",
    cgpa: "8.65",
    feeStatus: "CLEARED - 100% Scholarship",
    subjects: [
      { code: "ME-401", name: "Applied Thermodynamics", credits: 4, score: "28 / 30", grade: "A+" },
      { code: "ME-402", name: "Manufacturing Processes II", credits: 4, score: "27 / 30", grade: "A" },
      { code: "ME-403", name: "Fluid Mechanics & Machinery", credits: 4, score: "29 / 30", grade: "O (Outstanding)" },
      { code: "ME-404", name: "Machine Drawing Lab (CAD)", credits: 3, score: "48 / 50", grade: "O (Outstanding)" }
    ]
  },
  {
    id: "BCA-2026-002",
    password: "icse",
    name: "Sneha Roy",
    email: "sneha.roy@brightcareer.in",
    phone: "+91 98745 99001",
    course: "B.Tech Computer Science & Engineering",
    semester: "Semester II (2025–2029)",
    roll: "2025-BTech-015",
    attendance: "96.0%",
    cgpa: "9.45",
    feeStatus: "CLEARED - 100% Scholarship",
    subjects: [
      { code: "BT-201", name: "Engineering Mathematics II", credits: 4, score: "30 / 30", grade: "O (Outstanding)" },
      { code: "BT-202", name: "Object Oriented Programming (C++)", credits: 4, score: "29 / 30", grade: "O (Outstanding)" },
      { code: "BT-203", name: "Digital Electronics", credits: 3, score: "28 / 30", grade: "A+" },
      { code: "BT-204", name: "Programming Laboratory", credits: 2, score: "50 / 50", grade: "O (Outstanding)" }
    ]
  }
];

// Initialize Students in localStorage
export function initStudents() {
  if (!localStorage.getItem('bca_students')) {
    localStorage.setItem('bca_students', JSON.stringify(DEFAULT_STUDENTS));
  }
}

export function getStudents() {
  initStudents();
  try {
    return JSON.parse(localStorage.getItem('bca_students') || '[]');
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function saveStudents(list) {
  localStorage.setItem('bca_students', JSON.stringify(list));
  renderAdminStudentsTable();
  updateStudentKpis();
}

export function updateStudentKpis() {
  const students = getStudents();
  const kpiCount = document.getElementById('kpi-student-count');
  const badgeCount = document.getElementById('badge-admin-students');
  if (kpiCount) kpiCount.textContent = students.length;
  if (badgeCount) badgeCount.textContent = `${students.length} Enrolled`;
}

// Render Admin Students Table
let currentStudentSearch = '';

export function setStudentSearch(query) {
  currentStudentSearch = (query || '').toLowerCase().trim();
  renderAdminStudentsTable();
}

export function renderAdminStudentsTable() {
  const tbody = document.getElementById('admin-students-tbody');
  if (!tbody) return;

  let students = getStudents();

  if (currentStudentSearch) {
    students = students.filter(s => 
      s.id.toLowerCase().includes(currentStudentSearch) ||
      s.name.toLowerCase().includes(currentStudentSearch) ||
      s.course.toLowerCase().includes(currentStudentSearch) ||
      (s.phone && s.phone.includes(currentStudentSearch))
    );
  }

  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-400">No students found. Add a new student ID like ZAK9090 with password icse.</td></tr>`;
    return;
  }

  tbody.innerHTML = students.map((s, index) => `
    <tr class="hover:bg-purple-50/30 border-b border-gray-100 transition-colors">
      <td class="px-6 py-3.5 text-xs text-gray-400 font-mono">${index + 1}</td>
      <td class="px-6 py-3.5">
        <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-purple-100 text-purple-800 border border-purple-200">
          <i class="fa-solid fa-id-card mr-1 text-[10px]"></i> ${s.id}
        </span>
      </td>
      <td class="px-6 py-3.5">
        <div class="font-bold text-gray-900 text-sm">${s.name}</div>
        <div class="text-[11px] text-gray-400 font-mono">${s.phone || s.email}</div>
      </td>
      <td class="px-6 py-3.5">
        <div class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200" title="Password">
          <i class="fa-solid fa-key mr-1 text-[10px] text-amber-500"></i> ${s.password}
        </div>
      </td>
      <td class="px-6 py-3.5">
        <div class="text-xs font-semibold text-gray-800">${s.course}</div>
        <div class="text-[11px] text-gray-500">${s.semester}</div>
      </td>
      <td class="px-6 py-3.5">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-green-700">${s.attendance}</span>
          <span class="text-[10px] text-gray-400">• CGPA ${s.cgpa}</span>
        </div>
        <div class="text-[10px] font-semibold text-teal-600">${s.feeStatus || 'CLEARED'}</div>
      </td>
      <td class="px-6 py-3.5 text-right whitespace-nowrap">
        <button onclick="window.loginAsStudentDirectly('${s.id}')" class="bg-blue-50 hover:bg-blue-100 text-primary px-2.5 py-1.5 rounded-lg text-xs font-bold mr-1.5 transition-colors cursor-pointer" title="Preview Student Dashboard">
          <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i> View Portal
        </button>
        <button onclick="window.openStudentModal('${s.id}')" class="bg-purple-50 hover:bg-purple-100 text-purple-700 px-2.5 py-1.5 rounded-lg text-xs font-bold mr-1.5 transition-colors cursor-pointer" title="Edit Student">
          <i class="fa-solid fa-pen-to-square mr-1"></i> Edit
        </button>
        <button onclick="window.deleteStudent('${s.id}')" class="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer" title="Delete Student">
          <i class="fa-solid fa-trash mr-1"></i> Delete
        </button>
      </td>
    </tr>
  `).join('');
}

// Student Modal Management
export function openStudentModal(studentId = null) {
  const modal = document.getElementById('student-edit-modal');
  const title = document.getElementById('student-modal-title');
  const form = document.getElementById('student-modal-form');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('student-original-id').value = studentId || '';

  const idInput = document.getElementById('modal-student-id');
  const passInput = document.getElementById('modal-student-pass');
  const nameInput = document.getElementById('modal-student-name');
  const phoneInput = document.getElementById('modal-student-phone');
  const courseInput = document.getElementById('modal-student-course');
  const semInput = document.getElementById('modal-student-sem');
  const attInput = document.getElementById('modal-student-att');
  const cgpaInput = document.getElementById('modal-student-cgpa');
  const feeInput = document.getElementById('modal-student-fee');

  const deleteBtn = document.getElementById('btn-delete-student-modal');
  if (studentId) {
    title.textContent = `Edit Student: ${studentId}`;
    if (deleteBtn) deleteBtn.classList.remove('hidden');
    const students = getStudents();
    const student = students.find(s => s.id === studentId);
    if (student) {
      idInput.value = student.id;
      passInput.value = student.password;
      nameInput.value = student.name;
      phoneInput.value = student.phone || '';
      courseInput.value = student.course;
      semInput.value = student.semester;
      attInput.value = student.attendance;
      cgpaInput.value = student.cgpa;
      feeInput.value = student.feeStatus || 'CLEARED - 100% Scholarship';
    }
  } else {
    title.textContent = "Register New Student Account";
    if (deleteBtn) deleteBtn.classList.add('hidden');
    idInput.value = "";
    passInput.value = "";
    nameInput.value = "";
    courseInput.value = "Diploma in Computer Science Engineering";
    semInput.value = "Semester IV (2024–2027)";
    attInput.value = "95%";
    cgpaInput.value = "9.0";
    feeInput.value = "CLEARED - 100% Scholarship";
  }

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.remove('opacity-0'), 10);
}

export function closeStudentModal() {
  const modal = document.getElementById('student-edit-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
}

export function handleStudentSubmit(event) {
  if (event) event.preventDefault();
  const originalId = document.getElementById('student-original-id').value.trim();
  const id = document.getElementById('modal-student-id').value.trim().toUpperCase();
  const password = document.getElementById('modal-student-pass').value.trim();
  const name = document.getElementById('modal-student-name').value.trim();
  const phone = document.getElementById('modal-student-phone').value.trim();
  const course = document.getElementById('modal-student-course').value.trim();
  const semester = document.getElementById('modal-student-sem').value.trim();
  const attendance = document.getElementById('modal-student-att').value.trim() || '90%';
  const cgpa = document.getElementById('modal-student-cgpa').value.trim() || '8.5';
  const feeStatus = document.getElementById('modal-student-fee').value.trim() || 'CLEARED';

  if (!id || !password || !name || !course) {
    window.showToast("Please provide Student ID, Password, Name, and Course!", true);
    return;
  }

  const students = getStudents();

  if (originalId) {
    // Editing existing student
    const idx = students.findIndex(s => s.id === originalId);
    if (idx !== -1) {
      students[idx] = {
        ...students[idx],
        id,
        password,
        name,
        phone,
        course,
        semester,
        attendance,
        cgpa,
        feeStatus
      };
      saveStudents(students);
      window.showToast(`Student ${name} (${id}) updated successfully!`);
    }
  } else {
    // Check if ID already exists
    if (students.some(s => s.id.toUpperCase() === id)) {
      window.showToast(`Student ID "${id}" is already registered. Please use another ID or edit existing.`, true);
      return;
    }

    const newStudent = {
      id,
      password,
      name,
      email: `${id.toLowerCase()}@brightcareeracademy.org`,
      phone: phone || '+91 8101243220',
      course,
      semester,
      roll: `${new Date().getFullYear()}-${id.slice(0, 3)}-${Math.floor(10 + Math.random() * 90)}`,
      attendance,
      cgpa,
      feeStatus,
      subjects: [
        { code: "CORE-101", name: "Advanced Domain Fundamentals", credits: 4, score: "28 / 30", grade: "A+" },
        { code: "CORE-102", name: "Practical Technology Workshop", credits: 4, score: "29 / 30", grade: "O" },
        { code: "CORE-103", name: "Industrial Systems & Analytics", credits: 4, score: "27 / 30", grade: "A" },
        { code: "CORE-104", name: "Capstone Project & Lab", credits: 3, score: "49 / 50", grade: "O" }
      ]
    };
    students.unshift(newStudent);
    saveStudents(students);
    window.showToast(`New student ${name} (${id}) registered with access password "${password}"!`);
  }

  closeStudentModal();
}

export function deleteStudent(studentId) {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  const studentLabel = student ? `${student.name} (${student.id})` : studentId;

  if (window.showConfirmDialog) {
    window.showConfirmDialog(
      "Delete Student Record",
      `Are you sure you want to permanently delete student ${studentLabel}? They will no longer be able to log in to the student portal.`,
      "Delete Student",
      () => {
        executeDeleteStudent(studentId);
      }
    );
  } else {
    executeDeleteStudent(studentId);
  }
}

export function executeDeleteStudent(studentId) {
  const students = getStudents();
  const updated = students.filter(s => s.id !== studentId);
  saveStudents(updated);
  window.showToast(`Student ${studentId} deleted successfully.`);
  closeStudentModal();
}

export function deleteStudentFromModal() {
  const originalId = document.getElementById('student-original-id')?.value.trim();
  const modalId = document.getElementById('modal-student-id')?.value.trim().toUpperCase();
  const targetId = originalId || modalId;
  if (targetId) {
    deleteStudent(targetId);
  }
}

// Student Portal Active Session Data
let activeStudentSession = null;

export function authenticateStudent(studentId, password) {
  initStudents();
  const students = getStudents();
  const cleanId = (studentId || '').trim().toUpperCase();
  const cleanPass = (password || '').trim();

  const found = students.find(s => s.id.toUpperCase() === cleanId && s.password === cleanPass);
  return found || null;
}

export function renderStudentDashboard(student) {
  activeStudentSession = student;
  
  // Set student details
  const nameEl = document.getElementById('student-display-name');
  const idRollEl = document.getElementById('student-display-id-roll');
  const courseSemEl = document.getElementById('student-display-course-sem');
  const avatarEl = document.getElementById('student-display-avatar');
  const attEl = document.getElementById('student-display-attendance');
  const cgpaEl = document.getElementById('student-display-cgpa');
  const feeEl = document.getElementById('student-display-fee');
  const subTbody = document.getElementById('student-subjects-tbody');

  if (nameEl) nameEl.textContent = student.name;
  if (idRollEl) idRollEl.textContent = `Student ID: ${student.id} • Roll: ${student.roll || student.id}`;
  if (courseSemEl) courseSemEl.textContent = `${student.course} • ${student.semester}`;
  if (avatarEl) {
    const initials = student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    avatarEl.textContent = initials || 'ST';
  }
  if (attEl) attEl.textContent = student.attendance || '90%';
  if (cgpaEl) cgpaEl.textContent = student.cgpa || '8.5';
  if (feeEl) feeEl.textContent = student.feeStatus || 'CLEARED';

  if (subTbody) {
    const subjects = student.subjects || [
      { code: "SUB-101", name: "Core Course Module I", credits: 4, score: "28 / 30", grade: "A+" },
      { code: "SUB-102", name: "Core Course Module II", credits: 4, score: "29 / 30", grade: "O" }
    ];
    subTbody.innerHTML = subjects.map(sub => `
      <tr>
        <td class="px-4 py-3 font-mono font-semibold text-gray-700">${sub.code}</td>
        <td class="px-4 py-3 font-medium text-gray-900">${sub.name}</td>
        <td class="px-4 py-3 text-gray-600">${sub.credits}</td>
        <td class="px-4 py-3 font-medium text-gray-800">${sub.score}</td>
        <td class="px-4 py-3 font-bold text-green-600">${sub.grade}</td>
      </tr>
    `).join('');
  }

  // Toggle boxes
  document.getElementById('student-login-box')?.classList.add('hidden');
  document.getElementById('student-dashboard-box')?.classList.remove('hidden');
}

export function loginAsStudentDirectly(studentId) {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  if (student) {
    window.exitAdminDashboard();
    window.navigateToView('view-student-portal');
    renderStudentDashboard(student);
    window.showToast(`Logged into Student Portal as ${student.name} (${student.id})`);
  }
}
