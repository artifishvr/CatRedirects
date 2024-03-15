import { Client, Databases, Storage } from 'appwrite';
import { PUBLIC_API_ENDPOINT, PUBLIC_PROJECT_ID } from '$env/static/public';

const client = new Client();

const databases = new Databases(client);

const storage = new Storage(client);

client
	.setEndpoint(PUBLIC_API_ENDPOINT) // Your API Endpoint
	.setProject(PUBLIC_PROJECT_ID) // Your project ID
	;

export { databases, storage };