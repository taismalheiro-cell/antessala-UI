// ANTESSALA UI INTERACTION SCRIPT

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initGraph();
    initTabs();
    initModal();
    initCopyBtn();
});

// 1. COUNTDOWN TIMER SIMULATION
function initCountdown() {
    let minutes = 14;
    let seconds = 32;
    const countdownEl = document.getElementById('countdown');

    setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            }
        }
        const mStr = String(minutes).padStart(2, '0');
        const sStr = String(seconds).padStart(2, '0');
        if (countdownEl) countdownEl.textContent = `${mStr}:${sStr}`;
    }, 1000);
}

// 2. GRAFO NEXALISTA INTERACTION & SVG CONNECTING LINES
const nodeData = {
    '1': {
        name: 'Dr. Ricardo Silveira',
        role: 'VP de Operações • Nexus Tech',
        avatar: 'RS',
        comm: 'Direto, orientado a dados. Prefere gráficos simples a apresentações longas.',
        history: 'Ex-McKinsey (4 anos). Está há 2 anos na Nexus reestruturando processos operacionais de vendas.',
        affinity: 'Palestrou recentemente no evento SaaS Summit 2026 sobre "Eficiência Operacional em Vendas B2B".'
    },
    '2': {
        name: 'Fernanda Alves',
        role: 'Head de Sales Enablement • Nexus Tech',
        avatar: 'FA',
        comm: 'Pragmática, focada em adoção da equipe. Preocupa-se com a curva de aprendizado dos SDRs.',
        history: 'Ex-Resultados Digitais. Especialista em Playbooks de vendas e automação de prospecção.',
        affinity: 'Conectou-se no LinkedIn com 3 executivos da sua empresa no mês passado.'
    },
    '3': {
        name: 'Gabriel Mendes',
        role: 'Gerente de TI & SecOps • Nexus Tech',
        avatar: 'GM',
        comm: 'Rigoroso com segurança de dados (LGPD/SOC2) e facilidade de integração via API/SSO.',
        history: 'Liderou a migração de infraestrutura da empresa para nuvem AWS no ano passado.',
        affinity: 'Publicou artigo no Medium sobre "Arquitetura de Dados Segura em Ferramentas de IA".'
    }
};

function initGraph() {
    const graphCanvas = document.getElementById('graphCanvas');
    const graphSvg = document.getElementById('graphSvg');
    const nodes = document.querySelectorAll('.node-item');

    function drawLines() {
        if (!graphCanvas || !graphSvg) return;
        graphSvg.innerHTML = ''; // clear

        const canvasRect = graphCanvas.getBoundingClientRect();

        const n1 = document.getElementById('node-1');
        const n2 = document.getElementById('node-2');
        const n3 = document.getElementById('node-3');

        if (!n1 || !n2 || !n3) return;

        const p1 = getNodeCenter(n1, canvasRect);
        const p2 = getNodeCenter(n2, canvasRect);
        const p3 = getNodeCenter(n3, canvasRect);

        // Draw Line 1 -> 2
        drawLine(graphSvg, p1.x, p1.y, p2.x, p2.y, '#FF5A1F', '3', '5,5');
        // Draw Line 1 -> 3
        drawLine(graphSvg, p1.x, p1.y, p3.x, p3.y, '#6366F1', '2', '4,4');
        // Draw Line 2 -> 3
        drawLine(graphSvg, p2.x, p2.y, p3.x, p3.y, '#D4D4D8', '1.5', '2,2');
    }

    function getNodeCenter(node, canvasRect) {
        const rect = node.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - canvasRect.left,
            y: rect.top + rect.height / 2 - canvasRect.top
        };
    }

    function drawLine(svg, x1, y1, x2, y2, color, width, dash = '') {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', width);
        if (dash) line.setAttribute('stroke-dasharray', dash);
        svg.appendChild(line);
    }

    // Initial draw & draw on resize
    setTimeout(drawLines, 100);
    window.addEventListener('resize', drawLines);

    // Node Click Handlers
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const id = node.getAttribute('data-node');
            const data = nodeData[id];

            if (data) {
                document.getElementById('detailAvatar').textContent = data.avatar;
                document.getElementById('detailName').textContent = data.name;
                document.getElementById('detailRole').textContent = data.role;
                document.getElementById('detailCommunication').textContent = data.comm;
                document.getElementById('detailHistory').textContent = data.history;
                document.getElementById('detailAffinity').textContent = data.affinity;
            }
        });
    });
}

// 3. TAB CONTROLS (DOSSIÊ COMPLETO)
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const pane = document.getElementById(`tab-${targetTab}`);
            if (pane) pane.classList.add('active');
        });
    });
}

// 4. WHATSAPP MODAL
function initModal() {
    const openBtn = document.getElementById('openWhatsappModal');
    const closeBtn = document.getElementById('closeWhatsappModal');
    const modal = document.getElementById('whatsappModal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// 5. COPY BRIEFING BUTTON
function initCopyBtn() {
    const btn = document.getElementById('copyBriefingBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const briefingText = `⚡ ANTESSALA — BRIEFING TÁTICO DE ABERTURA
Reunião: Nexus Tech Solutions x ACME Corp

1. Interlocutor: Dr. Ricardo Silveira (VP Operações - ex-McKinsey). Focus em ROI.
2. Gatilho: Série A de R$ 18M há 3 semanas. Expansão do time.
3. Dor: 45 min perdidos por pré-vendedor em pesquisa manual.
4. Objeção: Achar que substitui CRM. Antessala opera na preparação ANTES do CRM.
5. Gancho: Cumprimentar pela captação e abordar ganho de eficiência por call.`;

        navigator.clipboard.writeText(briefingText).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Briefing Copiado!</span>
            `;
            btn.style.backgroundColor = '#10B981';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
            }, 2500);
        });
    });
}
