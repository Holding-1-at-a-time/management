/**
 * @description      : Updates the price based on customer interaction data using a machine learning model.
 * @author           : rrome
 * @group            : 
 * @created          : 25/09/2024 - 05:10:28
 * 
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 25/09/2024
 * - Author          : rrome
 * - Modification    : Made the code strongly typed.
 **/

import * as tf from '@tensorflow/tfjs';
import { MongoClient, ObjectId } from 'mongodb';

// Define the MongoDB connection
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'ydatabase';
const collectionName = 'customer_interactions';

// Define the TensorFlow.js model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, inputShape: [1] }));
model.add(tf.layers.dense({ units: 1 }));
model.compile({ optimizer: tf.optimizers.adam(), loss: 'meanSquaredError' });

// Define the data preprocessing function
interface CustomerInteraction {
    _id: ObjectId;
    age: number;
    annualIncome: number;
    [key: string]: number | ObjectId;
}
async function preprocessData(customerInteraction: CustomerInteraction): Promise<tf.Tensor2D> {
    try {
        // Convert categorical variables into numerical variables
        const numericalData = await convertCategoricalToNumerical(customerInteraction);

        // Scale/normalize data
        const scaledData = await scaleData(numericalData);

        return scaledData;
    } catch (error) {
        console.error('Error preprocessing data:', error);
        throw error;
    }
}

// Define the function to update the price based on customer interactions
async function updatePrice(customerInteraction: CustomerInteraction): Promise<number> {
    try {
        // Preprocess the data
        const preprocessedData = await preprocessData(customerInteraction);

        // Create a tensor from the preprocessed data
        const tensor = tf.tensor2d([preprocessedData], [1, 1]);

        // Make a prediction using the model
        const prediction = model.predict(tensor);

        // Update the price based on the prediction
        const price = prediction.dataSync()[0];

        // Store the updated price in the database
        await storePriceInDatabase(customerInteraction, price);

        return price;
    } catch (error) {
        console.error('Error updating price:', error);
        throw error;
    }
}

// Define the function to store the updated price in the database
async function storePriceInDatabase(customerInteraction: CustomerInteraction, price: number): Promise<void> {
    try {
        // Connect to the MongoDB database
        const client = new MongoClient(mongoUrl);
        const db = client.db(dbName);
        const collection = db.collection<CustomerInteraction>(collectionName);

        // Update the price in the database
        const updateResult = await collection.updateOne({ _id: customerInteraction._id }, { $set: { price } });

        // Check if the update was successful
        if (updateResult.matchedCount === 0) {
            throw new Error(`Could not find document with _id ${customerInteraction._id} to update price.`);
        }

        // Close the MongoDB connection
        client.close();
    } catch (error) {
        console.error('Error storing price in database:', error);
        throw error;
    }
}

// Define the function to convert categorical variables into numerical variables
async function convertCategoricalToNumerical(customerInteraction: CustomerInteraction): Promise<Record<string, number>> {
    const numericalData: Record<string, number> = {};
    for (const key of Object.keys(customerInteraction)) {
        const value = customerInteraction[key];
        if (typeof value === 'string') {
            numericalData[key] = oneHotEncode(value);
        } else {
            numericalData[key] = value;
        }
    }
    return numericalData;
}

// Helper function to one-hot encode categorical variables
function oneHotEncode(value: string): number {
    const map: Record<string, number> = {};
    const array = Array.from(new Set([value]));
    array.forEach((item, index) => {
        map[item] = index;
    });
    return map[value];
}

// Define the function to update the price based on customer interaction data
async function updatePrice(customerInteraction: CustomerInteraction): Promise<number> {
    try {
        // Convert categorical variables into numerical variables
        const numericalData = await convertCategoricalToNumerical(customerInteraction);

        // Scale/normalize data
        const scaledData = await scaleData(numericalData);

        // Predict the price using the ML model
        const price = await predictPrice(scaledData);

        // Store the updated price in the database
        await storePriceInDatabase(customerInteraction, price);
    } catch (error) {
        console.error('Error updating price:', error);
        throw error;
    }
}

// Define the function to scale/normalize data
async function scaleData(numericalData: Record<string, number>): Promise<tf.Tensor2D> {
    const standardization = new tf.StandardScaler();
    const scaledData = standardization.fitTransform(numericalData);
    return scaledData;
}

// Example usage
updatePrice({
    // Using the customer interaction data, calculate the price
    // For example, if we're using a simple linear regression model
    // to predict the price, we can use the coefficients of the model
    // to calculate the price
    price: 10 + 2 * numericalData.age + 3 * numericalData.annualIncome,
});

