document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("cadastroForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const senha = document.getElementById("senha").value;

        const user = {
            nome: nome,
            email: email,
            telefone: telefone,
            endereco: endereco,
            senha: senha
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Cadastro realizado com sucesso!");

        form.reset();
    });
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/agroinfa', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
