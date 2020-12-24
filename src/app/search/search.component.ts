import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VideosService } from '../videos.service';
import { ISearchString } from '../videos.interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  public form: FormGroup;
  public search: string = '';

  constructor(private videosService: VideosService) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      search_string: new FormControl(null),
    });
  }

  public submitForm(): void {
    let SearchString: ISearchString = {
      search_string: this.form.value.search_string,
    };

    this.videosService.setPageParams(SearchString.search_string, '', true);
  }
}
