import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [HttpClientModule, KeyValuePipe],
  providers: [DataService, HttpClient,],
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.css'
})
export class SampleComponent implements OnInit {
  showData: any
  devices: any
  selectedComponentName: any
  selectedComponentSamples: any
  selectedComponentEvents: any = {}
  selectedComponentCondition: any
  selectedDeviceName: any
  selectedComponentEventsIterate: any
  selectedComponentConditionIterate: any
  selectedComponentSamplesIterate: any
  constructor(private dataService: DataService) {

  }
  ngOnInit(): void {
    this.getCurrent()

  }

  getCurrent() {
    this.dataService.getSampleData().subscribe((res: any) => {
      this.showData = res.MTConnectStreams
      this.devices = this.showData.Streams
      console.log(this.devices)

    }, (error) => {
      console.log(error)
    })
  }
  openDeviceComponent(item: any, x: any) {
    console.log('x', x)
    this.selectedComponentEventsIterate = [];
    this.selectedComponentConditionIterate = [];
    this.selectedComponentConditionIterate = [];
    this.selectedDeviceName = item.$.name
    this.selectedComponentName = x.$.name
    this.selectedComponentSamples = x?.Samples ? x?.Samples : undefined
    this.selectedComponentEvents = x?.Events ? x?.Events : undefined
    this.selectedComponentCondition = x?.Condition ? x?.Condition : undefined
        // for event
        if (this.selectedComponentEvents) {
          let evilResponseProps = Object.keys(this.selectedComponentEvents);
          this.selectedComponentEventsIterate = [];
          for (let prop of evilResponseProps) {
            this.selectedComponentEventsIterate.push(this.selectedComponentEvents[prop]);
          }
        }

    // for sample
     if(this.selectedComponentSamples) {
      let evilResponseProps1 = Object.keys(this.selectedComponentSamples);
      this.selectedComponentSamplesIterate = [];
      for (let prop of evilResponseProps1) {
        this.selectedComponentSamplesIterate.push(this.selectedComponentSamples[prop]);
      }
     }

    // for condition
    if (this.selectedComponentCondition) {
      let evilResponseProps2 = Object.keys(this.selectedComponentCondition);
      this.selectedComponentConditionIterate = [];
      for (let prop of evilResponseProps2) {
        this.selectedComponentConditionIterate.push(this.selectedComponentCondition[prop]);
      }
    }

    console.log('goodResponse', this.selectedComponentEventsIterate)
    console.log('goodResponse1', this.selectedComponentSamplesIterate)
    console.log('goodResponse2', this.selectedComponentConditionIterate)

  }


}
