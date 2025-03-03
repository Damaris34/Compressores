function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const formattedDateTime = now.toLocaleDateString('pt-BR', options);
    datetimeElement.textContent = formattedDateTime;
}

// Atualiza a data e hora a cada segundo
setInterval(updateDateTime, 1000);

// Atualiza a data e hora imediatamente ao carregar a página
updateDateTime();

// Simulação de dados dinâmicos (substitua por dados reais conforme necessário)
function updateSystemInfo() {
    document.getElementById('pressure').textContent = `${Math.floor(Math.random() * 100)} PSI`;
    document.getElementById('temperature').textContent = `${Math.floor(Math.random() * 50)} °C`;
    document.getElementById('compressor').textContent = Math.random() > 0.5 ? 'Sim' : 'Não';
    document.getElementById('responsible').textContent = 'João Silva';
}

// Atualiza as informações do sistema a cada 5 segundos
setInterval(updateSystemInfo, 5000);

// Atualiza as informações do sistema imediatamente ao carregar a página
updateSystemInfo();

// Função para gerar relatório em Word
document.getElementById('generateWord').addEventListener('click', () => {
    const doc = new docx.Document();
    const datetime = document.getElementById('datetime').textContent;
    const pressure = document.getElementById('pressure').textContent;
    const temperature = document.getElementById('temperature').textContent;
  
