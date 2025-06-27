// Controle de páginas simuladas
const btnInicio = document.getElementById("btnInicio");
const btnEstudo = document.getElementById("btnEstudo");
const btnPerfil = document.getElementById("btnPerfil");
const mainContent = document.getElementById("mainContent");
const paginaInicio = document.getElementById("paginaInicio");
const paginaEstudo = document.getElementById("paginaEstudo");
const paginaPerfil = document.getElementById("paginaPerfil");
const btnVoltar = document.getElementById("btnVoltar");

// Lista de vagas (expandida para 12 vagas)
const vagas = [
  {
    empresa: "Nissan",
    titulo: "Técnico Mecânico",
    curso: "Técnico em Mecânica",
    chances: 40,
  },
  {
    empresa: "Toyota",
    titulo: "Engenheiro de Produção",
    curso: "Engenharia de Produção",
    chances: 90,
  },
  {
    empresa: "CSN",
    titulo: "Assistente Administrativo",
    curso: "Ensino Médio Completo",
    chances: 85,
  },
  {
    empresa: "Volkswagen",
    titulo: "Analista de Sustentabilidade",
    curso: "Engenharia Ambiental",
    chances: 75,
  },
  {
    empresa: "Ford",
    titulo: "Especialista em Qualidade",
    curso: "Engenharia de Qualidade",
    chances: 60,
  },
  {
    empresa: "Hyundai",
    titulo: "Técnico em Manutenção",
    curso: "Técnico em Mecânica",
    chances: 55,
  },
  {
    empresa: "Peugeot",
    titulo: "Designer Industrial",
    curso: "Design",
    chances: 45,
  },
  {
    empresa: "ArcelorMittal",
    titulo: "Engenheiro de Materiais",
    curso: "Engenharia de Materiais",
    chances: 70,
  },
  {
    empresa: "Michelin",
    titulo: "Analista de Processos",
    curso: "Administração",
    chances: 65,
  },
  {
    empresa: "Honda",
    titulo: "Técnico em Qualidade",
    curso: "Técnico em Qualidade",
    chances: 50,
  },
  {
    empresa: "Volvo",
    titulo: "Engenheiro de Segurança",
    curso: "Engenharia de Segurança do Trabalho",
    chances: 80,
  },
  {
    empresa: "Renault",
    titulo: "Analista de Logística",
    curso: "Logística",
    chances: 60,
  },
];

function mostrarPagina(pagina) {
  paginaInicio.style.display = "none";
  paginaEstudo.style.display = "none";
  paginaPerfil.style.display = "none";

  btnInicio.classList.remove("active");
  btnEstudo.classList.remove("active");
  btnPerfil.classList.remove("active");

  if (pagina === "inicio") {
    paginaInicio.style.display = "block";
    btnInicio.classList.add("active");
    mainContent.classList.remove("form-active");
    btnVoltar.style.display = "none";
  } else if (pagina === "estudo") {
    paginaEstudo.style.display = "block";
    btnEstudo.classList.add("active");
    mainContent.classList.add("form-active");
    btnVoltar.style.display = "flex";
  } else if (pagina === "perfil") {
    paginaPerfil.style.display = "block";
    btnPerfil.classList.add("active");
    mainContent.classList.add("form-active");
    btnVoltar.style.display = "flex";
  }
}

btnInicio.onclick = () => mostrarPagina("inicio");
btnEstudo.onclick = () => mostrarPagina("estudo");
btnPerfil.onclick = () => mostrarPagina("perfil");
btnVoltar.onclick = () => mostrarPagina("inicio");

// Modal vagas (lupa)
const modalVagas = document.getElementById("modalVagas");
const abrirModalVagas = document.getElementById("abrirModalVagas");
const modalClose = document.getElementById("modalClose");
const listaVagasCompleta = document.getElementById("listaVagasCompleta");

abrirModalVagas.onclick = () => {
  modalVagas.classList.add("active");
  preencherListaVagas();
};
modalClose.onclick = () => {
  modalVagas.classList.remove("active");
};
modalVagas.onclick = (e) => {
  if (e.target === modalVagas) modalVagas.classList.remove("active");
};

function preencherListaVagas() {
  listaVagasCompleta.innerHTML = "";
  vagas.forEach((vaga) => {
    const vagaDiv = document.createElement("div");
    vagaDiv.className = "vaga-lista-item";
    vagaDiv.tabIndex = 0;
    vagaDiv.innerHTML = `
      <div class="vaga-lista-empresa">${vaga.empresa}</div>
      <div class="vaga-lista-titulo">${vaga.titulo}</div>
      <div class="vaga-lista-curso">Curso necessário: ${vaga.curso}</div>
      <div class="vaga-lista-chances">Chances: ${vaga.chances}%</div>
    `;
    listaVagasCompleta.appendChild(vagaDiv);
  });
}

