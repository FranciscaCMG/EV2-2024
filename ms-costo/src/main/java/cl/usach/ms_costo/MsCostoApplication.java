package cl.usach.ms_costo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MsCostoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsCostoApplication.class, args);
	}

}
