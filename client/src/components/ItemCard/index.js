
// This component displays info about a single menu dish
const ItemCard = props => (
    <div key={props.item.id}>
        <h2>{props.item.title}</h2>           
        <p>Price: ${props.item.pricePerServing}</p>             
        <p>Health score: {props.item.healthScore}</p>
        <img src={props.item.image} alt={props.item.title}/>
    </div>
);

export default ItemCard;