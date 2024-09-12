const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();

// Middleware para logar acessos
app.use((req, res, next) => {
    console.log('rodou aqui')
    // Formatar a mensagem de log
    const data = new Date().toISOString();
    const metodo = req.method;
    const rota = req.originalUrl;
    const logMessage = `${data} - ${metodo} - ${rota}\n`;

    // Caminho do arquivo de log
    const logFilePath = path.join(__dirname, 'access.log');

    // Adicionar mensagem ao arquivo de log de forma síncrona
    try {
        fs.appendFileSync(logFilePath, logMessage);
    } catch (err) {
        console.error('Erro ao escrever no arquivo de log:', err);
    }

    // Passar para o próximo middleware ou rota
    next();
});

app.get("/", (req, res) => {
    res.send("Rota principal");
});

app.listen(3000, () => {
    console.log("Rodando na porta 3000...");
});
