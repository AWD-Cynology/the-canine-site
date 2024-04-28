import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply, Thread, ThreadDTO } from '../models/forum.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private forumApiUrl = 'https://localhost:7020/api/forum';

  public constructor(private http: HttpClient) { }

  public getThreadsForTopic(topicId: string): Observable<Thread[]>{
    return this.http.get<Thread[]>(`${this.forumApiUrl}/threads-for-topic`, { params: { 'topicId': topicId } });
  }

  public getRepliesForThread(params: HttpParams): Observable<Reply[]>{
    return this.http.get<Reply[]>(`${this.forumApiUrl}/replies-for-thread`, { params: params })
  }

  public postNewThread(threadDTO: ThreadDTO): Observable<any>{
    return this.http.post<any>(`${this.forumApiUrl}/new-thread`, threadDTO, { headers: new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    })});
  }
}
