export interface Notificacao {
  notificacao_id: string;
  notificacao_titulo: string;
  notificacao_texto: string;
  notificacao_agenda_datainicio: Date;
  notificacao_agenda_datafim: Date;
  notificacao_homesistema: Boolean;
  notificacao_email: Boolean;
  usuario_login: string;  
}
