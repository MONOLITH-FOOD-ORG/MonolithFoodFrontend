import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment-prod';
import { AllMacrosAndIntakesDTO } from '../interfaces/MacrosDetailedDTO';
import { HttpService } from 'src/app/core/services/http.service';
import { MatDialogConfig } from '@angular/material/dialog';
import {
  AddIntakeDTO,
  DetailedIntakeDTO,
  EditIntakeDTO,
} from '../interfaces/NutritionDTO';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.API}${environment.rscIntakes}`;
  private apiIntakeUrl = `${environment.API}${environment.rscIntakes}`;
  private apiFoodUrl = `${environment.API}${environment.rscFoods}`;

  private refreshNeededSubject = new BehaviorSubject<void>(undefined);
  public refreshNeeded$ = this.refreshNeededSubject.asObservable();

  constructor(private httpService: HttpService) {}

  public getMacrosDetailed(
    dateControl: FormControl
  ): Observable<AllMacrosAndIntakesDTO | null> {
    const api = this.apiUrl + '/category/all';
    const params = this.startAndEndDate(dateControl);
    return this.httpService.getSimple<AllMacrosAndIntakesDTO>(api, params).pipe(
      catchError((error) => {
        if (!environment.PRODUCTION) {
          console.log('dashboard.service.ts: Error obteniendo las macros - ', error);
        }
        return of(null);
      })
    );
  }

  public addIntake(newIntake: AddIntakeDTO): Observable<any> {
    const api = this.apiUrl + '/add';
    return this.httpService.postBodySimple<any>(api, newIntake).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  public updateIntake(intake: EditIntakeDTO): Observable<any> {
    const api = this.apiUrl + '/update';
    return this.httpService.putBodySimple<any>(api, intake).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  public deleteIntake(id: number): Observable<any> {
    const api = this.apiUrl + '/delete';
    return this.httpService.deleteSimple<any>(api, { id }).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  public getDetailedIntake(eatId: number): Observable<DetailedIntakeDTO> {
    return this.httpService.getSimple(this.apiIntakeUrl + '/' + eatId);
  }

  public getDetailedFood(
    foodId: number,
    quantity: number
  ): Observable<DetailedIntakeDTO> {
    return this.httpService.getSimple(this.apiFoodUrl + '/search/' + foodId, {
      quantity: quantity,
    });
  }

  // * Functions
  public startAndEndDate(
    dateControl: FormControl
  ): { startDate: string; endDate: string } | null {
    const dateValue = dateControl.value;
    if (!dateValue) return null;
    const dateObj = new Date(dateValue);
    dateObj.setTime(dateObj.getTime() - 5 * 60 * 60 * 1000);
    const date = dateObj.toISOString().slice(0, 11);
    const startDate = date + '00:00:00';
    const endDate = date + '23:59:59.999';
    return {
      startDate: startDate,
      endDate: endDate,
    };
  }

  public getDialogConfig(
    width: string,
    height: string,
    disableClose: boolean,
    closeOnNavigation: boolean,
    data: any = null
  ): MatDialogConfig {
    const config = new MatDialogConfig();
    config.disableClose = disableClose || false;
    config.autoFocus = true;
    config.hasBackdrop = true;
    config.closeOnNavigation = closeOnNavigation || false;
    config.width = width || '1080px';
    config.height = height || '650px';
    config.enterAnimationDuration = 700;
    config.exitAnimationDuration = 700;
    config.backdropClass = 'style-css-dialog-background';
    config.data = data || null;
    return config;
  }
}
