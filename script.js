// --- 31 FRASES ESTILO DIALETO GAMER ---
const sarcasmPhrases = [
    "Bora logar, herói! Suas missões de hoje já estão liberadas no mapa!",
    "Uau! Você completou uma tarefa? Ganhou +100 pontos de parceria!",
    "Não deixe o vilão da preguiça vencer hoje. Ative o seu superfoco!",
    "Completar as missões de casa te deixa mais perto do nível lendário!",
    "Beber água te dá um escudo azul de proteção. Vai lá tomar um copo!",
    "Arrumar o seu quarto deixa o seu inventário organizado. Boa, jogador!",
    "Olha só, o player 1 resolveu avançar na fase! Continue assim!",
    "Eita, o jogo começou! Quem vai vencer hoje: você ou a bagunça?",
    "Cada tarefa feita é uma moeda de ouro virtual que você ganha!",
    "Seu nível de energia está alto! Use esse poder para ajudar o clã da casa.",
    "Lavar o seu prato é como limpar a sua área do mapa depois da batalha.",
    "Upar suas habilidades na escola te transforma em um mago muito sábio!",
    "Cuidado para o monstro da TV não te deixar congelado por muito tempo!",
    "Fazer os deveres é a quest principal. Não vale ficar só no lobby esperando!",
    "Nossa, você está jogando muito bem hoje! Nenhuma missão vai sobrar?",
    "Lembrar de tomar banho recupera 100% da sua barra de vida e energia!",
    "Ajudar a Gamora 🐶 te dá o título oficial de Protetor dos Animais!",
    "Preparar a mochila para amanhã é salvar o jogo antes de desligar.",
    "O chefe final do dia é o sono! Vamos vencer todas as tarefas antes de dormir?",
    "Colocar as roupas no lugar certo limpa a tela para a próxima fase.",
    "Você tem o superpoder de fazer tudo rapidinho quando quer. Ativa ele aí!",
    "Se o dia fosse um campeonato, você já estaria liderando o placar!",
    "Nenhum mestre dos jogos desiste na primeira tentativa. Força, campeão!",
    "Seus pais são os comandantes do time. Siga as instruções para vencer!",
    "Olha esse progresso subindo! A torcida está vibrando por você!",
    "Estudar e ler livros te dá o poder de ler mapas secretos no futuro!",
    "Organizar o sofá deixa a base secreta pronta para a próxima reunião.",
    "Fazer as tarefas sem ninguém pedir te dá o troféu secreto de Ouro!",
    "Não jogue o controle no chão se errar. Respire fundo e tente de novo!",
    "Você é o herói dessa história! Vamos deixar o mapa brilhando hoje?",
    "Gamer de verdade ajuda a equipe. Vamos juntos completar essa lista!"
];

// --- LISTA OFICIAL DE MISSÕES (THEO) ---
const eliteRoutine = [
    { name: "Arrumar as camas", done: false },
    { name: "Guardar brinquedos e objetos", done: false },
    { name: "Organizar a mochila e o material escolar", done: false },
    { name: "Dobrar e guardar as roupas", done: false },
    { name: "Lavar o próprio prato, copo e talheres (sujou, lavou)", done: false },
    { name: "Varrer a casa", done: false },
    { name: "Retirar o lixo", done: false },
    { name: "Organizar o sofá e as almofadas", done: false },
    { name: "Guardar louças", done: false },
    { name: "Colocar água e ração para a Gamora 🐶", done: false },
    { name: "Lanchar às 15 ou 16 horas", done: false },
    { name: "Tomar banho às 17 horas", done: false },
    { name: "Escrever uma página do livro", done: false },
    { name: "Fazer as atividades da fono", done: false }
];

// --- MAPEAMENTO DOS 8 FUNDOS DISPONÍVEIS ---
const backgroundImages = [
    "img/fundo01.png",
    "img/fundo02.jpg",
    "img/fundo03.jpg",
    "img/fundo04.webp",
    "img/fundo05.jpeg",
    "img/fundo06.jpg",
    "img/fundo07.png",
    "img/fundo08.png"
];

// Banco de dados local e controle de dias
let db = JSON.parse(localStorage.getItem('habit_tracker_elite')) || {};
let activeDay = new Date().getDate();

// Inicialização da aplicação
function init() {
    const now = new Date();
    const monthDisplay = document.getElementById('month-display');
    if(monthDisplay) {
        monthDisplay.innerText = now.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    }
    
    // Configura e inicia a rotação dos fundos aleatórios a cada 10 segundos
    changeBackgroundRandomly();
    setInterval(changeBackgroundRandomly, 10000);

    renderApp();
}

// Sorteia e aplica um dos 8 fundos na tela
function changeBackgroundRandomly() {
    if (backgroundImages.length === 0) return;
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    document.body.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
}

// Renderizador Mestre
function renderApp() {
    renderCalendar();
    renderChecklist();
    updateAvatarRotation();
}

