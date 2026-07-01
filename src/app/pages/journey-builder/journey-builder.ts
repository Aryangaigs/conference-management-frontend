import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Journey } from '../../models/journey';
import { JourneyService } from '../../services/journey';

@Component({
  selector: 'app-journey-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './journey-builder.html',
  styleUrl: './journey-builder.css'
})
export class JourneyBuilder implements OnInit {

  journeyForm!: FormGroup;

  journeys = signal<Journey[]>([]);

  loading = signal(false);

  isEditMode = false;

  selectedJourneyId = '';

  constructor(
    private fb: FormBuilder,
    private journeyService: JourneyService
  ) {}

  ngOnInit(): void {

    this.createForm();

    this.loadJourneys();

  }

  createForm() {

    this.journeyForm = this.fb.group({

      journeyName: [
        '',
        Validators.required
      ],

      campaign: [
        '',
        Validators.required
      ],

      trigger: [
        'Immediately',
        Validators.required
      ],

      waitDays: [
        1,
        Validators.required
      ],

      condition: [
        'Email Opened',
        Validators.required
      ],

      yesAction: [
        'Send Reminder',
        Validators.required
      ],

      noAction: [
        'Send Follow-up',
        Validators.required
      ],

      status: [
        'Active',
        Validators.required
      ]

    });

  }

  loadJourneys() {

    this.loading.set(true);

    this.journeyService.getJourneys()

      .subscribe({

        next: (response) => {

          console.log(response);

          this.journeys.set(response.data);

          this.loading.set(false);

        },

        error: (err) => {

          console.log(err);

          this.loading.set(false);

        }

      });

  }

  saveJourney() {

    if (this.journeyForm.invalid) {

      this.journeyForm.markAllAsTouched();

      return;

    }

    if (this.isEditMode) {

      this.updateJourney();

    }

    else {

      this.createJourney();

    }

  }

  createJourney() {

    this.journeyService

      .createJourney(this.journeyForm.value)

      .subscribe({

        next: () => {

          alert("Journey Created Successfully");

          this.resetForm();

          this.loadJourneys();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  editJourney(journey: Journey) {

    this.isEditMode = true;

    this.selectedJourneyId = journey._id!;

    this.journeyForm.patchValue({

      journeyName: journey.journeyName,

      campaign: journey.campaign,

      trigger: journey.trigger,

      waitDays: journey.waitDays,

      condition: journey.condition,

      yesAction: journey.yesAction,

      noAction: journey.noAction,

      status: journey.status

    });

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }

  updateJourney() {

    this.journeyService

      .updateJourney(

        this.selectedJourneyId,

        this.journeyForm.value

      )

      .subscribe({

        next: () => {

          alert("Journey Updated Successfully");

          this.resetForm();

          this.loadJourneys();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  deleteJourney(id: string) {

    const confirmDelete = confirm(

      "Delete this Journey?"

    );

    if (!confirmDelete) return;

    this.journeyService

      .deleteJourney(id)

      .subscribe({

        next: () => {

          this.loadJourneys();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  resetForm() {

    this.isEditMode = false;

    this.selectedJourneyId = '';

    this.journeyForm.reset({

      trigger: 'Immediately',

      waitDays: 1,

      condition: 'Email Opened',

      yesAction: 'Send Reminder',

      noAction: 'Send Follow-up',

      status: 'Active'

    });

  }

  get f() {

    return this.journeyForm.controls;

  }

}