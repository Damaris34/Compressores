/ Função para atualizar a data e horário
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    dateTimeElement.textContent = now.toLocaleDateString('pt-BR', options);
}

// Função para obter a temperatura e pressão usando a API OpenWeatherMap
async function getWeatherData() {
    const apiKey = 'SUA_CHAVE_DE_API'; // Substitua pela sua chave de API
    const city = 'SuaCidade'; // Substitua pela cidade desejada
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temperatureElement = document.getElementById('temperature');
        const pressureElement = document.getElementById('pressure');
        temperatureElement.textContent = `Temperatura: ${data.main.temp}°C`;
        pressureElement.textContent = `Pressão: ${data.main.pressure} hPa`;
    } catch (error) {
        console.error('Erro ao obter os dados de clima:', error);
    }
}

// Função para gerar e baixar o relatório em Excel
function downloadExcelReport() {
    const dateTime = document.getElementById('date-time').textContent;
    const responsible = document.getElementById('responsible').textContent;
    const temperature = document.getElementById('temperature').textContent;
    const pressure = document.getElementById('pressure').textContent;
    const operationStatus = document.getElementById('operation-status').textContent;

    const data = [
        ["Data e Horário", "Responsável", "Temperatura", "Pressão", "Status de Operação"],
        [dateTime, responsible, temperature, pressure, operationStatus]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Relatório");

    XLSX.writeFile(wb, "relatorio_operacao.xlsx");
}

// Atualizar a data e horário a cada segundo
setInterval(updateDateTime, 1000);

// Obter a temperatura e pressão ao carregar a página
getWeatherData();

// Adicionar evento de clique ao botão de download
document.getElementById('download-excel').addEventListener('click', downloadExcelReport);