// Chat PRISMA IA - respostas básicas
const chatMessages = document.querySelector(".chat-messages");
const chatInput = document.getElementById("chatInput");
const chatContainer = document.querySelector(".chat-container");
const btnAbrirChatIA = document.getElementById("btnAbrirChatIA");
const chatCloseBtn = document.querySelector(".chat-close-btn");

chatCloseBtn.onclick = () => {
  chatContainer.style.display = "none";
  btnAbrirChatIA.style.display = "flex";
};

btnAbrirChatIA.onclick = () => {
  chatContainer.style.display = "flex";
  btnAbrirChatIA.style.display = "none";
};

window.addEventListener("DOMContentLoaded", () => {
  chatContainer.style.display = "flex";
  btnAbrirChatIA.style.display = "none";

  // Ao carregar a página, exibe experiências já existentes na lista formatada
  const expMetaLista = document.getElementById("experienciasMetaLista");
  if (expMetaLista && window.listaExperienciasIniciais) {
    window.listaExperienciasIniciais.forEach((exp) => {
      const metaItem = document.createElement("div");
      metaItem.className = "meta-item";
      metaItem.innerHTML = `<span style=\"font-weight:700;color:#2563eb;\">${
        exp.cargo
      }</span> (${exp.entrada} - ${
        exp.saida || "Atual"
      })<span class=\"meta-destaque\" style=\"margin-left:8px;\">${
        exp.desc
      }</span>`;
      expMetaLista.appendChild(metaItem);
    });
  }
});

function sendMessage() {
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  const userDiv = document.createElement("div");
  userDiv.textContent = `Você: ${userMsg}`;
  chatMessages.appendChild(userDiv);

  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    const resposta = gerarResposta(userMsg.toLowerCase());
    const iaDiv = document.createElement("div");
    iaDiv.innerHTML = `<strong>PRISMA IA:</strong> ${resposta}`;
    chatMessages.appendChild(iaDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 700);
}

function gerarResposta(msg) {
  if (msg.includes("oi") || msg.includes("olá")) {
    return "Olá! Posso ajudar com vagas, cursos, ou montar seu currículo. O que deseja?";
  }
  if (msg.includes("vaga")) {
    return "Quer saber sobre vagas disponíveis? Clique no ícone de lupa para ver todas.";
  }
  if (msg.includes("curso")) {
    return "Posso recomendar cursos que aumentem suas chances nas vagas.";
  }
  if (msg.includes("currículo") || msg.includes("curriculo")) {
    return "Envie seu currículo na aba 'Perfil' para que eu possa ajudar a melhorá-lo.";
  }
  if (msg.includes("pcd")) {
    return "Temos vagas inclusivas específicas para PCD, garantindo acessibilidade e oportunidades justas.";
  }
  return "Desculpe, não entendi. Pode reformular sua pergunta?";
}

document.getElementById("formPerfil").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Perfil salvo com sucesso!");
  mostrarPagina("inicio");
});
document.getElementById("formEstudo").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Informações do curso salvas com sucesso!");
  mostrarPagina("inicio");
});
document.getElementById("formExperiencia").onsubmit = function (e) {
  e.preventDefault();
  const cargo = document.getElementById("cargoExp").value;
  const desc = document.getElementById("descricaoExp").value;
  const entrada = document.getElementById("entradaExp").value;
  const saida = document.getElementById("saidaExp").value;
  const lista = document.getElementById("listaExperiencias");
  const item = document.createElement("div");
  item.style =
    "background:#f0fdf4;border-radius:6px;padding:10px 14px;margin-bottom:10px;";
  item.innerHTML = `<strong style="color:#065f46;">${cargo}</strong> (${entrada} - ${
    saida || "Atual"
  })<br><span style="color:#065f46;">${desc}</span>`;
  lista.appendChild(item);

  // Adiciona também na lista formatada de experiências
  const expMetaLista = document.getElementById("experienciasMetaLista");
  const metaItem = document.createElement("div");
  metaItem.className = "meta-item";
  metaItem.innerHTML = `<span style="font-weight:700;color:#2563eb;">${cargo}</span> (${entrada} - ${
    saida || "Atual"
  })<span class="meta-destaque" style="margin-left:8px;">${desc}</span>`;
  expMetaLista.appendChild(metaItem);

  e.target.reset();
};

document
  .getElementById("formCadastroEmpresa")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Empresa cadastrada com sucesso!");
    // Aqui você pode adicionar lógica para salvar ou exibir os dados da empresa
    e.target.reset();
  });

// Iniciar com página início
mostrarPagina("inicio");
