# Use the official Node.js 14 image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 8798

# Start the application
CMD [ "npm", "start" ]