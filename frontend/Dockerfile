# Stage-1 & spacify a name 'builder'
FROM  node:alpine AS builder

# Create a directory  and go to directory 
WORKDIR /app

# Copy the package.json file to my current directory for install necessary dependence  
COPY package*.json .

# Install the dependence
RUN npm ci

# Build optimise static file
RUN npm run build

# Copy other file to my current directory
COPY . .


# Stage-2
FROM nginx:alpine

# Copy static file to my nignx folder for serve static contain
COPY --from=builder /app/build /usr/share/nginx/html

# Open the port for react
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]