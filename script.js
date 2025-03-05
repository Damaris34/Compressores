// Função para atualizar a data e hora
function atualizarDataHora() {
    const dataHoraElement = document.getElementById('data-hora');
    const now = new Date();
    dataHoraElement.textContent = `Data/Hora: ${now.toLocaleString()}`;
}

// Função para gerar o relatório em PDF
function gerarRelatorio() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pressao = document.getElementById('pressao').textContent;
    const temperatura = document.getElementById('temperatura').textContent;
    const compressorStatus = document.getElementById('compressor-status').textContent;
    const responsavel = document.getElementById('responsavel').textContent;

    doc.text('Relatório de Controle de Compressor', 10, 10);
    doc.text(`Data/Hora: ${new Date().toLocaleString()}`, 10, 20);
    doc.text(`Pressão: ${pressao} bar`, 10, 30);
    doc.text(`Temperatura: ${temperatura} °C`, 10, 40);
    doc.text(`Compressor em operação: ${compressorStatus}`, 10, 50);
    doc.text(`Responsável: ${responsavel}`, 10, 60);

    doc.save('relatorio_compressor.pdf');
}

// Atualizar a data e hora a cada segundo
setInterval(atualizarDataHora, 1000);

// Exemplo de atualização dos dados (substituir por dados reais)
document.getElementById('pressao').textContent = '5.2';
document.getElementById('temperatura').textContent = '25';
document.getElementById('compressor-status').textContent = 'Sim';
document.getElementById('responsavel').textContent = 'João Silva';
