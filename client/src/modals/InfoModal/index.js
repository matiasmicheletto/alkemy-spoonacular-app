import SimpleModal from "../SimpleModal";

const InfoModal = props => (
    <SimpleModal {...props} title="About this software">
        <p>This is a ReactJS based web application that allows the user to create a menu consisting of
            four dishes that can be chosen using the <a href="https://spoonacular.com/food-api/">Spoonacular</a> recipes library.</p>
        <p>This project was developed under the context of a front-end challenge by <a href="https://www.alkemy.org/">Alkemy</a>.</p>
        <br />
        <p><b>Author:</b> <a href="http://beacons.ai/matias.miche" target="_blank" rel="noopener noreferrer">Dr. Matías Micheletto</a></p>
        <p><b>Source code:</b> <a href="https://github.com/matiasmicheletto/alkemy-spoonacular-app" target="_blank" rel="noopener noreferrer">https://github.com/matiasmicheletto/alkemy-spoonacular-app</a></p>
        <p><b>License: </b> GPL-3.0</p>
        <br />
        <div style={{fontSize:10}}>
            <p><b>Terms and conditions</b></p>
            <p>This program is free software: you can redistribute it and/or modify it under the 
            terms of the GNU General Public License as published by the Free Software Foundation, 
            either version 3 of the License.</p>
            <p>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
            without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
            See the GNU General Public License for more details. You should have received a copy of the 
            GNU General Public License along with this program. If not, see 
            <a href="http://www.gnu.org/licenses" target="_blank" rel="noopener noreferrer">http://www.gnu.org/licenses</a>.</p>
        </div>
    </SimpleModal>
);

export default InfoModal;