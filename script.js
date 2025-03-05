// Função para atualizar a data e hora
function atualizarDataHora() {
    const dataHoraElement = document.getElementById('data-hora');
    const now = new Date();
    dataHoraElement.textContent = `Data/Hora: ${now.toLocaleString()}`;
}

// Função para gerar o relatório em PDF
async function gerarRelatorio() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Relatório de Controle de Compressor', 10, 10);
    doc.text(`Data/Hora: ${new Date().toLocaleString()}`, 10, 20);

    // Adicionar informações dos compressores
    doc.text('Compressores:', 10, 30);
    for (let i = 1; i <= 5; i++) {
        const pressao = document.getElementById(`pressao-c${i}`).value;
        const temperatura = document.getElementById(`temperatura-c${i}`).value;
        doc.text(`Compressor ${i} - Pressão: ${pressao} bar, Temperatura: ${temperatura} °C`, 10, 40 + (i * 10));
    }

    // Adicionar informações dos secadores
    doc.text('Secadores:', 10, 100);
    for (let i = 1; i <= 2; i++) {
        const pressao = document.getElementById(`pressao-s${i}`).value;
        const temperatura = document.getElementById(`temperatura-s${i}`).value;
        doc.text(`Secador ${i} - Pressão: ${pressao} bar, Temperatura: ${temperatura} °C`, 10, 110 + (i * 10));
    }

    // Adicionar informações dos pulmões
    doc.text('Pulmões:', 10, 140);
    for (let i = 1; i <= 4; i++) {
        const pressao = document.getElementById(`pressao-p${i}`).value;
        const temperatura = document.getElementById(`temperatura-p${i}`).value;
        doc.text(`Pulmão ${i} - Pressão: ${pressao} bar, Temperatura: ${temperatura} °C`, 10, 150 + (i * 10));
    }

    const responsavel = document.getElementById('responsavel').value;
    doc.text(`Responsável: ${responsavel}`, 10, 200);

    // Adicionar foto ao PDF
    const fotoInput = document.getElementById('foto-input');
    if (fotoInput.files.length > 0) {
        const file = fotoInput.files[0];
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function () {
            doc.addImage(img, 'JPEG', 10, 210, 50, 50);
            doc.save('relatorio_compressor.pdf');
        };
    } else {
        doc.save('relatorio_compressor.pdf');
    }
}

// Atualizar a data e hora a cada segundo
setInterval(atualizarDataHora, 1000);
