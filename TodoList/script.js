const STORAGE_KEY = 'naved_todo_app_tasks';

const defaultTasks = [
  {
    id: 'task-1',
    title: 'Finish user onboarding',
    description: 'Review the welcome flow and make sure all introductory steps are clear.',
    dueDate: getRelativeDateString(1),
    priority: 'Medium',
    status: 'pending',
    category: '',
    commentsCount: 1,
    attachmentsCount: 0,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'task-2',
    title: 'Solve the Dabble prioritisation issue',
    description: 'Investigate the algorithm ordering logic reported in ticket #402.',
    dueDate: '2022-01-08',
    priority: 'High',
    status: 'pending',
    category: 'LaunchPad',
    commentsCount: 2,
    attachmentsCount: 1,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'task-3',
    title: 'Hold to reorder on mobile',
    description: 'Add touch press gesture handlers for draggable task reordering.',
    dueDate: '2022-01-10',
    priority: 'Low',
    status: 'pending',
    category: 'Dabble',
    commentsCount: 0,
    attachmentsCount: 0,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'task-4',
    title: 'Update onboarding workflow templates',
    description: 'Sync design mockups with the new team structure.',
    dueDate: '',
    priority: 'Medium',
    status: 'completed',
    category: '',
    commentsCount: 0,
    attachmentsCount: 0,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'task-5',
    title: 'Connect time tracking with tasks',
    description: 'Hook up basic session timers for individual action items.',
    dueDate: '',
    priority: 'Medium',
    status: 'completed',
    category: '',
    commentsCount: 0,
    attachmentsCount: 0,
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

const state = {
  tasks: [],
  currentView: 'tasks',
  filters: {
    status: 'all',
    priority: 'all',
    date: 'all',
    category: 'all',
    search: ''
  },
  sortBy: 'created-desc',
  sidebarCollapsed: false,
  deleteCandidateId: null
};

function getRelativeDateString(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        state.tasks = parsed;
        return;
      }
    }
  } catch (e) {}
  state.tasks = JSON.parse(JSON.stringify(defaultTasks));
  saveTasks();
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  } catch (e) {}
}

