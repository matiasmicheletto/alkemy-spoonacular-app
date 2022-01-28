import axios from 'axios';
import recipes_response from './recipes_response.json';

const MAX_RECIPES = 4; // Max dishes per menu
const MAX_VEGAN_RECIPES = 2; // Max vegan dishes per menu
const MAX_NON_VEGAN_RECIPES = 2; // Max non-vegan dishes per menu

export default class Middleware {

    constructor() {
        this.debug = true; // or use process.env.NODE_ENV === "development"
        this.api_url = `${process.env.REACT_APP_API_URL}complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`;
        this.selected = null; // Menu slot selected for view, set, clear or replace
        this.nonEmptyDishes = 0; // Used menu slots counter
        this.veganDishesCnt = null; // Vegan dishes counter (should be max 2)
        this.nonVeganDishesCnt = null; // Non-vegan dishes counter (should be max 2)
        this.totalPrice = null;
        this.averageHealthScore = null;
        this.currentMenu = JSON.parse(localStorage.getItem('currentMenu')) || Array(4).fill(null); 
        this.lastSearch = JSON.parse(localStorage.getItem('lastSearch')) || [];
        this.updateStats();
    }

    updateStats() {
        this.nonEmptyDishes = this.currentMenu.filter(item => item?.title).length;
        if(this.nonEmptyDishes > 0){
            this.veganDishesCnt = this.currentMenu.filter(item => item?.vegan).length;
            this.nonVeganDishesCnt = this.nonEmptyDishes - this.veganDishesCnt;
            this.totalPrice = this.currentMenu.reduce((acc, item) => acc + (parseFloat(item?.pricePerServing) || 0), 0);
            this.averageHealthScore = this.currentMenu.reduce((acc, item) => acc + (parseFloat(item?.healthScore) || 0), 0) / this.nonEmptyDishes;
        }        
    }

    searchRecipes(query, vegan) {
        return new Promise((fulfill, reject)=>{
            if(this.debug){ // Simulated api response
                setTimeout(()=>{
                    this.lastSearch = recipes_response;
                    localStorage.setItem('lastSearch', JSON.stringify(recipes_response));
                    fulfill(recipes_response);
                }, 1000);
            }else{ // Api call (uses cost points)
                axios.get(this.url,
                { params:{} })
                .then(res => {
                    console.log(res);
                    this.lastSearch = res.data;
                    localStorage.setItem('lastSearch', JSON.stringify(res.data));
                    fulfill(res.data);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
            }
        });
    }

    getSelected() {
        return this.selected;
    }

    getMenu() {
        return this.currentMenu;
    }

    getLastSearch() {
        return this.lastSearch;
    }

    getRecipe(id) {
        if(id){
            const idMatch = item => item?.id.toString() === id.toString();

            // First, search if recipe is in menu
            let index = this.currentMenu.findIndex(idMatch);
            if(index > -1)
                return {...this.currentMenu[index], source: "currentMenu"};

            // If not, it should be in the results of last search
            if(this.lastSearch.results){
                if(this.lastSearch.results.length > 0){
                    index = this.lastSearch.results.findIndex(idMatch);
                    if(index > -1)
                        return {...this.lastSearch.results[index], source: "lastSearch"};
                }
            }
        }
        return null;
    }

    getVeganDishesCnt() {
        return this.veganDishesCnt;
    }

    getAvgHealthScore(decimals = 2) {
        return this.averageHealthScore.toFixed(decimals);
    }

    getTotalPrice(decimals = 2) {
        return this.totalPrice.toFixed(decimals);
    }

    setSelected(index) {
        this.selected = index;
    }

    setMenuRecipe(recipe, index) {        
        if(index < 0 || index > MAX_RECIPES) // Check if index is valid
            return {status: "error", message: "Invalid index"};
        
        // Check if recipe is already in the menu
        const idMatch = item => item?.id.toString() === recipe.id.toString();
        const ind = this.currentMenu.findIndex(idMatch);
        if(ind > -1) // Recipe is already in the menu
            return {status: "error", message: "This recipe is already in the menu!"};

        // In case of replace, check if it has the same type (vegan or non-vegan)
        let updateSame = false;
        if(this.currentMenu[index].title) // Recipe is already in the menu, but we want to replace it
            updateSame = this.currentMenu[index].vegan === recipe.vegan;

        if(this.veganDishesCnt === MAX_VEGAN_RECIPES && recipe.vegan && !updateSame) // Check if vegan dish is allowed
            return {status: "error", message: "There are already two vegan dishes in the menu!"};

        if(this.nonVeganDishesCnt === MAX_NON_VEGAN_RECIPES && !recipe.vegan && !updateSame) // Check if non-vegan dish is allowed
            return {status: "error", message: "There are already two non vegan dishes in the menu!"};    
        
            // Proceed
        this.currentMenu[index] = recipe;
        this.updateStats();
        localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
        return {status: "success", message: "Recipe added to menu!"};
    }

    clearRecipe(index) {
        if(index > -1 && index < MAX_RECIPES){
            this.currentMenu[index] = null;
            this.updateStats();
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
            return {status: "success", message: "Recipe removed from menu!"};
        }else
            return {status: "error", message: "Invalid recipe index!"};
    }

    clearAllRecipes() {
        this.currentMenu = Array(4).fill(null);
        this.updateStats();
        localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
        return {status: "success", message: "Menu cleared!"};
    }
};

