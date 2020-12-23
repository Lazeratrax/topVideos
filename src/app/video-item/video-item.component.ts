import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TopVideosService } from '../videos.service';
import { IVideoItem } from '../videos.interfaces';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoItemComponent {
  @Input() video: IVideoItem;
  @Output() addToFavorites = new EventEmitter<IVideoItem>();

  public constructor(private topVideosService: TopVideosService) { }

  public toggleFavorite(): void {
    this.addToFavorites.emit(this.video);
  }

  get isFavorite(): IVideoItem {
    return this.topVideosService.isFavorite(this.video);
  }
}
