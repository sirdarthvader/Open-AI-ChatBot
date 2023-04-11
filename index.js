const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config({ path: "./.env" });

const { OPENAI_API_KEY, ORG_ID, EXPRESS_MAX_OPENAI_TOKENS } = process.env;

const configuration = new Configuration({
  organization: ORG_ID,
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 3080;

app.use(bodyParser.json());
app.use(cors());
app.use(require("morgan")("dev"));

app.post("/", async (req, res) => {
  const { message, currentModel, temperature } = req.body;
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: EXPRESS_MAX_OPENAI_TOKENS,
    temperature,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  res.json({
    models: response.data,
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
