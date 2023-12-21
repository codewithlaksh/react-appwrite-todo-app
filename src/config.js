// Appwrite config
import { Client, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('658276b81ccf68875dc3')

const databases = new Databases(client);

export default databases;
