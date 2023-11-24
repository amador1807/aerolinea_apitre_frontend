import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Origen, Viajeros, Viajes } from 'src/app/interfaces/main.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-origen',
  templateUrl: './origen.component.html',
  styleUrls: ['./origen.component.css']
})
export class OrigenComponent implements OnInit {

  public displayCreate: boolean = false;
  public displayEdit: boolean = false;
  public displayShow: boolean = false;
  public origenes: Origen[] = [];
  public cities = [];
  public viajes: Viajes[] = [];
  public origen!: Origen;

  public formCreate = this.fb.group({
    codigo_de_viaje: ['', Validators.required],
    codigo_origen: ['', Validators.required],
  })
  public formEdit = this.fb.group({
    codigo_de_viaje: ['', Validators.required],
    codigo_origen: ['', Validators.required],
  })

  public formShow = this.fb.group({
    codigo_de_viaje: [{ value: '', disabled: true }, [Validators.required]],
    codigo_origen: [{ value: '', disabled: true }, [Validators.required]],

  })
  constructor(
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.getViajes();
    this.getOrigenes();
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
  getOrigenes() {
    this.mainService.get('origen').subscribe(res => {
      this.origenes = res.origen;
    })
  }
  handleCreate() {
    this.displayCreate = !this.displayCreate;
  }
  handleEdit(origen: Origen) {
    this.origen = origen;
    let body = {
      "codigo_de_viaje": origen.codigo_de_viaje,
      "codigo_origen": origen.codigo_origen,
    }
    this.formEdit.patchValue(body)
    this.displayEdit = !this.displayEdit;
  }
  handleShow(origen: Origen) {
    let body = {
      "codigo_de_viaje": origen.codigo_de_viaje,
      "codigo_origen": origen.codigo_origen,
    }
    this.formShow.patchValue(body)
    this.displayShow = !this.displayShow;
  }

  createViaje() {
    const body = { 
      ... this.formCreate.value, 
      codigo_de_viaje: Number(this.formCreate.value.codigo_de_viaje.codigo_de_viaje),
      codigo_origen: this.formCreate.value.codigo_origen.name
     };
    this.mainService.post("origen", body).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Creado correctamente' });
      this.getOrigenes();
      this.formCreate.reset();
      this.displayCreate = !this.displayCreate;
    });
  }
  updateViaje() {
    const body = { 
      ... this.formEdit.value, 
      codigo_de_viaje: Number(this.formEdit.value.codigo_de_viaje.codigo_de_viaje),
      codigo_origen: this.formEdit.value.codigo_origen.name
     };
    this.mainService.patch(`origen/${this.origen.codigo_de_viaje}`, body).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Actualizado correctamente' });
      this.getOrigenes();
      this.formEdit.reset();
      this.displayEdit = !this.displayEdit;
    });
  }

  confirm(event: Event, idOrigen: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro que deseas eliminar este origen?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mainService.delete(`origen/${idOrigen}`).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Elimiando correctamente' });
          this.getOrigenes();
        });

      },
      reject: () => {
      }
    });
  }
}
