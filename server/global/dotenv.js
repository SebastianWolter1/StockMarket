import "../dotenv-config.js";

const PORT = process.env.PORT;
const URI_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export { PORT, URI_URL };
