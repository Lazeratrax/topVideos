import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IVideoParams, IVideoItem } from './videos.interfaces';
import * as Variables from './variables';

const DEFAULT_PARAMS: IVideoParams =
{
  channelId: Variables.CHANNEL_ID,
  part: Variables.PART,
  chart: Variables.CHART,
  maxResults: Variables.MAX_RESULTS,
  q: Variables.QUERY,
  key: Variables.KEY,
  isFavorite: Variables.IS_FAVORITE
};

@Injectable({
  providedIn: 'root',
})
export class TopVideosService {

  private storedVideos = [];
  private favoritesVideos = this.fetchFavoriteVideosFromLS();
  private videoSubjectSource: BehaviorSubject<IVideoParams> = new BehaviorSubject<IVideoParams>(DEFAULT_PARAMS);
  private fetchFavoriteVideosFromLS() {
    try {
      const videos = localStorage.getItem(Variables.FAVORITE_VIDEOS_LS_KEY);
      return videos ? JSON.parse(videos) : []
    } catch { }
  }

  constructor(private http: HttpClient) { }

  public getPageParams(): Observable<IVideoParams> {
    return this.videoSubjectSource.asObservable();
  }

  public setPageParams(textFragment: string, isReset?: boolean): any {
    if (isReset) {
      this.storedVideos = [];
    }
    return this.videoSubjectSource.next({ ...DEFAULT_PARAMS, q: DEFAULT_PARAMS.q + `intitle:${textFragment}`});
  }

  public getVideosPage(params): Observable<IVideoItem[]> {
    return this.http.get<any>(`${Variables.ADRESS}`, { params });
  }

  public updateStoredVideos(video: IVideoItem[]): IVideoItem[] {
    return this.storedVideos = this.storedVideos.concat(video);
  }

  public addToFavorites(video: IVideoItem): void {
    const index = this.favoritesVideos.findIndex(v => v.id.videoId === video.id.videoId);
    if (index === -1) {
      this.favoritesVideos.push(video);
    } else {
      this.favoritesVideos.splice(index, 1);
    }
    localStorage.setItem(Variables.FAVORITE_VIDEOS_LS_KEY, JSON.stringify(this.favoritesVideos));
  }

  public isFavorite(video: IVideoItem): IVideoItem {
    return this.favoritesVideos.some(v => v.id.videoId === video.id.videoId);
  }

  public showFavoritesItems(): void {
    this.storedVideos = [];
    this.videoSubjectSource.next({ ...DEFAULT_PARAMS, isFavorite: true });
  }

  public showAllItems(): void {
    this.storedVideos = [];
    this.videoSubjectSource.next({ ...DEFAULT_PARAMS, isFavorite: false });
  }

  public getFavoritesVideos(): IVideoItem[] {
    return this.favoritesVideos;
  }
}

