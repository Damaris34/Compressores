// Função para exibir a prévia das fotos
function setupPhotoPreview(inputId, previewId) {
    document.getElementById(inputId).addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(previewId).src = e.target.result;
                document.getElementById(previewId).style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}

// Configurar prévias para múltiplas fotos
setupPhotoPreview('photo1', 'photo-preview1');
setupPhotoPreview('photo2', 'photo-preview2');
setupPhotoPreview('photo3', 'photo-preview3');

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
