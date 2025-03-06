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

// Função para exibir a prévia da foto
document.getElementById('photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('photo-preview').src = e.target.result;
            document.getElementById('photo-preview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Função para gerar o PDF
function generatePDF() {
    const element = document.getElementById('report-content');
    const opt = {
        margin:       0,
        filename:     'relatorio_operacao.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New html2pdf() call with options
    html2pdf().set(opt).from(element).save();
}
