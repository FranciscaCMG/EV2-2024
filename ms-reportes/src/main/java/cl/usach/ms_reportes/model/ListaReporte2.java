package cl.usach.ms_reportes.model;
import lombok.Data;

@Data
public class ListaReporte2 {

    private String tipo;
    private Integer mesUno;
    private Integer variacionDos;
    private Integer mesDos;
    private Integer variacionTres;
    private Integer mesTres;
    private Float totalMesUno;
    private Float variacionTotalMesDos;
    private Float totalMesDos;
    private Float variacionTotalMesTres;
    private Float totalMesTres;
}
