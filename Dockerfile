FROM openjdk:21-jdk-slim

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apt update && apt install -y maven && mvn clean package -DskipTests

COPY target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"];