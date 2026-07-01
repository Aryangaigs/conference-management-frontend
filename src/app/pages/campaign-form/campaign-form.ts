import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { CampaignService } from '../../services/campaign';

@Component({
  selector: 'app-campaign-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './campaign-form.html',
  styleUrl: './campaign-form.css'
})
export class CampaignForm implements OnInit {

  campaignForm!: FormGroup;

  isEditMode = false;

  campaignId = '';

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.createForm();

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      if (id) {

        this.isEditMode = true;

        this.campaignId = id;

        this.loadCampaign();

      }

    });

  }

  createForm() {

    this.campaignForm = this.fb.group({

      campaignName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      objective: ['', Validators.required],

      audience: ['Doctors', Validators.required],

      subject: ['', Validators.required],

      previewText: ['', Validators.required],

      emailContent: ['', [
        Validators.required,
        Validators.minLength(20)
      ]],

      ctaButton: ['', Validators.required],

      ctaUrl: ['', [
        Validators.required,
        Validators.pattern('https?://.+')
      ]],

      status: ['Draft', Validators.required]

    });

  }

  loadCampaign() {

    this.campaignService

      .getCampaign(this.campaignId)

      .subscribe({

        next: (response) => {

          this.campaignForm.patchValue(response.data);

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  saveCampaign() {

  console.log("SAVE BUTTON CLICKED");

  console.log("Valid:", this.campaignForm.valid);

  console.log("Edit Mode:", this.isEditMode);

  if (this.campaignForm.invalid) {

    this.campaignForm.markAllAsTouched();

    return;

  }

  if (this.isEditMode === true) {

    console.log("UPDATE");

    this.updateCampaign();

  } else {

    console.log("CREATE");

    this.createCampaign();

  }

}

  createCampaign() {

  console.log("Inside createCampaign()");
  console.log(this.campaignForm.value);

  this.campaignService.createCampaign(this.campaignForm.value)

    .subscribe({

      next: (response) => {

        console.log("SUCCESS", response);

        alert("Campaign Created Successfully");

        this.router.navigate(['/campaigns']);

      },

      error: (err) => {

        console.log("ERROR", err);

      }

    });

}

  updateCampaign() {

    this.campaignService

      .updateCampaign(

        this.campaignId,

        this.campaignForm.value

      )

      .subscribe({

        next: () => {

          alert("Campaign Updated Successfully");

          this.router.navigate(['/campaigns']);

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  cancel() {

    this.router.navigate(['/campaigns']);

  }

  get f() {

    return this.campaignForm.controls;

  }

}