import { Component, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  name = 'Angular';
  values: SelectItem[];
  selValue = '';

  @ViewChild('dropdown') dropdown: Dropdown;

  constructor(private messageService: MessageService, private changeDetection: ChangeDetectorRef) {
    this.values = [
      { label: 'Val1', value: 1 },
      { label: 'Val2', value: 2 },
      { label: 'Val3', value: 3 }
    ];

    this.changeDetection.detach();
  }

  ngOnInit() {
    this.changeDetection.detectChanges();
    this.doAddChangeDetection(this.dropdown.onClick, 'onClick');
    this.doAddChangeDetection(this.dropdown.onHide, 'onHide');
    this.doAddChangeDetection(this.dropdown.onBlur, 'onBlur');
    this.doAddChangeDetection(this.dropdown.onChange, 'onChange');
    this.doAddChangeDetection(this.dropdown.onFocus, 'onFocus');
  }

  runCD() {
    this.changeDetection.detectChanges();
    setTimeout(() => {
      this.changeDetection.detectChanges();
    });
  }

  doAddChangeDetection(action: EventEmitter<Object>, log: string) {
    action.subscribe(() => {
      console.log('Event: ' + log);
      this.changeDetection.detectChanges();

      setTimeout(() => {
        this.changeDetection.detectChanges();
      });
    });
  }


}
