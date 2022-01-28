import { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container, Button, Form, Row, Col, InputGroup, Card } from 'react-bootstrap';
import TopNavbar from '../../components/TopNavbar';
import Preloader from '../../components/Preloader';
import { LoadingContext, MiddlewareContext } from '../../context';
import swal from 'sweetalert';
import { useFormik } from 'formik';
import classes from './style.module.css';
import { FaSearch } from 'react-icons/fa';
import ItemCard from '../../components/ItemCard';

const Search = () => {

    const { loading, setLoading } = useContext(LoadingContext);
    const middleware  = useContext(MiddlewareContext);
    const [searchResults, setSearchResults] = useState(middleware.getLastSearch()?.results);
    const navigate = useNavigate();
    const { dishIndex } = useParams();

    const handleAddItem = item => {                
        const res = middleware.setMenuRecipe(item, dishIndex);
        if(res.status === "success")
            navigate('/home/');
        else
            swal("Error", res.message, "error");
    };

    const formik = useFormik({
        initialValues: { 
            query: '',            
            check: false
        },
        onSubmit: values => {
            setLoading(true);
            middleware.searchRecipes(values.query, values.check).then(response => {
                setSearchResults(response.results);
                setLoading(false);
            });
        },
        validateOnChange: false,        
        validate: values => {
            let errors = {};            
            if(!values.query){
                errors.query= "Add some text in the search field!";                
            }else{
                if(values.query.length < 3){
                    errors.query= "Introduce at least three characters to search recipes";
                }
            }
            if(errors.query){
                swal("Not enough search terms", errors.query, "error");
            }
            return errors;
        }
    });

    return (
        <Container className={classes.Container}>
            {loading && <Preloader />}
            <TopNavbar />
            <h3>Explore recipes</h3>
            <Card className={classes.FormCard}>
                <Card.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col xs={12} sm={8}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Enter search query"
                                        aria-label="Enter search query"
                                        aria-describedby="basic-addon"
                                        type="text"                             
                                        name="query"                                         
                                        onChange={formik.handleChange} 
                                        value={formik.values.query} 
                                    />
                                    <Button variant="outline-secondary" id="button-addon" type="submit">
                                        <FaSearch />
                                    </Button>
                                </InputGroup>

                            </Col>
                            <Col xs={12} sm={4} style={{margin:"auto"}}>
                                <Form.Group className="mb-3" controlId="formCheckbox">
                                    <Form.Check 
                                        type="checkbox"                             
                                        name="check" 
                                        label="Vegan dishes" 
                                        onChange={formik.handleChange} 
                                        value={formik.values.check} />
                                </Form.Group>                        
                            </Col>
                        </Row>
                    </Form>      
                </Card.Body>
            </Card>  
            { searchResults?.length > 0 ? 
                <Row className={classes.ResultsContainer}>
                        {searchResults.map(item => 
                            <Col xs={12} sm={6} md={4} lg={3} key={item.id}>                            
                                <ItemCard 
                                    item={item} 
                                    onAdd={()=>handleAddItem(item)}
                                    onView={()=>navigate(`/details/${item.id}`)}/>
                            </Col>
                        )}
                </Row>
                :
                <center style={{margin:"50px 0px 50px 0px"}}>
                    <h2 style={{color:"rgb(100,100,100)"}}><i>No recipes found</i></h2>
                </center>
            }
        </Container>
    );
};

export default Search;