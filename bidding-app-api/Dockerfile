FROM openjdk:11
LABEL maintainer="fayilmazdir91"
ADD target/bidding-app-api-0.0.1-SNAPSHOT.jar bidding-app-api-docker.jar
ENTRYPOINT ["java", "-jar", "bidding-app-api-docker.jar"]
EXPOSE 9090