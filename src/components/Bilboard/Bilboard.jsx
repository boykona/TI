import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Bilboard.css';

import { editBilboard, removeBilboard, moveBilboard } from '../../model/model';

import { 
    editBilboardNameAction,
    editBilboardAuthorAction,
    removeBilboardAction,
    moveBilboardLeftAction,
    moveBilboardRightAction
} from '../../store/actions';


class Bilboard extends PureComponent {

    moveLeft = async () => {
        const moveData = {
            bilboardId: this.props.bilboardId,
            BilboardArrId: this.props.BilboardArrId
        };
        await moveBilboard({
            ...moveData,
            destCompanyId: moveData.BilboardArrId - 1
        });
        this.props.moveBilboardLeftDispatch(moveData);
    }

    moveRight = async () => {
        const moveData = {
            bilboardId: this.props.bilboardId,
            BilboardArrId: this.props.BilboardArrId
        };
        await moveBilboard({
            ...moveData,
            destCompanyId: moveData.BilboardArrId + 1
        });
        this.props.moveBilboardRightDispatch(moveData);
    }

    onRemove = async () => {
        const ok = window.confirm('Удалить билборд?');
        if (!ok) {
            return;
        }

        const removeData = {
            bilboardId: this.props.bilboardId,
            BilboardArrId: this.props.BilboardArrId
        };
        await removeBilboard(removeData);
        this.props.removeBilboardDispatch(removeData);
    }

    onAuthorEdit = async () => {
        let newAuthor = prompt('Введите новый адрес');
        if (!newAuthor || !newAuthor.trim()) {
            alert('Невалидный адрес');
            return;
        }

        newAuthor = newAuthor.trim();

        const order = this.props.companies[this.props.BilboardArrId].bilboards[this.props.bilboardId];
        const orderEditData = {
            bilboardId: this.props.bilboardId,
            BilboardArrId: this.props.BilboardArrId,
            newAuthor: newAuthor
        };
        await editBilboard({
            ...orderEditData,
            newName: order.name
        });
        this.props.editBilboardAuthorDispatch(orderEditData);
    }

    onNameEdit = async () => {
        let newName = prompt('Введите новые координаты билборда');
        if (!newName || !newName.trim()) {
            alert('Невалидное описание');
            return;
        }
        
        newName = newName.trim();

        const order = this.props.companies[this.props.BilboardArrId].bilboards[this.props.bilboardId];
        const orderEditData = {
            bilboardId: this.props.bilboardId,
            BilboardArrId: this.props.BilboardArrId,
            newName: newName,
        };
        await editBilboard({
            ...orderEditData,
            newAuthor: order.author
        });
        this.props.editBilboardNameDispatch(orderEditData);
    }

    render() {
        const { bilboardId, BilboardArrId } = this.props;
        const order = this.props.companies[BilboardArrId].bilboards[bilboardId];

        return (
            <div className="billboardarr-order">
                <div className="billboardarr-order-description">
                <div className="billboardarr-order-name">
                    { order.name }
                </div>
                <div className="billboardarr-order-author">
                    { order.author }
                </div>
                </div>
                
                <div className="billboardarr-order-controls">
                <div className="billboardarr-order-controls-row">
                    <div className="billboardarr-order-controls-icon left-arrow-icon" onClick={this.moveLeft}></div>
                    <div className="billboardarr-order-controls-icon right-arrow-icon" onClick={this.moveRight}></div>
                </div>
                <div className="billboardarr-order-controls-row">
                    <div className="billboardarr-order-controls-icon delete-icon" onClick={this.onRemove}></div>
                </div>
                <div className="billboardarr-order-controls-row">
                    <div className="billboardarr-order-controls-icon editcust-icon" onClick={this.onAuthorEdit}></div>
                    <div className="billboardarr-order-controls-icon editdesc-icon" onClick={this.onNameEdit}></div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ companies }) => ({ companies });

const mapDispatchToProps = dispatch => ({
    editBilboardNameDispatch: ({ bilboardId, BilboardArrId, newName }) => dispatch(editBilboardNameAction({ bilboardId, BilboardArrId, newName })),
    editBilboardAuthorDispatch: ({ bilboardId, BilboardArrId, newAuthor }) => dispatch(editBilboardAuthorAction({ bilboardId, BilboardArrId, newAuthor })),
    removeBilboardDispatch: ({ bilboardId, BilboardArrId }) => dispatch(removeBilboardAction({ bilboardId, BilboardArrId })),
    moveBilboardLeftDispatch: ({ bilboardId, BilboardArrId }) => dispatch(moveBilboardLeftAction({ bilboardId, BilboardArrId })),
    moveBilboardRightDispatch: ({ bilboardId, BilboardArrId }) => dispatch(moveBilboardRightAction({ bilboardId, BilboardArrId })),
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bilboard);
