import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validator, Validators, FormControl, NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {
        showError: true,
        displayDefaultIndicatorType: false
      },
    },
  ]
})




export class RegisterComponent {

  imageUrl!: string;
  file!: File;

  display: FormControl = new FormControl("", Validators.required);
  submitted = false

  firstSubmitted = false
  firstFormGroup!: FormGroup;

  secondSubmitted = false
  secondFormGroup!: FormGroup;

  thirdSubmitted = false
  thirdFormGroup!: FormGroup;

  fourthSubmitted = false
  fourthFormGroup!: FormGroup;

  fileSizeLimit = 1048576; // 1 MB
  allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  @ViewChild(MatStepper) stepper!: MatStepper;

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info!: MapInfoWindow;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 30,
    minZoom: 2,
  };
  markers = [];
  infoContent = '';

  isLinear = false;

  constructor( private formBuilder:FormBuilder, private router: Router, public toastr:ToastrService, public service:HttpService) { }

  ngOnInit(){
    this.firstFormGroup = this.formBuilder.group({
      firstCtrlName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      firstCtrlMail: ['', [Validators.required, Validators.email]],
      firstCtrlPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ['', [Validators.required, this.fileTypeValidator.bind(this)]],
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });    
  }
  
  zoomIn() {
    if (this.zoom < (this.options?.maxZoom ?? Infinity)) {
      this.zoom++;
    }
  }
 
  zoomOut() {
    if (this.zoom > (this.options?.minZoom ?? Infinity)) {
      this.zoom--;
    }
  }

  firstData(){
    this.firstSubmitted = true
    if(this.firstFormGroup.invalid){
      this.toastr.warning("Fill out your info")
      // this.stepper.selectedIndex = 0;    
    }

  }

  secondData(){
    this.secondSubmitted = true;
    if(this.secondFormGroup.invalid) {
      this.toastr.warning("Fill out your password");
    }
  }

  thirdData(){
    this.thirdSubmitted = true;
    if (this.thirdFormGroup.invalid) {
      this.toastr.warning("Fill out your current address");
    }
  }

  fourthData(){
    this.fourthSubmitted = true;
    if (this.fourthFormGroup.controls['fourthCtrl'].hasError('required')) {
      this.toastr.warning("Please select a file to upload.");
    } else if(this.fourthFormGroup.controls['fourthCtrl'].hasError('maxSize')) {
      this.toastr.warning("File size exceeds the limit of 1 MB.")
    } else if(this.fourthFormGroup.controls['fourthCtrl'].hasError('fileType')) {
      this.toastr.warning("File type is not supported.")
    }
  }

  fileTypeValidator(file: any) {
    const type = file.value
    if (type) {
      const file = type.type;
      const extension = file.split('.').pop().toLowerCase();
      if (!this.allowedFileTypes.includes(extension)) {
        return { fileType: true };
      }
    }
    return null;
  }

  fileSizeValidator(file: any) {
    if (file.size) {
      if (file.size > this.fileSizeLimit) {
        return { maxSize: true };
      } else {
        return null;
      }
    }
    return null;
  }

  fileEvent(event:any){
    const file = event.target.files[0];
    const fileSizeError = this.fileSizeValidator(file);
      if (fileSizeError) {
        this.fourthFormGroup.controls['fourthCtrl'].setErrors({ ...fileSizeError });
      } else {
        this.fourthFormGroup.controls['fourthCtrl'].setValue(file);
        if (event.target && event.target.files) {
          this.file = event.target.files[0];
        }
      }
  }

  previewImage(){
    let formData = new FormData();
    formData.set("file", this.file);
    this.service.userPreview(formData)
  }

  submitData() {
    this.submitted=true;

    if(this.firstFormGroup.invalid || this.secondFormGroup.invalid || this.thirdFormGroup.invalid || this.fourthFormGroup.invalid){
      this.toastr.error("Fill all the required fields")
      return
    }
    let dataset = {
      name: this.firstFormGroup.value.firstCtrlName,
      email: this.firstFormGroup.value.firstCtrlMail,
      phone: this.firstFormGroup.value.firstCtrlPhone,
      password: this.secondFormGroup.value.secondCtrl,
      address: this.thirdFormGroup.value.thirdCtrl,
      fileLink: this.service.imageUrl
    }
    this.service.userReg(dataset)
    this.toastr.success("Registered Successfully")
  }
}