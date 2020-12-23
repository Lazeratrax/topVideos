import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TopVideosService } from './videos.service';
import { IVideoItem } from './videos.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public videos$: Observable<unknown>;
  public searchStringState: string = '';

  constructor(private topVideosService: TopVideosService) { }

  public ngOnInit(): void {
    this.videos$ = this.topVideosService.getPageParams().pipe(
      switchMap(({ isFavorite, ...params }) => {
        if (isFavorite) {
          return of(this.topVideosService.getFavoritesVideos())
        }
        return this.topVideosService.getVideosPage(params)
          .pipe(map((data: any) => this.topVideosService.updateStoredVideos(data.items)))
      }),
    );
  }

  public addToFavorites(video: IVideoItem): void {
    this.topVideosService.addToFavorites(video);
  }

  public showFavoriteItems(): void {
    this.topVideosService.showFavoritesItems();
  }

  public showAllItems(): void {
    this.topVideosService.showAllItems();
  }
}

