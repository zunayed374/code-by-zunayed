/**
 * Bright Career Academy - Course Management Module
 */
import { DIPLOMA_COURSES, VOCATIONAL_COURSES, BTECH_COURSES } from './courses-data.js';

// Initialize default courses in localStorage if not already present
export function initCourses() {
  if (!localStorage.getItem('bca_courses_diploma')) {
    const list = DIPLOMA_COURSES.map(([sno, name, qual, dur, fee]) => ({
      id: `DIP-${sno}`,
      category: 'diploma',
      name,
      qual,
      dur,
      fee: fee.toString()
    }));
    localStorage.setItem('bca_courses_diploma', JSON.stringify(list));
  }

  if (!localStorage.getItem('bca_courses_vocational')) {
    const list = VOCATIONAL_COURSES.map(([sno, name, qual, dur, age, fee]) => ({
      id: `VOC-${sno}`,
      category: 'vocational',
      name,
      qual,
      dur,
      age: age.toString(),
      fee: fee.toString()
    }));
    localStorage.setItem('bca_courses_vocational', JSON.stringify(list));
  }

  if (!localStorage.getItem('bca_courses_btech')) {
    const list = BTECH_COURSES.map(([sno, name, qual, dur]) => ({
      id: `BTECH-${sno}`,
      category: 'btech',
      name,
      qual,
      dur,
      fee: '100% Scholarship'
    }));
    localStorage.setItem('bca_courses_btech', JSON.stringify(list));
  }
}

