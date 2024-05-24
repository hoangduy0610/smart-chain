# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the source code to the working directory
COPY . .

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn

# Expose the port that the application will run on
EXPOSE 8798

# Start the application
CMD [ "yarn", "start" ]