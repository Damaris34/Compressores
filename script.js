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
    const compressors = Array.from(document.querySelectorAll('.compressor input')).map(c => c.checked ? 'Sim' : 'Não');
    const dryers = Array.from(document.querySelectorAll('.dryer input')).map(d => d.checked ? 'Sim' : 'Não');
    const lungs = Array.from(document.querySelectorAll('.lung input')).map(l => l.checked ? 'Sim' : 'Não');
    const pressure = document.getElementById('pressure').value;
    const temperature = document.getElementById('temperature').value;
    const responsible = document.getElementById('responsible').value;
    const photos = Array.from(document.querySelectorAll('#photo-preview img')).map(img => img.src);

    let reportContent = `
        <h1>Relatório de Compressores</h1>
        <p><strong>Data/Horário:</strong> ${datetime}</p>
        <h2>Compressores</h2>
        <ul>
            <li>Compressor 1: ${compressors[0]}</li>
            <li>Compressor 2: ${compressors[1]}</li>
            <li>Compressor 3: ${compressors[2]}</li>
            <li>Compressor 4: ${compressors[3]}</li>
            <li>Compressor 5: ${compressors[4]}</li>
        </ul>
        <h2>Secadores</h2>
        <ul>
            <li>Secador 1: ${dryers[0]}</li>
            <li>Secador 2: ${dryers[1]}</li>
        </ul>
        <h2>Pulmões</h2>
        <ul>
            <li>Pulmão 1: ${lungs[0]}</li>
            <li>Pulmão 2: ${lungs[1]}</li>
            <li>Pulmão 3: ${lungs[2]}</li>
            <li>Pulmão 4: ${lungs[3]}</li>
        </ul>
        <h2>Pressão/Temperatura</h2>
        <p><strong>Pressão:</strong> ${pressure} bar</p>
        <p><strong>Temperatura:</strong> ${temperature} °C</p>
        <h2>Responsável pela Verificação</h2>
        <p>${responsible}</p>
        <h2>Fotos</h2>
    `;

    photos.forEach(photo => {
        reportContent += `<img src="${photo}" style="max-width: 100px; max-height: 100px; margin: 5px;">`;
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
