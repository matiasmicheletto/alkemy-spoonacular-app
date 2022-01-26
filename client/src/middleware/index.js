import axios from 'axios';
import recipes_response from './recipes_response.json';

const MAX_RECIPES = 4; // Max dishes per menu

export default class Middleware {

    constructor() {
        this.debug = true; // or use process.env.NODE_ENV === "development"
        this.api_url = `${process.env.REACT_APP_API_URL}complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`;
        this.currentMenu = JSON.parse(localStorage.getItem('currentMenu')) || []; // Local db
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

    addRecipeToMenu(recipe) {
        if(this.currentMenu.length < MAX_RECIPES){ // Cannot add more than N recipes
            // TODO: check recipe type
            this.currentMenu.push(recipe);
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
            return {status: "success"};
        }else
            return {status: "error", message: "Menu already full!"};
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

