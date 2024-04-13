import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, map, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu.model';
import { Restaurant } from '../models/restaurant.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

export interface GeneralInfoType {
  name: String;
  address: any;
  bannerImage: String;
  logo: String;
  businessHour: BusinessHour;
  cuisine: String;
  rating: String;
  about: String;
  websiteURL: String;
  phoneNumber: String;
  email: String;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
}

export interface BusinessHour {
  mondayStartingTime: string;
  mondayEndingTime: string;
  tuesdayStartingTime: string;
  tuesdayEndingTime: string;
  wednesdayStartingTime: string;
  wednesdayEndingTime: string;
  thursdayStartingTime: string;
  thursdayEndingTime: string;
  fridayStartingTime: string;
  fridayEndingTime: string;
  saturdayStartingTime: string;
  saturdayEndingTime: string;
  sundayStartingTime: string;
  sundayEndingTime: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  public generalInfoSubject: Subject<{}> = new Subject();
  public reservationInfoSubject: Subject<{}> = new Subject();
  public menuSubject: Subject<{}> = new Subject();
  private URL: string = `${environment.API_ENDPOINT}`;
  private currentUser?: User | null;
  private categories: any = [];
  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
  }

  private menu: any = {};

  getGeneralInfoData() {
    return this.http
      .get<{ restaurant: Restaurant }>(
        `${this.URL}/restaurant/${this.currentUser?.userId}`
      )
      .pipe(map((data) => data.restaurant));
  }

  getReservations(restaurantId: string) {
    return this.http
      .get(`${this.URL}/reservation/restaurant/${restaurantId}`)
      .pipe(catchError(this.handleReservationsError));
  }

  handleReservationsError(errResponse: HttpErrorResponse) {
    let errorMessage: string = errResponse.error.message
      ? errResponse.error.message
      : errResponse.error.error
      ? errResponse.error.error
      : 'Error loading reservation!';

    return throwError(() => new Error(errorMessage));
  }

  getMenuDataByCategory(restaurantId: string) {
    console.log('Fetching menus');
    return this.http
      .get<{ restaurantMenu: any }>(
        `${this.URL}/menu/restaurant/${restaurantId}`
      )
      .pipe(
        map((responseData: Menu) => {
          this.menu = responseData.restaurantMenu[0];
          this.extractCategoriesAndUpdate(this.menu.menuItems);
          return responseData.restaurantMenu[0];
        })
      );
  }

  extractCategoriesAndUpdate(menuItems: any) {
    this.categories = [];
    menuItems.forEach((item: any) => {
      this.categories.push(item.categoryName);
    });
  }

  getCategories() {
    return this.categories;
  }

  updateGeneralInfoData(data: any) {
    const mappedBusinessHours = [
      {
        openHours: {
          startTime: data.businessHours.mondayStartingTime,
          endTime: data.businessHours.mondayEndingTime,
        },
        day: 'Monday',
      },
      {
        openHours: {
          startTime: data.businessHours.thursdayStartingTime,
          endTime: data.businessHours.tuesdayEndingTime,
        },
        day: 'Tuesday',
      },
      {
        openHours: {
          startTime: data.businessHours.wednesdayStartingTime,
          endTime: data.businessHours.wednesdayEndingTime,
        },
        day: 'Wednesday',
      },
      {
        openHours: {
          startTime: data.businessHours.thursdayStartingTime,
          endTime: data.businessHours.thursdayEndingTime,
        },
        day: 'Thursday',
      },
      {
        openHours: {
          startTime: data.businessHours.fridayStartingTime,
          endTime: data.businessHours.fridayEndingTime,
        },
        day: 'Friday',
      },
      {
        openHours: {
          startTime: data.businessHours.saturdayStartingTime,
          endTime: data.businessHours.saturdayEndingTime,
        },
        day: 'Saturday',
      },
      {
        openHours: {
          startTime: data.businessHours.sundayStartingTime,
          endTime: data.businessHours.sundayEndingTime,
        },
        day: 'Sunday',
      },
    ];
    data.businessHours = mappedBusinessHours;

    console.log('sending req: ', data);
    return this.http
      .put<{ restaurant: Restaurant }>(
        `${this.URL}/restaurant/${this.currentUser?.userId}`,
        data
      )
      .pipe(map((data) => data.restaurant));
  }

  addNewCategory(data: any) {
    this.menu.menuItems.push({
      categoryName: data.name,
      categoryItems: [],
    });

    console.log(this.menu);

    return this.http.put(`${this.URL}/menu/${this.menu._id}`, this.menu).pipe(
      map((data: any) => {
        this.extractCategoriesAndUpdate(data.updatedMenu.menuItems);
      })
    );
  }

  updateCategory(data: any, categoryId: any) {
    console.log('updateCategory', data);
    const category = this.menu.menuItems.filter(
      (category: any) => category._id === categoryId
    );
    category[0].categoryName = data.name;
    return this.http.put(`${this.URL}/menu/${this.menu._id}`, this.menu).pipe(
      map((data: any) => {
        this.extractCategoriesAndUpdate(data.updatedMenu.menuItems);
      })
    );
  }

  deleteCategory(careerId: any) {
    console.log(careerId);
    const filteredCareers = this.menu.menuItems.filter(
      (category: any) => category._id !== careerId
    );
    this.menu.menuItems = filteredCareers;
    return this.http.put(`${this.URL}/menu/${this.menu._id}`, this.menu).pipe(
      map((data: any) => {
        this.extractCategoriesAndUpdate(data.updatedMenu.menuItems);
      })
    );
  }

  addNewMenuItem(data: any) {
    console.log('addNewMenuItem', data);
    this.menu.menuItems.forEach((item: any) => {
      if (item.categoryName === data.category) {
        item.categoryItems.push({
          name: data.name,
          image: data.image,
          description: data.description,
          price: data.price,
        });
      }
    });

    return this.http.put(`${this.URL}/menu/${this.menu._id}`, this.menu).pipe(
      map((data: any) => {
        this.extractCategoriesAndUpdate(data.updatedMenu.menuItems);
      })
    );
  }

  updateMenuItem(data: any, itemId: any, categoryId: any) {
    console.log('updateCategory', data);
    const category = this.menu.menuItems.filter(
      (category: any) => category._id === categoryId
    );
    const items = category[0].categoryItems;
    for (const item of items) {
      if (itemId === item._id) {
        item.name = data.name;
        item.image = data.image;
        item.description = data.description;
        item.price = data.price;
        break;
      }
    }
    return this.http.put(`${this.URL}/menu/${this.menu._id}`, this.menu).pipe(
      map((data: any) => {
        this.extractCategoriesAndUpdate(data.updatedMenu.menuItems);
      })
    );
  }

  deleteMenuItem(itemId: any, categoryId: any) {
    const category = this.menu.menuItems.filter(
      (category: any) => category._id === categoryId
    );
    const updatedItems = category[0].categoryItems.filter(
      (item: any) => item._id !== itemId
    );
    category[0].categoryItems = updatedItems;
    return this.http.put(`${this.URL}/menu/${this.menu._id}`, this.menu).pipe(
      map((data: any) => {
        this.extractCategoriesAndUpdate(data.updatedMenu.menuItems);
      })
    );
  }
}
