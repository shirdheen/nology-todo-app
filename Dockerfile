FROM openjdk:21-jdk-slim

WORKDIR /app

COPY pom.xml .

RUN apt update && apt install -y maven && mvn dependency:go-offline

COPY src ./src

RUN mvn clean package -DskipTests

CMD ["sh", "-c", "java -jar target/*.jar"]

EXPOSE 8080