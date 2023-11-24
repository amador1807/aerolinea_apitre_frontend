import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Destino, Origen, Viajeros, Viajes } from 'src/app/interfaces/main.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-destino',
  templateUrl: './destino.component.html',
  styleUrls: ['./destino.component.css']
})
export class DestinoComponent implements OnInit {

  public displayCreate: boolean = false;
  public displayEdit: boolean = false;
  public displayShow: boolean = false;
  public destinos: Destino[] = [];
  public viajes: Viajes[] = [];
  public destino!: Destino;
  public cities = [];

  public formCreate = this.fb.group({
    codigo_de_viaje: ['', Validators.required],
    codigo_destino: ['', Validators.required],
  })
  public formEdit = this.fb.group({
    codigo_de_viaje: ['', Validators.required],
    codigo_destino: ['', Validators.required],
  })

  public formShow = this.fb.group({
    codigo_de_viaje: [{ value: '', disabled: true }, [Validators.required]],
    codigo_destino: [{ value: '', disabled: true }, [Validators.required]],

  })
  constructor(
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.getViajes();
    this.getDestinos();
    this.getCities();
  }

  getCities() {
    this.mainService.getSimple('https://api-colombia.com/api/v1/City').subscribe(res => {
      this.cities = res;
    })
  }
  getViajes() {
    this.mainService.get('viajes').subscribe(res => {
      this.viajes = res.viajes;

    })
  }
  getDestinos() {
    this.mainService.get('destino').subscribe(res => {
      this.destinos = res.destino;
    })
  }
  handleCreate() {
    this.displayCreate = !this.displayCreate;
  }
  handleEdit(destino: Destino) {
    this.destino = destino;
    let body = {
      "codigo_de_viaje": destino.codigo_de_viaje,
      "codigo_destino": destino.codigo_destino,
    }
    this.formEdit.patchValue(body)
    this.displayEdit = !this.displayEdit;
  }
  handleShow(destino: Destino) {
    let body = {
      "codigo_de_viaje": destino.codigo_de_viaje,
      "codigo_destino": destino.codigo_destino,
    }
    this.formShow.patchValue(body)
    this.displayShow = !this.displayShow;
  }

  createViaje() {
    const body = { 
      ... this.formCreate.value, 
      codigo_de_viaje: Number(this.formCreate.value.codigo_de_viaje.codigo_de_viaje),
      codigo_destino: this.formCreate.value.codigo_destino.name
     };
    this.mainService.post("destino", body).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Creado correctamente' });
      this.getDestinos();
      this.formCreate.reset();
      this.displayCreate = !this.displayCreate;
    });
  }
  updateViaje() {
    const body = { 
      ... this.formEdit.value, 
      codigo_de_viaje: Number(this.formEdit.value.codigo_de_viaje.codigo_de_viaje),
      codigo_destino: this.formEdit.value.codigo_destino.name
     };
    this.mainService.patch(`destino/${this.destino.codigo_de_viaje}`, body).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Actualizado correctamente' });
      this.getDestinos();
      this.formEdit.reset();
      this.displayEdit = !this.displayEdit;
    });
  }

  confirm(event: Event, idDestino: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro que deseas eliminar este destino?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mainService.delete(`destino/${idDestino}`).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Elimiando correctamente' });
          this.getDestinos();
        });

      },
      reject: () => {
      }
    });
  }
}
