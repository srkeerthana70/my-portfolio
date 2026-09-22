/**
 * Projects Filtering & Interactive Modal Preview
 */

(function initProjects() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalBody = document.getElementById('modal-project-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');

  // Project details database
  const projectDetails = {
    attendance: {
      category: 'AI Tools • Python & Automation',
      title: 'Student Attendance System',
      description: `
        <p><strong>Student Attendance System</strong> is an intelligent academic tracking solution engineered by leveraging modern AI tools and Python to streamline student attendance logging, minimize manual errors, and generate automated performance summaries.</p>
        <h4 style="color:var(--text-primary); margin: 16px 0 8px;">Key Features:</h4>
        <ul style="padding-left: 20px; margin-bottom: 16px;">
          <li>Automated student attendance logging with unique Student IDs, subjects, and timestamps.</li>
          <li>AI-assisted algorithm optimization and intelligent validation for error-free record keeping.</li>
          <li>Dynamic attendance percentage calculation with visual alerts for students falling below 75%.</li>
          <li>Automated exportable attendance reports (CSV/JSON/Text) formatted for academic audits and faculty review.</li>
          <li>Clean and responsive user interface designed for speed and simplicity in lecture halls.</li>
        </ul>
        <h4 style="color:var(--text-primary); margin: 16px 0 8px;">Engineering Architecture:</h4>
        <p>Built using Python data management logic combined with prompt-engineered AI tools for rapid scaffolding and edge-case testing. Uses hash-map data structures for O(1) student status lookup and automated CSV/file persistence.</p>
      `
    }
  };

  // Filter Buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Handlers
  document.querySelectorAll('.project-details-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = projectDetails[projectId];
      if (data && modal) {
        modalCategory.textContent = data.category;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.description;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();
