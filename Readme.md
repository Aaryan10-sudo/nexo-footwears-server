# HELLO FROM NEXO-FOOTWEARS

This is a server of [Nexo Footwears](https://nexo-footwears.vercel.app)
Built with PERN stack , MERN stack...

## Get the official source code from github

```bash
git clone https://github.com/Aaryan10-sudo/nexo-footwears-server.git
```

## Docker Image

```bash
docker run -it nexo-server
```

## Nexo footwears server uses top tech and tools to make it more advanced and scalable

Some of the tech Nexo footwears uses are

- **PostgreSQL Database** (A robust relational database used for storing high-volume data efficiently).
- **Redis** (Utilized for faster data serving and caching to enhance performance).
- **CI/CD pipeline** (Implemented with GitHub Actions for seamless deployment to Railway in a production environment).
- **Docker** (The Nexo server is containerized using Docker and published to Docker Hub for easy distribution and deployment).
- **Mongo DB** (A NoSQL database employed for storing smaller, unstructured datasets.)
- **Node.js** (The backend runtime environment powering the Nexo Footwears server).
- **Express.js** (A lightweight Node.js framework used to build the backend of the Nexo Footwears server).

**_Environment Variables_**
Please use .env.example as refrence for the environment variable......

### API INTEGRATIONS

Nexo footwears use various API integrations such as

- **Khalti Payment Integration** (E-payment Integration)
- **Esewa Payment Integration** (E-payment Integration)
- **Cloudinary** (Cloud Storage Integration)
- **Nodemailer** (SMTP mail protocol for sending mail)

### Privacy concern

User data is stored in both MongoDB and PostgreSQL databases, with the data securely stored in the cloud. All sensitive information, including passwords, is hashed for added security. Payment integrations are implemented in a secure manner, ensuring that transactions are processed safely.

This structure ensures clarity while highlighting the different security measures in place. Let me know if you'd like to adjust anything else!

### SERVER LOAD AND TESTING

You can test the payload request in Nexo footwears servers for 30sec
The request that server handles in 30sec

```bash
cd test
npm start
```
