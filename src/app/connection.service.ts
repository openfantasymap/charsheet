import { EventEmitter, Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Observable, Subscription } from 'rxjs';
import { CharacterService } from './character.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  getChatConnection(charId: string, partyId: string): Observable<IMqttMessage> {
    return this.mqtt.observe('aotm/parties/'+partyId+'/chat');
  }
  sendRoll(characterId: string, partyId: string, field: string, result: any) {
    const snd = {"op":"roll", "character": characterId, "field": field, "result": result};
    this.mqtt.unsafePublish('aotm/parties/'+partyId+'/chat', JSON.stringify(snd));
    return snd;
  }

  obs: Map<string, EventEmitter<any>> = new Map<string, EventEmitter<any>>();

  observe(field: string): Observable<any> {
    if (!this.obs.has(field))
      this.obs.set(field, new EventEmitter<any>());
    //@ts-ignore
    return this.obs.get(field);
  }
  emit(field:string, msg:any){
    if (!this.obs.has(field))
      this.obs.set(field, new EventEmitter<any>());
    //@ts-ignore
    this.obs.get(field).emit(msg);
  }


  sendCommand(partyId: any, charId: any, arg2: any) {
      this.mqtt.unsafePublish('aotm/parties/'+partyId+'/'+charId, JSON.stringify(arg2));
  }
  getMasterConnection(charId: string, partyId: string): Observable<IMqttMessage> {
    return this.mqtt.observe('aotm/parties/'+partyId+'/'+charId);
  }
  disconnect(characterId: string, partyId: string) {
    this.mqtt.unsafePublish('aotm/parties/'+partyId+'/status', JSON.stringify({"status":"down", "character": characterId}))
  }
  ping(characterId: string, partyId: string) {
    this.mqtt.unsafePublish('aotm/parties/'+partyId+'/status', JSON.stringify({"status":"up", "character": characterId}))
  }
  joinParty(characterId: string, partyId: string, char:any) {
    this.mqtt.unsafePublish('aotm/parties/'+partyId+'/status', JSON.stringify({"status":"join", "character": characterId, "data": char}))
  }
  
  constructor(
    private mqtt: MqttService
  ) { }
}
