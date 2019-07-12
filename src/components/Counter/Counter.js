import React, {Component} from 'react';
import './Counter.scss';
export class Counter extends Component {
    state = {
        value: this.props.value,
    };

    render(){
        return (
            <div className="sku__counter--wrap">
                <button
                    onClick={this.minus}
                    className="sku__counter-button sku__counter-button--minus"/>
                <input type="text"  placeholder={this.state.value}/>
                <button
                    onClick={this.plus}
                    className="sku__counter-button sku__counter-button--plus"/>
            </div>
        );
    }
    plus = () => {
        if(this.state.value < this.props.max || this.props.max === 0 ){
            let result = this.state.value + 1;
            this.setState({value : result });
            this.props.onValueChange(result);
        }
    }
    minus = () => {
        if(this.state.value > this.props.min){
            let result = this.state.value - 1;
            this.setState({value :  result });
            this.props.onValueChange(result);
        }
    }
}

export default Counter;