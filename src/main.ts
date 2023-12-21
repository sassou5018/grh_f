import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

import { AppModule } from './app/app.module';

dayjs.extend(relativeTime);
dayjs.locale('fr');
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
