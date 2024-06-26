import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply, ReplyDTO, Thread, ThreadDTO } from '../models/forum.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private forumApiUrl = 'https://localhost:7020/api/forum';

  public constructor(private http: HttpClient) { }

  public getThreadsForTopic(topic: string): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.forumApiUrl}/threads-for-topic?topic=${topic}`);
  }

  public createNewThread(threadDTO: ThreadDTO): Observable<Thread> {
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    return this.http.post<Thread>(`${this.forumApiUrl}/new-thread`, threadDTO, { headers: new HttpHeaders({ Authorization: accessToken }) });
  }

  public replyToThread(replyDTO: ReplyDTO): Observable<Reply> {
    const accessToken = `Bearer ${localStorage.getItem('accessToken')}`;
    return this.http.post<Reply>(`${this.forumApiUrl}/reply-to-thread`, replyDTO, { headers: new HttpHeaders({ Authorization: accessToken }) });
  }
}
