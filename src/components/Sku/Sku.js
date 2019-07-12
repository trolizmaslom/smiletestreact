import React, {PureComponent} from 'react';
import './Sku.scss';
import Select from 'react-styled-select';
import Counter from '../Counter/Counter';

export class Sku extends PureComponent{
    state = {
        id: this.props.item.id,
        title: this.props.item.title,
        subtitle: this.props.item.subtitle,
        image: this.props.item.sku[0].image ? this.props.item.sku[0].image : this.props.item.image,
        options: this.props.item.sku.map(sku => {
                    return { label:  sku.label, value: sku.id}
                }),
        activeValue: this.props.item.sku[0].id,
        sku: [...this.props.item.sku],
        min: this.props.item.sku[0]['minQuantity'] ? this.props.item.sku[0]['minQuantity'] : 1,
        max: this.props.item.sku[0]['maxQuantity'] ? this.props.item.sku[0]['maxQuantity'] : 0,
        price: this.props.item.sku[0].price,
        oneItemPrice: this.props.item.sku[0].price,
        count: 1,
    };
    selectChange = (id) => {
        let elem = this.state.sku.find(item => {return parseInt(item.id, 10) === parseInt(id, 10)});
        let price = elem.price * this.state.count;
        this.setState(() => {
            return {
                price: price,
                oneItemPrice: elem.price,
                image: elem.image,
                activeValue: id
            }
        }, () => {
            this.props.chengedTotal(price, this.state.id);
        });

    };
    onValueChange = (count) => {
        let price = this.state.oneItemPrice * count;
        this.setState({
            price: price,
            count: count
        }, () => {
            this.props.chengedTotal(price, this.state.id);
        });
    };
    deleteItem = () => {
        this.props.deleteItem(this.state.id);
    };
    render(){
        const item  = this.state;
        return (
            <div className = "sku">

                <div className = "sku__left">
                    <div className = "sku__img">
                        <img src={item.image ? item.image : 'images/default-img.png' } alt=""/>
                    </div>
                    <div className = "sku__text">
                        <div className = "sku__title">{item.title}</div>
                        <div className = "sku__description">{item.subtitle}</div>
                        <div className = "sku__select">
                            <Select
                                value = {item.activeValue}
                                className = "my-custom-select"
                                searchable = {false}
                                onChange = {this.selectChange}
                                classes = {{
                                    selectOption: 'my-option',
                                    selectPlaceholder: 'my-placeholder',
                                    selectValue: 'my-value',
                                    selectArrow: 'my-arrow',
                                    selectArrowZone: 'my-arrow-zone',
                                    selectControl: 'my-control',
                                    selectMultiValueWrapper: 'my-multi-wrapper'
                                }}
                                options = {item.options}/>
                        </div>
                    </div>
                </div>
                <div className = "sku__right">
                    <div className = "sku__delete">
                        <button type = "button" onClick={this.deleteItem}>
                            <img src = "images/del.png" alt=""/>
                        </button>
                    </div>
                    <div className = "sku__counter">
                        <Counter onValueChange={this.onValueChange} value={item.count} max={item.max} min={item.min} />
                    </div>
                    <div className = "sku__price">{item.price} €</div>
                </div>
            </div>
        );
    }
}

export default Sku;
