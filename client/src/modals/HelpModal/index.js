import SimpleModal from '../SimpleModal';
import InlineButton from '../../components/InlineButton';

const HelpModal = props => (
    <SimpleModal {...props} title="Help">
        Search and add recipes using the <InlineButton type="search" /> button under each dish chard. 
        Only two vegan dishes and two non vegan dishes can be added.
        <br />
        To see details, hit the <InlineButton type="view" /> button. 
        <br />
        When clicking on <InlineButton type="clear" />, the corresponding dish will be emptied. 
    </SimpleModal>
);

export default HelpModal;