package cl.usach.ms_reportes.services;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cl.usach.ms_reportes.model.ListaReporte1;
import cl.usach.ms_reportes.model.ListaReporte2;
import cl.usach.ms_reportes.model.ListaResponse;
import cl.usach.ms_reportes.model.TipoReparacionesEntity;

@Service
public class ReportesService {
    private final String URL_REPARACIONES = "http://localhost:8093/reparacion";
    private final String URL_TIPOS_REPARACIONES = "http://localhost:8093/reparacion/tiposreparacion";
    private final String URL_VEHICULOS = "http://localhost:8092/vehiculo";
    private final String URL_LISTA = "http://localhost:8096/listas";
    private ObjectMapper objectMapper = new ObjectMapper();

    public List<TipoReparacionesEntity> getTiposReparaciones() throws JsonMappingException, JsonProcessingException {
        TipoReparacionesEntity obj1 = new TipoReparacionesEntity();
        List<TipoReparacionesEntity> listReparacion = new ArrayList<>();
        List<TipoReparacionesEntity> listResp = new ArrayList<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> packetEntity = new HttpEntity(obj1, headers);

        RestTemplate restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory());
        ResponseEntity<String> result = restTemplate.exchange(URL_TIPOS_REPARACIONES, HttpMethod.GET, packetEntity,
                String.class);
        listReparacion = objectMapper.readValue(result.getBody(), new TypeReference<List<TipoReparacionesEntity>>() {
        });

        return listReparacion;

    }

    public List<ListaResponse> getLista(int mes, int anio) throws JsonMappingException, JsonProcessingException {
        ListaResponse obj1 = new ListaResponse();
        List<ListaResponse> listReparacion = new ArrayList<>();
        List<ListaResponse> listResp = new ArrayList<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> packetEntity = new HttpEntity(obj1, headers);

        RestTemplate restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory());
        ResponseEntity<String> result = restTemplate.exchange(URL_LISTA + "/" + mes + "/" + anio, HttpMethod.GET,
                packetEntity, String.class);
        listReparacion = objectMapper.readValue(result.getBody(), new TypeReference<List<ListaResponse>>() {
        });

        return listReparacion;

    }

    public List<ListaResponse> getListaDosMeses(int mes, int anio)
            throws JsonMappingException, JsonProcessingException {
        ListaResponse obj1 = new ListaResponse();
        List<ListaResponse> listReparacion = new ArrayList<>();
        List<ListaResponse> listResp = new ArrayList<>();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> packetEntity = new HttpEntity(obj1, headers);

        RestTemplate restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory());
        ResponseEntity<String> result = restTemplate.exchange(URL_LISTA + "/dosmeses" + "/" + mes + "/" + anio,
                HttpMethod.GET, packetEntity, String.class);
        listReparacion = objectMapper.readValue(result.getBody(), new TypeReference<List<ListaResponse>>() {
        });

        return listReparacion;

    }

    public List<ListaReporte1> reporte1(int mes, int anio) throws JsonMappingException, JsonProcessingException {
        List<TipoReparacionesEntity> tiposReparacion = getTiposReparaciones();
        List<ListaResponse> lista = getLista(mes, anio);
        List<ListaReporte1> lr1 = new ArrayList<>();
        ListaReporte1 lr = new ListaReporte1();
        Integer countSedan = 0;
        Float sumSedan = 0f;
//		String tipo = "";
        Integer countSHat = 0;
        Float sumHat = 0f;
        Integer countSuv = 0;
        Float sumSuv = 0f;
        Integer countPickup = 0;
        Float sumPickup = 0f;
        Integer countFurgoneta = 0;
        Float sumFurgoneta = 0f;
        Integer countTotal = 0;
        Float sumTotal = 0f;

        for (TipoReparacionesEntity tr : tiposReparacion) {
            for (ListaResponse tre : lista) {
//				if(tr.getId() == tre.getTipo_reparacion()) {
                lr = new ListaReporte1();
                if (tre.getTipo_reparacion() == tr.getId() && tre.getTipo_auto().equals("Sedan")) {
                    System.out.println("++++Sedan");
                    lr.setTipo(tr.getTipo());
                    sumSedan = Float.sum(sumSedan, tre.getCosto_total());
                    countSedan = countSedan + 1;
                }

                if (tre.getTipo_reparacion() == tr.getId() && tre.getTipo_auto().equals("Hat")) {
                    System.out.println("++++Hat");
                    lr.setTipo(tr.getTipo());
                    sumHat = Float.sum(sumHat, tre.getCosto_total());
                    countSHat = countSHat + 1;
                }

                if (tre.getTipo_reparacion() == tr.getId() && tre.getTipo_auto().equals("Suv")) {
                    System.out.println("++++Suv");
                    lr.setTipo(tr.getTipo());
                    sumSuv = Float.sum(sumSuv, tre.getCosto_total());
                    countSuv = countSuv + 1;
                }

                if (tre.getTipo_reparacion() == tr.getId() && tre.getTipo_auto().equals("Pickup")) {
                    System.out.println("++++Pickup");
                    lr.setTipo(tr.getTipo());
                    sumPickup = Float.sum(sumPickup, tre.getCosto_total());
                    countPickup = countPickup + 1;
                }

                if (tre.getTipo_reparacion() == tr.getId() && tre.getTipo_auto().equals("Furgoneta")) {
                    System.out.println("++++Furgoneta");
                    lr.setTipo(tr.getTipo());
                    sumFurgoneta = Float.sum(sumPickup, tre.getCosto_total());
                    countFurgoneta = countPickup + 1;
                }

                lr.setTipo(tr.getTipo());
                sumTotal = Float.sum(sumTotal, tre.getCosto_total());
                countTotal = countTotal + 1;

            }
            lr.setSedan(countSedan);
            lr.setTotalSedan(sumSedan);

            countSedan = 0;
            sumSedan = 0f;

            lr.setHat(countSHat);
            lr.setTotalHat(sumHat);

            countSHat = 0;
            sumHat = 0f;

            lr.setSuv(countSuv);
            lr.setTotalSuv(sumSuv);

            countSuv = 0;
            sumSuv = 0f;

            lr.setPickup(countPickup);
            lr.setTotalPickup(sumPickup);

            countPickup = 0;
            sumPickup = 0f;

            lr.setFurgoneta(countFurgoneta);
            lr.setTotalFurgoneta(sumFurgoneta);

            countFurgoneta = 0;
            sumFurgoneta = 0f;

            lr.setTotal(countTotal);
            lr.setTotalTotal(sumTotal);

            countTotal = 0;
            sumTotal = 0f;

            lr1.add(lr);
        }
        return lr1;
    }

    public List<ListaReporte2> reporte2(int mes, int anio) throws JsonMappingException, JsonProcessingException {
        List<TipoReparacionesEntity> tiposReparacion = getTiposReparaciones();
        List<ListaResponse> lista = getListaDosMeses(mes, anio);


        return null;
    }
}
