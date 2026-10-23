/* Física Interativa - Aplicação */

const state = {
  screen: 'home',
  moduleId: null,
  questions: [],
  index: 0,
  answers: [],
  result: null,
  currentAnswer: null,
  searchTerm: ''
};

function $(id) {
  return document.querySelector(id);
}

function getModule(id) {
  return MODULES.find((m) => m.id === id);
}

function screenResultMessage(percent) {
  if (percent >= 90) return { icon: '🏆', text: 'Excelente! Você domina o conteúdo!' };
  if (percent >= 70) return { icon: '🌟', text: 'Muito bom! Continue praticando para ficar um expert.' };
  if (percent >= 50) return { icon: '💪', text: 'Bom começo! Revise o conteúdo e tente novamente.' };
  return { icon: '📚', text: 'Não desanime! Releia as explicações e refaça o quiz.' };
}

function moduleCardHtml(m) {
  const total = m.questions.length;
  return `
    <div class="card module-card" data-module-id="${m.id}">
      <div class="module-icon">${m.icon}</div>
      <div class="module-info">
        <h3>${m.title}</h3>
        <p>${m.description}</p>
        <span class="module-meta">📝 ${total} questões</span>
      </div>
      <div class="module-actions">
        <button class="btn ghost sm" data-action="study" data-module-id="${m.id}">📖 Estudar</button>
        <button class="btn primary sm" data-action="quiz" data-module-id="${m.id}">🎯 Fazer Quiz</button>
      </div>
    </div>
  `;
}

function getFilteredModules() {
  const term = (state.searchTerm || '').trim().toLowerCase();
  if (!term) return MODULES;
  return MODULES.filter((m) =>
    [m.id, m.title, m.description, m.icon].join(' ').toLowerCase().includes(term)
  );
}


function renderHome() {
  const totalQuestions = MODULES.reduce((acc, m) => acc + m.questions.length, 0);
  const app = document.getElementById('app');

  if (!app) {
    console.error('Elemento #app não encontrado.');
    return;
  }

  app.innerHTML = `
    <header class="app-header">
      <div class="logo">Física<em>·</em>IA</div>
      <p class="tagline">Aprenda com conteúdo, fórmulas e quizzes</p>
    </header>

    <section class="hero card">
      <h1>Plataforma de Estudos de Física</h1>
      <p>Aprenda os conceitos, entenda as fórmulas e treine com quizzes interativos. Tudo offline, como um app de verdade!</p>
      <div class="hero-stats">
        <div class="stat"><strong>${MODULES.length}</strong><span>Módulos</span></div>
        <div class="stat"><strong>${totalQuestions}</strong><span>Questões</span></div>
      </div>
    </section>

    <h2 class="section-title">Escolha um módulo</h2>
    <input class="search-input" type="text" id="search-input" placeholder="🔍 Buscar módulo..." />
    <div id="module-list" class="module-list"></div>
  `;

  const renderModuleList = () => {
    const filtered = getFilteredModules();
    $('#module-list').innerHTML = filtered.length
      ? filtered.map(moduleCardHtml).join('')
      : `<p class="no-results">Nenhum módulo encontrado para "${state.searchTerm}".</p>`;
  };

  renderModuleList();

  const searchInput = $('#search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchTerm = e.target.value;
      renderModuleList();
    });
  }
}


function renderModule(moduleId) {
  const m = getModule(moduleId);
  if (!m) { renderHome(); return; }

  $('#app').innerHTML = `
    <div class="module-hero card">
      <button class="btn ghost sm back-btn" data-action="home">← Voltar</button>
      <div class="module-icon big">${m.icon}</div>
      <h1>${m.title}</h1>
      <p>${m.description}</p>
    </div>

    ${m.sections.map((s) => `
      <div class="card section-card">
        <h2 class="section-title">${s.title}</h2>
        ${s.paragraphs.map((p) => `<p>${p}</p>`).join('')}
        ${s.formulas.length ? `<div class="formulas">${s.formulas.map((f) => `<div class="formula">${f}</div>`).join('')}</div>` : ''}
      </div>
    `).join('')}
  `;
}

function renderQuiz() {
  const m = getModule(state.moduleId);
  const questions = m.questions;
  const q = questions[state.index];

  $('#app').innerHTML = `
    <div class="quiz-top">
      <button class="btn ghost sm" data-action="module" data-module-id="${m.id}">← Módulo</button>
      <span class="quiz-count">Questão ${state.index + 1} de ${questions.length}</span>
    </div>
    <div class="progress"><div class="progress-bar" id="progress-bar" style="width: ${((state.index) / questions.length) * 100}%"></div></div>

    <div class="card quiz-card">
      <h2 class="quiz-question">${q.q}</h2>
      <div class="options" id="options">
        ${q.options.map((o, i) => `<button class="option" data-opt="${i}">${o}</button>`).join('')}
      </div>
      <div class="quiz-footer">
        <button class="btn primary" id="btn-next" ${state.currentAnswer === null ? 'disabled' : ''}>
          ${state.index === questions.length - 1 ? 'Enviar Respostas' : 'Salvar e Continuar'}
        </button>
      </div>
    </div>
  `;

  const bar = $('#progress-bar');
  bar.style.transition = 'width 0.3s ease';
  bar.style.width = `${((state.index) / questions.length) * 100}%`;

  const btnNext = $('#btn-next');
  btnNext.addEventListener('click', () => {
    if (state.currentAnswer === null) return;
    if (state.index < questions.length - 1) {
      state.answers.push(state.currentAnswer);
      state.index += 1;
      state.currentAnswer = null;
      renderQuiz();
    } else {
      state.answers.push(state.currentAnswer);
      submitQuiz();
    }
  });
}

