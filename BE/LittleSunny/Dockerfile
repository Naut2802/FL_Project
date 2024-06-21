FROM openjdk:21
VOLUME /tmp
COPY target/LittleSunny-0.0.1-SNAPSHOT.jar LittleSunny-0.0.1-SNAPSHOT.jar
COPY .env .env
COPY .env.prod .env.prod
ENTRYPOINT ["java", "-jar", "LittleSunny-0.0.1-SNAPSHOT.jar"]