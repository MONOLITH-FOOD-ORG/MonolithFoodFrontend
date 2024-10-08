import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment-prod';
import { ListActivityLevelsDTO } from '../interfaces/ActivityLevelDTO';
import { ListObjectivesDTO } from '../interfaces/ObjectiveDTO';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonalInformationService {
  private apiActivityLevelsUrl = `${environment.API}${environment.rscFitness}/activity-levels`;
  private apiObjectivesUrl = `${environment.API}${environment.rscFitness}/objectives`;

  constructor(private httpService: HttpService) {}

  getActivityLevels(): Observable<ListActivityLevelsDTO> {
    return this.httpService.getSimple(this.apiActivityLevelsUrl);
  }

  updateActivityLevel(activityLevelName: string): Observable<any> {
    const params = new HttpParams().set('activityLevel', activityLevelName);
    return this.httpService.putSimple(
      this.apiActivityLevelsUrl + '/update',
      {},
      params
    );
  }

  getObjectives(): Observable<ListObjectivesDTO> {
    return this.httpService.getSimple(this.apiObjectivesUrl);
  }

  updateObjectives(objectiveNames: string[]): Observable<any> {
    const updateUrl = `${this.apiObjectivesUrl}/update`;
    return this.httpService.putBodySimple(updateUrl, objectiveNames);
  }
}
