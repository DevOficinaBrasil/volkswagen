import React, { useState, useEffect, useContext } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import VolksButton from "./defaultButton";
import UserContext from "@/src/contexts/UserContext";
// import pdfUrl from "@/images/mpdf.pdf";

const PdfTextEditor = ({ training }) => {
  const [pdfBytes, setPdfBytes] = useState(null);
  const pdfUrl = "/documents/mpdf.pdf";

  const { userData } = useContext(UserContext);
  console.log(training);

  function convertDate(dateStr) {
    // Divide a string da data pelo caractere '/'
    const [year, month, day] = dateStr.split("-");

    // Retorna a data no formato 'YYYY-MM-DD'
    return `${day}/${month}/${year}`;
  }

  const handleAddTextToPdf = async () => {
    console.log("pdfUrl");
    // const fetchPdf = async () => {
    //   try {
    //     const response = await fetch(pdfUrl);
    //     const pdfBytes = await response.arrayBuffer();
    //     setPdfBytes(new Uint8Array(pdfBytes));
    //   } catch (error) {
    //     console.error("Error fetching PDF:", error);
    //   }
    // };

    try {
      const response = await fetch(pdfUrl);
      let pdfBytes = await response.arrayBuffer();
      pdfBytes = new Uint8Array(pdfBytes);

      if (!pdfBytes) return;

      // Carregar o PDF
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const firstPage = pdfDoc.getPages()[0];
      const { width, height } = firstPage.getSize();
      // const newPage = pdfDoc.insertPage(0, [width, height]);

      // const titleText = "Certificado";
      const titleFontSize = 40;
      const titleX = 50;
      const titleY = height - 50;
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const ownerName = userData.name; // Nome do dono do treinamento
      const ownerTextWidth = font.widthOfTextAtSize(
        ownerName.toUpperCase(),
        20
      );
      const ownerX = (width - ownerTextWidth) / 2;
      const ownerY = height - 80;

      const rectWidth = ownerTextWidth + 400; // Largura do retângulo é um pouco maior que o texto
      const rectHeight = 30; // Altura do retângulo
      const rectX = (width - rectWidth) / 2;
      const rectY = ownerY - rectHeight - 5;

      firstPage.drawRectangle({
        x: rectX,
        y: height * 0.595,
        width: rectWidth,

        height: rectHeight,
        color: rgb(1, 1, 1),
      });

      firstPage.drawText(`${ownerName.toUpperCase()}`, {
        x: ownerX,
        y: height * 0.6,
        size: 20,
        font: font,
        color: rgb(2 / 255, 38 / 255, 99 / 255),
      });

      // Tema do treinamento
      // const trainingTheme = "Óleo para seu carro"; // Tema do treinamento

      const fontTraining = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const trainingTheme = training.name; // Tema do treinamento
      const trainingTextWidth = fontTraining.widthOfTextAtSize(
        trainingTheme.toUpperCase(),
        20
      );
      const trainingX = (width - trainingTextWidth) / 2;
      const trainingY = height - 80;

      const trainingRectWidth = trainingTextWidth + 200; // Largura do retângulo é um pouco maior que o texto
      const trainingRectHeight = 30; // Altura do retângulo
      const trainingRectX = (width - trainingRectWidth) / 2;
      const trainingRectY = ownerY - trainingRectHeight - 5;

      firstPage.drawRectangle({
        x: 50,
        y: height * 0.41,
        width: width,

        height: rectHeight,
        color: rgb(1, 1, 1),
      });

      firstPage.drawText(`${trainingTheme.toUpperCase()}`, {
        x: trainingX,
        y: height * 0.41,
        size: 20,
        font: font,
        color: rgb(0, 0, 0),
      });

      const date = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const dateTheme = convertDate(training.date); // Tema do treinamento
      const dateTextWidth = date.widthOfTextAtSize(dateTheme.toUpperCase(), 20);
      const dateX = (width - dateTextWidth) / 2;
      const dateY = height - 80;

      const dateRectWidth = dateTextWidth; // Largura do retângulo é um pouco maior que o texto
      const dateRectHeight = 30; // Altura do retângulo
      const dateRectX = (width - dateRectWidth) / 2;
      const dateRectY = ownerY - dateRectHeight - 5;

      firstPage.drawRectangle({
        x: dateRectX + 170,
        y: height * 0.315,
        width: dateRectWidth,

        height: rectHeight,
        color: rgb(1, 1, 1),
      });

      firstPage.drawText(`${dateTheme.toUpperCase()}`, {
        x: dateX + 170,
        y: height * 0.325,
        size: 16,
        font: font,
        color: rgb(0, 0, 0),
      });

      // Salvar o PDF modificado
      const modifiedPdfBytes = await pdfDoc.save();

      // Criar um blob do PDF modificado
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });

      // Criar um URL temporário para download
      const url = URL.createObjectURL(blob);

      window.open(url, "_blank");

      // Criar um link e simular o clique para baixar o PDF
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "modified.pdf";
      // link.click();

      // Limpar o URL temporário
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error adding text to PDF:", error);
    }
  };

  return (
    <div>
      <VolksButton onClick={handleAddTextToPdf} spacing={{ m: 0 }}>
        Gerar certificado
      </VolksButton>
      {/* <button onClick={handleAddTextToPdf}>Add Text to PDF and Download</button> */}
    </div>
  );
};

export default PdfTextEditor;
