import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Campaign } from '../../models/campaign';
import { CampaignService } from '../../services/campaign';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './campaign-list.html',
  styleUrl: './campaign-list.css'
})
export class CampaignList implements OnInit {

  campaigns: Campaign[] = [];

  searchText = '';

  selectedStatus = 'All';

  constructor(
    private router: Router,
    private campaignService: CampaignService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  console.log("CampaignList Initialized");

  this.loadCampaigns();

}

loadCampaigns() {

  console.log("Calling API...");

  this.campaignService.getCampaigns().subscribe({

    next: (response) => {

      console.log("Response:", response);

      this.campaigns = [...response.data];
      this.cdr.detectChanges();
      console.log(this.campaigns);

    },

    error: (err) => {

      console.log("API Error:", err);

    }

  });

}

  get filteredCampaigns() {

    return this.campaigns.filter(campaign => {

      const matchesSearch =

        campaign.campaignName
          .toLowerCase()
          .includes(this.searchText.toLowerCase())

        ||

        campaign.audience
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

      const matchesStatus =

        this.selectedStatus === 'All'

        ||

        campaign.status === this.selectedStatus;

      return matchesSearch && matchesStatus;

    });

  }

  createCampaign() {

    this.router.navigate(['/campaigns/new']);

  }

  editCampaign(id: string) {

    this.router.navigate(['/campaigns/edit', id]);

  }

  deleteCampaign(id: string) {

    if (confirm('Delete this campaign?')) {

      this.campaignService.deleteCampaign(id)

        .subscribe({

          next: () => {

            this.loadCampaigns();

          },

          error: (err) => {

            console.log(err);

          }

        });

    }

  }

}