// CORREÇÃO AQUI: Força a troca instantânea limpando o cache do navegador ao mudar o dia
function updateAvatarRotation() {
    const avatarImg = document.getElementById('avatar-img');
    if (avatarImg) {
        const cacheBuster = `?t=${new Date().getTime()}`;
        if (activeDay % 2 === 0) {
            avatarImg.src = "img/Theo02.png" + cacheBuster;
        } else {
            avatarImg.src = "img/Theo01.png" + cacheBuster;
        }
    }
}

// Renderiza a grade de dias do calendário
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    // Cabeçalho dos dias
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    weekDays.forEach(day => {
        const el = document.createElement('div');
        el.className = 'day-name';
        el.innerText = day;
        grid.appendChild(el);
    });

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const firstDay = new Date(year, month, 1).getDay(); 
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Espaços em branco do início do mês
    for (let i = 0; i < firstDay; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // Geração dos blocos de dias
    for (let i = 1; i <= daysInMonth; i++) {
        const dayTasks = db[i] || JSON.parse(JSON.stringify(eliteRoutine));
        const done = dayTasks.filter(t => t.done).length;
        const total = dayTasks.length;
        const perc = total > 0 ? (done / total) * 100 : 0;

        const box = document.createElement('div');
        box.className = 'day-box';
        box.innerText = i;
        
        // Bordas e destaques do dia ativo selecionado (Azul Neon)
        if (i === activeDay) {
            box.style.borderColor = "var(--neon-blue)";
            box.style.boxShadow = "0 0 15px var(--neon-blue)";
        }

        // Aplicação das regras de conquistas do Theo
        if (perc === 100) {
            box.classList.add('status-complete');  // Todo Concluído: Controle Gamer (🎮) + Neon Azul
        } else if (perc >= 50) {
            box.classList.add('status-almost');    // Metade ou mais: Picareta (⛏️) + Neon Vermelho
        }

        box.onclick = () => { 
            activeDay = i; 
            const textElement = document.getElementById('sarcasm-text');
            if(textElement) {
                textElement.innerText = sarcasmPhrases[Math.floor(Math.random() * sarcasmPhrases.length)];
            }
            renderApp(); 
        };
        grid.appendChild(box);
    }
}

// Renderiza a lista de missões diárias
function renderChecklist() {
    const list = document.getElementById('task-list');
    const dayLabel = document.getElementById('day-label');
    const progressVal = document.getElementById('progress-val');
    
    if (!list || !dayLabel) return;
    
    list.innerHTML = '';
    dayLabel.innerText = `Dia ${activeDay}`;
    
    if (!db[activeDay]) {
        db[activeDay] = JSON.parse(JSON.stringify(eliteRoutine));
    }

    // Ordenação dinâmica: Feitas vão para o final da lista
    const sorted = [...db[activeDay]].map((t, i) => ({...t, originalIndex: i}))
                                     .sort((a, b) => a.done - b.done);

    sorted.forEach(task => {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.innerHTML = `
            <span>
                <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${task.originalIndex})">
                <label style="${task.done ? 'text-decoration:line-through; opacity:0.4;' : ''}">
                    ${task.name}
                </label>
            </span>
            <span class="delete-btn" onclick="deleteTaskWithSecurity(${task.originalIndex})">X</span>
        `;
        list.appendChild(item);
    });

    // Calcula e exibe a porcentagem de progresso do dia
    const doneCount = db[activeDay].filter(t => t.done).length;
    const totalCount = db[activeDay].length;
    const perc = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
    if(progressVal) progressVal.innerText = perc + "%";
}

// Alterna o estado (concluído ou não) de uma missão
window.toggleTask = (index) => {
    db[activeDay][index].done = !db[activeDay][index].done;
    saveAndRefresh();
};

// --- CONTROLE DE SEGURANÇA: EXCLUSÃO COM SENHA ---
window.deleteTaskWithSecurity = (index) => {
    const password = prompt("Digite a senha de 6 números para apagar esta missão:");
    if (password === "302001") {
        db[activeDay].splice(index, 1);
        saveAndRefresh();
    } else {
        alert("Senha incorreta! A missão não foi apagada.");
    }
};

// Adiciona uma nova missão customizada na lista
const addBtn = document.getElementById('add-btn');
if(addBtn) {
    addBtn.onclick = () => {
        const input = document.getElementById('new-task-input');
        if (input && input.value.trim()) {
            db[activeDay].push({ name: input.value.trim(), done: false });
            input.value = '';
            saveAndRefresh();
        }
    };
}

// Salva as alterações no LocalStorage do navegador e atualiza o painel
function saveAndRefresh() {
    localStorage.setItem('habit_tracker_elite', JSON.stringify(db));
    renderApp();
}

// Dispara o inicializador quando o HTML terminar de carregar
document.addEventListener('DOMContentLoaded', init);