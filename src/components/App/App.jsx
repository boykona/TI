import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import Company from '../Company/Company';

import { getCompanys, addCompany } from '../../model/model';

import { downloadBilboardsDataAction, addCompanyAction } from '../../store/actions';
import './App.css';

class App extends PureComponent {

    state = {
        isInputActive: false,
        inputValue: ''
    };

    async componentDidMount() {
        const companies = await getCompanys();
        this.props.downloadBilboardsDataDispatch(companies);
    }

    inputCompany = () => {
        this.setState({
            isInputActive: true
        });
    }

    onKeyDown = async (event) => {
        if (event.key === 'Escape') {
          this.setState({
            isInputState: false,
            inputValue: ''
          });
        }
    
        if (event.key === 'Enter') {
            const bilboardArrName = this.state.inputValue;

            this.setState({
                isInputState: false,
                inputValue: ''
            })
            const bilboardArr = { name: bilboardArrName, bilboards: [] };
            await addCompany(bilboardArr);
            this.props.addCompanyDispatch(bilboardArr);
        }
    }
    
    onInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        const { inputValue, isInputActive } = this.state;

        return (
            <Fragment>
                <header id="main-header">
                    Advertising agency
                </header>
                <main id="main-container">
                    {this.props.companies.map((bilboardArr, index) => (
                        <Company key={`billboardarr-${index}`} BilboardArrId={index}/>
                    ))}
                    <div className="billboardarr">
                    {isInputActive && <input
                        type="text"
                        id="add-billboardarr-input"
                        placeholder="Название компании"
                        value={inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown}
                    />}
                    {!isInputActive && <header className="billboardarr-name" onClick={this.inputCompany}>
                        Добавить компанию
                    </header>}
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ companies }) => ({ companies });

const mapDispatchToProps = dispatch => ({
    addCompanyDispatch: (bilboardArr) => dispatch(addCompanyAction(bilboardArr)),
    downloadBilboardsDataDispatch: (companies) => dispatch(downloadBilboardsDataAction(companies)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
