function loadImage(input, containerId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(containerId + '-img').src = e.target.result;
            document.getElementById(containerId + '-img').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function generatePDF() {
    const element = document.getElementById('report-content');
    const opt = {
        margin: 0.5,
        filename: 'relatorio_operacao.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true }, // Aumenta a escala para melhor qualidade
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
