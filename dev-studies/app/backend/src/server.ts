import express from "express";
import { z } from "zod";

const app = express();

// 🔑 middleware para ler JSON
app.use(express.json());

// schema do Zod (UM SÓ)
const createUserSchema = z.object({
  name: z.string().min(3),
  age: z.number().int().positive(),
});

// rota de saúde
app.get("/health", (req, res) => {
  console.log("Rota /health foi chamada");
  res.status(200).json({ status: "ok" });
});

// rota POST com Zod
app.post("/users", (req, res) => {
  try {
    const data = createUserSchema.parse(req.body);

    console.log("Dados validados:", data);

    res.status(201).json({
      message: "Usuário criado com sucesso",
      data,
    });
  } catch (error) {
    console.error("Erro de validação:", error);

    res.status(400).json({
      error: "Dados inválidos",
    });
  }
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
