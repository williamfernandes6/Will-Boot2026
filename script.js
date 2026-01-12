const socket = io();
let historico = []; let totalSinais = 0;

// TOUCH FRIENDLY WhatsApp
function buyVIP() {
    const message = encodeURIComponent(
        '🚀 VIP WILL-BOOT 2026 IA 96%\n\n' +
        '👤 Nome:\n📱 WhatsApp:\n💰 10.000 KWZ\n📲 942 051 820\n\n' +
        '8 CASAS + IA INTELIGENTE!'
    );
    window.open(`https://wa.me/244942051820?text=${message}`, '_blank');
}

// Socket Events
socket.on('init', (data) => {
    historico = data.historico; updateHistorico();
    updatePredicao(data.predicao);
    document.getElementById('usuarios-online').textContent = data.usuariosOnline.toLocaleString();
    document.getElementById('total-sinais').textContent = data.totalSinais.toLocaleString();
    document.getElementById('acuracia').textContent = data.acuracia.toFixed(1) + '%';
});

socket.on('new-signal', () => {
    totalSinais++; 
    document.getElementById('total-sinais').textContent = totalSinais.toLocaleString();
});

socket.on('historico-update', (data) => {
    historico = data; updateHistorico();
});

socket.on('predicao-update', updatePredicao);

function updateHistorico() {
    const list = document.getElementById('historico-list');
    if (!historico.length) return list.innerHTML = '<div class="loading">🧠 Carregando...</div>';
    
    list.innerHTML = historico.map(game => `
        <div class="historico-item ${getTypeClass(game.multiplier)}">
            <div class="multiplier">${game.multiplier.toFixed(1)}</div>
            <div class="time">${formatTime(game.timestamp)}</div>
            <div class="pattern">${game.pattern || '—'}</div>
        </div>
    `).join('');
}

function updatePredicao(data) {
    document.getElementById('predicao-text').textContent = data.prediction;
    document.getElementById('confidence').textContent = `${data.confidence}%`;
    document.getElementById('confidence-bar').style.width = `${data.confidence}%`;
    document.getElementById('media-recente').textContent = data.media;
    document.getElementById('tendencia').textContent = data.tendencia;
}

function getTypeClass(m) { 
    return m < 2.5 ? 'low' : m < 8 ? 'medium' : 'high'; 
}

function formatTime(ts) {
    return new Date(ts).toLocaleTimeString('pt-PT', { 
        hour: '2-digit', minute: '2-digit' 
    });
}

document.getElementById('refresh-btn').onclick = () => location.reload();

// Stats Auto-update
setInterval(() => {
    const lucro = (25 + Math.random() * 15).toFixed(1);
    document.querySelector('.stat:last-child .value').textContent = `${lucro}M KWZ`;
}, 7000);
