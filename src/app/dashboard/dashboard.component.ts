import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AnserI } from '../interfaces/anser.interface';
import { AnserService } from '../services/anser.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  infoContrato:any[];
  resgGeneral:AnserI[];
  resgGeneralFiltrados = [];
  
  duracion:number;
  iva:number;
  contratoSinIva:number;
  anticipo:number;
  fondoGarantia:number;
  porcentaje:number;
  estimadoFecha:number=0;
  contratoTotal:number;
  
  
  sumaAnticipo=0;
  sumaFondo=0;
  sumaSubtotal=0;
  sumaIva=0;
  sumaTotal=0;
  
  constructor(private anser: AnserService) { }

  ngOnInit(): void {
    this.getContrato();
    this.getDatos();
    
  }

 getContrato(){
   this.anser.obtenerContrato()
      .subscribe(
        (res:any)=>{
          this.infoContrato = res.results;
          console.table(this.infoContrato);

          const { vat, guarantee_fund, down_payment, total_amount, start_date, end_date} =res.results[0];
          var fechaInicio= moment(start_date);
          var fechaFin = moment(end_date);

          this.duracion = fechaFin.diff(fechaInicio,'days');

          this.contratoTotal= total_amount;
          this.iva = total_amount*vat;
          this.contratoSinIva = total_amount - this.iva;
          this.anticipo = total_amount * down_payment;
          this.fondoGarantia = total_amount * guarantee_fund;



        }
      )
 }
  getDatos(){
    this.anser.obtenerDatos()
        .subscribe(
         (res:any) => {
            this.resgGeneral = res.results;

            for(let i=0; i<this.resgGeneral.length; i++){
              
              let iva = this.resgGeneral[i].estimate *.16;
              let subTotal = this.resgGeneral[i].estimate - iva;
              let total = this.resgGeneral[i].estimate;
             
              var jason = {
                charge_off: this.resgGeneral[i].charge_off,
                down_payment: this.resgGeneral[i].down_payment,
                estimate: this.resgGeneral[i].estimate,
                guarantee_fund: this.resgGeneral[i].guarantee_fund,
                name: this.resgGeneral[i].name,
                pk: this.resgGeneral[i].pk,
                reviewDate: this.resgGeneral[i].reviewDate,
                reviewed_by: this.resgGeneral[i].reviewed_by,
                sk: this.resgGeneral[i].sk,
                iva: iva,
                subTotal: subTotal,
                total: total
              }
              
                this.resgGeneralFiltrados.push(jason);
                
                
              }
              for(let i=0; i<this.resgGeneralFiltrados.length; i++){
                this.estimadoFecha += this.resgGeneralFiltrados[i].estimate;
                this.sumaAnticipo += this.resgGeneralFiltrados[i].down_payment;
                this.sumaFondo += this.resgGeneralFiltrados[i].guarantee_fund;
                this.sumaSubtotal += this.resgGeneralFiltrados[i].subTotal;
                this.sumaIva += this.resgGeneralFiltrados[i].iva;
                this.sumaTotal += this.resgGeneralFiltrados[i].total;
              

              }
              
            console.log(this.resgGeneralFiltrados);

           this.porcentaje =(( this.estimadoFecha*100) / this.contratoTotal);
           const progressBar = <HTMLScriptElement>document.querySelector('.progress-bar[role="progressbar"]');
           progressBar.style.width = this.porcentaje + '%';

          },
        )
    
  }

}