export function getCourses(category) {
  initCourses();
  try {
    return JSON.parse(localStorage.getItem(`bca_courses_${category}`) || '[]');
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function saveCourses(category, list) {
  localStorage.setItem(`bca_courses_${category}`, JSON.stringify(list));
  refreshAllCourseViews();
}

export function getAllCourses() {
  const dips = getCourses('diploma');
  const vocs = getCourses('vocational');
  const btechs = getCourses('btech');
  return [...dips, ...vocs, ...btechs];
}

// Re-render public tables and admin tables
export function refreshAllCourseViews() {
  // Render public Diploma table
  const dList = getCourses('diploma');
  const dBody = document.getElementById('diploma-tbody');
  const dCountHeading = document.getElementById('diploma-count-heading');
  if (dCountHeading) dCountHeading.textContent = `ALL DIPLOMA COURSES (${dList.length})`;
  if (dBody) {
    if (dList.length === 0) {
      dBody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-400">No diploma courses available. Add courses from Admin CMS.</td></tr>`;
    } else {
      dBody.innerHTML = dList.map((c, idx) => `
        <tr class="hover:bg-blue-50/40 transition-colors">
          <td class="px-6 py-3.5 text-gray-500 font-medium">${idx + 1}</td>
          <td class="px-6 py-3.5 font-semibold text-gray-900">${c.name}</td>
          <td class="px-6 py-3.5 text-gray-700">${c.qual}</td>
          <td class="px-6 py-3.5 text-gray-700 font-medium">${c.dur}</td>
          <td class="px-6 py-3.5 text-primary font-bold">₹${c.fee}</td>
        </tr>
      `).join('');
    }
  }

  // Render public Vocational table
  const vList = getCourses('vocational');
  const vBody = document.getElementById('vocational-tbody');
  const vCountHeading = document.getElementById('vocational-count-heading');
  if (vCountHeading) vCountHeading.textContent = `ALL VOCATIONAL COURSES (${vList.length})`;
  if (vBody) {
    if (vList.length === 0) {
      vBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">No vocational courses available. Add courses from Admin CMS.</td></tr>`;
    } else {
      vBody.innerHTML = vList.map((c, idx) => `
        <tr class="hover:bg-blue-50/40 transition-colors">
          <td class="px-6 py-3.5 text-gray-500 font-medium">${idx + 1}</td>
          <td class="px-6 py-3.5 font-semibold text-gray-900">${c.name}</td>
          <td class="px-6 py-3.5 text-gray-700">${c.qual}</td>
          <td class="px-6 py-3.5 text-gray-700 font-medium">${c.dur}</td>
          <td class="px-6 py-3.5 text-gray-600">${c.age || '14+'}</td>
          <td class="px-6 py-3.5 text-primary font-bold">₹${c.fee}</td>
        </tr>
      `).join('');
    }
  }

  // Render public B.Tech table
  const bList = getCourses('btech');
  const bBody = document.getElementById('btech-tbody');
  const bCountHeading = document.getElementById('btech-count-heading');
  if (bCountHeading) bCountHeading.textContent = `B.TECH / B.E. COURSES (${bList.length})`;
  if (bBody) {
    if (bList.length === 0) {
      bBody.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-gray-400">No engineering courses available. Add courses from Admin CMS.</td></tr>`;
    } else {
      bBody.innerHTML = bList.map((c, idx) => `
        <tr class="hover:bg-blue-50/40 transition-colors">
          <td class="px-6 py-3.5 text-gray-500 font-medium">${idx + 1}</td>
          <td class="px-6 py-3.5 font-semibold text-gray-900">${c.name}</td>
          <td class="px-6 py-3.5 text-gray-700">${c.qual}</td>
          <td class="px-6 py-3.5 text-primary font-bold">${c.dur}</td>
        </tr>
      `).join('');
    }
  }

  // Update Admin KPIs and badging
  const totalCount = dList.length + vList.length + bList.length;
  const kpiCourseCount = document.getElementById('kpi-total-courses');
  const adminBadgeCourseCount = document.getElementById('badge-admin-courses');
  if (kpiCourseCount) kpiCourseCount.textContent = totalCount;
  if (adminBadgeCourseCount) adminBadgeCourseCount.textContent = `${totalCount} Total`;

  // Render admin course table
  renderAdminCourses();
}

// Current filter state in admin course manager
let currentAdminCategoryFilter = 'all';
let currentAdminSearch = '';

export function setAdminCategoryFilter(category) {
  currentAdminCategoryFilter = category;
  document.querySelectorAll('.course-cat-btn').forEach(btn => {
    btn.classList.remove('bg-indigo-600', 'text-white');
    btn.classList.add('bg-white', 'text-gray-700');
  });
  const activeBtn = document.getElementById(`cat-filter-${category}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-gray-700');
    activeBtn.classList.add('bg-indigo-600', 'text-white');
  }
  renderAdminCourses();
}

export function setAdminCourseSearch(query) {
  currentAdminSearch = (query || '').toLowerCase().trim();
  renderAdminCourses();
}

export function renderAdminCourses() {
  const tbody = document.getElementById('admin-courses-tbody');
  if (!tbody) return;

  let courses = getAllCourses();

  if (currentAdminCategoryFilter !== 'all') {
    courses = courses.filter(c => c.category === currentAdminCategoryFilter);
  }

  if (currentAdminSearch) {
    courses = courses.filter(c => 
      c.name.toLowerCase().includes(currentAdminSearch) ||
      c.qual.toLowerCase().includes(currentAdminSearch) ||
      (c.fee && c.fee.toLowerCase().includes(currentAdminSearch))
    );
  }

  if (courses.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-400">No matching courses found.</td></tr>`;
    return;
  }

  tbody.innerHTML = courses.map((c, index) => {
    const catBadge = c.category === 'diploma' 
      ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">Diploma</span>'
      : c.category === 'vocational'
      ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">Vocational</span>'
      : '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">B.Tech</span>';

    const feeDisplay = c.category === 'btech' 
      ? '<span class="text-green-600 font-bold text-xs">100% Scholarship</span>'
      : `₹${c.fee}`;

    return `
      <tr class="hover:bg-gray-50/80 border-b border-gray-100 transition-colors">
        <td class="px-6 py-3.5 text-xs text-gray-400 font-mono">${index + 1}</td>
        <td class="px-6 py-3.5">${catBadge}</td>
        <td class="px-6 py-3.5">
          <div class="font-bold text-gray-900 text-sm">${c.name}</div>
          <div class="text-[11px] text-gray-400">${c.id}</div>
        </td>
        <td class="px-6 py-3.5 text-xs text-gray-600">${c.qual}</td>
        <td class="px-6 py-3.5 text-xs text-gray-700 font-medium">${c.dur}</td>
        <td class="px-6 py-3.5 text-xs font-bold text-primary">${feeDisplay}</td>
        <td class="px-6 py-3.5 text-right whitespace-nowrap">
          <button onclick="window.editCourse('${c.id}', '${c.category}')" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-2.5 py-1.5 rounded-lg text-xs font-bold mr-1.5 transition-colors cursor-pointer" title="Edit Course">
            <i class="fa-solid fa-pen-to-square mr-1"></i> Edit
          </button>
          <button onclick="window.deleteCourse('${c.id}', '${c.category}')" class="bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer" title="Delete Course">
            <i class="fa-solid fa-trash mr-1"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

// Modal Form handling (Add / Edit)
export function openCourseModal(courseId = null, category = 'diploma') {
  const modal = document.getElementById('course-edit-modal');
  const title = document.getElementById('course-modal-title');
  const form = document.getElementById('course-modal-form');
  if (!modal || !form) return;

  form.reset();
  document.getElementById('course-edit-id').value = courseId || '';

  const catSelect = document.getElementById('course-category');
  const ageGroup = document.getElementById('course-age-group');
  const feeInput = document.getElementById('course-fee');

  if (courseId) {
    title.textContent = "Edit Course Details";
    const list = getCourses(category);
    const course = list.find(c => c.id === courseId);
    if (course) {
      catSelect.value = course.category;
      catSelect.disabled = true; // Keep category locked during edit
      document.getElementById('course-name').value = course.name;
      document.getElementById('course-qual').value = course.qual;
      document.getElementById('course-dur').value = course.dur;
      feeInput.value = course.fee || '';
      if (document.getElementById('course-age')) {
        document.getElementById('course-age').value = course.age || '14+';
      }
    }
  } else {
    title.textContent = "Add New Course to Catalog";
    catSelect.value = category || 'diploma';
    catSelect.disabled = false;
  }

  // Toggle age field visibility based on category
  if (catSelect.value === 'vocational') {
    if (ageGroup) ageGroup.classList.remove('hidden');
  } else {
    if (ageGroup) ageGroup.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.remove('opacity-0'), 10);
}

export function closeCourseModal() {
  const modal = document.getElementById('course-edit-modal');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
}

export function handleCourseSubmit(event) {
  if (event) event.preventDefault();
  const idInput = document.getElementById('course-edit-id').value.trim();
  const category = document.getElementById('course-category').value;
  const name = document.getElementById('course-name').value.trim();
  const qual = document.getElementById('course-qual').value.trim();
  const dur = document.getElementById('course-dur').value.trim();
  const fee = document.getElementById('course-fee').value.trim() || 'As per norms';
  const age = document.getElementById('course-age')?.value.trim() || '14+';

  if (!name || !qual || !dur) {
    window.showToast('Please fill in Course Name, Qualification, and Duration', true);
    return;
  }

  const list = getCourses(category);

  if (idInput) {
    // Edit existing course
    const idx = list.findIndex(c => c.id === idInput);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        name,
        qual,
        dur,
        fee,
        ...(category === 'vocational' ? { age } : {})
      };
      saveCourses(category, list);
      window.showToast(`Course "${name}" updated successfully!`);
    }
  } else {
    // Add new course
    const newId = `${category.toUpperCase().substring(0, 3)}-${Date.now().toString().slice(-4)}`;
    const newCourse = {
      id: newId,
      category,
      name,
      qual,
      dur,
      fee,
      ...(category === 'vocational' ? { age } : {})
    };
    list.push(newCourse);
    saveCourses(category, list);
    window.showToast(`New course "${name}" added to ${category.toUpperCase()}!`);
  }

  closeCourseModal();
}

export function deleteCourse(courseId, category) {
  const list = getCourses(category);
  const course = list.find(c => c.id === courseId);
  const nameLabel = course ? `"${course.name}"` : courseId;

  const performDelete = () => {
    const updatedList = list.filter(c => c.id !== courseId);
    saveCourses(category, updatedList);
    window.showToast(`Course ${nameLabel} deleted from ${category.toUpperCase()} catalog.`);
  };

  if (window.showConfirmDialog) {
    window.showConfirmDialog(
      "Delete Course from Catalog",
      `Are you sure you want to delete ${nameLabel} from ${category.toUpperCase()}? This will immediately remove it from the live website.`,
      "Delete Course",
      performDelete
    );
  } else {
    performDelete();
  }
}

export function resetCoursesToDefault() {
  const performReset = () => {
    localStorage.removeItem('bca_courses_diploma');
    localStorage.removeItem('bca_courses_vocational');
    localStorage.removeItem('bca_courses_btech');
    initCourses();
    refreshAllCourseViews();
    window.showToast('Course catalog reset to initial 80 courses!');
  };

  if (window.showConfirmDialog) {
    window.showConfirmDialog(
      "Reset All Courses",
      "Are you sure you want to reset all courses to the default 80 programs? Any custom added courses will be cleared.",
      "Reset Catalog",
      performReset
    );
  } else {
    performReset();
  }
}
