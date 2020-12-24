import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'titleTrimmer',
})
export class TitleTrimmerPipe implements PipeTransform {

    transform(title: string): string {
        const substring = "Давай поженимся! ";
        if (Boolean(title.includes(substring)) === true) {
            return title.replace(substring, '');
        }
        else {
            return title;
        }
    }
}
