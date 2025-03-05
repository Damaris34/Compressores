// Função para atualizar a data e hora
function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const formattedTime = now.toLocaleTimeString('pt-BR');
    document.getElementById('datetime').textContent = `${formattedDate} ${formattedTime}`;
}

// Atualizar a data e hora a cada segundo
setInterval(updateDateTime, 1000);
updateDateTime(); // Atualizar imediatamente ao carregar a página

// Dados fictícios para compressores, secadores e pulmões
const compressors = [
    { name: 'Compressor 1', status: 'Operando', image: 'compressor1.jpg' },
    { name: 'Compressor 2', status: 'Parado', image: 'compressor2.jpg' },
    // Adicione mais compressores conforme necessário
];

const dryers = [
    { name: 'Secador 1', status: 'Operando', image: 'dryer1.jpg' },
    { name: 'Secador 2', status: 'Parado', image: 'dryer2.jpg' },
];

const lungs = [
    { name: 'Pulmão 1', status: 'Operando', image: 'lung1.jpg' },
    { name: 'Pulmão 2', status: 'Parado', image: 'lung2.jpg' },
    // Adicione mais pulmões conforme necessário
];

// Função para adicionar itens ao DOM
function addItemsToDOM(containerId, items) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <span>${item.name} - ${item.status}</span>
            <div>
                <input type="text" placeholder="Pressão" class="pressure">
                <input type="text" placeholder="Temperatura" class="temperature">
            </div>
            <img src="${item.image}" alt="${item.name}">
        `;
        container.appendChild(itemDiv);
    });
}

// Adicionar compressores, secadores e pulmões ao DOM
addItemsToDOM('compressors', compressors);
addItemsToDOM('dryers', dryers);
addItemsToDOM('lungs', lungs);

// Função para gerar o PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text("Relatório de Operação", 10, 10);
    doc.text(`Data/Horário: ${document.getElementById('datetime').textContent}`, 10, 20);
    doc.text(`Responsável pela Medição: ${document.getElementById('responsible').value}`, 10, 30);

    doc.text("Compressores:", 10, 40);
    document.querySelectorAll('#compressors .item').forEach((compressor, index) => {
        const name = compressor.querySelector('span').textContent;
        const pressure = compressor.querySelector('.pressure').value;
        const temperature = compressor.querySelector('.temperature').value;
        doc.text(`${name} - Pressão: ${pressure}, Temperatura: ${temperature}`, 10, 50 + (index * 10));
    });

    doc.text("Secadores:", 10, 90);
    document.querySelectorAll('#dryers .item').forEach((dryer, index) => {
        const name = dryer.querySelector('span').textContent;
        const pressure = dryer.querySelector('.pressure').value;
        const temperature = dryer.querySelector('.temperature').value;
        doc.text(`${name} - Pressão: ${pressure}, Temperatura: ${temperature}`, 10, 100 + (index * 10));
    });

    doc.text("Pulmões:", 10, 140);
    document.querySelectorAll('#lungs .item').forEach((lung, index) => {
        const name = lung.querySelector('span').textContent;
        const pressure = lung.querySelector('.pressure').value;
        const temperature = lung.querySelector('.temperature').value;
        doc.text(`${name} - Pressão: ${pressure}, Temperatura: ${temperature}`, 10, 150 + (index * 10));
    });

    doc.save("relatorio_operacao.pdf");
}
