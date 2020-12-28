import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { VideosService } from './videos.service';
import { IVideoItem } from './videos.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public videos$: Observable<unknown>;
  public searchStringState: string = '';

  constructor(private videosService: VideosService) { }

  public ngOnInit(): void {
    this.videos$ = this.videosService.getPageParams().pipe(

      switchMap(({ isFavorite, ...params }) => {
        if (isFavorite) {
          return of(this.videosService.getFavoritesVideos());
        }
        return this.videosService.getVideosPage(params)
          .pipe(
            tap((data: any) => {
              this.videosService.updateStoredNextPageToken(data.nextPageToken);
            }),
            map((data: any) => this.videosService.updateStoredVideos(data.items)),
          );
      }),
    );
  }

  public addToFavorites(video: IVideoItem): void {
    this.videosService.addToFavorites(video);
  }

  public showFavoriteItems(): void {
    this.videosService.showFavoritesItems();
  }

  public showAllItems(): void {
    this.videosService.showAllItems();
  }

  public loadMoreVideos(): void {
    this.videosService.loadVideos();
  }

  public canWatchMore(): boolean {
    return this.videosService.toggleToWatchMoreButton();
  }
}
