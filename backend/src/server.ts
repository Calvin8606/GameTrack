import app from "./app";

const PORT = process.env.PORT || 4081;

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
