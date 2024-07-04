const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { downloadBlob } = require('./downloadBlob'); 

app.get('/', async (req, res) => {
  try {
    const data = await downloadBlob();
    res.send(JSON.stringify(data));
  } catch (error) {
    console.error("Error downloading the file:", error.message);
    res.status(500).json({ error: 'Error downloading the file' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
