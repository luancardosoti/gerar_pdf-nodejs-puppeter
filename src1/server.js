const express = require("express");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const app = express();

const passengers = [
  {
    name: "Luan Cardoso",
    flightNumber: 5678,
    time: "18h00",
  },
  {
    name: "Helaine Ferreira",
    flightNumber: 5679,
    time: "18h00",
  },
  {
    name: "Kauan Nunes",
    flightNumber: 5680,
    time: "18h00",
  },
];

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return res.send("Erro na leitura do arquivo");
    }

    const options = {
      height: "11.25in",
      width: "8.5in",
      header: {
        height: "20mm",
      },
      footer: {
        height: "20mm",
      },
    };

    //criar pdf
    pdf.create(html, options).toFile("report.pdf", (err, data) => {
      if (err) {
        return res.send("Erro ao gerar pdf");
      }

      return res.send("Arquivo gerado com sucesso");
    });
  });
});

app.listen(4000, () => {
  console.log("🚀  Server started on Port 4000");
});
