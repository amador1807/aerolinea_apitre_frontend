import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Viajeros, Viajes } from 'src/app/interfaces/main.interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {

  public displayCreate: boolean = false;
  public displayEdit: boolean = false;
  public displayShow: boolean = false;
  public viajeros = [];
  public viajes = [];
  public viaje!: Viajes;

  public formCreate = this.fb.group({
    dni: ['', Validators.required],
    numero_plazas: ['', Validators.required],
    frv: ['', Validators.required],
  })
  public formEdit = this.fb.group({
    dni: ['', Validators.required],
    numero_plazas: ['', Validators.required],
    frv: ['', Validators.required],
  })

  public formShow = this.fb.group({
    dni: [{ value: '', disabled: true }, [Validators.required]],
    numero_plazas: [{ value: '', disabled: true }, [Validators.required]],
    frv: [{ value: '', disabled: true }, [Validators.required]],
  })
  constructor(
    private fb: UntypedFormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private mainService: MainService) { }

  ngOnInit(): void {
    this.getViajes();
    this.getViajeros();
  }
  getViajes() {
    this.mainService.get('viajes').subscribe(res => {
      this.viajes = res.viajes;
    })
  }
  getViajeros() {
    this.mainService.get('viajeros').subscribe(res => {
      this.viajeros = res.viajeros;
    })
  }

  handleCreate() {
    this.displayCreate = !this.displayCreate;
  }
  handleEdit(viaje: Viajes) {
    const currentDNI: any = this.viajeros.find((viajero: Viajeros) => viajero.dni === viaje.viajero.dni)
    this.viaje = viaje;
    let body = {
      "numero_plazas": viaje.numero_plazas,
      "codigo_de_viaje": viaje.codigo_de_viaje,
      "dni": currentDNI,
      "frv": viaje.frv,
    }
    this.formEdit.patchValue(body)
    this.displayEdit = !this.displayEdit;
  }
  handleShow(viaje: Viajes) {
    let body = {
      "numero_plazas": viaje.numero_plazas,
      "dni": viaje.viajero.dni,
      "frv": viaje.frv,
    }

    const dni = body.dni;
    const viajero = this.viajeros.find((v: Viajeros) => v.dni === dni);
    if (viajero) {
      this.formEdit.get('dni')!.setValue(viajero);
    }

    this.formShow.patchValue(body)
    this.displayShow = !this.displayShow;
  }

  createViaje() {
    const body = { ... this.formCreate.value, dni: this.formCreate.value.dni.dni };
    this.mainService.post("viajes", body).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Creado correctamente' });
      this.getViajes();
      this.formCreate.reset();
      this.displayCreate = !this.displayCreate;
    });
  }
  updateViaje() {
    const body = {
      ... this.formEdit.value,
      dni: this.formEdit.value.dni.dni,
      codigo_de_viaje: this.viaje.codigo_de_viaje,
    }
    this.mainService.patch(`viajes/${this.viaje.codigo_de_viaje}`, body).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Actualizado correctamente' });
      this.getViajes();
      this.formEdit.reset();
      this.displayEdit = !this.displayEdit;
    });
  }

  confirm(event: Event, idViaje: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estas seguro que deseas eliminar este viaje?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.mainService.delete(`viajes/${idViaje}`).subscribe(res => {
          this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Elimiando correctamente' });
          this.getViajes();
        });

      },
      reject: () => {
      }
    });
  }
}
