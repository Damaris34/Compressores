document.getElementById('photo-upload').addEventListener('change', function(event) {
    const preview = document.getElementById('photo-preview');
    preview.innerHTML = '';
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('generate-pdf').addEventListener('click', function() {
    const datetime = document.getElementById('datetime').value;
    const responsible = document.getElementById('responsible').value;
    const photos = Array.from(document.querySelectorAll('#photo-preview img')).map(img => img.src);

    const compressors = [];
    for (let i = 1; i <= 5; i++) {
        const status = document.getElementById(`compressor${i}`).checked ? 'Sim' : 'Não';
        const pressure = document.getElementById(`compressor${i}-pressure`).value;
        const temperature = document.getElementById(`compressor${i}-temperature`).value;
        compressors.push({ status, pressure, temperature });
    }

    const dryers = [];
    for (let i = 1; i <= 2; i++) {
        const status = document.getElementById(`dryer${i}`).checked ? 'Sim' : 'Não';
        const pressure = document.getElementById(`dryer${i}-pressure`).value;
        const temperature = document.getElementById(`dryer${i}-temperature`).value;
        dryers.push({ status, pressure, temperature });
    }

    const lungs = [];
    for (let i = 1; i <= 4; i++) {
        const status = document.getElementById(`lung${i}`).checked ? 'Sim' : 'Não';
        const pressure = document.getElementById(`lung${i}-pressure`).value;
        const temperature = document.getElementById(`lung${i}-temperature`).value;
        lungs.push({ status, pressure, temperature });
    }

    let reportContent = `
        <h1>Relatório de Compressores</h1>
        <p><strong>Data/Horário:</strong> ${datetime}</p>
        <h2>Compressores</h2>
        <ul>`;

    compressors.forEach((compressor, index) => {
        reportContent += `
            <li>Compressor ${index + 1}: ${compressor.status}
            <ul>
                <li>Pressão: ${compressor.pressure} bar</li>
                <li>Temperatura: ${compressor.temperature} °C</li>
            </ul>
            </li>`;
    });

    reportContent += `</ul>
        <h2>Secadores</h2>
        <ul>`;

    dryers.forEach((dryer, index) => {
        reportContent += `
            <li>Secador ${index + 1}: ${dryer.status}
            <ul>
                <li>Pressão: ${dryer.pressure} bar</li>
                <li>Temperatura: ${dryer.temperature} °C</li>
            </ul>
            </li>`;
    });

    reportContent += `</ul>
        <h2>Pulmões (Vasos de Pressão)</h2>
        <ul>`;

    lungs.forEach((lung, index) => {
        reportContent += `
            <li>Pulmão ${index + 1}: ${lung.status}
            <ul>
                <li>Pressão: ${lung.pressure} bar</li>
                <li>Temperatura: ${lung.temperature} °C</li>
            </ul>
            </li>`;
    });

    reportContent += `</ul>
        <h2>Responsável pela Verificação</h2>
        <p>${responsible}</p>
        <h2>Fotos</h2>`;

    photos.forEach(photo => {
        reportContent += `<img src="${photo}" style="max-width: 300px; max-height: 300px; margin: 10px;">`;
    });

    const opt = {
        margin:       0,
        filename:     'relatorio_compressores.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(reportContent).set(opt).save();
});
