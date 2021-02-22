export interface Incidentes {
  incidente_id: String;
  incidente_tipo: string;
  incidente_houveparada: boolean;
  incidente_titulo: string;
  incidente_data: Date;
  incidente_dataregistro: Date;
  incidente_duracao: Number;
  usuario_login_criacao: string;
  processo_nome: string;
}
