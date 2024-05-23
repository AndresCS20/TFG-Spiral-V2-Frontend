import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommuniyDataService } from '@services/data/communiy-data.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent  {
  constructor(private router: Router,private communityDataService: CommuniyDataService) {}


}
