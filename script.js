function loadImage(input, containerId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(containerId + '-img').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function generatePDF() {
    const element = document.getElementById('report-content');
    const opt = {
        margin: 0.2,
        filename: 'relatorio_operacao.pdf',
        image: { type: 'jpeg', quality: 0.95 }, // Aumente a qualidade da imagem
        html2canvas: { scale: 2, useCORS: true }, // Aumente a escala para melhor qualidade
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
