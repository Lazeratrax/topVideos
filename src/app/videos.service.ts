import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IVideoParams, IVideoItem } from './videos.interfaces';
import * as Variables from './variables';

const DEFAULT_PARAMS: IVideoParams =
{
  channelId: Variables.CHANNEL_ID,
  part: Variables.PART,
  maxResults: Variables.MAX_RESULTS,
  q: Variables.QUERY,
  key: Variables.KEY,
  isFavorite: Variables.IS_FAVORITE,
  pageToken: Variables.PAGE_TOKEN
};

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  private storedVideos = [];
  private storedNextPageToken: string;
  private favoritesVideos = this.fetchFavoriteVideosFromLS();
  private videoSubjectSource: BehaviorSubject<IVideoParams> = new BehaviorSubject<IVideoParams>(DEFAULT_PARAMS);
  private fetchFavoriteVideosFromLS(): any {
    try {
      const videos = localStorage.getItem(Variables.FAVORITE_VIDEOS_LS_KEY);
      return videos ? JSON.parse(videos) : [];
    } catch { }
  }

  constructor(private http: HttpClient) { }

  public getPageParams(): Observable<IVideoParams> {
    return this.videoSubjectSource.asObservable();
  }

  public setPageParams(textFragment?: string, pageToken?: string, isReset?: boolean): any {
    if (isReset) {
      this.storedVideos = [];
    }
    let query = ``;
    if (textFragment) {
      query = `intitle:${textFragment}`;
    }
    return this.videoSubjectSource.next({
      ...DEFAULT_PARAMS,
      q: DEFAULT_PARAMS.q + `${query}`,
      pageToken: DEFAULT_PARAMS.pageToken + `${pageToken}`
    });
  }

  public updateStoredNextPageToken(nextPageToken): void {
    this.storedNextPageToken = nextPageToken;
  }

  public loadVideos(): void {
    const token = this.storedNextPageToken;
    this.setPageParams('', token);
  }

  public getVideosPage(params): Observable<IVideoItem[]> {
    return this.http.get<any>(`${Variables.ADRESS}`, { params });
  }

  public updateStoredVideos(videos: IVideoItem[]): IVideoItem[] {
    return this.storedVideos = this.storedVideos.concat(videos);
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

  public isFavorite(video: IVideoItem): boolean {
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

  public toggleToWatchMoreButton(): boolean {
    const situation = this.videoSubjectSource.getValue();
    if (situation.q.length > 0) {
      return false;
    }
    return true;
  }
}



