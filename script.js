import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.FileNotFoundException;

public class CompressorReportApp {

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Relatório de Compressores");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(600, 400);
            frame.setLayout(new GridLayout(0, 2, 10, 10));
            frame.setLocationRelativeTo(null);

            JPanel panel = new JPanel();
            panel.setLayout(new GridLayout(0, 2, 10, 10));
            panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

            JLabel dateTimeLabel = new JLabel("Data/Horário:");
            JTextField dateTimeField = new JTextField();

            JLabel pressureLabel = new JLabel("Pressão:");
            JTextField pressureField = new JTextField();

            JLabel temperatureLabel = new JLabel("Temperatura:");
            JTextField temperatureField = new JTextField();

            JLabel responsibleLabel = new JLabel("Responsável:");
            JTextField responsibleField = new JTextField();

            JCheckBox[] compressors = new JCheckBox[5];
            JCheckBox[] dryers = new JCheckBox[2];
            JCheckBox[] lungs = new JCheckBox[4];

            for (int i = 0; i < 5; i++) {
                compressors[i] = new JCheckBox("Compressor " + (i + 1));
                panel.add(compressors[i]);
            }

            for (int i = 0; i < 2; i++) {
                dryers[i] = new JCheckBox("Secador " + (i + 1));
                panel.add(dryers[i]);
            }

            for (int i = 0; i < 4; i++) {
                lungs[i] = new JCheckBox("Pulmão " + (i + 1));
                panel.add(lungs[i]);
            }

            panel.add(dateTimeLabel);
            panel.add(dateTimeField);
            panel.add(pressureLabel);
            panel.add(pressureField);
            panel.add(temperatureLabel);
            panel.add(temperatureField);
            panel.add(responsibleLabel);
            panel.add(responsibleField);

            JButton generateButton = new JButton("Gerar PDF");
            generateButton.addActionListener(new ActionListener() {
                @Override
                public void actionPerformed(ActionEvent e) {
                    String dateTime = dateTimeField.getText();
                    String pressure = pressureField.getText();
                    String temperature = temperatureField.getText();
                    String responsible = responsibleField.getText();

                    StringBuilder compressorStatus = new StringBuilder();
                    for (int i = 0; i < 5; i++) {
                        compressorStatus.append("Compressor ").append(i + 1).append(": ")
                                .append(compressors[i].isSelected() ? "Sim" : "Não").append("\n");
                    }

                    StringBuilder dryerStatus = new StringBuilder();
                    for (int i = 0; i < 2; i++) {
                        dryerStatus.append("Secador ").append(i + 1).append(": ")
                                .append(dryers[i].isSelected() ? "Sim" : "Não").append("\n");
                    }

                    StringBuilder lungStatus = new StringBuilder();
                    for (int i = 0; i < 4; i++) {
                        lungStatus.append("Pulmão ").append(i + 1).append(": ")
                                .append(lungs[i].isSelected() ? "Sim" : "Não").append("\n");
                    }

                    generatePDF(dateTime, compressorStatus.toString(), dryerStatus.toString(),
                            lungStatus.toString(), pressure, temperature, responsible);
                }
            });

            panel.add(generateButton);
            frame.add(panel);
            frame.setVisible(true);
        });
    }

    private static void generatePDF(String dateTime, String compressorStatus, String dryerStatus,
                                    String lungStatus, String pressure, String temperature, String responsible) {
        try {
            PdfWriter writer = new PdfWriter("relatorio_compressores.pdf");
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            document.add(new Paragraph("Relatório de Compressores"));
            document.add(new Paragraph("Data/Horário: " + dateTime));
            document.add(new Paragraph("Compressores:\n" + compressorStatus));
            document.add(new Paragraph("Secadores:\n" + dryerStatus));
            document.add(new Paragraph("Pulmões:\n" + lungStatus));
            document.add(new Paragraph("Pressão: " + pressure + " bar"));
            document.add(new Paragraph("Temperatura: " + temperature + " °C"));
            document.add(new Paragraph("Responsável pela Verificação: " + responsible));

            document.close();
            JOptionPane.showMessageDialog(null, "PDF gerado com sucesso!");
        } catch (FileNotFoundException e) {
            JOptionPane.showMessageDialog(null, "Erro ao gerar PDF: " + e.getMessage());
        }
    }
}
