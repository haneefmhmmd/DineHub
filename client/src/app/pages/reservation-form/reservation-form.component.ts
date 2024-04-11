import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Route } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  form: FormGroup;
  isLoaded: boolean = false;
  restaurant: any;
  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantsService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      date: [new Date(), [Validators.required, this.dateValidator]],
      arrivalTime: ['', [Validators.required]],
      guests: ['', [Validators.required]],
      tableNumber: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const restaurantId = this.route.snapshot.params['id'];
    this.restaurantService.fetchRestaurant(restaurantId).subscribe((data) => {
      console.log(data);
      this.restaurant = data;
      this.isLoaded = true;
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    const seletedDaate: Date = <Date>control.value;
    seletedDaate.setHours(0, 0, 0, 0);
    if (seletedDaate < today) {
      return {
        invalidDate: { value: 'Please enter a date that is not passed.' },
      };
    }
    return null;
  }

  getDateErrorMessage() {
    const dateControl: AbstractControl = this.form.controls['date'];
    if (dateControl.hasError('invalidDate')) {
      return 'Please enter a date that is not passed.';
    }

    return 'Please select a valid date.';
  }

  submitReservation() {
    if (this.form.valid) {
      const formData = this.form.value;
      const reservationData = {
        restaurant: this.restaurant._id,
        customer: '6615f4a6f0a22cbe9e3c9be9',
        slotInterval: '18:00 - 20:00',
        reservedDate: '2024-05-15',
        tableNumber: 5,
      };
    }
  }
}
