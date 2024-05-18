/**
 * This module exports a pre-configured axios instance for making HTTP requests.
 
// Configuration details:
// - `baseURL`: The base URL for all axios requests is set using the `NEXT_PUBLIC_API_URL` environment variable.
//   This allows the URL to be dynamically set based on the environment (development, staging, production).
// - `headers`: The default headers for all requests include "Content-Type: application/json",
//   which specifies that the request body will be in JSON format.

// This configuration can be further extended as needed by adding additional headers, interceptors, or other options.
 */
import axios from "axios";

// Create an axios instance with custom configuration
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Base URL for all requests, sourced from environment variables
  headers: {
    "Content-Type": "application/json", // Default content type for all requests
  },
});

export default client;
