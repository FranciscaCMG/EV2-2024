FROM openjdk:17
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} ms-vehiculos.jar
ENTRYPOINT ["java","-jar","/ms-vehiculos.jar"]