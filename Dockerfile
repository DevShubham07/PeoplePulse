# Build stage
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

# Copy all Maven-related files
COPY backend/pom.xml .
COPY backend/.mvn ./.mvn
COPY backend/mvnw .
COPY backend/mvnw.cmd .
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Add script to debug environment variables
RUN echo '#!/bin/bash' > /app/start.sh && \
    echo 'echo "Environment variables:"' >> /app/start.sh && \
    echo 'echo "DATABASE_URL: $DATABASE_URL"' >> /app/start.sh && \
    echo 'echo "SPRING_PROFILES_ACTIVE: $SPRING_PROFILES_ACTIVE"' >> /app/start.sh && \
    echo 'java -jar app.jar' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 8080
CMD ["/app/start.sh"]
