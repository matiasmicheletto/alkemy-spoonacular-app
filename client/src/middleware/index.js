import axios from 'axios';
import recipes_response from './recipes_response.json';
import dishImage from '../img/dish.png';

const MAX_RECIPES = 4; // Max dishes per menu
const ITEM_TEMPLATE = (_, index) => ({
    id: index,
    defined: false,
    image: dishImage,
    title: 'Empty dish',
    price: '-',
    healthScore: '-'
});

export default class Middleware {

    constructor() {
        this.debug = true; // or use process.env.NODE_ENV === "development"
        this.api_url = `${process.env.REACT_APP_API_URL}complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`;
        this.veganDishesCnt = null; // Vegan dishes counter (should be 2)
        this.totalPrice = null;
        this.averageHealthScore = null;
        this.currentMenu = JSON.parse(localStorage.getItem('currentMenu')) || Array(MAX_RECIPES).fill(null).map(ITEM_TEMPLATE); 
        this.updateStats();
    }

    updateStats() {
        this.veganDishesCnt = this.currentMenu.filter(item => item.vegan).length;
        this.totalPrice = this.currentMenu.reduce((acc, item) => acc + parseFloat(item.price), 0);
        this.averageHealthScore = this.currentMenu.reduce((acc, item) => acc + parseFloat(item.healthScore), 0) / this.currentMenu.length;
    }

    searchRecipes() {
        return new Promise((fulfill, reject)=>{
            if(this.debug){ // Simulated api response
                setTimeout(()=>{
                    fulfill(recipes_response);
                }, 1000);
            }else{ // Api call (uses cost points)
                axios.get(this.url,
                { params:{} })
                .then(res => {
                    console.log(res);
                    fulfill(res.data);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
            }
        });
    }

    getMenu() {
        return this.currentMenu;
    }

    setMenuRecipe(recipe, index) {
        if(index >= 0 && index < MAX_RECIPES){
            // TODO: check recipe type
            this.currentMenu.splice(index, 0, recipe);
            this.updateStats();
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
            return {status: "success"};
        }else
            return {status: "error", message: "Invalid index!"};
        
    }

    removeRecipeFromMenu(recipeId) {
        const index = this.currentMenu.findIndex(recipe => recipe.id === recipeId);
        if(index > -1){
            this.currentMenu.splice(index, 1);
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
            return {status: "success"};
        }else
            return {status: "error", message: "Recipe not found!"};
    }

};

