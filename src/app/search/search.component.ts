import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import { TopVideosService } from '../videos.service';
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

  constructor(private topVideosService: TopVideosService) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      search_string: new FormControl(null),
    });
  }

  public submitForm(): void {
    let SearchString: ISearchString = {
      search_string: this.form.value.search_string,
    };

   this.topVideosService.setPageParams(SearchString.search_string, true).pipe(
      filter(res =>
        Object.values(res).length == 2),
      debounceTime(2000),
      distinctUntilChanged()
    )
      .subscribe(
        params => {
          console.log('params', params);
        });
  }
}
