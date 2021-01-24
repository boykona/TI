import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Company.css';

import { addBilboard } from '../../model/model';

import Bilboard from '../Bilboard/Bilboard';
import { addBilboardAction } from '../../store/actions';


class Company extends PureComponent {

    onBilboardAdd = async () => {
        let bilboardName = prompt('Введите координаты билборда', '');
        if (!bilboardName || !bilboardName.trim()) {
            alert('Невалидное координаты билборда!');
            return;
        }
        bilboardName = bilboardName.trim();

        let orderAuthor = prompt('Введите адрес', '').trim();
        if (!orderAuthor || !orderAuthor.trim()) {
            alert('Невалидный адрес!');
            return;
        }

        orderAuthor = orderAuthor.trim();
        const newBilboardData = {
            order: {
                name: bilboardName,
                author: orderAuthor
            },
            BilboardArrId: this.props.BilboardArrId
        };

        await addBilboard(newBilboardData);
        this.props.addBilboardDispatch(newBilboardData);
    }

    render() {
        const BilboardArrId = this.props.BilboardArrId;
        const bilboardArr = this.props.companies[BilboardArrId];

        return (
        <div className="billboardarr">
            <header className="billboardarr-name">
                { bilboardArr.name }
            </header>
            <div className="billboardarr-bilboards">
                {bilboardArr.bilboards.map((order, index) => (
                    <Bilboard key={`order-${index}`} bilboardId={index} BilboardArrId={BilboardArrId} />
                ))}
            </div>
            <footer className="billboardarr-add-task" onClick={this.onBilboardAdd}>
                Добавить билборд
            </footer>
        </div>
        );
    }
}

const mapStateToProps = ({ companies }) => ({ companies });

const mapDispatchToProps = dispatch => ({
    addBilboardDispatch: ({ order, BilboardArrId }) => dispatch(addBilboardAction({ order, BilboardArrId })),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Company);
