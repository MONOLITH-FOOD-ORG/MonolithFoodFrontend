import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment-prod';

@Component({
  selector: 'app-oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss'],
})
export class OauthCallbackComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.identifyOauth();
  }

  private async identifyOauth(): Promise<void> {
    try {
      const params = await firstValueFrom(this.route.queryParams);
      const token = params['token'];
      if (token) {
        localStorage.setItem('token', token);
        await this.router.navigate(['/dashboard']);
      } else {
        await this.router.navigate(['/login']);
      }
    } catch (error) {
      if (!environment.PRODUCTION) {
        console.log('oauth-callback.component.ts: ' + error);
      }
    }
  }
}
