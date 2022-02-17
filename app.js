//Storage Controller
const StorageCtrl = (function (){
    //public methods
    return {
        storeItem: function(item){
            let items;
            //check if any item in LS
            if(localStorage.getItem('items') === null){
                items = [];
                //push new item
                items.push(item);
                //set LS
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                //get what is already in ls
                items = JSON.parse(localStorage.getItem('items'));
                //push new item
                items.push(item);
                //reset LS
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function (){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        }
    }
}) ();

//Item Controller
const ItemCtrl = (function(){
    //Item Construction
    const Item = function(id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

//Data Structure
    const data = {
        items: [
            /*{id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cake', calories: 900},
            {id: 2, name: 'Eggs', calories: 300}*/
        ],
        total: 0,
        currentItem: null
    }

    return {
        getItems: function(){
            return data.items
        },
        addItem: function (name, calories){
            /*console.log(name)
            console.log(calories)*/
            let ID;
            //create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
                //console.log(ID)
            } else {
                ID = 0
            }
            //calories to number
            calories = parseInt(calories);
            //create new item
            newItem = new Item(ID, name, calories);
            //add to items array
            data.items.push(newItem);
            /* //control data
             console.log(data.items)
             console.log(newItem)*/
            //return new item
            return newItem
        },

        // search item by id
        searchItem: function (id){
            let result = null;
            console.log('Id in searchItem: ', id)
            data.items.forEach(function(item){
                console.log('Item: ', item)
                if(item.id === id){
                    result = item;
                }
            });
            console.log('Result: ', result);
            return result;

        },
        updateItem: function(name, calories){
            // Calories to number
            calories = parseInt(calories);

            let result = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    result = item;
                }
            });
            return result;
        },
        deleteItem: function(id){
            // Get ids
            const ids = data.items.map(function(item){
                return item.id;
            });

            // Get index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        //total calories
        getTotalCalories: function(){
            let total = 0;
            //loop through items and add calories
            data.items.forEach(function(item){
                total = total + item.calories;
                //console.log(total)
            });
            //set total calories in data structure
            data.total = total;
            console.log(data.total)
            //return total
            return data.total;
        },
        logData: function(){
            return data
        }
    }
})();

//UI Controller
const UICtrl = (function(){
    //UI selectors
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        addBtn: '.add-btn',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        editItemBtn: '#item-list',
        deleteBtn: '.delete-btn'
    }
    return{
        populateItemList: function(items){
            //create html content
            let html = '';

            //parse data and create list items html
            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
            <i class="edit-item fas fa-pencil-alt"></i>
        </a>
        </li>`
            });

            //insert list items
            //document.querySelector("#item-list").innerHTML = html;
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function (){
            return UISelectors;
        },
        getItemInput: function (){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item){
            //create li element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            //add ID
            li.id = `item-${item.id}`;
            //add HTML
            li.innerHTML = `<strong>${item.name}: </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fas fa-pencil-alt"></i>
            </a>`;
            //console.log(li)
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn Node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
                }
            });
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function (){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories: function (totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        mealEditModeOff: function (){
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            console.log('Meal edit mode OFF');
        },
        mealEditModeOn: function (){
            document.querySelector(UISelectors.addBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            console.log('Meal edit mode ON');
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            // display edit mode buttons
            UICtrl.mealEditModeOn()
        },
        submitEditMeal: function (){
            return this.submitEditMeal;
        }
    }
})();

//App Controller
const App = (function(ItemCtrl, StorageCtrl,UICtrl){
    //Load event listeners
    const loadEventListeners = function (){
        //get UI selectors
        const UISelectors = UICtrl.getSelectors();
        //console.log(UISelectors)
        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
        //ad document reload event
        document.addEventListener('DOMContentLoaded', getItemsFromStorage);
        // edit meal event
        // console.log('Edit item Button', UISelectors.editItemBtn);
        //console.log('Edit item Button', document.querySelector(UISelectors.editItemBtn));
        document.querySelector(UISelectors.editItemBtn).addEventListener('click', editMeal);

        // update meal event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', submitEditMeal);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    }

    // edit meal function
    const editMeal = function (event){
        // get click target
        console.log('Edit click target: ', event.target.classList.contains('edit-item'))
        if(event.target.classList.contains('edit-item')) {
            // get clicked item id
            console.log('Find clicked ID: ', event.target.parentElement.parentElement.id)
            const clickedId = event.target.parentElement.parentElement.id;

            // into array to get id
            const clickedIdArray = clickedId.split('-');
            const id = parseInt(clickedIdArray[1]);
            console.log('Clicked id: ', id)
            // send id to search to get item params for form population
            const itemForEdit = ItemCtrl.searchItem(id);

            // save search result to currentItem
            ItemCtrl.setCurrentItem(itemForEdit);
            //ItemCtrl.data.currentItem = itemForEdit;
            console.log('Item for edit: ', itemForEdit);
            //console.log('ItemCtrl.currentItem: ', ItemCtrl.data.currentItem);

            // Add item to form
            UICtrl.addItemToForm();


        }

    }

    // submit edit meal (update meal button) function
    const submitEditMeal = function (event){
        console.log('Fired submitEditMeal')
            //get form input UI Controller
            const input = UICtrl.getItemInput()
            console.log('GetItemInput: ', input)
            //check for name and calorie input
            if(input.name !== '' && input.calories !== ''){
                console.log('Currentitem', ItemCtrl.getCurrentItem().id)

                const updatedItem = ItemCtrl.updateItem(input.name, input.calories)
                //add item to UI items list
                UICtrl.updateListItem(updatedItem)
                //console.log(newItem)
                // console.log('add item to data structure')
                //get total calories
                const totalCalories = ItemCtrl.getTotalCalories();
                //add total calories to UI
                UICtrl.showTotalCalories(totalCalories);
                //store in localStorage
                StorageCtrl.updateItemStorage(updatedItem);
                //clear fields
                UICtrl.clearInput()
                UICtrl.mealEditModeOff()
            }
            event.preventDefault()

    }

    // Delete button event
    const itemDeleteSubmit = function(e){
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(clientInformation);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        // Delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.mealEditModeOff();

        e.preventDefault();
    }

    //item add submit function
    const itemAddSubmit = function(event){
        //get form input UI Controller
        const input = UICtrl.getItemInput()
        // console.log(input)
        //check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            //add item to UI items list
            UICtrl.addListItem(newItem)
            //console.log(newItem)
            // console.log('add item to data structure')
            //get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //store in localStorage
            StorageCtrl.storeItem(newItem);
            //clear fields
            UICtrl.clearInput()
        }
        event.preventDefault()
    }
    //get items from Storage
    const getItemsFromStorage = function (){
        const items = StorageCtrl.getItemsFromStorage()
        //set storage items to ItemCtrl data items
        items.forEach(function (item){
            ItemCtrl.addItem(item['name'], item['calories'])
        })
        ///get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        //add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        //populate items list
        UICtrl.populateItemList(items)
    }
    return {
        init: function (){
            console.log('Initializing App')
            //fetch items from data structure
            const items = ItemCtrl.getItems()
            //populate items list
            UICtrl.populateItemList(items)
            //load event listeners
            loadEventListeners();
            // hide Modify ja Delete Meal button, i.e Edit Mode OFF
            UICtrl.mealEditModeOff();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

//Initialize App
App.init()