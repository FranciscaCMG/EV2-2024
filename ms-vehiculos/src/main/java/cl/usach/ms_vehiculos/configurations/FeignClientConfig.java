package cl.usach.ms_vehiculos.configurations;

import org.springframework.context.annotation.Configuration;

import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignClientConfig {
    @Bean
    Logger.Level feignLoggerLevel() { return Logger.Level.FULL; }
}
