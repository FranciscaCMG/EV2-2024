package cl.usach.ms_reportes.controllers;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import cl.usach.ms_reportes.model.ListaReporte1;
import cl.usach.ms_reportes.model.ListaReporte2;
import cl.usach.ms_reportes.services.ReportesService;

@RestController
@RequestMapping("/reportes")
@CrossOrigin("*")
public class ReportesController {

    @Autowired
    private ReportesService reportesService;

    @GetMapping("/reporte1/{mes}/{anio}")
    public ResponseEntity<List<ListaReporte1>> getListByMonth(@PathVariable ("mes") int mes, @PathVariable ("anio") int anio) throws JsonMappingException, JsonProcessingException {
        List<ListaReporte1> lista = reportesService.reporte1(mes, anio);
        if(lista.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/reporte2/{mes}/{anio}")
    public ResponseEntity<List<ListaReporte2>> getListByMonth2(@PathVariable ("mes") int mes, @PathVariable ("anio") int anio) throws JsonMappingException, JsonProcessingException {
        List<ListaReporte2> lista = reportesService.reporte2(mes, anio);
        if(lista.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(lista);
    }
}
