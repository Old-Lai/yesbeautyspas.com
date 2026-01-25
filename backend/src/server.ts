import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen({ port: Number(PORT), host: "0.0.0.0" })
  .then(() => console.log(`API running on port ${PORT}`))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });