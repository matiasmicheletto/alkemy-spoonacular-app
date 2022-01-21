const ItemCard = props => (
    <div key={props.item.id}>
        <h2>{props.item.title}</h2>                        
        <img src={props.item.image} alt={props.item.title}/>
    </div>
);

export default ItemCard;