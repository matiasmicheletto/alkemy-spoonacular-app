import axios from 'axios';
import recipes_response from './recipes_response.json';

const MAX_RECIPES = 4; // Max dishes per menu

export default class Middleware {

    constructor() {
        this.debug = true; // or use process.env.NODE_ENV === "development"
        this.api_url = `${process.env.REACT_APP_API_URL}complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`;
        this.veganDishesCnt = null; // Vegan dishes counter (should be 2)
        this.nonEmptyDishes = 0; // Enabled dishes counter
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

    getMenu() {
        return this.currentMenu;
    }

    getLastSearch() {
        return this.lastSearch;
    }

    getRecipe(id) {
        if(id){
            const idMatch = item => item?.id.toString() === id.toString();

            // First check if recipe is in last search
            if("results" in this.lastSearch && this.lastSearch.results.length > 0){
                const index = this.lastSearch.results.findIndex(idMatch);
                if(index > -1)
                    return this.lastSearch.results[index];
            }
            // If not, search in current menu
            const index = this.currentMenu.findIndex(idMatch);
            if(index > -1)
                return this.currentMenu[index];
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

    setMenuRecipe(recipe, index) {        
        if(index > -1 && index < MAX_RECIPES){
            // TODO: check recipe 
            this.currentMenu[index] = recipe;
            this.updateStats();
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
            return {status: "success"};
        }else
            return {status: "error", message: "Invalid recipe index!"};
    }

    clearRecipe(index) {
        if(index > -1 && index < MAX_RECIPES){
            this.currentMenu[index] = null;
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
            return {status: "success"};
        }else
            return {status: "error", message: "Invalid recipe index!"};
    }

};

