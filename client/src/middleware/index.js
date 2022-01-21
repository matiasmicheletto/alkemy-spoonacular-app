import axios from 'axios';
import recipes_response from './recipes_response.json';

const MAX_RECIPES = 4; // Cantidad de recetas por menu

export default class Middleware {

    constructor() {
        this.debug = true; // process.env.NODE_ENV === "development"
        this.api_url = `${process.env.REACT_APP_API_URL}complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`;
        this.currentMenu = JSON.parse(localStorage.getItem('currentMenu')) || [];
    }

    searchRecipes() {
        return new Promise((fulfill, reject)=>{
            if(this.debug){ // Simular respuesta de api
                setTimeout(()=>{
                    fulfill(recipes_response);
                }, 1000);
            }else{ // Realizar llamada a la api
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
        if(this.currentMenu.length < MAX_RECIPES){
            this.currentMenu.push(recipe);
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
            return true;
        }else
            return false;
    }

    removeRecipeFromMenu(recipeId) {
        const index = this.currentMenu.findIndex(recipe => recipe.id === recipeId);
        if(index > -1){
            this.currentMenu.splice(index, 1);
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu));
            return true;
        }else
            return false;
    }

};