function renderResult() {
  const m = getModule(state.moduleId);
  const total = state.answers.length;
  const correct = state.answers.filter((a, i) => a === state.questions[i].answer).length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const msg = screenResultMessage(percent);

  $('#app').innerHTML = `
    <div class="card result-card">
      <div class="result-icon">${msg.icon}</div>
      <h1>Quiz Concluído!</h1>
      <p class="result-module">${m.icon} ${m.title}</p>

      <div class="score-circle" id="score-circle">
        <span class="score-percent" id="score-percent">${percent}%</span>
        <span class="score-total" id="score-total">Nota ${percent >= 60 ? 'Aprovado' : 'Reprovado'} · ${correct} de ${total} questões</span>
      </div>

      <div class="result-stats">
        <div class="stat-card"><strong>${correct}</strong><span>✔ Acertos</span></div>
        <div class="stat-card"><strong>${total - correct}</strong><span>✘ Erros</span></div>
        <div class="stat-card"><strong>${percent}%</strong><span>📊 Percentual</span></div>
      </div>

      <p class="result-message">${msg.text}</p>

      <div class="result-actions">
        <button class="btn primary" data-action="quiz" data-module-id="${m.id}">🔄 Refazer Quiz</button>
        <button class="btn ghost" data-action="module" data-module-id="${m.id}">📖 Estudar Conteúdo</button>
        <button class="btn ghost" data-action="home">🏠 Início</button>
      </div>
    </div>

    <div class="card review-card">
      <h2 class="section-title">Revisão das questões</h2>
      ${state.questions.map((q, i) => {
        const userAns = state.answers[i];
        const ok = userAns === q.answer;
        return `
          <div class="review-item ${ok ? 'ok' : 'wrong'}">
            <p class="review-question">${i + 1}. ${q.q}</p>
            <p class="review-answer">
              ${ok
                ? `✔ ${q.options[q.answer]} — Correto!`
                : `✘ Sua resposta: ${q.options[userAns] || '—'}. A correta é: ${q.options[q.answer]}.`}
            </p>
            <p class="review-explanation">${q.explanation}</p>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function submitQuiz() {
  const total = state.answers.length;
  const correct = state.answers.filter((a, i) => a === state.questions[i].answer).length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  state.result = { moduleId: state.moduleId, correct, total, percent };
  state.screen = 'result';
  renderResult();
}

function startQuiz(moduleId) {
  const m = getModule(moduleId);
  state.screen = 'quiz';
  state.moduleId = moduleId;
  state.questions = m.questions;
  state.index = 0;
  state.answers = [];
  state.result = null;
  state.currentAnswer = null;
  renderQuiz();
}

function render() {
  if (state.screen === 'home') renderHome();
  else if (state.screen === 'module') renderModule(state.moduleId);
  else if (state.screen === 'quiz') renderQuiz();
  else if (state.screen === 'result') renderResult();
}

/* ---------- Eventos (delegados) ---------- */

function handleQuizClick(e) {
  const optBtn = e.target.closest('[data-opt]');
  const nextBtn = e.target.closest('#btn-next');
  const actionBtn = e.target.closest('[data-action]');

  if (optBtn) {
    const idx = Number(optBtn.dataset.opt);
    document.querySelectorAll('.option').forEach((b) => b.classList.remove('selected'));
    optBtn.classList.add('selected');
    state.currentAnswer = idx;
    const btn = document.getElementById('btn-next');
    if (btn) btn.disabled = false;
    return;
  }

  if (nextBtn) {
    if (state.currentAnswer === null) return;
    if (state.index < state.questions.length - 1) {
      state.answers.push(state.currentAnswer);
      state.index += 1;
      state.currentAnswer = null;
      renderQuiz();
    } else {
      state.answers.push(state.currentAnswer);
      submitQuiz();
    }
    return;
  }

  if (actionBtn) {
    const action = actionBtn.dataset.action;
    const moduleId = actionBtn.dataset.moduleId;
    if (action === 'home') { state.screen = 'home'; render(); }
    else if (action === 'module' || action === 'study') { state.screen = 'module'; state.moduleId = moduleId; render(); }
    else if (action === 'quiz') startQuiz(moduleId);
  }
}

document.getElementById('app').addEventListener('click', handleQuizClick);

render();
