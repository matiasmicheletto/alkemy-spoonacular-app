import SimpleModal from '../SimpleModal';

const HelpModal = props => (
    <SimpleModal {...props} title="Help">
        The menu is composed of recipes. Each recipe has a title, an image, a price per serving and a health score.
        <br />
        Search recipes by title and add them to the menu. Only two vegan recipes and two non vegan recipes are allowed at the same time.
        <br />
        The menu can be edited at any time, and the total price, average health score and vegan dishes count are displayed in the top section.
    </SimpleModal>
);

export default HelpModal;