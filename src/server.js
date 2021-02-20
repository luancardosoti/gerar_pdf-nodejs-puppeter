const express = require("express");
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer");
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

app.get("/pdf", async (req, res) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://localhost:3333");

  const pageContent = await page.evaluate((x) => {
    return (document.querySelector("#button-gerar_pdf").innerHTML = "");
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: "Letter",
  });

  await browser.close();

  res.contentType("application/pdf");

  return res.send(pdf);
});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers }, (err, html) => {
    if (err) {
      return res.send("Erro na leitura do arquivo");
    }

    return res.send(html);
  });
});

app.listen(3333, () => {
  console.log("🚀  Server started on Port 3333");
});
