// Função para atualizar a data e hora
function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    const now = new Date();
    datetimeElement.textContent = now.toLocaleString('pt-BR');
}

// Atualiza a data e hora a cada segundo
setInterval(updateDateTime, 1000);

// Simulação de dados (substitua por dados reais conforme necessário)
document.getElementById('pressure').textContent = '5.0';
document.getElementById('temperature').textContent = '25.5';
document.getElementById('compressor-status').textContent = 'Sim';
document.getElementById('responsible').textContent = 'João Silva';

// Chama a função para atualizar a data e hora imediatamente
updateDateTime();
