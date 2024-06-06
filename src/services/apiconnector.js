import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
    const options = {
        method: method.toUpperCase(), // Ensure method is uppercase
        headers: headers ? headers : {}, // Use provided headers or an empty object
        body: bodyData ? JSON.stringify(bodyData) : null, // Convert bodyData to JSON string if present
    };

    // Append query parameters to the URL if params are provided
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        url = `${url}?${queryString}`;
    }

    try {
        const response = await fetch(url, options);

        // Check if response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response and return
        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};