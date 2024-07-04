
require('dotenv').config();

const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');

// Storage account connection string
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

// Container and blob name
const containerName = "test-tt-am-sa-container";
const blobName = "random-soccer-players.json";

async function downloadBlob() {
    // Create blob service client
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

    // Get the container client
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Get blob client
    const blobClient = containerClient.getBlockBlobClient(blobName);

    // Download blob content to a local file
    const downloadBlockBlobResponse = await blobClient.download(0);

    // Convert data stream to JSON string
    const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);

    // Parse the JSON content
    const data = JSON.parse(downloaded);

    // Print the JSON content
    console.log("Contenido del archivo JSON descargado:", data);

    return data;
}

// Auxiliary function to convert a data stream to a string
async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data.toString());
        });
        readableStream.on("end", () => {
            resolve(chunks.join(""));
        });
        readableStream.on("error", reject);
    });
}

module.exports = { downloadBlob };