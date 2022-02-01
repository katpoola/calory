// Storage controller

// Item controller
const ItemCtrl = (function(){

	// Item constructor
	const Item = function(id, name, calories){
		this.id = id
		this.name = name
		this.calories = calories
	}

	// Data structure
	const data = {
		items: [
			{id: 0, name: 'Steak Dinner', calories: 1200},
			{id: 1, name: 'Cookie', calories: 400},
			{id: 2, name: 'Eggs', calories: 300}
		],
		total: 0
	}

	return {
		getItems: function(){
			return data.items
		},
		addItem: function(name, calories){
			let ID;
			// Create ID
			if (data.items.length > 0){
				ID = data.items[data.items.length - 1].id + 1
			} else {
				ID = 0
			}
			// Calories to number
			calories = parseInt(calories);
			// Create new item
			newItem = new Item(ID, name, calories);
			// Add to items array
			data.items.push(newItem);
			// Return new item
			return newItem
		},
		getTotalCalories: function(){
			let total = 0;
			// Loop through items and add calories
			data.items.forEach(function(item){
				total = total + item.calories;
			});
			// Set total calories in data structure
			data.total = total;
			// Return total
			return data.total;
		},
		logData: function(){
			return data
		}
	}
})();

// UI controller
const UICtrl = (function(){
	// UI selectors
	const UISelectors = {
		itemList: '#item-list',
		itemNameInput: '#item-name',
		itemCaloriesInput: '#item-calories',
		addBtn: '.add-btn',
		totalCalories: '.total-calories'
	}
	return {
		populateItemList: function(items){
			// Create html content
			let html = '';

			// Parse data and create list items html
			items.forEach(function(item){
				html += `<li class="collection-item" id="item-${item.id}">
				<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>
				</li>`;
			});

			// Insert list items
			document.querySelector(UISelectors.itemList).innerHTML = html;
		},
		getSelectors: function(){
			return UISelectors;
		},
		getItemInput: function(){
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},
		addListItem: function(item){
			// Create li element
			const li = document.createElement('li');
			// Add class
			li.className = 'collection-item';
			// Add ID
			li.id = `item-${item.id}`;
			// Add HTML
			li.innerHTML = `<strong>${item.name}: </strong>
				<em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>`;
			// Insert item
			document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
		},
		clearInput: function(){
			document.querySelector(UISelectors.itemNameInput).value = '';
			document.querySelector(UISelectors.itemCaloriesInput).value = '';
		},
		showTotalCalories: function(totalCalories){
			document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
		}
	}
})();

// App controller
const App = (function(ItemCtrl, UICtrl){
	// Load event listeners
	const loadEventListeners = function(){
		// Get UI selectors
		const UISelectors = UICtrl.getSelectors();
		// Add item event
		document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
	}
	// Item add submit function
	const itemAddSubmit = function(event){
		// Get form input from UI controller
		const input = UICtrl.getItemInput();
		// Check for name and calorie input
		if (input.name !== '' && input.calories !== ''){
			const newItem = ItemCtrl.addItem(input.name, input.calories)
			UICtrl.addListItem(newItem)
			// Get total calories
			const totalCalories = ItemCtrl.getTotalCalories();
			// Add total calories to UI
			UICtrl.showTotalCalories(totalCalories);
			// Clear fields
			UICtrl.clearInput();
		}
		event.preventDefault();
	}
	return {
		init: function(){
			console.log('Initializing App')
			// Fetch items from data structure
			const items = ItemCtrl.getItems()
			// Popilate items list
			UICtrl.populateItemList(items)
			// Load event listeners
			loadEventListeners();
		}
	}
})(ItemCtrl, UICtrl);

App.init();