function parseLocalDate(dateString) {
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function getStartOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function isTaskOverdue(task) {
  if (task.status === 'completed' || !task.dueDate) return false;
  const taskDate = parseLocalDate(task.dueDate);
  if (!taskDate) return false;
  return taskDate.getTime() < getStartOfToday().getTime();
}

function isTaskDueToday(task) {
  if (!task.dueDate) return false;
  const taskDate = parseLocalDate(task.dueDate);
  if (!taskDate) return false;
  return taskDate.getTime() === getStartOfToday().getTime();
}

function isTaskDueTomorrow(task) {
  if (!task.dueDate) return false;
  const taskDate = parseLocalDate(task.dueDate);
  if (!taskDate) return false;
  const tomorrow = getStartOfToday();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return taskDate.getTime() === tomorrow.getTime();
}

function formatDisplayDate(dateString, isCompleted) {
  if (!dateString) return null;
  const taskDate = parseLocalDate(dateString);
  if (!taskDate) return null;

  const today = getStartOfToday();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const diffTime = taskDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedStandard = `${monthNames[taskDate.getMonth()]} ${taskDate.getDate()}, ${taskDate.getFullYear()}`;

  if (!isCompleted && diffDays < 0) {
    return {
      text: formattedStandard,
      className: 'overdue'
    };
  }

  if (diffDays === 0) {
    return {
      text: 'Today',
      className: isCompleted ? '' : 'due-today'
    };
  }

  if (diffDays === 1) {
    return {
      text: 'Tomorrow',
      className: isCompleted ? '' : 'due-tomorrow'
    };
  }

  return {
    text: formattedStandard,
    className: ''
  };
}

function getCategoryBadgeClass(category) {
  if (!category) return 'badge-default';
  const clean = category.toLowerCase().trim();
  if (clean === 'launchpad') return 'badge-launchpad';
  if (clean === 'dabble') return 'badge-dabble';
  if (clean === 'design') return 'badge-design';
  if (clean === 'development') return 'badge-development';
  if (clean === 'college') return 'badge-college';
  if (clean === 'personal') return 'badge-personal';
  return 'badge-default';
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function filterAndSortTasks() {
  const { status, priority, date, category, search } = state.filters;
  const query = search.trim().toLowerCase();

  let filtered = state.tasks.filter(task => {
    if (status === 'pending' && task.status !== 'pending') return false;
    if (status === 'completed' && task.status !== 'completed') return false;

    if (priority !== 'all' && task.priority !== priority) return false;

    if (category !== 'all' && task.category !== category) return false;

    if (date === 'today' && !isTaskDueToday(task)) return false;
    if (date === 'overdue' && !isTaskOverdue(task)) return false;
    if (date === 'upcoming') {
      if (!task.dueDate) return false;
      const d = parseLocalDate(task.dueDate);
      if (!d || d.getTime() <= getStartOfToday().getTime()) return false;
    }

    if (query) {
      const matchTitle = (task.title || '').toLowerCase().includes(query);
      const matchDesc = (task.description || '').toLowerCase().includes(query);
      const matchCat = (task.category || '').toLowerCase().includes(query);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  const priorityWeights = { High: 3, Medium: 2, Low: 1 };

  filtered.sort((a, b) => {
    switch (state.sortBy) {
      case 'created-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'created-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'due-asc': {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return parseLocalDate(a.dueDate).getTime() - parseLocalDate(b.dueDate).getTime();
      }
      case 'priority-desc': {
        const diff = (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
        if (diff !== 0) return diff;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      case 'title-asc':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return filtered;
}

function renderTasks() {
  const taskListEl = document.getElementById('taskList');
  const visibleTasks = filterAndSortTasks();

  updateCategoryFilterOptions();
  updateActiveFilterBadge();

  if (visibleTasks.length === 0) {
    taskListEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <h3>No tasks found</h3>
        <p>No tasks match your current criteria. Create a new task or reset your search filters.</p>
        <button class="btn btn-secondary" id="emptyStateResetBtn">Reset All Filters</button>
      </div>
    `;

    const resetBtn = document.getElementById('emptyStateResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', clearAllFilters);
    }
    return;
  }

  taskListEl.innerHTML = visibleTasks.map(task => {
    const isCompleted = task.status === 'completed';
    const dateMeta = formatDisplayDate(task.dueDate, isCompleted);
    const categoryClass = getCategoryBadgeClass(task.category);

    return `
      <article class="task-card ${isCompleted ? 'completed' : ''}" data-id="${task.id}" role="listitem">
        <button class="task-checkbox-btn ${isCompleted ? 'checked' : ''}" 
                data-action="toggle" 
                data-id="${task.id}" 
                aria-label="${isCompleted ? 'Mark task as pending' : 'Mark task as completed'}">
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.485 3.515a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414L6.07 10.1l6.001-6.585a1 1 0 0 1 1.414 0z"></path>
          </svg>
        </button>

        <div class="task-body">
          <div class="task-title">${escapeHtml(task.title)}</div>

          ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ''}

          <div class="task-meta-row">
            ${dateMeta ? `
              <span class="meta-item ${dateMeta.className}">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${dateMeta.text}</span>
              </span>
            ` : ''}

            ${Number(task.commentsCount) > 0 ? `
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"></path>
                </svg>
                <span>${task.commentsCount}</span>
              </span>
            ` : ''}

            ${Number(task.attachmentsCount) > 0 ? `
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l7.88-7.88"></path>
                </svg>
                <span>${task.attachmentsCount}</span>
              </span>
            ` : ''}

            ${task.category ? `
              <span class="category-badge ${categoryClass}">
                <span class="badge-dot"></span>
                <span>${escapeHtml(task.category)}</span>
              </span>
            ` : ''}

            ${task.priority ? `
              <span class="priority-pill priority-${task.priority.toLowerCase()}">${task.priority}</span>
            ` : ''}
          </div>
        </div>

        <div class="task-actions">
          <button class="task-action-btn" data-action="edit" data-id="${task.id}" aria-label="Edit task">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
          <button class="task-action-btn delete-btn" data-action="delete" data-id="${task.id}" aria-label="Delete task">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function updateCategoryFilterOptions() {
  const categorySelect = document.getElementById('filterCategory');
  const currentVal = state.filters.category;

  const categories = Array.from(
    new Set(state.tasks.map(t => t.category).filter(c => c && c.trim().length > 0))
  ).sort();

  let html = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const isSelected = cat === currentVal ? 'selected' : '';
    html += `<option value="${escapeHtml(cat)}" ${isSelected}>${escapeHtml(cat)}</option>`;
  });

  categorySelect.innerHTML = html;
}

function updateActiveFilterBadge() {
  const badge = document.getElementById('activeFilterBadge');
  const statusBar = document.getElementById('filterStatusBar');
  const statusText = document.getElementById('filterStatusText');

  let activeCount = 0;
  const summaryParts = [];

  if (state.filters.status !== 'all') {
    activeCount++;
    summaryParts.push(`Status: ${state.filters.status}`);
  }
  if (state.filters.priority !== 'all') {
    activeCount++;
    summaryParts.push(`Priority: ${state.filters.priority}`);
  }
  if (state.filters.date !== 'all') {
    activeCount++;
    summaryParts.push(`Date: ${state.filters.date}`);
  }
  if (state.filters.category !== 'all') {
    activeCount++;
    summaryParts.push(`Category: ${state.filters.category}`);
  }
  if (state.filters.search.trim()) {
    activeCount++;
    summaryParts.push(`Search: "${state.filters.search.trim()}"`);
  }

  if (activeCount > 0) {
    badge.textContent = activeCount;
    badge.style.display = 'inline-block';
    statusBar.style.display = 'flex';
    const count = filterAndSortTasks().length;
    statusText.textContent = `Showing ${count} task${count === 1 ? '' : 's'} (${summaryParts.join(', ')})`;
  } else {
    badge.style.display = 'none';
    statusBar.style.display = 'none';
  }
}

function clearAllFilters() {
  state.filters.status = 'all';
  state.filters.priority = 'all';
  state.filters.date = 'all';
  state.filters.category = 'all';
  state.filters.search = '';

  document.getElementById('filterStatus').value = 'all';
  document.getElementById('filterPriority').value = 'all';
  document.getElementById('filterDate').value = 'all';
  document.getElementById('filterCategory').value = 'all';
  document.getElementById('searchInput').value = '';
  document.getElementById('searchClearBtn').style.display = 'none';

  renderTasks();
  closeFilterPopover();
  showToast('Filters cleared');
}

function updateDashboard() {
  const total = state.tasks.length;
  const pending = state.tasks.filter(t => t.status !== 'completed').length;
  const completed = state.tasks.filter(t => t.status === 'completed').length;
  const overdue = state.tasks.filter(t => isTaskOverdue(t)).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById('statTotal').textContent = total;
  document.getElementById('statPending').textContent = pending;
  document.getElementById('statCompleted').textContent = completed;
  document.getElementById('statOverdue').textContent = overdue;
  document.getElementById('statPercent').textContent = `${percentage}%`;
  document.getElementById('statProgressBar').style.width = `${percentage}%`;

  const upcomingContainer = document.getElementById('dashboardUpcomingList');
  const recentContainer = document.getElementById('dashboardRecentList');

  const upcomingTasks = state.tasks
    .filter(t => t.status !== 'completed' && t.dueDate)
    .sort((a, b) => parseLocalDate(a.dueDate).getTime() - parseLocalDate(b.dueDate).getTime())
    .slice(0, 5);

  if (upcomingTasks.length === 0) {
    upcomingContainer.innerHTML = `<p class="metric-caption">No pending tasks with upcoming deadlines.</p>`;
  } else {
    upcomingContainer.innerHTML = upcomingTasks.map(t => {
      const dateMeta = formatDisplayDate(t.dueDate, false);
      return `
        <div class="mini-task-item">
          <span class="mini-task-title">${escapeHtml(t.title)}</span>
          <span class="meta-item ${dateMeta ? dateMeta.className : ''}">${dateMeta ? dateMeta.text : ''}</span>
        </div>
      `;
    }).join('');
  }

  const recentTasks = [...state.tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (recentTasks.length === 0) {
    recentContainer.innerHTML = `<p class="metric-caption">No tasks recorded yet.</p>`;
  } else {
    recentContainer.innerHTML = recentTasks.map(t => {
      return `
        <div class="mini-task-item">
          <span class="mini-task-title">${escapeHtml(t.title)}</span>
          <span class="badge ${t.status === 'completed' ? 'badge-purple' : 'badge-gray'}">${t.status}</span>
        </div>
      `;
    }).join('');
  }
}

function updateReports() {
  const total = state.tasks.length;
  const pending = state.tasks.filter(t => t.status !== 'completed').length;
  const completed = state.tasks.filter(t => t.status === 'completed').length;
  const overdue = state.tasks.filter(t => isTaskOverdue(t)).length;

  const high = state.tasks.filter(t => t.priority === 'High').length;
  const med = state.tasks.filter(t => t.priority === 'Medium').length;
  const low = state.tasks.filter(t => t.priority === 'Low').length;

  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById('reportCompletionRate').textContent = `${completionRate}%`;
  document.getElementById('reportProgressFill').style.width = `${completionRate}%`;

  document.getElementById('reportPendingCount').textContent = pending;
  document.getElementById('reportCompletedCount').textContent = completed;
  document.getElementById('reportPendingBar').style.width = total === 0 ? '0%' : `${(pending / total) * 100}%`;
  document.getElementById('reportCompletedBar').style.width = total === 0 ? '0%' : `${(completed / total) * 100}%`;

  document.getElementById('reportHighCount').textContent = high;
  document.getElementById('reportMedCount').textContent = med;
  document.getElementById('reportLowCount').textContent = low;

  document.getElementById('reportHighBar').style.width = total === 0 ? '0%' : `${(high / total) * 100}%`;
  document.getElementById('reportMedBar').style.width = total === 0 ? '0%' : `${(med / total) * 100}%`;
  document.getElementById('reportLowBar').style.width = total === 0 ? '0%' : `${(low / total) * 100}%`;

  document.getElementById('reportOverdueCount').textContent = overdue;
}

function switchView(viewName) {
  state.currentView = viewName;

  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.style.display = 'none';
  });

  const activePanel = document.getElementById(`${viewName}View`);
  if (activePanel) {
    activePanel.style.display = 'block';
  }

  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    if (btn.dataset.view === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (viewName === 'tasks') {
    renderTasks();
  } else if (viewName === 'dashboard') {
    updateDashboard();
  } else if (viewName === 'reports') {
    updateReports();
  }

  closeMobileSidebar();
}

function openTaskModal(taskIdToEdit) {
  const modal = document.getElementById('taskModalBackdrop');
  const titleEl = document.getElementById('modalTitle');
  const submitBtn = document.getElementById('modalSubmitBtn');
  const form = document.getElementById('taskForm');
  const errorEl = document.getElementById('titleError');

  form.reset();
  errorEl.style.display = 'none';

  if (taskIdToEdit) {
    const existing = state.tasks.find(t => t.id === taskIdToEdit);
    if (existing) {
      document.getElementById('editTaskId').value = existing.id;
      document.getElementById('taskTitleInput').value = existing.title || '';
      document.getElementById('taskDescInput').value = existing.description || '';
      document.getElementById('taskDueDateInput').value = existing.dueDate || '';
      document.getElementById('taskPriorityInput').value = existing.priority || 'Medium';
      document.getElementById('taskCategoryInput').value = existing.category || '';
      document.getElementById('taskStatusInput').value = existing.status || 'pending';
      document.getElementById('taskCommentsInput').value = existing.commentsCount || 0;
      document.getElementById('taskAttachmentsInput').value = existing.attachmentsCount || 0;

      titleEl.textContent = 'Edit Task';
      submitBtn.textContent = 'Save Changes';
    }
  } else {
    document.getElementById('editTaskId').value = '';
    document.getElementById('taskStatusInput').value = 'pending';
    document.getElementById('taskPriorityInput').value = 'Medium';
    document.getElementById('taskCommentsInput').value = 0;
    document.getElementById('taskAttachmentsInput').value = 0;

    titleEl.textContent = 'New Task';
    submitBtn.textContent = 'Create Task';
  }

  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
  document.getElementById('taskTitleInput').focus();
}

function closeTaskModal() {
  document.getElementById('taskModalBackdrop').style.display = 'none';
  document.body.classList.remove('modal-open');
}

function handleTaskFormSubmit(e) {
  e.preventDefault();

  const titleInput = document.getElementById('taskTitleInput');
  const errorEl = document.getElementById('titleError');
  const titleVal = titleInput.value.trim();

  if (!titleVal) {
    errorEl.style.display = 'block';
    titleInput.focus();
    return;
  }
  errorEl.style.display = 'none';

  const editId = document.getElementById('editTaskId').value;
  const descVal = document.getElementById('taskDescInput').value.trim();
  const dueDateVal = document.getElementById('taskDueDateInput').value;
  const priorityVal = document.getElementById('taskPriorityInput').value;
  const categoryVal = document.getElementById('taskCategoryInput').value.trim();
  const statusVal = document.getElementById('taskStatusInput').value;
  const commentsVal = parseInt(document.getElementById('taskCommentsInput').value, 10) || 0;
  const attachmentsVal = parseInt(document.getElementById('taskAttachmentsInput').value, 10) || 0;

  if (editId) {
    const taskIndex = state.tasks.findIndex(t => t.id === editId);
    if (taskIndex !== -1) {
      state.tasks[taskIndex] = {
        ...state.tasks[taskIndex],
        title: titleVal,
        description: descVal,
        dueDate: dueDateVal,
        priority: priorityVal,
        category: categoryVal,
        status: statusVal,
        commentsCount: commentsVal,
        attachmentsCount: attachmentsVal,
        updatedAt: new Date().toISOString()
      };
      saveTasks();
      showToast('Task updated successfully');
    }
  } else {
    const newTask = {
      id: 'task-' + Date.now(),
      title: titleVal,
      description: descVal,
      dueDate: dueDateVal,
      priority: priorityVal,
      category: categoryVal,
      status: statusVal,
      commentsCount: commentsVal,
      attachmentsCount: attachmentsVal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    state.tasks.unshift(newTask);
    saveTasks();
    showToast('Task created successfully');
  }

  closeTaskModal();
  renderTasks();
  updateDashboard();
  updateReports();
}

function toggleTaskStatus(taskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  task.status = task.status === 'completed' ? 'pending' : 'completed';
  task.updatedAt = new Date().toISOString();
  saveTasks();
  renderTasks();
  updateDashboard();
  updateReports();

  if (task.status === 'completed') {
    showToast('Task marked as completed');
  } else {
    showToast('Task marked as pending');
  }
}

function openConfirmDelete(taskId) {
  state.deleteCandidateId = taskId;
  document.getElementById('confirmModalBackdrop').style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeConfirmModal() {
  state.deleteCandidateId = null;
  document.getElementById('confirmModalBackdrop').style.display = 'none';
  document.body.classList.remove('modal-open');
}

function executeDeleteTask() {
  if (!state.deleteCandidateId) return;

  state.tasks = state.tasks.filter(t => t.id !== state.deleteCandidateId);
  saveTasks();
  closeConfirmModal();
  renderTasks();
  updateDashboard();
  updateReports();
  showToast('Task deleted');
}

function toggleFilterPopover(e) {
  if (e) e.stopPropagation();
  const popover = document.getElementById('filterPopover');
  const backdrop = document.getElementById('filterBackdrop');
  if (!popover) return;
  const willOpen = !popover.classList.contains('open');

  if (willOpen) {
    popover.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('filter-open');
  } else {
    popover.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('filter-open');
  }
}

function closeFilterPopover() {
  const popover = document.getElementById('filterPopover');
  const backdrop = document.getElementById('filterBackdrop');
  if (popover) {
    popover.classList.remove('open');
  }
  if (backdrop) {
    backdrop.classList.remove('active');
  }
  document.body.classList.remove('filter-open');
}

function toggleSidebarCollapse() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const isOpen = sidebar.classList.contains('mobile-open');

  if (isOpen) {
    sidebar.classList.remove('mobile-open');
    backdrop.classList.remove('active');
  } else {
    sidebar.classList.add('mobile-open');
    backdrop.classList.add('active');
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  sidebar.classList.remove('mobile-open');
  backdrop.classList.remove('active');
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => {
      toast.remove();
    }, 200);
  }, 2200);
}

function resetToDefaultSampleTasks() {
  state.tasks = JSON.parse(JSON.stringify(defaultTasks));
  saveTasks();
  renderTasks();
  updateDashboard();
  updateReports();
  showToast('Sample tasks loaded');
  switchView('tasks');
}

function setupEventListeners() {
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view) switchView(view);
    });
  });

  const collapseBtn = document.getElementById('collapseBtn');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', toggleSidebarCollapse);
  }

  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMobileSidebar);
  }

  const backdrop = document.getElementById('sidebarBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeMobileSidebar);
  }

  const newTaskBtn = document.getElementById('newTaskBtn');
  if (newTaskBtn) {
    newTaskBtn.addEventListener('click', () => openTaskModal(null));
  }

  const filterToggleBtn = document.getElementById('filtersToggleBtn');
  if (filterToggleBtn) {
    filterToggleBtn.addEventListener('click', toggleFilterPopover);
  }

  const filterPopover = document.getElementById('filterPopover');
  if (filterPopover) {
    filterPopover.addEventListener('click', e => e.stopPropagation());
  }

  const filterCloseBtn = document.getElementById('filterCloseBtn');
  if (filterCloseBtn) {
    filterCloseBtn.addEventListener('click', closeFilterPopover);
  }

  const applyFiltersBtn = document.getElementById('applyFiltersBtn');
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
      closeFilterPopover();
      showToast('Filters applied');
    });
  }

  const filterBackdrop = document.getElementById('filterBackdrop');
  if (filterBackdrop) {
    filterBackdrop.addEventListener('click', closeFilterPopover);
  }

  document.addEventListener('click', e => {
    const popover = document.getElementById('filterPopover');
    const toggleBtn = document.getElementById('filtersToggleBtn');
    if (popover && popover.classList.contains('open') && !toggleBtn.contains(e.target)) {
      closeFilterPopover();
    }
  });

  document.getElementById('filterStatus').addEventListener('change', e => {
    state.filters.status = e.target.value;
    renderTasks();
  });

  document.getElementById('filterPriority').addEventListener('change', e => {
    state.filters.priority = e.target.value;
    renderTasks();
  });

  document.getElementById('filterDate').addEventListener('change', e => {
    state.filters.date = e.target.value;
    renderTasks();
  });

  document.getElementById('filterCategory').addEventListener('change', e => {
    state.filters.category = e.target.value;
    renderTasks();
  });

  document.getElementById('clearFiltersBtn').addEventListener('click', clearAllFilters);
  document.getElementById('resetFiltersBarBtn').addEventListener('click', clearAllFilters);

  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');

  searchInput.addEventListener('input', e => {
    state.filters.search = e.target.value;
    searchClearBtn.style.display = e.target.value.length > 0 ? 'block' : 'none';
    renderTasks();
  });

  searchClearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchClearBtn.style.display = 'none';
    state.filters.search = '';
    renderTasks();
    searchInput.focus();
  });

  document.getElementById('sortSelect').addEventListener('change', e => {
    state.sortBy = e.target.value;
    renderTasks();
  });

  const taskListEl = document.getElementById('taskList');
  taskListEl.addEventListener('click', e => {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const taskId = actionBtn.dataset.id;

    if (action === 'toggle') {
      toggleTaskStatus(taskId);
    } else if (action === 'edit') {
      openTaskModal(taskId);
    } else if (action === 'delete') {
      openConfirmDelete(taskId);
    }
  });

  document.getElementById('taskForm').addEventListener('submit', handleTaskFormSubmit);
  document.getElementById('modalCancelBtn').addEventListener('click', closeTaskModal);
  document.getElementById('modalCloseBtn').addEventListener('click', closeTaskModal);

  document.getElementById('confirmCancelBtn').addEventListener('click', closeConfirmModal);
  document.getElementById('confirmCloseBtn').addEventListener('click', closeConfirmModal);
  document.getElementById('confirmOkBtn').addEventListener('click', executeDeleteTask);

  document.getElementById('taskModalBackdrop').addEventListener('click', e => {
    if (e.target.id === 'taskModalBackdrop') closeTaskModal();
  });

  document.getElementById('confirmModalBackdrop').addEventListener('click', e => {
    if (e.target.id === 'confirmModalBackdrop') closeConfirmModal();
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeTaskModal();
      closeConfirmModal();
      closeFilterPopover();
    }
  });

  const welcomeGoBtn = document.getElementById('welcomeGoTasksBtn');
  if (welcomeGoBtn) {
    welcomeGoBtn.addEventListener('click', () => switchView('tasks'));
  }

  const welcomeResetBtn = document.getElementById('welcomeResetSampleBtn');
  if (welcomeResetBtn) {
    welcomeResetBtn.addEventListener('click', resetToDefaultSampleTasks);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  setupEventListeners();
  renderTasks();
  updateDashboard();
  updateReports();
});
