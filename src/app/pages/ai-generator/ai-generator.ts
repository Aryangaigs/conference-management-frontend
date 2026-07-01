import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { AiService } from '../../services/ai';

import { Router } from '@angular/router';

@Component({
  selector: 'app-ai-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './ai-generator.html',
  styleUrl: './ai-generator.css'
})
export class AiGenerator {

  aiForm: FormGroup;

  loading = signal(false);

  generatedData = signal<any>(null);

  constructor(
    private fb: FormBuilder,
    private aiService: AiService,
    private router: Router
  ) {

    this.aiForm = this.fb.group({

      objective: ['', Validators.required],

      audience: ['', Validators.required],

      cta: ['', Validators.required]

    });

  }

  copyEmail() {

  if (!this.generatedData()) return;

  const email = `

Subject:
${this.generatedData().subject}

Preview:
${this.generatedData().previewText}

Email:
${this.generatedData().emailContent}

CTA:
${this.generatedData().ctaSuggestion}

`;

  navigator.clipboard.writeText(email);

  alert("Email copied successfully!");

}

useInCampaign() {

  if (!this.generatedData()) return;

  localStorage.setItem(

    "generatedCampaign",

    JSON.stringify(this.generatedData())

  );

  this.router.navigate(['/campaigns/new']);

}
  generateEmail() {

    if (this.aiForm.invalid) {

      this.aiForm.markAllAsTouched();

      return;

    }

    this.loading.set(true);

    this.generatedData.set(null);

    this.aiService.generateEmail(this.aiForm.value)

      .subscribe({

        next: (response) => {

          console.log(response);

          this.generatedData.set(response.data);

          this.loading.set(false);

        },

        error: (err) => {

          console.log(err);

          this.loading.set(false);

          alert("Unable to generate email. Please try again.");

        }

      });

  }

}