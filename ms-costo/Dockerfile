FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} ms-costo.jar
ENTRYPOINT ["java","-jar","/ms-costo.jar"]