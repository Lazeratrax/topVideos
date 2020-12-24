import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  faLink, IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { VideosService } from '../videos.service';
import { IVideoItem } from '../videos.interfaces';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoItemComponent {

  public faLink: IconDefinition = faLink;
  
  @Input() video: IVideoItem;
  @Output() addToFavorites = new EventEmitter<IVideoItem>();

  public constructor(private videosService: VideosService) { }

  public toggleFavorite(): void {
    this.addToFavorites.emit(this.video);
  }

  get isFavorite(): boolean {
    return this.videosService.isFavorite(this.video);
  }
}
