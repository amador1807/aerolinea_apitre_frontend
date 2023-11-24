export interface Viajeros {
    dni: number;
    nombre: string;
    direccion: string;
    telefono: string;
}
export interface Origen {
    codigo_de_viaje: string;
    codigo_origen: string;
}
export interface Destino {
    codigo_de_viaje: string;
    codigo_destino: string;
}
export interface ReferenciaFamiliar {
    dni_familiar: number;
    dni: number;
    codigo_de_viaje: number;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
}
export interface Viajes {
    codigo_de_viaje: number;
    viajero: Viajeros
    numero_plazas: number;
    frv: string;
    origen: Origen;
    destino: Destino;
    referencia_familiar: ReferenciaFamiliar;
}
