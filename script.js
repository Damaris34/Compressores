document.getElementById('generate-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Compressores', 14, 22);

    doc.setFontSize(14);
    doc.text(`Data/Horário: ${document.getElementById('datetime').value}`, 14, 32);
    doc.text(`Pressão: ${document.getElementById('pressure').value}`, 14, 42);
    doc.text(`Temperatura: ${document.getElementById('temperature').value}`, 14, 52);
    doc.text(`Compressor em Funcionamento: ${document.getElementById('compressor').value}`, 14, 62);

    doc.text('Compressores:', 14, 72);
    const compressors = document.getElementById('compressor-list').innerText.split('\n');
    compressors.forEach((compressor, index) => {
        doc.text(compressor, 14, 82 + (index * 10));
    });

    doc.text('Secadores:', 14, 132);
    const dryers = document.getElementById('dryer-list').innerText.split('\n');
    dryers.forEach((dryer, index) => {
        doc.text(dryer, 14, 142 + (index * 10));
    });

    doc.text('Pulmões (Vasos de Pressão):', 14, 172);
    const lungs = document.getElementById('lung-list').innerText.split('\n');
    lungs.forEach((lung, index) => {
        doc.text(lung, 14, 182 + (index * 10));
    });

    doc.text(`Responsável pela Verificação: ${document.getElementById('responsible').value}`, 14, 232);

    const photos = document.getElementById('photos').files;
    let photoY = 242;
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
