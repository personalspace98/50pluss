import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../auth/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-profile',
  templateUrl: './main-profile.component.html',
  styleUrls: ['./main-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainProfileComponent implements OnInit {
  @Input() user: any;
  @Output() profileUpdate = new EventEmitter<any>();

  updateProfileForm: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log("this.user",this.user);
    this.updateProfileForm = new FormGroup({
      displayName: new FormControl(this.user.displayName),
      photoUrl: new FormControl(this.user.photoUrl)
    });
  }

  onProfileUpdate() {
    this.profileUpdate.emit(this.updateProfileForm.value);
  }

}
