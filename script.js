document.getElementById('generate-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Compressores', 14, 22);

    doc.setFontSize(14);
    doc.text(`Data/Horário: ${document.getElementById('datetime').value}`, 14, 32);

    doc.text('Compressores:', 14, 42);
    const compressors = [
        { name: 'Atlas 1', pressure: document.getElementById('atlas1-pressure').value, temperature: document.getElementById('atlas1-temperature').value },
        { name: 'Atlas 2', pressure: document.getElementById('atlas2-pressure').value, temperature: document.getElementById('atlas2-temperature').value },
        { name: 'Schuz 1', pressure: document.getElementById('schuz1-pressure').value, temperature: document.getElementById('schuz1-temperature').value },
        { name: 'Schuz 2', pressure: document.getElementById('schuz2-pressure').value, temperature: document.getElementById('schuz2-temperature').value },
        { name: 'Interface', pressure: document.getElementById('interface-pressure').value, temperature: document.getElementById('interface-temperature').value }
    ];
    compressors.forEach((compressor, index) => {
        doc.text(`${compressor.name} - Pressão: ${compressor.pressure}, Temperatura: ${compressor.temperature}`, 14, 52 + (index * 10));
    });

    doc.text('Secadores:', 14, 102);
    const dryers = [
        { name: 'SCM', pressure: document.getElementById('scm-pressure').value, temperature: document.getElementById('scm-temperature').value },
        { name: 'Schuz', pressure: document.getElementById('schuz-pressure').value, temperature: document.getElementById('schuz-temperature').value }
    ];
    dryers.forEach((dryer, index) => {
        doc.text(`${dryer.name} - Pressão: ${dryer.pressure}, Temperatura: ${dryer.temperature}`, 14, 112 + (index * 10));
    });

    doc.text('Pulmões (Vasos de Pressão):', 14, 142);
    const lungs = [
        { name: 'Pulmão 1', pressure: document.getElementById('lung1-pressure').value, temperature: document.getElementById('lung1-temperature').value },
        { name: 'Pulmão 2', pressure: document.getElementById('lung2-pressure').value, temperature: document.getElementById('lung2-temperature').value },
        { name: 'Pulmão 3', pressure: document.getElementById('lung3-pressure').value, temperature: document.getElementById('lung3-temperature').value },
        { name: 'Pulmão 4', pressure: document.getElementById('lung4-pressure').value, temperature: document.getElementById('lung4-temperature').value }
    ];
    lungs.forEach((lung, index) => {
        doc.text(`${lung.name} - Pressão: ${lung.pressure}, Temperatura: ${lung.temperature}`, 14, 152 + (index * 10));
    });

    doc.text(`Responsável pela Verificação: ${document.getElementById('responsible').value}`, 14, 192);

    const photos = document.getElementById('photos').files;
    let photoY = 202;
    for (let i = 0; i < photos.length; i++) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target.result;
            img.onload = function() {
                doc.addImage(img, 'JPEG', 14, photoY, 50, 50);
                photoY += 60;
                if (i === photos.length - 1) {
                    doc.save('relatorio_compressores.pdf');
                }
            };
        };
        reader.readAsDataURL(photos[i]);
    }

    if (photos.length === 0) {
        doc.save('relatorio_compressores.pdf');
    }
});
