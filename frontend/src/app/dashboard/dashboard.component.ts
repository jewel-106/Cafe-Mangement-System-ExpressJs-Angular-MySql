

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  responseMessage: any;
  data: any;
  foodItems: any[] = []; // Array to store food items

  constructor(
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.dashboardData();
    this.loadFoodItems(); // Load food items
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.data = response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  // Method to load food items (can be replaced with API call)
  loadFoodItems() {
    this.foodItems = [
      {
        name: 'Pizza Margherita',
        description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
        price: 12.99,
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        name: 'Burger',
        description: 'Juicy beef burger with cheese, lettuce, and special sauce.',
        price: 8.99,
        image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        name: 'Sushi Platter',
        description: 'Assorted sushi rolls with soy sauce and wasabi.',
        price: 18.99,
        image: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        name: 'Pasta Carbonara',
        description: 'Creamy pasta with bacon, eggs, and parmesan cheese.',
        price: 14.99,
        image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with croutons, parmesan, and Caesar dressing.',
        price: 9.99,
        image: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
		name: 'Pizza Margherita',
		description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
		price: 12.99,
		image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', // Pizza image
	  },
	  {
		name: 'Burger',
		description: 'Juicy beef burger with cheese, lettuce, and special sauce.',
		price: 8.99,
		image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600', // Burger image
	  },
	  {
		name: 'Sushi Platter',
		description: 'Assorted sushi rolls with soy sauce and wasabi.',
		price: 18.99,
		image: 'https://images.pexels.com/photos/8951563/pexels-photo-8951563.jpeg?auto=compress&cs=tinysrgb&w=600', // Sushi image
	  },
	  {
		name: 'Pasta Carbonara',
		description: 'Creamy pasta with bacon, eggs, and parmesan cheese.',
		price: 14.99,
		image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', // Pasta image
	  },
	  {
		name: 'Caesar Salad',
		description: 'Fresh romaine lettuce with croutons, parmesan, and Caesar dressing.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600', // Salad image
	  },
	  {
		name: 'Chicken Curry',
		description: 'Spicy chicken curry with rice and naan bread.',
		price: 11.99,
		image: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=600', // Chicken curry image
	  },
	  {
		name: 'Grilled Salmon',
		description: 'Freshly grilled salmon with a side of vegetables.',
		price: 16.99,
		image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=600', // Salmon image
	  },
	  {
		name: 'Vegetable Stir Fry',
		description: 'Healthy stir-fried vegetables with tofu and sesame seeds.',
		price: 10.99,
		image: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=600', // Stir fry image
	  },
	  {
		name: 'Cheesecake',
		description: 'Creamy cheesecake with a strawberry topping.',
		price: 7.99,
		image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=600', // Cheesecake image
	  },
	  {
		name: 'Ice Cream Sundae',
		description: 'Vanilla ice cream with chocolate syrup, nuts, and a cherry on top.',
		price: 6.99,
		image: 'https://images.pexels.com/photos/1625235/pexels-photo-1625235.jpeg?auto=compress&cs=tinysrgb&w=600', // Ice cream image
	  },
	  {
		name: 'Tacos',
		description: 'Crispy tacos filled with seasoned beef, lettuce, and cheese.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=600', // Tacos image
	  },
	  {
		name: 'Ramen',
		description: 'Japanese ramen with rich broth, noodles, and toppings.',
		price: 13.99,
		image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=600', // Ramen image
	  },
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with croutons, parmesan, and Caesar dressing.',
        price: 9.99,
        image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&w=600',
      },
      {
        name: 'Chicken Curry',
        description: 'Spicy chicken curry with rice and naan bread.',
        price: 11.99,
        image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600',
      }, {
		name: 'Pizza Margherita',
		description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
		price: 12.99,
		image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', // Pizza image
	  },
	  {
		name: 'Burger',
		description: 'Juicy beef burger with cheese, lettuce, and special sauce.',
		price: 8.99,
		image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600', // Burger image
	  },
	  {
		name: 'Sushi Platter',
		description: 'Assorted sushi rolls with soy sauce and wasabi.',
		price: 18.99,
		image: 'https://images.pexels.com/photos/8951563/pexels-photo-8951563.jpeg?auto=compress&cs=tinysrgb&w=600', // Sushi image
	  },
	  {
		name: 'Pasta Carbonara',
		description: 'Creamy pasta with bacon, eggs, and parmesan cheese.',
		price: 14.99,
		image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', // Pasta image
	  },
	  {
		name: 'Caesar Salad',
		description: 'Fresh romaine lettuce with croutons, parmesan, and Caesar dressing.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600', // Salad image
	  },
	  {
		name: 'Chicken Curry',
		description: 'Spicy chicken curry with rice and naan bread.',
		price: 11.99,
		image: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=600', // Chicken curry image
	  },
	  {
		name: 'Grilled Salmon',
		description: 'Freshly grilled salmon with a side of vegetables.',
		price: 16.99,
		image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=600', // Salmon image
	  },
	  {
		name: 'Vegetable Stir Fry',
		description: 'Healthy stir-fried vegetables with tofu and sesame seeds.',
		price: 10.99,
		image: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=600', // Stir fry image
	  },
	  {
		name: 'Cheesecake',
		description: 'Creamy cheesecake with a strawberry topping.',
		price: 7.99,
		image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=600', // Cheesecake image
	  },
	  {
		name: 'Ice Cream Sundae',
		description: 'Vanilla ice cream with chocolate syrup, nuts, and a cherry on top.',
		price: 6.99,
		image: 'https://images.pexels.com/photos/1625235/pexels-photo-1625235.jpeg?auto=compress&cs=tinysrgb&w=600', // Ice cream image
	  },
	  {
		name: 'Tacos',
		description: 'Crispy tacos filled with seasoned beef, lettuce, and cheese.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=600', // Tacos image
	  },
	  {
		name: 'Ramen',
		description: 'Japanese ramen with rich broth, noodles, and toppings.',
		price: 13.99,
		image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=600', // Ramen image
	  },
	  {
		name: 'Pizza Margherita',
		description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
		price: 12.99,
		image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', // Pizza image
	  },
	  {
		name: 'Burger',
		description: 'Juicy beef burger with cheese, lettuce, and special sauce.',
		price: 8.99,
		image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600', // Burger image
	  },
	  {
		name: 'Sushi Platter',
		description: 'Assorted sushi rolls with soy sauce and wasabi.',
		price: 18.99,
		image: 'https://images.pexels.com/photos/8951563/pexels-photo-8951563.jpeg?auto=compress&cs=tinysrgb&w=600', // Sushi image
	  },
	  {
		name: 'Pasta Carbonara',
		description: 'Creamy pasta with bacon, eggs, and parmesan cheese.',
		price: 14.99,
		image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', // Pasta image
	  },
	  {
		name: 'Caesar Salad',
		description: 'Fresh romaine lettuce with croutons, parmesan, and Caesar dressing.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600', // Salad image
	  },
	  {
		name: 'Chicken Curry',
		description: 'Spicy chicken curry with rice and naan bread.',
		price: 11.99,
		image: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=600', // Chicken curry image
	  },
	  {
		name: 'Grilled Salmon',
		description: 'Freshly grilled salmon with a side of vegetables.',
		price: 16.99,
		image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=600', // Salmon image
	  },
	  {
		name: 'Vegetable Stir Fry',
		description: 'Healthy stir-fried vegetables with tofu and sesame seeds.',
		price: 10.99,
		image: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=600', // Stir fry image
	  },
	  {
		name: 'Cheesecake',
		description: 'Creamy cheesecake with a strawberry topping.',
		price: 7.99,
		image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=600', // Cheesecake image
	  },
	  {
		name: 'Ice Cream Sundae',
		description: 'Vanilla ice cream with chocolate syrup, nuts, and a cherry on top.',
		price: 6.99,
		image: 'https://images.pexels.com/photos/1625235/pexels-photo-1625235.jpeg?auto=compress&cs=tinysrgb&w=600', // Ice cream image
	  },
	  {
		name: 'Tacos',
		description: 'Crispy tacos filled with seasoned beef, lettuce, and cheese.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=600', // Tacos image
	  },
	  {
		name: 'Ramen',
		description: 'Japanese ramen with rich broth, noodles, and toppings.',
		price: 13.99,
		image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=600', // Ramen image
	  },
	  {
		name: 'Pizza Margherita',
		description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
		price: 12.99,
		image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600', // Pizza image
	  },
	  {
		name: 'Burger',
		description: 'Juicy beef burger with cheese, lettuce, and special sauce.',
		price: 8.99,
		image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=600', // Burger image
	  },
	  {
		name: 'Sushi Platter',
		description: 'Assorted sushi rolls with soy sauce and wasabi.',
		price: 18.99,
		image: 'https://images.pexels.com/photos/8951563/pexels-photo-8951563.jpeg?auto=compress&cs=tinysrgb&w=600', // Sushi image
	  },
	  {
		name: 'Pasta Carbonara',
		description: 'Creamy pasta with bacon, eggs, and parmesan cheese.',
		price: 14.99,
		image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600', // Pasta image
	  },
	  {
		name: 'Caesar Salad',
		description: 'Fresh romaine lettuce with croutons, parmesan, and Caesar dressing.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=600', // Salad image
	  },
	  {
		name: 'Chicken Curry',
		description: 'Spicy chicken curry with rice and naan bread.',
		price: 11.99,
		image: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=600', // Chicken curry image
	  },
	  {
		name: 'Grilled Salmon',
		description: 'Freshly grilled salmon with a side of vegetables.',
		price: 16.99,
		image: 'https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&w=600', // Salmon image
	  },
	  {
		name: 'Vegetable Stir Fry',
		description: 'Healthy stir-fried vegetables with tofu and sesame seeds.',
		price: 10.99,
		image: 'https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=600', // Stir fry image
	  },
	  {
		name: 'Cheesecake',
		description: 'Creamy cheesecake with a strawberry topping.',
		price: 7.99,
		image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=600', // Cheesecake image
	  },
	  {
		name: 'Ice Cream Sundae',
		description: 'Vanilla ice cream with chocolate syrup, nuts, and a cherry on top.',
		price: 6.99,
		image: 'https://images.pexels.com/photos/1625235/pexels-photo-1625235.jpeg?auto=compress&cs=tinysrgb&w=600', // Ice cream image
	  },
	  {
		name: 'Tacos',
		description: 'Crispy tacos filled with seasoned beef, lettuce, and cheese.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=600', // Tacos image
	  },
	  {
		name: 'Ramen',
		description: 'Japanese ramen with rich broth, noodles, and toppings.',
		price: 13.99,
		image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=600', // Ramen image
	  }, {
		name: 'Mix Fruits',
		description: 'Crispy tacos filled with seasoned beef, lettuce, and cheese.',
		price: 9.99,
		image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600', // Tacos image
	  },
	  {
		name: 'Tometo',
		description: 'Japanese ramen with rich broth, noodles, and toppings.',
		price: 13.99,
		image: 'https://images.pexels.com/photos/1391487/pexels-photo-1391487.jpeg?auto=compress&cs=tinysrgb&w=600', // Ramen image
	  }
    ];
  }
}



// import { SnackbarService } from './../services/snackbar.service';
// import { Component, AfterViewInit } from '@angular/core';
// import { DashboardService } from '../services/dashboard.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { GlobalConstants } from '../shared/global-constants';

// @Component({
// 	selector: 'app-dashboard',
// 	templateUrl: './dashboard.component.html',
// 	styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements AfterViewInit {

// 	responseMessage: any;
// 	data:any;
// 	ngAfterViewInit() { }

// 	constructor(private dashboardService:DashboardService,private ngxService:NgxUiLoaderService,private snackbarServic:SnackbarService) {
// 		this.ngxService.start();
// 		this.dashboardData();
// 	}

// 	dashboardData(){
// 		this.dashboardService.getDetails().subscribe((response:any)=>{
// 			this.ngxService.stop();
// 			this.data = response;
// 		},(error:any)=>{
// 			this.ngxService.stop();
// 			console.log(error);
// 			if(error.error?.message){
// 				this.responseMessage = error.error?.message;
// 			}
// 			else {
// 				this.responseMessage = GlobalConstants.genericError;
// 			}
// 			this.snackbarServic.openSnackBar(this.responseMessage,GlobalConstants.error);
// 		})
// 	}
// }
