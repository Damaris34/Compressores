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

// Dados fictícios para Atlas, Schuz, Interface, secadores e pulmões
const atlasSchuz = [
    { name: 'Atlas 1', status: 'Operando' },
    { name: 'Atlas 2', status: 'Parado' },
    { name: 'Schuz 1', status: 'Operando' },
    { name: 'Schuz 2', status: 'Parado' },
];

const interfaceItems = [
    { name: 'Interface 1', status: 'Operando' },
];

const dryers = [
    { name: 'SMC 1', status: 'Operando' },
    { name: 'Schuz 1', status: 'Parado' },
];

const lungs = [
    { name: 'Pulmão 1', status: 'Operando' },
    { name: 'Pulmão 2', status: 'Parado' },
    { name: 'Pulmão 3', status: 'Operando' },
    { name: 'Pulmão 4', status: 'Parado' },
];

// Função para adicionar itens ao DOM
function addItemsToTable(tableId, items) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector('tbody');
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td><input type="text" placeholder="Pressão" class="input-field"></td>
            <td><input type="text" placeholder="Temperatura" class="input-field"></td>
            <td>
                <select class="input-field">
                    <option value="Operando" ${item.status === 'Operando' ? 'selected' : ''}>Operando</option>
                    <option value="Parado" ${item.status === 'Parado' ? 'selected' : ''}>Parado</option>
                </select>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Adicionar Atlas, Schuz, Interface, secadores e pulmões ao DOM
addItemsToTable('atlas-schuz-table', atlasSchuz);
addItemsToTable('interface-table', interfaceItems);
addItemsToTable('dryers-table', dryers);
addItemsToTable('lungs-table', lungs);

// Função para gerar o PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    const addTableToPDF = (tableId, title) => {
        const table = document.getElementById(tableId);
        const rows = table.querySelectorAll('tr');
        let startY = doc.autoTableEndPosY + 5;

        doc.setFontSize(12);
        doc.text(title, 10, startY);
        startY += 10;

        doc.autoTable({
            startY: startY,
            head: [['Nome', 'Pressão', 'Temperatura', 'Em Funcionamento']],
            body: Array.from(rows).slice(1).map(row => {
                const cells = row.querySelectorAll('td');
                return [
                    cells[0].textContent,
                    cells[1].querySelector('input').value,
                    cells[2].querySelector('input').value,
                    cells[3].querySelector('select').value
                ];
            }),
            theme: 'grid'
        });
    };

    doc.text("Relatório de Operação", 10, 10);
    doc.text(`Data/Horário: ${document.getElementById('datetime').textContent}`, 10, 20);

    addTableToPDF('atlas-schuz-table', 'Atlas e Schuz');
    addTableToPDF('interface-table', 'Interface');
    addTableToPDF('dryers-table', 'Secadores');
    addTableToPDF('lungs-table', 'Pulmões');

    doc.text(`Responsável: ${document.getElementById('responsible').value}`, 10, doc.autoTableEndPosY + 10);

    const photoInput = document.getElementById('photo');
    if (photoInput.files.length > 0) {
        const img = new Image();
        img.src = URL.createObjectURL(photoInput.files[0]);
        img.onload = () => {
            const imgWidth = 50;
            const imgHeight = 50;
            const pageHeight = doc.internal.pageSize.height;
            const yPosition = pageHeight - imgHeight - 10;
            doc.addImage(img, 'JPEG', 10, yPosition, imgWidth, imgHeight);
            doc.save("relatorio_operacao.pdf");
        };
    } else {
        doc.save("relatorio_operacao.pdf");
    }
}
